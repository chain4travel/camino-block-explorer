import React, { Fragment, Component } from 'react';
import axios from 'axios';
import { store } from '../../../index';
import { Typography, useTheme } from '@mui/material';
import { ReactComponent as MetamaskLogo } from '../assets/metamasklogo.svg';
import useWidth from 'app/hooks/useWidth';
import Web3 from 'web3';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const MetamaskButton = ({}) => {
  let networks = store.getState().appConfig;
  let activeNetwork = networks.networks.find(
    element => element.id === networks.activeNetwork,
  );

  const { isTablet } = useWidth();
  const theme = useTheme();

  const getChainId = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'info.getBlockchainID',
        params: {
          alias: 'C',
        },
      });

      var config = {
        method: 'post',
        url: `${activeNetwork?.protocol}://${activeNetwork?.host}:${activeNetwork?.port}/ext/info`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(response.data);
          resolve(response.data.result.blockchainID);
        })
        .catch(function (error) {
          console.log(error);
          resolve('');
        });
    });
  };

  const addNetworkInMetamask = async () => {
    if (window.ethereum) {
      let web3 = new Web3(
        `${activeNetwork?.protocol}://${activeNetwork?.host}:${activeNetwork?.port}/ext/bc/C/rpc`,
      );
      let chainId = web3.utils.toHex(await web3.eth.getChainId());

      let params = [
        {
          chainId: chainId,
          chainName: 'Camino',
          nativeCurrency: {
            name: 'CAM',
            symbol: 'CAM',
            decimals: 18,
          },
          rpcUrls: [
            `${activeNetwork?.protocol}://${activeNetwork?.host}:${activeNetwork?.port}/ext/bc/C/rpc`,
          ],
          blockExplorerUrls: [window.location.href.toString()],
        },
      ];

      window.ethereum
        .request({
          method: 'wallet_addEthereumChain',
          params,
        })
        .then(() => {
          console.log('success');
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const SecondaryButton = ({ icon, label, style, onClick }) => (
    <a
      role="button"
      onClick={onClick}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        justifyContent: 'center',
        cursor: 'pointer',
        alignItems: 'center',
        padding: '.7rem .7rem',
        borderRadius: '7px',
        textDecoration: 'none',
        gap: '10px',
        ...style,
      }}
    >
      {icon}
      <Typography variant="body1" component="span" fontWeight="fontWeightBold">
        {label}
      </Typography>
    </a>
  );

  return (
    <Fragment>
      <SecondaryButton
        label="Add C-Chain Network"
        onClick={() => {
          addNetworkInMetamask();
        }}
        icon={<MetamaskLogo style={{ height: '25px' }} />}
        style={{
          backgroundColor:
            theme.palette.mode === 'light' ? 'transparent' : '#F8FAFC',
          width: !isTablet ? '100%' : 'auto',
          minWidth: '200px',
          color: 'black',
          border: '1px solid',
          borderColor:
            theme.palette.mode === 'light' ? '#149EED' : 'transparent',
        }}
      />
    </Fragment>
  );
};

export default MetamaskButton;
