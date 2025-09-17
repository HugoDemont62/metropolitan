'use client'

import { useTransitionRouter } from 'next-view-transitions'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function TransitionLink({ children, href, className }) {
  const router = useTransitionRouter()
  const pathname = usePathname()

  function _triggerPageTransition() {
    document.documentElement.animate(
      [
        {
          clipPath: 'polygon(25% 75%, 75% 75%, 75% 75%, 25% 75%)',
        },
        {
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
        },
      ],
      {
        duration: 2000,
        easing: 'cubic-bezier(0.9, 0, 0.1, 1)',
        pseudoElement: '::view-transition-new(root)',
      }
    )
  }

  const _handleNavigation = (path) => (e) => {
    if (path === pathname) {
      e.preventDefault()
      return
    }

    router.push(path, {
      onTransitionReady: _triggerPageTransition,
    })
  }

  return (
    <Link onClick={_handleNavigation(href)} href={href}>
      {children}
    </Link>
  )
}
