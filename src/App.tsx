import './App.css'
import { AUTO_LANGUAGE } from './constants'
import { useStore } from './hooks/useStore'

function App () {
  const { setFromLanguage, fromLanguage, swapLanguages, toLanguage } = useStore()

  return (
    <div className='App'>
      <h1>Google Transate clone</h1>
      <div className="">
        <div className="">
          <h2>from</h2>
          <strong>{fromLanguage}</strong>
        </div>
        <div className="">
          <button disabled={fromLanguage === AUTO_LANGUAGE} onClick={swapLanguages}>
            Swap languages
          </button>
        </div>
        <div className="">
          <h2>to</h2>
          <strong>{toLanguage}</strong>
        </div>
      </div>
    </div>
  )
}

export default App
