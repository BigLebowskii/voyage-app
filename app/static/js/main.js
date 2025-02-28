document.addEventListener('DOMContentLoaded', function() {
  const storyForm = document.getElementbyId('story-form');
  const resultsDiv = documents.getElementbyId('results');

  storyForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const storyText = document.getElementbyId('story-text').value;
    if(!storyText){
      alert('Please enter some story text!');
      return;
    }

    console.log('Story submitted:', storyText);
    resultsDiv.innerHTML = '<p>Processing your story... </p>';



  }
});
