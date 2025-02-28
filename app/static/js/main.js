document.addEventListener('DOMContentLoaded', function() {
  const storyForm = document.getElementById('story-form');
  const resultsDiv = document.getElementById('results');

  storyForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const storyText = document.getElementById('story-text').value;
    if(!storyText){
      alert('Please enter some story text!');
      return;
    }

    resultsDiv.innerHTML = '<p>Generating your image with DALL-E 3, please wait...</p>';

    const formData = new FormData();
    formData.append('story_text', storyText);

    fetch('/generate', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        resultsDiv.innerHTML = `
        <div class="story-segment">
          <div class='story-text'>
            <p>${data.story_text}</p>
          </div>
          <div class="story-image">
            <img src="${data.image_url}" alt="Generated illustration">
          </div>
        </div>
          
      `;
      } else{
        resultsDiv.innerHTML = `<p>Error: ${data.message}</p>`;
      }
    })
    .catch(error =>{
      console.error('Error:', error);
      resultsDiv.innerHTML = '<p>Error generating image. Please try again </p>';
    });
  });
});

