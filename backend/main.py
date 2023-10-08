from fastapi import FastAPI, UploadFile, File
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
import cv2

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
MODEL = tf.keras.models.load_model('models/TyreCLF-90')
CLASS_NAMES = ['defective', 'good']


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Set this to ["*"] to allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Add "OPTIONS" here if needed
    allow_headers=["*"],
)

@app.get("/ping")
async def ping():
    return "Hello, I am alive"


def read_file_as_image(bytes) -> np.array:
    image = np.array(Image.open(BytesIO(bytes)))
    return image


@app.post('/predict')
async def predict(file: UploadFile = File()):

    image = read_file_as_image(await file.read())
    resized_image = cv2.resize(image, (256, 256))

    image_batch = np.expand_dims(resized_image, 0)

    prediction = MODEL.predict(image_batch)
    prediction = prediction.tolist()

    predicted_class = CLASS_NAMES[np.argmax(prediction[0])]
    confidence = np.max(prediction[0])
    print(prediction)
    return {
        'class': predicted_class,
        'confidence': round(confidence,2)
    }


if __name__ == '__main__':
    uvicorn.run(app='main:app', port=4242, host='localhost', reload=True)
