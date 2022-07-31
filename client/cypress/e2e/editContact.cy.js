import { crudsViewPage } from "../pages/crudsViewPage"
import { editContactPage } from "../pages/editContactPage"
import { viewDetailContactPage } from "../pages/viewDetailContactPage"

describe('Create a contact', () => {
    beforeEach(() => {
        cy.fixture("data.json").as('data')
        cy.get("@data").then((data) => {
            cy.createContact(data.edit[0])
        })

    });

    it('Verify user can update existing contact info with new and valid values for all fields', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage.checkUrl("edit")
            editContactPage.checkOldContact(data.edit[0])
            cy.editContact(data.edit[1])
            editContactPage.checkNotUrl("edit")
            viewDetailContactPage.checkContact(data.edit[1])

        })
    })
    it('Verify user can update existing contact info with new and valid value for Company Name only', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage.checkUrl("edit")
            editContactPage.checkOldContact(data.edit[0])
            cy.editContact(data.edit[2])
            editContactPage.checkNotUrl("edit")
            viewDetailContactPage.checkCompanyName(data.edit[2].companyName)
        })
    })
    it('Verify user can update existing contact info with new and valid value for Phone only', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage.checkUrl("edit")
            editContactPage.checkOldContact(data.edit[0])
            cy.editContact(data.edit[3])
            editContactPage.checkNotUrl("edit")
            viewDetailContactPage.checkPhone(data.edit[3].phone)
        })
    })
    it('Verify user can update existing contact info with new and valid value for Email only', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage.checkUrl("edit")
            editContactPage.checkOldContact(data.edit[0])
            cy.editContact(data.edit[4])
            editContactPage.checkNotUrl("edit")
            viewDetailContactPage.checkEmail(data.edit[4].email)
        })
    })
    it('Verify user can update existing contact info with new and valid value for Location only', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage.checkUrl("edit")
            editContactPage.checkOldContact(data.edit[0])
            cy.editContact(data.edit[5])
            editContactPage.checkNotUrl("edit")
            viewDetailContactPage.checkLocation(data.edit[5].location)
        })
    })
    it('Verify user can update existing contact info with new and valid value for Link only', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage.checkUrl("edit")
            editContactPage.checkOldContact(data.edit[0])
            cy.editContact(data.edit[6])
            editContactPage.checkNotUrl("edit")
            viewDetailContactPage.checkLink(data.edit[6].link)
        })
    })
    it('Verify user can update existing contact info with new and valid value for Description only', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage.checkUrl("edit")
            editContactPage.checkOldContact(data.edit[0])
            cy.editContact(data.edit[7])
            editContactPage.checkNotUrl("edit")
            viewDetailContactPage.checkDescription(data.edit[7].description)
        })
    })

    it('Verify that user can not create a new contact when leaving Company Name field empty', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage.checkUrl("edit")
            editContactPage.checkOldContact(data.edit[0])
            cy.get(editContactPage.TXT_COMPANYNAME).clear()
            editContactPage.clickUpdate()
            editContactPage.checkUrl("edit")
            editContactPage.checkInvalidInput(1)
            editContactPage.checkCompanyNameValidationMessage()
        })
    })
    it('Verify that user can not create a new contact when leaving Phone field empty', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage.checkUrl("edit")
            editContactPage.checkOldContact(data.edit[0])
            cy.get(editContactPage.TXT_PHONE).clear()
            editContactPage.clickUpdate()
            editContactPage.checkUrl("edit")
            editContactPage.checkInvalidInput(1)
            editContactPage.checkPhoneValidationMessage()
        })
    })
    it('Verify that user can not create a new contact when leaving Email field empty', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage.checkUrl("edit")
            editContactPage.checkOldContact(data.edit[0])
            cy.get(editContactPage.TXT_EMAIL).clear()
            editContactPage.clickUpdate()
            editContactPage.checkUrl("edit")
            editContactPage.checkInvalidInput(1)
            editContactPage.checkEmailValidationMessage()
        })
    })
    it('Verify that user can not create a new contact when leaving Location field empty', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage.checkUrl("edit")
            editContactPage.checkOldContact(data.edit[0])
            cy.get(editContactPage.TXT_LOCATION).clear()
            editContactPage.clickUpdate()
            editContactPage.checkUrl("edit")
            editContactPage.checkInvalidInput(1)
            editContactPage.checkLocationValidationMessage()
        })
    })
    it('Verify that user can not create a new contact when leaving Description field empty', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage.checkUrl("edit")
            editContactPage.checkOldContact(data.edit[0])
            cy.get(editContactPage.TXT_DESCRIPTION).clear()
            editContactPage.clickUpdate()
            editContactPage.checkUrl("edit")
            editContactPage.checkInvalidInput(1)
            editContactPage.checkDescriptionValidationMessage()
        })
    })

    it('Verify that user can create a new contact when leaving Link field empty', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage.checkUrl("edit")
            editContactPage.checkOldContact(data.edit[0])
            cy.get(editContactPage.TXT_LINK).clear()
            editContactPage.clickUpdate()
            editContactPage.checkNotUrl("edit")
            viewDetailContactPage.checkLink("")
        })
    })

    it('Verify that user can not create a new contact when leaving all fields empty', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage.checkUrl("edit")
            editContactPage.checkOldContact(data.edit[0])
            editContactPage.clearAllFields()
            editContactPage.clickUpdate()
            editContactPage.checkUrl("edit")
            editContactPage.checkInvalidInput(4)
            editContactPage.checkInvalidTextArea(1)
            editContactPage.checkCompanyNameValidationMessage()
            editContactPage.checkPhoneValidationMessage()
            editContactPage.checkEmailValidationMessage()
            editContactPage.checkLocationValidationMessage()
            editContactPage.checkDescriptionValidationMessage()
        })
    })

    it('Verify user can not update existing contact info with invalid Company Name', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage.checkUrl("edit")
            editContactPage.checkOldContact(data.edit[0])
            data.invalidString.forEach((val) => {
                editContactPage.typeCompanyName(val)
                editContactPage.clickUpdate()
                editContactPage.checkUrl("edit")
                editContactPage.checkInvalidInput(1)
                editContactPage.checkCompanyNameValidationMessage()
            })

        })
    })
    it('Verify user can not update existing contact info with invalid Location', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage.checkUrl("edit")
            editContactPage.checkOldContact(data.edit[0])
            data.invalidString.forEach((val) => {
                editContactPage.typeLocation(val)
                editContactPage.clickUpdate()
                editContactPage.checkUrl("edit")
                editContactPage.checkInvalidInput(1)
                editContactPage.checkLocationValidationMessage()
            })

        })
    })
    it('Verify user can not update existing contact info with invalid Description', () => {
        viewDetailContactPage.clickEdit()
        editContactPage.checkUrl("edit")
        editContactPage.checkOldContact(data.edit[0])
        cy.get("@data").then((data) => {
            data.invalidString.forEach((val) => {
                editContactPage.typeDescription(val)
                editContactPage.clickUpdate()
                editContactPage.checkUrl("edit")
                editContactPage.checkInvalidInput(1)
                editContactPage.checkDescriptionValidationMessage()
            })
        })
    })
    it('Verify user can not update existing contact info with invalid Phone Number', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage.checkUrl("edit")
            editContactPage.checkOldContact(data.edit[0])
            data.invalidPhone.forEach((val) => {
                editContactPage.typePhone(val)
                editContactPage.clickUpdate()
                editContactPage.checkUrl("edit")
                editContactPage.checkInvalidInput(1)
                editContactPage.checkPhoneValidationMessage()
            })

        })
    })
    it('Verify user can not update existing contact info with invalid Email', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage.checkUrl("edit")
            editContactPage.checkOldContact(data.edit[0])
            data.invalidEmail.forEach((val) => {
                editContactPage.typeEmail(val)
                editContactPage.clickUpdate()
                editContactPage.checkUrl("edit")
                editContactPage.checkInvalidInput(1)
                editContactPage.checkEmailValidationMessage(val)
            })

        })
    })
    it('Verify user can not update existing contact info with invalid Link', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage.checkUrl("edit")
            editContactPage.checkOldContact(data.edit[0])
            data.invalidLink.forEach((val) => {
                editContactPage.typeLink(val)
                editContactPage.clickUpdate()
                editContactPage.checkUrl("edit")
                editContactPage.checkInvalidInput(1)
                editContactPage.checkLinkValidationMessage()
            })
        })
    })

    it('Verify user can not update existing contact info when changing Company Name into already existing one', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.edit[1])
            viewDetailContactPage.clickEdit()
            editContactPage.checkUrl("edit")
            editContactPage.checkOldContact(data.edit[1])
            data.existedCompanyName.forEach((val) => {
                editContactPage.typeCompanyName(val)
                editContactPage.clickUpdate()
                editContactPage.checkUrl("edit")
                cy.contains('Company Name Already Exists').should('exist')
            })
        })
    })
    it('Verify user can not update existing contact info when changing Email into already existing one', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.edit[1])
            viewDetailContactPage.clickEdit()
            editContactPage.checkUrl("edit")
            editContactPage.checkOldContact(data.edit[1])
            editContactPage.typeEmail('info@atlanticplc.com')
            editContactPage.clickUpdate()
            editContactPage.checkUrl("edit")
            editContactPage.checkInvalidInput(1)
            cy.contains('Email Already Exists').should('exist')
        })
    })
    it('Verify user can update existing contact info when changing Phone into already existing one', () => {   
        cy.get("@data").then((data) => {
            cy.createContact(data.edit[1])
            viewDetailContactPage.clickEdit()
            editContactPage.checkUrl("edit")
            editContactPage.checkOldContact(data.edit[1])
            editContactPage.typePhone('251-911-603566')
            editContactPage.clickUpdate()
            editContactPage.checkNotUrl("edit")
            viewDetailContactPage.checkPhone('251-911-603566')
        })
    })
    it('Verify user can update existing contact info when changing Location into already existing one', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.edit[1])
            viewDetailContactPage.clickEdit()
            editContactPage.checkUrl("edit")
            editContactPage.checkOldContact(data.edit[1])
            editContactPage.typeLocation('Wello Sefer, Addis Ababa')
            editContactPage.clickUpdate()
            editContactPage.checkNotUrl("edit")
            viewDetailContactPage.checkLocation('Wello Sefer, Addis Ababa')
        })
    })
    it('Verify user can update existing contact info when changing Link into already existing one', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.edit[1])
            viewDetailContactPage.clickEdit()
            editContactPage.checkUrl("edit")
            editContactPage.checkOldContact(data.edit[1])
            editContactPage.typeLink('https://atlanticplc.com')
            editContactPage.clickUpdate()
            editContactPage.checkNotUrl("edit")
            viewDetailContactPage.checkLink('https://atlanticplc.com')
        })
    })
    it('Verify user can update existing contact info when changing Description into already existing one', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.edit[1])
            viewDetailContactPage.clickEdit()
            editContactPage.checkUrl("edit")
            editContactPage.checkOldContact(data.edit[1])
            editContactPage.typeDescription('Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia')
            editContactPage.clickUpdate()
            editContactPage.checkNotUrl("edit")
            viewDetailContactPage.checkDescription('Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia')
        })
    })
    it.only('Verify that user can cancel the process of updating a contact info', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage.checkUrl("edit")
            editContactPage.checkOldContact(data.edit[0])
            editContactPage.clickCancel()
            editContactPage.checkNotUrl("edit")
        })
    })

})
