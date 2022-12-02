import React, { Fragment, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { Marker } from 'react-simple-maps';
import './CircleMarker.css';

const CircleMarker = ({ country, lng, lat, rValue, city }: any) => {
  const [changeColor, setChangeColor] = useState(false);

  return (
    <Fragment>
      <Tooltip title={country + ' - ' + city} style={{ pointerEvents: 'auto' }}>
        <Marker coordinates={[lng, lat]}>
          <circle
            className="animated flash"
            fill={changeColor == true ? '#000000' : '#4782da'}
            stroke="#fff"
            fillOpacity="1"
            strokeWidth={7 / 2}
            r={rValue / 2}
            strokeOpacity="0.4"
            cursor="pointer"
            onMouseOver={() => {
              setChangeColor(true);
            }}
            onMouseOut={() => {
              setChangeColor(false);
            }}
          />
        </Marker>
      </Tooltip>
    </Fragment>
  );
};

export default CircleMarker;
