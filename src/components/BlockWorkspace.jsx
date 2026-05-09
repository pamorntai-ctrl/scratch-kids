import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lightbulb, CheckCircle2, Plus } from 'lucide-react'
import ScratchBlock from './ScratchBlock.jsx'
import { useApp } from '../context/AppContext.jsx'
import { CATEGORY_META } from '../data/missions.js'

function CategoryTab({ category, active, onClick }) {
  const meta = CATEGORY_META[category] ?? { label: category, color: '#888' }
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 border ${
        active ? 'text-white border-transparent' : 'bg-white/05 border-white/10 text-white/50 hover:text-white/80'
      }`}
      style={active ? { backgroundColor: meta.color, borderColor: meta.color } : {}}
    >
      {meta.label}
    </button>
  )
}

export default function BlockWorkspace({ step }) {
  const { addedBlockIds, addBlock, hintVisible, toggleHint } = useApp()
  const blocks = step.blocks ?? []

  const categories = [...new Set(blocks.map(b => b.category))]
  const [activeCategory, setActiveCategory] = useState(categories[0] ?? 'events')

  const paletteBlocks = blocks.filter(b => b.category === activeCategory)
  const scriptBlocks = blocks.filter(b => addedBlockIds.includes(b.id))
  const allAdded = blocks.length > 0 && blocks.every(b => addedBlockIds.includes(b.id))

  if (step.type === 'info') {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-48 text-center gap-4 p-6">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="text-6xl"
        >
          {step.emoji ?? '📖'}
        </motion.div>
        <p className="text-white/60 text-sm max-w-xs">
          This is a setup step — no blocks needed! Just follow the instructions and click{' '}
          <span className="text-purple-300 font-bold">Complete Step</span>.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <h3 className="text-white font-black text-sm">🧱 Code Blocks</h3>
        <button
          onClick={toggleHint}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            hintVisible ? 'bg-yellow-500/30 border border-yellow-500/40 text-yellow-300' : 'bg-white/06 border border-white/10 text-white/50 hover:text-yellow-300'
          }`}
        >
          <Lightbulb size={12} /> Hint
        </button>
      </div>

      {/* Hint panel */}
      <AnimatePresence>
        {hintVisible && step.tip && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-200 text-xs leading-relaxed">
              {step.tip}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category tabs */}
      {categories.length > 1 && (
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map(cat => (
            <CategoryTab
              key={cat}
              category={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </div>
      )}

      {/* Two-column: palette | script */}
      <div className="flex gap-3 flex-1 min-h-0">
        {/* Palette */}
        <div className="flex-1 flex flex-col gap-1.5 min-w-0">
          <div className="text-white/40 text-xs font-bold mb-1">AVAILABLE</div>
          <div className="flex flex-col gap-2 overflow-y-auto pr-1" style={{ maxHeight: 280 }}>
            {paletteBlocks.map(block => (
              <motion.div
                key={block.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <ScratchBlock
                  block={block}
                  isAdded={addedBlockIds.includes(block.id)}
                  onClick={() => addBlock(block.id)}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Divider arrow */}
        <div className="flex flex-col items-center justify-center gap-1 opacity-30">
          <div className="w-px flex-1 bg-white/20" />
          <Plus size={16} className="text-white rotate-0" />
          <div className="w-px flex-1 bg-white/20" />
        </div>

        {/* Script */}
        <div className="flex-1 flex flex-col gap-1.5 min-w-0">
          <div className="text-white/40 text-xs font-bold mb-1">
            YOUR SCRIPT ({scriptBlocks.length}/{blocks.length})
          </div>

          <div
            className={`flex-1 rounded-xl p-3 flex flex-col gap-1.5 border transition-all duration-300 overflow-y-auto ${
              allAdded
                ? 'border-green-500/40 bg-green-500/05'
                : scriptBlocks.length > 0
                  ? 'border-purple-500/30 bg-purple-500/05'
                  : 'border-dashed border-white/15 bg-white/02'
            }`}
            style={{ minHeight: 120, maxHeight: 280 }}
          >
            {scriptBlocks.length === 0 ? (
              <div className="flex flex-col items-center justify-center flex-1 text-white/25 text-xs text-center gap-1">
                <div className="text-2xl">👆</div>
                Click blocks on the left to add them here!
              </div>
            ) : (
              <>
                <AnimatePresence>
                  {scriptBlocks.map((block, i) => (
                    <motion.div
                      key={block.id}
                      initial={{ opacity: 0, x: 20, scale: 0.85 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    >
                      <ScratchBlock block={block} isInScript />
                    </motion.div>
                  ))}
                </AnimatePresence>

                {allAdded && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-2 flex items-center justify-center gap-2 py-2 rounded-lg bg-green-500/20 border border-green-500/30 text-green-300 text-xs font-bold"
                  >
                    <CheckCircle2 size={14} />
                    All blocks added! Ready to complete step.
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
