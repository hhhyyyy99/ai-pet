import { useState } from 'react'
import { Check, ChevronRight, Circle, MousePointer2, Search, ShieldAlert, Square, Table2 } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { Reveal } from '../components/Reveal'
import { characters } from '../content'

type Decision = 'pending' | 'allowed' | 'cancelled'

const taskActions = [
  { label: '读取查询条件', icon: Search },
  { label: '打开旅行查询页面', icon: MousePointer2 },
  { label: '填写日期和地点', icon: Check },
  { label: '读取三条结果', icon: Table2 },
]

export function AutomationSection() {
  const [decision, setDecision] = useState<Decision>('pending')
  const reduceMotion = useReducedMotion()

  return (
    <section id="automation" className="section automation-section" aria-labelledby="automation-title">
      <div className="shell">
        <Reveal className="section-intro automation-intro">
          <h2 id="automation-title">说出结果。它负责网页里的步骤。</h2>
          <p>搜索、点击、填写与整理都在可见流程中完成。需要决定时，它会停下来问你。</p>
        </Reveal>

        <div className="automation-stack">
          <article className="automation-card automation-card-plan">
            <div className="automation-card-copy">
              <h3>看懂任务</h3>
              <blockquote>“找出周五最早的三班高铁，把出发时间和票价整理给我。”</blockquote>
              <div className="task-plan">
                <span>目标</span>
                <strong>三条可比较的车次结果</strong>
                <span>当前标签页</span>
                <strong>铁路出行查询</strong>
              </div>
            </div>
            <div className="automation-card-visual plan-visual">
              <img src={characters[2].image} alt="Bolt 正在分析任务" width={1024} height={1536} />
              <div className="plan-orbit" aria-hidden="true">
                <span>查询</span>
                <ChevronRight size={18} />
                <span>比较</span>
                <ChevronRight size={18} />
                <span>整理</span>
              </div>
            </div>
          </article>

          <article className="automation-card automation-card-run">
            <div className="automation-card-copy">
              <h3>执行网页步骤</h3>
              <p>每个动作都显示当前状态。你可以随时停止，而不需要等整个任务结束。</p>
              <button className="stop-button" type="button">
                <Square size={14} fill="currentColor" /> 停止任务
              </button>
            </div>
            <div className="action-console" aria-label="自动化动作记录">
              <div className="action-console-head">
                <span className="status-light" /> 正在执行
                <span className="task-data-label">任务数据</span>
                <span>4 / 5</span>
              </div>
              {taskActions.map((action, index) => {
                const Icon = action.icon
                const current = index === taskActions.length - 1
                return (
                  <motion.div
                    key={action.label}
                    className={current ? 'action-row action-current' : 'action-row action-done'}
                    initial={reduceMotion ? false : { opacity: 0, x: 14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <Icon size={17} />
                    <span>{action.label}</span>
                    {current ? <Circle size={11} fill="currentColor" /> : <Check size={15} />}
                  </motion.div>
                )
              })}
              <div className="result-table">
                <span>G101</span><b>06:43</b><em>¥553</em>
                <span>G103</span><b>06:52</b><em>¥553</em>
                <span>G105</span><b>07:17</b><em>¥576</em>
              </div>
            </div>
          </article>

          <article className="automation-card automation-card-confirm">
            <div className="automation-card-copy">
              <h3>在关键动作前停下</h3>
              <p>支付、删除与最终提交始终需要再次确认。敏感操作不会静默发生。</p>
            </div>
            <div className="confirmation-panel" aria-live="polite">
              <ShieldAlert size={26} />
              <span className="risk-label">需要授权</span>
              {decision === 'pending' && (
                <>
                  <h4>即将点击“提交查询”</h4>
                  <p>这会向当前网站发送日期、出发地与目的地。</p>
                  <div className="confirmation-actions">
                    <button className="button" type="button" onClick={() => setDecision('allowed')}>
                      允许一次
                    </button>
                    <button className="button button-ghost" type="button" onClick={() => setDecision('cancelled')}>
                      取消
                    </button>
                  </div>
                </>
              )}
              {decision === 'allowed' && (
                <div className="decision-result decision-allowed">
                  <Check size={20} /> 已允许一次。下次仍会询问。
                </div>
              )}
              {decision === 'cancelled' && (
                <div className="decision-result decision-cancelled">
                  <Square size={17} fill="currentColor" /> 已取消，任务没有提交。
                </div>
              )}
              {decision !== 'pending' && (
                <button className="text-button" type="button" onClick={() => setDecision('pending')}>
                  重新选择
                </button>
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
