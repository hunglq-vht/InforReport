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
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosInstance } from 'src/utils/axiosInstance';
import { INFOR_STATUS_LIST, INFOR_TYPE_LIST } from 'src/utils/informationType';

export const InformationEditDialog = (props) => {
  const { setOpenUpdate, isUp, setIsRefetch, information } = props;
  const { t } = useTranslation();

  const [currentInfo, setCurrentInfo] = useState(information);

  useEffect(() => {
    setCurrentInfo(information);
  }, [information]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setCurrentInfo({
      ...currentInfo,
      [name]: value,
    });
  };

  const onClickSubmit = () => {
    // console.log(currentInfo);
    axiosInstance
      .put(`/information/${currentInfo.id}/update`, { ...currentInfo })
      .then((res) => {
        console.log(res);
        toast.success(t('information.update.success'));
        setOpenUpdate(false);
        setIsRefetch(true);
      })
      .catch(() => {
        toast.error(t('information.update.failed'));
      });
  };

  const onClickCancel = () => {
    setOpenUpdate(false);
  };

  return (
    <>
      <Dialog open={true} maxWidth="sm" fullWidth>
        <DialogTitle>{t('information.edit')}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ alignItems: 'center', marginBottom: 2 }}>
            <Grid item xs={6}>
              <Typography>{t('information.note')}</Typography>
            </Grid>
            <Grid item xs={6}>
              <OutlinedInput
                fullWidth
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
              <Select fullWidth value={currentInfo.type} name="type" onChange={onChangeInput}>
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

          <Grid container spacing={2} sx={{ alignItems: 'center', marginBottom: 2 }}>
            <Grid item xs={6}>
              <Typography>{t('information.status')}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Select fullWidth value={currentInfo.status} name="status" onChange={onChangeInput}>
                {INFOR_STATUS_LIST.map((inforStatus) => {
                  return (
                    <MenuItem key={inforStatus} value={inforStatus}>
                      {t(inforStatus)}
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
            {t('update').toUpperCase()}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
