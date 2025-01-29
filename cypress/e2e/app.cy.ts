describe('Navigation', () => {
  it('should navigate to the sign-up page', () => {
    cy.visit('/')
    cy.get('a[href="/sign-up"]').click()
    cy.url().should('include', '/sign-up')
    cy.get('small').eq(0).contains('Get started with your new account')
  })
})

describe('Sign-up', () => {
  it('should sign up a new user', () => {
    cy.intercept('POST', '**/signup', {
      statusCode: 200,
      body: {
        user: {
          id: '123',
          email: 'user@email.com',
        },
        access_token: 'mocked-access-token',
      },
    }).as('signUp')

    cy.visit('/sign-up')
    cy.get('input[name="email"]').type('user@email.com')
    cy.get('input[name="password"]').type('password')
    cy.get('button').click()
    cy.wait('@signUp')

    cy.url().should('include', '/')
  })
})
