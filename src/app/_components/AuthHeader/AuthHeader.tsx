export default function AuthHeader() {
  return (
    <header className="absolute top-0 left-0 w-full px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="md:text-4xl text-3xl font-extrabold text-[#111E2D]">
            Social <span className="text-blue-600">Hub</span>
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Connect. Share. Discover.
          </p>
        </div>
      </div>
    </header>
  );
}