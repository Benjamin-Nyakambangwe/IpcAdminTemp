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
import { BlogNewPostForm } from '../../../sections/@dashboard/blog';

// ----------------------------------------------------------------------

BlogNewPost.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function BlogNewPost({ data }) {
  const { themeStretch } = useSettings();

  return (
    <Page title="Blog: New Post">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create a new post"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Blog', href: PATH_DASHBOARD.blog.root },
            { name: 'New Post' },
          ]}
        />

        <BlogNewPostForm data={data} />
      </Container>
    </Page>
  );
}


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


