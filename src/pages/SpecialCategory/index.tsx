
import React from 'react'
import Card from '../Card';

function SpecialCategoryDisplay(props:any) {
  return (
    <div className="h-150 bg-zinc-500 pt-5">
            <h1 className="text-center text-white">{props.title.toUpperCase()}</h1>
            <div className="grid grid-cols-4 mt-15 px-10">
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
  )
}

export default SpecialCategoryDisplay;