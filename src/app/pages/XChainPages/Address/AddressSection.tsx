import React from 'react';
import { Grid, Box, Chip } from '@mui/material';
import { getAddressLink } from 'utils/route-utils';
import { getRelativeTime } from 'utils/display-utils';
import AddressLink from 'app/components/AddressLink';
import { useLocation } from 'react-router-dom';

export const AddressSection = ({ type, timestamp, id, chainType }) => {
  const location = useLocation();
  return (
    <>
      <Grid
        container
        item
        xs={12}
        lg={6}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12}>
          <AddressLink
            to={`/${chainType}/address/${getAddressLink(chainType, id)}`}
            value={id}
            typographyVariant="subtitle1"
            truncate={true}
          />
          {getRelativeTime(timestamp) + ' ago '}
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={12}
        lg={6}
        alignItems="center"
        justifyContent="center"
        spacing={1}
      >
        <Grid item xs={6} md>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'right',
              backgroundColor: 'primary.light',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
            }}
          >
            {location.pathname.split('/')[3][0]}
          </Box>
        </Grid>
        <Grid
          item
          xs={6}
          md
          sx={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          <Chip
            label={type}
            size="small"
            style={{ minWidth: '61px', height: 'min-content' }}
          />
        </Grid>
      </Grid>
    </>
  );
};