export default function Calendars() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Create New Calendar</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200">Calendar Name</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-800 dark:text-white"
            placeholder="Enter calendar name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200">Calendar Color</label>
          <input
            type="color"
            className="mt-1 block w-16 h-10 p-1 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800 text-white rounded-md hover:from-purple-700 hover:via-pink-700 hover:to-purple-900"
        >
          Create Calendar
        </button>
      </form>
    </div>
  )
}
