import { Grid } from "@mui/material";
import { Traffic } from "../../../components/dashboard/traffic";
import { Sales } from "../../../components/dashboard/sales";
import { TotalProfit } from "../../../components/dashboard/total-profit";
import { TasksProgress } from "../../../components/dashboard/tasks-progress";
import { TotalCustomers } from "../../../components/dashboard/total-customers";
import { Budget } from "../../../components/dashboard/budget";

export default function ManagerDashboard() {
  return (
    <Grid container spacing={3}>
      <Grid item lg={3} sm={6} xs={12}>
        <Budget diff={12} trend="up" sx={{ height: '100%' }} value="200" />
      </Grid>
      <Grid item lg={3} sm={6} xs={12}>
        <TotalCustomers diff={16} trend="down" sx={{ height: '100%' }} value="150" />
      </Grid>
      <Grid item lg={3} sm={6} xs={12}>
        <TasksProgress sx={{ height: '100%' }} diff={22} trend="up" value={253} />
      </Grid>
      <Grid item lg={3} sm={6} xs={12}>
        <TotalProfit sx={{ height: '100%' }} value="20k" diff={16} trend="up" />
      </Grid>
      <Grid item lg={8} xs={12}>
        <Sales
          chartSeries={[
            { name: 'This year', data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20] },
            { name: 'Last year', data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13] },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
      <Grid item lg={4} md={6} xs={12}>
        <Traffic chartSeries={[63, 15, 22]} labels={['Desktop', 'Tablet', 'Phone']} sx={{ height: '100%' }} />
      </Grid>
    </Grid>
  )
}
