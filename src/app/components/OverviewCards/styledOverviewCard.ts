import { Card, CardContent } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledCard = styled(Card, {
    shouldForwardProp: prop => prop !== 'isClickable',
})<{ isClickable: boolean }>(({ theme, isClickable }) => ({
    display: 'flex',
    flex: 1,
    minHeight: '150px',
    backgroundColor: theme.palette.card.background,
    textAlign: 'center',
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    borderRadius: '12px',
    cursor: isClickable ? 'pointer' : 'default',
    borderColor: theme.palette.card.border,
    transition: 'all 0.3s ease',
    '&:hover': isClickable
        ? {
              transform: 'translateY(-4px)',
              boxShadow: `0 8px 16px ${
                  theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.4)'
              }`,
              borderColor: theme.palette.secondary.main,
              '& .card-title': {
                  color: theme.palette.primary.contrastText,
              },
              '& .card-value': {
                  color: theme.palette.primary.contrastText,
              },
          }
        : {},
}))

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 0,
}))
