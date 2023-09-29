function convertArticleToMP3() {
  const articleUrl = document.getElementById('articleUrl').value;

  fetch(`https://listenify-service.onrender.com/fetch?url=${encodeURIComponent(articleUrl)}`)
    .then(response => response.arrayBuffer())
    .then(audioData => {
      // Convert audioData to a Blob and create a download link
      const audioBlob = new Blob([audioData], { type: 'audio/wav' });
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(audioBlob);
      downloadLink.download = 'article.mp3';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    })
    .catch(error => console.error('Error fetching the article:', error));
}
