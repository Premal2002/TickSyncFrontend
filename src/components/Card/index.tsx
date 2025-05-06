import React from "react";

function Card(props: any) {
  return (
    <>
      <div className={`${props.width} flex-shrink-0 relative rounded-xl overflow-hidden bg-white hover:drop-shadow-2xl hover:scale-105 `}>
        <div
          className="flex-shrink-0 relative rounded-xl overflow-hidden bg-white shadow-lg "
          style={{
            backgroundImage: `url(${props.data.posterUrl})`,
            backgroundSize: "cover",
          }}
        >
          {/* Movie Poster */}
          <div className="relative h-90 w-full bg-center">
            <div className="flex justify-between items-center text-white text-md p-2 bg-gray-800/40">
              <span className="flex items-center">❤ {props.data.rating}</span>
              <span>{props.data.language.toUpperCase()}</span>
            </div>
          </div>

        </div>
          <div className="text-black p-3">
            <p className="text-center font-semibold text-lg mt-2">
              {props.data.title}
            </p>
            <p className="text-center text-sm italic">
              {props.data.genre}
            </p>
          </div>

      </div>
    </>
  );
}

export default Card;
