import { useState } from 'react'
import { Check, Minus } from 'lucide-react'
import { Reveal } from '../components/Reveal'

interface PricingSectionProps {
  onWaitlist: () => void
}

const freeFeatures = [
  '内置角色与自定义桌宠导入',
  '自定义 Provider、Endpoint 和模型',
  '当前页面与选中文本对话',
  '会话历史、复制与重新生成',
]

const proFeatures = [
  'Free 的全部能力',
  '点击、填写与下载授权',
  '多步骤浏览器任务',
  '风险分级确认与可见执行过程',
]

export function PricingSection({ onWaitlist }: PricingSectionProps) {
  const [annual, setAnnual] = useState(false)

  return (
    <section id="pricing" className="section pricing-section" aria-labelledby="pricing-title">
      <div className="shell">
        <Reveal className="section-intro pricing-intro">
          <h2 id="pricing-title">先免费认识它。需要它动手时，再升级。</h2>
        </Reveal>

        <div className="billing-control" role="group" aria-label="计费周期">
          <button type="button" aria-pressed={!annual} onClick={() => setAnnual(false)}>
            按月
          </button>
          <button type="button" aria-pressed={annual} onClick={() => setAnnual(true)}>
            按年
          </button>
        </div>

        <div className="pricing-grid">
          <Reveal className="pricing-plan free-plan">
            <span className="mono-label">FREE</span>
            <h3>先让它陪你。</h3>
            <div className="price-line">
              <strong>¥0</strong>
              <span>长期使用</span>
            </div>
            <ul>
              {freeFeatures.map((feature) => (
                <li key={feature}>
                  <Check size={17} /> {feature}
                </li>
              ))}
              <li className="not-included">
                <Minus size={17} /> 不包含点击、填写、下载和多步骤任务
              </li>
            </ul>
          </Reveal>

          <Reveal className="pricing-plan pro-plan" delay={0.08}>
            <div className="pro-plan-head">
              <span className="mono-label">PRO</span>
              <span>完整功能试用 7 天</span>
            </div>
            <h3>需要它动手时。</h3>
            <div className="price-line">
              <strong>{annual ? '¥159' : '¥19'}</strong>
              <span>{annual ? '/ 年' : '/ 月'}</span>
            </div>
            <ul>
              {proFeatures.map((feature) => (
                <li key={feature}>
                  <Check size={17} /> {feature}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="pricing-cta">
          <button className="button" type="button" onClick={onWaitlist}>
            加入候补名单
          </button>
          <p>候补名单通道即将开放，当前页面不会保存邮箱。</p>
        </div>
      </div>
    </section>
  )
}
