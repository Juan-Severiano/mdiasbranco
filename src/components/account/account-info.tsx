import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { localClient } from '../../lib/local/client';
import { baseURL } from '../../config';
import { updateUserImage } from '../../services/requests/auth';
import { RotatingLines } from 'react-loader-spinner';
import { AddIcCall, Assignment, PermContactCalendar } from '@mui/icons-material';

export function AccountInfo(): React.JSX.Element {
  const { data } = localClient.getUser();
  console.log("aqui a data",data)
  const [loading, setLoading] = React.useState(false)
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event)
    if (event.target.files) {
      const selectedFile = Array.from(event.target.files)[0]
      setLoading(true)
      await updateUserImage(selectedFile);
      location.reload()
    }
  };

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <div>
            <Avatar src={`${baseURL}/user/attachment/${data?.image_id?.path}`} sx={{ height: '150px', width: '150px' }} />
          </div>
          <Stack spacing={1} sx={{ textAlign: 'center', mb: 2 }}>
            <Typography variant="h5">{data?.name}</Typography>
            <Typography color="text.secondary" variant="body2">
              {data?.email}
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
          <Typography color="text.secondary" variant="body2">
            <Stack spacing={1} justifyContent='center' flexDirection='row'>
              <Assignment />
              {data?.sector}
            </Stack>
          </Typography>
          <Typography color="text.secondary" variant="body2">
            <Stack spacing={1} justifyContent='center' flexDirection='row'>
              <PermContactCalendar />
              {data?.mat}
            </Stack>
          </Typography>
          <Typography color="text.secondary" variant="body2">
            <Stack spacing={1} justifyContent='center' flexDirection='row'>
              <AddIcCall />
              {data?.telphone}
            </Stack>
          </Typography>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth disabled={loading} component="label" size="large" variant="contained">
          {loading ?
            <>
              <RotatingLines width='20' strokeColor='#b2cbdc' /> Uploading ...
            </>
            : (
              <>
                Upload de imagem
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </>
            )}
        </Button>
      </CardActions>
    </Card>
  );
}
