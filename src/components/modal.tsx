import { motion } from 'motion/react'

interface ModalProps {
  isOpen: boolean
  time: number
  onReset: () => void
}

export function Modal({ isOpen, time, onReset }: ModalProps) {
  if (!isOpen) return null

  function formatTime(totalSeconds: number) {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    if (minutes) {
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }
    return `${String(seconds).padStart(2, '0')} segundos`
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/70" />
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#f5f5f5] p-8 rounded-lg shadow-lg z-10 max-w-md w-full text-center mx-10 relative md:mx-0"
      >
        <img
          src="/images/dragon-ball.png"
          alt="Dragon Ball"
          className="w-24 h-24 mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-[#ff9000] mb-2">Parabéns!</h2>
        <p className="text-gray-800 mb-6">Você completou o jogo em:</p>
        <div className="text-4xl font-bold text-[#ff9000] mb-6">
          {formatTime(time)}
        </div>
        <button
          type="button"
          onClick={onReset}
          className="bg-[#ff9000] hover:bg-[#e68200] text-white font-bold py-3 px-6 rounded-full transition-colors"
        >
          Jogar Novamente
        </button>
      </motion.div>
    </div>
  )
}
