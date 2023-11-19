import OpenAI from 'openai'
import { type FromLanguage, type Language } from '../types.d'
import { SUPPORTED_LANGUAGES } from '../constants'

const apiKey = import.meta.env.VITE_OPENAI_API_KEY

const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true })

export async function translate ({
  fromLanguage,
  toLanguage,
  fromText
}: {
  fromLanguage: FromLanguage
  toLanguage: Language
  fromText: string
}) {
  if (fromLanguage === toLanguage) {
    return fromText
  }

  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content: 'You are an AI that translates text. You will receive a text from the user. Do not answer, just translate the text. The original language is surrounded by `{{` and `}}`. You can also receive auto which means you that you have to detect the language and translate it to the other language. The language you have to translate to is surrounded by `[[` and `]]`.'
    },
    {
      role: 'user',
      content: 'Hoooola buenas, esto es una prueba de traducción de español a otro idioma. {{Spanish}} [[English]]'
    },
    {
      role: 'assistant',
      content: 'Hello good morning, this is a translation test from Spanish to another language.'
    },
    {
      role: 'user',
      content: 'How are you? {{auto}} [[Deustch]]'
    },
    {
      role: 'assistant',
      content: 'Wie geht es dir?'
    },
    {
      role: 'user',
      content: 'I am fine, thank you. {{auto}} [[French]]'
    },
    {
      role: 'assistant',
      content: 'Je vais bien, merci.'
    },
    {
      role: 'user',
      content: 'Goodbye. {{auto}} [[Japanese]]'
    },
    {
      role: 'assistant',
      content: 'さようなら。'
    }
  ]

  const fromCode = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]
  const toCode = SUPPORTED_LANGUAGES[toLanguage]

  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    model: 'gpt-3.5-turbo',
    messages: [
      ...messages,
      {
        role: 'user',
        content: `${fromText} {{${fromCode}}} [[${toCode}]]`
      }
    ] as OpenAI.Chat.ChatCompletionMessageParam[]
  }

  const completion: OpenAI.Chat.ChatCompletion = await openai.chat.completions.create(params)

  return completion.choices[0].message.content
}
