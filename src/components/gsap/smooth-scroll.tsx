"use client"

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface SmoothScrollProps {
  children: React.ReactNode
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let current = 0
    let target = 0
    let ease = 0.075

    // Get scroll height
    const getScrollHeight = () => {
      return scrollerRef.current ? scrollerRef.current.scrollHeight - window.innerHeight : 0
    }

    // Smooth scroll function
    const smoothScroll = () => {
      target = window.scrollY
      current += (target - current) * ease
      
      if (scrollerRef.current) {
        gsap.set(scrollerRef.current, {
          y: -current
        })
      }
      
      requestAnimationFrame(smoothScroll)
    }

    // Initialize smooth scroll
    smoothScroll()

    // Set body height for scrollbar
    const setBodyHeight = () => {
      document.body.style.height = `${getScrollHeight() + window.innerHeight}px`
    }

    setBodyHeight()

    // Update height on resize
    const handleResize = () => {
      setBodyHeight()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      document.body.style.height = 'auto'
    }
  }, [])

  return (
    <div 
      ref={scrollerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  )
}