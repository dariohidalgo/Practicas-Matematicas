import React, { createContext, useContext, useState, useEffect } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { auth } from '../lib/firebase'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  error: string | null
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: null,
  signIn: async () => { throw new Error('AuthContext not initialized') },
  signUp: async () => { throw new Error('AuthContext not initialized') },
  signInWithGoogle: async () => { throw new Error('AuthContext not initialized') },
  logout: async () => { throw new Error('AuthContext not initialized') }
})

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      setError(null)
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      setError('Error al iniciar sesión. Por favor, verifica tus credenciales.')
      throw error
    }
  }

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({
        prompt: 'select_account'
      })
      
      // Primero intentamos con popup
      try {
        await signInWithPopup(auth, provider)
      } catch (popupError: any) {
        // Si el popup falla (por ejemplo, bloqueado), intentamos con redirect
        if (popupError.code === 'auth/popup-blocked') {
          await signInWithRedirect(auth, provider)
        } else {
          throw popupError
        }
      }
    } catch (error: unknown) {
      console.error('Error al iniciar sesión con Google:', error)
      if (error instanceof Error) {
        setError(`Error al iniciar sesión con Google: ${error.message}`)
      } else {
        setError('Error desconocido al iniciar sesión con Google')
      }
      throw error
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      setError(null)
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      setError('Error al crear la cuenta. El email podría estar en uso.')
      throw error
    }
  }

  const logout = async () => {
    try {
      setError(null)
      await signOut(auth)
    } catch (error) {
      setError('Error al cerrar sesión.')
      throw error
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    logout,
    error
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
