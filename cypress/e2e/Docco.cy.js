/// <reference types="Cypress" />

const getIframeDocument = () => {
  return cy
    .get('iframe[id=storybook-preview-iframe]')
    // Cypress yields jQuery element, which has the real
    // DOM element under property "0".
    // From the real DOM iframe element we can get
    // the "document" element, it is stored in "contentDocument" property
    // Cypress "its" command can access deep properties using dot notation
    // https://on.cypress.io/its
    .its('0.contentDocument').should('exist')
}

const getIframeBody = () => {
  // get the document
  return getIframeDocument()
    // automatically retries until body is loaded
    .its('body').should('not.be.undefined')
    // wraps "body" DOM element to allow
    // chaining more Cypress commands, like ".find(...)"
    .then(cy.wrap)
}

describe('Docco App', () => {
  it('check spec url is updated', () => {
    cy.visit('http://localhost:45687/?path=/story/docco--open-api')
    cy.get('#control-url').clear().type('http://myspec.com')
    getIframeBody().find('#storybook-root h3').should('have.text', 'URL: http://myspec.com')
  })
  it('check default theme is light', () => {
    cy.visit('http://localhost:45687/?path=/story/docco--open-api')
    cy.get('#control-url').clear().type('http://myspec.com')
    getIframeBody().find('#storybook-root > div').should('have.css', 'background-color', 'rgb(0, 128, 0)')
  })
  it('check dark theme is updated', () => {
    cy.visit('http://localhost:45687/?path=/story/docco--open-api')
    cy.get('#control-theme-1').click()
    getIframeBody().find('#storybook-root > div').should('have.css', 'background-color', 'rgb(255, 0, 0)')
  })
})