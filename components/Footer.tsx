import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#d4e4c8] bg-[#f8f4ed]/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-gradient-to-r from-[#8aa66e] to-[#a8c686] rounded"></div>
            <span className="font-semibold text-gray-800">LifeMap</span>
          </div>
          <div className="flex space-x-6 text-sm text-gray-600 ">
            <Link href="/about" className="hover:text-gray-900 transition">
              About
            </Link>
            <Link href="/privacy" className="hover:text-gray-900 transition">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-gray-900 transition">
              Terms
            </Link>
            <Link href="/contract" className="hover:text-gray-900 transition">
              Contract
            </Link>
            
          </div>

        </div>
      </div>
    </footer>
  );
}
