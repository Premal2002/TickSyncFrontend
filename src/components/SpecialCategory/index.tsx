
import React, { useRef } from 'react'
import Card from '../Card';

function SpecialCategoryDisplay(props: any) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    console.log(scrollRef.current);
    
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -1266 : 1300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  return (
    <div className={"relative  " + props.bgColor + " pt-5"}>
      <h1 className="text-center text-white">{props.title != undefined && props.title.toUpperCase()}</h1>
      {5 > 4 && (
          <button
            onClick={() => scroll('left')}
            className="absolute cursor-pointer left-10 top-1/2 text-white -translate-y-1/2 z-10 border-white border-2 text-2xl py-1 px-3 rounded-full shadow"
          >
            &lt;
          </button>
        )}
      <div ref={scrollRef} id='cardHolder' className="flex overflow-x-auto gap-10 py-15 mx-30 pr-10 scroll-smooth hiddenScrollbar">
        {/* Left arrow */}
        
        <Card width='[23%]' />
        <Card width='[23%]' />
        <Card width='[23%]' />
        <Card width='[23%]' />
        <Card width='[23%]' />
        <Card width='[23%]' />
        <Card width='[23%]' />
        <Card width='[23%]' />
        <Card width='[23%]' />
      
      </div>
      {/* Right arrow */}
      {5 > 4 && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-15 cursor-pointer top-1/2 text-white -translate-y-1/2 z-10 border-white border-2 text-2xl py-1 px-3 rounded-full shadow"
          >
            &gt;
          </button>
        )}
    </div>
  )
}

export default SpecialCategoryDisplay;