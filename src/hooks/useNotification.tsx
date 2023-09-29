import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'

export function useNotification() {
  const notifyError = (message: string) => {
    toast.error(message)
  }

  const notifySuccess = (message: string) => {
    toast.success(message)
  }

  const notifyUploading = (message: string, progress: number) => {
    const toastId = toast.loading(message)

    setTimeout(() => {
      toast.dismiss(toastId)
    }, progress)
  }

  return {
    notifyError,
    notifySuccess,
    notifyUploading,
  }
}
