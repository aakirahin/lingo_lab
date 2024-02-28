import { useEffect, useState } from 'react';
import { phrases } from './utils/phrases'
import Quiz from './components/Quiz';

function App() {
  const [lang, setLang] = useState({ practiceLangCode: "", spokenLang: "en-GB", practiceLang: "" })
  const [qNum, setQNum] = useState(10)
  const [questions, setQuestions] = useState([])
  const [quizStart, setQuizStart] = useState(false)
  const [error, setError] = useState(false)

  const langOptions = {
    'Afrikaans': 'af-ZA',
    'አማርኛ': 'am-ET',
    'Azərbaycanca': 'az-AZ',
    'বাংলা': 'bn-BD',
    'Bahasa Indonesia': 'id-ID',
    'Bahasa Melayu': 'ms-MY',
    'Català': 'ca-ES',
    'Čeština': 'cs-CZ',
    'Dansk': 'da-DK',
    'Deutsch': 'de-DE',
    'English': 'en-GB',
    'Español': 'es-ES',
    'Euskara': 'eu-ES',
    'Filipino': 'fil-PH',
    'Français': 'fr-FR',
    'Basa Jawa': 'jv-ID',
    'Galego': 'gl-ES',
    'ગુજરાતી': 'gu-IN',
    'Hrvatski': 'hr-HR',
    'IsiZulu': 'zu-ZA',
    'Íslenska': 'is-IS',
    'Italiano': 'it-IT',
    'ಕನ್ನಡ': 'kn-IN',
    'ភាសាខ្មែរ': 'km-KH',
    'Latviešu':'lv-LV',
    'Lietuvių':'lt-LT',
    'മലയാളം': 'ml-IN',
    'मराठी': 'mr-IN',
    'Magyar': 'hu-HU',
    'ລາວ': 'lo-LA',
    'Nederlands': 'nl-NL',
    'नेपाली भाषा':'ne-NP',
    'Norsk bokmål': 'nb-NO',
    'Polski': 'pl-PL',
    'Português': 'pt-PT',
    'Română': 'ro-RO',
    'සිංහල': 'si-LK',
    'Slovenščina': 'sl-SI',
    'Basa Sunda': 'su-ID',
    'Slovenčina': 'sk-SK',
    'Suomi': 'fi-FI',
    'Svenska': 'sv-SE',
    'Kiswahili': 'sw-KE',
    'ქართული': 'ka-GE',
    'Հայերեն': 'hy-AM',
    'தமிழ்': 'ta-IN',
    'తెలుగు': 'te-IN',
    'Tiếng Việt': 'vi-VN',
    'Türkçe': 'tr-TR',
    'اُردُو': 'ur-PK',
    'Ελληνικά': 'el-GR',
    'български': 'bg-BG',
    'Pусский': 'ru-RU',
    'Српски': 'sr-RS',
    'Українська': 'uk-UA',
    '한국어': 'ko-KR',
    '中文': 'cmn-Hans-CN',
    '日本語': 'ja-JP',
    'हिन्दी': 'hi-IN',
    'ภาษาไทย': 'th-TH'
  }

  const startQuiz = () => {
    const index = Object.values(langOptions).indexOf(lang.practiceLangCode)
    setLang({ ...lang, practiceLang: Object.keys(langOptions)[index] })

    const selectedQuestions = phrases.sort(() => 0.5 - Math.random()).slice(0, qNum).map(async (question) => {
      const encodedParams = new URLSearchParams();
      encodedParams.set('q', question);
      encodedParams.set('target', lang.practiceLangCode);
      encodedParams.set('source', lang.spokenLang);
      const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'Accept-Encoding': 'application/gzip',
          'X-RapidAPI-Key': '9952ddf3d0msh16805f5bbae5122p142ae8jsnee296583f301',
          'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        },
        body: encodedParams
      };

      const response = await fetch(url, options);
      const result = await response.text();

      console.log(response, result)
      return { english: question, translated: result, correct: undefined }
    })

    console.log(selectedQuestions)
    if (selectedQuestions[0] instanceof Promise === false) {
      setQuestions(selectedQuestions)
      setQuizStart(true)
    }
    else setError(true)
  }

  return (
    <div className='app'>
      {
        quizStart ? 
        <Quiz lang={lang} questions={questions} qNum={qNum} setQuizStart={setQuizStart}/> :
        <>
          <h1>Lingo Lab</h1>
          <label htmlFor="practiceLangCode">Language </label>
          <select name="practiceLangCode" id="practiceLangCode" value={lang.practiceLangCode} onChange={(ev) => setLang({ ...lang, practiceLangCode: ev.target.value, practiceLang: "" })}>
            <option value="" disabled>Select a language</option>
            {Object.keys(langOptions).map((lang) => {
              if (typeof langOptions[lang] !== "string") {
                return <optgroup label={lang} key={lang}>
                  {langOptions[lang].map((nestedLang) => {
                    return <option value={nestedLang} key={nestedLang}>{nestedLang}</option>
                  })}
                </optgroup>
              }
              else return <option key={langOptions[lang]} value={langOptions[lang]}>{lang}</option>
            })}
          </select>
          <br/>
          <label htmlFor="qNum">Questions </label>
          <select name="qNum" id="qNum" value={qNum} onChange={(ev) => setQNum(ev.target.value)}>
            <option key={10} value={10}>10</option>
            <option key={20} value={20}>20</option>
            <option key={30} value={30}>30</option>
          </select>
          <br/>
          <button id="start_button" onClick={startQuiz} disabled={!lang.practiceLangCode}>Start</button>
          {error && <p>API rate exceeded.</p>}
        </>
      }
    </div>
  );
}

export default App;
