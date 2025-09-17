'use client'

import {useRef} from 'react'
import Link from 'next/link'
import {useRouter, usePathname} from 'next/navigation'
import {useStore} from '@/libs/store'

export default function TransitionLink({children, href, className, refProp, onClickEvent}) {
  const defaultRef = useRef()
  const {isTransitionActive, setIsTransitionActive} = useStore()
  const router = useRouter()
  const pathname = usePathname()

  return (
    <Link
      ref={refProp ?? defaultRef}
      onClick={(e) => {
        e.preventDefault()
        if (pathname === href) return
        if (isTransitionActive) return
        setIsTransitionActive(true)
        onClickEvent && onClickEvent()
        setTimeout(() => {
          router.push(href)
        }, 400)
      }}
      href={href}
      className={className}
    >
      {children}
    </Link>
  )
}