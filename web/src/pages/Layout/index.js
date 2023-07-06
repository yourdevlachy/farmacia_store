import React from 'react';
import styles from './styles/Layout.css';

const Layout = ({ API_CORE }) => {
  console.log('🚀 ~ file: App.js ~ line 5 ~ App ~ API_CORE', API_CORE);
  return (
    <div className={styles.layout}>
      <div>NEW APP</div>
    </div>
  );
};

export default Layout;
