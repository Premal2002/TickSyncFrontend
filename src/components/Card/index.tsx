
import React from 'react'

function Card(props:any) {
  return (
    <>
    <div className={`${props.width} flex-shrink-0 relative rounded-xl overflow-hidden bg-white shadow-lg `} style={{ backgroundImage: "url('https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OC40LzEwICA0LjVLIFZvdGVz,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00413426-nnvankllen-portrait.jpg')", backgroundSize:"cover" }}>

  {/* Movie Poster */}
  <div className="relative h-64 w-full bg-cover bg-center">
  <div className="flex justify-between items-center text-white text-sm p-2 bg-gray-800/40">
    <span className="flex items-center">
      ♥ 8.3/10
    </span>
    <span>7.9K Votes</span>
  </div>
  </div>

<div className='bg-linear-to-t from-gray-900 via-gray-500 to-90% p-2'>
  <p className="text-center text-black font-semibold text-lg mt-2">Movie name</p>
  <p className="text-center text-gray-500 text-sm ">Genre</p>
</div>
</div>
    </>

  )
}

export default Card