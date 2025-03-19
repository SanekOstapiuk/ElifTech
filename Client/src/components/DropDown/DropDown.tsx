import React, { ReactNode, useRef, useEffect } from "react";

type TypeDropDown = {
  children: ReactNode;
  className?: string;
  onClose: () => void
}

const DropDown: React.FC<TypeDropDown> = ({children, className, onClose}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const handleClick = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])

  return (
    <div className={className} ref={dropdownRef}>
      {children}
    </div>
  )
}

export default DropDown
