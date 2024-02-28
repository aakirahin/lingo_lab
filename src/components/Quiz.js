import { useEffect, useReducer, useState } from "react"
import PronunciationCard from "./PronunciationCard"
import SpeechRec from "./SpeechRec"

const Quiz = ({ questions, qNum, setQuizStart, lang }) => {
    function q_reducer(state, action) {
        switch (action.type) {
            case 'next_q': {
                return {
                    index: state.index + 1,
                    question: questions[state.index],
                    correct: [...state.correct],
                    incorrect: [...state.incorrect]
                };
            }
            case 'check_a': {
                return {
                    index: state.index,
                    question: questions[state.index],
                    correct: [...state.correct, action.answer === state.question.translated && action.answer],
                    incorrect: [...state.incorrect, action.answer !== state.question.translated && action.answer]
                };
            }
        }
        throw Error('Unknown action.');
    }

    const [answer, setAnswer] = useState("")
    const [state, dispatch] = useReducer(q_reducer, { index: 0, question: questions[0], correct: [], incorrect: [] });

    return (
        state.index < questions.length ?
        <div id="quiz">
            <span id="q_num">{state.index + 1}/{qNum}</span>
            <PronunciationCard question={state.question} lang={lang}/>
            <SpeechRec lang={lang} answer={answer} setAnswer={setAnswer} dispatch={dispatch}/>
        </div> :
        <div>
            <p>You got</p>
            <p>8/{qNum}</p>
            <p>correct!</p>
            <p>Correct:</p>
            <ul>
                {state.correct.map((q) => (<li>{q.translated}</li>))}
            </ul>
            <p>Incorrect:</p>
            <ul>
                {state.incorrect.map((q) => (<li>{q.translated}</li>))}
            </ul>
            <button onClick={setQuizStart(false)}>Start over</button>
        </div>
    )
}

export default Quiz