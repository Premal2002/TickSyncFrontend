
import React from 'react'

function Card(props:any) {
  return (
    <>
    <div className={`${props.width} flex-shrink-0 relative rounded-xl overflow-hidden bg-white shadow-lg `} style={{ backgroundImage: `url(${props.data.posterUrl})`, backgroundSize:"cover" }}>

  {/* Movie Poster */}
  <div className="relative h-64 w-full bg-cover bg-center">
  <div className="flex justify-between items-center text-white text-md p-2 bg-gray-800/40">
    <span className="flex items-center">
      ❤ {props.data.rating}
    </span>
    <span>{props.data.language}</span>
  </div>
  </div>

<div className='bg-linear-to-t from-gray-900 to-60% p-4 mt-4'>
  <p className="text-center text-white font-semibold text-lg mt-2">{props.data.title}</p>
  <p className="text-center text-white text-sm ">{props.data.genre}</p>
</div>
</div>
    </>

  )
}

export default Card