'use client';

import React from 'react';
import styles from './PageLoading.module.css';

// MUI Imports
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const PageLoading = () => {
  return (
    <Box
      className={styles['page-loading-bg']}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
      }}
    >
      <CircularProgress
        size={60}
        sx={{
          color: '#9155FD', // Materio UI primary purple color
        }}
      />
    </Box>
  );
};

export { PageLoading };
export default PageLoading;
