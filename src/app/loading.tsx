'use client';

import React from 'react';
import styles from './loading.module.css';

// MUI Imports
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
  return (
    <Box
      className={styles['loading-bg']}
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

export default Loading;
