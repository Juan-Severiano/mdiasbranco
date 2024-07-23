import { useEffect, useState } from 'react';
import { Grid, Card, Avatar, Box, Typography } from '@mui/material';
import { Startup } from '../../../types/problem';
import Link from '../../../../public/link.svg'
import InstagramIcon from '@mui/icons-material/Instagram';
import WebIcon from '@mui/icons-material/Web';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useParams } from 'react-router-dom';
import { getStartupById, getStartupDetails, StartupDetails } from '../../../services/requests/startup';
import { baseURL } from '../../../config';
import { StartupCardDetails } from '../../../components/startup/startup-card';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { geocodeAddress } from '../../../lib/geocode-address';
import { Email } from '@mui/icons-material';
import { Icon } from 'leaflet';

export default function StartupPortfolio() {
  const [startup, setStartup] = useState<Startup | null>(null);
  const { id } = useParams()
  const [location, setLocation] = useState<{ lat: number, lon: number } | null>(null);
  const [details, setDetails] = useState<StartupDetails | null>(null);

  async function getStartup() {
    try {
      const response = await getStartupById(id!)
      setStartup(response)
    } catch (err) {
      console.log(err)
    }
  }

  const customIcon = new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/128/684/684908.png',
    iconSize: [38, 38],
  })

  async function getdet() {
    const res = await getStartupDetails(Number(id!))
    setDetails(res)
  }

  useEffect(() => {
    getStartup()
    getdet()
  }, [id])

  useEffect(() => {
    const getLocation = async () => {
      if (!startup?.localization) return
      try {
        const { lat, lon } = await geocodeAddress(startup?.localization!);
        setLocation({ lat, lon });
      } catch (error) {
        console.error(error);
      }
    };

    getLocation();
  }, [startup]);

  return (
    <Grid container spacing={2} sx={{ overflowX: 'hidden' }}>
      <Grid item xs={12} md={9}>
        <Card sx={{ width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              padding: '20px',
              borderRadius: '10px',
              marginBottom: '70px',
              bgcolor: 'primary.main',
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(${baseURL}/startup/attachment/${startup?.attachments?.path})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <Avatar
              alt={`${startup?.name}`}
              src={`${baseURL}/startup/attachment/${startup?.attachments?.path}`}
              sx={{
                width: 150,
                height: 150,
                left: 20,
                borderRadius: '50%',
                marginBottom: '-2px',
                transform: 'translateY(55%)',
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
            <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 'bold', margin: '0 10px', paddingLeft: '20px' }}>
              CNPJ: <span style={{ fontWeight: 'normal' }}>{startup?.cnpj}</span>
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 'bold', margin: '0 10px', paddingLeft: '30px' }}>
              Área de Atuação: <span style={{ fontWeight: 'normal' }}>{startup?.service}</span>
            </Typography>
          </Box>
          <Grid container spacing={2} sx={{ paddingLeft: '20px', paddingRight: '20px', marginBottom: '20px' }}>
            <Grid item lg={4} sm={6} xs={12}>
              <StartupCardDetails topmessage="Posição" message='Entre as mais utilizadas' trend="up" sx={{ height: '100%', background: "#f7f7fd", display: 'flex', alignItems: 'center', justifyContent: 'center' }} value={`${details?.position ?? 0}ª`} />
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <StartupCardDetails message='Socilitações Finalizadas' trend="up" sx={{ height: '100%', background: "#f7f7fd", display: 'flex', alignItems: 'center', justifyContent: 'center' }} value={String(details?.finished_calls ?? 0)} />
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <StartupCardDetails message='Colaboradores Internos' topmessage='Quadro de associados' trend="up" sx={{ height: '100%', background: "#f7f7fd", display: 'flex', alignItems: 'center', justifyContent: 'center' }} value={`${startup?.size ?? 1}`} />
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
            <a
              href={startup?.website}
              target='_blank'
              style={{
                margin: '3px 0',
                textDecoration: 'none',
                color: 'white',
                background: "#003F7D",
                padding: '10px 20px',
                paddingLeft: '10px',
                borderRadius: '5px',
                fontSize: '15px',
                width: '100%',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start'
              }}
            >
              <WebIcon style={{ marginRight: '5px' }} />
              Website
              <img src={Link} style={{ marginLeft: 'auto', filter: 'invert(1)', height: '24px', width: 'auto' }} />
            </a>
            <a
              href={`mailto:${startup?.email}`}
              target='_blank'
              style={{
                margin: '3px 0',
                textDecoration: 'none',
                color: 'white',
                background: "#003F7D",
                padding: '10px 20px',
                paddingLeft: '10px',
                borderRadius: '5px',
                fontSize: '15px',
                width: '100%',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start'
              }}
            >
              <Email style={{ marginRight: '5px' }} />
              E-mail
              <img src={Link} style={{ marginLeft: 'auto', filter: 'invert(1)', height: '24px', width: 'auto' }} />
            </a>
            <a
              href={startup?.linkedin}
              target='_blank'
              style={{
                margin: '3px 0',
                textDecoration: 'none',
                color: 'white',
                background: "#003F7D",
                padding: '10px 20px',
                paddingLeft: '10px',
                borderRadius: '5px',
                fontSize: '15px',
                width: '100%',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start'
              }}
            >
              <LinkedInIcon style={{ marginRight: '5px' }} />
              LinkedIn
              <img src={Link} style={{ marginLeft: 'auto', filter: 'invert(1)', height: '24px', width: 'auto' }} />
            </a>
            <a
              href={`https://instagram.com/${startup?.instagram}`}
              target='_blank'
              style={{
                margin: '3px 0',
                textDecoration: 'none',
                color: 'white',
                background: "#003F7D",
                padding: '10px 20px',
                paddingLeft: '10px',
                borderRadius: '5px',
                fontSize: '15px',
                width: '100%',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start'
              }}
            >
              <InstagramIcon style={{ marginRight: '5px' }} />
              Instagram
              <img src={Link} style={{ marginLeft: 'auto', filter: 'invert(1)', height: '24px', width: 'auto' }} />
            </a>
            <div style={{ width: '100%', height: '1px', backgroundColor: '#ccc', margin: '20px 0' }} />
            {location && (
              <MapContainer center={[location.lat, location.lon]} zoom={13} style={{ height: '400px', width: '100%' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker icon={customIcon} position={[location.lat, location.lon]}>
                  <Popup>
                    A localização da startup cadastrada.
                  </Popup>
                </Marker>
              </MapContainer>
            )}
            <div style={{ width: '100%', height: '1px', backgroundColor: '#ccc', margin: '20px 0' }} />
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
