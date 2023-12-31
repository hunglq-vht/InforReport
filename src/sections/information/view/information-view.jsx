import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { axiosInstance } from 'src/utils/axiosInstance';
import axios from 'axios';
import moment from 'moment';
import { InformationDialog } from '../InformationDialog';
import {
  Box,
  Checkbox,
  DialogContentText,
  DialogTitle,
  IconButton,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Popover,
  Select,
  TextField,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { INFOR_TYPE_LIST } from 'src/utils/informationType';
import { InformationEditDialog } from '../InformationEditDialog';
import { toast } from 'react-toastify';
import './styles.scss';

export default function InformationPage() {
  const [informationList, setInformationList] = useState([]);
  const { t } = useTranslation();
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isRefetch, setIsRefetch] = useState(true);
  const [selectedInfo, setSelectedInfo] = useState({});
  const [openElement, setOpenElement] = useState([]);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [inforDeleteId, setInforDeleteId] = useState(null);
  const [filterValue, setFilterValue] = useState({
    from: null,
    to: null,
    status: [],
    type: [],
  });

  useEffect(() => {
    if (isRefetch)
      axiosInstance.get('/information').then((res) => {
        setInformationList(res.data);
        setOpenElement(Array(res.data.length).fill(null));
        setIsRefetch(false);
      });
  }, [isRefetch]);

  const handleClickCreate = () => {
    setIsOpenCreate(true);
  };

  useEffect(() => {
    const filterDto = {};
    console.log(dayjs(filterValue.from).unix());
    axiosInstance
      .get('/information/filter', {
        params: {
          fromTime: dayjs(filterValue.from).startOf('day').unix() || 0,
          toTime: dayjs(filterValue.to).endOf('day').unix() || 0,
          types: filterValue.type.join(','),
          status: filterValue.status.join(','),
        },
      })
      .then((res) => {
        setInformationList(res.data);
      });
  }, [filterValue]);

  const handleChangeMultiValue = (e) => {
    const { name, value } = e.target;
    setFilterValue({
      ...filterValue,
      [name]: value,
    });
  };

  const handleChangeDate = (dateField, value) => {
    setFilterValue({
      ...filterValue,
      [dateField]: value,
    });
  };

  const handleClickEdit = (inforId) => {
    setIsOpenUpdate(true);
    setOpenElement(Array(informationList.length).fill(null));
    const selectedInformation = informationList.find((info) => info.id === inforId);
    if (selectedInformation) setSelectedInfo(selectedInformation);
  };

  const handleClickDelete = (inforId) => {
    setOpenElement(Array(informationList.length).fill(null));
    setInforDeleteId(inforId);
    setIsConfirmDelete(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsConfirmDelete(false);
    setInforDeleteId(null);
  };

  const onConfirmDelete = () => {
    axiosInstance
      .delete(`/information/${inforDeleteId}`)
      .then(() => {
        toast.success(t('information.delete.success'));
        handleCloseDeleteDialog();
        setIsRefetch(true);
      })
      .catch(() => {
        toast.error(t('information.delete.failed'));
      });
  };

  const onClosePopOver = (index) => {
    const newOpenElement = [...openElement];
    newOpenElement[index] = null;
    setOpenElement(newOpenElement);
  };

  const onClickOptions = (index, e) => {
    const newOpenElement = [...openElement];
    newOpenElement[index] = e.currentTarget;
    setOpenElement(newOpenElement);
  };

  return (
    <>
      <Dialog maxWidth="xs" fullWidth open={isConfirmDelete} onClose={handleCloseDeleteDialog}>
        <DialogTitle sx={{ textAlign: 'center' }}>{t('confirm.delete.dialog')}</DialogTitle>
        <DialogContentText sx={{ textAlign: 'center' }}>
          {t('confirm.delete.information')}
        </DialogContentText>
        <DialogActions>
          <Button type="reset" onClick={handleCloseDeleteDialog}>
            {t('cancel')}
          </Button>
          <Button type="submit" color="primary" onClick={onConfirmDelete}>
            {t('confirm')}
          </Button>
        </DialogActions>
      </Dialog>
      {isOpenCreate && (
        <InformationDialog
          isOpenCreate={isOpenCreate}
          setOpenCreate={setIsOpenCreate}
          setIsRefetch={setIsRefetch}
        />
      )}
      {isOpenUpdate && (
        <InformationEditDialog
          isOpenCreate={isOpenUpdate}
          setOpenUpdate={setIsOpenUpdate}
          setIsRefetch={setIsRefetch}
          information={selectedInfo}
        />
      )}
      <Container className="information-view">
        <Stack direction="row" alignItems={'center'} justifyContent={'space-between'} mb={5}>
          <Typography variant="h4">{t('information').toUpperCase()}</Typography>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleClickCreate}
          >
            {t('information.add')}
          </Button>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} mb={5}>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} mr={5}>
            <Typography mr={2}>{t('information.fromTime')}</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ height: '40px' }}
                className="common-input"
                format="DD/MM/YYYY"
                onChange={(newValue) => handleChangeDate('from', newValue)}
                value={filterValue.from}
              />
            </LocalizationProvider>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} mr={5}>
            <Typography mr={2}>{t('information.toTime')}</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ height: '40px' }}
                className="common-input"
                format="DD/MM/YYYY"
                onChange={(newValue) => handleChangeDate('to', newValue)}
                value={filterValue.to}
              />
            </LocalizationProvider>
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center" mb={5}>
          <Box
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '700px' }}
            mr={5}
          >
            <Typography mr={2} sx={{ width: '22%' }}>
              {t('information.type')}
            </Typography>
            <Select
              fullWidth
              multiple
              native={false}
              value={filterValue.type}
              name="type"
              sx={{ width: '78%' }}
              onChange={handleChangeMultiValue}
              renderValue={(selected) => selected.map((value) => t(value)).join(', ')}
            >
              {INFOR_TYPE_LIST.map((inforType) => {
                return (
                  <MenuItem key={inforType} value={inforType}>
                    <Checkbox checked={filterValue.type.indexOf(inforType) > -1} />
                    <ListItemText>{t(inforType)}</ListItemText>
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
        </Stack>
        <Card>
          <TableContainer sx={{ overflow: 'auto' }}>
            <Table sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>{t('information.note')}</TableCell>
                  <TableCell>{t('information.type')}</TableCell>
                  <TableCell>{t('information.status')}</TableCell>
                  <TableCell>{t('information.source')}</TableCell>
                  <TableCell>{t('information.reporter')}</TableCell>
                  <TableCell>{t('information.department')}</TableCell>
                  <TableCell>{t('information.modifiedDate')}</TableCell>
                  <TableCell>{t('information.createdDate')}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {informationList.map((currentInformation, index) => {
                  return (
                    <>
                      <TableRow key={`information_${index}`}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell
                          sx={{
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                          }}
                        >
                          {currentInformation.note}
                        </TableCell>
                        <TableCell>{t(currentInformation.type)}</TableCell>
                        <TableCell>{t(currentInformation.status)}</TableCell>
                        <TableCell>{currentInformation.source}</TableCell>
                        <TableCell>{currentInformation.reporter}</TableCell>
                        <TableCell>{currentInformation.department}</TableCell>
                        <TableCell>
                          {currentInformation.modifiedDate
                            ? moment(currentInformation.modifiedDate * 1000).format(
                                'DD/MM/YYYY HH:mm'
                              )
                            : ''}
                        </TableCell>
                        <TableCell>
                          {moment(currentInformation.createdDate * 1000).format('DD/MM/YYYY HH:mm')}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton onClick={(e) => onClickOptions(index, e)}>
                            <Iconify icon="eva:more-vertical-fill" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                      <Popover
                        key={`popover_info_${index}`}
                        open={!!openElement[index]}
                        anchorEl={openElement[index]}
                        onClose={onClosePopOver}
                        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        sx={{ width: 140 }}
                      >
                        <MenuItem onClick={() => handleClickEdit(currentInformation.id)}>
                          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                          {t('edit')}
                        </MenuItem>

                        <MenuItem
                          onClick={() => handleClickDelete(currentInformation.id)}
                          sx={{ color: 'error.main' }}
                        >
                          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
                          {t('delete')}
                        </MenuItem>
                      </Popover>
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Container>
    </>
  );
}
