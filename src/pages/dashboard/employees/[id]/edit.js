// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// layouts
import Layout from '../../../../layouts';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import { JobEditForm } from '../../../../sections/@dashboard/job';

// ----------------------------------------------------------------------

JobEdit.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function JobEdit({ job, jobOptions }) {
  const { themeStretch } = useSettings();

  console.log('Static Props');
  console.log(job)
  console.log(jobOptions)


  return (
    <Page title="Jobs: Edit Job">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Edit job"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Jobs', href: PATH_DASHBOARD.job.root },
            { name: 'New Job' },
          ]}
        />

        <JobEditForm job={job} jobOptions={jobOptions} />
      </Container>
    </Page>
  );
}

export async function getStaticPaths() {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin-jobs`);
  const data = await req.json();

  const paths = data.map((job) => {
    return {
      params: {
        id: job.job_id.toString(),
      },
    };
  })

  return {
    paths,
    fallback: 'blocking',
  }
}


export async function getStaticProps({ params }) {

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  const [jobRes, jobOptionsRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-job/${params.id}`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/job-options`, requestOptions)
  ]);
  const [job, jobOptions] = await Promise.all([
    jobRes.json(),
    jobOptionsRes.json()
  ]);
  return { props: { job, jobOptions }, revalidate: 10, };
}
