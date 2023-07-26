// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import '@testing-library/cypress/add-commands'
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

declare global {
  namespace Cypress {
    interface Chainable {
      assertHome(): Chainable<Element>
      assertLoggedInAs(user: any): Chainable<Element>
      //login(email: string, password: string): Chainable<void>
      //drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}

Cypress.Commands.add('assertHome', () => {
  cy.url().should('eq', `${Cypress.config().baseUrl}/`)
})

Cypress.Commands.add('assertLoggedInAs', user => {
  cy.window().its('localStorage.token').should('be.a', 'string')
  cy.findByTestId('username-display').should('have.text', user.username)
})
