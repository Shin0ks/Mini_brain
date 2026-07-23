//Parte do código em JavaScript
  
new Promise((resolve, reject) => {
        var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'pt-BR';
        recognition.interimResults = false;

        recognition.onstart = function() {
            console.log("Ouvindo...");
        };

        recognition.onresult = function(event) {
            var texto = event.results[0][0].transcript;
            resolve(texto);
        };

        recognition.onerror = function(event) {
            reject(event.error);
        };

        recognition.start();
