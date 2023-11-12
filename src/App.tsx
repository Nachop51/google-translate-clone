import './App.css'
import { useStore } from './hooks/useStore'

function App () {
  const { setFromLanguage, fromLanguage } = useStore()

  return (
    <div className='App'>
      <h1>Google Transate clone</h1>
      <button onClick={() => { setFromLanguage('en') }}>{fromLanguage}</button>
    </div>
  )
}

export default App
