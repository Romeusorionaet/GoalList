import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { UpdateProfileContext } from '@/contexts/UpdateProfileContext'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { useOnAuthenticated } from '@/hooks/useOnAuthStateChanged'
import { InputControl, InputRoot } from '@/components/Form/Input'
import { useNotification } from '@/hooks/useNotification'
import { storage } from '@/services/firebaseConfig'
import { Button } from '@/components/Form/Button'
import { User } from 'phosphor-react'

export function FormProfile() {
  const [dataImage, setDataImage] = useState({ image: '' })
  const { userDate } = useOnAuthenticated()
  const [file, setFile] = useState<File>()

  const [oldPassword, setOldPassword] = useState('')
  const [displayNewName, setDisplayNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')

  const { UpdateProfileForm } = useContext(UpdateProfileContext)
  const { notifyError, notifySuccess, notifyUploading } = useNotification()

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file!.name)
      const uploadTask = uploadBytesResumable(storageRef, file!)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          notifyUploading(`Upload está ${progress} % feito`, progress)
          switch (snapshot.state) {
            case 'paused':
              notifyError('Upload foi pausado')
              break
            case 'running':
              notifyUploading('Upload está em andamento', progress)
              break
            default:
              break
          }
        },
        (error) => {
          notifyError(String(error))
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setDataImage((prev) => ({ ...prev, image: downloadURL }))
            notifySuccess('Upload realizado')
          })
        },
      )
    }
    file && uploadFile()
  }, [file])

  function handleUpdateProfileForm(event: FormEvent) {
    event.preventDefault()
    UpdateProfileForm({
      newEmail,
      oldEmail: userDate?.email,
      oldPassword,
      displayName: displayNewName,
      dataImage,
    })
  }

  return (
    <form onSubmit={handleUpdateProfileForm}>
      <div className="space-y-4">
        <fieldset className="flex items-center justify-center gap-4">
          <label>
            <div
              className={`relative flex h-[10rem] w-[10rem] items-center justify-center rounded-full bg-white`}
            >
              {file ? (
                <img
                  className="absolute inset-0 h-full w-full rounded-full object-cover"
                  src={URL.createObjectURL(file)}
                  alt="User Profile"
                />
              ) : userDate?.photoURL === null ? (
                <div
                  className={`relative flex h-[10rem] w-[10rem] items-center justify-center rounded-full border border-zinc-400 bg-white`}
                >
                  <User className="h-20 w-20" />
                </div>
              ) : (
                <img
                  className="absolute inset-0 h-full w-full rounded-full object-cover"
                  src={userDate?.photoURL}
                  alt="User Profile"
                />
              )}
            </div>
            <input
              className="sr-only"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files![0])}
            />
          </label>
        </fieldset>

        <fieldset className="flex flex-col gap-1">
          <label className="mb-2" htmlFor="nick">
            Nick name
          </label>

          <InputRoot>
            <InputControl
              id="nick"
              onChange={(e) => setDisplayNewName(e.target.value)}
              defaultValue={
                userDate?.displayName === null ? '' : userDate?.displayName
              }
              placeholder="nick nome"
            />
          </InputRoot>
        </fieldset>

        <fieldset className="flex flex-col gap-1">
          <label className="mb-2" htmlFor="email">
            Email
          </label>
          <InputRoot>
            <InputControl
              type="email"
              id="email"
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="seuemail@gmail.com"
              defaultValue={userDate?.email ?? ''}
            />
          </InputRoot>
        </fieldset>

        <fieldset className="flex flex-col gap-1">
          <label className="mb-2" htmlFor="password">
            Senha
          </label>
          <InputRoot>
            <InputControl
              type="password"
              id="password"
              placeholder="******"
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </InputRoot>
        </fieldset>
      </div>

      <div className="mx-1 my-6 text-end">
        <Button type="submit" className="w-full">
          Atulizar perfil
        </Button>
      </div>
    </form>
  )
}
