import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Check, ChevronRight, Star,
  ExternalLink, BookOpen, RotateCcw,
} from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { useT, useLocalizedMission } from '../context/LanguageContext.jsx'
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
function StepRow({ step, index, isCompleted, isCurrent, isViewing, onClick }) {
  const clickable = isCompleted && !isCurrent
  return (
    <div
      onClick={clickable ? onClick : undefined}
      className={`flex items-start gap-2.5 transition-all duration-200 rounded-lg px-1 py-0.5 -mx-1 ${
        !isCurrent && !isCompleted && !isViewing ? 'opacity-35' : ''
      } ${clickable ? 'cursor-pointer hover:bg-white/06 active:bg-white/10' : ''} ${
        isViewing && !isCurrent ? 'bg-white/08 ring-1 ring-purple-500/40' : ''
      }`}
    >
      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5 transition-all duration-300 ${
        isCurrent && !isViewing
          ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-sm shadow-purple-500/40 scale-110'
          : isCompleted
            ? 'bg-green-500 text-white shadow-sm shadow-green-500/40'
            : isViewing
              ? 'bg-purple-500/60 text-white'
              : 'bg-white/08 text-white/30'
      }`}>
        {isCompleted ? <Check size={12} /> : index + 1}
      </div>
      <div className="min-w-0 flex-1">
        <p className={`text-xs font-bold leading-tight ${
          isViewing || isCurrent ? 'text-white' : isCompleted ? 'text-white/55' : 'text-white/30'
        }`}>
          {step.title}
        </p>
        <p className="text-xs text-white/25 mt-0.5">+{step.xp} XP</p>
      </div>
      {clickable && (
        <RotateCcw size={10} className="text-white/25 shrink-0 mt-1.5" />
      )}
    </div>
  )
}

/* ── Concept chips strip ── */
function ConceptChips({ concepts }) {
  const t = useT()
  if (!concepts?.length) return null
  const colours = ['#6366f1','#f59e0b','#10b981','#3b82f6','#a855f7','#ef4444']
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-white/30 text-xs font-bold">{t('lesson.youllLearn')}</span>
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
    goToStep,
  } = useApp()

  const t = useT()
  const localMission = useLocalizedMission(mission)

  if (!mission) { navigate('missions'); return null }

  const steps       = localMission.steps
  const step        = steps[currentStepIndex]
  const totalSteps  = steps.length
  const activeIndex = completedSteps.length          // furthest uncompleted step
  const isReviewing = currentStepIndex < activeIndex // viewing an already-done step
  const isLastStep  = currentStepIndex === steps.length - 1
  const progressPct = (activeIndex / totalSteps) * 100

  function handleComplete() {
    if (isReviewing) {
      // Navigate forward through completed/active steps without re-awarding XP
      goToStep(currentStepIndex + 1)
    } else if (isLastStep) {
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
            <ArrowLeft size={16} /> {t('lesson.back')}
          </motion.button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-white font-black text-sm truncate">
                {localMission.emoji} {localMission.title}
                {isReviewing && <span className="ml-2 text-purple-400 text-xs font-bold">· {t('lesson.reviewingLabel')}{currentStepIndex + 1}</span>}
              </span>
              <span className="text-white/40 text-xs font-bold shrink-0 ml-2">
                {activeIndex}/{totalSteps}
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
          <p className="text-white/30 text-xs font-black uppercase tracking-widest">{t('lesson.steps')}</p>
          <div className="flex flex-col gap-2">
            {steps.map((s, i) => (
              <StepRow
                key={s.id}
                step={s}
                index={i}
                isCompleted={completedSteps.includes(s.id)}
                isCurrent={i === activeIndex}
                isViewing={i === currentStepIndex}
                onClick={() => goToStep(i)}
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
                <div className={`rounded-2xl p-5 bg-gradient-to-br ${localMission.gradientBg} border ${isReviewing ? 'border-purple-500/30' : 'border-white/06'}`}>
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="text-white/35 text-xs font-black uppercase tracking-wider">
                      {t('lesson.stepLabel')} {currentStepIndex + 1} {t('lesson.stepOf')} {totalSteps}
                    </span>
                    {isReviewing ? (
                      <span className="px-2 py-0.5 rounded-full bg-purple-500/25 text-purple-300 text-xs font-black flex items-center gap-1">
                        <RotateCcw size={9} /> {t('lesson.reviewing')}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-black">
                        +{step.xp} XP
                      </span>
                    )}
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

                {/* Complete / navigate button */}
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleComplete}
                  className={`w-full py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 shadow-xl transition-all duration-200 text-white ${
                    isReviewing
                      ? 'bg-gradient-to-r from-purple-600 to-purple-500'
                      : `bg-gradient-to-r ${localMission.color}`
                  }`}
                >
                  {isReviewing ? (
                    <>{t('lesson.buttons.next')} <ChevronRight size={20} /></>
                  ) : isLastStep ? (
                    <>{t('lesson.buttons.complete')} <Star size={20} fill="currentColor" /></>
                  ) : (
                    <>{t('lesson.buttons.iDidIt')} <ChevronRight size={20} /></>
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
            {t('lesson.openScratch')} <ExternalLink size={14} />
          </a>

          {/* Game preview */}
          <div>
            <p className="text-white/30 text-xs font-black uppercase tracking-widest mb-2">{t('lesson.gamePreview')}</p>
            <GamePreview missionId={mission.id} previewStep={step.previewStep ?? currentStepIndex} />
          </div>

          {/* Step progress dots */}
          <div>
            <p className="text-white/30 text-xs font-black uppercase tracking-widest mb-2">{t('lesson.progress')}</p>
            <div className="flex gap-1.5 flex-wrap">
              {steps.map((s, i) => {
                const done = completedSteps.includes(s.id)
                const viewing = i === currentStepIndex
                const active = i === activeIndex
                return (
                  <motion.div
                    key={s.id}
                    title={s.title}
                    whileHover={done ? { scale: 1.15 } : {}}
                    whileTap={done ? { scale: 0.9 } : {}}
                    onClick={done ? () => goToStep(i) : undefined}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black transition-all duration-300 ${
                      done
                        ? `bg-green-500 text-white cursor-pointer ${viewing ? 'ring-2 ring-purple-400' : 'hover:bg-green-400'}`
                        : active
                          ? 'bg-purple-500 text-white'
                          : 'bg-white/08 text-white/25'
                    }`}
                  >
                    {done ? '✓' : i + 1}
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Badge preview */}
          <div className="p-4 rounded-xl bg-white/04 border border-white/06">
            <p className="text-white/30 text-xs font-black uppercase tracking-widest mb-3">{t('lesson.missionReward')}</p>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${localMission.badge.color} flex items-center justify-center text-2xl shadow-lg opacity-70`}>
                {localMission.badge.emoji}
              </div>
              <div>
                <p className="text-white/80 text-sm font-bold">{localMission.badge.name}</p>
                <p className="text-yellow-400 text-xs font-black mt-0.5">+{localMission.xpReward} XP</p>
              </div>
            </div>
          </div>

          {/* Quick reference */}
          <div className="p-4 rounded-xl bg-white/04 border border-white/06">
            <p className="text-white/30 text-xs font-black uppercase tracking-widest mb-3">
              <BookOpen size={10} className="inline mr-1" />{t('lesson.quickTips')}
            </p>
            <div className="flex flex-col gap-2 text-xs text-white/50 leading-relaxed">
              {t('lesson.tips').map((tip, i) => <p key={i}>{tip}</p>)}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
