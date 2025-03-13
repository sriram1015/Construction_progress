import os
from flask import Flask, request, jsonify
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from similarity import similarity
from pymongo import MongoClient
from dotenv import load_dotenv
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load your trained model
model = load_model("cnn_hybrid.h5")

load_dotenv()

# Get the MongoDB URI from the environment variable
atlas_connection_string = os.getenv("mongo_url")

# Initialize MongoDB client with the Atlas connection string
client = MongoClient(atlas_connection_string)

# Access the database and collection
db = client['construction']
collection = db['prediction']


# Ensure 'uploads' directory exists
if not os.path.exists('uploads'):
    os.makedirs('uploads')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the uploaded image from the form
        f = request.files.get('image')
        if not f:
            return jsonify({'error': 'No file uploaded'}), 400
        
        basepath = os.path.dirname(__file__)
        filepath = os.path.join(basepath, 'uploads', f.filename)
        f.save(filepath)

        # Resize the image to the input shape expected by the model
        img = image.load_img(filepath, target_size=(100, 100))  
        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)

        # Predict the class using the model
        y = model.predict(x)
        preds = np.argmax(y, axis=1)

        # Construction stage mapping
        stages = ['Foundation', 'Plinth and building', 'Lintel', 'Roofing', 'Plastering', 'Flooring', 'Painting']
        predicted_stage = stages[preds[0]]
        last_record = collection.find_one({'prediction': predicted_stage }, sort=[('_id', -1)])
        if last_record:
            # Construct the full path for the last uploaded image
            filepath1 = os.path.join(basepath, 'uploads', last_record['filename'])
            percent = similarity(preds[0], filepath1, filepath)
            percent=percent+last_record['similarity']
            if(percent>100):
                percent=100

        else:
            percent = 0

        # Store prediction in MongoDB
        prediction_entry = {
            "filename": f.filename,
            "prediction": predicted_stage,
            "similarity": percent
        }
        collection.insert_one(prediction_entry)
        
        return jsonify({'prediction_text': predicted_stage, 'similarity': percent})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/delete', methods=['POST'])
def delete_data():
    data = request.json
    if data.get('message') == -1:
        # Find and delete the last inserted record
        last_record = collection.find_one_and_delete({}, sort=[('_id', -1)])
        if last_record:
            return jsonify({'status': 'success', 'message': 'Last data deleted successfully'}), 200
        else:
            return jsonify({'status': 'error', 'message': 'No data to delete'}), 404
    else:
        return jsonify({'status': 'error', 'message': 'Invalid message'}), 400
    
@app.route('/predictions', methods=['GET'])
def get_predictions():
    try:
        # Fetch all stages with their respective similarity percentages from MongoDB
        predictions = collection.find({}, {"_id": 0, "stage": 1, "similarity": 1})
        prediction_dict = {pred['stage']: pred['similarity'] for pred in predictions}

        return jsonify(prediction_dict)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

if __name__ == '__main__':
    app.run(debug=True)
