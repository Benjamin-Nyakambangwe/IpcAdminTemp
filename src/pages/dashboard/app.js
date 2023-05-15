// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Stack, Button } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// _mock_
import { _appFeatured, _appAuthors, _appInstalled, _appRelated, _appInvoices } from '../../_mock';
// components
import Page from '../../components/Page';
// sections
import {
  AppWidget,
  AppWelcome,
  AppFeatured,
  AppNewInvoice,
  AppTopAuthors,
  AppTopRelated,
  AppAreaInstalled,
  AppWidgetSummary,
  AppCurrentDownload,
  AppTopInstalledCountries,
} from '../../sections/@dashboard/general/app';
// assets
import { SeoIllustration } from '../../assets';

import { useRouter } from 'next/router';
import { PATH_DASHBOARD } from '../../routes/paths';
import { useEffect, useState } from 'react';




// ----------------------------------------------------------------------

GeneralApp.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function GeneralApp({ data }) {
  const { user } = useAuth();
  const { push } = useRouter();


  // alert(user.username)
  console.log(data)
  console.log('USER', user)
  console.log(user.first_name)
  const { articles, consultants, jobs } = data;

  const theme = useTheme();

  const { themeStretch } = useSettings();
const[stats, setStats] = useState([])

  useEffect(()=>{
    const getStats=async()=> {
    var formdata = new FormData();
formdata.append("user_id", user.user_id);

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/personal-jobs`, requestOptions)
const data = await res.json()
setStats(data)

}

getStats()
  }, [])


  console.log('STATS', (stats[0]?.won.length / stats[3]?.total.length) * 100)
  const ArtNJobBtn = () => {
    return (
      <>
        <Button onClick={() => push(PATH_DASHBOARD.blog.new)} variant="contained" sx={{ marginRight: '15px' }}>Add Article</Button>
        <Button onClick={() => push(PATH_DASHBOARD.job.new)} variant="contained">Add Job</Button>
      </>
    )
  }

  const SuccessRateBtn = () => {
    return (
      <>
        <Button variant="contained">User Success Rate:    {(stats[0]?.won.length / stats[3]?.total.length) * 100}%</Button>
      </>
    )
  }

  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <AppWelcome
              title={`Welcome back! \n ${user?.username} `}
              description="This is the starting page for the Human Capital Hub Admin"
              img={
                <SeoIllustration
                  sx={{
                    p: 3,
                    width: 360,
                    margin: { xs: 'auto', md: 'inherit' },
                  }}
                />
              }
              action={<ArtNJobBtn />}
              action2={<SuccessRateBtn />}
            />

          </Grid>

          {/* <Grid item xs={12} md={4}>
            <AppFeatured list={_appFeatured} />
          </Grid> */}

<Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Active Jobs"
              percent={2.6}
              total={stats[2]?.active.length}
              chartColor={theme.palette.primary.main}
              chartData={[5, 18, 12, 51, 68, 11, 39, 37, 27, 20]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Won Jobs"
              percent={0.2}
              total={stats[0]?.won.length}
              chartColor={theme.palette.chart.blue[0]}
              chartData={[20, 41, 63, 33, 28, 35, 50, 46, 11, 26]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Lost jobs"
              percent={-0.1}
              total={stats[1]?.lost.length}
              chartColor={theme.palette.chart.red[0]}
              chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
            />
          </Grid>



          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total Jobs"
              percent={2.6}
              total={jobs}
              chartColor={theme.palette.primary.main}
              chartData={[5, 18, 12, 51, 68, 11, 39, 37, 27, 20]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total Articles"
              percent={0.2}
              total={articles}
              chartColor={theme.palette.chart.blue[0]}
              chartData={[20, 41, 63, 33, 28, 35, 50, 46, 11, 26]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total Users"
              percent={-0.1}
              total={consultants}
              chartColor={theme.palette.chart.red[0]}
              chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentDownload
              title="Current Stats"
              chartColors={[
                theme.palette.primary.lighter,
                theme.palette.primary.light,
                theme.palette.primary.main,
                theme.palette.primary.dark,
              ]}
              chartData={[
                { label: 'Articles', value: 12244 },
                { label: 'White Papers', value: 53345 },
                { label: 'Research', value: 44313 },
                { label: 'Case Studies', value: 78343 },
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppAreaInstalled
              title="Page Insights"
              subheader="(+43%) than last year"
              chartLabels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']}
              chartData={[
                {
                  year: '2019',
                  data: [
                    { name: 'Asia', data: [10, 41, 35, 51, 49, 62, 69, 91, 148] },
                    { name: 'America', data: [10, 34, 13, 56, 77, 88, 99, 77, 45] },
                  ],
                },
                {
                  year: '2020',
                  data: [
                    { name: 'Asia', data: [148, 91, 69, 62, 49, 51, 35, 41, 10] },
                    { name: 'America', data: [45, 77, 99, 88, 77, 56, 13, 34, 10] },
                  ],
                },
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} lg={8}>
            <AppNewInvoice
              title="New Invoice"
              tableData={_appInvoices}
              tableLabels={[
                { id: 'id', label: 'Invoice ID' },
                { id: 'category', label: 'Category' },
                { id: 'price', label: 'Price' },
                { id: 'status', label: 'Status' },
                { id: '' },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopRelated title="Top Related Applications" list={_appRelated} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopInstalledCountries title="Top Installed Countries" list={_appInstalled} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopAuthors title="Top Authors" list={_appAuthors} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Stack spacing={3}>
              <AppWidget title="Conversion" total={38566} icon={'eva:person-fill'} chartData={48} />
              <AppWidget title="Applications" total={55566} icon={'eva:email-fill'} color="warning" chartData={75} />
            </Stack>
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}



export async function getStaticProps() {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/length`);
  const data = await req.json();
  return {
    props: {
      data,
    },
    revalidate: 360
  };
}