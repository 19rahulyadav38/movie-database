// toastConfig.js

import { toast } from 'react-toastify';

const defaultToastConfig = {
  position: 'bottom-center',
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

export const showErrorToast = (message) => {
  toast.error(message, {
    ...defaultToastConfig,
  });
};

export const showSuccessToast = (message) => {
  toast.success(message, {
    ...defaultToastConfig,
  });
};
