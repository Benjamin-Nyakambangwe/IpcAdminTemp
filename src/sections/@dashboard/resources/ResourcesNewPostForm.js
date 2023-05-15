import * as Yup from 'yup';
import { useCallback, useState } from 'react';
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

export default function ResourcesNewPostForm({ data }) {
  const { push } = useRouter();
  const { user } = useAuth();

  const [resourceFile, setResourceFile] = useState('');

  const handleResourceFileChange = (event) => {
    console.log(event.target.files[0])
    setResourceFile(event.target.files[0]);
  };

  console.log('Articles data')
  console.log(data)
  // console.log(authors)

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
    description: Yup.string().required('Description is required'),
    content: Yup.string().min(1000).required('Content is required'),
    cover: Yup.mixed().required('Cover is required'),
  });

  const defaultValues = {
    title: '',
    description: '',
    cluster: '',
    author: '',
    resources_types: '',
    content: '',
    cover: null,
    infographic: null,
    resourceFile: null,
    tags: ['Logan'],
    publish: true,
    comments: true,
    metaTitle: '',
    metaDescription: '',
    metaKeywords: ['Logan'],
  };

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

  const onSubmit = () => {

  }


  const submit = async (e) => {
    console.log('VALUES', values)





    function slugify(text) {
      return text
        .toString()                           // Cast to string (optional)
        .normalize('NFKD')            // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
        .toLowerCase()                  // Convert the string to lowercase letters
        .trim()                                  // Remove whitespace from both sides of a string (optional)
        .replace(/\s+/g, '-')            // Replace spaces with -
        .replace(/[^\w\-]+/g, '')     // Remove all non-word chars
        .replace(/\-\-+/g, '-');        // Replace multiple - with single -
    }


    // formdata.append("user_type", "1");
    // formdata.append("title", values.title);
    // formdata.append("content", values.content);
    // formdata.append("embed", "");
    // formdata.append("content2", "");
    // formdata.append("tags", values.tags);
    // formdata.append("link", slugify(values.title));
    // formdata.append("photo", "img");
    // formdata.append("status", "1");
    // formdata.append("views", "0");
    // formdata.append("meta_description", values.metaDescription);
    // formdata.append("summary", "");

    // formdata.append("user", user.id);
    // formdata.append("cover", values.cover);
    // formdata.append("meta_title", values.metaTitle);
    // formdata.append("meta_description", values.metaDescription);
    // formdata.append("publisher", user.id);
    // formdata.append("date", "2017-04-11T20:00:00Z");
    // formdata.append("updated_time", "2022-07-03T02:31:08Z");
    // formdata.append("meta_keywords", values.metaKeywords);

    var formdata = new FormData();
    // formdata.append("id", "3000");
    formdata.append("author", values.author.admin_id);
    formdata.append("resources_type", values.resources_types.id);
    formdata.append("category", values.cluster.id);
    formdata.append("title", values.title);
    formdata.append("execsummary", values.content);
    formdata.append("tags", values.tags);
    formdata.append("meta_description", values.metaDescription);
    formdata.append("link", slugify(values.title));
    formdata.append("user", user.id);
    formdata.append("cover", values.cover);
    formdata.append("pdf_file", resourceFile);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/add-resource`, requestOptions)
    const data = res.json()
    console.log(data)

    if (res.status == 200) {
      alert("Resource Added")
    }

  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

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

  const handleDropInfographic = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'infographic',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const handleDropFile = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'resourceFile',
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
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField name="title" label="Post Title" />

                {/* <RHFTextField name="description" label="Description" multiline rows={3} /> */}
                <Controller
                  name="resources_types"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      freeSolo
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={data[2].resources_types}
                      getOptionLabel={(option) => option.name || ""}
                      renderOption={(props, option) => {
                        return (
                          <li {...props} key={option.id}>
                            {option.name}
                          </li>
                        );
                      }}
                      renderInput={(params) => <TextField label="Types" {...params} />}
                    />
                  )}
                />

                <Controller
                  name="cluster"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      freeSolo
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={data[0].categories}
                      getOptionLabel={(option) => option.name || ""}
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
                      getOptionLabel={(option) => option.first_name + option.last_name || ""}
                      options={data[1].authors}
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
                  <LabelStyle>Exec Summary</LabelStyle>
                  <RHFEditor simple name="content" />
                </div>

                <div>
                  <LabelStyle>Cover</LabelStyle>
                  <RHFUploadSingleFile name="cover" accept="image/*" maxSize={3145728} onDrop={handleDrop} />
                </div>


                {/* <div>
                  <LabelStyle>Infographic</LabelStyle>
                  <RHFUploadSingleFile name="infographic" accept="image/*" maxSize={3145728} onDrop={handleDropInfographic} />
                </div>

                <div>
                  <LabelStyle>Resource File</LabelStyle>
                  <RHFUploadSingleFile name="resourceFile" accept="pdf/*" onDrop={handleDropFile} />
                </div> */}

              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
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

                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  sx={{ height: '100%', }}
                >
                  Upload Resource File
                  <input
                    type="file"
                    hidden
                    onChange={handleResourceFileChange}
                  />
                </Button>


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

            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              <Button fullWidth color="inherit" variant="outlined" size="large" onClick={handleOpenPreview}>
                Preview
              </Button>
              <LoadingButton fullWidth onClick={submit} variant="contained" size="large" loading={isSubmitting}>
                Post
              </LoadingButton>
            </Stack>
          </Grid>
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



