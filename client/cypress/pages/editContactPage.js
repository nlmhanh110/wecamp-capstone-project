export const editContactPage = {
    TXT_COMPANYNAME: 'input[name="companyName"]',
    TXT_PHONE: 'input[name="phone"]',
    TXT_EMAIL: 'input[name="email"]',
    TXT_LOCATION: 'input[name="location"]',
    TXT_LINK: 'input[name="link"]',
    TXT_DESCRIPTION: 'textarea[name="description"]',
    BTN_UPDATE: 'button[type="submit"]',
    BTN_CANCEL: () => cy.get('button').contains('Cancel'),
    typeCompanyName(name) {
        cy.get(this.TXT_COMPANYNAME).clear().type(name)
        return this;
    },
    typePhone(phone) {
        cy.get(this.TXT_PHONE).clear().type(phone)
        return this;
    },
    typeEmail(email) {
        cy.get(this.TXT_EMAIL).clear().type(email)
        return this;
    },
    typeLocation(location) {
        cy.get(this.TXT_LOCATION).clear().type(location)
        return this;
    },
    typeLink(link) {
        cy.get(this.TXT_LINK).clear().type(link)
        return this;
    },
    typeDescription(description) {
        cy.get(this.TXT_DESCRIPTION).clear().type(description)
        return this;
    },
    clickUpdate() {
        cy.get(this.BTN_UPDATE).click()
        cy.wait(500)
        return this;
    },
    clickCancel() {
        cy.get('button').contains('Cancel').click()
        cy.wait(500)
        return this;
    },
    checkCompanyNameValue(val) {
        cy.get(this.TXT_COMPANYNAME).should('have.value', val)
        return this;
    },
    checkPhoneValue(val) {
        cy.get(this.TXT_PHONE).should('have.value', val)
        return this;
    },
    checkEmailValue(val) {
        cy.get(this.TXT_EMAIL).should('have.value', val)
        return this;
    },
    checkLocationValue(val) {
        cy.get(this.TXT_LOCATION).should('have.value', val)
        return this;
    },
    checkLinkValue(val) {
        cy.get(this.TXT_LINK).should('have.value', val)
        return this;
    },
    checkDescriptionValue(val) {
        cy.get(this.TXT_DESCRIPTION).should('have.value', val)
        return this;
    },
    checkOldContact(val) {
        this.checkCompanyNameValue(val.companyName)
        this.checkPhoneValue(val.phone)
        this.checkEmailValue(val.email)
        this.checkLocationValue(val.location)
        this.checkLinkValue(val.link)
        this.checkDescriptionValue(val.description)
        return this;
    },
    checkCompanyNameValidationMessage(){
        cy.get(this.TXT_COMPANYNAME).invoke('prop','validationMessage').should('be.oneOf',['Please fill out this field.','Please enter a proper company name.'])
        return this;
    },
    checkPhoneValidationMessage(){
        cy.get(this.TXT_PHONE).invoke('prop','validationMessage').should('be.oneOf',['Please fill out this field.','Please match the requested format.'])
        return this;
    },
    checkEmailValidationMessage(email){
        cy.get(this.TXT_EMAIL).invoke('prop','validationMessage').should('be.oneOf',['Please fill out this field.',`Please include an '@' in the email address. '${email}' is missing an '@'.`,`Please include an '@' in the email address. '${email}' is missing an '@'.`,`Please enter a part following '@'. '${email}' is incomplete.`,'Please match the requested format.',`Please enter a part followed by '@'. '${email}' is incomplete.`,"A part followed by '@' should not contain the symbol ' '.","A part following '@' should not contain the symbol '%'.","A part following '@' should not contain the symbol '@'.","'.' is used at a wrong position in 'mail..com'."])
        return this;
    },
    checkLocationValidationMessage(){
        cy.get(this.TXT_LOCATION).invoke('prop','validationMessage').should('be.oneOf',['Please fill out this field.','Please enter a proper location.'])
        return this;
    },
    checkLinkValidationMessage(){
        cy.get(this.TXT_LINK).invoke('prop','validationMessage').should('equal', 'Please enter a URL.')
        return this;
    },
    checkDescriptionValidationMessage(){
        cy.get(this.TXT_DESCRIPTION).invoke('prop','validationMessage').should('be.oneOf',['Please fill out this field.','Please enter a proper description.'])
        return this;
    },
    checkInvalidInput(num) {
        cy.get('input:invalid').should('have.length', num)
        return this;
    },
    checkInvalidTextArea(num) {
        cy.get('textarea:invalid').should('have.length', num)
        return this;
    },
    checkUrl(url) {
        cy.url().should('include', url)
        return this;
    },
    checkNotUrl(url) {
        cy.url().should('not.include', url)
        return this;
    },
    clearAllFields() {
        cy.get(this.TXT_COMPANYNAME).clear()
        cy.get(this.TXT_PHONE).clear()
        cy.get(this.TXT_EMAIL).clear()
        cy.get(this.TXT_LOCATION).clear()
        cy.get(this.TXT_LINK).clear()
        cy.get(this.TXT_DESCRIPTION).clear()
        return this;
    }
}