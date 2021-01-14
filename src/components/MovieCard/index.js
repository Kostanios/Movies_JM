import React, { useContext } from 'react';
import dateFormat from 'dateformat/lib/dateformat';
import { Skeleton } from 'antd';

import Genre from '../Genre';
import styles from './styles.module.css';
// import getIdInfo from '../../api/getIdInfo';
import img from './util/img';
import cutOverview from './util/overview';
import MoviesContext from '../context/MoviesContext';
import genreIdHandler from './util/genreIdHandler';
import RateComponent from '../RateComponent';

const rateColor = (rate) => {
  if (rate < 3) { return '#E90000'; }
  if (rate < 5) { return '#E97E00'; }
  if (rate < 7) { return '#E9D100'; }
  return '#66E900';
};

const MovieCard = ({ movie, rating }) => {
  const moviesContext = useContext(MoviesContext);
  // console.log(movie);
  return <div className={styles.card} key={Math.random()}>
        <img className={styles.poster} src={movie
          ? img(movie.poster_path)
          : img()}
          alt = "poster"
          />
        <div className={styles.info}>
        <div className={styles.header}>
          <p className={styles.title}>{movie.original_title ? movie.original_title : ''}</p>
          <div className={styles.circle} style={{ borderColor: rateColor(movie.vote_average) || 'transparent' }}>
            <span className={styles.rate}/>{movie.vote_average}<span/>
          </div>
        </div>
        {movie
          ? <div className={styles.mainInfo}>
            <p className={styles.date}>{movie.release_date ? dateFormat(new Date(movie.release_date), 'mmmm dS, yyyy') : 'no date'}</p>
            <ul
              className={styles.genres}
            >
            {movie.genre_ids && moviesContext.genres
              ? genreIdHandler(moviesContext.genres, movie.genre_ids).map(
                (genre) => <Genre key={genre.name} name={genre.name}/>,
              )
              : null}
            </ul>
            <p>{movie.overview ? cutOverview(movie.overview) : 'хороший фильм'}</p>
          </div>
          : <Skeleton active></Skeleton>}
          <RateComponent yourRate={rating} moviesId={movie.id}/>
        </div>
    </div>;
};

export default MovieCard;
