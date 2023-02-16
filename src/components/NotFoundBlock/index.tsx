/** @format */

import React from 'react';

import styles from './NotFoundBlock.module.scss';
export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1 className={styles.root_title}>Nothing was found</h1>
      <p className={styles.root_text}>
        Unfortunately, this page is not available in our online store
      </p>
    </div>
  );
};
