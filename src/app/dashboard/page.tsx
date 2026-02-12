'use client';

// MUI Imports
import Grid from '@mui/material/Grid';

// Components Imports
import Award from '@ui/views/dashboard/Award';
import Transactions from '@ui/views/dashboard/Transactions';
import WeeklyOverview from '@ui/views/dashboard/WeeklyOverview';
import TotalEarning from '@ui/views/dashboard/TotalEarning';
import LineChart from '@ui/views/dashboard/LineChart';
import DistributedColumnChart from '@ui/views/dashboard/DistributedColumnChart';
import DepositWithdraw from '@ui/views/dashboard/DepositWithdraw';
import SalesByCountries from '@ui/views/dashboard/SalesByCountries';
import CardStatVertical from '@ui/components/card-statistics/Vertical';
import Table from '@ui/views/dashboard/Table';

const DashboardAnalytics = () => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Award />
      </Grid>
      <Grid size={{ xs: 12, md: 8, lg: 8 }}>
        <Transactions />
      </Grid>
      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <WeeklyOverview />
      </Grid>
      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <TotalEarning />
      </Grid>
      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <LineChart />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <CardStatVertical
              title="Total Profit"
              stats="$25.6k"
              avatarIcon="ri-pie-chart-2-line"
              avatarColor="secondary"
              subtitle="Weekly Profit"
              trendNumber="42%"
              trend="positive"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <CardStatVertical
              stats="862"
              trend="negative"
              trendNumber="18%"
              title="New Project"
              subtitle="Yearly Project"
              avatarColor="primary"
              avatarIcon="ri-file-word-2-line"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <DistributedColumnChart />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <SalesByCountries />
      </Grid>
      <Grid size={{ xs: 12, lg: 8 }}>
        <DepositWithdraw />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Table />
      </Grid>
    </Grid>
  );
};

export default DashboardAnalytics;
