'use client'

import React from 'react'
import { TbPlaylist } from 'react-icons/tb'
import { AiOutlinePlus } from 'react-icons/ai'
import { useAuthModal } from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/useUser'
import { useUploadModal } from '@/hooks/useUploadModal'
import { Song } from '@/types'
import { MediaItem } from './media-item'
import useOnPlay from '@/hooks/useOnPlay'

interface LibraryProps {
  songs: Song[]
}

export const Library: React.FC<LibraryProps> = ({ songs }) => {
  const authModal = useAuthModal()
  const uploadModal = useUploadModal()
  const { user } = useUser()

  const onPlay = useOnPlay(songs)

  const onClick = () => {
    if (!user) {
      return authModal.onOpen()
    }

    return uploadModal.onOpen()
  }

  return (
    <div className='flex flex-col '>
      <div className='flex items-center justify-between px-5 pt-4'>
        <div className='inline-flex items-center gap-x-2'>
          <TbPlaylist className='text-neutral-400' size={26} />
          <p className='text-neutral-400 font-medium text-md'>
            Your Library
          </p>
        </div>

        <AiOutlinePlus size={20} className='cursor-pointer text-neutral-400 hover:text-white transition' onClick={onClick} />
      </div>

      <div className='flex flex-col gap-y-2 mt-4 px-3'>
        {
          songs.map(song => (
            <MediaItem
              onClick={(id: string) => onPlay(id)}
              key={song.id}
              data={song}
            />
          ))
        }
      </div>
    </div>
  )
}
