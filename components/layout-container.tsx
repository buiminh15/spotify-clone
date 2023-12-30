'use client'
import { Song } from '@/types'
import React from 'react'
import { Sidebar } from './sidebar'
import { twMerge } from 'tailwind-merge'
import usePlayer from '@/hooks/usePlayer'

interface LayoutContainerProps {
  songs: Song[]
  children: React.ReactNode
}

export const LayoutContainer: React.FC<LayoutContainerProps> = ({ songs, children }) => {
  const player = usePlayer();
  return (

    <div className={twMerge(`grid grid-cols-1 md:grid-cols-[300px_1fr] gap-x-2 h-full`, player.activeId && 'h-[calc(100%-80px)]')}>
      <Sidebar songs={songs} />
      <main className='py-2 overflow-y-auto'>
        {children}
      </main>
    </div>
  )
}
