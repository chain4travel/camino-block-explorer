import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import './custompicker.css';
import styled from 'styled-components';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Button } from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css'
import { Grid } from '@mui/material';
import useWidth from '../../../hooks/useWidth';

const PickerContainer = styled.div`
  display: flex;
  width: 250px;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-around;
  
  @media only screen and (max-width: 700px) {
    flex-direction: column;
  }
`;
const FilterContainer = styled.div`
  display: flex;

  @media only screen and (max-width: 700px) {
    margin: 0px;
  }
`;

const FilterContainerMobile = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  margin-left: 5%;
`;

const StyledButton = styled(Button)`
  margin-top: 0rem;
  margin-bottom: 1rem;
  margin-right: 1rem;
  margin-left: 1rem;
`;

const StyledButtonMobile = styled(Button)`
margin-top: 0rem;
margin-bottom: 1.5rem;
margin-right: 0.5rem;
width: 80%;
margin-left: 0.5rem;
`;

const NewTextField = styled(TextField)`
  margin: 1rem;
  width: 125px;
`;
const CustomInputContainer = styled.div`
  display: flex;
  align-content: center;
  align-items: baseline;
  cursor: pointer;
`;


const DateRange = ({
  initialStartDate,
  InitianEndDate,
  setEndDate,
  setStartDate,
  darkMode
}) => {


  const { isTablet, isDesktop, isSmallMobile } = useWidth();

  const changeDate = date => {
    setEndDate(new Date());
    setStartDate(new Date(date));
  };
  console.log({
    day: moment().subtract(1, 'days'),
    year: moment().subtract(1, 'years'),
    all: moment('01/01/2000'),
  });

  const CustomInput = forwardRef(({ value, onClick, label }: any, ref: any) => (
    <CustomInputContainer style={{ cursor: 'default' }} >
      <NewTextField
        id="standard-basic"
        label={label}
        variant="outlined"
        value={value}
        ref={ref}
        onClick={onClick}
        color="secondary"
        style={{ cursor: 'default', width: 250 }}
      />
      <CalendarMonthIcon
        onClick={onClick}
        style={{ cursor: 'default', position: 'relative', top: 10 }}
      />
    </CustomInputContainer>
  ));

  const CustomInputMobile = forwardRef(({ value, onClick, label }: any, refMobile: any) => (
    <CustomInputContainer style={{ cursor: 'default' }} >
      <TextField
        id="standard-basic"
        label={label}
        variant="outlined"
        value={value}
        ref={refMobile}
        onClick={onClick}
        color="secondary"
        style={{ cursor: 'default', width: '80%' }}
      />
      <CalendarMonthIcon
        onClick={onClick}
        style={{ cursor: 'default', position: 'relative', top: 10 }}
      />
    </CustomInputContainer>
  ));

  return (
    <Container>

      {isDesktop && (<>
        <div style={{ position: 'relative', right: '12%' }}>
          <FilterContainer>
            <StyledButton
              onClick={() =>
                changeDate(moment().subtract(1, 'days').format('YYYY-MM-DD'))
              }
              style={{ cursor: 'default' }}
              variant="contained"
            >
              1 Day
            </StyledButton>

            <StyledButton
              onClick={() =>
                changeDate(moment().subtract(1, 'months').format('YYYY-MM-DD'))
              }
              style={{ cursor: 'default' }}
              variant="contained"
            >
              1 Month
            </StyledButton>
            <StyledButton
              onClick={() =>
                changeDate(moment().subtract(1, 'years').format('YYYY-MM-DD'))
              }
              style={{ cursor: 'default' }}
              variant="contained"
            >
              1 year
            </StyledButton>

            <StyledButton
              onClick={() =>
                changeDate(moment('01/01/2000', 'DD/MM/YYYY').format('YYYY-MM-DD'))
              }
              style={{ cursor: 'default' }}
              variant="contained"
            >
              All
            </StyledButton>
          </FilterContainer>
        </div>

        <PickerContainer className={darkMode ? 'picker-container' : ''} style={{ position: 'relative', right: '6%', top: -25 }}>
          <DatePicker
            selected={initialStartDate}
            onChange={date => setStartDate(date)}
            selectsStart
            startDate={initialStartDate}
            endDate={InitianEndDate}
            customInput={<CustomInput label="Initial Date" />}
          // readOnly
          />
          <DatePicker
            selected={InitianEndDate}
            onChange={date => setEndDate(date)}
            selectsEnd
            startDate={initialStartDate}
            endDate={InitianEndDate}
            minDate={initialStartDate}
            customInput={<CustomInput label="End Date" />}
          // readOnly
          />
        </PickerContainer>
      </>)}

      {isTablet && (<>
        <Grid container>
          <Grid item xs={6}>
            <StyledButtonMobile
              onClick={() =>
                changeDate(moment().subtract(1, 'days').format('YYYY-MM-DD'))
              }
              style={{ cursor: 'default' }}
              variant="contained"
            >
              1 Day
            </StyledButtonMobile>

            <StyledButtonMobile
              onClick={() =>
                changeDate(moment().subtract(1, 'months').format('YYYY-MM-DD'))
              }
              style={{ cursor: 'default' }}
              variant="contained"
            >
              1 Month
            </StyledButtonMobile>
          </Grid>
          <Grid item xs={6}>
            <StyledButtonMobile
              onClick={() =>
                changeDate(moment().subtract(1, 'years').format('YYYY-MM-DD'))
              }
              style={{ cursor: 'default' }}
              variant="contained"
            >
              1 year
            </StyledButtonMobile>

            <StyledButtonMobile
              onClick={() =>
                changeDate(moment('01/01/2000', 'DD/MM/YYYY').format('YYYY-MM-DD'))
              }
              style={{ cursor: 'default' }}
              variant="contained"
            >
              All
            </StyledButtonMobile>
          </Grid>
        </Grid>
        <FilterContainerMobile >
          <DatePicker
            selected={initialStartDate}
            onChange={date => setStartDate(date)}
            selectsStart
            startDate={initialStartDate}
            endDate={InitianEndDate}
            customInput={<CustomInputMobile label="Initial Date" />}
          // readOnly
          />
          <DatePicker
            selected={InitianEndDate}
            onChange={date => setEndDate(date)}
            selectsEnd
            startDate={initialStartDate}
            endDate={InitianEndDate}
            minDate={initialStartDate}
            customInput={<CustomInputMobile label="End Date" />}
          // readOnly
          />
        </FilterContainerMobile></>)}


    </Container>
  );
};

export default DateRange;