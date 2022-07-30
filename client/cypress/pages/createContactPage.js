export const createContactPage ={
    TXT_COMPANYNAME: 'input[name="companyName"]',
    TXT_PHONE: 'input[name="phone"]',
    TXT_EMAIL: 'input[name="email"]',
    TXT_LOCATION: 'input[name="location"]',
    TXT_LINK: 'input[name="link"]',
    TXT_DESCRIPTION: 'textarea[name="description"]',
    BTN_SUBMIT:'input[type="submit"]',
    // BTN_CANCEL:'button[type="button"]',
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
        cy.get('button').contains('Cancel').click()
    },
    checkCompanyNameValidationMessage(){
        cy.get(this.TXT_COMPANYNAME).invoke('prop','validationMessage').should('be.oneOf',['Please fill out this field.','Please match the requested format.'])
    },
    checkPhoneValidationMessage(){
        cy.get(this.TXT_PHONE).invoke('prop','validationMessage').should('be.oneOf',['Please fill out this field.','Please match the requested format.'])
    },
    checkEmailValidationMessage(email){
        cy.get(this.TXT_EMAIL).invoke('prop','validationMessage').should('be.oneOf',['Please fill out this field.',`Please include an '@' in the email address. '${email}' is missing an '@'.`,`Please include an '@' in the email address. '${email}' is missing an '@'.`,`Please enter a part following '@'. '${email}' is incomplete.`,'Please match the requested format.',`Please enter a part followed by '@'. '${email}' is incomplete.`,"A part followed by '@' should not contain the symbol ' '.","A part following '@' should not contain the symbol '%'.","A part following '@' should not contain the symbol '@'.","'.' is used at a wrong position in 'mail..com'."])
    },
    checkLocationValidationMessage(){
        cy.get(this.TXT_LOCATION).invoke('prop','validationMessage').should('be.oneOf',['Please fill out this field.','Please match the requested format.'])
    },
    checkLinkValidationMessage(){
        cy.get(this.TXT_LINK).invoke('prop','validationMessage').should('equal', 'Please enter a URL.')
    },
    checkDescriptionValidationMessage(){
        cy.get(this.TXT_DESCRIPTION).invoke('prop','validationMessage').should('be.oneOf',['Please fill out this field.','Please match the requested format.'])
    },
    checkInvalidInput(num){
        cy.get('input:invalid').should('have.length', num)
    },
    checkInvalidTextArea(num){
        cy.get('textarea:invalid').should('have.length', num)
    },
    checkUrl(url){
        cy.url().should('include',url)
    }
}