from flask import Flask, request, jsonify
import tensorflow as tf
from PIL import Image
import numpy as np

app = Flask(__name__)

# Load your pre-trained model
model = tf.keras.models.load_model('age_estimation1_model (3).keras')

# Preprocessing function (as defined above)
def preprocess_image(image):
    image = image.convert('L')  # Convert the image to grayscale
    image = image.resize((128, 128), Image.LANCZOS)  # Resize to 128x128 pixels
    image = np.array(image)  # Convert to numpy array
    image = image / 255.0  # Normalize the image
    image = np.expand_dims(image, axis=-1)  # Add channel dimension (grayscale)
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    return image

# Define a route to handle image upload and age estimation
@app.route('/predict', methods=['POST'])
def predict():
    # Check if an image is provided
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    image_file = request.files['image']
    image = Image.open(image_file)

    # Preprocess the image
    processed_image = preprocess_image(image)

    # Make prediction
    prediction = model.predict(processed_image)
    
    # Assuming your model outputs a single value representing the estimated age
    predicted_age = round(prediction[1][0][0])  # Adjusted to match your test code

    return jsonify({'estimated_age': predicted_age})

if __name__ == '__main__':
    app.run(debug=True)