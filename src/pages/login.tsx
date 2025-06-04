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
      <div className="flex flex-col md:max-w-[470px] gap-7 md:gap-14">
        <img
          src="/images/brain.png"
          alt="brain"
          width={200}
          className="flex self-center w-36 md:w-48"
        />
        <h1 className="text-white text-center font-title drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-4xl md:text-[3.5rem]">
          Jogo da Memória
        </h1>
        <form className="flex flex-col px-5 gap-5" onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
            placeholder="Escreva seu nome"
            className="bg-input-background rounded-lg p-6 text-2xl md:text-4xl outline-none placeholder:text-text-placeholder"
          />
          <button
            disabled={name.length < 3}
            type="submit"
            className="bg-button-background text-border-color p-5 rounded-lg 
            text-3xl md:text-5xl font-title disabled:bg-input-background disabled:text-text-placeholder"
          >
            Play
          </button>
        </form>
      </div>
    </div>
  )
}
