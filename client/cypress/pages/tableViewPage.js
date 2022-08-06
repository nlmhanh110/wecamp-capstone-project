export const tableViewPage = {
    clickCreate() {
        cy.contains('a', 'Create CRUD').click()
        cy.wait(500)
        return this
    },
    clickView(id) {
        cy.get(`a[href="/cruds/${id}"]`).contains('View').click()
        cy.wait(500)
        return this
    },
    clickEdit(id) {
        cy.get(`a[href="/cruds/${id}/edit"]`).click()
        cy.wait(500)
        return this
    },
    clickDelete(id) {
        cy.get(`a[href="/cruds/${id}/delete"]`).click()
        cy.wait(500)
        return this
    },
    checkUrl(url) {
        cy.url().should('include', url)
        return this;
    },
    checkData(id, data) {
        cy.get(`a[href="/cruds/${id}"]`).parents('tr')
            .should('include.text', data.companyName)
            .and('include.text', data.phone)
            .and('include.text', data.email)
            .and('include.text', data.location)
    },
    checkDelete(id){
        cy.get(`a[href="/cruds/${id}"]`).should('not.exist')
    },
    checkCancel(id){
        cy.get(`a[href="/cruds/${id}"]`).should('exist')
    }
}