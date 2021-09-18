/// <reference types="Cypress" />

describe("Register new user in Juice shop", () => {

    let randomString = Math.random().toString(36).substring(2);

    let username = "user-" + randomString;
    const email = randomString + "@gmail.com";
    const password = "Password1";
    const maidenName = "Wije"

    
    describe("UI tests", () => {
        beforeEach(() => {
            cy.visit("http://localhost:3000/");
            cy.get(".cdk-overlay-backdrop").click({ force: true });
            cy.get("#navbarAccount").click();
            cy.get("#navbarLoginButton").click();
        })
    
        it("Sign up new user", () => {
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
    
        it("login from new user", () => {
            cy.get("#email").type(email);
            cy.get("#password").type(password);
            cy.get("#loginButton").click();
            cy.get(".mat-button-wrapper").contains("Your Basket").click();
            cy.get("h1").contains(email);
        });
    })
    
    describe("API tests", () => {

        const body = {
            "email": email, 
            "password": password
        }

        it("Test login via API test", () => {
            cy.request({
                method: "POST",
                url: "http://localhost:3000/rest/user/login",
                body
            }).then(response => {
                expect(response.status).to.eql(200);
            })
        });

        it("Login via Token non UI", () => {
            cy.request({
                method: "POST",
                url: "http://localhost:3000/rest/user/login",
                body
            }).then(response => {
                const token = response.body.authentication.token;
                cy.log(token);

                 cy.visit("http://localhost:3000", {
                     //do following before load url
                     onBeforeLoad(browser) {
                         browser.localStorage.setItem("token", token)
                     }
                 })
                cy.get(".cdk-overlay-backdrop").click({ force: true });
                cy.get(".fa-layers-counter").contains(0);
            })
        })
    })
})