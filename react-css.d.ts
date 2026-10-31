import 'react'

// Allows CSS custom properties such as style={{ '--d': 1 }} for animation staggering.
declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number
  }
}
