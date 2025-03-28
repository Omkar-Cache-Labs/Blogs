import React from 'react'
import BlogCard from './BlogsInitial'
import BlogCard2 from './BlogsCard2'

const Blogs = () => {
  return (
    <div className='w-full h-screen bg-white flex flex-col items-center mt-20'>
        <p className='text-black text-3xl font-bold'>Blogs </p>
        <div className="mt-6">
            <BlogCard2/>
        </div>
    </div>
  )
}

export default Blogs