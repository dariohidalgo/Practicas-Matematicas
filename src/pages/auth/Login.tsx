import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/auth-context'
import { Button } from '../../components/ui/button'
import { Alert, AlertDescription } from '../../components/ui/alert'
import { FcGoogle } from 'react-icons/fc'

export default function Login() {
  const navigate = useNavigate()
  const { signInWithGoogle, error } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      await signInWithGoogle()
      navigate('/dashboard')
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Iniciar sesión
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Bienvenido a la plataforma de aprendizaje
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col space-y-4">
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center space-x-2 py-6"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            <FcGoogle className="w-6 h-6" />
            <span>{loading ? 'Iniciando sesión...' : 'Continuar con Google'}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
