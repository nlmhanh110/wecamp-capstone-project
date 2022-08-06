import { navComponent } from "../pages/navComponent";
import { viewDetailContactPage } from "../pages/viewDetailContactPage";
import { tableViewPage } from "../pages/tableViewPage"
import { gridViewPage } from "../pages/gridViewPage"
import { listViewPage } from "../pages/listViewPage"
let createdContactId = []

describe('View a contact', () => {
    beforeEach(() => {
        cy.fixture("data.json").as('data')
        cy.get("@data").then((data) => {
            cy.createContact(data.create[0])
            cy.url().then((url) => {
                if (!url.includes('new')) {
                    const id = url.split('/').pop();
                    createdContactId.push(id)
                }
            })
        })
    });

    it('Verify that user can view contact info in Table View', () => {
        navComponent
            .clickTableView()
            .checkUrl(Cypress.env('tableViewUrl'))
        cy.get("@data").then((data) => {
            tableViewPage.checkData(createdContactId[0], data.create[0])
        })
    })
    it('Verify that user can view contact info in Grid View', () => {
        navComponent
            .clickGridView()
            .checkUrl(Cypress.env('gridViewUrl'))
        cy.get("@data").then((data) => {
            gridViewPage.checkData(createdContactId[0], data.create[0])
        })
    })
    it('Verify that user can view contact info in List View', () => {
        navComponent
            .clickListView()
            .checkUrl(Cypress.env('listViewUrl'))
        cy.get("@data").then((data) => {
            listViewPage.checkData(createdContactId[0], data.create[0])
        })
    })

    it('Verify that user can view a contact info in detail through Table View', () => {
        navComponent
            .clickTableView()
            .checkUrl(Cypress.env('tableViewUrl'))
        cy.get("@data").then((data) => {
            tableViewPage.clickView(createdContactId)
            viewDetailContactPage
                .checkUrl(createdContactId[0])
                .checkContact(data.create[0])
        })
    })
    it('Verify that user can view a contact info in detail through Grid View', () => {
        navComponent
            .clickGridView()
            .checkUrl(Cypress.env('gridViewUrl'))
        cy.get("@data").then((data) => {
            gridViewPage.clickReadMore(createdContactId)
            viewDetailContactPage
                .checkUrl(createdContactId[0])
                .checkContact(data.create[0])

        })
    })
    it('Verify that user can view a contact info in detail through List View', () => {
        navComponent
            .clickListView()
            .checkUrl(Cypress.env('listViewUrl'))
        cy.get("@data").then((data) => {
            listViewPage.clickReadMore(createdContactId)
            viewDetailContactPage
                .checkUrl(createdContactId[0])
                .checkContact(data.create[0])
        })
    })

    it.only('Verify that user can close, stop viewing a contact info', () => {
        navComponent
            .clickTableView()
            .checkUrl(Cypress.env('tableViewUrl'))
        cy.get("@data").then((data) => {
            tableViewPage.clickView(createdContactId)
            viewDetailContactPage
                .checkUrl(createdContactId[0])
                .checkContact(data.create[0])
                .clickClose()
            tableViewPage.checkUrl(Cypress.env('tableViewUrl'))
        })
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
