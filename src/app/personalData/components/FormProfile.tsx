/* eslint-disable @next/next/no-img-element */

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { UpdateProfileContext } from '@/contexts/UpdateProfileContext'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { useOnAuthenticated } from '@/hooks/useOnAuthStateChanged'
import { InputControl, InputRoot } from '@/components/Input'
import { storage } from '@/services/firebaseConfig'
import { Button } from '@/components/Button'
import { User } from 'phosphor-react'
import Image from 'next/image'

export function FormProfile() {
  const [dataImage, setDataImage] = useState({ image: '' })
  const { photoURL, oldEmail } = useOnAuthenticated()
  const [file, setFile] = useState<File>()

  const [oldPassword, setOldPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [newEmail, setNewEmail] = useState('')

  const { UpdateProfileForm } = useContext(UpdateProfileContext)

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file!.name)
      const uploadTask = uploadBytesResumable(storageRef, file!)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
            default:
              break
          }
        },
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setDataImage((prev) => ({ ...prev, image: downloadURL }))
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
      oldEmail,
      oldPassword,
      displayName,
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
                <Image
                  height={200}
                  width={200}
                  quality={100}
                  className="absolute inset-0 h-full w-full rounded-full object-cover"
                  src={URL.createObjectURL(file)}
                  alt="User Profile"
                />
              ) : photoURL ? (
                <Image
                  height={200}
                  width={200}
                  quality={100}
                  className="absolute inset-0 h-full w-full rounded-full object-cover"
                  src={photoURL}
                  alt="User Profile"
                />
              ) : (
                <User className="h-20 w-20" />
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
          <label className="mb-2" htmlFor="name">
            Nome
          </label>

          <InputRoot>
            <InputControl
              id="name"
              onChange={(e) => setDisplayName(e.target.value)}
              defaultValue={displayName}
              // placeholder="seu nome"
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
              defaultValue={oldEmail}
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

      <div className="mt-8 text-end">
        <Button type="submit">Atulizar perfil</Button>
      </div>
    </form>
  )
}
