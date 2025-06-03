import { useEffect, useState } from 'react'
import { useUserStore } from '../store/user-data'
import { useNavigate } from 'react-router-dom'
import { Card } from '../components/card'
import { Modal } from '../components/modal'
import { cardsArray, type CardsProps } from '../data/cards'

export function Home() {
  const navigate = useNavigate()
  const username = useUserStore(state => state.user.name)
  const [cards, setCards] = useState<CardsProps[]>(cardsArray)
  const [cardFlipped, setCardFlipped] = useState<CardsProps>()
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false) // Alterado para false inicialmente
  const [showModal, setShowModal] = useState(false)
  const [initialMemorization, setInitialMemorization] = useState(true) // Novo estado para controlar a fase de memorização

  function formatTime(totalSeconds: number) {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    if (minutes) {
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }
    return `${String(seconds).padStart(2, '0')}`
  }

  function handleCardClick(cardSelected: CardsProps) {
    // Não permitir cliques durante a fase de memorização ou quando o jogo estiver pausado
    if (!isRunning || initialMemorization) return

    setCards(prevCards =>
      prevCards.map(card =>
        card.id === cardSelected.id ? { ...card, flipped: true } : card
      )
    )
    if (cardFlipped) {
      if (cardFlipped?.image === cardSelected.image) {
      } else {
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === cardFlipped?.id || card.id === cardSelected.id
                ? { ...card, flipped: false }
                : card
            )
          )
        }, 1000)
      }
      setCardFlipped(undefined)
    } else {
      setCardFlipped(cardSelected)
    }
  }

  function resetGame() {
    // Embaralhar as cartas antes de reiniciar o jogo
    const shuffledCards = [...cardsArray]
      .map(card => ({ ...card, flipped: false })) // Garantir que todas as cartas estejam viradas para baixo
      .sort(() => Math.random() - 0.5) // Embaralhar o array

    setCards(shuffledCards)
    setSeconds(0)
    setIsRunning(false) // Não iniciar o cronômetro ainda
    setShowModal(false)
    setInitialMemorization(true) // Ativar a fase de memorização

    // Mostrar todas as cartas por 3 segundos
    setTimeout(() => {
      setCards(prevCards => prevCards.map(card => ({ ...card, flipped: true })))

      // Depois de 3 segundos, virar todas as cartas de volta e iniciar o jogo
      setTimeout(() => {
        setCards(prevCards =>
          prevCards.map(card => ({ ...card, flipped: false }))
        )
        setInitialMemorization(false) // Desativar a fase de memorização
        setIsRunning(true) // Iniciar o cronômetro
      }, 3000)
    }, 500) // Pequeno delay antes de mostrar as cartas
  }

  useEffect(() => {
    if (!username) {
      navigate('/login', { replace: true })
    }
  }, [username, navigate])

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) {
        setSeconds(prev => prev + 1)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning])

  useEffect(() => {
    if (cards.every(card => card.flipped)) {
      // Não acionar quando estiver na fase de memorização inicial
      if (!initialMemorization) {
        setIsRunning(false)
        setShowModal(true)
      }
    }
  }, [cards, initialMemorization])

  // Inicialização do jogo
  useEffect(() => {
    // Embaralhar as cartas quando o componente é montado
    const shuffledCards = [...cardsArray].sort(() => Math.random() - 0.5)
    setCards(shuffledCards)

    // Mostrar todas as cartas por 3 segundos no início do jogo
    setTimeout(() => {
      setCards(prevCards => prevCards.map(card => ({ ...card, flipped: true })))

      // Depois de 3 segundos, virar todas as cartas de volta e iniciar o jogo
      setTimeout(() => {
        setCards(prevCards =>
          prevCards.map(card => ({ ...card, flipped: false }))
        )
        setInitialMemorization(false) // Desativar a fase de memorização
        setIsRunning(true) // Iniciar o cronômetro
      }, 3000)
    }, 500) // Pequeno delay antes de mostrar as cartas
  }, []) // Array de dependências vazio para executar apenas uma vez na montagem

  if (!username) {
    return null
  }
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-[url(/images/kame.jpeg)] bg-cover bg-center z-0" />
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="flex flex-col items-center h-screen w-screen pt-10 gap-10 px-4 relative z-50 md:px-0 md:justify-center md:pt-0">
        <header className="flex justify-between w-full md:justify-around">
          <h1 className="text-xl text-white font-title drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] md:text-[3.5rem]">
            {username}
          </h1>
          <h1 className="text-xl text-white font-title drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] md:text-[3.5rem] md:w-[370px]">
            Tempo: {formatTime(seconds)}
          </h1>
        </header>
        <div className="grid grid-cols-5 gap-4 md:gap-5">
          {cards.map(item => (
            <Card
              image={item.image}
              key={`${item.id}`}
              flipped={item.flipped}
              onclick={() => handleCardClick(item)}
            />
          ))}
        </div>
      </div>

      <Modal isOpen={showModal} time={seconds} onReset={resetGame} />
    </div>
  )
}
