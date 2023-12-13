import { Header } from '@/components/header'
import { ListItem } from '@/components/list-item'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='bg-neutral-900 rounded-lg overflow-hidden h-full overflow-y-auto'>
      <Header >
        <div className='mb-2'>
          <h1 className='text-white text-3xl font-semibold'>
            Welcome back
          </h1>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4'>
          <ListItem image='/images/liked.png' name='Liked Songs' href='liked' />
        </div>
      </Header>

      <div className='mt-2 mb-7 px-6'>
        <div className='flex justify-between items-center'>
          <h1 className='font-semibold text-white text-2xl'>Newest songs</h1>
        </div>
        <div>List of songs</div>
      </div>
    </div>
  )
}
