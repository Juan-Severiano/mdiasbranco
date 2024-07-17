import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface NotFoundItemProps {
  message?: string
}

export default function NotFoundItem({ message }: NotFoundItemProps): React.JSX.Element {
  return (
    <Box component="main" sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', minHeight: '100%' }}>
      <Stack spacing={3} sx={{ alignItems: 'center', maxWidth: 'md' }}>
        <Box>
          <Box
            component="img"
            alt="Under development"
            src="/assets/error-404.png"
            sx={{ display: 'inline-block', height: 'auto', maxWidth: '100%', width: '250px' }}
          />
        </Box>
        <Typography variant="h3" sx={{ textAlign: 'center' }}>
          { message ?? '404: O que você procura não está aqui ...' }
        </Typography>
      </Stack>
    </Box>
  );
}
