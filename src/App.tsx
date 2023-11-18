import './App.css'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import { AUTO_LANGUAGE } from './constants'
import { useStore } from './hooks/useStore'
import { SwapIcon } from './componets/Icons'
import { LanguageSelector } from './componets/LanguageSelector'
import { SectionType } from './types.d'
import TextArea from './componets/TextArea'

function App () {
  const { setFromLanguage, fromLanguage, swapLanguages, toLanguage, setToLanguage, fromText, result, setFromText, setResult, loading } = useStore()

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
            <TextArea
              type={SectionType.To}
              placeholder='Translation'
              value={result}
              loading={loading}
              onChange={setResult}
            />
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
