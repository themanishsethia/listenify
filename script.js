const wavEncoder = require('wav-encoder');

function convertArticleToWAV() {
    const articleUrl = document.getElementById('articleUrl').value;

    fetch(`https://listenify-service.onrender.com/fetch?url=${encodeURIComponent(articleUrl)}`)
        .then(response => response.arrayBuffer())
        .then(audioData => {
            // Convert audio data to WAV format
            wavEncoder.encode({
                sampleRate: 44100, // Adjust as needed
                channelData: [new Float32Array(audioData)]
            }).then((buffer) => {
                const audioBlob = new Blob([buffer], { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);

                // Create a download link
                const downloadLink = document.createElement('a');
                downloadLink.href = audioUrl;
                downloadLink.download = 'article.wav';
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            });
        })
        .catch(error => console.error('Error fetching the article:', error));
}
