import { Grid } from "@mui/material";
import { Traffic } from "../../../components/dashboard/traffic";
import { Sales } from "../../../components/dashboard/sales";
import { TotalProfit } from "../../../components/dashboard/total-profit";
import { TasksProgress } from "../../../components/dashboard/tasks-progress";
import { TotalCustomers } from "../../../components/dashboard/total-customers";
import { Budget } from "../../../components/dashboard/budget";
import { useEffect, useState } from "react";
import { getDashboardData } from "../../../services/requests/dashboard";
import { DashData } from "../../../types/problem";

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
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <div style={styles.profileSection}>
          <div style={styles.profilePicture}>
            {/* Placeholder for profile picture */}
          </div>
          <div style={styles.profileDetails}>
            <h1 style={styles.profileDetailsH1}>
              Nome da Startup <span style={styles.profileDetailsSpan}>(Setor)</span>
            </h1>
            <p>Razão Social: Nome Razão</p>
            <p>CNPJ: 00.000.000/0000-00</p>
            <p>Área de Atuação: Nome da atuação</p>
          </div>
        </div>
      </Grid>
      
      <Grid item lg={3} sm={6} xs={12}>
        <Budget diff={12} trend="up" sx={{ height: '100%' }} value="200" />
      </Grid>
      <Grid item lg={3} sm={6} xs={12}>
        <TotalCustomers diff={16} trend="down" sx={{ height: '100%' }} value={dash?.countStatusCall.count.received! || 0} />
      </Grid>
      <Grid item lg={3} sm={6} xs={12}>
        <TasksProgress sx={{ height: '100%' }} diff={22} trend="up" value={dash?.countStatusCall.count.finished! || 0} />
      </Grid>    
      <Grid item lg={8} xs={12}>
        <Sales
          chartSeries={[
            { name: 'Este mês', data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20, 34, 11, 21, 22] },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
      <Grid item lg={4} md={6} xs={12}>
        <Traffic chartSeries={traffic} labels={['Aprovado', 'Análise', 'Pendente', 'Recebido', 'Finalizado']} sx={{ height: '100%' }} />
      </Grid>
      
      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div style={styles.linksSection}>
          <a href="#" style={styles.link}>Website</a>
          <a href="#" style={styles.link}>LinkedIn</a>
          <a href="#" style={styles.link}>Instagram</a>
        </div>
      </Grid>
    </Grid>
  );
}

const styles = {
  profileSection: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
  },
  profilePicture: {
    width: '100px',
    height: '100px',
    backgroundColor: '#d8d8d8',
    borderRadius: '50%',
    marginRight: '20px',
  },
  profileDetails: {
    flexGrow: 1,
  },
  profileDetailsH1: {
    margin: 0,
    fontSize: '24px',
  },
  profileDetailsSpan: {
    fontSize: '18px',
    color: 'gray',
  },
  statisticCard: {
    backgroundColor: '#eef',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  linksSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  link: {
    margin: '5px 0',
    textDecoration: 'none',
    color: 'blue',
  },
};
