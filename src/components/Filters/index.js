import React, { useContext } from 'react';
import { Radio } from 'antd';
import { debounce } from 'lodash';
import 'antd/dist/antd.css';

import { buttons, rated } from './const/buttons';
import styles from './styles.module.css';
import MoviesContext from '../context/MoviesContext';

const Filters = ({ activeButton, setActiveButton }) => {
  const moviesContext = useContext(MoviesContext);
  const options = buttons.map((e) => <Radio.Button
      key={e}
      className={styles.button}
      value={e}>
      {e}
      </Radio.Button>);
  const debounceHandler = debounce((text) => { moviesContext.search.setSearchValue(text); }, 500);
  const onClickHandler = (event) => {
    setActiveButton(event.target.value);
  };

  return <div className={styles.container}>
    <Radio.Group
        className={styles.radioGroup}
        value={activeButton}
        onChange={onClickHandler}
    >
    {options}
    </Radio.Group>
    {activeButton === rated ? null : <input placeholder='type to search...' className={styles.input} type='text' onChange={(e) => debounceHandler(e.target.value)} maxLength={26}/>}
</div>;
};
export default Filters;
