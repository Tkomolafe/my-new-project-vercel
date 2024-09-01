from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import io
from PIL import Image

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# Load the pre-trained model
model = tf.keras.models.load_model('age_estimation2_model.h5')

def preprocess_image(img):
    img = img.convert('RGB')  # Convert image to RGB (removes alpha channel if present)
    img = img.resize((224, 224))  # Resize to the input size expected by the model
    img_array = np.array(img) / 255.0  # Normalize pixel values to [0, 1]
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    return img_array


@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    img_file = request.files['image'].read()
    img = Image.open(io.BytesIO(img_file))

    img_array = preprocess_image(img)

    # Predict age
    predicted_age = model.predict(img_array)[0][0]
    return jsonify({'estimated_age': round(predicted_age)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
