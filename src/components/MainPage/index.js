/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState, useEffect, useCallback,
} from 'react';
import { Alert } from 'antd';

import MoviesContext from '../context/MoviesContext';
import Filters from '../Filters/index';
import styles from './styles.module.css';
import Collection from '../Collection/index';
import getMovies from '../../api/getMovies';
import guestAuth from '../../api/guestAuth';
import getGenres from '../../api/getGenres';
import getRatedMovies from '../../api/getRatedMovies';
import Pagin from '../Pagin';
import { NoSuchFilm } from '../../const/errors';
import { search, rated } from '../Filters/const/buttons';

async function isOnline() {
  return navigator.onLine;
}

const MainPage = () => {
  const [ratedCurPage, setRatedCurPage] = useState(1);
  const [ratedTotalPages, setRatedTotalPages] = useState(null);
  const [activeButton, setActiveButton] = useState(search);
  const [ratedMovies, setRatedMovies] = useState(null);
  const [genres, setGenres] = useState(null);
  const [guestSessionId, setGuestSessionId] = useState(null);
  const [searchAlert, setSearchAlert] = useState(null);
  const [connection, setConnection] = useState(null);
  const [curPage, setCurPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [filteredMovies, setFilteredMovies] = useState(null);
  const [totalPages, setTotalPages] = useState(null);

  const memoizedGetRatedMovies = useCallback(
    () => {
      getRatedMovies(guestSessionId).then((data) => {
        if (!data.results) { return; }
        setRatedMovies(data.results);
        if (data.results.length === 0) {
          setSearchAlert(NoSuchFilm);
        } else { setSearchAlert(null); }
        setRatedTotalPages(data.total_pages);
      });
    },
    [guestSessionId, ratedCurPage, ratedTotalPages, activeButton],
  );
  const memoizedGetMovies = useCallback(
    () => {
      getMovies(curPage, 'ea', searchValue || 'star', true).then((data) => {
        setFilteredMovies(data.results);
        if (data.results.length === 0) {
          setSearchAlert(NoSuchFilm);
        } else { setSearchAlert(null); }
        setTotalPages(data.total_pages);
      });
      memoizedGetRatedMovies();
    },
    [curPage, searchValue],
  );

  useEffect(() => {
    isOnline().then((status) => { setConnection(status); });
    memoizedGetMovies();
  }, [curPage, searchValue]);
  useEffect(() => {
    guestAuth().then((data) => {
      setGuestSessionId(data.guest_session_id); // console.log(data.guest_session_id);
    });
    getGenres().then((data) => {
      setGenres(data.genres);
    });
  }, []);
  useEffect(() => {
    if (activeButton === rated) {
      memoizedGetRatedMovies();
    } else {
      setSearchAlert(null);
    }
  }, [activeButton]);
  const defaultContext = {
    filteredMovies,
    setFilteredMovies,
    pageState: {
      curPage,
      setCurPage,
      totalPages,
      setTotalPages,
    },
    search: {
      searchValue,
      setSearchValue,
    },
    alert: {
      searchAlert,
      setSearchAlert,
    },
    guestSession: {
      guestSessionId,
      setGuestSessionId,
    },
    rated: {
      ratedMovies,
      setRatedMovies,
      ratedTotalPages,
      setRatedTotalPages,
      ratedCurPage,
      setRatedCurPage,
    },
    genres,
  };
  return (
      <MoviesContext.Provider value={defaultContext}>
        <div className = {styles.container}>
            <Filters activeButton={activeButton} setActiveButton={setActiveButton}/>
            {connection
              ? <>{!searchAlert ? <><Collection activeButton={activeButton} /><Pagin activeButton={activeButton}/></> : <Alert message="no such film" type="error" showIcon />}</>
              : <Alert className={styles.alert} message="no internet connection" type="error" showIcon />}
        </div>
      </MoviesContext.Provider>);
};

export default MainPage;
