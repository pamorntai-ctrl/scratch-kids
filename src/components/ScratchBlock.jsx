import { motion } from 'framer-motion'
import { CATEGORY_META } from '../data/missions.js'

export default function ScratchBlock({ block, onClick, isAdded, isInScript, small = false }) {
  const meta = CATEGORY_META[block.category] ?? { color: '#888', darkColor: '#555', label: '' }
  const { color, darkColor } = meta

  const shapeClass = {
    hat:      'block-hat',
    stack:    'block-stack',
    reporter: 'block-reporter',
    boolean:  'block-boolean',
    'c-top':  'block-c-top',
    'c-bottom': 'block-c-bottom',
    cap:      'block-stack',
  }[block.shape] ?? 'block-stack'

  const padding = small ? 'px-3 py-1.5' : 'px-4 py-2.5'
  const fontSize = small ? 'text-xs' : 'text-sm'

  return (
    <motion.div
      layout
      whileHover={onClick && !isAdded ? { scale: 1.06, y: -2 } : {}}
      whileTap={onClick && !isAdded ? { scale: 0.95 } : {}}
      onClick={!isAdded && onClick ? onClick : undefined}
      className={`
        ${shapeClass} ${padding} ${fontSize}
        inline-flex items-center gap-1.5
        font-bold text-white select-none
        ${onClick && !isAdded ? 'block-source' : ''}
        ${isAdded ? 'opacity-60 cursor-default' : ''}
        ${isInScript ? 'w-full' : ''}
        shadow-md
      `}
      style={{
        backgroundColor: isAdded ? darkColor : color,
        minWidth: small ? '120px' : '160px',
        maxWidth: isInScript ? '100%' : undefined,
        fontSize: small ? '0.72rem' : '0.82rem',
        lineHeight: 1.4,
        border: `2px solid ${darkColor}`,
        textShadow: '0 1px 2px rgba(0,0,0,0.35)',
      }}
      title={onClick && !isAdded ? 'Click to add this block!' : undefined}
    >
      {/* Category dot */}
      <span
        className="w-2 h-2 rounded-full shrink-0 opacity-70"
        style={{ backgroundColor: '#ffffff66' }}
      />

      {/* Block text */}
      <span className="flex-1">{block.text}</span>

      {/* Added indicator */}
      {isAdded && (
        <span className="text-white/70 text-xs shrink-0">✓</span>
      )}
    </motion.div>
  )
}
