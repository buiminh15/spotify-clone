'use client'

import React from 'react'

interface SidebarProps {
  children: React.ReactNode
}

export const Sidebar = ({ children }: SidebarProps) => {
  return (
    <div>{children}</div>
  )
}
