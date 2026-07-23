import { useState } from 'react'
import { Check, Cloud, LoaderCircle, Server, SlidersHorizontal } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { BrowserFrame } from '../components/BrowserFrame'
import { Reveal } from '../components/Reveal'

type Provider = 'OpenAI' | 'Anthropic' | 'Custom'
type ConnectionState = 'idle' | 'testing' | 'success'

export function ModelSection() {
  const [provider, setProvider] = useState<Provider>('Custom')
  const [connection, setConnection] = useState<ConnectionState>('idle')
  const reduceMotion = useReducedMotion()

  const testConnection = () => {
    setConnection('testing')
    window.setTimeout(() => setConnection('success'), 900)
  }

  return (
    <section id="models" className="section model-section" aria-labelledby="models-title">
      <div className="shell">
        <Reveal className="section-intro model-intro">
          <h2 id="models-title">模型由你选。桌宠依然是你的。</h2>
          <p>
            使用预设 Provider，或填写 OpenAI-compatible Endpoint、API Key 和模型 ID。兼容的本地服务也可以接入。
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <BrowserFrame title="模型与渠道" className="model-browser">
            <div className="model-layout">
              <aside className="provider-sidebar" aria-label="Provider 选择">
                <span className="mono-label">PROVIDERS</span>
                {(['OpenAI', 'Anthropic', 'Custom'] as Provider[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={provider === item ? 'provider-button provider-active' : 'provider-button'}
                    onClick={() => {
                      setProvider(item)
                      setConnection('idle')
                    }}
                  >
                    {item === 'Custom' ? <SlidersHorizontal size={17} /> : <Cloud size={17} />}
                    <span>{item}</span>
                  </button>
                ))}
                <div className="local-model-note">
                  <Server size={17} />
                  <span>兼容本地服务</span>
                </div>
              </aside>

              <div className="model-form" aria-live="polite">
                <div className="model-form-head">
                  <div>
                    <span className="mono-label">ACTIVE PROVIDER</span>
                    <h3>{provider}</h3>
                  </div>
                  <span className="secure-copy">Key 加密保存在本地</span>
                </div>

                <div className="field-grid">
                  <label>
                    <span>Endpoint</span>
                    <input readOnly value={provider === 'Custom' ? 'http://localhost:11434/v1' : '使用官方 Endpoint'} />
                  </label>
                  <label>
                    <span>Model ID</span>
                    <input readOnly value={provider === 'Custom' ? 'qwen3:14b' : `${provider.toLowerCase()}-chat`} />
                  </label>
                  <label className="api-field">
                    <span>API Key</span>
                    <input readOnly type="password" value="ai-pet-local-key" />
                  </label>
                </div>

                <div className="connection-row">
                  <button className="button button-dark" type="button" onClick={testConnection} disabled={connection === 'testing'}>
                    {connection === 'testing' ? (
                      <LoaderCircle className="spin" size={17} />
                    ) : connection === 'success' ? (
                      <Check size={17} />
                    ) : null}
                    {connection === 'testing' ? '正在测试' : connection === 'success' ? '连接成功' : '测试连接'}
                  </button>
                  <motion.span
                    className={`connection-status connection-${connection}`}
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={connection}
                  >
                    {connection === 'idle' && '等待测试'}
                    {connection === 'testing' && '正在验证 Endpoint 与模型 ID'}
                    {connection === 'success' && '218 ms，模型可以用于新会话'}
                  </motion.span>
                </div>

                <div className="conversation-model">
                  <span>当前会话</span>
                  <strong>{provider} / {provider === 'Custom' ? 'qwen3:14b' : `${provider.toLowerCase()}-chat`}</strong>
                  <span>每个会话都可以选择不同模型</span>
                </div>
              </div>
            </div>
          </BrowserFrame>
        </Reveal>
      </div>
    </section>
  )
}
