from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = Flask(__name__)

# Load the saved model
MODEL_PATH = 'C:/Users/HP/ageeeweb/my-new-project/backend/tf_model.h5'
model = tf.keras.models.load_model(MODEL_PATH)

# Define a function to preprocess the image
def preprocess_image(image, target_size=(224, 224)):
    img = Image.open(io.BytesIO(image))
    img = img.resize(target_size)
    img_array = np.array(img) / 255.0  # Normalize to [0, 1]
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    return img_array
@app.route('/estimate-age', methods=['POST'])
def estimate_age():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400
    
    file = request.files['image']
    img = file.read()
    
    # Preprocess image (replace (224, 224) with your model’s input size)
    img_array = preprocess_image(img, target_size=(224, 224))
    
    # Predict age
    pred = model.predict(img_array)
    predicted_age = round(pred[0][0])

    return jsonify({'age': predicted_age})

if __name__ == '__main__':
    app.run(debug=True)
