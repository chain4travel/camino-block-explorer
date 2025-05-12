import { Box, Typography } from '@mui/material'
import React, { FC } from 'react'
import LoadingWrapper from 'app/components/LoadingWrapper'
import { Status } from 'types'
import { StyledCard, StyledCardContent } from './styledOverviewCard'

type OverviewCardProps = {
    title: string
    value: string
    loading: Status
    subValue?: string
    onClick?: () => void
    dataCy?: string
}

const OverviewCard: FC<OverviewCardProps> = ({
    title,
    value,
    loading,
    subValue,
    onClick,
    dataCy,
}) => {
    const isClickable = Boolean(onClick)

    return (
        <StyledCard variant="outlined" isClickable={isClickable} onClick={onClick}>
            <StyledCardContent>
                <Typography
                    variant="h6"
                    component="span"
                    className="card-title"
                    sx={{
                        color: 'card.title',
                        pb: theme => theme.spacing(3.125), // 25px
                        transition: 'color 0.3s ease',
                    }}
                >
                    {title}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        gap: theme => theme.spacing(1.25), // 10px
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <LoadingWrapper loading={loading} failedLoadingMsg="-">
                        <Typography
                            variant="h4"
                            component="span"
                            fontWeight="fontWeightBold"
                            className="card-value"
                            sx={{
                                color: 'card.contrastText',
                                transition: 'color 0.3s ease',
                            }}
                            data-cy={dataCy}
                        >
                            {value}
                        </Typography>
                        {subValue && (
                            <Typography
                                variant="h6"
                                component="span"
                                sx={{ color: 'card.subValue' }}
                            >
                                {subValue}
                            </Typography>
                        )}
                    </LoadingWrapper>
                </Box>
            </StyledCardContent>
        </StyledCard>
    )
}

export default OverviewCard
