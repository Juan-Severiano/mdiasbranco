import * as React from 'react';
import Stack from '@mui/material/Stack';
import { AccountInfo } from '../../components/account/account-info';
import { AccountDetails } from '../../components/account/account-details';
import { Grid } from '@mui/material';

export default function UserAccount(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <Grid container spacing={3}>
        <Grid item spacing={5} lg={4} md={6} xs={12}>
          <Grid item xs={12}>
            <AccountInfo />
          </Grid>
        </Grid>
        <Grid item container spacing={3} lg={8} md={6} xs={12}>
          <Grid item xs={12}>
            <AccountDetails />
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
}
