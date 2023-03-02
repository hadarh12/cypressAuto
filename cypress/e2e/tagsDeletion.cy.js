import defaultValue from "../fixtures/default.json";

describe("delete tag", () => {
  //#stp06
  it("Add 2 tags and delete 1 - check that the counter increased by 1.", () => {
    cy.addTag("ironSource,game{enter}");
    cy.deleteTag("ironSource");

    cy.counter().should(
      "have.text",
      defaultValue.maxTags - defaultValue.tagsAmount - 1
    );
  });

  //#stp05
  it("Add tag and delete it - the tag is not part of the tags list.", () => {
    cy.addTag("ironSource{enter}");
    cy.deleteTag("ironSource");

    cy.tagsList().contains("ironSource").should("not.exist");
  });

  //#stp07
  it("Press on remove all btn – all the tags will be removed.", () => {
    cy.deleteAll();

    cy.tagsList().should("have.length", null);
  });

  //#stp08
  it("Delete a single tag – the count increased.", () => {
    cy.deleteTag("javascript");
    cy.reload();

    cy.counter().should(
      "have.text",
      defaultValue.maxTags - defaultValue.tagsAmount
    );
  });
});
