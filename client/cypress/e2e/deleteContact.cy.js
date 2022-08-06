import { navComponent } from "../pages/navComponent";
import { viewDetailContactPage } from "../pages/viewDetailContactPage";
import { tableViewPage } from "../pages/tableViewPage"
import { gridViewPage } from "../pages/gridViewPage"
import { listViewPage } from "../pages/listViewPage"
import { deleteConfirmPage } from "../pages/deleteConfirmPage"
let createdContactId = []

describe('Delete a contact', () => {
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

    it('Verify that user can delete contact info in Table View', () => {
        navComponent
            .clickTableView()
            .checkUrl(Cypress.env('tableViewUrl'))
        tableViewPage.clickDelete(createdContactId)
        cy.get("@data").then((data) => {
            deleteConfirmPage
                .checkUrl(`${createdContactId}/delete`)
                .checkContact(data.create[0])
                .clickDelete()
            tableViewPage
                .checkUrl(Cypress.env('tableViewUrl'))
                .checkDelete(createdContactId)
            createdContactId = []
        })
    })
    it('Verify that user can delete contact info in Grid View', () => {
        navComponent
            .clickGridView()
            .checkUrl(Cypress.env('gridViewUrl'))
        gridViewPage.clickReadMore(createdContactId)
        viewDetailContactPage
            .checkUrl(createdContactId[0])
            .clickDelete()
        cy.get("@data").then((data) => {

            deleteConfirmPage
                .checkUrl(`${createdContactId}/delete`)
                .checkContact(data.create[0])
                .clickDelete()
            tableViewPage
                .checkUrl(Cypress.env('tableViewUrl'))
                .checkDelete(createdContactId)
            createdContactId = []
        })
    })
    it('Verify that user can delete contact info in List View', () => {
        navComponent
            .clickListView()
            .checkUrl(Cypress.env('listViewUrl'))
        listViewPage.clickReadMore(createdContactId)
        viewDetailContactPage
            .checkUrl(createdContactId[0])
            .clickDelete()
        cy.get("@data").then((data) => {
            deleteConfirmPage
                .checkUrl(`${createdContactId}/delete`)
                .checkContact(data.create[0])
                .clickDelete()
            tableViewPage
                .checkUrl(Cypress.env('tableViewUrl'))
                .checkDelete(createdContactId)
            createdContactId = []
        })
    })

    it('Verify that user can cancel deleting a contact info', () => {
        navComponent
            .clickTableView()
            .checkUrl(Cypress.env('tableViewUrl'))
        tableViewPage.clickDelete(createdContactId)
        cy.get("@data").then((data) => {
            deleteConfirmPage
                .checkUrl(`${createdContactId}/delete`)
                .checkContact(data.create[0])
                .clickCancel()
            tableViewPage
                .checkUrl(Cypress.env('tableViewUrl'))
                .checkCancel(createdContactId)
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
