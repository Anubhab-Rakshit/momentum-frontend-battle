"use client"
import { useEffect, useRef } from "react"

export function SoundManager() {
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    // Initialize audio context on first user interaction
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }
    }

    document.addEventListener("click", initAudio, { once: true })
    document.addEventListener("touchstart", initAudio, { once: true })

    return () => {
      document.removeEventListener("click", initAudio)
      document.removeEventListener("touchstart", initAudio)
    }
  }, [])

  return null
}

export const playInteractionSound = (type: "hover" | "click" | "success" | "error") => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    switch (type) {
      case "hover":
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
        oscillator.stop(audioContext.currentTime + 0.1)
        break
      case "click":
        oscillator.frequency.setValueAtTime(1200, audioContext.currentTime)
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15)
        oscillator.stop(audioContext.currentTime + 0.15)
        break
      case "success":
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime)
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.1)
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
        oscillator.stop(audioContext.currentTime + 0.3)
        break
      case "error":
        oscillator.frequency.setValueAtTime(300, audioContext.currentTime)
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
        oscillator.stop(audioContext.currentTime + 0.2)
        break
    }

    oscillator.start(audioContext.currentTime)
  } catch (error) {
    // Silently fail if audio context is not available
  }
}
