import gsap from 'gsap'

declare module 'gsap' {
  type Timeline = gsap.core.Timeline | null
}
