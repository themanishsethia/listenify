// Import the recordrtc library

//import RecordRTC from 'recordrtc';

let recorder;

function convertArticleToMP3() {
  const articleUrl = document.getElementById('articleUrl').value;

  fetch(`https://listenify-service.onrender.com/fetch?url=${encodeURIComponent(articleUrl)}`)
    .then(response => response.text())
    .then(text => {
      // Convert text to audio using your existing function (textToSpeech)
      const audioBlob = textToSpeech(text);

      // Create a download link for the audio
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(audioBlob);
      downloadLink.download = 'article.mp3';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    })
    .catch(error => console.error('Error fetching the article:', error));
}

// Function to convert text to audio using recordrtc
function textToSpeech(text) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const source = audioContext.createBufferSource();

  // Initialize recorder
  recorder = new RecordRTC(source, {
    type: 'audio',
    mimeType: 'audio/wav', // You can change the mimeType to 'audio/mp3'
  });

  // Convert text to audio
  const speechSynthesis = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1; // Adjust the speech speed if needed
  utterance.voice = speechSynthesis.getVoices()[0]; // Set the voice (optional)
  utterance.onend = function() {
    recorder.stopRecording(function() {
      const blob = recorder.getBlob();
      source.disconnect();
      audioContext.close();
    });
  };

  // Start recording
  recorder.startRecording();
  speechSynthesis.speak(utterance);

  // Return the audio blob
  return recorder.getBlob();
}
