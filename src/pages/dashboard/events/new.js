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
import { EventsNewPostForm } from '../../../sections/@dashboard/events';

// ----------------------------------------------------------------------

EventsNewPost.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function EventsNewPost({ data }) {
  const { themeStretch } = useSettings();

  // console.log('Static Props');
  // console.log(data)

  return (
    <Page title="Events: New Event">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Add a new event"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Events', href: PATH_DASHBOARD.events.list },
            { name: 'New Event' },
          ]}
        />

        {/* <EventsNewPostForm data={data} /> */}
        <EventsNewPostForm />
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
