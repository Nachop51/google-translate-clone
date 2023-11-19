import React from 'react'
import { Form } from 'react-bootstrap'
import { SectionType } from '../types.d'

// interface CommonProps {
//   onChange: (value: string) => void
//   value: string
//   placeholder: string
// }

// type Props =
//   | { type: SectionType.From, loading?: undefined } & CommonProps
//   | { type: SectionType.To, loading: boolean } & CommonProps

interface Props {
  loading?: boolean
  type: SectionType
  value: string
  onChange: (value: string) => void
  placeholder: string
}

const commonStyles = { border: 0, height: '200px', resize: 'none' }

const getPlaceHolder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
  if (type === SectionType.From) {
    return 'Type something...'
  } else if (type === SectionType.To) {
    return loading === true ? 'Translating...' : 'Translation'
  }
}

const TextArea: React.FC<Props> = ({ loading, type, value, onChange, placeholder }) => {
  const styles = type === SectionType.From
    ? commonStyles
    : { ...commonStyles, backgroundColor: '#f5f5f5' }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
    <Form.Control
      // @ts-expect-error - Something is wrong with CSS and typescript
      style={styles}
      as='textarea'
      rows={3}
      placeholder={getPlaceHolder({ type, loading })}
      autoFocus={type === SectionType.From}
      onChange={handleChange}
    />
  )
}

export default TextArea
