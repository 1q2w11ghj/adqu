let btn = document.querySelector("#btn")
let content = document.querySelector("#content")
let voice = document.querySelector("#voice")

function speak(text){
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.rate = 1
    text_speak.pitch = 1
    text_speak.volume = 1
    text_speak.lang = "en-GB"  // Changed from "hi-GB" to "en-GB"
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

// Uncomment this to test the greeting
// window.addEventListener('load', () => {
//     wishMe()
// })

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = new speechRecognition()

// Add continuous recognition
recognition.continuous = false
recognition.lang = "en-GB"

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex
    let transcript = event.results[currentIndex][0].transcript
    content.innerText = transcript
    console.log("Recognized:", transcript)  // Debug log
    takeCommand(transcript.toLowerCase())
}

// Add error handling
recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error)
    btn.style.display = "flex"
    voice.style.display = "none"
}

// Add end event handler
recognition.onend = () => {
    console.log("Recognition ended")
    btn.style.display = "flex"
    voice.style.display = "none"
}

btn.addEventListener("click", () => {
    recognition.start()
    btn.style.display = "none"
    voice.style.display = "block"
    speak("Listening...")
})

function takeCommand(message){
    console.log("Command received:", message)  // Debug log
    
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
        let finaltext = "this is what i found on internet regarding " + message.replace("adqua", "")
        speak(finaltext)
        window.open(`https://www.bing.com/search?q=${encodeURIComponent(message)}`, "_blank")
    }
}