describe('Completed cycle', () => {
  it('should log in, complete a cycle, and submit distractions', () => {
    cy.clock()
    cy.fixture('response.json').then((response) => {
      cy.intercept('POST', '**/token?grant_type=password', response).as('login')
    })

    cy.visit('/')
    cy.get('button').click()
    cy.wait('@login')

    cy.contains('Start').click()
    cy.tick(1500000)

    cy.get('input').type('Distraction 1')
    cy.contains('Add').click()

    cy.get('input').type('Distraction 2')
    cy.contains('Add').click()

    cy.intercept('**/auth/v1/user', {
      statusCode: 200,
      body: {
        user: {
          id: 'mock-user-id',
        },
      },
    }).as('submit')
    cy.contains('Submit').click()
    cy.wait('@submit')

    cy.url().should('eq', 'http://localhost:3000/')
  })
})
