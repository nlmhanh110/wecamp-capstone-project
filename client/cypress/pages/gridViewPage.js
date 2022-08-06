export const gridViewPage = {
    clickCreate(){
        cy.contains('a', 'Create CRUD').click()
        cy.wait(500)
        return this
    },
    clickReadMore(id){
        cy.get(`a[href="/cruds/${id}"]`).contains('Read More...').click()
        cy.wait(500)
        return this
    },
    clickEdit(id){
        cy.get(`a[href="/cruds/${id}/edit"]`).click()
        cy.wait(500)
        return this
    },
    checkUrl(url){
        cy.url().should('include', url)
        return this;
    },
    checkData(id,data){
        cy.get(`a[href="/cruds/${id}"]`).parents('div.card')
            .should('include.text', data.companyName)
            .and('include.text', data.phone)
            .and('include.text', data.description)
            .and('include.text', data.location)
    }
}