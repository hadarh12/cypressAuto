import elements from "../fixtures/elements.json";
import defaultValue from "../fixtures/default.json";

describe("defultState", () => {
  //#stp01
  it("Reloading the page after adding tags, check that the tags are the default ones", () => {
    cy.addTag("ironSource,game{enter}");
    cy.reload();

    cy.tagsList()
      .invoke("text")
      .then((text) => {
        expect(text.trim().split(' ')).to.deep.equal(defaultValue.tags);
      });
    cy.tagsList().should("have.length", defaultValue.tagsAmount);
  });

  //#stp03
  it("Check that the counter default number is (max tag amount - default tags amount).", () => {
    cy.reload();

    cy.counter().should(
      "have.text",
      defaultValue.maxTags - defaultValue.tagsAmount
    );
  });

  //#stp02
  it("Delete one of the default tags, reload page - check that there are only 2 tags (doesn’t add one more) .", () => {
    cy.deleteTag(defaultValue.tags[0]);
    cy.reload();

    cy.tagsList().should("have.length", defaultValue.tagsAmount);
  });
  
  //#stp04
  it("Instruction text is the expect text.", () => {
    cy.get(elements.instructionText).should(
      "have.text",
      defaultValue.instructionTextExpect
    );
  });
});
