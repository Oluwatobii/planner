import { CalenderWrapper, CreateEvent } from './_components'

const calenders = [
  {
    name: 'My Calender',
    color: '#20a793'
  },
  {
    name: 'Company',
    color: '#28a720'
  },
  {
    name: 'Family',
    color: '#3f20a7'
  },
  {
    name: 'Birthdays',
    color: '#a720a7'
  },
  {
    name: 'National Holidays',
    color: '#206aa7'
  }
]
export default function HomePage() {
  return (
    <div className="flex h-[calc(100vh-55px)] w-screen">
      <div className="hidden md:flex w-1/5 bg-gray-100 dark:bg-gray-800 p-4 flex-col justify-between">
        <div>
          <CreateEvent />

          <hr className="my-4 border-gray-300 dark:border-gray-600" />
          <div className="flex items-center mb-4">
            <input type="checkbox" id="view-all" className="mr-2" />
            <label htmlFor="view-all" className="text-gray-700 dark:text-gray-300">
              View All
            </label>
          </div>
          <hr className="my-4 border-gray-300 dark:border-gray-600" />

          <ul className="space-y-2">
            {calenders.map(({ name, color }) => (
              <li key={name} className="flex items-center">
                <span className="w-3 h-3 rounded-full inline-block mr-2" style={{ backgroundColor: color }}></span>
                <span className="text-gray-700 dark:text-gray-300">{name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-center text-gray-500 dark:text-gray-400 text-sm mt-6">
          <p>Planner © </p>
          <a href="https://tbello.dev" target="_blank" rel="noopener">
            Powered by Otbi Development
          </a>
        </div>
      </div>

      <div className="w-full md:w-4/5 bg-white dark:bg-gray-900 p-3 h-full">
        <h2 className="text-l md:text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200 text-center">
          Welcome! Let&apos;s Plan Your Day, Your Way.
        </h2>
        <div className="block md:hidden">
          <CreateEvent />
          <hr className="my-4" />
        </div>
        <CalenderWrapper />
      </div>
    </div>
  )
}
