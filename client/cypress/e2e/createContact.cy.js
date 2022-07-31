import { createContactPage } from "../pages/createContactPage";
import { viewDetailContactPage } from "../pages/viewDetailContactPage";

describe('Create a contact', () => {
    beforeEach(() => {
        cy.fixture("data.json").as('data')
    });

    it('Verify that user can create a new contact info successfully with valid data and no empty fields', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.create[0])
            viewDetailContactPage.checkContact(data.create[1])
        })
    })
    it('Verify that user can not create a new contact when leaving Company Name field empty', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.create[1])
            createContactPage.checkUrl(Cypress.env('createUrl'))
            createContactPage.checkInvalidInput(1)
            createContactPage.checkCompanyNameValidationMessage()
        })
    })
    it('Verify that user can not create a new contact when leaving Phone field empty', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.create[2])
            createContactPage.checkUrl(Cypress.env('createUrl'))
            createContactPage.checkInvalidInput(1)
            createContactPage.checkPhoneValidationMessage()
        })
    })
    it('Verify that user can not create a new contact when leaving Email field empty', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.create[3])
            createContactPage.checkUrl(Cypress.env('createUrl'))
            createContactPage.checkInvalidInput(1)
            createContactPage.checkEmailValidationMessage()
        })
    })
    it('Verify that user can not create a new contact when leaving Location field empty', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.create[4])
            createContactPage.checkUrl(Cypress.env('createUrl'))
            createContactPage.checkInvalidInput(1)
            createContactPage.checkLocationValidationMessage()
        })
    })
    it('Verify that user can not create a new contact when leaving Description field empty', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.create[6])
            createContactPage.checkUrl(Cypress.env('createUrl'))
            createContactPage.checkInvalidTextArea(1)
            createContactPage.checkDescriptionValidationMessage()
        })
    })
    it('Verify that user can not create a new contact when leaving all fields empty', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.create[7])
            createContactPage.checkUrl(Cypress.env('createUrl'))
            createContactPage.checkInvalidInput(4)
            createContactPage.checkInvalidTextArea(1)
            createContactPage.checkCompanyNameValidationMessage()
            createContactPage.checkPhoneValidationMessage()
            createContactPage.checkEmailValidationMessage()
            createContactPage.checkLocationValidationMessage()
            createContactPage.checkDescriptionValidationMessage()
        })
    })
    it('Verify that user can not create a new contact with invalid Phone Number', () => {
        cy.get("@data").then((data) => {
            data.invalidPhone.forEach((val) => {
                cy.createContact(data.create[2])
                createContactPage.typePhone(val)
                createContactPage.clickSubmit()
                createContactPage.checkUrl(Cypress.env('createUrl'))
                createContactPage.checkInvalidInput(1)
                createContactPage.checkPhoneValidationMessage()
            })

        })
    })
    it('Verify that user can not create a new contact with invalid Email', () => {
        cy.get("@data").then((data) => {
            data.invalidEmail.forEach((val) => {
                cy.createContact(data.create[3])
                createContactPage.typeEmail(val)
                createContactPage.clickSubmit()
                createContactPage.checkUrl(Cypress.env('createUrl'))
                createContactPage.checkInvalidInput(1)
                createContactPage.checkEmailValidationMessage(val)
            })

        })
    })
    it.only('Verify that user can not create a new contact with invalid Link', () => {
        cy.get("@data").then((data) => {
            data.invalidLink.forEach((val) => {
                cy.createContact(data.create[5])
                createContactPage.typeLink(val)
                createContactPage.clickSubmit()
                createContactPage.checkUrl(Cypress.env('createUrl'))
                createContactPage.checkInvalidInput(1)
                createContactPage.checkLinkValidationMessage(val)
            })

        })
    })

    it('Verify that user can not create a new contact with invalid Company Name', () => {
        cy.get("@data").then((data) => {
            data.invalidString.forEach((val) => {
                cy.createContact(data.create[1])
                createContactPage.typeCompanyName(val)
                createContactPage.clickSubmit()
                createContactPage.checkUrl(Cypress.env('createUrl'))
                createContactPage.checkInvalidInput(1)
                createContactPage.checkCompanyNameValidationMessage()
            })

        })
    })
    it('Verify that user can not create a new contact with invalid Location', () => {
        cy.get("@data").then((data) => {
            data.invalidString.forEach((val) => {
                cy.createContact(data.create[4])
                createContactPage.typeLocation(val)
                createContactPage.clickSubmit()
                createContactPage.checkUrl(Cypress.env('createUrl'))
                createContactPage.checkInvalidInput(1)
                createContactPage.checkLocationValidationMessage()
            })

        })
    })
    it('Verify that user can not create a new contact with invalid Description', () => {
        cy.get("@data").then((data) => {
            data.invalidString.forEach((val) => {
                cy.createContact(data.create[6])
                createContactPage.typeDescription(val)
                createContactPage.clickSubmit()
                createContactPage.checkUrl(Cypress.env('createUrl'))
                createContactPage.checkInvalidInput(1)
                createContactPage.checkDescriptionValidationMessage()
            })
        })
    })

    it('Verify that user can create a new contact when leaving Link field empty', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.create[5])
            viewDetailContactPage.checkContact(data.create[5])
        })
    })
    it('Verify that user can not create a new contact when a Company Name already exists', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.create[0])
            data.existedCompanyName.forEach((val) => {
                cy.createContact(data.create[8])
                createContactPage.typeCompanyName(val)
                createContactPage.clickSubmit()
                createContactPage.checkUrl(Cypress.env('createUrl'))
                cy.contains('Company Name Already Exists').should('exist')
            })
        })
    })
    it('Verify that user can not create a new contact when an Email already exists', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.create[0])
            cy.createContact(data.create[9])
            createContactPage.checkUrl(Cypress.env('createUrl'))
            cy.contains('Email Already Exists').should('exist')

        })
    })
    it('Verify that user can create a new contact when a Phone already exists', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.create[0])
            cy.createContact(data.create[10])
            viewDetailContactPage.checkContact(data.create[10])
        })
    })
    it('Verify that user can create a new contact when a Location already exists', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.create[0])
            cy.createContact(data.create[11])
            viewDetailContactPage.checkContact(data.create[11])
        })
    })
    it('Verify that user can create a new contact when a Link already exists', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.create[0])
            cy.createContact(data.create[12])
            viewDetailContactPage.checkContact(data.create[12])
        })
    })
    it('Verify that user can create a new contact when a Description already exists', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.create[0])
            cy.createContact(data.create[13])
            viewDetailContactPage.checkContact(data.create[13])
        })
    })
    it('Verify that user can cancel the process of creating new contact info', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.create[0])
            cy.createContact(data.create[14])
            createContactPage.clickCancel()
            createContactPage.checkUrl(Cypress.env('tableViewUrl'))
        })
    })
})