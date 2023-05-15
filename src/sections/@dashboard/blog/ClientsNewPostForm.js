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



const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export default function BlogNewPostForm({ data }) {
  const { push } = useRouter();
  const { user } = useAuth();

  const [open, setOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const NewBlogSchema = Yup.object().shape({
    client: Yup.string().required('Client is required'),
  });

  const defaultValues = {
    client: '',
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
    try {
      var formdata = new FormData();
      formdata.append("client", values.client);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/add-client`, requestOptions)

      if (res.status === 200) {
        console.log(res.status)
        alert('Client created successfully')
        reset();
        handleClosePreview();
        enqueueSnackbar('Post success!');
        push(PATH_DASHBOARD.clients.list);
      } else {
        alert('CLient creation failed')
        console.log(res.status)
        enqueueSnackbar('Post Failed!');

      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField name="client" label="Client Name" />
              </Stack>
            </Card>

            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting} sx={{ minWidth: '35%' }}>
                Post
              </LoadingButton>
            </Stack>
          </Grid>

        </Grid>
      </FormProvider>
    </>
  );
}



