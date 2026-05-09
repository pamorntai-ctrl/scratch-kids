import { motion } from 'framer-motion'
import { SCRATCH_PALETTE } from '../data/missions.js'

const INDENT_PX = 20

function BlockShape({ shape, color }) {
  if (shape === 'hat') {
    return (
      <svg width="12" height="8" viewBox="0 0 12 8" className="shrink-0 mt-0.5">
        <path d="M0 4 Q0 0 3 0 L9 0 Q12 0 12 4 L12 8 L0 8 Z" fill={color} opacity="0.9" />
      </svg>
    )
  }
  if (shape === 'cap') {
    return (
      <svg width="10" height="8" viewBox="0 0 10 8" className="shrink-0 mt-0.5">
        <path d="M0 0 L10 0 L10 6 Q10 8 8 8 L2 8 Q0 8 0 6 Z" fill={color} opacity="0.9" />
      </svg>
    )
  }
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" className="shrink-0 mt-0.5">
      <rect x="0" y="0" width="8" height="8" rx="2" fill={color} opacity="0.9" />
    </svg>
  )
}

function Block({ block, index }) {
  const palette = SCRATCH_PALETTE[block.cat] ?? { bg: '#888', label: '?' }
  const indent  = (block.indent ?? 0) * INDENT_PX
  const isNote  = block.note

  if (isNote) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.04 }}
        className="flex items-center gap-2 mt-1"
        style={{ paddingLeft: indent }}
      >
        <span className="text-white/30 text-xs font-bold italic leading-snug">{block.text}</span>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
      className="flex items-center gap-2"
      style={{ paddingLeft: indent }}
    >
      <BlockShape shape={block.shape} color={palette.bg} />
      <div
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-bold text-xs select-none shadow-sm"
        style={{
          backgroundColor: palette.bg + 'dd',
          color: '#fff',
          textShadow: '0 1px 2px rgba(0,0,0,0.4)',
          border: `1.5px solid ${palette.bg}55`,
          fontSize: '0.72rem',
          letterSpacing: '0.01em',
        }}
      >
        {/* Category dot */}
        <span className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
        {block.text}
      </div>
      {/* Category label hint */}
      <span
        className="text-xs font-semibold hidden sm:inline"
        style={{ color: palette.bg + 'aa', fontSize: '0.65rem' }}
      >
        {palette.label}
      </span>
    </motion.div>
  )
}

export default function BlockReference({ blocks }) {
  if (!blocks || blocks.length === 0) return null

  return (
    <div className="rounded-2xl overflow-hidden border border-white/08">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1a1630] border-b border-white/06">
        <span className="text-base">📜</span>
        <span className="text-white font-black text-sm">Script Reference</span>
        <span className="ml-auto text-white/30 text-xs">Add these blocks in Scratch</span>
      </div>

      {/* Blocks list */}
      <div className="bg-[#110e24] px-4 py-4 flex flex-col gap-2.5">
        {blocks.map((block, i) => (
          <Block key={i} block={block} index={i} />
        ))}
      </div>

      {/* Footer hint */}
      <div className="px-4 py-2 bg-[#1a1630] border-t border-white/06">
        <p className="text-white/30 text-xs">
          💡 Colours match Scratch's block categories. Indent = nesting inside loops/ifs.
        </p>
      </div>
    </div>
  )
}
