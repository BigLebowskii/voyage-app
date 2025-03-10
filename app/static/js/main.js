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
              <div class="scene-controls">
                <button class="regenerate-btn">Regenerate Image</button>
              </div>
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
  });
});


function setupRegenerateButtons(){
  const regenerateButtons = document.querySelectorAll('.regenerate-btn')

  regenerateButtons.forEach(button => {
    button.addEventListener('click', function(){
      const sceneElement = this.closest('.story-segment');
      const sceneText = sceneElement.querySelector('.story-text p').testContent;
      const style = document.getElementById('style-select').value;
      const imageContainer = sceneElement.querySelector('.story-image');


      imageContainer.innerHTML = '<p>Regenerating image...</p>';


      const formData = new FormData();
      formData.append('scene_text', sceneText);
      formData.append('style', style);
     

      fetch('/regenerate', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.success){
          imageContainer.innerHTML = `<img src="${data.image_url}" alt="Regenerated scene">`;
        }else{
          imageContainer.innerHTML = `<p>Error: ${data.message}</p>`; 
        }
        }
      })
      .catch(error => {
        console.error('Error:', error);
        imageContainer.innerHTML = '<p>Error regenerating image. Please try again.</p>';
      
    });
  });
});
}

setupRegenerateButtons();

//          
//         <div class="story-segment">
//           <div class='story-text'>
//             <p>${data.story_text}</p>
//           </div>
//           <div class="story-image">
//             <img src="${data.image_url}" alt="Generated illustration">
//           </div>
//         </div>
//           
//       `;
//       } else{
//         resultsDiv.innerHTML = `<p>Error: ${data.message}</p>`;
//       }
//     })
//     .catch(error =>{
//       console.error('Error:', error);
//       resultsDiv.innerHTML = '<p>Error generating image. Please try again </p>';
//     });
//   });
// });
//
