import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Check, ChevronRight, Zap, Star, CheckCircle2,
  ExternalLink, BookOpen,
} from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import StepInstructions from './StepInstructions.jsx'
import GamePreview from './GamePreview.jsx'

/* ── Mini XP + level bar ── */
function XPBar({ totalXP, level, levelProgress }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-xs font-black text-white shadow shrink-0">
        {level}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between text-xs text-white/50 mb-0.5">
          <span>Lv.{level}</span>
          <span className="text-yellow-400 font-bold">{totalXP} XP</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"
            animate={{ width: `${levelProgress * 100}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  )
}

/* ── Sidebar step row ── */
function StepRow({ step, index, isCompleted, isCurrent }) {
  return (
    <div className={`flex items-start gap-2.5 transition-opacity duration-200 ${
      !isCurrent && !isCompleted ? 'opacity-35' : ''
    }`}>
      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5 transition-all duration-300 ${
        isCompleted
          ? 'bg-green-500 text-white shadow-sm shadow-green-500/40'
          : isCurrent
            ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-sm shadow-purple-500/40 scale-110'
            : 'bg-white/08 text-white/30'
      }`}>
        {isCompleted ? <Check size={12} /> : index + 1}
      </div>
      <div className="min-w-0">
        <p className={`text-xs font-bold leading-tight ${isCurrent ? 'text-white' : isCompleted ? 'text-white/50' : 'text-white/30'}`}>
          {step.title}
        </p>
        <p className="text-xs text-white/25 mt-0.5">+{step.xp} XP</p>
      </div>
    </div>
  )
}

/* ── Concept chips strip ── */
function ConceptChips({ concepts }) {
  if (!concepts?.length) return null
  const colours = ['#6366f1','#f59e0b','#10b981','#3b82f6','#a855f7','#ef4444']
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-white/30 text-xs font-bold">You'll learn:</span>
      {concepts.map((c, i) => (
        <span
          key={c}
          className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{ background: colours[i % colours.length] + '28', color: colours[i % colours.length] }}
        >
          {c}
        </span>
      ))}
    </div>
  )
}

export default function LessonView() {
  const {
    currentMission: mission,
    currentStepIndex,
    completedSteps,
    totalXP,
    level,
    levelProgress,
    navigate,
    completeStep,
    completeMission,
  } = useApp()

  if (!mission) { navigate('missions'); return null }

  const steps      = mission.steps
  const step       = steps[currentStepIndex]
  const isLastStep = currentStepIndex === steps.length - 1
  const totalSteps = steps.length
  const progressPct = (currentStepIndex / totalSteps) * 100

  function handleComplete() {
    if (isLastStep) {
      completeMission(mission.id, mission.xpReward, mission.badge)
    } else {
      completeStep(step.id, step.xp)
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0D0B1E' }}>

      {/* ─── Top bar ─── */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-[#0D0B1E]/90 border-b border-white/06">
        <div className="px-4 py-3 flex items-center gap-4">
          <motion.button
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('missions')}
            className="flex items-center gap-1 text-white/50 hover:text-white transition-colors text-sm font-semibold shrink-0"
          >
            <ArrowLeft size={16} /> Back
          </motion.button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-white font-black text-sm truncate">
                {mission.emoji} {mission.title}
              </span>
              <span className="text-white/40 text-xs font-bold shrink-0 ml-2">
                {currentStepIndex + 1}/{totalSteps}
              </span>
            </div>
            <div className="h-2 rounded-full bg-white/08 overflow-hidden">
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${mission.color}`}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <div className="hidden md:block w-44 shrink-0">
            <XPBar totalXP={totalXP} level={level} levelProgress={levelProgress} />
          </div>
        </div>
      </header>

      {/* ─── Body ─── */}
      <div className="flex flex-1 min-h-0 overflow-hidden">

        {/* Left sidebar — steps list */}
        <aside className="hidden lg:flex flex-col w-52 shrink-0 border-r border-white/06 p-4 gap-4 overflow-y-auto">
          <p className="text-white/30 text-xs font-black uppercase tracking-widest">Steps</p>
          <div className="flex flex-col gap-4">
            {steps.map((s, i) => (
              <StepRow
                key={s.id}
                step={s}
                index={i}
                isCompleted={completedSteps.includes(s.id)}
                isCurrent={i === currentStepIndex}
              />
            ))}
          </div>

          <div className="mt-auto pt-4 border-t border-white/06">
            <XPBar totalXP={totalXP} level={level} levelProgress={levelProgress} />
          </div>
        </aside>

        {/* Centre — step content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-4 md:px-6 py-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                {/* Step header card */}
                <div className={`rounded-2xl p-5 bg-gradient-to-br ${mission.gradientBg} border border-white/06`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-white/35 text-xs font-black uppercase tracking-wider">
                      Step {currentStepIndex + 1} of {totalSteps}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-black">
                      +{step.xp} XP
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-white mb-2 leading-tight">{step.title}</h2>
                  <p className="text-white/70 text-sm leading-relaxed">{step.description}</p>

                  {/* Show concept chips only on step 1 of a mission */}
                  {currentStepIndex === 0 && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <ConceptChips concepts={mission.concepts} />
                    </div>
                  )}
                </div>

                {/* Step instructions */}
                <div className="glass rounded-2xl p-5">
                  <StepInstructions step={step} />
                </div>

                {/* Mobile game preview */}
                <div className="xl:hidden glass rounded-2xl p-4">
                  <GamePreview missionId={mission.id} previewStep={step.previewStep ?? currentStepIndex} />
                </div>

                {/* Complete button */}
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleComplete}
                  className={`w-full py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 shadow-xl transition-all duration-200 bg-gradient-to-r ${mission.color} text-white`}
                >
                  {isLastStep ? (
                    <>🎉 Complete Mission! <Star size={20} fill="currentColor" /></>
                  ) : (
                    <>✅ I Did It! Next Step <ChevronRight size={20} /></>
                  )}
                </motion.button>

                {/* Mobile XP */}
                <div className="md:hidden glass rounded-xl p-3">
                  <XPBar totalXP={totalXP} level={level} levelProgress={levelProgress} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* Right sidebar — preview + badge */}
        <aside className="hidden xl:flex flex-col w-72 shrink-0 border-l border-white/06 p-4 gap-5 overflow-y-auto">

          {/* Open Scratch CTA */}
          <a
            href="https://scratch.mit.edu"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-300 font-black text-sm hover:bg-orange-500/25 transition-all"
          >
            Open Scratch <ExternalLink size={14} />
          </a>

          {/* Game preview */}
          <div>
            <p className="text-white/30 text-xs font-black uppercase tracking-widest mb-2">Game Preview</p>
            <GamePreview missionId={mission.id} previewStep={step.previewStep ?? currentStepIndex} />
          </div>

          {/* Step progress dots */}
          <div>
            <p className="text-white/30 text-xs font-black uppercase tracking-widest mb-2">Progress</p>
            <div className="flex gap-1.5 flex-wrap">
              {steps.map((s, i) => (
                <div
                  key={s.id}
                  title={s.title}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black transition-all duration-300 ${
                    completedSteps.includes(s.id)
                      ? 'bg-green-500 text-white'
                      : i === currentStepIndex
                        ? 'bg-purple-500 text-white'
                        : 'bg-white/08 text-white/25'
                  }`}
                >
                  {completedSteps.includes(s.id) ? '✓' : i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Badge preview */}
          <div className="p-4 rounded-xl bg-white/04 border border-white/06">
            <p className="text-white/30 text-xs font-black uppercase tracking-widest mb-3">Mission Reward</p>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mission.badge.color} flex items-center justify-center text-2xl shadow-lg opacity-70`}>
                {mission.badge.emoji}
              </div>
              <div>
                <p className="text-white/80 text-sm font-bold">{mission.badge.name}</p>
                <p className="text-yellow-400 text-xs font-black mt-0.5">+{mission.xpReward} XP</p>
              </div>
            </div>
          </div>

          {/* Quick reference */}
          <div className="p-4 rounded-xl bg-white/04 border border-white/06">
            <p className="text-white/30 text-xs font-black uppercase tracking-widest mb-3">
              <BookOpen size={10} className="inline mr-1" />Quick Tips
            </p>
            <div className="flex flex-col gap-2 text-xs text-white/50 leading-relaxed">
              <p>🏁 Green flag = start the game</p>
              <p>🔴 Red circle = stop the game</p>
              <p>🖱️ Right-click a block to duplicate or delete it</p>
              <p>💾 Scratch auto-saves if you're signed in</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
