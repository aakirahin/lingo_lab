import { useEffect, useState } from "react"

let recognition = null

if ("webkitSpeechRecognition" in window) {
    recognition = new window.webkitSpeechRecognition()
    recognition.continuous = true
    recognition.lang = "en-GB"
}

const useSpeechRec = () => {
    const [text, setText] = useState("")
    const [listening, setListening] = useState(false)

    useEffect(() => {
        if (!recognition) return

        recognition.onresult = (ev) => {
            console.log("onresult event", ev)
            setText(ev.results[0][0].transcript)
            recognition.stop()
            setListening(false)
        }
    }, [])

    const startListening = (lang) => {
        setText("")
        setListening(true)
        recognition.lang = lang
        recognition.start()
    }

    const stopListening = () => {
        setListening(false)
        recognition.stop()
    }

    return {
        text, 
        listening,
        startListening,
        stopListening,
        hasRecognition: !!recognition
    }
}


export default useSpeechRec