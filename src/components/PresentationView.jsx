import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, Monitor, Code2, Globe, Lightbulb } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { MISSIONS } from '../data/missions.js'
import { STEP_INSIGHTS } from '../data/presentation.js'
import GamePreview from './GamePreview.jsx'

/* ── Build a flat slide list from the data ── */
function buildSlides() {
  const slides = []

  // Title slide
  slides.push({ type: 'cover' })

  for (const mission of MISSIONS) {
    const insights = STEP_INSIGHTS[mission.id] ?? []

    // Mission intro slide
    slides.push({ type: 'mission-intro', mission })

    // Step slides
    insights.forEach((insight, idx) => {
      slides.push({
        type: 'step',
        mission,
        insight,
        stepIndex: idx,
        previewStep: mission.steps[idx]?.previewStep ?? idx,
      })
    })
  }

  // Summary slide
  slides.push({ type: 'summary' })

  return slides
}

const SLIDES = buildSlides()
const TOTAL = SLIDES.length

// Map missionId → slide index of its mission-intro slide
const MISSION_SLIDE_INDEX = {}
SLIDES.forEach((s, i) => {
  if (s.type === 'mission-intro') MISSION_SLIDE_INDEX[s.mission.id] = i
})

/* ── Slide counter dot row ── */
function DotRow({ current, total }) {
  const MAX_DOTS = 30
  if (total > MAX_DOTS) {
    return (
      <div className="text-white/40 text-xs font-bold">
        {current + 1} / {total}
      </div>
    )
  }
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-300"
          style={{
            width:   i === current ? 16 : 5,
            height:  5,
            background: i === current ? '#a78bfa' : i < current ? '#6366f1' : 'rgba(255,255,255,0.15)',
          }}
        />
      ))}
    </div>
  )
}

/* ── Code block ── */
function CodeBlock({ lines, color }) {
  return (
    <div
      className="rounded-2xl overflow-hidden font-mono text-sm border"
      style={{ borderColor: color + '40', background: 'rgba(0,0,0,0.55)' }}
    >
      <div
        className="flex items-center gap-2 px-4 py-2 border-b"
        style={{ background: color + '18', borderColor: color + '30' }}
      >
        <div className="w-3 h-3 rounded-full bg-red-400/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
        <div className="w-3 h-3 rounded-full bg-green-400/70" />
        <span className="text-white/40 text-xs ml-2">python</span>
      </div>
      <div className="p-4 space-y-0.5">
        {lines.map((line, i) => {
          const trimmed = line.trimStart()
          const indent = line.length - trimmed.length
          const isComment  = trimmed.startsWith('#')
          const isKeyword  = /^(import|from|class|def)\b/.test(trimmed)
          const isControl  = /^(if|else|elif|while|for|return|and|or|not|in|with|try|except)\b/.test(trimmed)
          const color = isComment ? '#6ee7b7' : isKeyword ? '#c084fc' : isControl ? '#93c5fd' : '#e2e8f0'
          return (
            <div key={i} className="leading-6" style={{ whiteSpace: 'pre' }}>
              {line === '' ? ' ' : (
                <span style={{ color }}>{line}</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ══════════════════════════ SLIDE RENDERERS ══════════════════════════ */

function CoverSlide({ onMissionClick }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8 gap-8">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 160, damping: 16 }}
        className="text-8xl"
      >
        🎮
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-4"
      >
        <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
          From <span className="gradient-text">Scratch</span> to
          <br />Real Programming
        </h1>
        <p className="text-white/60 text-xl max-w-2xl">
          A step-by-step guide for understanding the programming logic behind each game mission
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="flex items-center gap-4 flex-wrap justify-center"
      >
        {MISSIONS.map(m => (
          <motion.button
            key={m.id}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onMissionClick(m.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/08 border border-white/12 text-white/70 font-bold hover:bg-white/16 hover:border-white/25 hover:text-white transition-all duration-200 cursor-pointer"
          >
            <span>{m.emoji}</span> {m.title}
          </motion.button>
        ))}
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-white/25 text-sm"
      >
        Click a game to jump to it, or press → to begin
      </motion.p>
    </div>
  )
}

function MissionIntroSlide({ mission }) {
  const insights = STEP_INSIGHTS[mission.id] ?? []
  return (
    <div className="flex flex-col md:flex-row items-center gap-10 h-full px-8 py-10">
      {/* Left: info */}
      <div className="flex-1 space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-3"
        >
          <div className="text-6xl">{mission.emoji}</div>
          <h2 className="text-4xl md:text-5xl font-black text-white">{mission.title}</h2>
          <p className="text-white/60 text-lg">{mission.tagline}</p>
          <span
            className="inline-block px-3 py-1 rounded-full text-sm font-black"
            style={{
              background: mission.difficulty === 'Beginner' ? '#10b98122' : mission.difficulty === 'Intermediate' ? '#3b82f622' : '#8b5cf622',
              color:      mission.difficulty === 'Beginner' ? '#10b981'   : mission.difficulty === 'Intermediate' ? '#3b82f6'   : '#8b5cf6',
              border:     `1px solid ${mission.difficulty === 'Beginner' ? '#10b98144' : mission.difficulty === 'Intermediate' ? '#3b82f644' : '#8b5cf644'}`,
            }}
          >
            {mission.difficulty}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-2"
        >
          <div className="text-white/50 text-sm font-bold uppercase tracking-wider">Concepts you'll learn</div>
          <div className="flex flex-col gap-2">
            {insights.map((ins, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-lg">{ins.emoji}</span>
                <span className="text-white/80 font-bold text-sm">{ins.programmingConcept}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right: live canvas */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15 }}
        className="flex-1 flex items-center justify-center w-full"
        style={{ maxWidth: 420 }}
      >
        <div className="w-full rounded-3xl overflow-hidden border border-white/12 shadow-2xl">
          <GamePreview
            missionId={mission.id}
            previewStep={mission.steps[mission.steps.length - 1]?.previewStep ?? 5}
          />
        </div>
      </motion.div>
    </div>
  )
}

function StepSlide({ mission, insight, stepIndex, previewStep }) {
  return (
    <div className="flex flex-col h-full px-6 py-6 gap-5">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 flex-shrink-0"
      >
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl font-black shadow-lg"
          style={{ background: insight.color + '25', border: `1.5px solid ${insight.color}60` }}
        >
          {insight.emoji}
        </div>
        <div>
          <div className="text-white/40 text-xs font-bold uppercase tracking-wider">
            {mission.emoji} {mission.title} · Step {stepIndex + 1}
          </div>
          <h3 className="text-xl md:text-2xl font-black text-white leading-tight">
            {insight.programmingConcept}
          </h3>
        </div>
      </motion.div>

      {/* Body: 3-column layout */}
      <div className="flex flex-col lg:flex-row gap-5 flex-1 min-h-0">

        {/* Col 1: Big idea + real world */}
        <div className="flex flex-col gap-4 lg:w-72 flex-shrink-0">
          {/* Big Idea */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-2xl p-4 border flex-1"
            style={{ background: insight.color + '0e', borderColor: insight.color + '35' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb size={14} style={{ color: insight.color }} />
              <span className="text-xs font-black uppercase tracking-wider" style={{ color: insight.color }}>
                Big Idea
              </span>
            </div>
            <p className="text-white/85 text-sm leading-relaxed">{insight.bigIdea}</p>
          </motion.div>

          {/* Real World */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl p-4 bg-white/04 border border-white/08"
          >
            <div className="flex items-center gap-2 mb-2">
              <Globe size={14} className="text-sky-400" />
              <span className="text-xs font-black text-sky-400 uppercase tracking-wider">Real World</span>
            </div>
            <p className="text-white/65 text-sm leading-relaxed">{insight.realWorld}</p>
          </motion.div>
        </div>

        {/* Col 2: Code */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex-1 min-w-0 flex flex-col"
        >
          <div className="flex items-center gap-2 mb-2">
            <Code2 size={14} style={{ color: insight.color }} />
            <span className="text-xs font-black uppercase tracking-wider" style={{ color: insight.color }}>
              In Python it looks like this
            </span>
          </div>
          <div className="flex-1">
            <CodeBlock lines={insight.code} color={insight.color} />
          </div>
        </motion.div>

        {/* Col 3: Live preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="flex flex-col lg:w-64 flex-shrink-0"
        >
          <div className="flex items-center gap-2 mb-2">
            <Monitor size={14} className="text-white/40" />
            <span className="text-xs font-black text-white/40 uppercase tracking-wider">In the Game</span>
          </div>
          <div className="flex-1 rounded-2xl overflow-hidden border border-white/10 min-h-40">
            <GamePreview missionId={mission.id} previewStep={previewStep} compact />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function SummarySlide() {
  const allConcepts = []
  for (const mission of MISSIONS) {
    const insights = STEP_INSIGHTS[mission.id] ?? []
    for (const ins of insights) {
      allConcepts.push({ ...ins, mission })
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full px-8 gap-8 text-center">
      <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-7xl">
        🚀
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-3">
          You Just Learned <span className="gradient-text">Real Programming</span>
        </h2>
        <p className="text-white/60 text-lg max-w-2xl">
          Every concept in these games is used by professional developers every single day.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-3xl"
      >
        {allConcepts.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.04 }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border text-left"
            style={{ background: c.color + '12', borderColor: c.color + '38' }}
          >
            <span className="text-base">{c.emoji}</span>
            <span className="text-white/80 font-bold text-xs">{c.programmingConcept}</span>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-white/30 text-sm"
      >
        These are the foundations of Python, Java, Swift, C#, and every language used in the real world.
      </motion.p>
    </div>
  )
}

/* ══════════════════════════ MAIN COMPONENT ══════════════════════════ */

export default function PresentationView() {
  const { navigate } = useApp()
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)

  const go = useCallback((delta) => {
    setDir(delta)
    setIdx(i => Math.max(0, Math.min(TOTAL - 1, i + delta)))
  }, [])

  const jumpToMission = useCallback((missionId) => {
    const target = MISSION_SLIDE_INDEX[missionId]
    if (target == null) return
    setDir(target > 0 ? 1 : -1)
    setIdx(target)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight' || e.key === ' ') go(1)
      if (e.key === 'ArrowLeft')  go(-1)
      if (e.key === 'Escape')     navigate('missions')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, navigate])

  const slide = SLIDES[idx]

  const variants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit:  (d) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  }

  function renderSlide(s) {
    switch (s.type) {
      case 'cover':         return <CoverSlide onMissionClick={jumpToMission} />
      case 'mission-intro': return <MissionIntroSlide mission={s.mission} />
      case 'step':          return <StepSlide mission={s.mission} insight={s.insight} stepIndex={s.stepIndex} previewStep={s.previewStep} />
      case 'summary':       return <SummarySlide />
      default:              return null
    }
  }

  // Background color based on current slide
  const bgAccent = slide.type === 'step'
    ? slide.insight.color
    : slide.type === 'mission-intro'
      ? '#6366f1'
      : '#a78bfa'

  return (
    <div className="min-h-screen stars-bg relative flex flex-col" style={{ fontFamily: 'Nunito, sans-serif' }}>
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-colors duration-700"
        style={{ background: `radial-gradient(ellipse at 50% 30%, ${bgAccent}12 0%, transparent 70%)` }}
      />

      {/* ── Top bar ── */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 py-3 border-b border-white/06 backdrop-blur-sm bg-black/20 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('missions')}
            className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors text-sm font-bold"
          >
            <X size={16} /> Exit
          </button>
          <span className="text-white/20">|</span>
          <span className="text-white/70 font-black text-sm">
            📊 Presentation
          </span>
        </div>

        <DotRow current={idx} total={TOTAL} />

        <div className="text-white/30 text-xs font-bold">
          {slide.type === 'step' && `${slide.mission.title} · Step ${slide.stepIndex + 1}`}
          {slide.type === 'mission-intro' && slide.mission.title}
          {slide.type === 'cover' && 'Introduction'}
          {slide.type === 'summary' && 'Summary'}
        </div>
      </div>

      {/* ── Slide area ── */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={idx}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute inset-0 flex flex-col"
          >
            {renderSlide(slide)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Bottom nav ── */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-t border-white/06 bg-black/20 backdrop-blur-sm z-10">
        <button
          onClick={() => go(-1)}
          disabled={idx === 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-sm transition-all duration-200
            disabled:opacity-20 disabled:cursor-not-allowed
            bg-white/08 hover:bg-white/14 text-white border border-white/10 hover:border-white/20"
        >
          <ChevronLeft size={18} /> Back
        </button>

        <div className="text-white/30 text-xs">
          Use ← → arrow keys to navigate
        </div>

        <button
          onClick={() => idx === TOTAL - 1 ? navigate('missions') : go(1)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-sm transition-all duration-200
            text-white border shadow-lg"
          style={{
            background: idx === TOTAL - 1 ? '#10b981' : bgAccent,
            borderColor: (idx === TOTAL - 1 ? '#10b981' : bgAccent) + '80',
          }}
        >
          {idx === TOTAL - 1 ? 'Back to Missions' : 'Next'}
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
