import React, { useState, useContext } from 'react';

import styles from './styles.module.css';
import MoviesContext from '../context/MoviesContext';
import rateMovie from '../../api/rateMovie';

const RateComponent = ({ yourRate, moviesId }) => {
  const moviesContext = useContext(MoviesContext);
  const [rate, setRate] = useState(yourRate || 0);
  const rateStr = ('★'.repeat(rate) + '☆'.repeat(10 - rate)).split('');
  return <div className={styles.container}>
    {
    rateStr.map((star, index) => <div
      className={star === '★' ? styles.goldStar : styles.emptyStar}
      key={index} onClick={() => {
        const rateValue = index + 1;
        rateMovie({ value: rateValue }, moviesContext.guestSession.guestSessionId, moviesId);
        setRate(rateValue);
      }}
    >
      {star}
    </div>)
    }
  </div>;
};

export default RateComponent;
