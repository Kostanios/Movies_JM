import React, { useContext } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import MoviesContext from '../context/MoviesContext';
import styles from './styles.module.css';
import MovieCard from '../MovieCard/index';
import { search } from '../Filters/const/buttons';

const antIcon = <LoadingOutlined style={{ fontSize: 58 }} spin />;

const Collection = ({ activeButton }) => {
  const moviesContext = useContext(MoviesContext);
  if (activeButton === search) {
    return moviesContext.filteredMovies === null
      ? <Spin className={styles.spinner} indicator={antIcon} />
      : <div className={styles.collection}>{moviesContext.filteredMovies.map((movie, index) => {
        const ratedMovie = moviesContext.rated.ratedMovies
          ? moviesContext.rated.ratedMovies.find((el) => (movie.id === el.id))
          : null;
        return <MovieCard rating={ratedMovie ? ratedMovie.rating : 0} movie={movie} key={index}/>;
      })}
    </div>;
  }
  // console.log(moviesContext.rated.ratedMovies);
  return moviesContext.rated.ratedMovies === null
    ? <Spin className={styles.spinner} indicator={antIcon} />
    : <div className={styles.collection}>{moviesContext.rated.ratedMovies.map((movie, index) => (
      <MovieCard movie={movie} key={index} rating={movie.rating}/>
    ))}
    </div>;
};

export default Collection;
