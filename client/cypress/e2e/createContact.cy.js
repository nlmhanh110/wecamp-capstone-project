import { createContactPage } from "../pages/createContactPage";
import { viewDetailContactPage } from "../pages/viewDetailContactPage";
import { tableViewPage } from "../pages/tableViewPage"
import { gridViewPage } from "../pages/gridViewPage"
import { listViewPage } from "../pages/listViewPage"
import { navComponent } from "../pages/navComponent"
let createdContactId = []
describe('Create a contact', () => {
    beforeEach(() => {
        cy.fixture("data.json").as('data')
    });

    it('Verify that user can create a new contact info successfully with valid data and no empty fields', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.create[0])
            viewDetailContactPage.checkContact(data.create[0])
            cy.url().then((url) => {
                if (!url.includes('new')) {
                    const id = url.split('/').pop();
                    createdContactId.push(id)
                }
            })
        })
    })
    it('Verify that user can not create a new contact when leaving Company Name field empty', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.create[1])
            cy.url().then((url) => {
                if (!url.includes('new')) {
                    const id = url.split('/').pop();
                    createdContactId.push(id)
                }
            })
            createContactPage
                .checkUrl(Cypress.env('createUrl'))
                .checkInvalidInput(1)
                .checkCompanyNameValidationMessage()
        })
    })
    it('Verify that user can not create a new contact when leaving Phone field empty', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.create[2])
            cy.url().then((url) => {
                if (!url.includes('new')) {
                    const id = url.split('/').pop();
                    createdContactId.push(id)
                }
            })
            createContactPage
                .checkUrl(Cypress.env('createUrl'))
                .checkInvalidInput(1)
                .checkPhoneValidationMessage()
        })
    })
    it('Verify that user can not create a new contact when leaving Email field empty', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.create[3])
            cy.url().then((url) => {
                if (!url.includes('new')) {
                    const id = url.split('/').pop();
                    createdContactId.push(id)
                }
            })
            createContactPage
                .checkUrl(Cypress.env('createUrl'))
                .checkInvalidInput(1)
                .checkEmailValidationMessage()
        })
    })
    it('Verify that user can not create a new contact when leaving Location field empty', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.create[4])
            cy.url().then((url) => {
                if (!url.includes('new')) {
                    const id = url.split('/').pop();
                    createdContactId.push(id)
                }
            })
            createContactPage
                .checkUrl(Cypress.env('createUrl'))
                .checkInvalidInput(1)
                .checkLocationValidationMessage()
        })
    })
    it('Verify that user can not create a new contact when leaving Description field empty', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.create[6])
            cy.url().then((url) => {
                if (!url.includes('new')) {
                    const id = url.split('/').pop();
                    createdContactId.push(id)
                }
            })
            createContactPage
                .checkUrl(Cypress.env('createUrl'))
                .checkInvalidTextArea(1)
                .checkDescriptionValidationMessage()
        })
    })
    it('Verify that user can not create a new contact when leaving all fields empty', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.create[7])
            cy.url().then((url) => {
                if (!url.includes('new')) {
                    const id = url.split('/').pop();
                    createdContactId.push(id)
                }
            })
            createContactPage
                .checkUrl(Cypress.env('createUrl'))
                .checkInvalidInput(4)
                .checkInvalidTextArea(1)
                .checkCompanyNameValidationMessage()
                .checkPhoneValidationMessage()
                .checkEmailValidationMessage()
                .checkLocationValidationMessage()
                .checkDescriptionValidationMessage()
        })
    })
    it('Verify that user can not create a new contact with invalid Phone Number', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.create[2])
            data.invalidPhone.forEach((val) => {
                createContactPage
                    .typePhone(val)
                    .clickSubmit()
                cy.url().then((url) => {
                    if (!url.includes('new')) {
                        const id = url.split('/').pop();
                        createdContactId.push(id)
                    }
                })
                createContactPage
                    .checkUrl(Cypress.env('createUrl'))
                    .checkInvalidInput(1)
                    .checkPhoneValidationMessage()
            })

        })
    })
    it('Verify that user can not create a new contact with invalid Email', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.create[3])
            data.invalidEmail.forEach((val) => {
                createContactPage
                    .typeEmail(val)
                    .clickSubmit()
                cy.url().then((url) => {
                    if (!url.includes('new')) {
                        const id = url.split('/').pop();
                        createdContactId.push(id)
                    }
                })
                createContactPage
                    .checkUrl(Cypress.env('createUrl'))
                    .checkInvalidInput(1)
                    .checkEmailValidationMessage(val)
            })

        })
    })
    it('Verify that user can not create a new contact with invalid Link', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.create[5])
            data.invalidLink.forEach((val) => {
                createContactPage
                    .typeEmail('info@atlanticplc.com')
                    .typeLink(val)
                    .clickSubmit()
                cy.url().then((url) => {
                    if (!url.includes('new')) {
                        const id = url.split('/').pop();
                        createdContactId.push(id)
                    }
                })
                createContactPage
                    .checkUrl(Cypress.env('createUrl'))
                    .checkInvalidInput(1)
                    .checkLinkValidationMessage(val)
            })

        })
    })

    it('Verify that user can not create a new contact with invalid Company Name', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.create[1])
            data.invalidString.forEach((val) => {
                createContactPage
                    .typeCompanyName(val)
                    .clickSubmit()
                cy.url().then((url) => {
                    if (!url.includes('new')) {
                        const id = url.split('/').pop();
                        createdContactId.push(id)
                    }
                })
                createContactPage
                    .checkUrl(Cypress.env('createUrl'))
                    .checkInvalidInput(1)
                    .checkCompanyNameValidationMessage()
            })

        })
    })
    it('Verify that user can not create a new contact with invalid Location', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.create[4])
            data.invalidString.forEach((val) => {
                createContactPage
                    .typeLocation(val)
                    .clickSubmit()
                cy.url().then((url) => {
                    if (!url.includes('new')) {
                        const id = url.split('/').pop();
                        createdContactId.push(id)
                    }
                })
                createContactPage
                    .checkUrl(Cypress.env('createUrl'))
                    .checkInvalidInput(1)
                    .checkLocationValidationMessage()
            })

        })
    })
    it('Verify that user can not create a new contact with invalid Description', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.create[6])
            data.invalidString.forEach((val) => {
                createContactPage
                    .typeDescription(val)
                    .clickSubmit()
                cy.url().then((url) => {
                    if (!url.includes('new')) {
                        const id = url.split('/').pop();
                        createdContactId.push(id)
                    }
                })
                createContactPage
                    .checkUrl(Cypress.env('createUrl'))
                    .checkInvalidInput(1)
                    .checkDescriptionValidationMessage()
            })
        })
    })

    it('Verify that user can create a new contact when leaving Link field empty', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.create[15])
            viewDetailContactPage.checkContact(data.create[15])
            cy.url().then((url) => {
                if (!url.includes('new')) {
                    const id = url.split('/').pop();
                    createdContactId.push(id)
                }
            })
        })
    })
    it('Verify that user can not create a new contact when a Company Name already exists', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.create[0])
            cy.url().then((url) => {
                if (!url.includes('new')) {
                    const id = url.split('/').pop();
                    createdContactId.push(id)
                }
            })
            data.existedCompanyName.forEach((val) => {
                cy.createContact(data.create[8])
                createContactPage
                    .typeCompanyName(val)
                    .clickSubmit()
                cy.url().then((url) => {
                    if (!url.includes('new')) {
                        const id = url.split('/').pop();
                        createdContactId.push(id)
                    }
                })
                createContactPage.checkUrl(Cypress.env('createUrl'))
                cy.contains('Company Name Already Exists').should('exist')
            })
        })
    })
    it('Verify that user can not create a new contact when an Email already exists', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.create[0])
            cy.url().then((url) => {
                if (!url.includes('new')) {
                    const id = url.split('/').pop();
                    createdContactId.push(id)
                }
            })
            cy.createContact(data.create[9])
            cy.url().then((url) => {
                if (!url.includes('new')) {
                    const id = url.split('/').pop();
                    createdContactId.push(id)
                }
            })
            createContactPage.checkUrl(Cypress.env('createUrl'))
            cy.contains('Email Already Exists').should('exist')

        })
    })
    it('Verify that user can create a new contact when a Phone already exists', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.create[0])
            cy.url().then((url) => {
                if (!url.includes('new')) {
                    const id = url.split('/').pop();
                    createdContactId.push(id)
                }
            })
            cy.createContact(data.create[10])
            cy.url().then((url) => {
                if (!url.includes('new')) {
                    const id = url.split('/').pop();
                    createdContactId.push(id)
                }
            })
            viewDetailContactPage.checkContact(data.create[10])
        })
    })
    it('Verify that user can create a new contact when a Location already exists', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.create[0])
            cy.url().then((url) => {
                if (!url.includes('new')) {
                    const id = url.split('/').pop();
                    createdContactId.push(id)
                }
            })
            cy.createContact(data.create[11])
            cy.url().then((url) => {
                if (!url.includes('new')) {
                    const id = url.split('/').pop();
                    createdContactId.push(id)
                }
            })
            viewDetailContactPage.checkContact(data.create[11])
        })
    })
    it('Verify that user can create a new contact when a Link already exists', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.create[0])
            cy.url().then((url) => {
                if (!url.includes('new')) {
                    const id = url.split('/').pop();
                    createdContactId.push(id)
                }
            })
            cy.createContact(data.create[12])
            cy.url().then((url) => {
                if (!url.includes('new')) {
                    const id = url.split('/').pop();
                    createdContactId.push(id)
                }
            })
            viewDetailContactPage.checkContact(data.create[12])
        })
    })
    it('Verify that user can create a new contact when a Description already exists', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.create[0])
            cy.url().then((url) => {
                if (!url.includes('new')) {
                    const id = url.split('/').pop();
                    createdContactId.push(id)
                }
            })
            cy.createContact(data.create[13])
            cy.url().then((url) => {
                if (!url.includes('new')) {
                    const id = url.split('/').pop();
                    createdContactId.push(id)
                }
            })
            viewDetailContactPage.checkContact(data.create[13])
        })
    })
    it('Verify that user can cancel the process of creating new contact info', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.create[14])
            createContactPage
                .clickCancel()
                .checkUrl(Cypress.env('tableViewUrl'))
        })
    })
    it('Verify that user can cancel the process of creating new contact info', () => {
        cy.get("@data").then((data) => {
            cy.createContact(data.create[14])
            createContactPage
                .clickCancel()
                .checkUrl(Cypress.env('tableViewUrl'))
        })
    })
    it.only('Verify that user can create a contact info through Table View', () => {
        navComponent
            .clickTableView()
            .checkUrl(Cypress.env('tableViewUrl'))
        tableViewPage
            .clickCreate()
            .checkUrl(Cypress.env('createUrl'))
    })
    it.only('Verify that user can create a contact info through Grid View', () => {
        navComponent
            .clickGridView()
            .checkUrl(Cypress.env('gridViewUrl'))
        gridViewPage
            .clickCreate()
            .checkUrl(Cypress.env('createUrl'))
    })
    it.only('Verify that user can create a contact info through List View', () => {
        navComponent
            .clickListView()
            .checkUrl(Cypress.env('listViewUrl'))
        listViewPage
            .clickCreate()
            .checkUrl(Cypress.env('createUrl'))
    })
    afterEach(() => {
        if (createdContactId) {
            createdContactId.forEach(_id => {
                cy.request({
                    method: 'DELETE',
                    url: `http://localhost:8080/api/cruds/${_id}`
                })
            });
            createdContactId = []
        }
    })
})