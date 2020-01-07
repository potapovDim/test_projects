import React from 'react'

const ArrowDown = ({size = 48, color = '#000000'}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v13M5 12l7 7 7-7" />
  </svg>
)

export {
  ArrowDown
}