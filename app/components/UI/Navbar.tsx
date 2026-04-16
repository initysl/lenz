import Link from 'next/link';

interface NavbarProps {
  onLaunchCamera: () => void;
}

export default function Navbar({ onLaunchCamera }: NavbarProps) {
  return (
    <nav className='fixed top-0 left-0 right-0 z-50 flex justify-center p-6'>
      <div className='w-full max-w-7xl flex items-center justify-between bg-black/20 backdrop-blur-md px-8 py-4 rounded-full border border-white/5'>
        {/* Logo */}
        <div className='text-2xl font-black tracking-tighter'>
          Lenz<span className='text-cyan-400'>.</span>
        </div>

        {/* Navigation Links */}
        <ul className='hidden md:flex items-center gap-10 text-sm font-medium text-zinc-400'>
          <li>
            <Link
              href='/'
              className='text-white hover:text-cyan-400 transition'
            >
              Home
            </Link>
          </li>
          <li>
            <Link href='#features' className='hover:text-white transition'>
              Features
            </Link>
          </li>
          <li>
            <Link href='#how-it-works' className='hover:text-white transition'>
              How It Works
            </Link>
          </li>
          <li>
            <button
              onClick={onLaunchCamera}
              className='hover:text-white transition'
            >
              Try Now
            </button>
          </li>
        </ul>

        {/* CTA Button */}
        <button
          onClick={onLaunchCamera}
          className='hidden md:block px-6 py-2 bg-linear-to-r from-cyan-500 to-blue-600 rounded-full font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all'
        >
          Launch Camera
        </button>

        {/* Mobile Menu Icon */}
        <div className='md:hidden text-white'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16m-7 6h7'
            />
          </svg>
        </div>
      </div>
    </nav>
  );
}
