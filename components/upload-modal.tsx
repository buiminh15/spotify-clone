'use client'

import React, { useState } from 'react'
import { Modal } from './modal'
import { useUploadModal } from '@/hooks/useUploadModal'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Input from './input'
import Button from './button'
import toast from 'react-hot-toast'
import { useUser } from '@/hooks/useUser'

import uniqid from 'uniqid'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'

export const UploadModal = () => {
  const { register, reset, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null
    }
  })

  const [isLoading, setLoading] = useState(false)

  const uploadModal = useUploadModal()
  const { user } = useUser()
  const supabaseClient = useSupabaseClient();
  const router = useRouter()

  const onChange = (open: boolean) => {
    if (!open) {
      reset()
      return uploadModal.onClose()
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setLoading(true)
      const imageFile = values.image?.[0]
      const songFile = values.song?.[0]

      if (!imageFile || !songFile || !user) {
        return toast.error('Missing fields')
      }
      const uniqueId = uniqid()

      const {
        data: songData,
        error: songError
      } = await supabaseClient
        .storage
        .from('songs')
        .upload(`song-${values.title}-${uniqueId}`, songFile, {
          upsert: false
        });

      if (songError) {
        return toast.error('Song upload failed')
      }

      const {
        data: imageData,
        error: imageError
      } = await supabaseClient
        .storage
        .from('images')
        .upload(`image-${values.title}-${uniqueId}`, imageFile, {
          upsert: false
        });

      if (imageError) {
        return toast.error('Image upload failed')
      }

      // create record
      const { error: supabaseError } = await supabaseClient.from('songs')
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path
        })

      if (supabaseError) {
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setLoading(false);
      toast.success('Song created!');
      reset();
      uploadModal.onClose();

    } catch (error) {
      toast.error('Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title='Add a song'
      description='Upload an mp3 file'
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
        <Input
          id="title"
          disabled={isLoading}
          {...register('title', { required: true })}
          placeholder="Song title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register('author', { required: true })}
          placeholder="Song author"
        />

        <div>
          <div className='pb-1'>
            Select a song file
          </div>
          <Input
            id="song"
            type='file'
            accept='.mp3'
            disabled={isLoading}
            {...register('song', { required: true })}
          />
        </div>
        <div>
          <div className='pb-1'>
            Select an image
          </div>
          <Input
            id="image"
            type='file'
            accept='image/*'
            disabled={isLoading}
            {...register('image', { required: true })}
          />
        </div>
        <Button disabled={isLoading} type='submit' >
          Create
        </Button>
      </form>
    </Modal>
  )
}
