const PronunciationCard = ({ question, lang }) => {
    console.log(question)
    return (
        <div>
            <p className="question">What is</p>
            <p id="q_phrase">{question.english}</p>
            <p className="question">in {lang.practiceLang}?</p>
        </div>
    )
}

export default PronunciationCard