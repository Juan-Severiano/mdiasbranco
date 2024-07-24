import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import type { SxProps } from '@mui/material/styles';
import { Startup } from '../../types/problem';
import { Avatar, ListItemText, Stack, Tooltip, Typography } from '@mui/material';
import { baseURL } from '../../config';

export interface IRankingStartups {
  position: number
  startup: Startup
  qtde: number
}

export interface LatestProductsProps {
  startups?: IRankingStartups[];
  sx?: SxProps;
}

export function RankingStartups({ startups = [], sx }: LatestProductsProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardHeader title="Ranking de Startups" />
      <Divider />
      <List>
        {startups.map((startup, index) => (
          <ListItem divider={index < startups.length - 1} key={startup?.position}>
            <Stack flexDirection='row' sx={{ width: '100%' }}>
              <Typography variant="h3" color="primary" fontWeight={600} sx={{ mr: 3 }}>
                {startup?.position} °
              </Typography>
              <ListItemAvatar>
                <Avatar src={`${baseURL}/startup/attachment/${startup?.startup?.attachments?.path}`} />
              </ListItemAvatar>
              <ListItemText
                primary={startup?.startup?.name}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                // secondary={`Sessão: ${product.sessao}, ${product.endereco.bairro_distrito}`}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
              <Tooltip title='Quantidade de chamados finalizados'>
                <Typography variant="h6" color="primary" fontWeight={600} sx={{ ml: 'auto' }}>
                  {startup?.qtde}
                </Typography>
              </Tooltip>
            </Stack>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
