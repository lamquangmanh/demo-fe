'use client';

import React, { createContext, useContext, forwardRef } from 'react';
import {
  SnackbarProvider,
  useSnackbar,
  SnackbarContent,
  CustomContentProps,
} from 'notistack';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface NotificationMessage {
  title?: string;
  message?: string;
  description?: string;
  duration?: number;
}

type NotificationInput = string | NotificationMessage;

interface NotificationApi {
  success: (input: NotificationInput, description?: string) => void;
  error: (input: NotificationInput, description?: string) => void;
  warning: (input: NotificationInput, description?: string) => void;
  info: (input: NotificationInput, description?: string) => void;
}

export const NotificationContext = createContext<NotificationApi | null>(null);

export const useNotificationApi = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error(
      'useNotificationApi must be used within NotificationProvider',
    );
  return ctx;
};

// Custom Snackbar component using MUI Alert
const CustomSnackbar = forwardRef<HTMLDivElement, CustomContentProps>(
  ({ id, message, variant }, ref) => {
    const { closeSnackbar } = useSnackbar();

    // Parse message to get title and description
    let parsedMessage: { title: string; description?: string };
    try {
      // If message is already an object
      if (typeof message === 'object' && message !== null) {
        const msg = message as NotificationMessage;
        parsedMessage = {
          title: msg.title || msg.message || '',
          description: msg.description,
        };
      } else if (typeof message === 'string') {
        // Try to parse JSON string
        try {
          const parsed = JSON.parse(message);
          parsedMessage = {
            title: parsed.title || parsed.message || message,
            description: parsed.description,
          };
        } catch {
          // If not JSON, treat as simple string
          parsedMessage = { title: message };
        }
      } else {
        parsedMessage = { title: String(message) };
      }
    } catch {
      parsedMessage = { title: String(message) };
    }

    return (
      <SnackbarContent ref={ref} role="alert">
        <Alert
          severity={variant as 'success' | 'error' | 'warning' | 'info'}
          sx={{
            width: '100%',
            boxShadow: (theme) => theme.shadows[8],
          }}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => closeSnackbar(id)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          {parsedMessage.description ? (
            <>
              <AlertTitle>{parsedMessage.title}</AlertTitle>
              {parsedMessage.description}
            </>
          ) : (
            parsedMessage.title
          )}
        </Alert>
      </SnackbarContent>
    );
  },
);

CustomSnackbar.displayName = 'CustomSnackbar';

const encryptInput = (input: NotificationInput, description?: string) => {
  if (typeof input === 'string') {
    return JSON.stringify({ title: input, description });
  } else {
    return JSON.stringify(input);
  }
};

const NotificationWrapper = ({ children }: { children: React.ReactNode }) => {
  const { enqueueSnackbar } = useSnackbar();

  const api: NotificationApi = {
    success: (input: NotificationInput, description?: string) => {
      enqueueSnackbar(encryptInput(input, description), {
        variant: 'success',
      });
    },
    error: (input: NotificationInput, description?: string) => {
      enqueueSnackbar(encryptInput(input, description), {
        variant: 'error',
      });
    },
    warning: (input: NotificationInput, description?: string) => {
      enqueueSnackbar(encryptInput(input, description), {
        variant: 'warning',
      });
    },
    info: (input: NotificationInput, description?: string) => {
      enqueueSnackbar(encryptInput(input, description), { variant: 'info' });
    },
  };

  return (
    <NotificationContext.Provider value={api}>
      {children}
    </NotificationContext.Provider>
  );
};

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      autoHideDuration={4000}
      Components={{
        success: CustomSnackbar,
        error: CustomSnackbar,
        warning: CustomSnackbar,
        info: CustomSnackbar,
      }}
    >
      <NotificationWrapper>{children}</NotificationWrapper>
    </SnackbarProvider>
  );
};
