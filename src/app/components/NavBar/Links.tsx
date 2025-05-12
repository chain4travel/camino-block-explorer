// src/components/tabs/Links.tsx
import React, { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { RoutesConfig } from 'utils/route-paths'
import { ChainType } from 'utils/types/chain-type'
import { STATISTICS_LINK, VALIDATORS_LINK } from '../../../utils/types/statistics-type'
import { StyledBox, StyledTabs, StyledTab } from './styledLinks'

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

const activeTab = (path: string): number => {
    switch (path) {
        case ChainType.C_CHAIN:
            return 0
        case ChainType.X_CHAIN:
            return 1
        case ChainType.P_CHAIN:
            return 2
        case VALIDATORS_LINK:
            return 3
        case STATISTICS_LINK:
            return 4
    }
    return 0
}

export default function Links() {
    const routes = RoutesConfig()
    const location = useLocation()
    const navigate = useNavigate()

    const activeChainTab = useMemo(() => {
        let activeChain = location.pathname.split('/')[3]
        return activeTab(activeChain)
    }, [location])

    return (
        <StyledBox>
            <StyledTabs
                value={activeChainTab}
                scrollButtons="auto"
                variant="scrollable"
                allowScrollButtonsMobile
            >
                <StyledTab
                    className="tab"
                    disableRipple
                    label="C-Chain"
                    onClick={() => navigate(routes.CCHAIN)}
                    {...a11yProps(0)}
                    isActive={activeChainTab === 0}
                />
                <StyledTab
                    className="tab"
                    disableRipple
                    label="X-Chain"
                    onClick={() => navigate(routes.XCHAIN)}
                    {...a11yProps(1)}
                    isActive={activeChainTab === 1}
                />
                <StyledTab
                    className="tab"
                    disableRipple
                    label="P-Chain"
                    onClick={() => navigate(routes.PCHAIN)}
                    {...a11yProps(2)}
                    isActive={activeChainTab === 2}
                />
                <StyledTab
                    className="tab"
                    disableRipple
                    label="Validators"
                    onClick={() => navigate(routes.VALIDATORS)}
                    {...a11yProps(3)}
                    isActive={activeChainTab === 3}
                />
                <StyledTab
                    className="tab"
                    disableRipple
                    label="Statistics"
                    onClick={() => navigate(routes.STATISTICS)}
                    {...a11yProps(4)}
                    isActive={activeChainTab === 4}
                />
            </StyledTabs>
        </StyledBox>
    )
}
