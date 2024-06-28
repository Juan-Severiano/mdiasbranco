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
  const [dash, setDash] = useState<DashData | null>(null)
  const [traffic, setTraffic] = useState<number[]>([10, 10, 10, 10, 10])

  useEffect(() => {
    const get = async () => {
      const res = await getDashboardData()
      setDash(res)
    }
    get()
  }, [])

  useEffect(() => {
    if (dash) {
      const count = dash?.countStatusCall.count!
      setTraffic(Object.values(count))
    }
  }, [dash])

  return (
    <Grid container spacing={3}>
      <Grid item lg={3} sm={6} xs={12}>
        <Budget diff={12} trend="up" sx={{ height: '100%' }} value="200" />
      </Grid>
      <Grid item lg={3} sm={6} xs={12}>
        <TotalCustomers diff={16} trend="down" sx={{ height: '100%' }} value={dash?.countStatusCall.count.received! || 0} />
      </Grid>
      <Grid item lg={3} sm={6} xs={12}>
        <TasksProgress sx={{ height: '100%' }} diff={22} trend="up" value={dash?.countStatusCall.count.finished! || 0} />
      </Grid>
      <Grid item lg={3} sm={6} xs={12}>
        <TotalProfit sx={{ height: '100%' }} value={dash?.countUsers.count! || 0} diff={16} trend="up" />
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
    </Grid>
  )
}
