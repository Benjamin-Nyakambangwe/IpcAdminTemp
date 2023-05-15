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
import { PodcastsNewPostForm } from '../../../sections/@dashboard/podcasts';

// ----------------------------------------------------------------------

PodcastsNewPost.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function PodcastsNewPost({ data }) {
  const { themeStretch } = useSettings();

  console.log('Static Props');
  console.log(data)

  return (
    <Page title="Podcasts: New Podcast">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Add a new podcast"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Podcasts', href: PATH_DASHBOARD.podcasts.list },
            { name: 'New Podcast' },
          ]}
        />

        <PodcastsNewPostForm data={data} />
      </Container>
    </Page>
  );
}

// export async function getStaticProps() {
//   const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/job-options`);
//   const data = await req.json();
//   console.log(req)
//   return {
//     props: {
//       data,
//     },
//   };
// }

export async function getStaticProps() {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/authors-n-categories`);
  const data = await req.json();
  console.log(req)
  return {
    props: {
      data,
    },
    revalidate: 10,
  };
}
