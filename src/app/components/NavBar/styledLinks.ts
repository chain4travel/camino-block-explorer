import { styled } from '@mui/material'
import Box from '@mui/material/Box'
import Tab, { TabProps } from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

interface StyledTabProps extends Omit<TabProps, 'isActive'> {
    isActive?: boolean
}

export const StyledBox = styled(Box)({
    display: 'flex',
    cursor: 'pointer',
    width: '100%',
    height: '64px',
})

export const StyledTabs = styled(Tabs)(({ theme }) => ({
    height: '100%',
    '& .MuiTabs-scroller': {
        height: '100%',
    },
    '& .MuiTabs-flexContainer': {
        height: '100%',
        gap: theme.spacing(1),
    },
    '& .MuiTabs-indicator': {
        display: 'none',
    },
    '& .Mui-selected': {
        color: theme.palette.text.primary,
        fontWeight: 500,
    },
}))

export const StyledTab = styled(Tab, {
    shouldForwardProp: prop => prop !== 'isActive',
})<StyledTabProps>(({ theme, isActive }) => ({
    display: 'flex',
    padding: `${theme.spacing(1.25)} ${theme.spacing(1.5)}`,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.body2.fontSize,
    fontStyle: 'normal',
    lineHeight: theme.typography.body2.lineHeight,
    textTransform: 'none',
    minWidth: 'unset',
    color: isActive ? theme.palette.text.primary : theme.palette.text.secondary,
    '&::after': {
        content: '""',
        width: '100%',
        height: '4px',
        position: 'absolute',
        bottom: 0,
        left: 0,
        borderRadius: '4px 4px 0px 0px',
        background: theme.palette.secondary.main,
        display: isActive ? 'block' : 'none',
    },
    '&.Mui-selected': {
        color: theme.palette.text.primary,
    },
}))
