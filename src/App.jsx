import { AnimatePresence, motion } from 'framer-motion'
import { AppProvider, useApp } from './context/AppContext.jsx'
import Hero from './components/Hero.jsx'
import MissionSelect from './components/MissionSelect.jsx'
import LessonView from './components/LessonView.jsx'
import CompletionScreen from './components/CompletionScreen.jsx'
import BadgeModal from './components/BadgeModal.jsx'
import XPNotification from './components/XPNotification.jsx'
import PresentationView from './components/PresentationView.jsx'

const views = {
  home: Hero,
  missions: MissionSelect,
  lesson: LessonView,
  complete: CompletionScreen,
  presentation: PresentationView,
}

function AppInner() {
  const { view, showBadgeModal, newBadge, closeBadgeModal, xpNotifications, removeXpNotif } = useApp()
  const View = views[view] ?? Hero

  return (
    <div className="min-h-screen font-nunito relative overflow-x-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="min-h-screen"
        >
          <View />
        </motion.div>
      </AnimatePresence>

      {/* XP floating notifications */}
      <div className="fixed top-24 right-6 z-50 pointer-events-none flex flex-col gap-2">
        <AnimatePresence>
          {xpNotifications.map(n => (
            <XPNotification key={n.id} amount={n.amount} onDone={() => removeXpNotif(n.id)} />
          ))}
        </AnimatePresence>
      </div>

      {/* Badge modal */}
      <AnimatePresence>
        {showBadgeModal && newBadge && (
          <BadgeModal badge={newBadge} onClose={closeBadgeModal} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  )
}
