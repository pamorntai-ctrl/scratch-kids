import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Star, Trophy, Lock, Zap, ChevronRight, Monitor } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { useT, useLocalizedMission } from '../context/LanguageContext.jsx'
import { MISSIONS } from '../data/missions.js'
import GamePreview from './GamePreview.jsx'

const DIFF_COLORS = {
  Beginner:     { text: '#10b981', bg: '#10b98120' },
  Intermediate: { text: '#3b82f6', bg: '#3b82f620' },
  Advanced:     { text: '#8b5cf6', bg: '#8b5cf620' },
}

function StatPill({ icon: Icon, value, label, color }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/05 border border-white/08">
      <Icon size={16} style={{ color }} />
      <div>
        <div className="text-white font-black text-sm leading-none">{value}</div>
        <div className="text-white/40 text-xs mt-0.5">{label}</div>
      </div>
    </div>
  )
}

function MissionCard({ mission, index, isCompleted, isLocked }) {
  const { startMission } = useApp()
  const t = useT()
  const localMission = useLocalizedMission(mission)
  const diff = DIFF_COLORS[mission.difficulty]
  const stepCount = mission.steps.length
  const finalPreviewStep = mission.steps[stepCount - 1].previewStep ?? stepCount - 1

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.1, type: 'spring', stiffness: 180, damping: 18 }}
      whileHover={isLocked ? {} : { y: -6, scale: 1.02 }}
      className={`relative rounded-3xl overflow-hidden border transition-all duration-300 cursor-pointer group
        ${isLocked
          ? 'border-white/06 opacity-50 cursor-not-allowed'
          : isCompleted
            ? 'border-green-500/40 hover:border-green-400/60'
            : 'border-white/10 hover:border-purple-400/50'
        }`}
      onClick={() => !isLocked && startMission(mission)}
    >
      {/* ── Live game preview header ── */}
      <div className="relative overflow-hidden">
        <GamePreview missionId={mission.id} previewStep={finalPreviewStep} compact />

        {/* Bottom-fade gradient → blends into card body */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(13,11,30,0.0) 40%, rgba(13,11,30,0.92) 100%)' }}
        />

        {/* Title overlay at bottom of canvas */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-6">
          <div className="flex items-end justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-2xl drop-shadow-lg leading-none">{mission.emoji}</span>
                <h3 className="text-lg font-black text-white drop-shadow truncate">{localMission.title}</h3>
              </div>
              <p className="text-white/65 text-xs leading-snug line-clamp-1">{localMission.tagline}</p>
            </div>
            <div className="shrink-0">
              {isCompleted && (
                <div className="px-2 py-0.5 rounded-full bg-green-400/25 border border-green-400/50 text-green-300 text-xs font-black whitespace-nowrap">
                  ✓ DONE
                </div>
              )}
              {isLocked && <Lock size={18} className="text-white/50" />}
            </div>
          </div>
        </div>

        {/* Difficulty pill — top left */}
        <div
          className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-xs font-black backdrop-blur-sm"
          style={{ color: diff.text, background: 'rgba(0,0,0,0.50)', border: `1px solid ${diff.text}44` }}
        >
          {mission.difficulty}
        </div>
      </div>

      {/* ── Card body ── */}
      <div className={`bg-gradient-to-br ${mission.gradientBg} bg-[#13102A] p-4`}>

        {/* Meta row */}
        <div className="flex items-center gap-3 flex-wrap mb-3">
          <span className="flex items-center gap-1 text-white/40 text-xs">
            <Clock size={12} /> {mission.timeEstimate}
          </span>
          <span className="flex items-center gap-1 text-white/40 text-xs">
            <Star size={12} className="text-yellow-400" /> {stepCount} steps
          </span>
        </div>

        {/* XP + badge reward */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/04 border border-white/06 mb-3">
          <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center text-base shrink-0">
            {mission.badge.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white/70 text-xs font-bold truncate">{localMission.badge.name} Badge</div>
            <div className="text-yellow-400 text-xs font-black">+{mission.xpReward} XP</div>
          </div>
        </div>

        {/* CTA Button */}
        {!isLocked && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`w-full py-3 rounded-2xl font-black text-white flex items-center justify-center gap-2 transition-all duration-200
              ${isCompleted
                ? 'bg-green-500/30 border border-green-500/40 text-green-300'
                : `bg-gradient-to-r ${mission.color} shadow-lg group-hover:shadow-xl`
              }`}
          >
            {isCompleted ? t('missions.playAgain') : t('missions.startMission')}
            <ChevronRight size={18} />
          </motion.button>
        )}
        {isLocked && (
          <div className="w-full py-3 rounded-2xl bg-white/05 text-white/30 font-bold text-center flex items-center justify-center gap-2">
            <Lock size={16} /> {t('missions.comingSoon')}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function MissionSelect() {
  const { navigate, totalXP, level, levelProgress, badges, completedMissions, startMission } = useApp()
  const t = useT()
  const xpForNextLevel = 200
  const xpInCurrentLevel = totalXP % xpForNextLevel

  return (
    <div className="min-h-screen stars-bg relative">
      {/* Background glows */}
      <div className="absolute top-20 left-1/3 w-96 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-blue-600/08 rounded-full blur-3xl pointer-events-none" />

      {/* ─── Top nav ─── */}
      <nav className="sticky top-0 z-30 backdrop-blur-xl bg-[#0D0B1E]/80 border-b border-white/06">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ x: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('home')}
              className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors font-semibold text-sm"
            >
              <ArrowLeft size={18} /> {t('nav.home')}
            </motion.button>
            <span className="text-white/20">|</span>
            <span className="text-xl font-black text-white">
              🗺️ <span className="gradient-text">Mission Select</span>
            </span>
          </div>

          {/* Player XP display */}
          <div className="flex items-center gap-3">
            {/* Teach Mode button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate('presentation')}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs text-purple-300 border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 transition-colors"
            >
              <Monitor size={13} /> {t('nav.teachMode')}
            </motion.button>

            <div className="hidden md:flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-xs font-black text-white shadow">
                {level}
              </div>
              <div>
                <div className="text-white/80 text-xs font-bold">{t('missions.level')} {level}</div>
                <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${levelProgress * 100}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-500/15 border border-yellow-500/25 text-yellow-400 text-sm font-black">
              <Zap size={14} fill="currentColor" /> {totalXP} XP
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            {t('missions.title')} <span className="gradient-text">{t('missions.titleHighlight')}</span> 🎯
          </h1>
          <p className="text-white/60 text-lg">{t('missions.subtitle')}</p>
        </motion.div>

        {/* Player stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3 flex-wrap mb-10"
        >
          <StatPill icon={Zap}    value={`${totalXP} XP`}            label={t('missions.totalEarned')}  color="#f59e0b" />
          <StatPill icon={Trophy} value={`${badges.length} Badges`}  label={t('missions.collected')}    color="#a855f7" />
          <StatPill icon={Star}   value={`${completedMissions.length}/${MISSIONS.length}`} label={t('missions.missionsDone')} color="#10b981" />

          {badges.length > 0 && (
            <div className="flex items-center gap-1.5 ml-2">
              {badges.map(b => (
                <div key={b.id} title={b.name} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-lg hover:scale-110 transition-transform cursor-default">
                  {b.emoji}
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Mission cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MISSIONS.map((m, i) => (
            <MissionCard
              key={m.id}
              mission={m}
              index={i}
              isCompleted={completedMissions.includes(m.id)}
              isLocked={false}
            />
          ))}
        </div>

        {/* Motivational footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-white/30 text-sm">
            {t('missions.proTip')}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
