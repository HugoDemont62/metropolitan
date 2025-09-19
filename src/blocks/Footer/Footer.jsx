import TransitionLink from '@/Animation/TransitionLink';
import {Github, Instagram, Mail} from 'lucide-react';
import Logo from '@/components/Logo/Logo';

export default function Footer({backgroundColor = '#fff', textColor = '#222'}) {
  return (
    <footer
      className="border-t border-gray-200 py-8"
      style={{background: backgroundColor, color: textColor}}
    >
      <div className="mx-auto px-6 flex  items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <Logo />
          <span className="text-gray-400 text-sm w-full" style={{color: textColor}}>
            © {new Date().getFullYear()} Musée Virtuel
          </span>
        </div>
        <div className="flex flex-col items-start gap-2 text-sm" style={{color: textColor}}>
          <span className="font-semibold mb-1" style={{color: textColor}}>Plan du site</span>
          <TransitionLink href="/" className="hover:underline">Accueil</TransitionLink>
          <TransitionLink href="/paints" className="hover:underline">Peintures</TransitionLink>
          <TransitionLink href="/#about" className="hover:underline">À propos</TransitionLink>
          <TransitionLink href="/contact" className="hover:underline">Contact</TransitionLink>
        </div>
        <nav className="flex items-center gap-6">
          <a href="mailto:contact@ophelia.com"
             className="hover:text-gray-700"
             aria-label="Email"
             style={{color: textColor}}
          >
            <Mail className="h-5 w-5"/>
          </a>
          <a href="https://github.com/HugoDemont62" target="_blank"
             rel="noopener noreferrer"
             className="hover:text-gray-700"
             aria-label="GitHub"
             style={{color: textColor}}
          >
            <Github className="h-5 w-5"/>
          </a>
          <a href="https://instagram.com" target="_blank"
             rel="noopener noreferrer"
             className="hover:text-gray-700"
             aria-label="Instagram"
             style={{color: textColor}}
          >
            <Instagram className="h-5 w-5"/>
          </a>
        </nav>

      </div>
    </footer>
  );
}