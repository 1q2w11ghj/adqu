let btn = document.querySelector("#btn")
let content = document.querySelector("#content")
let voice = document.querySelector("#voice")

function speak(text){
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.rate = 1
    text_speak.pitch = 1
    text_speak.volume = 1
    text_speak.lang = "en-GB"
    window.speechSynthesis.speak(text_speak)
}

function wishMe(){
    let day = new Date()
    let hours = day.getHours()
    if(hours >= 0 && hours < 12){
        speak("Good morning Sir")
    }
    else if(hours >= 12 && hours < 16){
        speak("Good afternoon Sir")
    }else{
        speak("Good evening Sir")
    }
}

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = new speechRecognition()
recognition.continuous = false
recognition.lang = "en-GB"

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex
    let transcript = event.results[currentIndex][0].transcript
    content.innerText = transcript
    takeCommand(transcript.toLowerCase())
}

recognition.onerror = (event) => {
    btn.style.display = "flex"
    voice.style.display = "none"
}

recognition.onend = () => {
    btn.style.display = "flex"
    voice.style.display = "none"
}

btn.addEventListener("click", () => {
    recognition.start()
    btn.style.display = "none"
    voice.style.display = "block"
    speak("Listening...")
})

async function searchAndSpeak(query) {
    speak("Searching the web...")

    try {
        let url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1&no_html=1`
        let response = await fetch(url)
        let data = await response.json()

        // Pick best answer
        let result = data.Abstract || data.Heading || data.Answer || data.RelatedTopics?.[0]?.Text

        if (result && result.length > 5) {
            speak(result)
        } else {
            speak("Sorry, I couldn't find an answer for that.")
        }

    } catch (error) {
        speak("There was an error searching the internet.")
    }
}

function takeCommand(message){
    if(message.includes("hello") || message.includes("hey")){
        speak("hello sir, what can i help you?")
    }
    else if(message.includes("who are you")){
        speak("i am ai, created by adqujopha team")
    }
    else if(message.includes("youtube")){
        speak("opening youtube...")
        window.open("https://youtube.com/", "_blank")
    }
    else if(message.includes("google")){
        speak("opening google...")
        window.open("https://google.com/", "_blank")
    }
    else if(message.includes("instagram")){
        speak("opening instagram...")
        window.open("https://instagram.com/", "_blank")
    }
    else if(message.includes("calculator")){
        speak("opening calculator...")
        window.open("calculator://")
    }
    else if(message.includes("time")){
        let time = new Date().toLocaleString(undefined, {hour:"numeric", minute:"numeric"})
        speak(time)
    }
    else {
        // ❗ Replace browser opening with voice search
        searchAndSpeak(message)
    }
}
