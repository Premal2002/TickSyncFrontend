
import React from 'react'

function Card(props:any) {
  return (
    <div className='px-10'>
        <div className='rounded-xl bg-amber-50 h-100 w-full'></div>
        <p className='text-center p-3 text-white text-2xl'>Movie Name</p>
    </div>
  )
}

export default Card