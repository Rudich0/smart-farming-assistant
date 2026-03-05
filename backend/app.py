from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import json
import os
from PIL import Image
import io
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["*"])  

# Paths
MODEL_PATH = r"C:\Users\rudich\OneDrive\Desktop\smart-farming-assistant\models\best_model.keras"
CLASS_NAMES_PATH = r"C:\Users\rudich\OneDrive\Desktop\smart-farming-assistant\models\class_names.json"
DISEASE_DB_PATH = r"C:\Users\rudich\OneDrive\Desktop\smart-farming-assistant\backend\disease_database.json"

# Load model and class names once at startup
print("Loading model...")
model = tf.keras.models.load_model(MODEL_PATH)
print(f"✓ Model loaded! Input shape: {model.input_shape}")
print(f"✓ Output shape: {model.output_shape}")

with open(CLASS_NAMES_PATH) as f:
    class_names = json.load(f)
print(f"✓ {len(class_names)} classes loaded")

# Load disease database
with open(DISEASE_DB_PATH, 'r', encoding='utf-8') as f:
    disease_db = json.load(f)
print(f"✓ Disease database loaded: {len(disease_db)} diseases")

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'classes': len(class_names)})

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    try:
        file = request.files['image']
        img = Image.open(io.BytesIO(file.read())).convert('RGB')
        img = img.resize((224, 224))
        img_array = np.array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        predictions = model.predict(img_array, verbose=0)
        probs = predictions[0]

        top_indices = np.argsort(probs)[::-1][:5]
        results = [
            {
                'className': class_names[i].replace('_', ' ').replace('PV ', ''),
                'confidence': float(probs[i])
            }
            for i in top_indices
        ]

        return jsonify({
            'success': True,
            'predictions': results,
            'top': results[0]
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/disease-info/<disease_id>', methods=['GET'])
def get_disease_info(disease_id):
    """Get detailed information about a specific disease"""
    disease_key = disease_id.lower().replace(' ', '_')
    
    if disease_key in disease_db:
        return jsonify({
            'success': True,
            'disease': disease_db[disease_key]
        })
    
    if disease_key.startswith('pv_'):
        disease_key = disease_key[3:]
    else:
        disease_key = 'pv_' + disease_key
    
    if disease_key in disease_db:
        return jsonify({
            'success': True,
            'disease': disease_db[disease_key]
        })
    
    return jsonify({
        'success': False,
        'error': f'Disease not found: {disease_id}'
    }), 404

@app.route('/diseases', methods=['GET'])
def get_all_diseases():
    """Get list of all diseases"""
    disease_list = [
        {
            'id': key,
            'name': value['name'],
            'crop': value['crop'],
            'severity': value['severity']
        }
        for key, value in disease_db.items()
    ]
    
    return jsonify({
        'success': True,
        'diseases': disease_list,
        'total': len(disease_list)
    })

if __name__ == '__main__':
    # Local development
    # app.run(debug=True, host='0.0.0.0', port=5000)
    
    # Production
    import os
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)