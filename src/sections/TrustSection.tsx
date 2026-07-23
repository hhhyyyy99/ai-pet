import { useState } from 'react'
import { Check, Eye, FileInput, LockKeyhole, ShieldCheck, Trash2 } from 'lucide-react'
import { Reveal } from '../components/Reveal'

const permissionLevels = [
  {
    name: '读取',
    actions: '读取页面、搜索、滚动',
    behavior: '可连续执行',
    className: 'permission-read',
    icon: Eye,
  },
  {
    name: '交互',
    actions: '点击、填写、下载',
    behavior: '请求明确授权',
    className: 'permission-interact',
    icon: FileInput,
  },
  {
    name: '提交',
    actions: '提交、支付、删除',
    behavior: '必须二次确认',
    className: 'permission-submit',
    icon: Trash2,
  },
]

export function TrustSection() {
  const [automationEnabled, setAutomationEnabled] = useState(false)

  return (
    <section id="privacy" className="section trust-section" aria-labelledby="trust-title">
      <div className="shell">
        <Reveal className="section-intro trust-intro">
          <h2 id="trust-title">它能动手。决定权一直在你。</h2>
          <p>每个动作都有范围、状态和停止入口。敏感操作不会静默发生。</p>
        </Reveal>

        <div className="trust-layout">
          <Reveal className="permission-ladder">
            {permissionLevels.map((level) => {
              const Icon = level.icon
              return (
                <div key={level.name} className={`permission-level ${level.className}`}>
                  <Icon size={20} />
                  <div>
                    <h3>{level.name}</h3>
                    <p>{level.actions}</p>
                  </div>
                  <strong>{level.behavior}</strong>
                </div>
              )
            })}
          </Reveal>

          <Reveal className="privacy-panel" delay={0.1}>
            <div className="privacy-panel-head">
              <div>
                <span className="mono-label">AUTOMATION CONTROL</span>
                <h3>自动化默认关闭</h3>
              </div>
              <button
                type="button"
                className={automationEnabled ? 'switch switch-on' : 'switch'}
                role="switch"
                aria-checked={automationEnabled}
                aria-label="浏览器自动化"
                onClick={() => setAutomationEnabled((enabled) => !enabled)}
              >
                <span />
              </button>
            </div>
            <div className={automationEnabled ? 'privacy-status status-enabled' : 'privacy-status'}>
              <ShieldCheck size={21} />
              <div>
                <strong>{automationEnabled ? '自动化已在演示中开启' : '当前不会执行网页操作'}</strong>
                <span>{automationEnabled ? '中高风险动作仍会请求确认' : '页面聊天与内容理解仍然可用'}</span>
              </div>
            </div>

            <ul className="privacy-facts">
              <li>
                <LockKeyhole size={17} />
                <span>API Key 加密保存在浏览器本地存储中。</span>
              </li>
              <li>
                <Check size={17} />
                <span>隐私会话不写入持久存储。</span>
              </li>
              <li>
                <Eye size={17} />
                <span>页面正文与选中文本只在请求期间使用。</span>
              </li>
            </ul>
            <p className="provider-disclosure">
              消息仍会发送到你选择的模型 Provider。ai-pet 不会把它描述成“所有数据永不离开设备”。
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
