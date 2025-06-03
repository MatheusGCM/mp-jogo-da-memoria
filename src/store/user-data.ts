import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserData {
  name: string
}

interface UserState {
  user: UserData
  updateUserData: (data: Partial<UserData>) => void
  logout: () => void // Nova função para logout
}

const initialState: UserData = {
  name: '',
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      user: initialState,
      updateUserData: data =>
        set(state => ({ user: { ...state.user, ...data } })),
      logout: () => set({ user: initialState }), // Implementação da função de logout
    }),
    {
      name: 'user-storage', // chave do localStorage
    }
  )
)
