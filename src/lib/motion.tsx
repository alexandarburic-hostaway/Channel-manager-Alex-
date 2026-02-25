import type { ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

type Bezier = [number, number, number, number]

export const motionTokens = {
  duration: {
    fast: 0.12,
    normal: 0.18,
    slow: 0.24,
  },
  easing: {
    default: [0.2, 0.8, 0.2, 1] as Bezier,
    emphasize: [0.4, 0, 0.2, 1] as Bezier,
  },
}

interface MotionPresenceProps {
  children: ReactNode
  mode?: 'sync' | 'wait' | 'popLayout'
}

export function MotionPresence({ children, mode = 'wait' }: MotionPresenceProps) {
  return (
    <AnimatePresence initial={false} mode={mode}>
      {children}
    </AnimatePresence>
  )
}

interface PageTransitionProps {
  children: ReactNode
  routeKey: string
}

export function PageTransition({ children, routeKey }: PageTransitionProps) {
  const reduceMotion = useReducedMotion()
  if (reduceMotion) {
    return <div key={routeKey}>{children}</div>
  }

  return (
    <motion.div
      key={routeKey}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.default }}
      className="h-full min-h-screen"
    >
      {children}
    </motion.div>
  )
}

interface FadeInProps {
  children: ReactNode
  scaleFrom?: number
  duration?: keyof typeof motionTokens.duration
}

export function FadeIn({ children, scaleFrom = 1, duration = 'normal' }: FadeInProps) {
  const reduceMotion = useReducedMotion()
  if (reduceMotion) {
    return <>{children}</>
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: scaleFrom }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: scaleFrom }}
      transition={{ duration: motionTokens.duration[duration], ease: motionTokens.easing.default }}
    >
      {children}
    </motion.div>
  )
}

interface SlideUpProps {
  children: ReactNode
  distance?: number
  duration?: keyof typeof motionTokens.duration
}

export function SlideUp({ children, distance = 12, duration = 'normal' }: SlideUpProps) {
  const reduceMotion = useReducedMotion()
  if (reduceMotion) {
    return <>{children}</>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: distance }}
      transition={{ duration: motionTokens.duration[duration], ease: motionTokens.easing.default }}
    >
      {children}
    </motion.div>
  )
}

