// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { createContactPage } from "../pages/createContactPage";
import { editContactPage } from "../pages/editContactPage"
Cypress.Commands.add('createContact',(contact)=>{
    cy.visit(Cypress.env('createUrl')).wait(200)
    if(contact.companyName){
        createContactPage.typeCompanyName(contact.companyName)
    }
    if(contact.phone){
        createContactPage.typePhone(contact.phone)
    }
    if(contact.email){
        createContactPage.typeEmail(contact.email)
    }
    if(contact.location){
        createContactPage.typeLocation(contact.location)
    }
    if(contact.link){
        createContactPage.typeLink(contact.link)
    }
    if(contact.description){
        createContactPage.typeDescription(contact.description)
    }
    createContactPage.clickSubmit()
    cy.wait(500)
})

Cypress.Commands.add('editContact',(contact)=>{
    if(contact.companyName){
        editContactPage.typeCompanyName(contact.companyName)
    }
    if(contact.phone){
        editContactPage.typePhone(contact.phone)
    }
    if(contact.email ){
        editContactPage.typeEmail(contact.email)
    }
    if(contact.location){
        editContactPage.typeLocation(contact.location)
    }
    if(contact.link){
        editContactPage.typeLink(contact.link)
    }
    if(contact.description){
        editContactPage.typeDescription(contact.description)
    }
    editContactPage.clickUpdate()
    cy.wait(500)
})