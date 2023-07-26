describe('Home Navigation ', () => {
  it('should navigate to the home page', () => {
    cy.visit('/home')
    cy.findByText(/log in/i)
    cy.findByText(/oec/i)
    const link = cy.findByRole('link', {name: /oec data/i})
    link.findByText(/data/i)
  })

  it('should have a combobox', () => {
    cy.visit('/home')
    cy.findByRole('combobox', {name: /country/i})
  })
})

describe('Country Navigation ', () => {
  it('should redirect to home when no country name', () => {
    cy.visit('/country/saarg?')
    cy.findByText(/log in/i)
    cy.findByText(/oec/i)
    cy.findByText(/Find trade data in outer space/i)
  })
})
