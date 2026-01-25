// MUI Imports
import Grid from '@mui/material/Grid';

// Component Imports
import AccountDetails from './AccountDetails';
import AccountDelete from './AccountDelete';

const Account = () => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 6 }}>
        <AccountDetails />
      </Grid>
      <Grid size={{ xs: 6 }}>
        <AccountDelete />
      </Grid>
    </Grid>
  );
};

export default Account;
