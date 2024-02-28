import { useEffect, useState } from "react"
import useSpeechRec from "../hooks/useSpeechRec"

function SpeechRec({ lang, answer, setAnswer, dispatch }) {
    const {
        text,
        listening,
        startListening,
        stopListening,
        hasRecognition
    } = useSpeechRec()
    const [error, setError] = useState(false)

    useEffect(() => {
        if (text && text !== answer) setAnswer(text)
    }, [text])

    const listen = (lang) => {
        setError("")
        startListening(lang)
        setTimeout(() => {
            if (!text) {
                stopListening()
                setError("Please try again.")
            }
        }, 5000)
    }

    const nextQ = () => {
        dispatch({ type: 'check_a', answer })
        dispatch({ type: 'next_q' })
        setAnswer("")
    }

    return (
        <div>
            {
                hasRecognition ? (
                    answer ? (
                        <div>
                            <p>You said: {answer}</p>
                            <button onClick={nextQ}>Confirm</button>
                            <button onClick={() => listen(lang.practiceLangCode)}>Retry</button>
                        </div>
                    ) : (
                        <div>
                            <button onClick={() => listen(lang.practiceLangCode)}>I'm ready</button>
                            {listening ? <p>Listening...</p> : ""}
                            {error && <p>{error}</p>}
                        </div>
                    )
                ) :
                <h1>Your browser does not support speech recognition.</h1>
            }
        </div>
    )
}

export default SpeechRec