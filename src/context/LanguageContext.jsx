import { createContext, useContext, useState } from 'react'
import { T } from '../i18n/translations.js'
import { MISSIONS_TH } from '../i18n/missionsTh.js'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')
  return (
    <LanguageContext.Provider value={{ lang, toggle: () => setLang(l => l === 'en' ? 'th' : 'en') }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

export function useT() {
  const { lang } = useLanguage()
  return (key) => {
    const parts = key.split('.')
    let val = T[lang]
    for (const p of parts) val = val?.[p]
    if (val != null) return val
    let fallback = T.en
    for (const p of parts) fallback = fallback?.[p]
    return fallback ?? key
  }
}

export function useLocalizedMission(mission) {
  const { lang } = useLanguage()
  if (!mission || lang === 'en') return mission
  const th = MISSIONS_TH[mission.id]
  if (!th) return mission
  return {
    ...mission,
    title:       th.title       ?? mission.title,
    tagline:     th.tagline     ?? mission.tagline,
    description: th.description ?? mission.description,
    badge: th.badge ? { ...mission.badge, ...th.badge } : mission.badge,
    steps: mission.steps.map(step => {
      const thStep = th.steps?.[step.id]
      if (!thStep) return step
      return {
        ...step,
        title:       thStep.title       ?? step.title,
        description: thStep.description ?? step.description,
        goal:        thStep.goal        ?? step.goal,
        tip:         thStep.tip         ?? step.tip,
        didYouKnow:  thStep.didYouKnow  ?? step.didYouKnow,
        actions: thStep.actions
          ? thStep.actions.map((a, i) => ({ ...(step.actions[i] ?? {}), ...a }))
          : step.actions,
      }
    }),
  }
}
