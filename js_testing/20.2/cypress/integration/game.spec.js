/* eslint-disable no-undef */
/// <reference types="cypress" />
describe('Игра в пары', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Цифры в клетке должны быть невидимы', () => {
    cy.get('.gameForm').should('not.have.class', 'is-open');
  });

  it('Нажатая карта остается открытой', () => {
    cy.get('.gameForm').eq(5).click();
    cy.get('.gameForm').should('have.class', 'is-open');
  });

  it('Найденная пара карточек осталась видимой', () => {
    let fcardText;
    for (let i = 1; i < 14; ++i) {
      cy.get('.gameForm').eq(0).click()
        .get('.is-open')
        .then(($fcard) => {
          // save text from the first element
          fcardText = $fcard.text()
        })

      cy.get('.gameForm').eq(i).click()
        .get('.is-open').eq(1)
        .then(($scard) => {
          // save text from the second element
          let scardText = $scard.text();
          if (scardText == fcardText) {
            cy.get('.is-open').should('have.class', 'is-open');
            return
          }
        })
    }
  }
  );

  it('После нажатия на вторую карточку обе становятся невидимыми', () => {
    let fcardText;
    for (let i = 1; i < 14; ++i) {
      cy.get('.gameForm').eq(0).click()
        // .get('.is-open')
        .then(($fcard) => {
          // save text from the first element
          fcardText = $fcard.text()
        })

      cy.get('.gameForm').eq(i).click()
        // .get('.is-open').eq(1)
        .then(($scard) => {
          // save text from the second element
          let scardText = $scard.text();
          if (scardText != fcardText) {
            cy.get('.gameForm').eq(i + 1).click()
            cy.get('.gameForm').eq(0).should('not.have.class', 'is-open');
            cy.get('.gameForm').eq(i).should('not.have.class', 'is-open')
            return
          }
        })
      return;
    }
  });
});
