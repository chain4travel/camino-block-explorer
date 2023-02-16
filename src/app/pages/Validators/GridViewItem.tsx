import * as React from 'react'
import { Grid, Paper, Typography, Box } from '@mui/material'
import { Field } from 'app/components/DetailsField'
import { ValidatorType } from 'types/store'
import Chip from '@mui/material/Chip'
import moment from 'utils/helpers/moment'
import Tooltip from '@mui/material/Tooltip'
import CopyButton from '../../components/CopyToClipboardButton'

export const GridViewItem = ({ validator }: { validator: ValidatorType }) => {
    return (
        <Paper
            sx={{
                width: 1,
                marginBottom: '1rem',
                padding: '15px',
                gap: '10px',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'primary.light',
                backgroundImage: 'none',
            }}
        >
            <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                    Status
                </Typography>
                <Chip
                    label={validator.status}
                    style={{ width: 100, maxWidth: 100 }}
                    sx={{
                        borderRadius: '7px',
                        color: 'grey.900',
                        backgroundColor:
                            validator.status === 'Connected' ? 'success.main' : 'error.main',
                    }}
                />
            </Grid>
            <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                    NodeID
                </Typography>
                <Box sx={{ display: 'flex', gap: '1rem' }}>
                    <Typography
                        variant="body2"
                        component="span"
                        noWrap={true}
                        fontWeight="fontWeightRegular"
                        sx={{ width: '100%', display: 'block' }}
                    >
                        {validator.nodeID}
                    </Typography>
                    <CopyButton value={validator.nodeID} bordered={false} />
                </Box>
            </Grid>
            <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                    StartTime
                </Typography>
                <Tooltip
                    title={
                        'Days since validator start:' +
                        moment(validator.startTime).fromNow().replace(' ago', '')
                    }
                >
                    <span style={{ cursor: 'pointer' }}>
                        {moment(validator.startTime).format('MMM D, YYYY')}
                    </span>
                </Tooltip>
            </Grid>
            <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                    EndTime
                </Typography>
                <Tooltip
                    title={
                        'Days until validator stops:' +
                        moment(validator.endTime).fromNow().replace('in ', '')
                    }
                >
                    <span style={{ cursor: 'pointer' }}>
                        {moment(validator.endTime).format('MMM D, YYYY')}
                    </span>
                </Tooltip>
            </Grid>
            <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                    UpTime
                </Typography>
                <Field type="string" value={validator.uptime} />
            </Grid>
            <Grid item xs={12} md zeroMinWidth order={{ xs: 3, md: 2 }}>
                <Typography variant="subtitle2" color="latestList.timestamp">
                    txID
                </Typography>
                <Box sx={{ display: 'flex', gap: '1rem' }}>
                    <Typography
                        variant="body2"
                        component="span"
                        noWrap={true}
                        fontWeight="fontWeightRegular"
                        sx={{ width: '100%', display: 'block' }}
                    >
                        {validator.txID}
                    </Typography>
                    <CopyButton value={validator.txID} bordered={false} />
                </Box>
            </Grid>
        </Paper>
    )
}
