function convertArticleToWAV() {
  const articleUrl = document.getElementById('articleUrl').value;

  fetch(`https://listenify-service.onrender.com/fetch?url=${encodeURIComponent(articleUrl)}`)
      .then(response => response.arrayBuffer())
      .then(audioData => {
          const audioBlob = new Blob([audioData], { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          const audioElement = document.createElement('audio');
          audioElement.src = audioUrl;
          audioElement.controls = true;

          const resultDiv = document.getElementById('result');
          resultDiv.innerHTML = '';
          resultDiv.appendChild(audioElement);
      })
      .catch(error => console.error('Error fetching the article:', error));
}
