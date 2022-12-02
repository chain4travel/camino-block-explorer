import React, { FC, useEffect, useState, Fragment } from 'react';
import {
  Grid,
  Paper,
  Box,
  TableContainer,
  TableCellProps,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import { selectAllValidators } from 'store/validatorsSlice';
import { useEffectOnce } from 'app/hooks/useEffectOnce';
import { loadValidators } from 'store/validatorsSlice/utils';
import { TableViewRow } from './/TableViewRow';
import { GridViewItem } from './GridViewItem';
import { To } from 'react-router-dom';
import SubPageTitle from 'app/components/SubPageTitle';
import PageContainer from 'app/components/PageContainer';
import BackButton from 'app/components/BackButton';
import TableView from 'app/components/Table/TableView';
import useWidth from 'app/hooks/useWidth';
import LocationNode from 'types/locationNode';
import NodesPerCountry from 'types/nodesPerCountry';
import Utils from 'app/components/NodesMap/Utils';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import features from 'app/components/NodesMap/features.json';
import CircleMarker from 'app/components/NodesMap/CircleMarker';
import Stadistics from 'app/components/NodesMap/Stadistics';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Validators: FC = () => {
  const { isDesktop, isWidescreen } = useWidth();
  const validators = useAppSelector(selectAllValidators);
  const dispatch = useAppDispatch();

  //Map And Stadistics
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState<LocationNode[]>([]);
  const [nodesPerCountry, setNodesPerCountry] = useState<NodesPerCountry[]>([]);
  //const [maxValue, setMaxValue] = useState(0);
  const [zoomValue, setZoomValue] = useState(1);

  useEffectOnce(() => {
    dispatch(loadValidators());
  });

  useEffect(() => {
    Utils.getNodeData().then((dataNodes: LocationNode[]) => {
      setData(dataNodes);
      setNodesPerCountry(Utils.sumNodesPerCountry(dataNodes));
    });
  }, []);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <PageContainer pageTitle="Validators" metaContent="validators">
      <Paper
        variant="outlined"
        square
        sx={{
          minHeight: '544px',
          width: 1,
          backgroundColor: 'primary.dark',
          borderRadius: '12px',
          borderWidth: '1px',
          borderColor: 'primary.light',
          borderStyle: 'solid',
          p: '1rem 1.5rem 1rem 1.5rem',
        }}
      >
        <SubPageTitle
          title="Validators"
          backToLink={-1 as To}
          style={{ marginBottom: '20px' }}
        />

        <Fragment>
          <div style={{ position: 'relative' }}>
            {data.length > 0 ? (
              <>
                <Grid container spacing={2}>
                  <Grid item={true} xs={12} md={12}>
                    <ComposableMap projection={'geoMercator'}>
                      <ZoomableGroup center={[0, 40]} zoom={zoomValue}>
                        <Geographies
                          geography={features}
                          pointerEvents={'none'}
                        >
                          {({ geographies }) =>
                            geographies.map(geo => (
                              <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill="#41547C"
                              />
                            ))
                          }
                        </Geographies>
                        {data.map(
                          (
                            { lng, lat, nodeIdentity, country, city },
                            index,
                          ) => {
                            return (
                              <CircleMarker
                                key={index}
                                country={country}
                                city={city}
                                lng={lng}
                                lat={lat}
                                rValue={10}
                              />
                            );
                          },
                        )}
                      </ZoomableGroup>
                    </ComposableMap>
                  </Grid>
                  <Grid item={true} xs={12} md={12}>
                    <Box
                      sx={{
                        display: 'flex',
                        cursor: 'pointer',
                        width: '100%',
                        height: '48px',
                        padding: '0 8px',
                        backgroundColor: 'primary.dark',
                      }}
                    >
                      <Tabs
                        variant="fullWidth"
                        value={activeTab}
                        onChange={handleChangeTab}
                        textColor="secondary"
                        indicatorColor="secondary"
                      >
                        <Tab
                          className="tab"
                          disableRipple
                          label="Country Stadistics"
                          {...a11yProps(0)}
                        />
                        <Tab
                          className="tab"
                          disableRipple
                          label="Node Stadistics"
                          {...a11yProps(1)}
                        />
                      </Tabs>
                    </Box>

                    <Box>
                      <TabPanel value={activeTab} index={0}>
                        <Stadistics nodesPerCountry={nodesPerCountry} />
                      </TabPanel>
                      <TabPanel value={activeTab} index={1}>
                        <TableContainer sx={{ minHeight: '400px' }}>
                          {isWidescreen || isDesktop ? (
                            <TableView columns={columns}>
                              {validators?.map(validator => (
                                <TableViewRow
                                  key={validator.nodeID}
                                  validator={validator}
                                />
                              ))}
                            </TableView>
                          ) : (
                            <Grid item container alignItems="center">
                              {validators.map(validator => (
                                <GridViewItem
                                  key={validator.nodeID}
                                  validator={validator}
                                />
                              ))}
                            </Grid>
                          )}
                        </TableContainer>
                      </TabPanel>
                    </Box>
                  </Grid>
                </Grid>
              </>
            ) : null}
          </div>
        </Fragment>

        <Box sx={{ display: 'flex', width: '100%', paddingTop: '1rem' }}>
          <BackButton backToLink={-1 as To} />
        </Box>
      </Paper>
    </PageContainer>
  );
};

export default Validators;

export interface ColumnType {
  name: string;
  label: string;
  field: string;
  align: TableCellProps['align'];
}

const columns: ColumnType[] = [
  {
    name: 'Status',
    label: 'Status',
    field: 'Status',
    align: 'center',
  },
  {
    name: 'NodeID',
    label: 'NodeID',
    field: 'NodeID',
    align: 'center',
  },
  {
    name: 'StartTime',
    label: 'StartTime',
    field: 'StartTime',
    align: 'center',
  },
  {
    name: 'EndTime',
    label: 'EndTime',
    field: 'EndTime',
    align: 'center',
  },
  {
    name: 'Duration',
    label: 'Duration',
    field: 'Duration',
    align: 'center',
  },
  {
    name: 'UpTime',
    label: 'UpTime',
    field: 'UpTime',
    align: 'center',
  },
  {
    name: 'txID',
    label: 'txID',
    field: 'txID',
    align: 'center',
  },
];
