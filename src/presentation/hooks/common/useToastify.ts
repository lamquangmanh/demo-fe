import { toast, Bounce } from 'react-toastify';

const DEFAULT_ERROR_TOAST_OPTIONS = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
  transition: Bounce,
};

export const error = (message: string, options?: any) => {
  toast(
    message,
    options ?? {
      ...DEFAULT_ERROR_TOAST_OPTIONS,
      type: 'error',
      ...(options || {}),
    },
  );
};

export const success = (message: string, options?: any) => {
  toast(
    message,
    options ?? {
      ...DEFAULT_ERROR_TOAST_OPTIONS,
      type: 'success',
      ...(options || {}),
    },
  );
};

export const warning = (message: string, options?: any) => {
  toast(
    message,
    options ?? {
      ...DEFAULT_ERROR_TOAST_OPTIONS,
      type: 'warning',
      ...(options || {}),
    },
  );
};

export const info = (message: string, options?: any) => {
  toast(
    message,
    options ?? {
      ...DEFAULT_ERROR_TOAST_OPTIONS,
      type: 'info',
      ...(options || {}),
    },
  );
};

export const useToastify = () => {
  return { error, success, warning, info };
};
