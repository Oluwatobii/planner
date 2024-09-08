'use client'

import { signIn } from 'next-auth/react'

import { FaGithub, FaGoogle } from 'react-icons/fa'
/*
import { MdEmail } from 'react-icons/md'
*/
export default function Authentication() {
  return (
    <>
      <button
        className="w-3/4 md:w-2/3 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 md:px-5 px-3 rounded flex items-center justify-center whitespace-nowrap"
        onClick={() => signIn('google', { callbackUrl: '/home' })}
      >
        <FaGoogle className="hidden md:inline-block mr-2 flex-shrink-0" /> Sign in with Google
      </button>
      <button
        className="w-3/4 md:w-2/3 bg-gray-800 hover:bg-gray-900 text-white text-sm font-semibold py-2 md:px-5 px-3 rounded flex items-center justify-center whitespace-nowrap"
        onClick={() => signIn('github', { callbackUrl: '/home' })}
      >
        <FaGithub className="hidden md:inline-block mr-2 flex-shrink-0" /> Sign in with GitHub
      </button>
      {/* <button className="w-3/4 md:w-2/3 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 md:px-5 px-3 rounded flex items-center justify-center whitespace-nowrap">
        <MdEmail className="hidden md:inline-block mr-2 flex-shrink-0" /> Sign in with Email
      </button> */}
    </>
  )
}
