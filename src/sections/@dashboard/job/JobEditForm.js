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
import { email } from 'src/_mock/email';
import { groups } from 'd3-array';



// ----------------------------------------------------------------------
const TAGS_OPTION = []

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export default function JobEditorm({ job, jobOptions }) {
  const { push } = useRouter();
  const { user } = useAuth();


  console.log('Job data')
  console.log('Job Data',job)
  console.log('Job Options',jobOptions)
  console.log('USERNAME',job.consultant?.username)
  // console.log(authors)

  const [inquiryDate, setInquiryDate] = useState(new Date(job.inquiryDate))
  const [deadline, setDeadline] = useState(new Date(job.deadline))

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
    title: job.job_title || '',
    job_description: job.jobdescription || '',
    tags: ['Logan'],
    publish: true,
    show_client: job.show_client === 0 ? false : true,
    metaTitle: '',
    metaDescription: '',
    metaKeywords: ['Logan'],
    deadline: job.deadline || '',
    inquiry_date: job.inquiryDate || '',
    job_status: job.job_status || '',
    qualification: job.qualification || '',
    experience: job.experience || '',
    salary: job.salary || '',
    client: job.client || '',
    sector: job.sector || '',
    job_family: job.job_family || '',
    location: job.location || '',
    emp_level: job.employment_level || '',
    emp_type: job.employment_type || '',
    content: job.jobdescription || '',
    status: job.status || '',
    consultant: job.consultant || '',
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
    let newDeadline = new Date(deadline);


    let day = newDeadline.getDate();
    console.log(day); // 23

    let month = newDeadline.getMonth() + 1;
    console.log(month + 1); // 8

    let year = newDeadline.getFullYear();
    console.log(year); // 2022

    let dateFormat = year + "-" + month + "-" + day;
    // alert(dateFormat); // 23-7-2022

    // console.log('DEADLINE', job.deadline)

    alert('submitting')
    console.log(typeof values.status.percentage_id)
    let status = values.status.percentage_id.toString()
    let client = values.client.client_id.toString()
    let sector = values.sector.id.toString()
    let job_family = values.job_family.family_id.toString()
    let job_status = values.job_status.id.toString()
    let consultant = values.consultant.id.toString()
    let location = values.location.city_id.toString()
    let employment_type = values.emp_type.employment_type_id.toString()
    let employment_level = values.emp_level.employment_level_id.toString()


    try {
      console.log('values')
      console.log(values)
      console.log('LOCATION', values)
      // alert()
      // alert(deadline)


      var formdata = new FormData();
      // formdata.append("inquiry_date", inquiryDate);
      formdata.append("job_title", values.title);
      // formdata.append("qualification", values.qualification);
      formdata.append("experience", values.experience);
      formdata.append("salary", values.salary);
      formdata.append("jobdescription", values.content);
      // formdata.append("publish", values.publish ? 'Yes' : 'No');
      // formdata.append("show_client", values.show_client ? '0' : '1');
      formdata.append("deadline", dateFormat);
      formdata.append("client", client);
      formdata.append("sector", sector);
      formdata.append("job_family", job_family);
      formdata.append("location", location);
      formdata.append("status", status);
      formdata.append("employment_type", employment_type);
      formdata.append("employment_level", employment_level);
      formdata.append("job_status", job_status);
      formdata.append("consultant", consultant);


      var requestOptions = {
        method: 'PATCH',
        body: formdata,
        redirect: 'follow'
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/patch-job/${job.job_id}`, requestOptions)
      const data = await res.json()

      if (res.status === 200) {
        console.log(res.status)
        alert('Job updated successfully')
        reset();
        handleClosePreview();
        enqueueSnackbar('Update success!');
        push(PATH_DASHBOARD.job.list);
      } else {
        alert('Job updated failed')
        console.log(res.status)
        enqueueSnackbar('Update Failed!');

      }
    } catch (error) {
      console.error(error);
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
                      options={jobOptions[0].client}
                      getOptionLabel={(option) => option.client || ""}
                      defaultValue={{ client_id: job.client.client_id, client: job.client.client, profile: job.client.profile }}
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
                          options={jobOptions[1].sector}
                          getOptionLabel={(option) => option.sector || ""}
                          defaultValue={{ id: job.sector.id, sector: job.sector.sector }}
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
                          options={jobOptions[2].job_family}
                          getOptionLabel={(option) => option.job_family || ""}
                          defaultValue={{ family_id: job.job_family.family_id, job_family: job.job_family.job_family, img: job.job_family.img }}
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
                          options={jobOptions[3].city}
                          getOptionLabel={(option) => option.city || ""}
                          defaultValue={{ city_id: job.location.city_id, city: job.location.city, country_id: job.location.country_id }}
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
                          options={jobOptions[4].job_percentage}
                          getOptionLabel={(option) => option.job_status || ""}
                          defaultValue={{ percentage_id: job.status.percentage_id, job_percentage: job.status.job_percentage, job_status: job.status.job_status, date_time: job.status.date_time }}
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
                          options={jobOptions[6].emp_type}
                          getOptionLabel={(option) => option.employment_type || ""}
                          defaultValue={{ employment_type_id: job.employment_type.employment_type_id, employment_type: job.employment_type.employment_type }}
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
                          options={jobOptions[5].emp_level}
                          getOptionLabel={(option) => option.employment_level || ""}
                          defaultValue={{ employment_level_id: job.employment_level.employment_level_id, employment_level: job.employment_level.employment_level }}
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
                {/* <div>
                  {user?.username}
                </div> */}


                <Grid item xs={6}>
                    <Controller
                      name="consultant"
                      control={control}
                      render={({ field }) => (
                        <Autocomplete
                        fullWidth
                          freeSolo
                          onChange={(event, newValue) => field.onChange(newValue)}
                          options={jobOptions[8].consultant}
                          getOptionLabel={(option) => option.username || ""}
                          // defaultValue={{ id: job.consultant?.id, username: job.consultant?.username, email: job.consultant?.email, is_staff: job.consultant?.is_staff, email: job.consultant?.email, is_superuser: job.consultant?.is_superuser }}
                          defaultValue={{
                            date_joined: job.consultant?.date_joined,
                            email: job.consultant?.email,
                            first_name: job.consultant?.first_name,
                            // groups: job.consultant?.groups,
                            id: job.consultant?.id,
                            is_active: job.consultant?.is_active,
                            is_staff: job.consultant?.is_staff,
                            is_superuser: job.consultant?.is_superuser,
                            last_login: job.consultant?.last_login,
                            last_name: job.consultant?.last_name,
                            password: job.consultant?.password,
                            // user_permissions: job.consultant?.user_permissions,
                            username: job.consultant?.username,
                          }}
                          renderOption={(props, option) => {
                            return (
                              <li {...props} key={option.id}>
                                {option.username}
                              </li>
                            );
                          }}
                          renderInput={(params) => <TextField fullWidth label="Consultant" {...params} />}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Controller
                      name="job_status"
                      control={control}
                      render={({ field }) => (
                        <Autocomplete
                        fullWidth
                          freeSolo
                          onChange={(event, newValue) => field.onChange(newValue)}
                          options={jobOptions[7].job_status}
                          getOptionLabel={(option) => option.job_won_status || ""}
                          defaultValue={{date_time: job.job_status?.date_time, id: job.job_status?.id, job_won_status: job.job_status?.job_won_status }}
                          // defaultValue={job.job_status?.job_won_status}
                          renderOption={(props, option) => {
                            return (
                              <li {...props} key={option.id}>
                                {option.job_won_status}
                              </li>
                            );
                          }}
                          renderInput={(params) => <TextField fullWidth label="Won Status" {...params} />}
                        />
                      )}
                    />
                  </Grid>
                {/* <RHFTextField name="job_status" label="Won Status" /> */}
                <RHFTextField name="qualification" label="Qualification" />
                <RHFTextField name="experience" label="Experience" />
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
                Update Job
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



