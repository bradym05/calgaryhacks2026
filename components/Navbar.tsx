import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
      <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition">
        <div className="w-8 h-8 bg-gradient-to-r from-[#8aa66e] to-[#a8c686] rounded-lg"></div>
        <span className="text-xl font-bold bg-gradient-to-r from-[#6b8e23] to-[#8aa66e] bg-clip-text text-transparent">
          LifeMap
        </span>
      </Link>
      <div className="flex items-center space-x-4">
        <Link
          href="/login"
          className="text-gray-700 hover:text-gray-900 px-4 py-2 transition"
        >
          Log in
        </Link>
        <Link
          href="/register"
          className="bg-gradient-to-r from-[#8aa66e] to-[#a8c686] text-white px-5 py-2 rounded-lg hover:opacity-90 transition shadow-md hover:shadow-lg"
        >
          Sign up free
        </Link>
      </div>
    </nav>
  );
}
