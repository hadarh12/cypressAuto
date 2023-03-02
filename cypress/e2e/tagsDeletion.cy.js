import defaultValue from "../fixtures/default.json";

describe("delete tag", () => {

  //#stp05
  it("Delete tag - the tag is not part of the tags list.", () => {
    if (defaultValue.tags === null) {
        cy.addTag("ironSource{enter}");
        cy.deleteTag("ironSource");
        cy.tagsList().contains("ironSource").should("not.exist");
      }
      else{
          cy.deleteTag(defaultValue.tags[0]);
          cy.tagsList().contains("defaultValue.tags[0]").should("not.exist");
      }
  });

  //#stp07
  it("Press on remove all btn – all the tags will be removed.", () => {
    cy.deleteAll();

    cy.tagsList().should("have.length", null);
  });

  //#stp08
  it("Delete tag – the count increased by one.", () => {
    if (defaultValue.tags === null) {
        cy.addTag("ironSource{enter}");
        cy.deleteTag("ironSource");
        cy.counter("heve.text", defaultValue.maxTags - 1);
      }
      else{
          cy.deleteTag(defaultValue.tags[0]);
          cy.counter("heve.text", defaultValue.maxTags -  defaultValue.tagsAmount - 1);
      }
  });
});
