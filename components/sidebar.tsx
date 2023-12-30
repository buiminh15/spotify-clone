'use client'

import { usePathname } from 'next/navigation'
import React, { useMemo } from 'react'
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { Box } from './box';
import { SidebarItem } from './sidebar-item';
import { Library } from './library';
import { Song } from '@/types';
import { twMerge } from 'tailwind-merge';
import usePlayer from '@/hooks/usePlayer';


interface SideBarProps {
  songs: Song[]
}

export const Sidebar: React.FC<SideBarProps> = ({ songs }) => {
  const pathname = usePathname()

  const routes = useMemo(() => [
    {
      icon: HiHome,
      label: 'Home',
      active: pathname !== '/search',
      href: '/'
    },
    {
      icon: BiSearch,
      label: 'Search',
      active: pathname === '/search',
      href: '/search'
    },
  ], [pathname])

  return (

    <aside className='hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2'>
      <Box>
        <div className='
            flex
            flex-col
            gap-y-4
            px-5
            py-4
          '>
          {
            routes.map(item => (
              <SidebarItem
                key={item.label}
                {...item}
              />
            ))
          }
        </div>
      </Box>
      <Box className='overflow-y-auto h-full'>
        <Library songs={songs} />
      </Box>
    </aside>

  )
}
