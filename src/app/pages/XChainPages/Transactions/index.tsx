import React from 'react';
import {
  Grid,
  Paper,
  TableContainer,
  Box,
  LinearProgress,
} from '@mui/material';
import { useInfiniteQuery } from 'react-query';
import { getXPTransactions } from 'api';
import { useLocation } from 'react-router-dom';
import PageContainer from 'app/components/PageContainer';
import CutomTable from 'app/components/Table/TableView';
import useWidth from 'app/hooks/useWidth';
import Transaction from './Transaction';
import SubPageTitle from 'app/components/SubPageTitle';

export default function XPTransactions() {
  const location = useLocation();
  const chainType = location.pathname.split('/')[1];
  const {
    fetchNextPage, //function
    hasNextPage, // boolean
    isFetchingNextPage, // boolean
    data,
    status,
    // error,
  } = useInfiniteQuery(
    '/xtransactions',
    ({ pageParam = 0 }) => getXPTransactions(pageParam, chainType[0]),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 50 ? (allPages.length + 1) * 50 : undefined;
      },
    },
  );
  const intObserver = React.useRef<IntersectionObserver | null>(null);
  const lastPostRef = React.useCallback(
    transaction => {
      if (isFetchingNextPage) return;

      if (intObserver.current) intObserver.current?.disconnect();

      intObserver.current = new IntersectionObserver(transactions => {
        if (transactions[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (transaction) intObserver.current.observe(transaction);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage],
  );
  const content = data?.pages.map(pg => {
    return pg.map((transaction, i) => {
      if (pg.length === i + 1) {
        return (
          <Transaction
            ref={lastPostRef}
            key={transaction.hash}
            transaction={transaction}
          />
        );
      }
      return <Transaction key={transaction.hash} transaction={transaction} />;
    });
  });
  const { isDesktop, isWidescreen } = useWidth();
  return (
    <PageContainer
      pageTitle={`${chainType[0].toLocaleUpperCase()} Transactions`}
      metaContent={`list of transactions ${chainType}`}
    >
      <Paper
        variant="outlined"
        square
        sx={{
          minHeight: '680px',
          width: 1,
          backgroundColor: 'primary.dark',
          borderRadius: '12px',
          borderWidth: '1px',
          borderColor: 'primary.light',
          borderStyle: 'solid',
          p: '1rem 1.5rem 1rem 1.5rem',
        }}
      >
        <Grid
          container
          direction="column"
          alignItems="center"
          sx={{ width: 1, gap: '20px' }}
        >
          <SubPageTitle
            title={`${chainType[0].toLocaleUpperCase()}-Transactions`}
            backToLink={'/' + chainType}
          />
          {status === 'success' && data && (
            <TableContainer sx={{ height: '650px' }}>
              {isWidescreen || isDesktop ? (
                <CutomTable columns={columns}>{content}</CutomTable>
              ) : (
                <Grid item container alignItems="center">
                  {content}
                </Grid>
              )}
            </TableContainer>
          )}
          {isFetchingNextPage && (
            <Box sx={{ width: '100%' }}>
              <LinearProgress color="secondary" />
            </Box>
          )}
        </Grid>
      </Paper>
    </PageContainer>
  );
}

const columns = [
  {
    name: 'hash',
    label: 'Hash',
    field: 'hash',
    align: 'left',
    type: 'hash',
    // detailsLink: transactionDetails,
  },
  {
    name: 'from',
    label: 'From',
    field: 'from',
    align: 'left',
    type: 'hash',
    // detailsLink: addressDetails,
  },
  {
    name: 'to',
    label: 'To',
    field: 'to',
    align: 'left',
    type: 'hash',
    // detailsLink: addressDetails,
  },
  {
    name: 'timestamp',
    label: 'Timestamp',
    field: 'timestamp',
    align: 'left',
    type: 'timestamp',
  },
  {
    name: 'type',
    label: 'Type',
    field: 'Type',
    align: 'left',
  },
  {
    name: 'fee',
    value: 'fee',
    label: 'Fee',
    align: 'left',
    type: 'currency',
  },
];
