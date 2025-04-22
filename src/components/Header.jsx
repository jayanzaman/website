// src/components/Header.tsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-xl font-bold">
            Jayan Zaman
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-500 hover:text-gray-900">Home</Link>
            <Link href="/latest-thinking" className="text-gray-500 hover:text-gray-900">Latest Thinking</Link>
            <Link href="/about" className="text-gray-500 hover:text-gray-900">About</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
