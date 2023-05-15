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
import { VideosNewPostForm } from '../../../sections/@dashboard/videos';

// import { VideosTableRow } from '../../../sections/@dashboard/videos';

// ----------------------------------------------------------------------

VideoNewPost.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function VideoNewPost({ data }) {
  const { themeStretch } = useSettings();

  console.log('Static Props');
  console.log(data)

  return (
    <Page title="Videos: New Video">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Add a new video"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Videos', href: PATH_DASHBOARD.videos.list },
            { name: 'New Video' },
          ]}
        />

        <VideosNewPostForm data={data} />
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
