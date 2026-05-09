import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Lightbulb, Sparkles, ChevronDown, ChevronUp } from 'lucide-react'
import { SCRATCH_AREAS } from '../data/missions.js'
import BlockReference from './BlockReference.jsx'

/* ── Area badge ── */
function AreaBadge({ area }) {
  if (!area) return null
  const meta = SCRATCH_AREAS[area]
  if (!meta) {
    return (
      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/08 text-white/50">
        {area}
      </span>
    )
  }
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full"
      style={{ backgroundColor: meta.color + '22', color: meta.color, border: `1px solid ${meta.color}44` }}
    >
      {meta.icon} {meta.label}
    </span>
  )
}

/* ── Numbered action ── */
function ActionItem({ action, index }) {
  const isHighlight = !!action.highlight

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.06 + index * 0.07 }}
      className="flex items-start gap-3"
    >
      {/* Number bubble */}
      <span className="w-6 h-6 rounded-full bg-purple-500/30 border border-purple-500/40 flex items-center justify-center text-purple-300 font-black text-xs shrink-0 mt-0.5">
        {index + 1}
      </span>

      <div className="flex-1 min-w-0">
        <p className="text-white/85 text-sm leading-relaxed">
          {action.text.split(isHighlight ? action.highlight : '\0').map((part, pi, arr) => (
            <span key={pi}>
              {part}
              {pi < arr.length - 1 && (
                <a
                  href={`https://${action.highlight}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 text-blue-400 hover:text-blue-300 font-bold underline underline-offset-2"
                >
                  {action.highlight}
                  <ExternalLink size={10} />
                </a>
              )}
            </span>
          ))}
        </p>

        {action.area && (
          <div className="mt-1.5">
            <AreaBadge area={
              action.area === 'Events Palette'    ? 'palette-events'    :
              action.area === 'Motion Palette'    ? 'palette-motion'    :
              action.area === 'Control Palette'   ? 'palette-control'   :
              action.area === 'Sensing Palette'   ? 'palette-sensing'   :
              action.area === 'Variables Palette' ? 'palette-variables' :
              action.area === 'Looks Palette'     ? 'palette-looks'     :
              action.area === 'Sprite Panel'      ? 'sprites'           :
              action.area === 'Sprite Library'    ? 'sprites'           :
              action.area === 'Backdrop Selector' ? 'backdrop'          :
              action.area === 'Scripts Area'      ? 'scripts'           :
              action.area === 'Paint Editor'      ? 'paint-editor'      :
              action.area === 'Stage'             ? 'green-flag'        :
              null
            } />
          </div>
        )}
      </div>
    </motion.div>
  )
}

/* ── Scratch Interface Diagram ── */
function ScratchDiagram({ area }) {
  const meta = SCRATCH_AREAS[area]
  if (!meta) return null

  /* ── Costumes-tab variant ── */
  if (area === 'costumes') {
    return (
      <div className="relative w-full rounded-xl overflow-hidden border border-white/10 bg-[#1e1b38]" style={{ height: 156 }}>
        {/* Tab bar */}
        <div className="absolute top-0 left-0 right-0 h-7 bg-[#2d2a48] flex items-end px-2 gap-0.5 border-b border-white/06">
          {['Code', 'Costumes', 'Sounds'].map(t => (
            <div
              key={t}
              className="px-2.5 py-0.5 rounded-t text-[8px] font-black"
              style={t === 'Costumes'
                ? { background: '#d946ef22', color: '#d946ef', borderBottom: '2px solid #d946ef' }
                : { color: 'rgba(255,255,255,0.25)' }}
            >
              {t}
            </div>
          ))}
        </div>

        {/* Costume list panel */}
        <div className="absolute top-7 left-0 w-[28%] h-[calc(100%-28px)] bg-[#252040] border-r border-white/06 flex flex-col gap-1.5 p-1.5">
          {['#4C97FF','#d946ef'].map((c, i) => (
            <div
              key={i}
              className="flex items-center gap-1 rounded p-1"
              style={{ background: i === 0 ? c + '22' : 'transparent', border: i === 0 ? `1px solid ${c}55` : '1px solid transparent' }}
            >
              <div className="w-6 h-6 rounded bg-white/08 flex items-center justify-center text-[11px]">{i === 0 ? '🐱' : '🐱'}</div>
              <div className="text-[6px] font-bold" style={{ color: i === 0 ? c : 'rgba(255,255,255,0.3)' }}>
                costume{i + 1}
              </div>
            </div>
          ))}
          <div className="mt-auto flex items-center justify-center gap-0.5 text-[6px] text-white/25 font-bold">
            + costume
          </div>
        </div>

        {/* Paint editor canvas */}
        <div className="absolute top-7 left-[28%] right-0 h-[calc(100%-28px)] bg-[#1a1830] flex items-center justify-center">
          {/* Toolbar strip */}
          <div className="absolute left-0 top-0 bottom-0 w-5 bg-[#252040] border-r border-white/06 flex flex-col items-center gap-1 pt-1.5">
            {['🪣','✏️','◻️','↩️'].map(ic => (
              <div key={ic} className="text-[8px] opacity-50">{ic}</div>
            ))}
          </div>
          {/* Canvas with character outline */}
          <div className="relative ml-4">
            <div className="w-16 h-16 rounded-full bg-white/04 border border-dashed border-white/10 flex items-center justify-center text-2xl opacity-60">
              🐱
            </div>
            {/* Color swatches row */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-0.5">
              {['#ff6b9d','#4C97FF','#ffd700','#ff6b35','#2dc653','#d946ef'].map(c => (
                <div key={c} className="w-2.5 h-2.5 rounded-full border border-white/10" style={{ background: c }} />
              ))}
            </div>
          </div>
        </div>

        {/* Animated highlight — pulses on the tab */}
        <motion.div
          key="costumes-tab-hl"
          className="absolute rounded pointer-events-none"
          style={{ top: 0, left: '17%', width: '23%', height: '17%' }}
          animate={{
            boxShadow: [
              `0 0 0px 2px ${meta.color}00, inset 0 0 0px 2px ${meta.color}00`,
              `0 0 8px 3px ${meta.color}88, inset 0 0 0px 2px ${meta.color}88`,
              `0 0 0px 2px ${meta.color}00, inset 0 0 0px 2px ${meta.color}00`,
            ],
            backgroundColor: [`${meta.color}00`, `${meta.color}18`, `${meta.color}00`],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Label badge */}
        <div
          className="absolute top-1.5 right-1.5 flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-black text-white shadow-md"
          style={{ background: meta.color }}
        >
          {meta.icon} {meta.label}
        </div>
      </div>
    )
  }

  const highlights = {
    'overview':           { top: '5%',  left: '5%',  w: '90%', h: '90%'  },
    'backdrop':           { top: '60%', left: '68%', w: '30%', h: '38%'  },
    'sprites':            { top: '60%', left: '40%', w: '26%', h: '38%'  },
    'palette-events':     { top: '8%',  left: '18%', w: '20%', h: '12%'  },
    'palette-motion':     { top: '20%', left: '18%', w: '20%', h: '12%'  },
    'palette-control':    { top: '32%', left: '18%', w: '20%', h: '12%'  },
    'palette-sensing':    { top: '44%', left: '18%', w: '20%', h: '12%'  },
    'palette-variables':  { top: '56%', left: '18%', w: '20%', h: '12%'  },
    'palette-looks':      { top: '20%', left: '18%', w: '20%', h: '12%'  },
    'scripts':            { top: '8%',  left: '40%', w: '26%', h: '86%'  },
    'green-flag':         { top: '5%',  left: '68%', w: '30%', h: '8%'   },
    'paint-editor':       { top: '5%',  left: '5%',  w: '90%', h: '90%'  },
  }

  const hl = highlights[area] ?? { top: '5%', left: '5%', w: '90%', h: '90%' }

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-white/10 bg-[#1e1b38]" style={{ height: 156 }}>
      {/* Scratch-like layout (simplified) */}
      {/* Category strip */}
      <div className="absolute top-0 left-0 w-[17%] h-full bg-[#383355] flex flex-col justify-start pt-6 gap-1 px-1">
        {['Events','Motion','Control','Looks','Sensing','Variables'].map((c, i) => (
          <div key={c} className="text-[6px] font-bold text-white/40 px-1 py-0.5 rounded text-center leading-tight"
            style={{ background: ['#FFAB1920','#4C97FF20','#FF8C1A20','#9966FF20','#5CB1D620','#FF8C1A20'][i] }}>
            {c}
          </div>
        ))}
      </div>
      {/* Palette column */}
      <div className="absolute top-0 left-[17%] w-[23%] h-full bg-[#2d2a48] flex flex-col gap-1 p-1.5 pt-2">
        {['#FFAB19','#4C97FF','#FF8C1A','#9966FF'].map((c, i) => (
          <div key={i} className="h-3 rounded-sm opacity-60" style={{ background: c, width: `${60 + i * 8}%` }} />
        ))}
      </div>
      {/* Scripts area */}
      <div className="absolute top-0 left-[40%] w-[27%] h-full bg-[#252040] flex flex-col gap-1 p-2 pt-3">
        {['#FFAB19','#FF8C1A','#4C97FF','#FF8C1A'].map((c, i) => (
          <div key={i} className="h-3 rounded-sm" style={{ background: c + '66', marginLeft: `${i > 0 ? 8 : 0}px`, width: `${80 - i * 5}%` }} />
        ))}
      </div>
      {/* Stage */}
      <div className="absolute top-0 left-[67%] w-[33%] h-[62%] bg-[#1a273d] border-b border-white/05">
        {/* Green flag */}
        <div className="absolute top-1 left-1 flex gap-1">
          <div className="w-4 h-3 rounded-sm bg-green-500/70 flex items-center justify-center text-white text-[7px]">▶</div>
          <div className="w-4 h-3 rounded-sm bg-red-500/50" />
        </div>
        <div className="absolute top-5 left-1/2 -translate-x-1/2 text-lg opacity-50">🐱</div>
      </div>
      {/* Sprite list */}
      <div className="absolute top-[62%] left-[67%] w-[33%] h-[38%] bg-[#252040] flex items-center gap-2 px-2">
        <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-base">🐱</div>
        <div className="w-8 h-8 rounded bg-white/06 flex items-center justify-center text-[10px] text-white/30">+</div>
      </div>
      {/* Label row */}
      {['Blocks', 'Palette', 'Scripts', 'Stage', 'Sprites'].map((l, i) => (
        <div
          key={l}
          className="absolute bottom-0.5 text-[7px] font-bold text-white/25 text-center"
          style={{ left: [0,'17%','40%','67%','67%'][i], width: ['17%','23%','27%','33%','33%'][i] }}
        >
          {l}
        </div>
      ))}

      {/* Animated highlight */}
      <motion.div
        key={area}
        className="absolute rounded pointer-events-none"
        style={{ top: hl.top, left: hl.left, width: hl.w, height: hl.h }}
        animate={{
          boxShadow: [
            `0 0 0px 2px ${meta.color}00, inset 0 0 0px 2px ${meta.color}00`,
            `0 0 8px 3px ${meta.color}88, inset 0 0 0px 2px ${meta.color}88`,
            `0 0 0px 2px ${meta.color}00, inset 0 0 0px 2px ${meta.color}00`,
          ],
          backgroundColor: [`${meta.color}00`, `${meta.color}18`, `${meta.color}00`],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Label badge */}
      <div
        className="absolute top-1.5 right-1.5 flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-black text-white shadow-md"
        style={{ background: meta.color }}
      >
        {meta.icon} {meta.label}
      </div>
    </div>
  )
}

/* ── Main component ── */
export default function StepInstructions({ step }) {
  const [showDiagram, setShowDiagram] = useState(false)
  const [showKnow, setShowKnow]       = useState(false)

  const areaMeta = SCRATCH_AREAS[step.scratchArea]

  return (
    <div className="flex flex-col gap-5">

      {/* Concept + Goal */}
      <div className="flex flex-wrap items-start gap-3">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black text-white shadow-md"
          style={{ background: step.concept?.color ?? '#6366f1' }}
        >
          <Sparkles size={12} />
          {step.concept?.name ?? 'Scratch Skill'}
        </span>

        {areaMeta && (
          <motion.button
            onClick={() => setShowDiagram(v => !v)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border"
            style={{
              background:   showDiagram ? areaMeta.color + '33' : 'rgba(255,255,255,0.05)',
              borderColor:  areaMeta.color + '44',
              color:        areaMeta.color,
            }}
          >
            {areaMeta.icon} {areaMeta.label}
            {showDiagram ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
          </motion.button>
        )}

        <a
          href="https://scratch.mit.edu"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-orange-500/15 border border-orange-500/30 text-orange-300 hover:bg-orange-500/25 transition-all"
        >
          Open Scratch <ExternalLink size={11} />
        </a>
      </div>

      {/* Scratch diagram (toggleable) */}
      <AnimatePresence>
        {showDiagram && step.scratchArea && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <ScratchDiagram area={step.scratchArea} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Goal card */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-purple-500/08 border border-purple-500/20">
        <span className="text-2xl shrink-0">{step.emoji}</span>
        <div>
          <div className="text-purple-300 text-xs font-black uppercase tracking-wider mb-1">🎯 Goal for this step</div>
          <p className="text-white font-bold text-sm leading-relaxed">{step.goal}</p>
        </div>
      </div>

      {/* Action list */}
      <div>
        <div className="text-white/50 text-xs font-black uppercase tracking-widest mb-3">
          In Scratch, do this:
        </div>
        <div className="flex flex-col gap-3.5">
          {step.actions.map((action, i) => (
            <ActionItem key={i} action={action} index={i} />
          ))}
        </div>
      </div>

      {/* Block reference */}
      {step.blocks && step.blocks.length > 0 && (
        <BlockReference blocks={step.blocks} />
      )}

      {/* Tip */}
      {step.tip && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-yellow-500/08 border border-yellow-500/20">
          <Lightbulb size={16} className="text-yellow-400 shrink-0 mt-0.5" />
          <p className="text-yellow-200/90 text-sm leading-relaxed">{step.tip}</p>
        </div>
      )}

      {/* Did you know (collapsible) */}
      {step.didYouKnow && (
        <motion.button
          onClick={() => setShowKnow(v => !v)}
          className="text-left w-full"
        >
          <div className="flex items-center gap-2 text-blue-400/70 hover:text-blue-400 transition-colors text-sm font-bold">
            🤔 Did you know?
            {showKnow ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </div>
          <AnimatePresence>
            {showKnow && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 text-blue-200/70 text-sm leading-relaxed overflow-hidden"
              >
                {step.didYouKnow}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.button>
      )}
    </div>
  )
}
