export const deleteContactPage = {
    BTN_DELETE : ()=> cy.get('button').contains('Delete'),
    BTN_CANCEL:()=> cy.get('a').contains('Cancel')
}