import BigNumber from 'bignumber.js'
import { Dispatch } from 'react'
import { StyledComponent } from 'styled-components'
import { NodesPerCountry } from './locationNode'
import { RootState } from './RootState'

export interface ConsumptionCharts {
    darkMode: boolean
    typeMeter?: string
    titleText: string
    utilSlice: Function
    sliceGetter: (state: RootState) => Emissions
    sliceGetterLoader: (state: RootState) => string
    typeStatistic?: string
    tooltipTitle?: string
    description?: string
}

export interface Meter {
    darkMode: boolean
    titleText?: string
    dataSeries: Value
    seeTimeAxis?: string
}

export interface IMeter {
    darkMode: boolean
    titleText: string
    timeSeeAxis: string
    data: Emissions
    typeStatistic?: string
}

export interface Emissions {
    Filter: string
    name: string
    value: Value
    highestValue?: string
    lowerValue?: string
    lowestValue?: string
}

export interface Value {
    chain: string
    time: string
    value: number
    Country?: string
    Value?: number
}

export interface IDateRange {
    initialStartDate?: Date
    InitianEndDate?: Date
    setEndDate: Dispatch<React.SetStateAction<Date>>
    setStartDate: Dispatch<React.SetStateAction<Date | undefined>>
    darkMode: boolean
    setSeeTimeAxis: Dispatch<React.SetStateAction<string>>
    disableFuture: boolean
    seeTimeAxis: string
    disableCurrentDay: boolean
}

export interface Data {
    name: string
    y?: number
    drilldown: string
    color: string
    value?: number
    country: string
}

export interface IDataChart {
    axis: Axis
    chart: Chart
    dateTimeLabelFormat: string
    isFirst: boolean
    isLast: boolean
    pos: number
    tick: Tick
    tickPositionInfo: string
    value: string
}

export interface Axis {
    extKey: string
    horiz: boolean
    isXAxis: boolean
}

export interface Chart {
    chartHeight: number
    chartWidth: number
    colorCounter: number
}

export interface Tick {
    isNew: boolean
    isNewLabel: boolean
    pos: number
}

export interface IDataRef {
    value?: string
    onClick?: () => {}
    label: string
}

export interface IItem {
    block: string
    receipt: {
        transactionIndex: string
        status: string
        gasUsed: BigNumber.Value
        effectiveGasPrice: BigNumber.Value
    }
    fromAddr: string
    hash: string
    createdAt: string | number | Date
    toAddr: string
    maxFeePerGas: BigNumber.Value
    value: string
}

export interface ChartData {
    date: string
    dateAt: string
    dateInfo: string
    time: string
    Date: string
}

export interface IStatistics {
    nodesPerCountry: NodesPerCountry[]
    darkMode: boolean
}

export type FilterDates = {
    startDate: string
    endDate: string
}

export interface IBlockChainDataChart {
    typeStatistic?: string
    startDate?: Date
    endDate: Date
    dataStatistics: Emissions
    Text: StyledComponent<'p', TextProps, never>
    isDescriptionOfHighest: boolean
}

export interface TextProps {
    backgroundColor: string
}
