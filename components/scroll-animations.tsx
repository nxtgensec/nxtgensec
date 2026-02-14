"use client"

import { useEffect } from "react"

const ScrollAnimations = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    }, observerOptions)

    // Observe all elements with section-fade-in class
    const animatedElements = document.querySelectorAll(".section-fade-in")
    animatedElements.forEach((el) => observer.observe(el))

    // Staggered animations for cards
    const cardElements = document.querySelectorAll(".stagger-animation")
    cardElements.forEach((el, index) => {
      setTimeout(() => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("visible")
        }
      }, index * 100)
    })

    return () => observer.disconnect()
  }, [])

  return null
}

export default ScrollAnimations
