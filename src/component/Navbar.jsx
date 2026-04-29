
export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 h-16 border-b border-gray-200" style={{ backgroundColor: 'var(--color-white)', fontFamily: 'var(--font-body)' }}>

      {/* Logo with image + text */}
      <a href="#" className="flex items-center gap-2">
        <img
          src="/logo.png"
          alt="Lumina logo"
          className="h-8 w-auto"
        />
        <span className="text-xl font-semibold text-gray-900">MCALDF</span>
      </a>

      {/* Links */}
      <ul className="flex gap-8 list-none">
        <li><a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Home</a></li>
        <li><a href="#" className="text-gray-600 hover:text-gray-900 font-medium">About</a></li>
        <li><a href="#" className="text-gray-600 hover:text-gray-900 font-medium">News</a></li>
        <li><a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Contact</a></li>
      </ul>

      {/* Button */}
      <button className="bg-gray-900 text-white text-sm font-medium px-5 py-2 rounded-lg hover:opacity-80">
        Login
      </button>

    </nav>
  )
}