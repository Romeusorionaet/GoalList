/* eslint-disable @next/next/no-img-element */

import { FormEvent, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { auth, storage } from '@/services/firebaseConfig'
import { UpdateProfileContext } from '@/contexts/UpdateProfileContext'
import { InputControl, InputRoot } from '@/components/Input'
import { User } from 'phosphor-react'
import { Button } from '@/components/Button'

export function FormProfile() {
  const [dataImage, setDataImage] = useState({ image: '' })
  const [photoURL, setPhotoURL] = useState('')
  const [file, setFile] = useState<File>()

  const [oldPassword, setOldPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [oldEmail, setOldEmail] = useState('')

  const { UpdateProfileForm } = useContext(UpdateProfileContext)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setOldEmail(String(user.email))
        setDisplayName(String(user.displayName))
        setPhotoURL(String(user.photoURL))
      } else {
        console.log('User is signed out')
      }
    })
  }, [])

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
            ) : photoURL ? (
              <img
                className="absolute inset-0 h-full w-full rounded-full object-cover"
                src={photoURL}
                alt="User Profile"
              />
            ) : (
              <User className="h-20 w-20" />
            )}
          </div>
          <input
            className="hidden"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files![0])}
          />
        </label>
      </fieldset>

      <fieldset className="mb-4 flex flex-col gap-1">
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

      <fieldset className="mb-4 flex flex-col gap-1">
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

      <fieldset className="mb-8 flex flex-col gap-1">
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

      <div className="text-end">
        <Button type="submit">Atulizar perfil</Button>
      </div>
    </form>
  )
}
