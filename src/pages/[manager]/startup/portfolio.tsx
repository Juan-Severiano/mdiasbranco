import { Grid, Card, Skeleton, CardContent, Avatar, Stack, Box } from "@mui/material";
import { Traffic } from "../../../components/dashboard/traffic";
import { Sales } from "../../../components/dashboard/sales";
import { TotalProfit } from "../../../components/dashboard/total-profit";
import { TasksProgress } from "../../../components/dashboard/tasks-progress";
import { TotalCustomers } from "../../../components/dashboard/total-customers";
import { Budget } from "../../../components/dashboard/budget";
import { useEffect, useState } from "react";
import { getDashboardData } from "../../../services/requests/dashboard";
import { DashData } from "../../../types/problem";
import coringa from "../../../../public/Status/Coringa.jpg";
import img1 from "../.../../../../../public/Status/img1.jpeg"

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
      const count = dash?.countStatusCall.count!;
      setTraffic(Object.values(count));
    }
  }, [dash]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <Card>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              padding: '20px',
              borderRadius: '10px',
              marginBottom: '50px',
              bgcolor: 'primary.main', // Cor de fundo pode ser ajustada
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(${img1})`, // Gradiente sobre a imagem de fundo
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
                borderRadius: '50%', // Deixa o perfil circular
                marginBottom: '-57px',
                
              }}
            />
            <Stack spacing={2}>
              {/* Aqui você pode adicionar outros componentes como desejado */}
            </Stack>
          </Box>
          <Grid container spacing={2}>
            <Grid item lg={4} sm={6} xs={12}>
              <Budget diff={12} trend="up" sx={{ height: '100%' }} value="200" />
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <TotalCustomers diff={16} trend="down" sx={{ height: '100%' }} value={dash?.countStatusCall.count.received! || 0} />
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <TasksProgress sx={{ height: '100%' }} diff={22} trend="up" value={dash?.countStatusCall.count.finished! || 0} />
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <a href="#" style={{ margin: '5px 0', textDecoration: 'none', color: 'blue' }}>Website</a>
          <a href="#" style={{ margin: '5px 0', textDecoration: 'none', color: 'blue' }}>LinkedIn</a>
          <a href="#" style={{ margin: '5px 0', textDecoration: 'none', color: 'blue' }}>Instagram</a>
        </div>
      </Grid>
    </Grid>
  );
}