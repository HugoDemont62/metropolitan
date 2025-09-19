
'use client'

import {useRef} from 'react'
import Link from 'next/link'
import {useRouter, usePathname} from 'next/navigation'
import {useStore} from '@/libs/store'

export default function TransitionLink({children, href, className, refProp, onClickEvent}) {
  const defaultRef = useRef()
  const {isTransitionActive, setIsTransitionActive, setPageToGoTo} = useStore()
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = (e) => {
    e.preventDefault()

    // Vérifications de base
    if (pathname === href) return
    if (isTransitionActive) return

    // Exécuter l'événement personnalisé si fourni
    onClickEvent && onClickEvent()

    // Stocker la page de destination et démarrer la transition
    setPageToGoTo(href)
    setIsTransitionActive(true)
  }

  return (
    <Link
      ref={refProp ?? defaultRef}
      onClick={handleClick}
      href={href}
      className={className}
    >
      {children}
    </Link>
  )
}