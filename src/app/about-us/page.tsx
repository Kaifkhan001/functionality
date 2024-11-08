import React from 'react'
import Link from 'next/link'

const Page = () => {
  return (
    <div className='w-screen h-screen flex flex-col px-6 pt-10 sm:items-start items-center'>
      <h2 className='text-3xl text-center sm:text-start'>This is the page about me and our Team</h2>
      <p className='w-1/2 my-8 text-center sm:text-start'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita illo doloremque voluptates esse? Distinctio sapiente obcaecati veritatis voluptatum voluptatem minus, earum impedit, dignissimos quos facere vero minima! Quia numquam ea exercitationem doloremque quibusdam maiores enim facere voluptates, impedit, atque deleniti! Ducimus est vel aliquid vitae.</p>
      <Link href="/" className='text-blue-700'>Home🔙</Link>
    </div>
  )
}

export default Page
