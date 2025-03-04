document.addEventListener('DOMContentLoaded', function() {
  const storyForm = document.getElementById('story-form');
  const resultsDiv = document.getElementById('results');

  storyForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const storyText = document.getElementById('story-text').value;
    const stype = document.getElementById('style-select').value;
    
    if(!storyText){
      alert('Please enter some story text!');
      return;
    }

    resultsDiv.innerHTML = '<p>Generating your image with DALL-E 3, please wait...</p>';

    const formData = new FormData();
    formData.append('story_text', storyText);
    formData.append('style', style);

    
    fetch('/generate', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        resultsDiv.innerHTML = '';


        data.results.forEach((result, index) => {
          const sceneElement = document.createElement('div');
          sceneElement.className = 'story-segment';
          sceneElement.innerHTML = `
            <div class="story-text">
              <h3>Scene ${index + 1}</h3>
              <p>${result.text}</p>
            </div>
            <div class="story-image">
              <img src="${result.image_url}" alt="Scene ${index + 1}">
            </div>
          `;
          resultsDiv.appendChild(sceneElement);
        });
        } else {
          resultsDiv.innerHTML = `<p>Error: ${data.message}</p>`;

        }
    })
    .catch(error => {
      console.error('Error:', error);
      resultsDiv.innerHTML = `<p>Error: ${data.message}</p>`; 
      
    });

        
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

