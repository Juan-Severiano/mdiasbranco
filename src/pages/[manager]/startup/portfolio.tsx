import React, { useEffect, useState } from 'react';
import { Grid, Card, Avatar, Box, Typography } from '@mui/material';
import { TasksProgress } from '../../../components/dashboard/tasks-progress';
import { TotalCustomers } from '../../../components/dashboard/total-customers';
import { Budget } from '../../../components/dashboard/budget';
import { getDashboardData } from '../../../services/requests/dashboard';
import { DashData } from '../../../types/problem';
import coringa from '../../../../public/Status/Coringa.jpg';
import img1 from '../../../../public/Status/img1.jpeg';

export default function ManagerDashboard() {
  const [dash, setDash] = useState<DashData | null>(null);
  const [traffic, setTraffic] = useState<number[]>([10, 10, 10, 10, 10]);

  useEffect(() => {
    const get = async () => {
      const res = await getDashboardData();
      setDash(res);
    };
    get();
  }, []);

  useEffect(() => {
    if (dash) {
      const count = dash.countStatusCall.count!;
      setTraffic(Object.values(count));
    }
  }, [dash]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Card sx={{ padding: '20px' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              padding: '20px',
              borderRadius: '10px',
              marginBottom: '50px',
              bgcolor: 'primary.main',
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(${img1})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <Avatar
              alt="Coringa"
              src={coringa}
              sx={{
                width: 150,
                height: 150,
                left: 20,
                borderRadius: '50%',
                marginBottom: '-50px',
              }}
            />
          </Box>
          <Grid container spacing={2} justifyContent="flex-start" alignItems="center">
            <Grid item>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4">Nome da Startup</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6">(Setor)</Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12}>
              <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={4}>
                  <Box sx={{ padding: '10px', backgroundColor: 'lightgray', borderRadius: '5px', textAlign: 'center', margin: '5px' }}>
                    <Typography variant="body2" fontSize="0.8rem">Razão Social: Nome Razão</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ padding: '10px', backgroundColor: 'lightgray', borderRadius: '5px', textAlign: 'center', margin: '5px' }}>
                    <Typography variant="body2" fontSize="0.8rem">CNPJ: 00.000.000/0000-00</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ padding: '10px', backgroundColor: 'lightgray', borderRadius: '5px', textAlign: 'center', margin: '5px' }}>
                    <Typography variant="body2" fontSize="0.8rem">Área de Atuação: Nome da atuação</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item lg={4} sm={6} xs={12}>
              <Budget diff={12} trend="up" sx={{ height: '100%' }} value="200" />
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <TotalCustomers diff={16} trend="down" sx={{ height: '100%' }} value={dash?.countStatusCall.count.received || 0} />
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <TasksProgress sx={{ height: '100%' }} diff={22} trend="up" value={dash?.countStatusCall.count.finished || 0} />
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px 40px',
              borderRadius: '10px',
              bgcolor: 'background.default',
              width: '100%',
            }}
          >
            <a href="#" style={{ margin: '3px 0', textDecoration: 'none', color: 'blue', background: 'rgba(0, 0, 255, 0.1)', padding: '10px 20px', borderRadius: '5px', fontSize: '16px', width: '100%', textAlign: 'center' }}>Website</a>
            <a href="#" style={{ margin: '3px 0', textDecoration: 'none', color: 'blue', background: 'rgba(0, 0, 255, 0.1)', padding: '10px 20px', borderRadius: '5px', fontSize: '16px', width: '100%', textAlign: 'center' }}>LinkedIn</a>
            <a href="#" style={{ margin: '3px 0', textDecoration: 'none', color: 'blue', background: 'rgba(0, 0, 255, 0.1)', padding: '10px 20px', borderRadius: '5px', fontSize: '16px', width: '100%', textAlign: 'center' }}>Instagram</a>
            <div style={{ width: '100%', height: '1px', backgroundColor: '#ccc', margin: '20px 0' }} />
            <iframe
              title="Mapa"
              width="100%"
              height="155"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15931.810043721269!2d-39.841159468339214!3d-3.3617796248803655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c02d4be71cab27%3A0x76f1d2207639ec62!2sAmontada%2C%20CE%2C%2062500-000!5e0!3m2!1spt-BR!2sbr!4v1720024815652!5m2!1spt-BR!2sbr"
              frameBorder="0"
              style={{ border: '1px solid #ccc', borderRadius: '10px', overflow: 'hidden' }}
              aria-hidden="false"
            ></iframe>
            <div style={{ width: '100%', height: '1px', backgroundColor: '#ccc', margin: '20px 0' }} />
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
