// script.js

function textToSpeech(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  }
  
//   function convertArticleToMP3() {
//     const articleUrl = document.getElementById('articleUrl').value;
    
//     fetch(articleUrl)
//       .then(response => response.text())
//       .then(text => textToSpeech(text))
//       .catch(error => console.error('Error fetching the article:', error));
//   }
function convertArticleToMP3() {
    const articleUrl = document.getElementById('articleUrl').value;
    
    fetch(`https://your-render-service-url.onrender.com/fetch?url=${encodeURIComponent(articleUrl)}`)
      .then(response => response.text())
      .then(text => textToSpeech(text))
      .catch(error => console.error('Error fetching the article:', error));
  }
  