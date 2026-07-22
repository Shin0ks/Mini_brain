

def capturar_voz():
    """Captura o áudio do microfone do usuário via JavaScript no navegador."""
    js_code = """
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
    });
    """
    print("🎤 Ouvindo... Fale algo no seu microfone!")
    try:
        texto = output.eval_js(js_code)
        return texto
    except Exception as e:
        print(f" Não foi possível capturar o áudio: {e}")
        return None


def processar_com_gemini(texto_usuario):
    """Envia a pergunta para o Gemini e retorna a resposta formatada para fala."""
    prompt = (
        "Você é um assistente de voz inteligente, prestativo e amigável. "
        "Responda de forma direta e concisa (em 1 a 3 frases no máximo), "
        "pois sua resposta será convertida em áudio para o usuário.\n\n"
        f"Usuário falou: {texto_usuario}"
    )

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )
    return response.text


def falar_resposta(texto):
    """Converte o texto em áudio MP3 e reproduz automaticamente."""
    tts = gTTS(text=texto, lang="pt", tld="com.br")
    arquivo_audio = "resposta.mp3"
    tts.save(arquivo_audio)
    display(Audio(arquivo_audio, autoplay=True))


def rodar_assistente():
    """Fluxo principal do assistente de voz."""
    fala_usuario = capturar_voz()

    if fala_usuario:
        print(f"\n Você: {fala_usuario}")

        resposta = processar_com_gemini(fala_usuario)
        print(f" Gemini: {resposta}\n")

        falar_resposta(resposta)

# Executar o assistente
rodar_assistente()
