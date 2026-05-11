import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { useT } from '../context/LanguageContext.jsx'

function ConfettiPiece({ color, delay, x }) {
  return (
    <motion.div
      initial={{ y: -20, x: x, rotate: 0, opacity: 1 }}
      animate={{ y: '110vh', rotate: 720, opacity: 0 }}
      transition={{ duration: 2.5 + Math.random(), ease: 'linear', delay }}
      className="absolute top-0 w-3 h-3 rounded-sm pointer-events-none"
      style={{ backgroundColor: color, left: `${x}%` }}
    />
  )
}

const COLORS = ['#ff6b6b','#ffd93d','#6bcb77','#4d96ff','#ff6bff','#ff922b']
const PIECES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  color: COLORS[i % COLORS.length],
  delay: Math.random() * 0.8,
  x: Math.random() * 100,
}))

export default function BadgeModal({ badge, onClose }) {
  const t = useT()
  const [showParticles, setShowParticles] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShowParticles(false), 3000)
    return () => clearTimeout(t)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Confetti */}
      {showParticles && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {PIECES.map(p => (
            <ConfettiPiece key={p.id} {...p} />
          ))}
        </div>
      )}

      <motion.div
        initial={{ scale: 0.3, y: 80, rotate: -12 }}
        animate={{ scale: 1, y: 0, rotate: 0 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        onClick={e => e.stopPropagation()}
        className="relative flex flex-col items-center gap-6 p-10 rounded-3xl glass border border-white/15 shadow-2xl max-w-sm w-full mx-4 text-center"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Stars burst */}
        {[0, 60, 120, 180, 240, 300].map(deg => (
          <motion.div
            key={deg}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 0] }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="absolute text-yellow-400 text-xl pointer-events-none"
            style={{
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-60px)`,
            }}
          >
            ⭐
          </motion.div>
        ))}

        <div className="text-white/60 text-sm font-black uppercase tracking-widest">
          {t('badge.unlocked')}
        </div>

        {/* Badge */}
        <motion.div
          initial={{ rotate: -20, scale: 0.5 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.15 }}
          className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${badge.color} flex items-center justify-center text-6xl shadow-2xl`}
        >
          {badge.emoji}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <h2 className="text-3xl font-black text-white mb-2">{badge.name}</h2>
          <p className="text-white/60 text-sm leading-relaxed">{badge.description}</p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg font-black shadow-xl"
        >
          {t('badge.awesome')}
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
