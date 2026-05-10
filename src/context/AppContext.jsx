import { createContext, useContext, useReducer, useCallback } from 'react'

const AppContext = createContext(null)

const XP_PER_LEVEL = 200

function xpToLevel(xp)     { return Math.floor(xp / XP_PER_LEVEL) + 1 }
function levelProgress(xp) { return (xp % XP_PER_LEVEL) / XP_PER_LEVEL }

const initialState = {
  view: 'home',            // 'home' | 'missions' | 'lesson' | 'complete'
  totalXP: 0,
  badges: [],
  completedMissions: [],

  currentMission: null,
  currentStepIndex: 0,
  completedSteps: [],

  xpNotifications: [],
  showBadgeModal: false,
  newBadge: null,
}

function reducer(state, action) {
  switch (action.type) {

    case 'NAV':
      return { ...state, view: action.view }

    case 'START_MISSION':
      return {
        ...state,
        view: 'lesson',
        currentMission: action.mission,
        currentStepIndex: 0,
        completedSteps: [],
      }

    case 'COMPLETE_STEP': {
      const newXP   = state.totalXP + action.xp
      const notifId = Date.now()
      return {
        ...state,
        totalXP: newXP,
        completedSteps:   [...state.completedSteps, action.stepId],
        currentStepIndex: state.completedSteps.length + 1,
        xpNotifications:  [...state.xpNotifications, { id: notifId, amount: action.xp }],
      }
    }

    case 'GO_TO_STEP':
      return { ...state, currentStepIndex: action.index }

    case 'COMPLETE_MISSION': {
      const newXP   = state.totalXP + action.xp
      const notifId = Date.now()
      const alreadyHas = state.badges.find(b => b.id === action.badge.id)
      return {
        ...state,
        totalXP: newXP,
        view: 'complete',
        completedMissions: state.completedMissions.includes(action.missionId)
          ? state.completedMissions
          : [...state.completedMissions, action.missionId],
        badges:         alreadyHas ? state.badges : [...state.badges, action.badge],
        showBadgeModal: !alreadyHas,
        newBadge:       alreadyHas ? state.newBadge : action.badge,
        xpNotifications: [...state.xpNotifications, { id: notifId, amount: action.xp }],
      }
    }

    case 'REMOVE_XP_NOTIF':
      return { ...state, xpNotifications: state.xpNotifications.filter(n => n.id !== action.id) }

    case 'CLOSE_BADGE_MODAL':
      return { ...state, showBadgeModal: false }

    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const navigate        = useCallback((view)                    => dispatch({ type: 'NAV', view }), [])
  const startMission    = useCallback((mission)                 => dispatch({ type: 'START_MISSION', mission }), [])
  const completeStep    = useCallback((stepId, xp)             => dispatch({ type: 'COMPLETE_STEP', stepId, xp }), [])
  const completeMission = useCallback((missionId, xp, badge)   => dispatch({ type: 'COMPLETE_MISSION', missionId, xp, badge }), [])
  const removeXpNotif   = useCallback((id)                     => dispatch({ type: 'REMOVE_XP_NOTIF', id }), [])
  const closeBadgeModal = useCallback(()                       => dispatch({ type: 'CLOSE_BADGE_MODAL' }), [])
  const goToStep        = useCallback((index)                  => dispatch({ type: 'GO_TO_STEP', index }), [])

  return (
    <AppContext.Provider value={{
      ...state,
      level:          xpToLevel(state.totalXP),
      levelProgress:  levelProgress(state.totalXP),
      xpPerLevel:     XP_PER_LEVEL,
      navigate,
      startMission,
      completeStep,
      completeMission,
      removeXpNotif,
      closeBadgeModal,
      goToStep,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
