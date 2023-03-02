import elements from "../fixtures/elements.json";
import defaultValue from "../fixtures/default.json";

describe("defultState", () => {
  //#stp01
  it("Reloading the page after deleting the default tag- the user will be shown.", () => {
    cy.addTag("ironSource,game{enter}");
    cy.reload();

    cy.tagsList()
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.equal(defaultValue.tags);
      });
    cy.tagsList().should("have.length", defaultValue.tagsAmount);
  });

  //#stp03
  it("Check that the default number shown is the default tags amount.", () => {
    cy.reload();

    cy.counter().should(
      "have.text",
      defaultValue.maxTags - defaultValue.tagsAmount
    );
  });

  //#stp02
  it("Delete one of the default tags, reload page - check that there are only 2 tags.", () => {
    cy.deleteTag("javascript");
    cy.reload();

    cy.tagsList().should("have.length", defaultValue.tagsAmount);
  });
  
  //#stp04
  it("Instruction text.", () => {
    cy.get(elements.instructionText).should(
      "have.text",
      defaultValue.instructionTextExpect
    );
  });
});
