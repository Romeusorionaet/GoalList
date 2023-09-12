'use client'

import React, { useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { FormProfile } from './components/FormProfile'
import { FormPassword } from './components/FormPassword'
import { Key } from 'phosphor-react'

export default function Profile() {
  const [isPasswordFormHidden, setIsPasswordFormHidden] = useState(true)
  const controls = useAnimation()
  const rotationClass = isPasswordFormHidden
    ? 'rotate-180 duration-700'
    : 'duration-700'

  const toggleFormVisibility = () => {
    controls.start({ opacity: 0, scale: 1 })
    setTimeout(() => {
      setIsPasswordFormHidden((prev) => !prev)
      controls.start({ opacity: 1, scale: 1 })
    }, 300)
  }

  return (
    <div className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] space-y-8 rounded-xl bg-white p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
      <button className="absolute right-6 top-6" onClick={toggleFormVisibility}>
        <Key className={`h-6 w-6 ${rotationClass}`} />
      </button>

      <motion.div
        initial={{ opacity: 1, scale: 1, height: 'auto' }}
        animate={controls}
        transition={{ duration: 0.6 }}
        style={{ overflow: 'hidden' }}
      >
        {isPasswordFormHidden ? <FormProfile /> : <FormPassword />}
      </motion.div>
    </div>
  )
}
