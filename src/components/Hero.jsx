import { motion } from 'framer-motion'
import { Zap, Star, Trophy, ArrowRight, Gamepad2, Code2, Rocket } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { MISSIONS } from '../data/missions.js'

const FLOATING_BLOCKS = [
  { text: 'when 🏁 clicked', color: '#FFAB19', top: '12%', left: '6%', rotation: -8, delay: 0 },
  { text: 'move (10) steps', color: '#4C97FF', top: '20%', right: '8%', rotation: 6, delay: 0.4 },
  { text: 'forever', color: '#FF8C1A', top: '55%', left: '4%', rotation: -4, delay: 0.8 },
  { text: 'say [Hello!]', color: '#9966FF', top: '65%', right: '5%', rotation: 8, delay: 0.2 },
  { text: 'if <> then', color: '#FF8C1A', top: '78%', left: '12%', rotation: 3, delay: 1.0 },
  { text: 'change x by (10)', color: '#4C97FF', top: '35%', right: '3%', rotation: -6, delay: 0.6 },
]

const FEATURES = [
  {
    icon: Gamepad2,
    title: 'Build Real Scratch Games',
    desc: 'Guided missions walk you through scratch.mit.edu step-by-step — no experience needed.',
    color: 'from-yellow-500 to-orange-500',
    bg: 'from-yellow-900/20 to-orange-900/10',
  },
  {
    icon: Zap,
    title: 'Learn as You Play',
    desc: 'Each mission teaches only the Scratch tools you need right now — never overwhelming.',
    color: 'from-purple-500 to-pink-500',
    bg: 'from-purple-900/20 to-pink-900/10',
  },
  {
    icon: Trophy,
    title: 'Earn XP & Badges',
    desc: 'Every completed step earns XP. Finish a game to unlock an exclusive badge!',
    color: 'from-blue-500 to-cyan-500',
    bg: 'from-blue-900/20 to-cyan-900/10',
  },
]

const MISSIONS_PREVIEW = [
  { id: 'apple-collector', emoji: '🍎', name: 'Apple Collector', diff: 'Beginner',     color: '#10b981' },
  { id: 'catch-stars',     emoji: '⭐', name: 'Catch the Stars', diff: 'Beginner',     color: '#f59e0b' },
  { id: 'space-shooter',   emoji: '🚀', name: 'Space Shooter',   diff: 'Intermediate', color: '#3b82f6' },
  { id: 'whack-a-mole',    emoji: '🔨', name: 'Whack-a-Mole',   diff: 'Intermediate', color: '#f97316' },
  { id: 'maze-runner',     emoji: '🧩', name: 'Maze Runner',     diff: 'Advanced',     color: '#8b5cf6' },
  { id: 'sky-drifter',     emoji: '🐦', name: 'Sky Drifter',     diff: 'Advanced',     color: '#0ea5e9' },
]

export default function Hero() {
  const { navigate, startMission } = useApp()

  function handleMissionClick(id) {
    const mission = MISSIONS.find(m => m.id === id)
    if (mission) startMission(mission)
  }

  return (
    <div className="relative min-h-screen stars-bg overflow-hidden">
      {/* Background glow blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-600/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating blocks — desktop only */}
      {FLOATING_BLOCKS.map((b, i) => (
        <motion.div
          key={i}
          className="absolute hidden lg:block pointer-events-none z-10"
          style={{ top: b.top, left: b.left, right: b.right, rotate: b.rotation }}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: b.delay }}
        >
          <div
            className="px-4 py-2 rounded-lg text-white text-sm font-bold shadow-lg opacity-70"
            style={{ backgroundColor: b.color, fontSize: '0.8rem' }}
          >
            {b.text}
          </div>
        </motion.div>
      ))}

      {/* ─── Nav bar ─── */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-4 md:px-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg shadow-lg">
            🎮
          </div>
          <span className="text-xl font-black text-white tracking-tight">
            Scratch<span className="gradient-text">Quest</span>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <button
            onClick={() => navigate('missions')}
            className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-bold transition-all duration-200 border border-white/10"
          >
            Missions
          </button>
          <button
            onClick={() => navigate('missions')}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-black shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200"
          >
            Play Now 🎮
          </button>
        </motion.div>
      </nav>

      {/* ─── Hero Section ─── */}
      <section className="relative z-10 text-center px-6 pt-16 pb-20 md:pt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 18 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-bold mb-6"
        >
          <Star size={14} className="text-yellow-400" fill="currentColor" />
          Game-Based Coding for Kids Ages 8–14
          <Star size={14} className="text-yellow-400" fill="currentColor" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl md:text-7xl font-black text-white leading-tight mb-6"
        >
          Learn Coding by
          <br />
          <span className="gradient-text">Building Games!</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="text-xl md:text-2xl text-purple-200/80 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Skip boring tutorials. Pick a game, follow guided steps, and build a real{' '}
          <span className="text-yellow-400 font-bold">Apple Collector</span>,{' '}
          <span className="text-blue-400 font-bold">Space Shooter</span>, or{' '}
          <span className="text-violet-400 font-bold">Maze Runner</span>{' '}
          on <span className="text-orange-400 font-bold">scratch.mit.edu</span>!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            onClick={() => navigate('missions')}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white text-xl font-black shadow-2xl glow-purple"
          >
            Start Your Quest! <Rocket size={22} />
          </motion.button>

          <motion.button
            onClick={() => navigate('missions')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/10 border border-white/20 text-white text-xl font-bold hover:bg-white/15 transition-all"
          >
            See the Games <ArrowRight size={20} />
          </motion.button>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-center gap-8 mt-14 text-white/60"
        >
          {[
            { val: '6', label: 'Fun Games' },
            { val: '50+', label: 'Step-by-step Lessons' },
            { val: '1500+', label: 'XP to Earn' },
            { val: '6', label: 'Exclusive Badges' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-black text-white">{s.val}</div>
              <div className="text-xs font-semibold mt-0.5">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ─── Mission previews ─── */}
      <section className="relative z-10 px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
          >
            {MISSIONS_PREVIEW.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.1 }}
                whileHover={{ scale: 1.04, y: -4 }}
                onClick={() => handleMissionClick(m.id)}
                className="glass rounded-2xl p-6 cursor-pointer group transition-all duration-200 hover:border-white/20"
              >
                <div className="text-4xl mb-3">{m.emoji}</div>
                <div className="font-black text-white text-lg">{m.name}</div>
                <div
                  className="text-xs font-bold mt-1 px-2 py-0.5 rounded-full inline-block"
                  style={{ color: m.color, backgroundColor: m.color + '22' }}
                >
                  {m.diff}
                </div>
                <div className="mt-3 flex items-center gap-1 text-white/40 text-sm font-semibold group-hover:text-white/70 transition-colors">
                  Start building <ArrowRight size={14} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section className="relative z-10 px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="text-3xl md:text-4xl font-black text-center text-white mb-10"
          >
            Why you'll <span className="gradient-text">love it</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.12 }}
                className={`bg-gradient-to-br ${f.bg} rounded-2xl p-6 border border-white/08`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <f.icon size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-black text-white mb-2">{f.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="relative z-10 px-6 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3 }}
          className="max-w-2xl mx-auto glass rounded-3xl p-10 border border-purple-500/20"
        >
          <div className="text-5xl mb-4">🚀</div>
          <h2 className="text-3xl font-black text-white mb-3">
            Ready to become a <span className="gradient-text">Game Developer?</span>
          </h2>
          <p className="text-white/60 mb-6">
            No experience needed. Just pick a game, follow the steps, and watch your creation come to life!
          </p>
          <motion.button
            onClick={() => navigate('missions')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-10 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-black shadow-xl glow-purple"
          >
            Choose Your Game 🎮
          </motion.button>
        </motion.div>
      </section>
    </div>
  )
}
