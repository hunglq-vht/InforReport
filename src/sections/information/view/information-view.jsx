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
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { axiosInstance } from 'src/utils/axiosInstance';
import axios from 'axios';
import moment from 'moment';
import { InformationDialog } from '../InformationDialog';
import is from 'date-fns/locale/is/index.js';

export default function InformationPage() {
  const [informationList, setInformationList] = useState([]);
  const { t } = useTranslation();
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isRefetch, setIsRefetch] = useState(true);

  useEffect(() => {
    if (isRefetch)
      axiosInstance.get('/information').then((res) => {
        setInformationList(res.data);
        setIsRefetch(false);
      });
  }, [isRefetch]);

  const handleClickCreate = () => {
    setIsOpenCreate(true);
  };

  return (
    <>
      {isOpenCreate && (
        <InformationDialog
          isOpenCreate={isOpenCreate}
          setOpenCreate={setIsOpenCreate}
          setIsRefetch={setIsRefetch}
        />
      )}
      <Container>
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
                </TableRow>
              </TableHead>
              <TableBody>
                {informationList.map((currentInformation, index) => {
                  return (
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
                        {moment(currentInformation.modifiedDate * 1000).format('DD/MM/YYYY HH:mm')}
                      </TableCell>
                      <TableCell>
                        {moment(currentInformation.createdDate * 1000).format('DD/MM/YYYY HH:mm')}
                      </TableCell>
                    </TableRow>
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
