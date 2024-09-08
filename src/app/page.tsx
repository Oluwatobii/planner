import Image from 'next/image'

import { Authentication } from '@/components'

export default async function LandingPage() {
  return (
    <div
      className="w-screen h-screen flex items-center justify-center rounded-lg"
      style={{ background: 'linear-gradient(to top right, #ec4899, #8b5cf6 60%)' }}
    >
      <div
        className="relative bg-opacity-10 p-6 md:p-12 rounded-lg shadow-3xl w-full md:w-11/12 h-full md:h-2/3 flex flex-col items-center justify-center"
        style={{ background: 'linear-gradient(to top right, #db2777, #6d28d9 60%)' }}
      >
        <div className="absolute top-7 md:top-10 transform -translate-y-1/2">
          <Image
            src="/planner.png"
            alt="Logo"
            width={80}
            height={80}
            className="mx-auto filter invert"
            style={{ filter: 'invert(100%) brightness(2)' }}
          />
        </div>

        <div className="relative z-10 text-center text-white">
          <h1 className="text-1xl md:text-5xl font-bold tracking-wider">PLAN YOUR DAY, OWN YOUR TIME.</h1>

          <div className="mt-[70px] space-y-3 md:space-y-4 flex flex-col items-center w-full md:max-w-md lg:max-w-lg mx-auto">
            <Authentication />
          </div>

          <div className="mt-6 animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 md:w-6 md:h-6 mx-auto"
              style={{ transform: 'rotate(180deg)' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <p className="mt-4 text-[9px] md:text-xs uppercase tracking-wider">Sign up or log in to explore the app</p>
        </div>

        <div className="absolute top-5 md:top-10 right-5 md:right-10">
          <p className="text-white uppercase text-xs font-semibold tracking-wider">Planner</p>
        </div>

        <div className="absolute bottom-0 right-0"></div>
      </div>
    </div>
  )
}
