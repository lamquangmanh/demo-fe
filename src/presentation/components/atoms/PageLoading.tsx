'use client';

import React from 'react';

// MUI Imports
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const PageLoading = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#28243d',
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: '#9155fd',
        opacity: 1,
      }}
    >
      <CircularProgress
        size={60}
        sx={{
          color: '#9155FD',
        }}
      />
    </Box>
  );
};

export { PageLoading };
export default PageLoading;
