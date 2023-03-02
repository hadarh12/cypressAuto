import defaultValue from "../fixtures/default.json";

describe("delete tag", () => {
  it("Add 2 tags and delete 1 - check that the counter increased by 1", () => {
    cy.addTag("ironSource,game{enter}");
    cy.deleteTag("ironSource");

    cy.counter().should(
      "have.text",
      defaultValue.maxTags - defaultValue.tagsAmount - 1
    );
  });

  it("Add tag and delete it - the tag is not part of the tags list", () => {
    cy.addTag("ironSource{enter}");
    cy.deleteTag("ironSource");

    cy.tagsList().contains("ironSource").should("not.exist");
  });

  it("remove all", () => {
    cy.deleteAll();
    
    cy.tagsList().should("have.length", null);
  });
});
