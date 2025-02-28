import os
import uuid
import requests
import uuid
from io import BytesIO
from openai import OpenAI
from PIL import Image

def generate_image_from_text(prompt_text, style="digital art"):
    """Generate an image based on text using OpenAI's DALL-E 3 API"""

    enhanced_prompt = f"{prompt_text}, {style}, highly detailed, vivid colors"

    try:

        client = OpenAI(api_key= os.environ.get("OPENAI_API_KEY"))

        response = client.images.generate(
            model="dall-e-3",
            prompt=enhanced_prompt,
            size="1024x1024",
            quality="standard",
            n=1
        )


        image_url = response.data[0].url

        response = requests.get(image_url)
        if response.status_code==200:
            filename = f"{uuid.uuid4()}.jpg"
            filepath = os.path.join("app/static/images", filename)

            os.makedirs(os.path.dirname(filepath), exist_ok=True)

            image = Image.open(BytesIO(response.content))
            image.save(filepath)

            return f"images/{filename}"

        return None
    except Exception as e:
        print(f"Error generating image: {e}")
        return None

    
