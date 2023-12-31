import './App.css'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGES } from './constants'
import { useStore } from './hooks/useStore'
import { ClipboardIcon, SpeakerIcon, SwapIcon } from './componets/Icons'
import { LanguageSelector } from './componets/LanguageSelector'
import { SectionType } from './types.d'
import TextArea from './componets/TextArea'
import { useEffect } from 'react'
import { translate } from './services/translate'
import { useDebounce } from './hooks/useDebounce'

function App () {
  const { setFromLanguage, fromLanguage, swapLanguages, toLanguage, setToLanguage, fromText, result, setFromText, setResult, loading } = useStore()

  const debounceFromText = useDebounce(fromText, 300)

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(err => { console.error(err) })
  }

  const handleSpeaker = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_FOR_LANGUAGES[toLanguage]
    speechSynthesis.speak(utterance)
  }

  useEffect(() => {
    if (debounceFromText === '') return undefined
    translate({ fromText: debounceFromText, fromLanguage, toLanguage })
      .then(result => {
        if (result == null) return undefined
        setResult(result)
      })
      .catch(err => { console.error(err) })
  }, [fromLanguage, debounceFromText])

  return (
    <Container fluid>
      <h1>Google Transate clone</h1>
      <Row className=''>
        <Col className=''>
          <Stack gap={2}>
            <LanguageSelector type={SectionType.From} value={fromLanguage} onChange={setFromLanguage} />
            <TextArea
              type={SectionType.From}
              placeholder='Type something...'
              value={fromText}
              onChange={setFromText}
            />
          </Stack>
        </Col>

        <Col className='' xs='auto'>
          <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={swapLanguages}>
            <SwapIcon />
          </Button>
        </Col>

        <Col className=''>
          <Stack gap={2}>
            <LanguageSelector type={SectionType.To} value={toLanguage} onChange={setToLanguage} />
            <div style={{ position: 'relative' }}>
              <TextArea
                type={SectionType.To}
                placeholder='Translation'
                value={result}
                loading={loading}
                onChange={setResult}
              />
              <div style={{ position: 'absolute', right: 0, bottom: 0, display: 'flex' }}>
                <Button variant='link' onClick={handleClipboard}>
                  <ClipboardIcon />
                </Button>
                <Button variant='link' onClick={handleSpeaker}>
                  <SpeakerIcon />
                </Button>
              </div>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
