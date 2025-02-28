from flask import render_template, request, jsonify, url_for
from app import app
from app.utils.image_generator import generate_image_from_text

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate():
    story_text = request.form.get('story_text')
    if not story_text:
        return jsonify({'error': 'No story text provided'}), 400

    image_path = generate_image_from_text(story_text)

    if image_path:
        image_url = url_for('static', filename=image_path)
        return jsonify({
            'success': True,
            'image_url': image_url,
            'story_text': story_text
        })
    else:
        return jsonify({
            'success': False,
            'message': 'Failed to generate image'
        }), 500
