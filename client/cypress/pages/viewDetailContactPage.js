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
    checkCompanyName(name){
        cy.get(this.TXT_COMPANYNAME).should('include.text',name)
    },
    checkPhone(phone){
        cy.get('p').contains('Phone').get('a').should('include.text',phone)
    },
    checkEmail(email){
        cy.contains('Email').parent().should('include.text',email)
    },
    checkLocation(location){
        cy.contains('Location').parent().should('include.text',location)
    },
    checkLink(link){
        cy.get('p').contains('Link').get('a').should('include.text',link)
    },
    checkDescription(description){
        cy.get('p').contains('Description').get('p').should('include.text',description)
    },
    clickEdit(){
        cy.get('a').contains('Edit').click()
    },
    clickDelete(){
        cy.get('button').contains('Delete').click()
    },
    clickClose(){
        cy.get('a').contains('Close').click()
    }
}