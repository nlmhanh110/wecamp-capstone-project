export const navComponent ={
    clickCreateCRUD(){
        cy.get('a.nav-link').contains('Create').click()
        return this
    },
    clickTableView(){
        cy.get('a.nav-link').contains('CRUDs').click()
        return this
    },
    clickGridView(){
        cy.get('a.nav-link').contains('Grid View').click()
        return this
    },
    clickListView(){
        cy.get('a.nav-link').contains('List View').click()
        return this
    }, 
    checkUrl(url) {
        cy.url().should('include', url)
        return this;
    }

}