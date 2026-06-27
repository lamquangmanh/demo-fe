// MUI Imports
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

// Third-party Imports
import { toast } from 'react-toastify';

const ToastsCustom = (t: any) => {
  return (
    <div className="is-full flex items-center justify-between">
      <div className="flex items-center">
        <Avatar
          alt="Victor Anderson"
          src="/images/avatars/3.png"
          className="mie-3 is-10 bs-10"
        />
        <div>
          <Typography variant="h6">{t.data?.title ?? ''}</Typography>
          <Typography variant="caption">{t.data?.description ?? ''}</Typography>
        </div>
      </div>
      <IconButton
        onClick={() => toast.dismiss(t.toastProps.toastId)}
        size="small"
      >
        <i className="ri-close-line text-xl text-textPrimary" />
      </IconButton>
    </div>
  );
};

export default ToastsCustom;
