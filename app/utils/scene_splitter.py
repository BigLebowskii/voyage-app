def split_into_scenes(story_text, max_length=200):
    """Split a story into multiple scenes based on paragraphs and laughs"""


    paragraphs = story_text.split('\n')
    paragraphs = [p.strip() for p in paragraphs if p.strip()]

    scenes = []
    current_scene = ""

    for paragraph in paragraphs:
        
        if len(current_scene) + len(paragraph) > max_length and current_scene:
            scenes.append(current_scene.strip())
            current_scene = paragraph
        else: 
            if current_scene:
                current_scene += " " + paragraph
            else:
                current_scene = paragraph

    if current_scene:
        scenes.append(current_scene.strip())

    return scenes

