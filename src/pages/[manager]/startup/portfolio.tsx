import { useEffect, useState } from 'react';
import { Grid, Card, Avatar, Box, Typography } from '@mui/material';
import { TasksProgress } from '../../../components/dashboard/tasks-progress';
import { TotalCustomers } from '../../../components/dashboard/total-customers';
import { Budget } from '../../../components/dashboard/budget';
import { getDashboardData } from '../../../services/requests/dashboard';
import { DashData, Startup } from '../../../types/problem';
import img2 from '../../../../public/img2.jpg'
import InstagramIcon from '@mui/icons-material/Instagram';
import WebIcon from '@mui/icons-material/Web';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useParams } from 'react-router-dom';
import { getStartupById } from '../../../services/requests/startup';
import { baseURL } from '../../../config';

export default function ManagerDashboard() {
  const [dash, setDash] = useState<DashData | null>(null);
  const [startup, setStartup] = useState<Startup | null>(null);
  const { id } = useParams()

  async function getStartup() {
    try {
      const response = await getStartupById(id!)
      setStartup(response)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getStartup()
  }, [getStartup, id])
  
  useEffect(() => {
    const get = async () => {
      const res = await getDashboardData();
      setDash(res);
    };
    get();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={9}>
        <Card>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              padding: '20px',
              borderRadius: '10px',
              marginBottom: '70px',
              bgcolor: 'primary.main',
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(${img2})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <Avatar
              alt="Coringa"
              src={`${baseURL}/startup/attachment/${startup?.attachments.path.split('\\')[1]}`}
              sx={{
                width: 150,
                height: 150,
                left: 20,
                borderRadius: '50%',
                marginBottom: '-38px',
                transform: 'translateY(27%)',
              }}
            />
          </Box>
          <Grid container spacing={2} justifyContent="flex-start" alignItems="center" sx={{ paddingLeft: '25px', paddingRight: '20px', marginBottom: '20px' }}>
            <Grid item>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: '#003F7D' }}>{startup?.name ?? 'Nome'}</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box sx={{ textAlign: 'center', marginTop: '10px' }}>
                <Typography variant="h6" sx={{ color: '#7A8995' }}>{startup?.sector}</Typography>
              </Box>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px',
              backgroundColor: '#f7f7fd',
              borderRadius: '10px',
              margin: '20px 20px',
              fontSize: '0.9rem',
              fontWeight: '500',
              color: '#3F3D56',
            }}
          >
            <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 'bold', margin: '0 10px', paddingLeft: '10px' }}>
              Razão Social: <span style={{ fontWeight: 'normal' }}>{startup?.corporate_reason}</span>
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 'bold', margin: '0 10px', paddingLeft: '60px' }}>
              CNPJ: <span style={{ fontWeight: 'normal' }}>{startup?.cnpj}</span>
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 'bold', margin: '0 10px', paddingLeft: '30px' }}>
              Área de Atuação: <span style={{ fontWeight: 'normal' }}>{startup?.service}</span>
            </Typography>
          </Box>
          <Grid container spacing={2} sx={{ paddingLeft: '20px', paddingRight: '20px', marginBottom: '20px' }}>
            <Grid item lg={4} sm={8} xs={12}>
              <Budget diff={12} trend="up" sx={{ height: '100%', background: "#f7f7fd", display: 'flex', alignItems: 'center', justifyContent: 'center' }} value="200" />
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <TotalCustomers diff={16} trend="down" sx={{ height: '100%', background: "#f7f7fd", display: 'flex', alignItems: 'center', justifyContent: 'center' }} value={dash?.countStatusCall.count.received || 0} />
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <TasksProgress sx={{ height: '100%', background: "#f7f7fd", display: 'flex', alignItems: 'center', justifyContent: 'center' }} diff={22} trend="up" value={dash?.countStatusCall.count.finished || 0} />
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
            <a href={startup?.website} target='_blank' style={{ margin: '3px 0', textDecoration: 'none', color: 'blue', background: "#f7f7fd", padding: '10px 20px', borderRadius: '5px', fontSize: '16px', width: '100%', textAlign: 'center' }}>
              <WebIcon style={{ verticalAlign: 'middle', marginRight: '8px' }} />
              Website
            </a>
            <a href={startup?.linkedin} target='_blank' style={{ margin: '3px 0', textDecoration: 'none', color: 'blue', background: "#f7f7fd", padding: '10px 20px', borderRadius: '5px', fontSize: '16px', width: '100%', textAlign: 'center' }}>
              <LinkedInIcon style={{ verticalAlign: 'middle', marginRight: '8px' }} />
              LinkedIn
            </a>
            <a href={startup?.linkedin} target='_blank' style={{ margin: '3px 0', textDecoration: 'none', color: 'blue', background: "#f7f7fd", padding: '10px 20px', borderRadius: '5px', fontSize: '16px', width: '100%', textAlign: 'center' }}>
              <InstagramIcon style={{ verticalAlign: 'middle', marginRight: '8px' }} />
              Instagram
            </a>
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
