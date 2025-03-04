from flask import render_template, request, jsonify, url_for
from app import app
from app.utils.image_generator import generate_image_from_text
from app.utils.scene_splitter import split_into_scenes

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate():
    story_text = request.form.get('story_text')
    style = request.form.get('style','digital art')
    
    if not story_text:
        return jsonify({'error': 'No story text provided'}), 400

    scenes = split_into_scenes(story_text)
    results = []
    
for scene in scenes:
    image_path = generate_image_from_text(scene, style)

    if image_path:
        image_url = url_for('static', filename=image_path)
        results.append({
            'text': scene,
            'image_url': image_url,
        })

if results:
    return jsonify({
        'success': True,
        'results': results
    })
    
else:
    return jsonify({
        'success': False,
        'message': 'Failed to generate image'
    }), 500 
