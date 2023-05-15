import * as Yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
// next
import { useRouter } from 'next/router';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Grid, Card, Chip, Stack, Button, TextField, Typography, Autocomplete, MenuItem, Select } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//components
import { RHFSwitch, RHFEditor, FormProvider, RHFTextField, RHFUploadSingleFile, RHFSelect, RHFSelect2 } from '../../../components/hook-form';
//
import BlogNewPostPreview from './BlogNewPostPreview';
import FormControl from '@mui/material/FormControl';
// import { TextField, Select } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import useAuth from '../../../hooks/useAuth';





// ----------------------------------------------------------------------

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots',
];


const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export default function BlogEditPostForm({ authorsncategories, data }) {
  const { push } = useRouter();
  const { user } = useAuth();

  console.log('Articles: ', data);
  console.log('Authors and Categories: ', authorsncategories);
  const [articleId, setArticleId] = useState(data[0].article_id);
  console.log('Article ID: ', articleId);



  console.log('CONTEEEEEEEEEEEEEEEEENT', data[0])



  const [open, setOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    // description: Yup.string().required('Description is required'),
    content: Yup.string().min(1000).required('Content is required'),
    cover: Yup.mixed().required('Cover is required'),
  });



  const [defaultValues, setDefaultValues] = useState({
    title: data[0].post_title || '',
    description: data[0].description || '',
    cluster: data[0].category || '',
    author: data[0].post_author || '',
    content: data[0].post_content || '',
    // content2: data[0].content2 || '',
    cover: data[0].cover || '',
    tags: data[0].tags || '',
    publish: true,
    comments: true,
    metaTitle: data[0].meta_title || '',
    metaDescription: data[0].meta_description || '',
    metaKeywords: data[0].meta_keywords || '',
  });

  const cover = `${defaultValues.cover}`;

  const methods = useForm({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();


  const [title, setTitle] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // const onSubmit = async () => {
  //   console.log('ONSUBMIT', values)
  // }


  const [mainImage, setMainImage] = useState('');
  const handleMainImageChange = (event) => {
    console.log(event.target.files[0])
    setMainImage(event.target.files[0]);
  };


  const onSubmit = async (e) => {
    // setArticleId(data[0].article_id)

    // try {
    console.log('VALUES')
    console.log(values)
    var formdata = new FormData();

    formdata.append("post_title", values.title);
    formdata.append("post_content", values.content);
    // formdata.append("content2", values.content2);
    formdata.append("tags", values.tags);
    formdata.append("description", values.description);
    // formdata.append("author", 260);
    formdata.append("category", values.cluster.id);
    // formdata.append("meta_title", values.metaTitle);
    // formdata.append("meta_description", values.metaDescription);
    // formdata.append("meta_keywords", values.metaKeywords);

    var requestOptions = {
      method: 'PATCH',
      body: formdata,
      redirect: 'follow'
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/patch-article/${articleId}`, requestOptions)
    const data = await res.json();

    if (res.status === 200) {
      console.log(res.status)
      alert('Article Updated successfully')
      reset();
      handleClosePreview();
      enqueueSnackbar('Update Success!');
      push(PATH_DASHBOARD.blog.list);
    } else if (res.status === 400) {
      alert('Cover update failed, On your Side')
      console.log(res.status)
      enqueueSnackbar('Update Failed!');
    }
    else {
      alert('Cover update failed')
      console.log(res.status)
      enqueueSnackbar('Update Failed!');

    }

    // } catch (error) {
    //   console.error(error);
    // }
  };

  const updateCover = async () => {

    var formdata = new FormData();
    formdata.append("cover", mainImage);


    var requestOptions = {
      method: 'PATCH',
      body: formdata,
      redirect: 'follow'
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/patch-article-cover/${articleId}`, requestOptions)
    const data = await res.json();

    if (res.status === 200) {
      console.log(res.status)
      alert('Cover Updated successfully')
      reset();
      handleClosePreview();
      enqueueSnackbar('Update Success!');
      push(PATH_DASHBOARD.blog.list);
    } else if (res.status === 400) {
      alert('Cover update failed, On your Side')
      console.log(res.status)
      enqueueSnackbar('Update Failed!');
    }
    else {
      alert('Cover update failed')
      console.log(res.status)
      enqueueSnackbar('Update Failed!');

    }

  }

  useEffect(() => {

    populateCover()

  }, [])

  const populateCover = useCallback(
    (acceptedFiles) => {
      const file = {
        path: "69.png",
        preview: `${process.env.NEXT_PUBLIC_API_URL}/media/nft.png`,
        lastModified: 1659506459081,
        // lastModifiedDate: Wed Aug 03 2022 08:00:59 GMT+0200 (Central Africa Time) {},
        name: "69.png",
        size: 3017,
        type: "image/png",
        webkitRelativePath: ""
      };
      console.log(file)


      if (file) {
        setValue(
          'cover',
          Object.assign(file, {
            preview: cover,
          })
        );
      }
    },
    [setValue]
  );


  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      console.log(file)


      if (file) {
        setValue(
          'cover',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField name="title" label="Post Title" value={values.title} />

                <RHFTextField name="description" label="Description" multiline rows={3} />


                <Controller
                  name="cluster"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      freeSolo
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={authorsncategories[0].categories}
                      getOptionLabel={(option) => option.name || ""}
                      defaultValue={{
                        description: null,
                        id: 7,
                        img: "960x0.jpg",
                        link: "analytics",
                        name: "Analytics",
                        status: 1
                      }}
                      renderOption={(props, option) => {
                        return (
                          <li {...props} key={option.id}>
                            {option.name}
                          </li>
                        );
                      }}
                      renderInput={(params) => <TextField label="Cluster" {...params} />}
                    />
                  )}
                />

                <Controller
                  name="author"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      freeSolo
                      onChange={(event, newValue) => field.onChange(newValue)}
                      getOptionLabel={(option) => option.first_name + ' ' + option.last_name || ""}
                      options={authorsncategories[1].authors}
                      defaultValue={{ first_name: data[0].post_author.first_name, last_name: data[0].post_author.last_name }}
                      renderOption={(props, option) => {
                        return (
                          <li {...props} key={option.id}>
                            {option.first_name} {option.last_name}
                          </li>
                        );
                      }}
                      renderInput={(params) => <TextField label="Author" {...params} />}
                    />
                  )}
                />


                <div>
                  <LabelStyle>Content</LabelStyle>
                  <RHFEditor simple name="content" />
                </div>

                {/* <div>
                  <LabelStyle>Content2</LabelStyle>
                  <RHFEditor simple name="content2" />
                </div> */}

                {/* <div>
                  <LabelStyle>Cover</LabelStyle>
                  <RHFUploadSingleFile name="cover" accept="image/*" maxSize={3145728} onDrop={handleDrop} />
                </div> */}

              </Stack>
              <Button
                variant="contained"
                component="label"
                fullWidth
                sx={{ height: '200%', width: '100%', color: 'white', backgroundColor: 'f6f7f8' }}
              // endIcon={<CloudUploadIcon />}
              >
                Upload Cover
                <input
                  type="file"
                  hidden
                  onChange={handleMainImageChange}
                />
              </Button>
            </Card>

            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              {/* <Button fullWidth color="inherit" variant="outlined" size="large" onClick={handleOpenPreview}> */}
              <Button fullWidth color="inherit" variant="outlined" size="large" onClick={updateCover}>
                Update Cover
              </Button>
              <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                Update Article
              </LoadingButton>
            </Stack>
          </Grid>

          {/* <Grid item xs={12} md={4}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <div>
                  <RHFSwitch
                    name="publish"
                    label="Publish"
                    labelPlacement="start"
                    sx={{ mb: 1, mx: 0, width: 1, justifyContent: 'space-between' }}
                  />

                  <RHFSwitch
                    name="comments"
                    label="Enable comments"
                    labelPlacement="start"
                    sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
                  />
                </div>

                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      multiple
                      freeSolo
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={TAGS_OPTION.map((option) => option)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                        ))
                      }
                      renderInput={(params) => <TextField label="Tags" {...params} />}
                    />
                  )}
                />

                <RHFTextField name="metaTitle" label="Meta title" />

                <RHFTextField name="metaDescription" label="Meta description" fullWidth multiline rows={3} />

                <Controller
                  name="metaKeywords"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      multiple
                      freeSolo
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={TAGS_OPTION.map((option) => option)}
                      // defaultValue={data[0].meta_keywords}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                        ))
                      }
                      renderInput={(params) => <TextField label="Meta keywords" {...params} />}
                    />
                  )}
                />
              </Stack>
            </Card>

            
          </Grid> */}
        </Grid>
      </FormProvider>

      <BlogNewPostPreview
        values={values}
        isOpen={open}
        isValid={isValid}
        isSubmitting={isSubmitting}
        onClose={handleClosePreview}
        onSubmit={handleSubmit(onSubmit)}
      />
    </>
  );
}
