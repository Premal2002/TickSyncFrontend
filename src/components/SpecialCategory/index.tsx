
import React, { useRef, useState } from 'react'
import Card from '../Card';
import { Movie } from '@/models/movie';
import Link from 'next/link';

function SpecialCategoryDisplay(props: any) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {

    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -1300 : 1300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  return (
    <div className={"relative  " + props.bgColor + " pt-5"}>
      <h1 className="text-center text-white">{props.title != undefined && props.title.toUpperCase()}</h1>
      {5 > 4 && (
        <button
          onClick={() => scroll('left')}
          className="absolute cursor-pointer left-10 top-1/2 hover:bg-black text-white -translate-y-1/2 border-white border-2 text-2xl py-1 px-3 rounded-full shadow"
        >
          &lt;
        </button>
      )}
      <div ref={scrollRef} id='cardHolder' className="flex overflow-x-auto gap-9 py-15 mx-30 pr-10 scroll-smooth hiddenScrollbar">
        {/* Left arrow */}
        {props.load ? <h4 className="text-black">Loading...</h4> : props.data ? props.data && props.data.map((item: Movie) => (
          <Card width='w-[18%]' data={item} key={item.movieId} />
          
        )) : <h4 className="text-white">Movies data is empty!</h4>}


      </div>
      {/* Right arrow */}
      {5 > 4 && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-15 cursor-pointer top-1/2 hover:bg-black text-white -translate-y-1/2 border-white border-2 text-2xl py-1 px-3 rounded-full shadow"
        >
          &gt;
        </button>
      )}
    </div>
  )
}

export default SpecialCategoryDisplay;