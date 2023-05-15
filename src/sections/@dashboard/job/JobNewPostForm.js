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
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//
import BlogNewPostPreview from './BlogNewPostPreview';
import FormControl from '@mui/material/FormControl';
// import { TextField, Select } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import useAuth from '../../../hooks/useAuth';



// ----------------------------------------------------------------------
const TAGS_OPTION = []

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export default function JobNewPostForm({ data }) {
  const { push } = useRouter();
  const { user } = useAuth();


  console.log('Articles data')
  console.log(data)
  // console.log(authors)

  const [inquiryDate, setInquiryDate] = useState(new Date())
  const [deadline, setDeadline] = useState(new Date())

  const handleChangeInquiryDate = (newValue) => {
    setInquiryDate(newValue);
  };
  const handleChangeDeadline = (newValue) => {
    setDeadline(newValue);
  };

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
    // content: Yup.string().min(1000).required('Content is required'),
    job_description: Yup.string().min(200).required('Content is required'),
    cover: Yup.mixed().required('Cover is required'),
  });

  const defaultValues = {
    title: '',
    job_description: '',
    tags: ['Logan'],
    publish: true,
    show_client: false,
    metaTitle: '',
    metaDescription: '',
    metaKeywords: ['Logan'],
    deadline: '',
    inquiry_date: '',
    qualification: '',
    experience: '',
    salary: '',
    client: '',
    sector: '',
    job_family: '',
    location: '',
    emp_level: '',
    emp_type: '',
    content: '',
    city: '',
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



  const onSubmit = async (e) => {

    // alert('submitting')
    let newDeadline = new Date(deadline);


    let day = newDeadline.getDate();
    console.log(day); // 23

    let month = newDeadline.getMonth() + 1;
    console.log(month + 1); // 8

    let year = newDeadline.getFullYear();
    console.log(year); // 2022

    let dateFormat = year + "-" + month + "-" + day;
    // alert(dateFormat); // 23-7-2022

    try {
      console.log('values')
      console.log(values)
      // alert(deadline)

      var formdata = new FormData();
      // formdata.append("inquiry_date", '2017-01-16T20:00:00Z');
      formdata.append("job_title", values.title);
      // formdata.append("qualification", values.qualification);
      formdata.append("qualification", 'N/A');
      formdata.append("experience", values.experience);
      formdata.append("salary", values.salary);
      formdata.append("jobdescription", values.content);
      formdata.append("jobadvert", "None");
      formdata.append("no_of_vacancies", "0");
      formdata.append("gender", "All");
      formdata.append("publish", values.publish ? 'Yes' : 'No');
      formdata.append("show_client", values.show_client ? '0' : '1');
      formdata.append("deadline", dateFormat);
      // formdata.append("deadline", deadline);
      formdata.append("client", values.client.client_id);
      formdata.append("sector", values.sector.id);
      formdata.append("job_family", values.job_family.family_id);
      formdata.append("location", values.location.city_id);
      formdata.append("status", values.status.percentage_id);
      formdata.append("employment_type", values.emp_type.employment_type_id);
      formdata.append("employment_level", values.emp_level.employment_level_id);
      formdata.append("consultant", user.user_id);
      formdata.append("job_status", 3);
      // formdata.append("job_id", "10000444");

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/add-job`, requestOptions)
      const data = await res.json()


      if (res.status === 200) {
        console.log(res.status)
        alert('Job created successfully')
        reset();
        handleClosePreview();
        enqueueSnackbar('Post success!');
        push(PATH_DASHBOARD.job.list);
      } else {
        alert('Job creation failed')
        console.log(res.status)
        enqueueSnackbar('Post Failed!');

      }
    } catch (error) {
      console.error(error);
    }



    // let date4 = new Date(deadline).toLocaleDateString('en-GB', {
    //   year: 'numeric', month: '2-digit', day: '2-digit'
    // })
    // alert(date4)

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

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField name="title" label="Job Title" />
                <Controller
                  name="client"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      freeSolo
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={data[0].client}
                      getOptionLabel={(option) => option.client || ""}
                      renderOption={(props, option) => {
                        return (
                          <li {...props} key={option.id}>
                            {option.client}
                          </li>
                        );
                      }}
                      renderInput={(params) => <TextField label="Client" {...params} />}
                    />
                  )}
                />
                <Grid container spacing={.35} justifyContent="center"
                  alignItems="center">
                  <Grid item xs={6}>
                    <Controller
                      name="sector"
                      control={control}
                      render={({ field }) => (
                        <Autocomplete
                          freeSolo
                          onChange={(event, newValue) => field.onChange(newValue)}
                          options={data[1].sector}
                          getOptionLabel={(option) => option.sector || ""}
                          renderOption={(props, option) => {
                            return (
                              <li {...props} key={option.id}>
                                {option.sector}
                              </li>
                            );
                          }}
                          renderInput={(params) => <TextField label="Sector" {...params} />}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controller
                      name="job_family"
                      control={control}
                      render={({ field }) => (
                        <Autocomplete
                          freeSolo
                          onChange={(event, newValue) => field.onChange(newValue)}
                          options={data[2].job_family}
                          getOptionLabel={(option) => option.job_family || ""}
                          renderOption={(props, option) => {
                            return (
                              <li {...props} key={option.id}>
                                {option.job_family}
                              </li>
                            );
                          }}
                          renderInput={(params) => <TextField label="Job Family" {...params} />}
                        />
                      )}
                    />
                  </Grid>

                </Grid>


                <Grid container spacing={.35} justifyContent="center"
                  alignItems="center">
                  <Grid item xs={6}>
                    <Controller
                      name="location"
                      control={control}
                      render={({ field }) => (
                        <Autocomplete
                          freeSolo
                          onChange={(event, newValue) => field.onChange(newValue)}
                          options={data[3].city}
                          getOptionLabel={(option) => option.city || ""}
                          renderOption={(props, option) => {
                            return (
                              <li {...props} key={option.id}>
                                {option.city}
                              </li>
                            );
                          }}
                          renderInput={(params) => <TextField label="Location" {...params} />}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controller
                      name="status"
                      control={control}
                      render={({ field }) => (
                        <Autocomplete
                          freeSolo
                          onChange={(event, newValue) => field.onChange(newValue)}
                          options={data[4].job_percentage}
                          getOptionLabel={(option) => option.job_status || ""}
                          renderOption={(props, option) => {
                            return (
                              <li {...props} key={option.id}>
                                {option.job_status}
                              </li>
                            );
                          }}
                          renderInput={(params) => <TextField label="Status" {...params} />}
                        />
                      )}
                    />
                  </Grid>

                </Grid>



                <Grid container spacing={.35} justifyContent="center"
                  alignItems="center">
                  <Grid item xs={6}>
                    <Controller
                      name="emp_type"
                      control={control}
                      render={({ field }) => (
                        <Autocomplete
                          freeSolo
                          onChange={(event, newValue) => field.onChange(newValue)}
                          options={data[6].emp_type}
                          getOptionLabel={(option) => option.employment_type || ""}
                          renderOption={(props, option) => {
                            return (
                              <li {...props} key={option.id}>
                                {option.employment_type}
                              </li>
                            );
                          }}
                          renderInput={(params) => <TextField label="Employment Type" {...params} />}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controller
                      name="emp_level"
                      control={control}
                      render={({ field }) => (
                        <Autocomplete
                          freeSolo
                          onChange={(event, newValue) => field.onChange(newValue)}
                          options={data[5].emp_level}
                          getOptionLabel={(option) => option.employment_level || ""}
                          renderOption={(props, option) => {
                            return (
                              <li {...props} key={option.id}>
                                {option.employment_level}
                              </li>
                            );
                          }}
                          renderInput={(params) => <TextField label="Employment Level" {...params} />}
                        />
                      )}
                    />
                  </Grid>

                </Grid>


                {/* <RHFTextField name="description" label="Description" multiline rows={3} /> */}


                <div>
                  <LabelStyle>Job Description</LabelStyle>
                  <RHFEditor simple name="content" />
                </div>

                {/* <div>
                  <LabelStyle>Cover</LabelStyle>
                  <RHFUploadSingleFile name="cover" accept="image/*" maxSize={3145728} onDrop={handleDrop} />
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
                    name="show_client"
                    label="Show Client"
                    labelPlacement="start"
                    sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
                  />
                </div>

                {/* <RHFTextField name="qualification" label="Qualification" /> */}
                <RHFTextField name="experience" label="Experience" helperText="Experience should be just a digit only" />
                <RHFTextField name="salary" label="Salary" />
                <LocalizationProvider dateAdapter={AdapterDateFns}>

                  {/* <MobileDatePicker
                    label="Inquiry Date"
                    inputFormat="yyyy/MM/dd"
                    value={inquiryDate}
                    onChange={handleChangeInquiryDate}
                    renderInput={(params) => <TextField {...params} />}
                  /> */}


                  <MobileDatePicker
                    label="Deadline"
                    inputFormat="yyyy/MM/dd"
                    value={deadline}
                    onChange={handleChangeDeadline}
                    renderInput={(params) => <TextField {...params} />}
                  />

                </LocalizationProvider>



                {/* <RHFTextField name="metaTitle" label="Meta title" /> */}

                {/* <RHFTextField name="metaDescription" label="Meta description" fullWidth multiline rows={3} /> */}

              </Stack>
            </Card>

            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              {/* <Button fullWidth color="inherit" variant="outlined" size="large" onClick={handleOpenPreview}>
                Preview
              </Button> */}
              <LoadingButton fullWidth type="submit" onClick={onSubmit} variant="contained" size="large" loading={isSubmitting}>
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



