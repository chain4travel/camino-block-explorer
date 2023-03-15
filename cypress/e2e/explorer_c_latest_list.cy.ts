import BigNumber from 'bignumber.js'
import { 
    roundedToLocaleString, 
    getDisplayAmount 
} from 'utils/currency-utils'

describe('Explorer: Latest block list and transaction list in C chain', () => {
    beforeEach(() => {
        cy.entryExplorer()
        cy.checkValidatorsTxsGasFee()
        
        // Latest Blocks
        cy.contains('Latest Blocks')
            .siblings('div')
            .parent()
            .find('>div')
            .filter('.MuiGrid-container')
            .as('latestBlocks')

        // Latest Transactions
        cy.get('button:contains(Show All)').eq(1).as('latestTxsButton')
    })

    it('verify latest block list and transaction list', () => {

        cy.fixture('mocks/c_blocks.json').then((cBlocks) => {
            cy.intercept('GET', '**/v2/cblocks*', request => {
                request.reply({
                    statusCode: 200,
                    body: cBlocks,
                })
            }).as('cblocks')
        })
        
        cy.wait('@cblocks').then((intercept) => {
            return intercept.response?.body
        }).then(({blocks}) => {
            cy.get('@latestBlocks').then((latestBlocks) => {
                latestBlocks.each((index, $el) => {
                    cy.wrap($el).children().as('latestBlocksColumn')
                    cy.get('@latestBlocksColumn')
                        .eq(1)
                        .find('>a')
                        .should('have.text', parseInt(blocks[index].number, 16))

                    cy.get('@latestBlocksColumn')
                        .eq(2)
                        .find('>p')
                        .eq(1)
                        .should('have.text', blocks[index].hash)
                    
                    cy.get('@latestBlocksColumn')
                        .eq(3)
                        .find('h6')
                        .invoke('text')
                        .then((gasUsedText) => {
                            expect(parseInt(gasUsedText.replace(/\s/g, ''))).to.equal(parseInt(blocks[index].gasUsed, 16))
                        })
                })
            })

            cy.fixture('mocks/c_blocks_limit.json').then((cBlocksLimit) => {
                cy.intercept('GET', '**/v2/cblocks?limit=0*', request => {
                    request.reply({
                        statusCode: 200,
                        body: cBlocksLimit,
                    })
                }).as('getShowAllCblocks')
            })

            // click show all btn
            cy.get('@latestTxsButton').click()

            cy.wait('@getShowAllCblocks').then((intercept) => {
                return intercept.response?.body.transactions
            }).then((transactions) => {
                cy.get('.MuiTableContainer-root').find('tbody > tr').each(($el, index) => {
                    const tx = transactions[index]
                    const abbreviate = true
                    cy.wrap($el).eq(0).find('>td').as('moreTxsBlock')

                    // Block ID
                    cy.get('@moreTxsBlock').eq(0).should('have.text', parseInt(tx.block, 16))

                    // Address From
                    cy.get('@moreTxsBlock').eq(1).should('have.text', tx.from)

                    // Address To 
                    cy.get('@moreTxsBlock').eq(2).should('have.text', tx.to ? tx.to : '')

                    // Tx ID
                    cy.get('@moreTxsBlock').eq(3).should('have.text', tx.hash)

                    // Amount in Address
                    const txGasFee = roundedToLocaleString(
                        getDisplayAmount(
                            BigNumber(tx.gasUsed)
                            .multipliedBy(BigNumber(tx.effectiveGasPrice))
                            .toNumber()
                        ).value, abbreviate ? 4 : 20, abbreviate
                    )

                    cy.get('@moreTxsBlock')
                        .eq(6)
                        .find('h6')
                        .should('have.text', txGasFee)

                    // Value
                    cy.get('@moreTxsBlock')
                        .eq(7)
                        .find('h6')
                        .should('have.text', roundedToLocaleString(getDisplayAmount(parseInt(tx.value, 16)).value, abbreviate ? 4 : 20, abbreviate))
                })
            })
        })
    })
})