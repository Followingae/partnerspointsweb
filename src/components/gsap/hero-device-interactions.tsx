"use client"

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Star, CheckCircle, Users, Award } from 'lucide-react'

interface HeroDeviceInteractionsProps {
  mobileRef: React.RefObject<HTMLDivElement | null>
  terminalRef: React.RefObject<HTMLDivElement | null>
}

export function HeroDeviceInteractions({ mobileRef, terminalRef }: HeroDeviceInteractionsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<SVGPathElement[]>([])
  const popupsRef = useRef<HTMLDivElement[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [positions, setPositions] = useState({ 
    mobileX: 0, mobileY: 0, terminalX: 0, terminalY: 0,
    mobileLeft: 0, mobileRight: 0, mobileTop: 0, mobileBottom: 0,
    terminalLeft: 0, terminalRight: 0, terminalTop: 0, terminalBottom: 0,
    terminalConnectionX: 0, terminalConnectionY: 0,
    mobileConnectionX: 0, mobileConnectionY: 0
  })

  const updatePositions = () => {
    if (!containerRef.current || !mobileRef.current || !terminalRef.current) return

    const container = containerRef.current
    const mobile = mobileRef.current
    const terminal = terminalRef.current

    // Check if we're on mobile/small screen
    const isMobileScreen = window.innerWidth < 1024
    setIsMobile(isMobileScreen)
    setIsClient(true)

    // Get actual device positions
    const mobileRect = mobile.getBoundingClientRect()
    const terminalRect = terminal.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()

    // Calculate device edges and connection points
    const mobileLeft = mobileRect.left - containerRect.left
    const mobileRight = mobileLeft + mobileRect.width
    const mobileTop = mobileRect.top - containerRect.top
    const mobileBottom = mobileTop + mobileRect.height
    const mobileX = mobileLeft + mobileRect.width / 2
    const mobileY = mobileTop + mobileRect.height / 2

    const terminalLeft = terminalRect.left - containerRect.left
    const terminalRight = terminalLeft + terminalRect.width
    const terminalTop = terminalRect.top - containerRect.top
    const terminalBottom = terminalTop + terminalRect.height
    const terminalX = terminalLeft + terminalRect.width / 2
    const terminalY = terminalTop + terminalRect.height / 2

    // Adjust connection points based on screen size
    const connectionOffset = isMobileScreen ? 10 : 20
    const terminalConnectionX = terminalRight + connectionOffset
    const terminalConnectionY = terminalTop + connectionOffset
    
    const mobileConnectionX = mobileLeft - connectionOffset
    const mobileConnectionY = mobileBottom - connectionOffset
    
    // Update positions state with device boundaries
    setPositions({ 
      mobileX, mobileY, terminalX, terminalY,
      mobileLeft, mobileRight, mobileTop, mobileBottom,
      terminalLeft, terminalRight, terminalTop, terminalBottom,
      terminalConnectionX, terminalConnectionY,
      mobileConnectionX, mobileConnectionY
    })
  }

  useEffect(() => {
    updatePositions()
    
    // Add resize listener
    const handleResize = () => {
      updatePositions()
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (!containerRef.current || !mobileRef.current || !terminalRef.current) return
    if (positions.mobileX === 0) return // Wait for positions to be calculated

    const container = containerRef.current

    // Store cleanup functions
    let magneticCleanup = () => {}

    // Wait for elements to be fully rendered
    const checkElementsExist = () => {
      const terminalElement = document.querySelector('.terminal-device')
      const mobileElement = document.querySelector('.mobile-device')
      return terminalElement && mobileElement
    }

    // Use a small delay to ensure elements are rendered
    const initializeAnimations = () => {
      if (!checkElementsExist()) {
        setTimeout(initializeAnimations, 100)
        return
      }

      let ctx = gsap.context(() => {
        // Progressive Blue Line Activation Animation
        const masterTL = gsap.timeline({ repeat: -1, repeatDelay: 2 })

        // Setup all elements with 3D transforms - now that we know they exist
        gsap.set('.terminal-device', { scale: 1, transformOrigin: "center center", transformStyle: "preserve-3d" })
        gsap.set('.mobile-device', { scale: 1, transformOrigin: "center center", transformStyle: "preserve-3d" })
        gsap.set('.terminal-glow', { opacity: 0, scale: 1.2 })
        gsap.set('.mobile-glow', { opacity: 0, scale: 1.2 })

        // Global Mouse Tracking for 3D Device Effects
        let globalMouseCleanup = () => {}
        
        const setupGlobalMouseTracking = () => {
          const terminalElement = document.querySelector('.terminal-device')
          const mobileElement = document.querySelector('.mobile-device')
          
          if (!terminalElement || !mobileElement) return

          const handleGlobalMouseMove = (e) => {
            // Terminal device rotation - follows mouse (attracts to cursor)
            const terminalRect = terminalElement.getBoundingClientRect()
            const terminalCenterX = terminalRect.left + terminalRect.width / 2
            const terminalCenterY = terminalRect.top + terminalRect.height / 2
            
            const terminalDeltaX = (e.clientX - terminalCenterX) / (window.innerWidth / 2)
            const terminalDeltaY = (e.clientY - terminalCenterY) / (window.innerHeight / 2)
            
            // Calculate distance for scaling effect
            const terminalDistance = Math.sqrt(terminalDeltaX * terminalDeltaX + terminalDeltaY * terminalDeltaY)
            const terminalScale = 1 + (1 - Math.min(terminalDistance, 1)) * 0.05 // Scales up when cursor is closer (max +5%)
            
            gsap.to(terminalElement, {
              rotationY: terminalDeltaX * 6, // Reduced rotation - more subtle
              rotationX: -terminalDeltaY * 4,
              scale: terminalScale, // Slight scale based on proximity
              duration: 0.6,
              ease: "power2.out"
            })

            // Mobile device rotation - opposite reaction (repels from cursor)
            const mobileRect = mobileElement.getBoundingClientRect()
            const mobileCenterX = mobileRect.left + mobileRect.width / 2
            const mobileCenterY = mobileRect.top + mobileRect.height / 2
            
            const mobileDeltaX = (e.clientX - mobileCenterX) / (window.innerWidth / 2)
            const mobileDeltaY = (e.clientY - mobileCenterY) / (window.innerHeight / 2)
            
            // Calculate distance for opposite scaling effect
            const mobileDistance = Math.sqrt(mobileDeltaX * mobileDeltaX + mobileDeltaY * mobileDeltaY)
            const mobileScale = 1 - (1 - Math.min(mobileDistance, 1)) * 0.03 // Scales down when cursor is closer (max -3%)
            
            gsap.to(mobileElement, {
              rotationY: -mobileDeltaX * 5, // Reduced opposite rotation - more subtle
              rotationX: mobileDeltaY * 3,   // Reduced opposite rotation - more subtle
              scale: mobileScale, // Slight scale reduction based on proximity
              duration: 0.8,
              ease: "power2.out"
            })
          }

          // Add global mouse listener to document
          document.addEventListener('mousemove', handleGlobalMouseMove)
          
          globalMouseCleanup = () => {
            document.removeEventListener('mousemove', handleGlobalMouseMove)
          }
        }

        setupGlobalMouseTracking()
        
        // Store cleanup functions
        magneticCleanup = () => {
          globalMouseCleanup?.()
        }
        
        // Blue lines start invisible, will animate over gray base
        gsap.set('.bottom-line', { 
          strokeDasharray: 2000,
          strokeDashoffset: -2000, // Negative for Mobile → Terminal direction
          opacity: 1 
        })
        gsap.set('.top-line', { 
          strokeDasharray: 2000,
          strokeDashoffset: -2000, // Negative for Terminal → Mobile direction
          opacity: 1 
        })
        
        // Hide checkpoint popups initially, show others
        gsap.set('[data-checkpoint="transaction"]', { scale: 0, opacity: 0 })
        gsap.set('[data-checkpoint="customer"]', { scale: 0, opacity: 0 })
        gsap.set('[data-checkpoint="points"]', { scale: 0, opacity: 0 })
        gsap.set('.data-popup:not([data-checkpoint])', { scale: 1, opacity: 1 })

        // 1. Bottom line flows: Mobile → Terminal
        masterTL.to('.bottom-line', {
          strokeDashoffset: 0,
          duration: 3,
          ease: "power1.inOut"
        })

        // 2. "Transaction Done" appears when bottom line reaches terminal
        .to('[data-checkpoint="transaction"]', {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)"
        }, "-=0.8") // Appear earlier when line reaches terminal

        // 3. Top line flows: Terminal → Mobile (after slight pause)
        .to('.top-line', {
          strokeDashoffset: 0,
          duration: 3,
          ease: "power1.inOut"
        }, "+=0.5")

        // 4. "Customer Recognized" appears when top line reaches terminal area
        .to('[data-checkpoint="customer"]', {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)"
        }, "-=1.2") // Appear later in top line animation

        // 5. "250 Points" appears when top line reaches mobile area
        .to('[data-checkpoint="points"]', {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)"
        }, "-=0.3") // Appear very close to end of top line animation

        // 4. Reset lines to gray and animate checkpoints back simultaneously
        .to('.data-line', {
          stroke: '#F3F4F6', // Back to very light gray
          strokeDasharray: 'none',
          strokeDashoffset: 0,
          duration: 0.4,
          ease: "power2.in"
        }, "+=0.5")
        .to('[data-checkpoint]', {
          opacity: 0,
          scale: 0.8,
          duration: 0.4,
          ease: "power2.in",
          stagger: 0.05
        }, "<") // Start at the same time as the line reset

      }, container)

      return () => {
        magneticCleanup()
        ctx.revert()
      }
    }

    initializeAnimations()

    return () => {
      magneticCleanup()
    }
  }, [positions])


  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 50 }}>
      
      {/* Device Glow Effects */}
      <div 
        className="terminal-glow absolute rounded-full bg-gradient-to-r from-green-400/20 to-blue-400/20 blur-xl"
        style={{
          left: `${positions.terminalLeft - 50}px`,
          top: `${positions.terminalTop - 50}px`,
          width: `${positions.terminalRight - positions.terminalLeft + 100}px`,
          height: `${positions.terminalBottom - positions.terminalTop + 100}px`,
          zIndex: 49
        }}
      />
      
      <div 
        className="mobile-glow absolute rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur-xl"
        style={{
          left: `${positions.mobileLeft - 50}px`,
          top: `${positions.mobileTop - 50}px`,
          width: `${positions.mobileRight - positions.mobileLeft + 100}px`,
          height: `${positions.mobileBottom - positions.mobileTop + 100}px`,
          zIndex: 49
        }}
      />

      {/* Your Custom Pink Path */}
      {isClient && (
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 51 }}>
          <defs>
            <linearGradient id="customGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#6EE7F9" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          
          {/* Base Layer - Always visible light gray lines */}
          <path
            className="base-line"
            d={isMobile ? 
            `M ${positions.mobileLeft + (positions.mobileRight - positions.mobileLeft) / 2} ${positions.mobileTop - 8}
              L ${positions.mobileLeft + (positions.mobileRight - positions.mobileLeft) / 2} ${positions.mobileTop - 25}
              Q ${positions.mobileLeft + (positions.mobileRight - positions.mobileLeft) / 2} ${positions.mobileTop - 35} ${positions.mobileLeft + (positions.mobileRight - positions.mobileLeft) / 2 - 10} ${positions.mobileTop - 35}
              L ${positions.terminalLeft + (positions.terminalRight - positions.terminalLeft) / 2 + 10} ${positions.mobileTop - 35}
              Q ${positions.terminalLeft + (positions.terminalRight - positions.terminalLeft) / 2} ${positions.mobileTop - 35} ${positions.terminalLeft + (positions.terminalRight - positions.terminalLeft) / 2} ${positions.mobileTop - 25}
              L ${positions.terminalLeft + (positions.terminalRight - positions.terminalLeft) / 2} ${positions.terminalTop - 8}`
            :
            `M ${positions.mobileLeft + (positions.mobileRight - positions.mobileLeft) / 2} ${positions.mobileTop - 15}
              L ${positions.mobileLeft + (positions.mobileRight - positions.mobileLeft) / 2} ${positions.mobileTop - 50}
              Q ${positions.mobileLeft + (positions.mobileRight - positions.mobileLeft) / 2} ${positions.mobileTop - 70} ${positions.mobileLeft + (positions.mobileRight - positions.mobileLeft) / 2 - 20} ${positions.mobileTop - 70}
              L ${positions.terminalLeft + (positions.terminalRight - positions.terminalLeft) / 2 + 20} ${positions.mobileTop - 70}
              Q ${positions.terminalLeft + (positions.terminalRight - positions.terminalLeft) / 2} ${positions.mobileTop - 70} ${positions.terminalLeft + (positions.terminalRight - positions.terminalLeft) / 2} ${positions.mobileTop - 50}
              L ${positions.terminalLeft + (positions.terminalRight - positions.terminalLeft) / 2} ${positions.terminalTop - 15}`
          }
          stroke="#F3F4F6"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        <path
          className="base-line"
          d={isMobile ? 
            `M ${positions.terminalRight - 12} ${positions.terminalBottom - (positions.terminalBottom - positions.terminalTop) / 4}
              L ${positions.terminalRight + 25} ${positions.terminalBottom - (positions.terminalBottom - positions.terminalTop) / 4}
              Q ${positions.terminalRight + 35} ${positions.terminalBottom - (positions.terminalBottom - positions.terminalTop) / 4} ${positions.terminalRight + 35} ${positions.terminalBottom - (positions.terminalBottom - positions.terminalTop) / 4 - 10}
              L ${positions.terminalRight + 35} ${positions.mobileBottom + 35}
              Q ${positions.terminalRight + 35} ${positions.mobileBottom + 25} ${positions.terminalRight + 45} ${positions.mobileBottom + 25}
              L ${positions.mobileLeft + (positions.mobileRight - positions.mobileLeft) / 2 - 10} ${positions.mobileBottom + 25}
              Q ${positions.mobileLeft + (positions.mobileRight - positions.mobileLeft) / 2} ${positions.mobileBottom + 25} ${positions.mobileLeft + (positions.mobileRight - positions.mobileLeft) / 2} ${positions.mobileBottom + 15}
              L ${positions.mobileLeft + (positions.mobileRight - positions.mobileLeft) / 2} ${positions.mobileBottom + 8}`
            :
            `M ${positions.terminalRight + 40} ${positions.terminalBottom - (positions.terminalBottom - positions.terminalTop) / 4}
              L ${positions.terminalRight + 50} ${positions.terminalBottom - (positions.terminalBottom - positions.terminalTop) / 4}
              Q ${positions.terminalRight + 70} ${positions.terminalBottom - (positions.terminalBottom - positions.terminalTop) / 4} ${positions.terminalRight + 70} ${positions.terminalBottom - (positions.terminalBottom - positions.terminalTop) / 4 - 20}
              L ${positions.terminalRight + 70} ${positions.mobileBottom + 70}
              Q ${positions.terminalRight + 70} ${positions.mobileBottom + 50} ${positions.terminalRight + 90} ${positions.mobileBottom + 50}
              L ${positions.mobileLeft + (positions.mobileRight - positions.mobileLeft) / 2 - 20} ${positions.mobileBottom + 50}
              Q ${positions.mobileLeft + (positions.mobileRight - positions.mobileLeft) / 2} ${positions.mobileBottom + 50} ${positions.mobileLeft + (positions.mobileRight - positions.mobileLeft) / 2} ${positions.mobileBottom + 30}
              L ${positions.mobileLeft + (positions.mobileRight - positions.mobileLeft) / 2} ${positions.mobileBottom + 15}`
          }
          stroke="#F3F4F6"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Blue Animated Layer - Draws over light gray */}
        <path
          ref={el => { if (el) linesRef.current[0] = el }}
          className="data-line top-line"
          d={isMobile ? 
            `M ${positions.mobileLeft + (positions.mobileRight - positions.mobileLeft) / 2} ${positions.mobileTop - 8}
              L ${positions.mobileLeft + (positions.mobileRight - positions.mobileLeft) / 2} ${positions.mobileTop - 25}
              Q ${positions.mobileLeft + (positions.mobileRight - positions.mobileLeft) / 2} ${positions.mobileTop - 35} ${positions.mobileLeft + (positions.mobileRight - positions.mobileLeft) / 2 - 10} ${positions.mobileTop - 35}
              L ${positions.terminalLeft + (positions.terminalRight - positions.terminalLeft) / 2 + 10} ${positions.mobileTop - 35}
              Q ${positions.terminalLeft + (positions.terminalRight - positions.terminalLeft) / 2} ${positions.mobileTop - 35} ${positions.terminalLeft + (positions.terminalRight - positions.terminalLeft) / 2} ${positions.mobileTop - 25}
              L ${positions.terminalLeft + (positions.terminalRight - positions.terminalLeft) / 2} ${positions.terminalTop - 8}`
            :
            `M ${positions.mobileLeft + (positions.mobileRight - positions.mobileLeft) / 2} ${positions.mobileTop - 15}
              L ${positions.mobileLeft + (positions.mobileRight - positions.mobileLeft) / 2} ${positions.mobileTop - 50}
              Q ${positions.mobileLeft + (positions.mobileRight - positions.mobileLeft) / 2} ${positions.mobileTop - 70} ${positions.mobileLeft + (positions.mobileRight - positions.mobileLeft) / 2 - 20} ${positions.mobileTop - 70}
              L ${positions.terminalLeft + (positions.terminalRight - positions.terminalLeft) / 2 + 20} ${positions.mobileTop - 70}
              Q ${positions.terminalLeft + (positions.terminalRight - positions.terminalLeft) / 2} ${positions.mobileTop - 70} ${positions.terminalLeft + (positions.terminalRight - positions.terminalLeft) / 2} ${positions.mobileTop - 50}
              L ${positions.terminalLeft + (positions.terminalRight - positions.terminalLeft) / 2} ${positions.terminalTop - 15}`
          }
          stroke="#3B82F6"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        <path
          ref={el => { if (el) linesRef.current[1] = el }}
          className="data-line bottom-line"
          d={isMobile ? 
            `M ${positions.terminalRight - 12} ${positions.terminalBottom - (positions.terminalBottom - positions.terminalTop) / 4}
              L ${positions.terminalRight + 25} ${positions.terminalBottom - (positions.terminalBottom - positions.terminalTop) / 4}
              Q ${positions.terminalRight + 35} ${positions.terminalBottom - (positions.terminalBottom - positions.terminalTop) / 4} ${positions.terminalRight + 35} ${positions.terminalBottom - (positions.terminalBottom - positions.terminalTop) / 4 - 10}
              L ${positions.terminalRight + 35} ${positions.mobileBottom + 35}
              Q ${positions.terminalRight + 35} ${positions.mobileBottom + 25} ${positions.terminalRight + 45} ${positions.mobileBottom + 25}
              L ${positions.mobileLeft + (positions.mobileRight - positions.mobileLeft) / 2 - 10} ${positions.mobileBottom + 25}
              Q ${positions.mobileLeft + (positions.mobileRight - positions.mobileLeft) / 2} ${positions.mobileBottom + 25} ${positions.mobileLeft + (positions.mobileRight - positions.mobileLeft) / 2} ${positions.mobileBottom + 15}
              L ${positions.mobileLeft + (positions.mobileRight - positions.mobileLeft) / 2} ${positions.mobileBottom + 8}`
            :
            `M ${positions.terminalRight + 40} ${positions.terminalBottom - (positions.terminalBottom - positions.terminalTop) / 4}
              L ${positions.terminalRight + 50} ${positions.terminalBottom - (positions.terminalBottom - positions.terminalTop) / 4}
              Q ${positions.terminalRight + 70} ${positions.terminalBottom - (positions.terminalBottom - positions.terminalTop) / 4} ${positions.terminalRight + 70} ${positions.terminalBottom - (positions.terminalBottom - positions.terminalTop) / 4 - 20}
              L ${positions.terminalRight + 70} ${positions.mobileBottom + 70}
              Q ${positions.terminalRight + 70} ${positions.mobileBottom + 50} ${positions.terminalRight + 90} ${positions.mobileBottom + 50}
              L ${positions.mobileLeft + (positions.mobileRight - positions.mobileLeft) / 2 - 20} ${positions.mobileBottom + 50}
              Q ${positions.mobileLeft + (positions.mobileRight - positions.mobileLeft) / 2} ${positions.mobileBottom + 50} ${positions.mobileLeft + (positions.mobileRight - positions.mobileLeft) / 2} ${positions.mobileBottom + 30}
              L ${positions.mobileLeft + (positions.mobileRight - positions.mobileLeft) / 2} ${positions.mobileBottom + 15}`
          }
          stroke="#3B82F6"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Connection points */}
        <circle
          className="connection-point"
          cx={positions.mobileLeft + (positions.mobileRight - positions.mobileLeft) / 2}
          cy={positions.mobileTop - 15}
          r="4"
          fill="#3B82F6"
          opacity="0.8"
        />
        
        <circle
          className="connection-point"
          cx={positions.terminalLeft + (positions.terminalRight - positions.terminalLeft) / 2}
          cy={positions.terminalTop - 15}
          r="4"
          fill="#3B82F6"
          opacity="0.8"
        />
        
        <circle
          className="connection-point"
          cx={positions.terminalRight + 40}
          cy={positions.terminalBottom - (positions.terminalBottom - positions.terminalTop) / 4}
          r="4"
          fill="#3B82F6"
          opacity="0.8"
        />
        
        <circle
          className="connection-point" 
          cx={positions.mobileLeft + (positions.mobileRight - positions.mobileLeft) / 2}
          cy={positions.mobileBottom + 15}
          r="4"
          fill="#3B82F6"
          opacity="0.8"
        />
        </svg>
      )}


      {/* Clean floating elements along the path */}
      <div 
        className="data-popup absolute"
        data-checkpoint="customer"
        style={{ 
          zIndex: 55,
          left: `${positions.terminalLeft + (positions.terminalRight - positions.terminalLeft) / 2 - 60}px`,
          top: `${positions.terminalTop - 90}px`
        }}
      >
        <div className="bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="font-medium text-gray-700">Customer Recognized</span>
          </div>
        </div>
      </div>

      <div 
        className="data-popup absolute"
        data-checkpoint="points"
        style={{ 
          zIndex: 55,
          left: `${(positions.terminalLeft + positions.mobileLeft) / 2 + (positions.terminalRight - positions.terminalLeft) / 4}px`,
          top: `${positions.mobileTop - 90}px`
        }}
      >
        <div className="bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 text-xs">
            <Star className="w-3 h-3 text-amber-500" />
            <span className="font-medium text-gray-700">250 Points</span>
          </div>
        </div>
      </div>

      <div 
        className="data-popup absolute"
        data-checkpoint="transaction"
        style={{ 
          zIndex: 55,
          left: `${positions.terminalRight + 40}px`,
          top: `${positions.mobileBottom + 50}px`
        }}
      >
        <div className="bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 text-xs">
            <CheckCircle className="w-3 h-3 text-green-500" />
            <span className="font-medium text-gray-700">Transaction Done</span>
          </div>
        </div>
      </div>
    </div>
  )
}