import Accordion from "@/components/Accordion";
import Card from "@/components/Card";
import SubNavbar from "@/components/SubNavbar";
import { Genres, Languages } from "@/HelperData/datavariables";
import { Movie } from "@/models/movie";
import { getMovies } from "@/services/movieService";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Movies(props:any) {
  const [languageFilter, setLanguageFilter] = useState<any[]>(Languages);
  const [genreFilter, setGenreFilter] = useState<any[]>(Genres);
   const [movies, setMovies] = useState<Movie[]>();
      useEffect(()=>{
          const response = getMovies().then((response: any) => {
                      if (response) {
                          const data:Movie[]= response.data;
                          setMovies(data);
                      }
                  });
      },[]);

  function onLanguageFilterItemClicked(index: number) {
    // console.log(languageFilter[index].filterApplied);
    const updatedLanguages = [...languageFilter];
    updatedLanguages[index] = {
      ...updatedLanguages[index],
      filterApplied: !updatedLanguages[index].filterApplied,
    };
    setLanguageFilter(updatedLanguages);
    //remaining
    // const strArray = langFilterObj.split('|');
    // if(strArray.includes(updatedLanguages[index].languageName)){
    //     updatedLanguages[index] = { ...updatedLanguages[index], filterApplied: false };
    // }else{
    //     updatedLanguages[index] = { ...updatedLanguages[index], filterApplied: true };
    //     langFilterObj.
    // }
  }

  function onGenreFilterItemClicked(index: number) {
    // console.log(languageFilter[index].filterApplied);
    const updatedGenres = [...genreFilter];
    updatedGenres[index] = {
      ...updatedGenres[index],
      filterApplied: !updatedGenres[index].filterApplied,
    };
    setGenreFilter(updatedGenres);
  }

  function clearLanguageFilter() {
    setLanguageFilter(Languages);
  }

  function clearGenreFilter() {
    setGenreFilter(Genres);
  }

  return (
    <div>
      <SubNavbar />
      <div className="px-30 py-15 flex bg-gray-200 gap-2">
        <div className="text-black w-[25%]">
          <div className="">
            <h3 className="mb-3">Filters</h3>
            <Accordion title="Languages" clearFilter={clearLanguageFilter}>
              <div className="">
                <ul className="flex flex-wrap gap-2">
                  {languageFilter.map((language) => (
                    <li
                      key={language.id}
                      onClick={() => onLanguageFilterItemClicked(language.id)}
                      className={`${
                        language.filterApplied
                          ? "border border-red-500 bg-red-500 text-white"
                          : "text-red-500 border border-gray-300"
                      } py-1 px-3 text-sm cursor-pointer select-none`}
                    >
                      {language.languageName}
                    </li>
                  ))}
                </ul>
              </div>
            </Accordion>

            <Accordion title="Generes" clearFilter={clearGenreFilter}>
              <div className="">
                <ul className="flex flex-wrap gap-2">
                  {genreFilter.map((genre) => (
                    <li
                      key={genre.id}
                      onClick={() => {
                        onGenreFilterItemClicked(genre.id);
                      }}
                      className={`${
                        genre.filterApplied
                          ? "border border-red-500 bg-red-500 text-white"
                          : "text-red-500 border border-gray-300"
                      } py-1 px-3 text-sm cursor-pointer select-none`}
                    >
                      {genre.genreName}
                    </li>
                  ))}
                </ul>
              </div>
            </Accordion>
          </div>
        </div>
        <div className="w-[80%]">
          <h3 className="px-2 mb-3 text-black">Movies</h3>
          <div className="flex gap-5 px-2 flex-wrap">
            {movies && movies.map((item: Movie) => (
                <Card width="w-[18%]" data={item} key={item.movieId} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movies;
