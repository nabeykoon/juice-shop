/// <reference types="Cypress" />

describe("Register new user in Juice shop", () => {

    let randomString = Math.random().toString(36).substring(2);

    let username = "user-" + randomString;
    let email = randomString + "@gmail.com";
    let password = "Password1";
    let maidenName = "Wije"

    it("Sign up new user", () => {
        cy.visit("http://localhost:3000/");
        cy.get(".cdk-overlay-backdrop").click({ force: true });
        cy.get("#navbarAccount").click();
        cy.get("#navbarLoginButton").click();
        cy.get("#newCustomerLink").click();
        cy.get("#emailControl").type(email);
        cy.get("#passwordControl").type(password);
        cy.get("#repeatPasswordControl").type(password);
        cy.get(".mat-select-placeholder").click();
        cy.get(".mat-option").contains("Mother's maiden name?").click();
        cy.get("#securityAnswerControl").type(maidenName);
        cy.get("#registerButton").click();
        cy.get(".mat-simple-snackbar").contains("Registration completed successfully");
    });
})