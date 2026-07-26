import { useState, type CSSProperties, type KeyboardEvent } from 'react'
import { ImagePlus, Upload } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { characters, type CharacterId } from '../content'
import { Reveal } from '../components/Reveal'
import { SpritePet } from '../components/SpritePet'

type CharacterSelection = CharacterId | 'custom'

const selectionOrder: CharacterSelection[] = [...characters.map((item) => item.id), 'custom']

export function CharacterSection() {
  const [selected, setSelected] = useState<CharacterSelection>('xiaotai')
  const reduceMotion = useReducedMotion()
  const character = selected === 'custom'
    ? null
    : characters.find((item) => item.id === selected) ?? characters[0]
  const characterColor = character?.color ?? '#b7f34a'

  const selectAndFocus = (selection: CharacterSelection) => {
    setSelected(selection)
    window.requestAnimationFrame(() => document.getElementById(`character-tab-${selection}`)?.focus())
  }

  const handleTabKey = (event: KeyboardEvent<HTMLButtonElement>, current: CharacterSelection) => {
    const currentIndex = selectionOrder.indexOf(current)
    let nextIndex: number | null = null

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % selectionOrder.length
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + selectionOrder.length) % selectionOrder.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = selectionOrder.length - 1
    }

    if (nextIndex === null) return
    event.preventDefault()
    selectAndFocus(selectionOrder[nextIndex])
  }

  return (
    <section id="characters" className="section character-section" aria-labelledby="characters-title">
      <div className="shell">
        <Reveal className="section-intro character-intro">
          <h2 id="characters-title">带上你自己的桌宠。</h2>
          <p>小钛、Moss 和 Bolt 只是内置模板。你可以导入自己的角色，并定义名字、性格、语气和反馈动作。</p>
        </Reveal>

        <div className="character-stage" style={{ '--character-color': characterColor } as CSSProperties}>
          <div className="character-tabs" role="tablist" aria-label="选择内置模板或导入自己的桌宠">
            {characters.map((item) => (
              <button
                id={`character-tab-${item.id}`}
                key={item.id}
                type="button"
                role="tab"
                tabIndex={item.id === selected ? 0 : -1}
                aria-selected={item.id === selected}
                aria-controls="character-panel"
                className={item.id === selected ? 'character-tab character-tab-active' : 'character-tab'}
                onClick={() => setSelected(item.id)}
                onKeyDown={(event) => handleTabKey(event, item.id)}
              >
                <span>{item.name}</span>
                <small>{item.role}</small>
              </button>
            ))}
            <button
              id="character-tab-custom"
              type="button"
              role="tab"
              tabIndex={selected === 'custom' ? 0 : -1}
              aria-selected={selected === 'custom'}
              aria-controls="character-panel"
              className={selected === 'custom' ? 'character-tab character-tab-active' : 'character-tab'}
              onClick={() => setSelected('custom')}
              onKeyDown={(event) => handleTabKey(event, 'custom')}
            >
              <span><Upload size={17} /> 自定义</span>
              <small>导入你的桌宠</small>
            </button>
          </div>

          <div
            id="character-panel"
            className="character-panel"
            role="tabpanel"
            aria-labelledby={`character-tab-${selected}`}
            aria-live="polite"
          >
            <div className="character-visual">
              <AnimatePresence mode="wait">
                {character?.visual === 'sprite' ? (
                  <motion.div
                    key={character.id}
                    className="character-sprite-motion"
                    initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -14 }}
                    transition={{ duration: 0.24 }}
                  >
                    <SpritePet
                      state="idle"
                      className="character-sprite"
                      label={`${character.name}，${character.role}`}
                    />
                  </motion.div>
                ) : character ? (
                  <motion.img
                    key={character.id}
                    src={character.image}
                    alt={`${character.name}，${character.role}`}
                    width={1024}
                    height={1536}
                    loading="lazy"
                    decoding="async"
                    initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -14 }}
                    transition={{ duration: 0.24 }}
                  />
                ) : (
                  <motion.div
                    key="custom-empty"
                    className="custom-pet-stage"
                    initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -14 }}
                    transition={{ duration: 0.24 }}
                  >
                    <div className="custom-pet-empty">
                      <ImagePlus size={42} strokeWidth={1.5} />
                      <strong>你的角色会出现在这里</strong>
                      <span>PNG / WebP / GIF</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {character && <span className="character-shadow" aria-hidden="true" />}
            </div>

            <AnimatePresence mode="wait">
              {character ? (
                <motion.div
                  key={character.id}
                  className="character-profile"
                  initial={reduceMotion ? false : { opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.24 }}
                >
                  <span className="mono-label">内置角色模板</span>
                  <h3>{character.name}</h3>
                  <dl>
                    <div>
                      <dt>角色</dt>
                      <dd>{character.role}</dd>
                    </div>
                    <div>
                      <dt>语气</dt>
                      <dd>{character.tone}</dd>
                    </div>
                  </dl>
                  <blockquote>“{character.quote}”</blockquote>
                  <div className="character-states" aria-label="任务动作">
                    {character.states.map((state) => <span key={state}>{state}</span>)}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="custom-profile"
                  className="character-profile custom-character-profile"
                  initial={reduceMotion ? false : { opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.24 }}
                >
                  <span className="mono-label">自定义角色</span>
                  <h3>你的桌宠</h3>
                  <p className="custom-character-lede">从一张角色图开始，也可以导入带有多套动作的完整角色包。</p>
                  <dl>
                    <div>
                      <dt>外观</dt>
                      <dd>PNG、WebP、GIF 或完整角色包</dd>
                    </div>
                    <div>
                      <dt>个性</dt>
                      <dd>名字、语气、习惯与反馈动作</dd>
                    </div>
                  </dl>
                  <div className="custom-pet-note">
                    <Upload size={19} aria-hidden="true" />
                    <span>
                      <strong>支持导入自定义角色</strong>
                      <small>在 ai-pet 产品内配置图片、动作与角色个性</small>
                    </span>
                  </div>
                  <div className="character-states" aria-label="可自定义的反馈动作">
                    {['待机', '思考', '完成', '确认'].map((state) => <span key={state}>{state}</span>)}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
