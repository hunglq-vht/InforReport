import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosInstance } from 'src/utils/axiosInstance';

export const UserDialog = (props) => {
  const { setOpenCreate, setIsRefetch } = props;

  const { t } = useTranslation();

  const [currentUserInfo, setCurrentUserInfo] = useState({
    username: '',
    password: '',
    identityCard: '',
    phoneNumber: '',
    fullName: '',
    address: '',
    email: '',
    department: '',
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setCurrentUserInfo({
      ...currentUserInfo,
      [name]: value,
    });
  };

  const onClickCancel = () => {
    setOpenCreate(false);
  };

  const onClickSubmit = () => {
    console.log(currentUserInfo);
    axiosInstance.post('/auth/register', currentUserInfo).then(() => {
      toast.success(t('user.create.success'));
      setIsRefetch(true);
      setOpenCreate(false);
    });
  };

  return (
    <>
      <Dialog open onClose={onClickCancel}>
        <DialogTitle>{t('user.create')}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ alignItems: 'center' }} mb={2}>
            <Grid item xs={6}>
              <Typography>{t('username')}</Typography>
            </Grid>
            <Grid item xs={6}>
              <OutlinedInput
                fullWidth
                name="username"
                sx={{ height: '40px' }}
                value={currentUserInfo.username}
                onChange={onChangeInput}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ alignItems: 'center' }} mb={2}>
            <Grid item xs={6}>
              <Typography>{t('password')}</Typography>
            </Grid>
            <Grid item xs={6}>
              <OutlinedInput
                fullWidth
                name="password"
                sx={{ height: '40px' }}
                value={currentUserInfo.password}
                onChange={onChangeInput}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ alignItems: 'center' }} mb={2}>
            <Grid item xs={6}>
              <Typography>{t('fullName')}</Typography>
            </Grid>
            <Grid item xs={6}>
              <OutlinedInput
                fullWidth
                name="fullName"
                sx={{ height: '40px' }}
                value={currentUserInfo.fullName}
                onChange={onChangeInput}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ alignItems: 'center' }} mb={2}>
            <Grid item xs={6}>
              <Typography>{t('identityCard')}</Typography>
            </Grid>
            <Grid item xs={6}>
              <OutlinedInput
                fullWidth
                name="identityCard"
                sx={{ height: '40px' }}
                value={currentUserInfo.identityCard}
                onChange={onChangeInput}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ alignItems: 'center' }} mb={2}>
            <Grid item xs={6}>
              <Typography>{t('department')}</Typography>
            </Grid>
            <Grid item xs={6}>
              <OutlinedInput
                fullWidth
                name="department"
                sx={{ height: '40px' }}
                value={currentUserInfo.department}
                onChange={onChangeInput}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ alignItems: 'center' }} mb={2}>
            <Grid item xs={6}>
              <Typography>{t('email')}</Typography>
            </Grid>
            <Grid item xs={6}>
              <OutlinedInput
                fullWidth
                name="email"
                sx={{ height: '40px' }}
                value={currentUserInfo.email}
                onChange={onChangeInput}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ alignItems: 'center' }} mb={2}>
            <Grid item xs={6}>
              <Typography>{t('address')}</Typography>
            </Grid>
            <Grid item xs={6}>
              <OutlinedInput
                fullWidth
                name="address"
                sx={{ height: '40px' }}
                value={currentUserInfo.address}
                onChange={onChangeInput}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ alignItems: 'center' }} mb={2}>
            <Grid item xs={6}>
              <Typography>{t('phoneNumber')}</Typography>
            </Grid>
            <Grid item xs={6}>
              <OutlinedInput
                fullWidth
                name="phoneNumber"
                sx={{ height: '40px' }}
                value={currentUserInfo.phoneNumber}
                onChange={onChangeInput}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickCancel}>{t('cancel')}</Button>
          <Button onClick={onClickSubmit} color="primary">
            {t('submit')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
