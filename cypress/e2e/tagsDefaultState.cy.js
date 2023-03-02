import elements from "../fixtures/elements.json";
import defaultValue from "../fixtures/default.json";

describe("defultState", () => {
  it("Check that the counter is set to (max tags - default tags)", () => {
    cy.counter().should("have.text", defaultValue.maxTags - defaultValue.tagsAmount);
  });

  it("add tags -  reload page - the default tags show.", () => {
    cy.addTag("ironSource,game{enter}");
    cy.reload();

    cy.tagsList()
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.equal(defaultValue.tags);
      });
    cy.tagsList().should("have.length", defaultValue.tagsAmount);
  });

  it("add tags - reload page - update counter to default tags amount", () => {
    cy.addTag("ironSource,game{enter}");
    cy.reload();

    cy.counter().should("have.text", defaultValue.maxTags - defaultValue.tagsAmount);
  });

  it("delete one of the default tags, reload page - check that there are only 2 tags.", () => {
    cy.deleteTag("javascript");
    cy.reload();
    
    cy.tagsList().should("have.length", defaultValue.tagsAmount);
  });

  it("instruction text ", () => {
    cy.get(elements.instructionText).should(
      "have.text",
      defaultValue.instructionTextExpect
    );
  });
});
