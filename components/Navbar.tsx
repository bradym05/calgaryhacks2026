import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
      <Link href="/" className="flex items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="36"
          height="36"
          fill="#6b8e23"
        >
          <path d="M11.774 2a10 10 0 1 1-10 10a10 10 0 0 1 10-10m5.5 5.98l-1.112 1.732a4.9 4.9 0 0 1 .535 2.246a4.96 4.96 0 0 1-4.956 4.964h-.009a4.8 4.8 0 0 1-2.232-.535L7.754 17.51a6.826 6.826 0 0 0 9.652-9.34Zm-5.542-2.855a6.833 6.833 0 0 0-6.832 6.82v.013a6.77 6.77 0 0 0 1.332 4.052A8 8 0 0 1 7.4 14.4a10 10 0 0 1 1.187-1.06a8.17 8.17 0 0 1 4.833-1.575a8 8 0 0 1 1.458.132l.284.058a3.428 3.428 0 1 0-6.855-.151v.151a2 2 0 0 0 .015.312l.018.155a8.2 8.2 0 0 0-1.292 1.2a5 5 0 0 1-.283-1.649A4.96 4.96 0 0 1 11.714 7h.008a4.8 4.8 0 0 1 2.235.537l1.732-1.124a6.67 6.67 0 0 0-3.957-1.288m1.722 7.263a7.8 7.8 0 0 0-4.567 1.47a3.43 3.43 0 0 0 6.213-1.291a7.7 7.7 0 0 0-1.646-.179" />
        </svg>
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
