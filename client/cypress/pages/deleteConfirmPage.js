export const deleteConfirmPage = {
    TXT_COMPANYNAME: 'h2',
    checkCompanyName(name) {
        cy.get(this.TXT_COMPANYNAME).should('include.text', name)
        return this;
    },
    checkPhone(phone) {
        cy.contains('p', 'Phone').within(() => {
            cy.get('a').should('include.text', phone)
        })
        return this;
    },
    checkEmail(email) {
        cy.contains('p', 'Email').should('include.text', email)
        return this;
    },
    checkLocation(location) {
        cy.contains('p', 'Location').should('include.text', location)
        return this;
    },
    checkLink(link) {
        cy.contains('p', 'Link').within(() => {
            cy.get('a').should('include.text', link)
        })
        return this;
    },
    checkDescription(description) {
        cy.contains('p', 'Description').should('include.text', description)
        return this;
    },
    clickDelete(){
        cy.contains('button','Delete').click()
        cy.wait(500)
        return this
    },
    clickCancel(){
        cy.contains('a','Cancel').click()
        cy.wait(500)
        return this
    },
    checkContact(contact){
        this.checkCompanyName(contact.companyName)
        this.checkPhone(contact.phone)
        this.checkEmail(contact.email)
        this.checkLocation(contact.location)
        this.checkLink(contact.link)
        this.checkDescription(contact.description)
        return this;
    },
    checkUrl(url) {
        cy.url().should('include', url)
        return this;
    }
}