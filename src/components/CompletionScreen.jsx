import { motion } from 'framer-motion'
import { Trophy, Zap, Star, ChevronRight, Home, RotateCcw, Code2 } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

function StatCard({ icon: Icon, value, label, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 200, damping: 16 }}
      className="flex flex-col items-center gap-2 p-5 rounded-2xl glass border border-white/08"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
        style={{ background: `linear-gradient(135deg, ${color}99, ${color}55)`, boxShadow: `0 0 20px ${color}44` }}
      >
        <Icon size={22} style={{ color }} />
      </div>
      <div className="text-2xl font-black text-white">{value}</div>
      <div className="text-white/50 text-xs font-semibold text-center">{label}</div>
    </motion.div>
  )
}

function SkillCard({ skill, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
      className="flex flex-col gap-1.5 p-3 rounded-xl border"
      style={{ background: skill.color + '12', borderColor: skill.color + '38' }}
    >
      <div className="flex items-center gap-1.5">
        <span className="text-lg leading-none">{skill.emoji}</span>
        <span className="text-white font-black text-sm leading-tight">{skill.skill}</span>
      </div>
      <p className="text-white/50 text-xs leading-relaxed">{skill.detail}</p>
    </motion.div>
  )
}

export default function CompletionScreen() {
  const {
    currentMission: mission,
    completedSteps,
    totalXP,
    level,
    badges,
    navigate,
    startMission,
  } = useApp()

  if (!mission) {
    navigate('missions')
    return null
  }

  const earnedBadge = badges.find(b => b.id === mission.badge.id)
  const stepsCount  = mission.steps.length

  return (
    <div className="min-h-screen flex flex-col items-center justify-center stars-bg relative overflow-hidden px-6 py-16">
      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Floating sparkles */}
      {['⭐','✨','🌟','💫','⚡'].map((s, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl pointer-events-none"
          style={{ top: `${10 + i * 15}%`, left: `${5 + i * 18}%` }}
          animate={{ y: [0, -20, 0], rotate: [0, 20, 0] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
        >
          {s}
        </motion.div>
      ))}
      {['🎮','🏆','🎯','🚀','💎'].map((s, i) => (
        <motion.div
          key={`r${i}`}
          className="absolute text-2xl pointer-events-none"
          style={{ top: `${15 + i * 14}%`, right: `${5 + i * 16}%` }}
          animate={{ y: [0, -15, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
        >
          {s}
        </motion.div>
      ))}

      <div className="relative z-10 max-w-xl w-full flex flex-col items-center gap-8">
        {/* Mission complete header */}
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 180, damping: 16 }}
          className="text-center"
        >
          <div className="text-7xl mb-4">🎉</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
            Mission <span className="gradient-text">Complete!</span>
          </h1>
          <p className="text-white/60 text-lg">
            You built{' '}
            <span className="text-white font-bold">{mission.emoji} {mission.title}</span>
            {' '}from scratch!
          </p>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 w-full">
          <StatCard icon={Zap}    value={`${mission.xpReward}`} label="XP Earned"      color="#f59e0b" delay={0.15} />
          <StatCard icon={Star}   value={`${stepsCount}`}       label="Steps Mastered" color="#a855f7" delay={0.25} />
          <StatCard icon={Trophy} value={`Lv.${level}`}         label="Current Level"  color="#10b981" delay={0.35} />
        </div>

        {/* Badge earned */}
        {earnedBadge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 16 }}
            className="w-full p-6 rounded-2xl glass border border-white/10 flex items-center gap-5"
          >
            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${earnedBadge.color} flex items-center justify-center text-4xl shadow-xl shrink-0`}
            >
              {earnedBadge.emoji}
            </div>
            <div>
              <div className="text-white/40 text-xs font-black uppercase tracking-wider mb-1">
                🏅 Badge Earned
              </div>
              <div className="text-white text-xl font-black">{earnedBadge.name}</div>
              <div className="text-white/60 text-sm mt-0.5">{earnedBadge.description}</div>
            </div>
          </motion.div>
        )}

        {/* Programming skills section */}
        {mission.programmingSkills?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58 }}
            className="w-full"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-md shrink-0">
                <Code2 size={14} className="text-white" />
              </div>
              <h2 className="text-white font-black text-base">
                Real Programming Skills You Used
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {mission.programmingSkills.map((s, i) => (
                <SkillCard key={s.skill} skill={s} delay={0.63 + i * 0.07} />
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.63 + mission.programmingSkills.length * 0.07 }}
              className="mt-3 text-center text-white/30 text-xs"
            >
              These are real concepts used by professional developers every day 🚀
            </motion.p>
          </motion.div>
        )}

        {/* Total XP display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="w-full p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-center"
        >
          <span className="text-yellow-400 text-sm font-bold">Total XP: </span>
          <span className="text-yellow-300 text-xl font-black">{totalXP} XP</span>
          <span className="text-white/40 text-sm"> · Level {level}</span>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="flex flex-col sm:flex-row gap-3 w-full"
        >
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('missions')}
            className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg font-black flex items-center justify-center gap-2 shadow-xl glow-purple"
          >
            Next Mission <ChevronRight size={22} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => startMission(mission)}
            className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/08 border border-white/12 text-white font-bold hover:bg-white/12 transition-all"
          >
            <RotateCcw size={18} /> Play Again
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('home')}
            className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/08 border border-white/12 text-white font-bold hover:bg-white/12 transition-all"
          >
            <Home size={18} />
          </motion.button>
        </motion.div>

        {/* Collected badges strip */}
        {badges.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex items-center gap-3 flex-wrap justify-center"
          >
            <span className="text-white/30 text-xs font-bold">Your badges:</span>
            {badges.map(b => (
              <div
                key={b.id}
                title={b.name}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl shadow-md hover:scale-110 transition-transform cursor-default"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                {b.emoji}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
