'use client'

import { FormEvent, useEffect, useState } from 'react'
import { doc, setDoc } from 'firebase/firestore'
import {
  onAuthStateChanged,
  updatePassword,
  User,
  EmailAuthProvider,
  reauthenticateWithCredential,
  AuthError,
  updateEmail,
  sendEmailVerification,
} from 'firebase/auth'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { auth, db, storage } from '@/services/firebaseConfig'
import { Button } from '@/components/Button'
import { useUpdateEmail, useUpdateProfile } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/navigation'
import { useCookies } from '@/hooks/useCookies'

export default function Perfil() {
  const [file, setFile] = useState<File>()
  const [dataImage, setDataImage] = useState({ image: '' })

  const [newEmail, setNewEmail] = useState('')
  const [oldEmail, setOldEmail] = useState<string | null>()
  const [newPassword, setNewPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')

  const [displayName, setDisplayName] = useState<string | null>()
  const [userId, setUserId] = useState('')
  const [user, setUser] = useState<User>()
  const [photoURL, setPhotoURL] = useState('')

  const [updateProfile] = useUpdateProfile(auth)
  const router = useRouter()

  const { removeCookie } = useCookies()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
        setUser(user)
        setUserId(user.uid)
        setOldEmail(user.email)
        setDisplayName(user.displayName)
        setPhotoURL(String(user.photoURL))
      } else {
        console.log('User is signed out')
      }
    })
  }, [])

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file!.name

      console.log(name)
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

  async function handleUpdateProfileForm(event: FormEvent) {
    event.preventDefault()
    try {
      console.log(dataImage)
      if (displayName) {
        updateProfile({
          displayName,
        })
      }
      if (dataImage.image) {
        updateProfile({
          photoURL: dataImage.image,
        })
      }
      // await setDoc(doc(db, 'users', userId), {
      //   displayName,
      //   email: newEmail,
      //   imgURL: dataImage,
      // })

      // Isso deverá ficar na tela de login, recuperação de senha
      // sendPasswordResetEmail(auth, newEmail!, {
      //   url: 'http://localhost:3000/signIn',
      // })
    } catch (err) {
      console.log(err)
    }
  }

  async function handleUpdateEmail(newEmail: string) {
    try {
      const user = auth.currentUser

      const credentials = EmailAuthProvider.credential(
        String(user!.email),
        oldPassword,
      )
      await reauthenticateWithCredential(user!, credentials)

      await updateEmail(user!, newEmail)

      setNewEmail(newEmail)
    } catch (err) {
      console.log(err)
    }
  }

  async function handleChangePassword() {
    const user = auth.currentUser
    if (user) {
      if (newEmail !== oldEmail) {
        await handleUpdateEmail(newEmail)
      }

      const credential = EmailAuthProvider.credential(oldEmail!, oldPassword!)

      reauthenticateWithCredential(user!, credential)
        .then(() => {
          return updatePassword(user!, newPassword)
        })
        .then(() => {
          alert('Senha alterado')
          router.push('/signIn')
          removeCookie()
        })
        .catch((error) => {
          if ((error as AuthError)?.code === 'auth/wrong-password') {
            alert('Senha antiga não confere.')
          }
        })
    } else {
      console.error('O usuário não está autenticado')
    }
  }

  return (
    <div>
      <form onSubmit={handleUpdateProfileForm}>
        <fieldset className="flex gap-4 items-center">
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
                className="object-fill rounded-full"
                src={URL.createObjectURL(file)}
                alt=""
              />
            </div>
          ) : (
            <div className="w-25 h-25">
              <img className="object-fill rounded-full" src={photoURL} alt="" />
            </div>
          )}
        </fieldset>

        <fieldset className="flex gap-4 items-center">
          <label className="w-[90px]" htmlFor="name">
            Nome
          </label>
          <input
            type="text"
            className="h-[3rem] w-full flex-1 items-center justify-center rounded-lg px-4 leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            id="name"
            defaultValue={displayName!}
            placeholder="seu nome"
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </fieldset>

        <fieldset className="flex gap-4 items-center">
          <label className="w-[90px]" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            className="h-[3rem] w-full flex-1 items-center justify-center rounded-lg px-4 leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            id="email"
            defaultValue={oldEmail!}
            placeholder="seuemail@gmail.com"
            // defaultValue="PedroDuarte@gmail.com"
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </fieldset>

        <Button title="atulizar perfil" type="submit" />
      </form>
      {/* outro form */}
      <fieldset className="flex gap-4 items-center">
        <label className="w-[90px]" htmlFor="oldPassword">
          Senha Antiga
        </label>
        <input
          type="password"
          className="h-[3rem] w-full flex-1 items-center justify-center rounded-lg px-4 leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
          id="oldPassword"
          placeholder="******"
          // defaultValue="PedroDuarte@gmail.com"
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </fieldset>

      <fieldset className="flex gap-4 items-center">
        <label className="w-[90px]" htmlFor="password">
          Senha
        </label>
        <input
          type="password"
          className="h-[3rem] w-full flex-1 items-center justify-center rounded-lg px-4 leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
          id="password"
          placeholder="******"
          // defaultValue="PedroDuarte@gmail.com"
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </fieldset>

      <Button
        onClick={handleChangePassword}
        title="Atualizar senha"
        type="button"
      />
    </div>
  )
}
