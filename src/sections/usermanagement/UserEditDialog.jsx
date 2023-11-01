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

export const UserEditDialog = (props) => {
  const { setOpenUpdate, setIsRefetch, userInfo } = props;

  const { t } = useTranslation();

  const [currentUserInfo, setCurrentUserInfo] = useState(userInfo);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setCurrentUserInfo({
      ...currentUserInfo,
      [name]: value,
    });
  };

  const onClickCancel = () => {
    setOpenUpdate(false);
  };

  const onClickSubmit = () => {
    axiosInstance.put('/user', currentUserInfo).then(() => {
      toast.success(t('user.update.success'));
      setIsRefetch(true);
      setOpenUpdate(false);
    });
  };

  return (
    <>
      <Dialog open onClose={onClickCancel}>
        <DialogTitle>{t('user.update')}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ alignItems: 'center' }} mb={2}>
            <Grid item xs={6}>
              <Typography>{t('username')}</Typography>
            </Grid>
            <Grid item xs={6}>
              <OutlinedInput
                fullWidth
                sx={{ height: '40px' }}
                name="username"
                disabled
                value={currentUserInfo.username}
                onChange={onChangeInput}
              />
            </Grid>
          </Grid>

          {/* <Grid container spacing={2} sx={{ alignItems: 'center' }} mb={2}>
              <Grid item xs={6}>
                <Typography>{t('password')}</Typography>
              </Grid>
              <Grid item xs={6}>
                <OutlinedInput
                  fullWidth
                  name="password"
                  value={currentUserInfo.password}
                  onChange={onChangeInput}
                />
              </Grid>
            </Grid> */}

          <Grid container spacing={2} sx={{ alignItems: 'center' }} mb={2}>
            <Grid item xs={6}>
              <Typography>{t('fullName')}</Typography>
            </Grid>
            <Grid item xs={6}>
              <OutlinedInput
                fullWidth
                sx={{ height: '40px' }}
                name="fullName"
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
                sx={{ height: '40px' }}
                fullWidth
                name="department"
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
                sx={{ height: '40px' }}
                name="email"
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
                sx={{ height: '40px' }}
                name="address"
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
                sx={{ height: '40px' }}
                name="phoneNumber"
                value={currentUserInfo.phoneNumber}
                onChange={onChangeInput}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickCancel}>{t('cancel').toUpperCase()}</Button>
          <Button onClick={onClickSubmit} color="primary">
            {t('update').toUpperCase()}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
