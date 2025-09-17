'use client'

import gsap from 'gsap'
import {usePathname} from 'next/navigation'
import {useRef} from 'react'
import {useGSAP} from '@gsap/react'
import ScrollTrigger from 'gsap/ScrollTrigger'
import {useRouter} from 'next/navigation'

import {useStore} from '@/libs/store'

export default function Transition({children}) {
  const transitionRef = useRef()
  const pathname = usePathname()
  const router = useRouter()
  const {isTransitionActive, setIsTransitionActive, isFirstLoad, setIsFirstLoad, pageToGoTo, setPageToGoTo} = useStore()

  const _show = () => {
    gsap.set(transitionRef.current, {
      clipPath: 'inset(100% 0% 0% 0%)'
    })

    gsap.to(transitionRef.current, {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1,
      ease: 'hop',
      onComplete: () => {
        if (pageToGoTo && !isFirstLoad) {
          router.push(pageToGoTo)
        }
      }
    })
  }

  const _hide = () => {
    gsap.set(transitionRef.current, {
      clipPath: 'inset(0% 0% 0% 0%)',
    })

    gsap.to(transitionRef.current, {
      clipPath: 'inset(0% 0% 100% 0%)',
      duration: 1,
      delay: 0.2,
      ease: 'hop',
      onComplete: () => {
        setIsFirstLoad(false)
        setIsTransitionActive(false)
      }
    })
  }

  useGSAP(() => {
    ScrollTrigger.refresh()
    _hide()
  }, [pathname])

  useGSAP(() => {
    if (isTransitionActive) {
      _show()
    }
  }, [isTransitionActive])

  return (
    <>
      <main>{children}</main>
      <div ref={transitionRef} className="w-screen h-screen bg-black fixed top-0 left-0" />
    </>
  )
}
