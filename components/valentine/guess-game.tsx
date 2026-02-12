"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface Question {
  id: number
  image: string
  question: string
  options: string[]
  correctIndex: number
}

const questions: Question[] = [
  {
    id: 1,
    image: "/mem1.jpg",
    question: "What day did we meet?",
    options: ["Jul 4th", "Jul 11th", "Jul 12th", "Jul 18th"],
    correctIndex: 1,
  },
  {
    id: 2,
    image: "/flowers.jpg",
    question: "What were the first flowers I bought you?",
    options: ["Roses", "Ranunculus", "Lisianthus", "Tulips"],
    correctIndex: 2,
  },
  {
    id: 3,
    image: "/movie.jpg",
    question: "What was the first movie we finished together?",
    options: ["F1", "Shutter Island", "Jurassic World", "Ready Player One"],
    correctIndex: 3,
  },
]

interface GuessGameProps {
  onNext: () => void
}

export function GuessGame({ onNext }: GuessGameProps) {
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const question = questions[currentQ]

  const handleSelect = (idx: number) => {
    if (selected !== null) return
    setSelected(idx)
    const correct = idx === question.correctIndex
    setIsCorrect(correct)
    if (correct) setScore((s) => s + 1)

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ((q) => q + 1)
        setSelected(null)
        setIsCorrect(null)
      } else {
        setFinished(true)
      }
    }, 1500)
  }

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="font-serif text-sm tracking-[0.3em] uppercase text-muted-foreground">Chapter 3</p>
        <h2 className="mt-2 font-sans text-3xl font-bold text-foreground md:text-5xl">
          Guess the Memory
        </h2>
        <p className="mt-3 font-serif text-base text-muted-foreground">
          How well do you remember us?
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!finished ? (
          <motion.div
            key={currentQ}
            className="glass flex w-full max-w-lg flex-col items-center gap-6 rounded-2xl p-6 shadow-xl md:p-8"
            initial={{ opacity: 0, x: 100, rotateY: -30 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: -100, rotateY: 30 }}
            transition={{ duration: 0.5 }}
          >
            {/* Blurred image */}
            <div className="relative h-40 w-full overflow-hidden rounded-xl md:h-52">
              <Image
                src={question.image || "/placeholder.svg"}
                alt="Memory clue"
                fill
                className="object-cover"
                style={{
                  filter: selected !== null && isCorrect ? "blur(0px)" : "blur(8px)",
                  transition: "filter 0.5s ease",
                }}
                sizes="(max-width: 768px) 100vw, 512px"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-sans text-lg font-bold text-primary-foreground drop-shadow-lg">?</span>
              </div>
            </div>

            {/* Question */}
            <p className="text-center font-sans text-lg font-semibold text-foreground md:text-xl">
              {question.question}
            </p>

            {/* Options */}
            <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
              {question.options.map((option, idx) => {
                let optionClass = "border-border bg-background text-foreground hover:bg-muted"
                if (selected !== null) {
                  if (idx === question.correctIndex) {
                    optionClass = "border-green-400 bg-green-50 text-green-800"
                  } else if (idx === selected && !isCorrect) {
                    optionClass = "border-primary bg-primary/10 text-primary"
                  }
                }

                return (
                  <motion.button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`rounded-xl border-2 px-4 py-3 font-serif text-sm transition-all ${optionClass}`}
                    whileHover={selected === null ? { scale: 1.03 } : {}}
                    whileTap={selected === null ? { scale: 0.97 } : {}}
                    disabled={selected !== null}
                  >
                    {option}
                  </motion.button>
                )
              })}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {selected !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  {isCorrect ? (
                    <motion.p
                      className="font-sans text-lg font-bold text-green-600"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                    >
                      You know us so well!
                    </motion.p>
                  ) : (
                    <p className="font-sans text-lg font-bold text-primary">
                      Close enough, we still love each other!
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress */}
            <div className="flex items-center gap-2">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all ${i === currentQ ? "w-6 bg-primary" : i < currentQ ? "w-2 bg-primary/50" : "w-2 bg-border"}`}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="glass flex flex-col items-center gap-6 rounded-2xl p-8 text-center shadow-xl md:p-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <motion.div
              className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-3xl text-primary-foreground"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: 2 }}
            >
              {score === questions.length ? (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ) : (
                <span className="font-sans">{score}/{questions.length}</span>
              )}
            </motion.div>
            <h3 className="font-sans text-2xl font-bold text-foreground md:text-3xl">
              {score === questions.length ? "Perfect Score!" : "Nice Try!"}
            </h3>
            <p className="max-w-sm font-serif text-base text-muted-foreground leading-relaxed">
              {score === questions.length
                ? "You remember everything about us. That's true love!"
                : "What matters is that we're making more memories together."}
            </p>
            <motion.button
              onClick={onNext}
              className="rounded-full bg-primary px-8 py-3 font-sans text-sm font-semibold text-primary-foreground shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue Our Story
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
