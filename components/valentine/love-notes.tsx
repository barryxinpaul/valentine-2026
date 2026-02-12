"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles } from "./sparkles"

const reasons = [
  "You're kinda funny (not really)",
  "The prettiest, most beautiful person I've ever met",
  "Eat very well and a lot (we can go to yummy places)",
  "You always come over to my place to see me",
  "Fire fashion & style",
  "Amazing at cooking",
  "The best at showing your affection",
  "My favourite person to talk to",
]

interface LoveNotesProps {
  onNext: () => void
}

export function LoveNotes({ onNext }: LoveNotesProps) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set())
  const allRevealed = revealed.size === reasons.length

  const toggleReveal = (idx: number) => {
    setRevealed((prev) => {
      const next = new Set(prev)
      next.add(idx)
      return next
    })
  }

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <Sparkles count={20} />

      <motion.div
        className="mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="font-serif text-sm tracking-[0.3em] uppercase text-muted-foreground">Chapter 4</p>
        <h2 className="mt-2 font-sans text-3xl font-bold text-foreground md:text-5xl">
          Reasons I Love You
        </h2>
        <p className="mt-3 font-serif text-base text-muted-foreground">
          Tap each card to reveal a reason
        </p>
      </motion.div>

      <div className="grid w-full max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
        {reasons.map((reason, idx) => (
          <motion.button
            key={idx}
            onClick={() => toggleReveal(idx)}
            className="relative aspect-square"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.05, rotate: Math.random() > 0.5 ? 2 : -2 }}
            aria-label={revealed.has(idx) ? reason : "Tap to reveal a reason"}
          >
            <AnimatePresence mode="wait">
              {revealed.has(idx) ? (
                <motion.div
                  key="revealed"
                  className="flex h-full w-full items-center justify-center rounded-2xl bg-primary p-3 text-primary-foreground shadow-lg"
                  initial={{ rotateY: 90 }}
                  animate={{ rotateY: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="font-serif text-xs leading-relaxed md:text-sm">{reason}</p>
                </motion.div>
              ) : (
                <motion.div
                  key="hidden"
                  className="glass flex h-full w-full items-center justify-center rounded-2xl shadow-md"
                  exit={{ rotateY: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="hsl(346 77% 60% / 0.4)"
                    className="transition-colors group-hover:fill-primary"
                    aria-hidden="true"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      {/* Love Meter */}
      <motion.div
        className="mt-8 flex w-full max-w-xs flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p className="font-serif text-sm text-muted-foreground">Love Meter</p>
        <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${(revealed.size / reasons.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <p className="font-sans text-xs font-semibold text-primary">
          {revealed.size}/{reasons.length} reasons revealed
        </p>
      </motion.div>

      <AnimatePresence>
        {allRevealed && (
          <motion.div
            className="mt-8 flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="font-serif text-base text-foreground italic">
              {"And there are a million more reasons..."}
            </p>
            <motion.button
              onClick={onNext}
              className="animate-pulse-glow rounded-full bg-primary px-8 py-3 font-sans text-sm font-semibold text-primary-foreground shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              The Final Chapter
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
