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

export default function BlogEdit({ articles, authorsncategories }) {
  const { themeStretch } = useSettings();

  const { query } = useRouter();

  const [currentPost, setCurrentPost] = useState([]);


  console.log('ARTICLE ON EDIT: ', articles);
  console.log('Authors and Categories: ', authorsncategories);

  return (
    <Page title="Blog: Edit">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Edit a post"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Blog', href: PATH_DASHBOARD.blog.list },
            { name: 'Blog Edit' },
          ]}
        />

        <BlogEditPostForm data={articles} authorsncategories={authorsncategories} />
      </Container>
    </Page>
  );
}

// export async function getStaticProps() {
// const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/article/?title=${title}`);
//   const data = await req.json();
//   console.log(req)
//   return {
//     props: {
//       data,
//     },
//   };
// }

export async function getStaticPaths() {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/articles`);
  const data = await req.json();

  const paths = data.map((article) => {
    return {
      params: {
        title: String(article.post_name),
      },
    };
  })

  return {
    paths,
    fallback: 'blocking',
  }
}


// export async function getStaticProps({ params }) {
//   const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/article/?title=${params.title}`);
//   const data = await req.json();

//   return {
//     props: {
//       data,
//     },
//   }
// }

export async function getStaticProps({ params }) {

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  const [articlesRes, authorsncategoriesRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/article/?post_name=${params.title}`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/authors-n-categories`, requestOptions)
  ]);
  const [articles, authorsncategories] = await Promise.all([
    articlesRes.json(),
    authorsncategoriesRes.json()
  ]);
  return { props: { articles, authorsncategories }, revalidate: 10, };
}

