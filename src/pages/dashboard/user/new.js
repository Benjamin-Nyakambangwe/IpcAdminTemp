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
import UserNewEditForm from '../../../sections/@dashboard/user/UserNewEditForm';

// ----------------------------------------------------------------------

UserCreate.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function UserCreate() {
  const { themeStretch } = useSettings();

  // const { query } = useRouter();

  // const { name } = query;

  return (
    <Page title="Consultant: Add a new consultant">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Add a new consultant"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Consultant', href: PATH_DASHBOARD.user.list },
            { name: 'New Consultant' },
          ]}
        />
        <UserNewEditForm />
      </Container>
    </Page>
  );
}




