from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import random

app = Flask(__name__)
CORS(app, origins=["*"])

# Load disease database and class names
DISEASE_DB_PATH = os.path.join(os.path.dirname(__file__), 'disease_database.json')
CLASS_NAMES_PATH = os.path.join(os.path.dirname(__file__), 'class_names.json')

with open(DISEASE_DB_PATH, 'r', encoding='utf-8') as f:
    disease_db = json.load(f)

with open(CLASS_NAMES_PATH, 'r', encoding='utf-8') as f:
    class_names = json.load(f)

print(f"✓ Loaded {len(disease_db)} diseases")
print(f"✓ Loaded {len(class_names)} classes")

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'classes': len(class_names), 'mode': 'demo'})

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    try:
        # DEMO MODE - Return random predictions
        # Get random indices and generate probabilities
        num_classes = len(class_names)
        indices = random.sample(range(num_classes), 5)
        
        # Generate realistic-looking probabilities
        probs = [random.uniform(0.1, 0.9) for _ in range(5)]
        probs = sorted(probs, reverse=True)
        total = sum(probs)
        probs = [p/total for p in probs]  # Normalize
        
        results = [
            {
                'className': class_names[idx].replace('_', ' ').replace('PV ', ''),
                'confidence': float(probs[i])
            }
            for i, idx in enumerate(indices)
        ]

        return jsonify({
            'success': True,
            'predictions': results,
            'top': results[0],
            'mode': 'demo'
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/disease-info/<disease_id>', methods=['GET'])
def get_disease_info(disease_id):
    disease_key = disease_id.lower().replace(' ', '_')
    
    if disease_key in disease_db:
        return jsonify({'success': True, 'disease': disease_db[disease_key]})
    
    if disease_key.startswith('pv_'):
        disease_key = disease_key[3:]
    else:
        disease_key = 'pv_' + disease_key
    
    if disease_key in disease_db:
        return jsonify({'success': True, 'disease': disease_db[disease_key]})
    
    return jsonify({'success': False, 'error': f'Disease not found: {disease_id}'}), 404

@app.route('/diseases', methods=['GET'])
def get_all_diseases():
    disease_list = [
        {'id': key, 'name': value['name'], 'crop': value['crop'], 'severity': value['severity']}
        for key, value in disease_db.items()
    ]
    return jsonify({'success': True, 'diseases': disease_list, 'total': len(disease_list)})

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)