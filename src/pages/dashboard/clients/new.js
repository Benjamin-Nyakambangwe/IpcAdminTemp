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
import { ClientsNewPostForm } from '../../../sections/@dashboard/blog';

// ----------------------------------------------------------------------

ClientsNewPost.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function ClientsNewPost({ data }) {
  const { themeStretch } = useSettings();

  return (
    <Page title="Clients: Add New">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Add a new client"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Clients', href: PATH_DASHBOARD.clients.root },
            { name: 'New Post' },
          ]}
        />

        <ClientsNewPostForm />
      </Container>
    </Page>
  );
}


