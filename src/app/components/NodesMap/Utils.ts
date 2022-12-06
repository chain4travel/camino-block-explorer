import axios from 'axios';
import LocationNode from '../../../types/locationNode';
import NodesPerCountry from 'types/nodesPerCountry';
import sortBy from 'lodash/sortBy';
import { store } from '../../../index';
import { Constants } from 'constants/Constants';

class Utils {
  rpc: string;

  constructor(rpc: string) {
    this.rpc = rpc;
  }

  private async GetPeers(rpc: string): Promise<any> {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'info.peers',
        params: {
          nodeIDs: [],
        },
      });

      var request = {
        method: 'post',
        url: rpc + '/ext/info',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };

      axios(request)
        .then(function (response) {
          resolve(response.data.result.peers);
        })
        .catch(function (error) {
          reject(error);
          console.log(error);
        });
    });
  }

  private async GetGeoIPInfo(ip: string): Promise<any> {
    return new Promise((resolve, reject) => {
      var data = '';

      var request = {
        method: 'get',
        url: `http://ip-api.com/json/${ip}`,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
        data: data,
      };

      axios(request)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
          console.log(error);
        });
    });
  }

  private async getIpInfo(peers: any[], ipProvider: string) {
    let peersInfo = await this.GetPeers(this.rpc);
    let geoIPinfo: any[] = [];

    for (const peer of peers) {
      geoIPinfo.push(this.GetGeoIPInfo(peer.ip.split(':')[0]));
    }
    return await Promise.all(geoIPinfo);
  }

  public async getPeersInfo(ipProvider: string) {
    let peersInfo = await this.GetPeers(this.rpc);
    let geoIPinfo: any = await this.getIpInfo(peersInfo, ipProvider);
    let geoIpPeersInfo: LocationNode[] = [];
    let info;

    for (let i = 0; i < peersInfo.length; i++) {
      info = {
        lng: geoIPinfo[i].lon,
        lat: geoIPinfo[i].lat,
        country: geoIPinfo[i].country,
        city: geoIPinfo[i].city,
        alpha2: geoIPinfo[i].countryCode,
        ip: geoIPinfo[i].query,
        nodeIdentity: peersInfo[i].nodeID,
      };
      geoIpPeersInfo.push(info);
    }
    return geoIpPeersInfo;
  }

  public static async getNodeData(): Promise<LocationNode[]> {
    return new Promise((resolve, reject) => {
      let networks = store.getState().appConfig;
      let activeNetwork = networks.networks.find(
        element => element.id === networks.activeNetwork,
      );

      var data = JSON.stringify({
        rpc: `${activeNetwork?.protocol}://${activeNetwork?.host}:${activeNetwork?.port}`,
        ip_provider: Constants.URL_API_GEOIP_PROVIDER,
      });

      var request = {
        method: 'post',
        url: Constants.URL_API_GEOIP,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };

      axios(request)
        .then(function (response: any) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject([]);
          console.log(error);
        });
    });
  }

  public static sumNodesPerCountry(info: LocationNode[]): NodesPerCountry[] {
    let dataCountry: NodesPerCountry[] = [];
    for (let i = 0; i < info.length; i++) {
      if (dataCountry.some((dat: any) => dat.alpha2 == info[i].alpha2)) {
        let locationNode: LocationNode = info[i];
        let indexDataCountry = dataCountry.findIndex(
          (dat: any) => dat.alpha2 == info[i].alpha2,
        );
        dataCountry[indexDataCountry].nodes.push(locationNode.nodeIdentity);
      } else {
        let nodePerCountry: NodesPerCountry = {
          alpha2: info[i].alpha2,
          country: info[i].country,
          nodes: [info[i].nodeIdentity],
        };
        dataCountry.push(nodePerCountry);
      }
    }

    return sortBy(dataCountry, o => -o.nodes.length);
  }
}

export default Utils;
