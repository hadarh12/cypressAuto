import elements from "../fixtures/elements.json";

Cypress.Commands.add("addTag", (text) => {
  cy.get(elements.input).type(text);
});

Cypress.Commands.add("tagsList", () => {
  cy.get(elements.tagList);
});

Cypress.Commands.add("counter", () => {
  cy.get(elements.tagsCounter);
});

Cypress.Commands.add("deleteAll", () => {
  cy.get(elements.removeAllBtn).click();
});

Cypress.Commands.add("deleteTag", (text) => {
  var tagsListElement = cy.get(elements.tagList).contains(text);
  tagsListElement.children(".uit").click();
});

Cypress.Commands.add("tagsContainer", () => {
  cy.get(elements.tagsContainer);
});

Cypress.Commands.add("addLongTag", (TagLength) => {
  for (let i = 0; i < +TagLength; i++) {
    cy.addTag("1");
  }
  cy.addTag("{enter}");
});
