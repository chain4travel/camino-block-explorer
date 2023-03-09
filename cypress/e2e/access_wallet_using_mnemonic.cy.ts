import { expect } from 'chai'
import { changeNetwork, accessWallet, addKopernikusNetwork, acceptCookies } from '../utils/utils'

describe('Wallet Access Mnemonic', () => {
    before(() => {
        cy.visit('/')
    })

    it('open suite/open wallet using mnemonic', () => {
        addKopernikusNetwork(cy)
        //changeNetwork(cy);
        accessWallet(cy, 'mnemonic')
    })
})
