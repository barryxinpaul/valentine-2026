"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FloatingHearts } from "@/components/valentine/floating-hearts"
import { WelcomePage } from "@/components/valentine/welcome-page"
import { MemoryGallery } from "@/components/valentine/memory-gallery"
import { GuessGame } from "@/components/valentine/guess-game"
import { LoveNotes } from "@/components/valentine/love-notes"
import { ValentineQuestion } from "@/components/valentine/valentine-question"

const chapters = [
  "welcome",
  "memories",
  "guess",
  "love-notes",
  "valentine",
] as const

type Chapter = (typeof chapters)[number]

const pageTransition = {
  initial: { opacity: 0, x: 300, scale: 0.95 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -300, scale: 0.95 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
}

export default function ValentineApp() {
  const [currentChapter, setCurrentChapter] = useState<Chapter>("welcome")

  const goToChapter = useCallback((chapter: Chapter) => {
    setCurrentChapter(chapter)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const chapterIndex = chapters.indexOf(currentChapter)

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <FloatingHearts />

      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, hsl(346 77% 60% / 0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, hsl(38 80% 55% / 0.06) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, hsl(346 90% 65% / 0.04) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* Chapter progress bar */}
      <div
        className="fixed left-0 right-0 top-0 z-50 h-1 bg-muted/50"
        role="progressbar"
        aria-valuenow={chapterIndex + 1}
        aria-valuemin={1}
        aria-valuemax={chapters.length}
      >
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{
            width: `${((chapterIndex + 1) / chapters.length) * 100}%`,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>

      {/* Chapter navigation dots */}
      <nav
        className="fixed right-4 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-3"
        aria-label="Story chapters"
      >
        {chapters.map((chapter, idx) => (
          <button
            key={chapter}
            onClick={() => idx <= chapterIndex && goToChapter(chapter)}
            className={`h-3 w-3 rounded-full border-2 transition-all ${
              idx === chapterIndex
                ? "scale-125 border-primary bg-primary"
                : idx < chapterIndex
                  ? "border-primary/50 bg-primary/30 hover:bg-primary/50"
                  : "border-border bg-background"
            }`}
            disabled={idx > chapterIndex}
            aria-label={`Chapter ${idx + 1}: ${chapter}`}
            aria-current={idx === chapterIndex ? "step" : undefined}
          />
        ))}
      </nav>

      {/* Chapter content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentChapter}
          {...pageTransition}
          className="relative z-10"
        >
          {currentChapter === "welcome" && (
            <WelcomePage onNext={() => goToChapter("memories")} />
          )}
          {currentChapter === "memories" && (
            <MemoryGallery onNext={() => goToChapter("guess")} />
          )}
          {currentChapter === "guess" && (
            <GuessGame onNext={() => goToChapter("love-notes")} />
          )}
          {currentChapter === "love-notes" && (
            <LoveNotes onNext={() => goToChapter("valentine")} />
          )}
          {currentChapter === "valentine" && <ValentineQuestion />}
        </motion.div>
      </AnimatePresence>

      {/* Hidden easter egg */}
      <button
        className="fixed bottom-4 left-4 z-50 rounded-full bg-background/50 p-2 opacity-0 backdrop-blur-sm transition-opacity hover:opacity-100"
        onClick={() => {
          const messages = [
            "You found a secret! I love you more than words can say.",
            "Hidden love note: My heart beats only for you.",
            "Easter egg found! You are the best thing that ever happened to me.",
            "Secret message: Every day with you is a gift.",
          ]
          alert(messages[Math.floor(Math.random() * messages.length)])
        }}
        aria-label="Hidden easter egg"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="hsl(346 77% 60%)"
          aria-hidden="true"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>
    </main>
  )
}
