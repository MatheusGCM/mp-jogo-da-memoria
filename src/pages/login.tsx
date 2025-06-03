import { useState } from 'react'
import { useUserStore } from '../store/user-data'
import { useNavigate } from 'react-router-dom'

export function Login() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const { updateUserData } = useUserStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateUserData({ name })
    navigate('/', { replace: true })
    setName('')
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-[url(/images/shen.png)] bg-cover bg-center">
      <div className="flex flex-col max-w-[470px]">
        <img
          src="/images/brain.png"
          alt="brain"
          width={200}
          className="flex self-center"
        />
        <h1 className="text-[3.5rem] text-white font-title drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          Jogo da Memória
        </h1>
        <form
          className="flex flex-col px-5 gap-5 mt-14"
          onSubmit={handleSubmit}
        >
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
            placeholder="Escreva seu nome"
            className="bg-input-background rounded-lg p-6 text-4xl outline-none placeholder:text-text-placeholder"
          />
          <button
            disabled={name.length < 3}
            type="submit"
            className="bg-button-background text-border-color p-5 rounded-lg text-5xl font-title disabled:bg-input-background disabled:text-text-placeholder"
          >
            Play
          </button>
        </form>
      </div>
    </div>
  )
}
