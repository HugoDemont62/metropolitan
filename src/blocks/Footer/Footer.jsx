import TransitionLink from '@/Animation/TransitionLink';

export default function Footer() {
  return (
    <footer className="w-full py-4 px-6 flex items-center justify-between">
      {/* Logo */}
      <TransitionLink href="/" className="font-serif leading-none">
        <h1 className="text-2xl tracking-wider mb-[-10px]">OPHELIA</h1>
        <h2 className="text-xl tracking-wide"><i>Museum</i></h2>
      </TransitionLink>
    </footer>
  );
}