import elements from "../fixtures/elements.json";
import defaultValue from "../fixtures/default.json";

describe("Tags insertion ", () => {

  it("Add tag - check that the tag was added.", () => {
    cy.addTag("ironSource{enter}");

    cy.tagsList().should("include.text", "ironSource");
  });

  it("Add several tags together - check that they were added.", () => {
    cy.addTag("ironSource,game,play{enter}");

    cy.tagsList()
      .should("contain.text", "ironSource")
      .should("contain.text", "game")
      .should("contain.text", "play");
  });

  it("Add single tag - check if the counter decreased.", () => {
    cy.addTag("game{enter}");

    cy.counter().should(
      "have.text",
      defaultValue.maxTags - defaultValue.tagsAmount - 1
    );
  });

  it("Add several tags - check if the counter decreased.", () => {
    cy.addTag("game,ironSource,play{enter}");

    cy.counter().should(
      "have.text",
      defaultValue.maxTags - defaultValue.tagsAmount - 3
    );
  });

  it("Add 11 tags one by one - not allowed.", () => {
    for (let i = 0; i <= defaultValue.maxTags - defaultValue.tagsAmount; i++) {
      cy.addTag(`${i}${i}{enter}`);
    }

    cy.tagsList().should("have.length", defaultValue.maxTags);
  });

  it("Add 10 tags one by one - allowed.", () => {
    for (let i = 0; i < defaultValue.maxTags - defaultValue.tagsAmount; i++) {
      cy.addTag(`${i}${i}{enter}`);
    }

    cy.tagsList().should("have.length", defaultValue.maxTags);
  });

  describe("Add 11 tags together", () => {
    beforeEach(() => {
        let tagListToCheck = [];
        for (let i = 0; i < defaultValue.maxTags - defaultValue.tagsAmount + 1; i++) {
        tagListToCheck.push(`${i}${i}`);
        }
        const tagsString = tagListToCheck.join(",");
        cy.addTag(tagsString + "{enter}");
        });

        it("Add 11 tags together - not allowed.", () => {
            cy.tagsList().should("have.length", defaultValue.maxTags);
        });

        it("Add 11 tags together - the first tag won’t be added.", () => {
            cy.tagsList().should("not.include.text", tagListToCheck[0]);
        });
    });  

  it("Add one char tag - the tag won’t be added.", () => {
    cy.addTag("£{enter}");

    cy.tagsList().should("not.include.text", "£");
    cy.counter().should("have.text", defaultValue.maxTags - defaultValue.tagsAmount);
  });

  it("Add one char tag - the tag won’t be counted.", () => {
    cy.addTag("£{enter}");

    cy.counter().should("have.text", defaultValue.maxTags - defaultValue.tagsAmount);
  });

  it("Add a one char tag as a part of several tags - the tag with one char wont added.", () => {
    cy.addTag("£,game{enter}");

    cy.tagsList().should("not.include.text", "£");
  });

  it("Add a one char tag as a part of several tags - the tag with one char wont count.", () => {
    cy.addTag("£,game{enter}");

    cy.counter().should(
      "have.text",
      defaultValue.maxTags - defaultValue.tagsAmount - 1
    );
  });

  it("Add tag that contains one char and a space - the tag will not be saved.", () => {
    cy.addTag(" £ {enter}");

    cy.tagsList().should("not.include.text", "£ ");
  });

  it("Add a one char tag as a part of several tags that contains one char and a space - the tag will not be saved.", () => {
    cy.addTag(" £ ,game{enter}");

    cy.tagsList().should("not.include.text", "£ ");
  });

  it("Add a tag and check if the input field empty.", () => {
    cy.addTag("ironSource{enter}");

    cy.get(elements.input).should("be.empty");
  });

  it("Add a several tags together and check if the input field empty.", () => {
    cy.addTag("ironSource,game,play{enter}");

    cy.get(elements.input).should("be.empty");
  });

  it("Add the same tag, one by one - check that only one added.", () => {
    cy.addTag("ironSource{enter}");
    cy.addTag("ironSource{enter}");

    cy.tagsList().should("have.length", +defaultValue.tagsAmount + 1);
    cy.tagsList().contains("ironSource").should("have.length", 1);
  });

  it("Add the same tag, one by one - check that only one counted.", () => {
    cy.addTag("ironSource{enter}");
    cy.addTag("ironSource{enter}");

    cy.counter().should(
      "have.text",
      defaultValue.maxTags - defaultValue.tagsAmount - 1
    );
  });
  
  it("Add the same tag name as a string split by comma - check that only one of the duplicitous tag added.", () => {
    cy.addTag("game,game,ironSource{enter}");

    cy.tagsList().should("have.length", +defaultValue.tagsAmount + 2);
    cy.tagsList().contains("game").should("have.length", 1);
  });

  it("Add the same tag name as a string split by comma - check that only one of the duplicitous tag counted.", () => {
    cy.addTag("game,game,ironSource{enter}");

    cy.counter().should(
      "have.text",
      defaultValue.maxTags - defaultValue.tagsAmount - 2
    );
  });
});
