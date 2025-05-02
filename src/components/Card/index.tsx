
import React from 'react'

function Card(props:any) {
  return (
    <div className={`w-${props.width} flex-shrink-0`}>
        <div className={`rounded-xl bg-amber-50 text-black p-2`}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium impedit aspernatur, officia corporis temporibus, veritatis cupiditate quaerat consequuntur voluptatem odio dolores accusamus nemo nisi nulla blanditiis eius ullam sint quis. Omnis, quae ratione quos fugiat corporis quis quisquam corrupti placeat odit voluptatibus veritatis assumenda repellendus eveniet molestiae, ducimus consequatur illum.
        </div>
        <p className='text-center p-3 text-white text-2xl'>Movie Name</p>
    </div>
  )
}

export default Card