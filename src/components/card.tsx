import { motion } from 'motion/react'

interface CardProps {
  flipped: boolean
  image: string
  onclick: () => void
}

export function Card({ flipped, image, onclick }: CardProps) {
  return (
    <button
      type="button"
      className="w-16 cursor-pointer md:w-24"
      onClick={onclick}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="backface-hidden ">
          <img src="/images/card.png" alt="cardDefaut" />
        </div>
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <img src={image} alt="cardFlipped" />
        </div>
      </motion.div>
    </button>
  )
}
