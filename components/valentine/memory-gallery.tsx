"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface Memory {
  id: number
  src: string
  caption: string
  date: string
}

const memories: Memory[] = [
  {
    id: 1,
    src: "/chang.jpg",
    caption: "Our first date",
    date: "Chang Mai Liberty",
  },
  {
    id: 2,
    src: "/french.jpg",
    caption: "Dinner with my sister",
    date: "Chantecler",
  },
  {
    id: 3,
    src: "/firstuwo.jpg",
    caption: "Visiting London Ontario for the first time",
    date: "The Ceeps",
  },
  {
    id: 4,
    src: "/hoco.jpg",
    caption: "HOCO at Western",
    date: "Mustangs🐎",
  },
  {
    id: 5,
    src: "/dating.jpg",
    caption: "Offically bf+gf",
    date: "10/10/2025",
  },
  {
    id: 6,
    src: "/birthday.jpg",
    caption: "22nd birthday",
    date: "11/22/2025",
  },
]

interface MemoryGalleryProps {
  onNext: () => void
}

const pageFlip = {
  initial: { rotateY: -90, opacity: 0 },
  animate: { rotateY: 0, opacity: 1 },
  exit: { rotateY: 90, opacity: 0 },
  transition: { duration: 0.6, ease: "easeInOut" },
}

export function MemoryGallery({ onNext }: MemoryGalleryProps) {
  const [current, setCurrent] = useState(0)
  const [flipped, setFlipped] = useState<Set<number>>(new Set())

  const toggleFlip = (id: number) => {
    setFlipped((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const isLastPage = current >= Math.ceil(memories.length / 2) - 1
  const startIdx = current * 2
  const visibleMemories = memories.slice(startIdx, startIdx + 2)

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-serif text-sm tracking-[0.3em] uppercase text-muted-foreground">Chapter 2</p>
        <h2 className="mt-2 font-sans text-3xl font-bold text-foreground md:text-5xl">
          Our Memories
        </h2>
        <p className="mt-3 font-serif text-base text-muted-foreground">
          Tap a photo to reveal the memory
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="flex flex-col items-center gap-6 md:flex-row md:gap-8"
          {...pageFlip}
          style={{ perspective: 1200 }}
        >
          {visibleMemories.map((memory) => (
            <motion.button
              key={memory.id}
              className="group relative cursor-pointer"
              onClick={() => toggleFlip(memory.id)}
              whileHover={{ rotate: Math.random() > 0.5 ? 2 : -2, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              aria-label={`View memory: ${memory.caption}`}
            >
              {/* Polaroid card */}
              <div className="relative overflow-hidden rounded-lg bg-background p-3 pb-16 shadow-xl md:p-4 md:pb-20">
                <div className="relative h-48 w-48 overflow-hidden rounded-sm md:h-64 md:w-64">
                  <Image
                    src={memory.src || "/placeholder.svg"}
                    alt={memory.caption}
                    fill
                    className="object-cover transition-all duration-500"
                    style={{
                      filter: flipped.has(memory.id) ? "none" : "blur(0px) saturate(0.8)",
                    }}
                    sizes="(max-width: 768px) 192px, 256px"
                  />
                  {/* Overlay on hover if not flipped */}
                  <AnimatePresence>
                    {flipped.has(memory.id) && (
                      <motion.div
                        className="absolute inset-0 flex items-end bg-foreground/20 p-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <span className="rounded-md bg-background/80 px-2 py-1 font-serif text-xs text-foreground backdrop-blur-sm">
                          {memory.date}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Caption area */}
                <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4">
                  <AnimatePresence>
                    {flipped.has(memory.id) ? (
                      <motion.p
                        className="font-serif text-sm text-foreground italic leading-relaxed"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        {memory.caption}
                      </motion.p>
                    ) : (
                      <motion.p
                        className="font-serif text-sm text-muted-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Tap to reveal...
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Tape effect */}
                <div className="absolute -top-2 left-1/2 h-6 w-16 -translate-x-1/2 rotate-1 rounded-sm bg-gold/30" />
              </div>
            </motion.button>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-8 flex items-center gap-4">
        {current > 0 && (
          <motion.button
            onClick={() => { setCurrent((p) => p - 1); setFlipped(new Set()) }}
            className="rounded-full border border-border bg-background px-6 py-2 font-sans text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Previous
          </motion.button>
        )}

        {/* Page dots */}
        <div className="flex items-center gap-2">
          {Array.from({ length: Math.ceil(memories.length / 2) }).map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full transition-colors ${i === current ? "bg-primary" : "bg-border"}`}
            />
          ))}
        </div>

        <motion.button
          onClick={() => {
            if (isLastPage) { onNext() }
            else { setCurrent((p) => p + 1); setFlipped(new Set()) }
          }}
          className="rounded-full bg-primary px-6 py-2 font-sans text-sm font-medium text-primary-foreground shadow-lg transition-all hover:shadow-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isLastPage ? "Next Chapter" : "More Memories"}
        </motion.button>
      </div>
    </section>
  )
}
