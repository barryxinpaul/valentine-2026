"use client"

import { motion } from "framer-motion"
import { Sparkles } from "./sparkles"

interface WelcomePageProps {
  onNext: () => void
}

export function WelcomePage({ onNext }: WelcomePageProps) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
      <Sparkles count={40} />

      {/* Book shape */}
      <motion.div
        className="glass relative flex flex-col items-center gap-8 rounded-2xl p-8 md:p-16 shadow-2xl"
        initial={{ rotateY: -90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ perspective: 1000 }}
      >
        {/* Decorative top ornament */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <span className="block h-px w-12 bg-primary/40" />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="hsl(346 77% 60%)" aria-hidden="true">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span className="block h-px w-12 bg-primary/40" />
        </motion.div>

        <motion.p
          className="font-serif text-sm tracking-[0.3em] uppercase text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          Chloe & Barry
        </motion.p>

        <motion.h1
          className="text-balance text-center font-sans text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          你好
        </motion.h1>

        <motion.p
          className="max-w-md text-center font-serif text-base leading-relaxed text-muted-foreground md:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          To take your mind off studying, I made a fun game.
          <br />
          Turn the page to start.
        </motion.p>

        <motion.button
          onClick={onNext}
          className="group relative mt-4 overflow-hidden rounded-full bg-primary px-8 py-3 font-sans text-sm font-semibold tracking-wide text-primary-foreground shadow-lg transition-all md:px-10 md:py-4 md:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.6 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(346 77% 60% / 0.5)" }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="relative z-10">Turn the Page</span>
          <motion.span
            className="absolute inset-0 bg-accent"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        {/* Page number */}
        <motion.span
          className="font-serif text-xs text-muted-foreground/60 tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          Chapter 1
        </motion.span>
      </motion.div>
    </section>
  )
}
