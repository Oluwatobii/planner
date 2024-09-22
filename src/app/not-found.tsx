import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-purple-800 text-white dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-black">
      <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold mb-4 animate-pulse">404</h1>
      <h2 className="text-xl sm:text-2xl md:text-4xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-sm sm:text-base md:text-lg text-gray-200 dark:text-gray-400 mb-6 px-4 sm:px-0 text-center">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/home"
        className="bg-white text-purple-800 hover:bg-gray-100 font-semibold px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
      >
        Go back home
      </Link>
    </div>
  )
}
