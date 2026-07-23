import { CheckCircle2, FileText, Link2, Quote } from 'lucide-react'
import { characters } from '../content'
import { BrowserFrame } from '../components/BrowserFrame'
import { Reveal } from '../components/Reveal'

export function ChatSection() {
  return (
    <section className="section chat-section" aria-labelledby="chat-title">
      <div className="shell">
        <Reveal className="section-intro chat-intro">
          <h2 id="chat-title">它知道你正在看什么。</h2>
          <p>选中一段文字，或直接提问当前页面。ai-pet 会带着网页上下文继续对话。</p>
        </Reveal>

        <Reveal delay={0.1}>
          <BrowserFrame title="服务条款" url="docs.example.test/terms" className="chat-browser">
            <div className="context-demo">
              <article className="terms-page">
                <span className="mono-label">SERVICE TERMS</span>
                <h3>价格与方案调整</h3>
                <p>
                  服务方可以根据产品成本与功能变化更新付费方案。任何价格调整都应在生效前通知当前订阅用户。
                </p>
                <p className="selected-copy">
                  服务方可以在提前 30 天通知后调整价格，当前计费周期内不会受到影响。
                </p>
                <p>用户可以在新价格生效前取消续订，并继续使用到当前周期结束。</p>
              </article>

              <div className="context-bridge" aria-hidden="true">
                <span />
                <img src={characters[0].image} alt="" width={1024} height={1536} />
              </div>

              <aside className="context-chat" aria-label="页面上下文聊天演示">
                <div className="context-chat-head">
                  <div>
                    <strong>Pico</strong>
                    <span>Custom / atlas-3</span>
                  </div>
                  <span className="bound-status">
                    <Link2 size={13} /> 已绑定此页
                  </span>
                </div>
                <div className="context-chip">
                  <Quote size={14} /> 已选择 41 个字
                </div>
                <div className="user-message">这段条款对我意味着什么？</div>
                <div className="assistant-message">
                  服务方可以在提前 30 天通知后调整价格。需要我把风险点整理成清单吗？
                </div>
                <div className="context-ready">
                  <CheckCircle2 size={15} /> 回答使用了当前页面内容
                </div>
              </aside>
            </div>
          </BrowserFrame>
        </Reveal>

        <div className="context-capabilities" aria-label="页面聊天能力">
          <div>
            <FileText size={19} />
            <strong>当前页面</strong>
            <span>每次提问前刷新标题、地址与正文。</span>
          </div>
          <div>
            <Quote size={19} />
            <strong>选中文本</strong>
            <span>你选中的内容会成为本轮问题重点。</span>
          </div>
          <div>
            <Link2 size={19} />
            <strong>会话记忆</strong>
            <span>模型与页面绑定在同一个会话中持续可见。</span>
          </div>
        </div>
      </div>
    </section>
  )
}
