import { expect } from 'chai'
import { accessWallet, changeNetwork, addKopernikusNetwork } from '../utils/utils'

let transactionsBody= {
    "transactions": [
        {
            "id": "2MGgM1nrzTKkMqqfiwRUsLYXTVshpD8MPQ6RBWknEKb16QgPUH",
            "chainID": "11111111111111111111111111111111LpoYY",
            "type": "pvm_import",
            "inputs": [
                {
                    "output": {
                        "id": "pHNHWWTYW5nbJ2T9PEeVyyFSskm99BdkHFSqS3WTyfz6aBPQJ",
                        "transactionID": "fk4GiPT6rZj9uX3we8HPrJpwVCSg28sJJTLhmTF74vUczX1GR",
                        "outputIndex": 1,
                        "assetID": "2qD5UA8E5a3rCyVGrxWHp4pwP14d8WicgCfM9KzdyWQ6AyK3w8",
                        "stake": false,
                        "frozen": false,
                        "stakeableout": false,
                        "genesisutxo": false,
                        "outputType": 7,
                        "amount": "1001000000",
                        "locktime": 0,
                        "stakeLocktime": 0,
                        "threshold": 1,
                        "addresses": [
                            "columbus1cd7yxgpyrw2zpfzmtm8qrvce5asxc2ha9v8mle"
                        ],
                        "caddresses": null,
                        "timestamp": "2023-03-02T14:41:35Z",
                        "redeemingTransactionID": "2MGgM1nrzTKkMqqfiwRUsLYXTVshpD8MPQ6RBWknEKb16QgPUH",
                        "chainID": "11111111111111111111111111111111LpoYY",
                        "inChainID": "CVovNnhBXyrvZtfGBvh3rndjCmMfMdFwQPd3S3CEjPuCkJPDP",
                        "outChainID": "11111111111111111111111111111111LpoYY",
                        "groupID": 0,
                        "payload": "",
                        "block": "",
                        "nonce": 0,
                        "rewardUtxo": false
                    },
                    "credentials": [
                        {
                            "address": "columbus1cd7yxgpyrw2zpfzmtm8qrvce5asxc2ha9v8mle",
                            "public_key": "A9Bmuot5qhAL31o5tBuWetuzDaqAUrd0SRNYE9inO0cB",
                            "signature": "p6ayl5+h8sDqnCt1PT9zDab/XvoYQ67lS0e5T2jT+1UQnV0ruCBl8kCv4w8Cp+WeyMwkQRBnfr1Saf0IS1Uw6wE="
                        }
                    ]
                }
            ],
            "outputs": [
                {
                    "id": "H3rKHWzmVVbsSuEgTGZbUPo32nJYUAVuLu5yiFCKV9tsivzBx",
                    "transactionID": "2MGgM1nrzTKkMqqfiwRUsLYXTVshpD8MPQ6RBWknEKb16QgPUH",
                    "outputIndex": 0,
                    "assetID": "2qD5UA8E5a3rCyVGrxWHp4pwP14d8WicgCfM9KzdyWQ6AyK3w8",
                    "stake": false,
                    "frozen": false,
                    "stakeableout": false,
                    "genesisutxo": false,
                    "outputType": 7,
                    "amount": "1000000000",
                    "locktime": 0,
                    "stakeLocktime": 0,
                    "threshold": 1,
                    "addresses": [
                        "columbus1cd7yxgpyrw2zpfzmtm8qrvce5asxc2ha9v8mle"
                    ],
                    "caddresses": null,
                    "timestamp": "2023-03-02T14:41:41Z",
                    "redeemingTransactionID": "",
                    "chainID": "11111111111111111111111111111111LpoYY",
                    "inChainID": "",
                    "outChainID": "11111111111111111111111111111111LpoYY",
                    "groupID": 0,
                    "payload": "",
                    "block": "",
                    "nonce": 0,
                    "rewardUtxo": false
                }
            ],
            "memo": "",
            "inputTotals": {
                "2qD5UA8E5a3rCyVGrxWHp4pwP14d8WicgCfM9KzdyWQ6AyK3w8": "1001000000"
            },
            "outputTotals": {
                "2qD5UA8E5a3rCyVGrxWHp4pwP14d8WicgCfM9KzdyWQ6AyK3w8": "1000000000"
            },
            "reusedAddressTotals": null,
            "timestamp": "2023-03-02T14:41:41Z",
            "txFee": 1000000,
            "genesis": false,
            "rewarded": false,
            "rewardedTime": null,
            "epoch": 0,
            "vertexId": "",
            "validatorNodeID": "",
            "validatorStart": 0,
            "validatorEnd": 0,
            "txBlockId": "QDJjMjntVaMKicHWvRhqMGNQ3aCzNpkzWvDXwNC6cienCj5V5",
            "proposer": {
                "proposer": "NodeID-111111111111111111116DBWJs",
                "timeStamp": "2023-03-02T14:41:41Z"
            }
        },
    ],
    "startTime": "0001-01-01T00:00:00Z",
    "endTime": "2023-03-02T19:36:39Z",
    "next": "endTime=1677505356\u0026chainID=11111111111111111111111111111111LpoYY\u0026limit=8\u0026sort=timestamp-desc"
}

let txcount= {
    "aggregates": {
        "AggregateMerge": null,
        "startTime": "2023-03-01T19:36:39Z",
        "endTime": "2023-03-02T19:36:39Z",
        "transactionVolume": "",
        "transactionCount": 1,
        "addressCount": 0,
        "outputCount": 0,
        "assetCount": 0
    },
    "startTime": "2023-03-01T19:36:39Z",
    "endTime": "2023-03-02T19:36:39Z"
}

let txFee = {
    "aggregates": {
        "AggregateMerge": null,
        "startTime": "2023-03-01T19:36:39Z",
        "endTime": "2023-03-02T19:36:39Z",
        "txfee": 0
    },
    "startTime": "2023-03-01T19:36:39Z",
    "endTime": "2023-03-02T19:36:39Z"
}

let validators =  {
    "name": "GeoIPInfo",
    "value": [
        {
            "nodeID": "NodeID-6fPA2ZK4W8xE8zKuYYNS34nftFxp8UPQ8",
            "txID": "KbsVKunggkQWhX3rRYx8aWHvgB1muaCjq8LPsARvaMJ6AHbJB",
            "connected": true,
            "uptime": 0.905,
            "lng": 0,
            "lat": 0,
            "IP": "10.9.2.30",
            "startTime": "2023-02-23 13:14:23 +0000 UTC",
            "endTime": "2023-03-16 13:28:48 +0000 UTC",
            "duration": "21 Days",
            "country": "",
            "countryISO": "",
            "city": ""
        },
        {
            "nodeID": "NodeID-6XD16eZ22fadTKq3qsxro9TPFZyxTiFv3",
            "txID": "28hjHTEeKm14sYwJzyaXGjxQ3CVfDPv8Unzs6o3WRwJGsbZcGt",
            "connected": true,
            "uptime": 1,
            "lng": 0,
            "lat": 0,
            "IP": "10.10.197.192",
            "startTime": "2022-12-15 00:00:00 +0000 UTC",
            "endTime": "2023-12-09 23:00:00 +0000 UTC",
            "duration": "359 Days",
            "country": "",
            "countryISO": "",
            "city": ""
        },
        {
            "nodeID": "NodeID-6rsqgkg4F1i3SBjzj4tS5ucQWH7JMEouj",
            "txID": "gnymBKM4F44ygtTPF26WeTgpHTonLNgrDQJ7pDQsMdZpsjnkr",
            "connected": true,
            "uptime": 1,
            "lng": 0,
            "lat": 0,
            "IP": "10.9.4.26",
            "startTime": "2022-12-15 00:00:00 +0000 UTC",
            "endTime": "2024-12-03 22:00:00 +0000 UTC",
            "duration": "719 Days",
            "country": "",
            "countryISO": "",
            "city": ""
        }
    ]
} 

describe('latest transaction list Pchainet', () => {
    before(() => {
        cy.visit('/')
    })
    beforeEach(() => {

        cy.intercept('GET', '**/v2/aggregates*', (req) => {
            req.reply({
                statusCode: 200,
                body: txcount
            })
        }).as('txcount')

        cy.intercept('POST', '**/v2/validatorsInfo', (req) => {
            req.reply({
                statusCode: 200,
                body: validators
            })
        }).as('ValidatorsInfo')

        
        cy.intercept('GET', '**/v2/transactions*', (req) => {
            console.log("soy el address ttv3",req.body.address)
            req.reply({
                statusCode: 200,
                body: transactionsBody,
            })
        }).as('transactions')

        cy.intercept('GET', '**/v2/txfeeAggregates*', (req) => {
            req.reply({
                statusCode: 200,
                body: txFee,
            })
        }).as('txfee')
    })
    it('latest transaction list Xchain', () => {    
        addKopernikusNetwork(cy)
        accessWallet(cy, 'privateKey')
        cy.get('[data-cy="app-selector-menu"] > .MuiSelect-select').should('be.visible')
        cy.get('[data-cy="app-selector-menu"] > .MuiSelect-select').click()
        cy.get('[data-cy="app-selector-Explorer"] > .css-8atqhb > .MuiBox-root').should('be.visible')
        cy.get('[data-cy="app-selector-Explorer"] > .css-8atqhb > .MuiBox-root').click()
        cy.get('.MuiContainer-root > .MuiToolbar-root').should('be.visible')
        cy.get('#simple-tab-2').click()
        cy.wait('@ValidatorsInfo').then( ()=>{
        cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root').should('be.visible')
        cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root > .MuiBox-root > .MuiTypography-h4').invoke("text")
        .then(textV => {
            var numberV =parseInt(textV)
            if(numberV == validators.value.length){
                cy.log('success')
            }else{
                cy.log('failed number validators')
            }
        })
        })
        cy.wait('@txcount').then(()=>{
            cy.get(':nth-child(2) > .MuiPaper-root > .MuiCardContent-root').should('be.visible')
            cy.get(':nth-child(2) > .MuiPaper-root > .MuiCardContent-root > .MuiBox-root > .MuiTypography-root').invoke('text')
            .then(textCount =>{
                var txC =parseInt(textCount)
                if(txC == txcount.aggregates.transactionCount){
                    cy.log('success tx count')
                }else{
                    cy.log('failed tx count')
                }
            })
        })
        cy.wait('@transactions').then(()=>{
            cy.get('.css-1voxykv-MuiPaper-root').should('be.visible')
            cy.get(':nth-child(1) > .MuiGrid-grid-md-4 > .MuiGrid-container > .MuiGrid-grid-xs-8 > a > .MuiTypography-root').invoke('text')
            .then(textId =>{
                if(textId == transactionsBody.transactions[0].id){
                    cy.log('success txId')
                }else{
                    cy.log('failed txId')
                }
            })
            cy.get('.MuiGrid-grid-xs-4 > .MuiChip-root > .MuiChip-label').invoke('text')
            .then(textType =>{
                if(textType == transactionsBody.transactions[0].type){
                    cy.log('success type')
                }else{
                    cy.log('failed type')
                }
            })
            cy.get(':nth-child(1) > .MuiGrid-grid-md-8 > .MuiGrid-grid-lg-8 > :nth-child(1) > [style="width: 100%;"] > .MuiGrid-grid-xs-9 > .MuiGrid-container > .MuiGrid-grid-xl-7 > a > .MuiTypography-root').invoke('text')
            .then(textFrom =>{
                if(textFrom == transactionsBody.transactions[0].inputs[0].output.addresses){
                    cy.log('success address from')
                }else{
                    cy.log('failed address from')
                }
            })
            cy.get(':nth-child(1) > .MuiGrid-grid-md-8 > .MuiGrid-grid-lg-8 > :nth-child(2) > [style="width: 100%;"] > .MuiGrid-grid-xs-9 > :nth-child(1) > .MuiGrid-grid-xl-7 > a > .MuiTypography-root').invoke('text')
            .then(textTo =>{
                if(textTo == transactionsBody.transactions[0].outputs[0].addresses){
                    cy.log('success adress to')
                }else{
                    cy.log('failde address to')
                }
            })
            cy.get(':nth-child(1) > [style="width: 100%;"] > .MuiGrid-grid-xs-9 > .MuiGrid-container > .MuiGrid-grid-xl-5 > .MuiBox-root > .MuiTypography-subtitle1').invoke('text')
            .then(textIF =>{
                let numberFix =textIF.substring(0,6) 
                if(textIF == numberFix){
                    cy.log('success amount from')
                }else{
                    cy.log('failed amount from')
                }
            })
            cy.get(':nth-child(2) > [style="width: 100%;"] > .MuiGrid-grid-xs-9 > :nth-child(1) > .MuiGrid-grid-xl-5 > .MuiBox-root > .MuiTypography-subtitle1').invoke('text')
            .then(textIT =>{
                let numberFixed = textIT.substring(0,7)
                if(textIT == numberFixed){
                    cy.log('succes amount to')
                }else{
                    cy.log('failed amount to')
                }
            })
        })
        cy.wait('@txfee').then(()=>{
            cy.get(':nth-child(3) > .MuiPaper-root > .MuiCardContent-root').should('be.visible')
            cy.get(':nth-child(3) > .MuiPaper-root > .MuiCardContent-root > .MuiBox-root > .MuiTypography-root').invoke('text')
            .then(textF =>{
                var fee = parseInt(textF)
                if(fee == txFee.aggregates.txfee){
                    cy.log('success fee')
                }else{
                    cy.log('failed fee')
                }
            })
        })
    })
})