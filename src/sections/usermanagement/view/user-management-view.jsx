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
import { toast } from 'react-toastify';
import { UserDialog } from '../UserDialog';
import { UserEditDialog } from '../UserEditDialog';

export default function UserManagementPage() {
  const { t } = useTranslation();

  const [userList, setUserList] = useState([]);
  const [isRefetch, setIsRefetch] = useState(true);
  const [openElement, setOpenElement] = useState(null);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [userDeleteId, setUserDeleteId] = useState(null);

  useEffect(() => {
    if (!isRefetch) return;
    axiosInstance.get('/users').then((res) => {
      console.log(res.data);
      setUserList(res.data);
      toast.success(t('user.get.success'));
    });
    setIsRefetch(false);
  }, [isRefetch]);

  const handleClickEdit = (userInfo) => {
    console.log('userInfo', userInfo);
    // setSelectedUser(userInfo);
    // setIsOpenUpdate(true);
    // setOpenElement(null);
  };

  const handleClickDelete = (username) => {};

  const handleClickCreate = () => {
    setIsOpenCreate(true);
  };

  return (
    <>
      {isOpenCreate && (
        <UserDialog
          isOpenCreate={isOpenCreate}
          setOpenCreate={setIsOpenCreate}
          setIsRefetch={setIsRefetch}
        />
      )}
      {/* {isOpenUpdate && (
        <UserEditDialog
          userInfo={selectedUser}
          isOpenUpdate={isOpenUpdate}
          setOpenUpdate={setIsOpenUpdate}
          setIsRefetch={setIsRefetch}
        />
      )} */}
      <Container>
        <Stack direction="row" alignItems={'center'} justifyContent={'space-between'} mb={5}>
          <Typography variant="h4">{t('user_management').toUpperCase()}</Typography>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleClickCreate}
          >
            {t('user.add')}
          </Button>
        </Stack>
        <TableContainer sx={{ overflow: 'auto' }}>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>{t('username')}</TableCell>
                <TableCell>{t('fullName')}</TableCell>
                <TableCell>{t('identityCard')}</TableCell>
                <TableCell>{t('email')}</TableCell>
                <TableCell>{t('phoneNumber')}</TableCell>
                <TableCell>{t('department')}</TableCell>
                <TableCell>{t('address')}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((currentUser, index) => {
                return (
                  <>
                    <TableRow key={`user_${index}`}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{currentUser.username}</TableCell>
                      <TableCell>{currentUser.fullName}</TableCell>
                      <TableCell>{currentUser.identityCard}</TableCell>
                      <TableCell>{currentUser.email}</TableCell>
                      <TableCell>{currentUser.phoneNumber}</TableCell>
                      <TableCell>{currentUser.department}</TableCell>
                      <TableCell>{currentUser.address}</TableCell>
                      <TableCell align="right">
                        <IconButton onClick={(e) => setOpenElement(e.currentTarget)}>
                          <Iconify icon="eva:more-vertical-fill" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <Popover
                      key={`popover_user_${index}`}
                      id={`popover_user_id_${index}`}
                      open={!!openElement}
                      anchorEl={openElement}
                      onClose={() => setOpenElement(null)}
                      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                      sx={{ width: 140 }}
                    >
                      <MenuItem
                        key={`menu_item_user_${index}`}
                        id={`menu_item_user_id_${index}`}
                        onClick={(e) => handleClickEdit(currentUser.id)}
                      >
                        <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                        {t('edit')}
                      </MenuItem>

                      <MenuItem
                        onClick={(e) => handleClickDelete(currentUser)}
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
      </Container>
    </>
  );
}
