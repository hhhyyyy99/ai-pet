import picoImage from './assets/characters/pico.webp'
import picoIdleImage from './assets/characters/pico-idle.webp'
import picoReadingImage from './assets/characters/pico-reading.webp'
import picoWorkingImage from './assets/characters/pico-working.webp'
import mossImage from './assets/characters/moss.webp'
import boltImage from './assets/characters/bolt.webp'

export type CharacterId = 'pico' | 'moss' | 'bolt'

export interface CharacterProfile {
  id: CharacterId
  name: string
  role: string
  tone: string
  quote: string
  image: string
  color: string
  states: string[]
}

export const characters: CharacterProfile[] = [
  {
    id: 'pico',
    name: 'Pico',
    role: '好奇的研究搭档',
    tone: '轻快，会主动追问',
    quote: '我找到了三种说法。要先看最可靠的来源，还是先看结论？',
    image: picoImage,
    color: '#b7f34a',
    states: ['探头', '扫描', '记录'],
  },
  {
    id: 'moss',
    name: 'Moss',
    role: '安静的整理者',
    tone: '温和，结构清楚',
    quote: '我已经按主题整理好了。重复信息放在最后一组。',
    image: mossImage,
    color: '#7f9470',
    states: ['收集', '分类', '归档'],
  },
  {
    id: 'bolt',
    name: 'Bolt',
    role: '专注的执行者',
    tone: '简短，直接确认',
    quote: '表单已填写。提交前需要你确认一次。',
    image: boltImage,
    color: '#5176d8',
    states: ['启动', '等待', '完成'],
  },
]

export const petStates = [
  { label: '待机', detail: '常驻浏览器边缘', state: 'idle', image: picoIdleImage },
  { label: '理解', detail: '俯身读取当前页面', state: 'reading', image: picoReadingImage },
  { label: '执行', detail: '移动并完成网页步骤', state: 'working', image: picoWorkingImage },
  { label: '等待确认', detail: '指向关键动作并询问你', state: 'confirm', image: picoImage },
]

export const faqItems = [
  {
    question: 'ai-pet 可以接入哪些模型？',
    answer:
      '你可以使用预设的 OpenAI、Anthropic Provider，也可以填写 OpenAI-compatible Endpoint、API Key 和模型 ID。协议兼容的本地服务也可以接入。',
  },
  {
    question: '它会不会未经同意提交表单？',
    answer:
      '不会。点击、填写和下载需要明确授权；提交、支付和删除等高风险动作必须再次确认。你可以随时停止任务。',
  },
  {
    question: '7 天试用结束后会自动扣费吗？',
    answer: '不会。试用结束后自动回到 Free，只有主动订阅 Pro 才会收费。',
  },
  {
    question: 'Pro 是否包含模型 API 费用？',
    answer: '不包含。模型 API 费用由你选择的 Provider 按其规则收取。',
  },
  {
    question: '我可以使用自己的桌宠吗？',
    answer:
      '可以，不限于内置角色。你可以导入 PNG、WebP 或 GIF，也可以使用完整角色包定义名字、人格、对话语气，以及待机、思考、完成和确认等动作。首发不包含 AI 角色生成和声音克隆。',
  },
]

export const navItems = [
  { href: '#characters', label: '角色', id: 'characters' },
  { href: '#models', label: '模型', id: 'models' },
  { href: '#automation', label: '自动化', id: 'automation' },
  { href: '#pricing', label: '价格', id: 'pricing' },
]
