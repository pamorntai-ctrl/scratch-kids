import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { Zap } from 'lucide-react'

export default function XPNotification({ amount, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1800)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.6 }}
      animate={{ opacity: 1, y: -30, scale: 1 }}
      exit={{ opacity: 0, y: -70, scale: 0.8 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-black text-base shadow-xl"
      style={{ pointerEvents: 'none' }}
    >
      <Zap size={16} fill="currentColor" />
      +{amount} XP
    </motion.div>
  )
}
