# Tyre Quality Classifier Website

This repository contains the code for the Tyre Quality Classifier Website, a web application that uses machine learning to predict the quality of tires based on images. This README provides instructions on how to set up and run the project using Docker Compose.

## Prerequisites

Before you begin, ensure you have the following dependencies installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/veronika/tyre-quality-classifier-website.git
   ```

2. Navigate to the project directory:

   ```bash
   cd tyre-quality-classifier-website/
   ```

3. Build and run the Docker containers using Docker Compose:

   ```bash
   docker-compose build && docker-compose up
   ```

## Note

- Some warnings and messages related to package dependencies and TensorFlow optimizations may appear in the logs. These are informational and should not impact the functionality of the application.

- Ensure that you have a reliable internet connection to download any required Docker images and dependencies during the setup process.

That's it! You should now have the Tyre Quality Classifier Website up and running on your local machine. Feel free to explore the code and make any necessary modifications for your specific use case. Enjoy using the application!
