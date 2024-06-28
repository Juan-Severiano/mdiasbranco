import * as React from 'react';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { AccountInfo } from '../../../components/account/account-info';
import { AccountDetails } from '../../../components/account/account-details';

export default function ManagerAccount(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <Grid container spacing={3}>
        <Grid spacing={5} lg={4} md={6} xs={12}>
          <Grid xs={12}>
            <AccountInfo />
          </Grid>
        </Grid>
        <Grid container spacing={3} lg={8} md={6} xs={12}>
          <Grid xs={12}>
            <AccountDetails />
          </Grid>
          {/* <Grid xs={12}>
            <AccountAddressForm />
          </Grid> */}
        </Grid>
      </Grid>
    </Stack>
  );
}
