import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { axiosInstance } from 'src/utils/axiosInstance';
import { INFOR_TYPE_LIST } from 'src/utils/informationType';

export const InformationDialog = (props) => {
  const { setOpenCreate, isCreate, setIsRefetch } = props;
  const { t } = useTranslation();

  const [currentInfo, setCurrentInfo] = useState({
    note: '',
    source: '',
    department: '',
    reporter: '',
    type: '',
    status: 'PROCESSING',
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setCurrentInfo({
      ...currentInfo,
      [name]: value,
    });
  };

  const onClickSubmit = () => {
    axiosInstance.post('/information', { ...currentInfo }).then((res) => {
      console.log(res);
      setOpenCreate(false);
      setIsRefetch(true);
    });
  };

  const onClickCancel = () => {
    setOpenCreate(false);
  };

  return (
    <>
      <Dialog open={true}>
        <DialogTitle>{t('information.create')}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ alignItems: 'center', marginBottom: 2 }}>
            <Grid item xs={6}>
              <Typography>{t('information.note')}</Typography>
            </Grid>
            <Grid item xs={6}>
              <OutlinedInput
                fullWidth
                sx={{ height: '40px' }}
                name="note"
                value={currentInfo.note}
                onChange={onChangeInput}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ alignItems: 'center', marginBottom: 2 }}>
            <Grid item xs={6}>
              <Typography>{t('information.source')}</Typography>
            </Grid>
            <Grid item xs={6}>
              <OutlinedInput
                fullWidth
                sx={{ height: '40px' }}
                name="source"
                vallue={currentInfo.source}
                onChange={onChangeInput}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ alignItems: 'center', marginBottom: 2 }}>
            <Grid item xs={6}>
              <Typography>{t('information.reporter')}</Typography>
            </Grid>
            <Grid item xs={6}>
              <OutlinedInput
                fullWidth
                sx={{ height: '40px' }}
                name="reporter"
                value={currentInfo.reporter}
                onChange={onChangeInput}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ alignItems: 'center', marginBottom: 2 }}>
            <Grid item xs={6}>
              <Typography>{t('information.department')}</Typography>
            </Grid>
            <Grid item xs={6}>
              <OutlinedInput
                fullWidth
                sx={{ height: '40px' }}
                name="department"
                value={currentInfo.department}
                onChange={onChangeInput}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ alignItems: 'center', marginBottom: 2 }}>
            <Grid item xs={6}>
              <Typography>{t('information.type')}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Select
                sx={{ height: '40px' }}
                fullWidth
                value={currentInfo.type}
                name="type"
                onChange={onChangeInput}
              >
                {INFOR_TYPE_LIST.map((inforType) => {
                  return (
                    <MenuItem key={inforType} value={inforType}>
                      {t(inforType)}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickCancel}>{t('cancel').toUpperCase()}</Button>
          <Button onClick={onClickSubmit} color="primary">
            {t('submit').toUpperCase()}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
