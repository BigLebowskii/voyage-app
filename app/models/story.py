from app import db
from datetime import datetime

class Story(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    scenes = db.relationship('Scene', backref='story', lazy=True, cascade="all, delete-orphan")


Class Scene(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    style = db.Column(db.String(50), nullable=False)
    image_path = db.Column(db.String(200), nullable=False)
    order = db.Column(db.Integer, nullable=False)
    story_id = db.Column(db.Integer, db.ForeignKey('story.id'), nullable=False)
