"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { Sparkles } from "./sparkles"

export function ValentineQuestion() {
  const [answered, setAnswered] = useState(false)
  const [noPos, setNoPos] = useState({ x: 0, y: 0 })
  const [noMoves, setNoMoves] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const fireConfetti = useCallback(() => {
    const duration = 4000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 }

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()
      if (timeLeft <= 0) return clearInterval(interval)

      const particleCount = 50 * (timeLeft / duration)
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#e8788a", "#f5b0bc", "#d4a574", "#fff0f3", "#ff6b8a"],
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#e8788a", "#f5b0bc", "#d4a574", "#fff0f3", "#ff6b8a"],
      })
    }, 250)
  }, [])

  const handleYes = () => {
    setAnswered(true)
    fireConfetti()
  }

  const moveNoButton = useCallback(() => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const maxX = rect.width - 120
    const maxY = rect.height - 50
    setNoPos({
      x: Math.random() * maxX - maxX / 2,
      y: Math.random() * maxY - maxY / 2,
    })
    setNoMoves((m) => m + 1)
  }, [])

  const noMessages = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you being serious?",
    "Not possible!",
  ]

  // Countdown timer to Valentine's Day
  const [countdown, setCountdown] = useState("")
  useEffect(() => {
    const target = new Date("2026-02-14T00:00:00")
    const update = () => {
      const now = new Date()
      const diff = target.getTime() - now.getTime()
      if (diff <= 0) {
        setCountdown("Happy Valentine's Day!")
        return
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`)
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16"
    >
      <Sparkles count={50} />

      <AnimatePresence mode="wait">
        {!answered ? (
          <motion.div
            key="question"
            className="glass relative flex flex-col items-center gap-8 rounded-3xl p-8 shadow-2xl md:p-16"
            initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotateY: 90 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <motion.p
              className="font-serif text-sm tracking-[0.3em] uppercase text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              The Final Chapter
            </motion.p>

            {/* Big heart */}
            <motion.div
              className="text-primary"
              animate={{
                scale: [1, 1.15, 1, 1.15, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>

            <motion.h2
              className="text-balance text-center font-sans text-3xl font-bold text-foreground md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              Will you be my Valentine?
            </motion.h2>

            {/* Countdown */}
            <motion.p
              className="font-serif text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {countdown}
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="relative flex w-full items-center justify-center gap-6"
              style={{ minHeight: 120 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {/* YES button */}
              <motion.button
                onClick={handleYes}
                className="animate-pulse-glow rounded-full bg-primary px-10 py-4 font-sans text-lg font-bold text-primary-foreground shadow-2xl"
                whileHover={{
                  scale: 1.15,
                  boxShadow: "0 0 50px hsl(346 77% 60% / 0.6), 0 0 100px hsl(346 77% 60% / 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                YES!
              </motion.button>

              {/* NO button that runs away */}
              <motion.button
                onMouseEnter={moveNoButton}
                onTouchStart={moveNoButton}
                className="rounded-full border-2 border-border bg-background px-6 py-3 font-sans text-sm font-medium text-muted-foreground shadow-sm"
                animate={{
                  x: noPos.x,
                  y: noPos.y,
                  rotate: noMoves * 15,
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 15,
                }}
                whileHover={{
                  scale: 0.8,
                }}
                aria-label="No button - this button will run away from you"
              >
                {noMessages[Math.min(noMoves, noMessages.length - 1)]}
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            className="flex flex-col items-center gap-8 text-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <motion.div
              className="text-primary"
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>

            <motion.h2
              className="font-sans text-4xl font-bold text-foreground md:text-6xl"
              initial={{ y: 30 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Best decision ever!
            </motion.h2>

            <motion.p
              className="max-w-md font-serif text-lg text-muted-foreground leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              I knew you would say yes. I love you 3000.
            </motion.p>

            {/* Love countdown */}
            <motion.div
              className="glass rounded-2xl px-8 py-4 shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <p className="font-serif text-sm text-muted-foreground">
                {"Valentine's Day countdown"}
              </p>
              <p className="mt-1 font-sans text-xl font-bold text-primary">
                {countdown}
              </p>
            </motion.div>

            <motion.p
              className="font-serif text-sm text-muted-foreground/60 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              Forever and always, your 馒头.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
