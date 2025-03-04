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

describe('Login', () => {
  it('should log in and navigate to home screen', () => {
    cy.fixture('response.json').then((response) => {
      cy.intercept('POST', '**/token?grant_type=password', response).as('login')
    })

    cy.visit('/')
    cy.get('input[name="email"]').type('user@email.com')
    cy.get('input[name="password"]').type('password')
    cy.get('button').click()
    cy.wait('@login')

    cy.get('h1').contains('Focus Cycle')
  })
})

describe('Configure Timer', () => {
  it('should log in and configure a Focus, Short Rest, and Long Rest timer', () => {
    cy.fixture('response.json').then((response) => {
      cy.intercept('POST', '**/token?grant_type=password', response).as('login')
    })
    cy.visit('/')
    cy.get('button').click()
    cy.wait('@login')

    cy.get('img[alt="settings"]').click()
    cy.url().should('include', '/settings')

    cy.get('img[alt="plus icon"]').eq(0).click()
    cy.get('img[alt="minus icon"]').eq(1).click()
    cy.get('img[alt="plus icon"]').eq(2).click()
    cy.get('button').contains('Save').click()

    cy.url().should(
      'eq',
      Cypress.config().baseUrl +
        '/?focusTimer=1560000&shortRestTimer=240000&longRestTimer=960000',
    )
    cy.get('span').should('contain', '26:00')

    cy.get('img[alt="arrow-right"]').click()
    cy.get('span').should('contain', '04:00')

    cy.get('img[alt="arrow-right"]').click()
    cy.get('span').should('contain', '16:00')
  })
})

describe('Check distraction list', () => {
  it('should sign in and check the distraction list itens', () => {
    cy.visit('/')
    cy.get('input[name="email"]').type('test_user@email.com')
    cy.get('input[name="password"]').type('pass123')
    cy.get('button').click()

    cy.get('ul>li').should('have.length', 2)
    cy.get('ul>li').eq(0).should('contain', 'cellphone (x1)')
    cy.get('ul>li').eq(1).should('contain', 'tv (x1)')
  })
})
