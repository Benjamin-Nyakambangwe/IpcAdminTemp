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
import { BlogEditPostForm } from '../../../../sections/@dashboard/blog';

import { useState, useEffect } from 'react';



import { paramCase, capitalCase } from 'change-case';
// next
import { useRouter } from 'next/router';
// @mui
// import { Container } from '@mui/material';
// components
// import Page from '../../../../../components/Page';

// sections
// import UserNewEditForm from '../../../../../sections/@dashboard/user/UserNewEditForm';

// ----------------------------------------------------------------------

BlogEdit.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function BlogEdit({ resources, authorsncategories }) {
  const { themeStretch } = useSettings();

  const { query } = useRouter();

  const [currentPost, setCurrentPost] = useState([]);


  console.log('resources: ', resources);
  console.log('Authors and Categories: ', authorsncategories);

  return (
    <Page title="Resources: Edit">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Edit a post"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Resources', href: PATH_DASHBOARD.resources.root },
            { name: 'Resources Edit' },
          ]}
        />


        {/* <BlogEditPostForm data={resources} authorsncategories={authorsncategories} /> */}
      </Container>
    </Page>
  );
}


export async function getStaticPaths() {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/resources`);
  const data = await req.json();

  const paths = data.map((resource) => {
    return {
      params: {
        title: resource.link,
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

  const [resourcesRes, authorsncategoriesRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/resource/?title=${params.title}`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/authors-n-categories`, requestOptions)
  ]);
  const [resources, authorsncategories] = await Promise.all([
    resourcesRes.json(),
    authorsncategoriesRes.json()
  ]);
  return { props: { resources, authorsncategories }, revalidate: 10, };
}

