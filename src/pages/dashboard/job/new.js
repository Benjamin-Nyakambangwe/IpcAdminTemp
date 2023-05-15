// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { JobNewPostForm } from '../../../sections/@dashboard/job';

// ----------------------------------------------------------------------

JobNewPost.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function JobNewPost({ data }) {
  const { themeStretch } = useSettings();

  console.log('Static Props');
  console.log(data)

  return (
    <Page title="Jobs: New Job">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Add a new job"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Jobs', href: PATH_DASHBOARD.job.list },
            { name: 'New Job' },
          ]}
        />

        <JobNewPostForm data={data} />
      </Container>
    </Page>
  );
}

export async function getStaticProps() {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/job-options`);
  const data = await req.json();
  console.log(req)
  return {
    props: {
      data,
    },
    revalidate: 10,
  };
}
