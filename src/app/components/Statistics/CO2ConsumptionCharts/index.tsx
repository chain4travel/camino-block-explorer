import React, { useEffect, Fragment, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import { typesMeter } from '../../../pages/Statistics/ChartSelector';
import BarMeter from './BarMeter';
import TimeSeriesMeter from './TimeSeriesMeter';
import { Status } from "types";
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareArrowUpRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import useWidth from 'app/hooks/useWidth';
import DateRange from '../DateRange/DateRange';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import moment from 'moment';

const CO2ConsumptionCharts = ({
  utilSlice, typeMeter, darkMode, sliceGetter, sliceGetterLoader, titleText
}) => {

  const { isDesktop } = useWidth();

  const [openModal, setOpenModal] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if(startDate != undefined && endDate != undefined)
    {
      dispatch(utilSlice({
        startDate: moment(startDate).toISOString(),
        endDate: moment(endDate).toISOString()
      }));
    }
  },[startDate, endDate])

  useEffect(() => {
    setStartDate(new Date(moment().subtract(1, 'months').format()));
    setEndDate(new Date());
  }, []);

  const meterCO2 = useAppSelector(sliceGetter);

  const loader = useAppSelector(sliceGetterLoader);

  return (
    <Fragment>

      {loader == Status.LOADING ? <>
        <div style={{ textAlign: 'center' }}>
          <CircularProgress color="secondary" />
        </div>
      </> : <>
        {openModal == true ? <>
          <Modal
            open={openModal}
            onClose={e => {
              setOpenModal(false);
            }}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            disableScrollLock={true}
          >
            <Box
              sx={{
                backgroundColor: 'transparent',
                borderRadius: '7px',
                padding: '1.5rem',
                minWidth: isDesktop ? '1500px' : '0px',
              }}
            >

              <Card style={{ backgroundColor: darkMode ? "#060F24" : "white" }}>
                <CardHeader title={titleText} action={<IconButton
                  color="info"
                  component="label"
                  onClick={() => setOpenModal(false)}
                  style={{ cursor: 'default'}}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </IconButton>} />
                <CardContent>
                  <Fragment>
                    <DateRange
                      initialStartDate={startDate}
                      InitianEndDate={endDate}
                      setEndDate={setEndDate}
                      setStartDate={setStartDate}
                      darkMode={darkMode}
                    />

                    {typeMeter == typesMeter.BAR && <BarMeter darkMode={darkMode} dataSeries={meterCO2.value} titleText={titleText} />}
                    {typeMeter == typesMeter.TIME_SERIES && <TimeSeriesMeter darkMode={darkMode} dataSeries={meterCO2.value} titleText={titleText} />}
                  </Fragment>
                </CardContent></Card>
            </Box>
          </Modal>

        </> : <>

          <Card style={{ backgroundColor: darkMode ? "#060F24" : "white" }}>
            <CardHeader title={titleText} action={
              <IconButton
                color="info"
                component="label"
                onClick={() => setOpenModal(true)}
                style={{ cursor: 'default', color: 'white' }}
              >
                <FontAwesomeIcon icon={faSquareArrowUpRight} />
              </IconButton>
            } />
            <CardContent>
              {typeMeter == typesMeter.BAR && <BarMeter darkMode={darkMode} dataSeries={meterCO2.value} titleText={titleText} />}
              {typeMeter == typesMeter.TIME_SERIES && <TimeSeriesMeter darkMode={darkMode} dataSeries={meterCO2.value} titleText={titleText} />}
            </CardContent>
          </Card>
        </>}
      </>}
    </Fragment>
  );
}

export default CO2ConsumptionCharts;