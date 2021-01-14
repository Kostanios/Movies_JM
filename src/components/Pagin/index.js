import React, { useContext } from 'react';
import { Pagination } from 'antd';

import styles from './styles.module.css';
import MoviesContext from '../context/MoviesContext';
import { rated } from '../Filters/const/buttons';

const Pagin = ({ activeButton }) => {
  const moviesContext = useContext(MoviesContext);
  const changePage = (page) => {
    moviesContext.pageState.setCurPage(page);
  };
  const changeRatePage = (page) => {
    moviesContext.rated.setRatedCurPage(page);
  };
  if (activeButton === rated) {
    return moviesContext.rated.ratedTotalPages
      ? <div className={styles.container}>
      <Pagination
        current={moviesContext.rated.ratedCurPage}
        defaultCurrent={1}
        onChange={changeRatePage}
        total={moviesContext.rated.ratedTotalPages * 10}
      />
    </div>
      : null;
  }
  return moviesContext.pageState.totalPages
    ? <div className={styles.container}>
      <Pagination
        current={moviesContext.pageState.curPage}
        defaultCurrent={1}
        onChange={changePage}
        total={moviesContext.pageState.totalPages * 10}
      />
    </div>
    : null;
};

export default Pagin;
