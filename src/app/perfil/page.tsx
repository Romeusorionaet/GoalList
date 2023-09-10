/* eslint-disable @next/next/no-img-element */
'use client'

import { FormEvent, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { auth, storage } from '@/services/firebaseConfig'
import { Button } from '@/components/Button'
import { UpdateProfileContext } from '@/contexts/UpdateProfileContext'
import { InputControl, InputRoot } from '@/components/Input'

export default function Perfil() {
  const [dataImage, setDataImage] = useState({ image: '' })
  const [photoURL, setPhotoURL] = useState('')
  const [file, setFile] = useState<File>()

  const [newPassword, setNewPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [oldEmail, setOldEmail] = useState('')

  const [changePassword, setChangePassword] = useState(false)

  const { ChangePassword, UpdateProfileForm } = useContext(UpdateProfileContext)

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

  function handleChangePassword() {
    setNewEmail(newEmail)
    ChangePassword({ oldEmail, newPassword, oldPassword })
  }

  function handleButtonChangePassword() {
    changePassword ? setChangePassword(false) : setChangePassword(true)
  }

  return (
    <div>
      <form onSubmit={handleUpdateProfileForm}>
        <fieldset className="flex items-center gap-4">
          <label className="w-[90px]" htmlFor="photo">
            Imagem
          </label>
          <input
            id="photo"
            type="file"
            onChange={(e) => setFile(e.target.files![0])}
          />
          {file ? (
            <div className="w-25 h-25">
              <img
                className="rounded-full object-fill"
                src={URL.createObjectURL(file)}
                alt=""
              />
            </div>
          ) : (
            <div className="w-25 h-25">
              <img className="rounded-full object-fill" src={photoURL} alt="" />
            </div>
          )}
        </fieldset>

        <fieldset className="flex items-center gap-4">
          <label className="w-[90px]" htmlFor="name">
            Nome
          </label>

          <InputRoot>
            <InputControl
              id="name"
              onChange={(e) => setDisplayName(e.target.value)}
              defaultValue={displayName!}
              placeholder="seu nome"
            />
          </InputRoot>
        </fieldset>

        <fieldset className="flex items-center gap-4">
          <label className="w-[90px]" htmlFor="email">
            Email
          </label>
          <InputRoot>
            <InputControl
              type="email"
              id="email"
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="seuemail@gmail.com"
              defaultValue={oldEmail!}
            />
          </InputRoot>
        </fieldset>

        <fieldset className="flex items-center gap-4">
          <label className="w-[90px]" htmlFor="password">
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

        <Button title="atulizar perfil" type="submit" />
      </form>
      {/* Form for change password */}
      <div>
        <Button onClick={handleButtonChangePassword} title="mudar senha?" />
        <form
          className={`${changePassword ? '' : 'hidden'}`}
          onSubmit={handleChangePassword}
        >
          <fieldset className="flex items-center gap-4">
            <label className="w-[90px]" htmlFor="oldPassword">
              Senha Antiga
            </label>
            <InputRoot>
              <InputControl
                type="password"
                id="oldPassword"
                placeholder="******"
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </InputRoot>
          </fieldset>

          <fieldset className="flex items-center gap-4">
            <label className="w-[90px]" htmlFor="NewPassword">
              Senha nova
            </label>
            <InputRoot>
              <InputControl
                type="password"
                id="newPassword"
                placeholder="******"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </InputRoot>
          </fieldset>

          <Button title="Atualizar senha" type="submit" />
        </form>
      </div>
    </div>
  )
}
