import React from 'react';
import styles from './styles.module.css';

const Genre = ({ name }) => <li className={styles.container}><span>{name}</span></li>;

export default Genre;
