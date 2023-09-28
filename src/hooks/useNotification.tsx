import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'

export function useNotification() {
  const notifyError = (message: string) => {
    toast.error(message)
  }

  const notifySuccess = (message: string) => {
    toast.success(message)
  }

  return {
    notifyError,
    notifySuccess,
  }
}
