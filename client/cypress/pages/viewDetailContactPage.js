export const viewDetailContactPage = {
    TXT_COMPANYNAME: 'h2',
    // TXT_PHONE: ()=>cy.get('p').contains('Phone').get('a'),
    // TXT_EMAIL: ()=>cy.get('p').contains('Email'),
    // TXT_LOCATION: ()=>cy.get('p').contains('Location'),
    // TXT_LINK: ()=>cy.get('p').contains('Link').get('a'),
    // TXT_DESCRIPTION: ()=>cy.get('p').contains('Description').get('p'),
    // BTN_EDIT:()=>cy.get('a').contains('Edit'),
    // BTN_DELETE:()=>cy.get('button').contains('Delete'),
    // BTN_CLOSE:()=>cy.get('a').contains('Close'),
    checkCompanyName(name) {
        cy.get(this.TXT_COMPANYNAME).should('include.text', name)
    },
    checkPhone(phone) {
        cy.contains('p','Phone').within(() =>{
            cy.get('a').should('include.text', phone)})
    },
    checkEmail(email) {
        cy.contains('p','Email').should('include.text', email)
    },
    checkLocation(location) {
        cy.contains('p','Location').should('include.text', location)
    },
    checkLink(link) {
        cy.contains('p','Link').within(() =>{
            cy.get('a').should('include.text', link)})
    },
    checkDescription(description) {
        cy.contains('p','Description').within(() =>{
            cy.get('p').should('include.text', description)})
    },
    clickEdit() {
        cy.contains('a','Edit').click()
        cy.wait(500)
    },
    clickDelete() {
        cy.contains('button','Delete').click()
        cy.wait(500)
    },
    clickClose() {
        cy.contains('Close').click()
        cy.wait(500)
    },
    checkContact(contact) {
        this.checkCompanyName(contact.companyName)
        this.checkPhone(contact.phone)
        this.checkEmail(contact.email)
        this.checkLocation(contact.location)
        this.checkLink(contact.link)
        this.checkDescription(contact.description)
    }
}