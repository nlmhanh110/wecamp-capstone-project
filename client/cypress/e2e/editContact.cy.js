import { tableViewPage } from "../pages/tableViewPage"
import { gridViewPage } from "../pages/gridViewPage"
import { listViewPage } from "../pages/listViewPage"
import { editContactPage } from "../pages/editContactPage"
import { viewDetailContactPage } from "../pages/viewDetailContactPage"
import {navComponent} from "../pages/navComponent"
let createdContactId = []

describe('Edit a contact', () => {
    beforeEach(() => {
        if (createdContactId) {
            createdContactId.forEach(_id => {
                cy.request({
                    method: 'DELETE',
                    url: `http://localhost:8080/api/cruds/${_id}`
                })
            });
            createdContactId = []
        }
        cy.fixture("data.json").as('data')
        cy.get("@data").then((data) => {
            cy.createContact(data.edit[0])
            cy.url().then((url) => {
                if (!url.includes('new')) {
                    const id = url.split('/').pop();
                    createdContactId.push(id)
                }
            })
        })
    });
    it('Verify user can update existing contact info with new and valid values for all fields', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage
                .checkUrl("edit")
                .checkOldContact(data.edit[0])
            cy.editContact(data.edit[1])
            editContactPage.checkNotUrl("edit")
            viewDetailContactPage.checkContact(data.edit[1])

        })
    })
    it('Verify user can update existing contact info with new and valid value for Company Name only', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage
                .checkUrl("edit")
                .checkOldContact(data.edit[0])
            cy.editContact(data.edit[2])
            editContactPage.checkNotUrl("edit")
            viewDetailContactPage.checkCompanyName(data.edit[2].companyName)
        })
    })
    it('Verify user can update existing contact info with new and valid value for Phone only', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage
                .checkUrl("edit")
                .checkOldContact(data.edit[0])
            cy.editContact(data.edit[3])
            editContactPage.checkNotUrl("edit")
            viewDetailContactPage.checkPhone(data.edit[3].phone)
        })
    })
    it('Verify user can update existing contact info with new and valid value for Email only', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage
                .checkUrl("edit")
                .checkOldContact(data.edit[0])
            cy.editContact(data.edit[4])
            editContactPage.checkNotUrl("edit")
            viewDetailContactPage.checkEmail(data.edit[4].email)
        })
    })
    it('Verify user can update existing contact info with new and valid value for Location only', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage
                .checkUrl("edit")
                .checkOldContact(data.edit[0])
            cy.editContact(data.edit[5])
            editContactPage.checkNotUrl("edit")
            viewDetailContactPage.checkLocation(data.edit[5].location)
        })
    })
    it('Verify user can update existing contact info with new and valid value for Link only', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage
                .checkUrl("edit")
                .checkOldContact(data.edit[0])
            cy.editContact(data.edit[6])
            editContactPage.checkNotUrl("edit")
            viewDetailContactPage.checkLink(data.edit[6].link)
        })
    })
    it('Verify user can update existing contact info with new and valid value for Description only', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage
                .checkUrl("edit")
                .checkOldContact(data.edit[0])
            cy.editContact(data.edit[7])
            editContactPage.checkNotUrl("edit")
            viewDetailContactPage.checkDescription(data.edit[7].description)
        })
    })

    it('Verify that user can not create a new contact when leaving Company Name field empty', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage
                .checkUrl("edit")
                .checkOldContact(data.edit[0])
            cy.get(editContactPage.TXT_COMPANYNAME).clear()
            editContactPage
                .clickUpdate()
                .checkUrl("edit")
                .checkInvalidInput(1)
                .checkCompanyNameValidationMessage()
        })
    })
    it('Verify that user can not create a new contact when leaving Phone field empty', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage
                .checkUrl("edit")
                .checkOldContact(data.edit[0])
            cy.get(editContactPage.TXT_PHONE).clear()
            editContactPage
                .clickUpdate()
                .checkUrl("edit")
                .checkInvalidInput(1)
                .checkPhoneValidationMessage()
        })
    })
    it('Verify that user can not create a new contact when leaving Email field empty', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage
                .checkUrl("edit")
                .checkOldContact(data.edit[0])
            cy.get(editContactPage.TXT_EMAIL).clear()
            editContactPage
                .clickUpdate()
                .checkUrl("edit")
                .checkInvalidInput(1)
                .checkEmailValidationMessage()
        })
    })
    it('Verify that user can not create a new contact when leaving Location field empty', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage
                .checkUrl("edit")
                .checkOldContact(data.edit[0])
            cy.get(editContactPage.TXT_LOCATION).clear()
            editContactPage
                .clickUpdate()
                .checkUrl("edit")
                .checkInvalidInput(1)
                .checkLocationValidationMessage()
        })
    })
    it('Verify that user can not create a new contact when leaving Description field empty', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage
                .checkUrl("edit")
                .checkOldContact(data.edit[0])
            cy.get(editContactPage.TXT_DESCRIPTION).clear()
            editContactPage
                .clickUpdate()
                .checkUrl("edit")
                .checkInvalidInput(1)
                .checkDescriptionValidationMessage()
        })
    })

    it('Verify that user can create a new contact when leaving Link field empty', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage
                .checkUrl("edit")
                .checkOldContact(data.edit[0])
            cy.get(editContactPage.TXT_LINK).clear()
            editContactPage
                .clickUpdate()
                .checkNotUrl("edit")
            viewDetailContactPage.checkLink("")
        })
    })

    it('Verify that user can not create a new contact when leaving all fields empty', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage
                .checkUrl("edit")
                .checkOldContact(data.edit[0])
                .clearAllFields()
                .clickUpdate()
                .checkUrl("edit")
                .checkInvalidInput(4)
                .checkInvalidTextArea(1)
                .checkCompanyNameValidationMessage()
                .checkPhoneValidationMessage()
                .checkEmailValidationMessage()
                .checkLocationValidationMessage()
                .checkDescriptionValidationMessage()
        })
    })

    it('Verify user can not update existing contact info with invalid Company Name', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage
                .checkUrl("edit")
                .checkOldContact(data.edit[0])
            data.invalidString.forEach((val) => {
                editContactPage
                    .typeCompanyName(val)
                    .clickUpdate()
                    .checkUrl("edit")
                    .checkInvalidInput(1)
                    .checkCompanyNameValidationMessage()
            })

        })
    })
    it('Verify user can not update existing contact info with invalid Location', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage
                .checkUrl("edit")
                .checkOldContact(data.edit[0])
            data.invalidString.forEach((val) => {
                editContactPage
                    .typeLocation(val)
                    .clickUpdate()
                    .checkUrl("edit")
                    .checkInvalidInput(1)
                    .checkLocationValidationMessage()
            })

        })
    })
    it('Verify user can not update existing contact info with invalid Description', () => {
        viewDetailContactPage.clickEdit()
        cy.get("@data").then((data) => {
            editContactPage
                .checkUrl("edit")
                .checkOldContact(data.edit[0])
            data.invalidString.forEach((val) => {
                editContactPage
                    .typeDescription(val)
                    .clickUpdate()
                    .checkUrl("edit")
                    .checkInvalidTextArea(1)
                    .checkDescriptionValidationMessage()
            })
        })
    })
    it('Verify user can not update existing contact info with invalid Phone Number', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage
                .checkUrl("edit")
                .checkOldContact(data.edit[0])
            data.invalidPhone.forEach((val) => {
                editContactPage
                    .typePhone(val)
                    .clickUpdate()
                    .checkUrl("edit")
                    .checkInvalidInput(1)
                    .checkPhoneValidationMessage()
            })

        })
    })
    it('Verify user can not update existing contact info with invalid Email', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage
                .checkUrl("edit")
                .checkOldContact(data.edit[0])
            data.invalidEmail.forEach((val) => {
                editContactPage
                    .typeEmail(val)
                    .clickUpdate()
                    .checkUrl("edit")
                    .checkInvalidInput(1)
                    .checkEmailValidationMessage(val)
            })

        })
    })
    it('Verify user can not update existing contact info with invalid Link', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage
                .checkUrl("edit")
                .checkOldContact(data.edit[0])
            data.invalidLink.forEach((val) => {
                editContactPage
                    .typeLink(val)
                    .clickUpdate()
                    .checkUrl("edit")
                    .checkInvalidInput(1)
                    .checkLinkValidationMessage()
            })
        })
    })

    it('Verify user can not update existing contact info when changing Company Name into already existing one', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.edit[1])
            cy.url().then((url) => {
                if (!url.includes('new')) {
                    const id = url.split('/').pop();
                    createdContactId.push(id)
                }
            })
            viewDetailContactPage.clickEdit()
            editContactPage
                .checkUrl("edit")
                .checkOldContact(data.edit[1])
            data.existedCompanyName.forEach((val) => {
                editContactPage
                    .typeCompanyName(val)
                    .clickUpdate()
                    .checkUrl("edit")
                cy.contains('Company Name Already Exists').should('exist')
            })
        })
    })
    it('Verify user can not update existing contact info when changing Email into already existing one', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.edit[1])
            cy.url().then((url) => {
                if (!url.includes('new')) {
                    const id = url.split('/').pop();
                    createdContactId.push(id)
                }
            })
            viewDetailContactPage.clickEdit()
            editContactPage
                .checkUrl("edit")
                .checkOldContact(data.edit[1])
                .typeEmail('info@atlanticplc.com')
                .clickUpdate()
                .checkUrl("edit")
            cy.contains('Email Already Exists').should('exist')
        })
    })
    it('Verify user can update existing contact info when changing Phone into already existing one', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.edit[1])
            cy.url().then((url) => {
                if (!url.includes('new')) {
                    const id = url.split('/').pop();
                    createdContactId.push(id)
                }
            })
            viewDetailContactPage.clickEdit()
            editContactPage
                .checkUrl("edit")
                .checkOldContact(data.edit[1])
                .typePhone('251-911-603566')
                .clickUpdate()
                .checkNotUrl("edit")
            viewDetailContactPage.checkPhone('251-911-603566')
        })
    })
    it('Verify user can update existing contact info when changing Location into already existing one', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.edit[1])
            cy.url().then((url) => {
                if (!url.includes('new')) {
                    const id = url.split('/').pop();
                    createdContactId.push(id)
                }
            })
            viewDetailContactPage.clickEdit()
            editContactPage
                .checkUrl("edit")
                .checkOldContact(data.edit[1])
                .typeLocation('Wello Sefer, Addis Ababa')
                .clickUpdate()
                .checkNotUrl("edit")
            viewDetailContactPage.checkLocation('Wello Sefer, Addis Ababa')
        })
    })
    it('Verify user can update existing contact info when changing Link into already existing one', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.edit[1])
            cy.url().then((url) => {
                if (!url.includes('new')) {
                    const id = url.split('/').pop();
                    createdContactId.push(id)
                }
            })
            viewDetailContactPage.clickEdit()
            editContactPage
                .checkUrl("edit")
                .checkOldContact(data.edit[1])
                .typeLink('https://atlanticplc.com')
                .clickUpdate()
                .checkNotUrl("edit")
            viewDetailContactPage.checkLink('https://atlanticplc.com')
        })
    })
    it('Verify user can update existing contact info when changing Description into already existing one', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.edit[1])
            cy.url().then((url) => {
                if (!url.includes('new')) {
                    const id = url.split('/').pop();
                    createdContactId.push(id)
                }
            })
            viewDetailContactPage.clickEdit()
            editContactPage
                .checkUrl("edit")
                .checkOldContact(data.edit[1])
                .typeDescription('Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia')
                .clickUpdate()
                .checkNotUrl("edit")
            viewDetailContactPage.checkDescription('Atlantic IT Solutions is an ICT Company established in early 2008 GC in Ethiopia')
        })
    })
    it('Verify that user can cancel the process of updating a contact info', () => {
        cy.get("@data").then((data) => {
            viewDetailContactPage.clickEdit()
            editContactPage
                .checkUrl("edit")
                .checkOldContact(data.edit[0])
                .clickCancel()
                .checkNotUrl("edit")
        })
    })
    it('Verify that user can edit a contact info through Table View',()=>{
        cy.get("@data").then((data) => {
        navComponent
            .clickTableView()
            .checkUrl(Cypress.env('tableViewUrl'))
        tableViewPage.clickEdit(createdContactId[0])
        editContactPage
            .checkUrl(`${createdContactId[0]}/edit`)
            .checkOldContact(data.edit[0])
            .typeDescription('I can edit')
            .clickUpdate()
        viewDetailContactPage.checkDescription('I can edit')
        })
    })

    it('Verify that user can edit a contact info through Grid View',()=>{
        cy.get("@data").then((data) => {
        navComponent
            .clickGridView()
            .checkUrl(Cypress.env('gridViewUrl'))
        gridViewPage.clickEdit(createdContactId[0])
        editContactPage
            .checkUrl(`${createdContactId[0]}/edit`)
            .checkOldContact(data.edit[0])
            .typeDescription('I can edit')
            .clickUpdate()
        viewDetailContactPage.checkDescription('I can edit')
        })
    })

    it('Verify that user can edit a contact info through List View',()=>{
        cy.get("@data").then((data) => {
        navComponent
            .clickListView()
            .checkUrl(Cypress.env('listViewUrl'))
        listViewPage.clickEdit(createdContactId[0])
        editContactPage
            .checkUrl(`${createdContactId[0]}/edit`)
            .checkOldContact(data.edit[0])
            .typeDescription('I can edit')
            .clickUpdate()
        viewDetailContactPage.checkDescription('I can edit')
        })
    })

    afterEach(() => {
    })
})
