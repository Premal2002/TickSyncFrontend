import Accordion from "@/components/Accordion";
import Card from "@/components/Card";
import SubNavbar from "@/components/SubNavbar";
import { Genres, Languages } from "@/HelperData/datavariables";
import { Movie } from "@/models/movie";
import { getMovies } from "@/services/movieService";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

function Movies() {

  const [load, setLoad] = useState(true);
  const [filters, setFilters] = useState<{
    languages: string[];
    genres: string[];
  }>({
    languages: [],
    genres: [],
  });

  const [languageFilter, setLanguageFilter] = useState<any[]>(Languages);
  const [genreFilter, setGenreFilter] = useState<any[]>(Genres);
  const [movies, setMovies] = useState<Movie[]>();

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const MOVIES_PER_PAGE = 8;


  useEffect(() => {
    const fetchMovies = async () => {
      setLoad(true);
      const response = await getMovies(filters, currentPage + 1, MOVIES_PER_PAGE);
      if (response && response.data) {
        const { movies, total } = response.data;
        setMovies(movies);
        setTotalPages(Math.ceil(total / MOVIES_PER_PAGE));
      }
      setLoad(false);
    };
    fetchMovies();
  }, [filters, currentPage]);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  function onLanguageFilterItemClicked(index: number) {
    const updatedLanguages = [...languageFilter];
    const item = updatedLanguages[index];
    const isSelected = item.filterApplied;

    updatedLanguages[index] = {
      ...item,
      filterApplied: !isSelected,
    };
    setLanguageFilter(updatedLanguages);

    setFilters((prev) => {
      const updated = isSelected
        ? prev.languages.filter((lang) => lang !== item.languageIsoCode)
        : [...prev.languages, item.languageIsoCode];
      return { ...prev, languages: updated };
    });
  }

  function onGenreFilterItemClicked(index: number) {
    const updatedGenres = [...genreFilter];
    const item = updatedGenres[index];
    const isSelected = item.filterApplied;

    updatedGenres[index] = {
      ...item,
      filterApplied: !isSelected,
    };
    setGenreFilter(updatedGenres);

    setFilters((prev) => {
      const updated = isSelected
        ? prev.genres.filter((genre) => genre !== item.genreName)
        : [...prev.genres, item.genreName];
      return { ...prev, genres: updated };
    });
  }

  function clearLanguageFilter() {
    if(filters.languages.length == 0) return;
    const cleared = Languages.map((lang) => ({
      ...lang,
      filterApplied: false,
    }));
    setLanguageFilter(cleared);
    setFilters((prev) => ({ ...prev, languages: [] }));
  }

  function clearGenreFilter() {
    if(filters.genres.length == 0) return;
    const cleared = Genres.map((genre) => ({ ...genre, filterApplied: false }));
    setGenreFilter(cleared);
    setFilters((prev) => ({ ...prev, genres: [] }));
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
                      className={`${language.filterApplied
                          ? "border border-red-500 bg-red-500 text-white rounded-3xl"
                          : "text-red-500 border border-gray-300 rounded-3xl"
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
                      className={`${genre.filterApplied
                          ? "border border-red-500 bg-red-500 text-white rounded-3xl"
                          : "text-red-500 border border-gray-300 rounded-3xl"
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
            {load ? (
              <h4 className="text-black">Loading...</h4>
            ) : movies ? (
              movies &&
              movies.map((item: Movie) => (
                <Card width="w-[23%]" data={item} key={item.movieId} />
              ))
            ) : (
              <h4 className="text-black">Movies data is empty!</h4>
            )}
          </div>

          {/* Pagination */}
          <div className="mt-6 py-2 flex justify-center text-black">
            <ReactPaginate
              previousLabel={'← Previous'}
              nextLabel={'Next →'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={'flex gap-2 text-md cursor-pointer'}
              pageClassName={'px-3 py-2 border border-gray-400 rounded'}
              activeClassName={'bg-red-500 text-white'}
              previousClassName={'px-3 py-2 border border-gray-400 rounded'}
              nextClassName={'px-3 py-2 border border-gray-400 rounded'}
              disabledClassName={'opacity-60 cursor-not-allowed'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movies;
