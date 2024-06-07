import * as React from 'react';
import type { SxProps } from '@mui/material/styles';
import Card from '@mui/material/Card';
// import Avatar from '@mui/material/Avatar';
// import CardContent from '@mui/material/CardContent';
// import LinearProgress from '@mui/material/LinearProgress';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';

export interface TasksProgressProps {
  sx?: SxProps;
  value: number;
}

export function TasksProgress({ sx }: TasksProgressProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      {/* <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" gutterBottom variant="overline">
                Task Progress
              </Typography>
              <Typography variant="h4">{value}%</Typography>
            </Stack>
            <Avatar sx={{ backgroundColor: 'var(--mui-palette-warning-main)', height: '56px', width: '56px' }}>
              asd
            </Avatar>
          </Stack>
          <div>
            <LinearProgress value={value} variant="determinate" />
          </div>
        </Stack>
      </CardContent> */}
    </Card>
  );
}
