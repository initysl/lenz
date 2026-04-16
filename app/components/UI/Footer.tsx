import Link from 'next/link';
import { BsGithub, BsTwitterX } from 'react-icons/bs';

export default function Footer() {
  const socials = [
    {
      name: 'X (Twitter)',
      icon: <BsTwitterX />,
      href: 'https://x.com/your-handle',
    },
    {
      name: 'GitHub',
      icon: <BsGithub />,
      href: 'https://github.com/your-repo',
    },
  ];

  return (
    <footer className='py-16 border-t border-white/10'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-12 mb-12'>
        {/* Brand */}
        <div>
          <div className='text-3xl font-black mb-4'>
            Lenz<span className='text-cyan-400'>.</span>
          </div>
          <p className='text-zinc-400 text-sm'>
            Discover the world around you!
          </p>
        </div>

        {/* Company */}
        <div>
          <h4 className='font-bold mb-4'>Company</h4>
          <ul className='space-y-2 text-sm text-zinc-400'>
            <li>
              <Link href='#' className='hover:text-white transition'>
                About
              </Link>
            </li>

            <li>
              <Link href='#' className='hover:text-white transition'>
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className='font-bold mb-4'>Legal</h4>
          <ul className='space-y-2 text-sm text-zinc-400'>
            <li>
              <Link href='#' className='hover:text-white transition'>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href='#' className='hover:text-white transition'>
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10'>
        <p className='text-zinc-500 text-sm mb-4 md:mb-0'>
          &copy; {new Date().getFullYear()} Lenz. All rights reserved.
        </p>

        {/* Social Links */}
        <div className='flex items-center gap-5'>
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={social.name}
              className='group relative p-3 bg-zinc-900/50 rounded-xl border border-white/5 text-zinc-400 transition-all duration-300 hover:text-white hover:bg-zinc-800 hover:-translate-y-1'
            >
              {/* Subtle Glow Background on Hover */}
              <div className='absolute inset-0 rounded-xl bg-cyan-400/0 blur-md transition-all duration-300 group-hover:bg-cyan-400/10' />

              <span className='relative z-10 text-xl'>{social.icon}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
