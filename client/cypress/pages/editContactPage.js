export const editContactPage ={
    TXT_COMPANYNAME: 'input[name="companyName"]',
    TXT_PHONE: 'input[name="phone"]',
    TXT_EMAIL: 'input[name="email"]',
    TXT_LOCATION: 'input[name="location"]',
    TXT_LINK: 'input[name="link"]',
    TXT_DESCRIPTION: 'textare[name="description"]',
    BTN_SUBMIT:'input[type="submit"]',
    BTN_CANCEL:'button[type="button"]',
    typeCompanyName(name){
        cy.get(this.TXT_COMPANYNAME).type(name)
    },
    typePhone(phone){
        cy.get(this.TXT_PHONE).type(phone)
    },
    typeEmail(email){
        cy.get(this.TXT_EMAIL).type(email)
    },
    typeLocation(location){
        cy.get(this.TXT_LOCATION).type(location)
    },
    typeLink(link){
        cy.get(this.TXT_LINK).type(link)
    },
    typeDescription(description){
        cy.get(this.TXT_DESCRIPTION).type(description)
    },
    clickSubmit(){
        cy.get(this.BTN_SUBMIT).click()
    },
    clickCancel(){
        cy.get(this.BTN_CANCEL).click()
    }
}