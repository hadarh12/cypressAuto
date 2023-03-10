import elements from "../fixtures/elements.json";
import defaultValue from "../fixtures/default.json";
import { buildArrayByIndex } from "../support/utils.js";

describe("Tags insertion ", () => {
  //#stp30
  it("Tag longer than the tags container length -not allowed.", () => {
    cy.addLongTag(100);
    cy.tagsContainer().then((tagsContainerElement) => {
      cy.tagsList().then((tagsListElement) => {
        const tagsContainerWidth =
          tagsContainerElement[0].getBoundingClientRect().width;
        const tagWidth =
          tagsListElement[defaultValue.tagsAmount].getBoundingClientRect()
            .width;
        expect(tagWidth).to.be.lessThan(tagsContainerWidth);
      });
    });
  });

  //#stp09
  it("Add tag - check that the tag was added.", () => {
    cy.addTag("ironSource{enter}");

    cy.tagsList().should("include.text", "ironSource");
  });

  //#stp10
  it("Add several tags together - check that they were added.", () => {
    cy.addTag("ironSource,game,play{enter}");

    cy.tagsList()
      .should("contain.text", "ironSource")
      .should("contain.text", "game")
      .should("contain.text", "play");
  });

  //#stp11
  it("Add single tag - check if the counter decreased by one.", () => {
    cy.addTag("game{enter}");

    cy.counter().should(
      "have.text",
      defaultValue.maxTags - defaultValue.tagsAmount - 1
    );
  });

  //#stp12
  it("Add several tags - check if the counter decreased.", () => {
    cy.addTag("game,ironSource,play{enter}");

    cy.counter().should(
      "have.text",
      defaultValue.maxTags - defaultValue.tagsAmount - 3
    );
  });

  //#stp13
  it("Add an amount of tags bigger by one than the maximum tags amount one by one - not allowed.", () => {
    for (let i = 0; i < +defaultValue.maxTags + 1 ; i++) {
      cy.addTag(`${i}${i}{enter}`);
    }

    cy.tagsList().should("have.length", defaultValue.maxTags);
  });

  //#stp15
  it("Add 10 tags one by one - allowed.", () => {
    for (let i = 0; i < +defaultValue.maxTags - +defaultValue.tagsAmount; i++) {
      cy.addTag(`${i}${i}{enter}`);
    }

    cy.tagsList().should("have.length", defaultValue.maxTags);
  });

  //#stp14
  it("Add an amount of tags bigger by one than the maximum tags amount together - not allowed. - not allowed.", () => {
    let tagListToCheck = buildArrayByIndex(
      +defaultValue.maxTags + 1
    );
    const tagsString = tagListToCheck.join(",");
    cy.addTag(tagsString + "{enter}");
    cy.tagsList().should("have.length", defaultValue.maxTags);
  });

  //#stp16
  it("Add an amount of tags bigger than the maximum tags amount together, the first tags won???t be added.", () => {
    let tagListToCheck = buildArrayByIndex(
      +defaultValue.maxTags + 3 
    );

    const tagsString = tagListToCheck.join(",");
    cy.addTag(tagsString + "{enter}");

    for (let i = 0; i < defaultValue.tagsAmount + 3 ; i++) {
      cy.tagsList().should("not.include.text", tagListToCheck[i]);
    }
  });

  //#stp17
  it("Add one char tag - the tag won???t be added to the tags list.", () => {
    cy.addTag("??{enter}");

    cy.tagsList().should("not.include.text", "??");
    cy.counter().should(
      "have.text",
      defaultValue.maxTags - defaultValue.tagsAmount
    );
  });

  //#stp19
  it("Add one char tag - the tag won???t count.", () => {
    cy.addTag("??{enter}");

    cy.counter().should(
      "have.text",
      defaultValue.maxTags - defaultValue.tagsAmount
    );
  });

  //#stp18
  it("Add a one char tag as a part of several tags together (split by a comma). - the tag with one char wont added to the tag list.", () => {
    cy.addTag("??,game{enter}");

    cy.tagsList().should("not.include.text", "??");
  });

  //#stp20
  it("Add a one char tag as a part of several tags - the tag with one char wont count.", () => {
    cy.addTag("??,game{enter}");

    cy.counter().should(
      "have.text",
      defaultValue.maxTags - defaultValue.tagsAmount - 1
    );
  });

  //#stp21
  it("Add tag that contains one char and a space - the tag wont added.", () => {
    cy.addTag(" ?? {enter}");

    cy.tagsList().should("not.include.text", "?? ");
  });

  //#stp22
  it("Add one char tag as a part of several tags that contains one char and a space - the one char tag wont added.", () => {
    cy.addTag(" ?? ,game{enter}");

    cy.tagsList().should("not.include.text", "?? ");
  });

  //#stp27
  it("Add a tag and check if the input field empty.", () => {
    cy.addTag("ironSource{enter}");

    cy.get(elements.input).should("be.empty");
  });

  //stp28
  it("Add a several tags together and check if the input field empty.", () => {
    cy.addTag("ironSource,game,play{enter}");

    cy.get(elements.input).should("be.empty");
  });

  //#stp29
  it("Add one char tag check if the input field empty.", () => {
    cy.addTag("ironSource,game,play{enter}");

    cy.get(elements.input).should("be.empty");
  });

  //#stp23
  it("Add the same tag, one by one - check that only one added.", () => {
    cy.addTag("ironSource{enter}");
    cy.addTag("ironSource{enter}");

    cy.tagsList().should("have.length", +defaultValue.tagsAmount + 1);
    cy.tagsList().contains("ironSource").should("have.length", 1);
  });

  //#stp25
  it("Add the same tag, one by one - check that only one counted.", () => {
    cy.addTag("ironSource{enter}");
    cy.addTag("ironSource{enter}");

    cy.counter().should(
      "have.text",
      defaultValue.maxTags - defaultValue.tagsAmount - 1
    );
  });

  //#stp24
  it("Add the same tag several times in one insertion split by a comma - check that only one of the duplicates tags is shown", () => {
    cy.addTag("game,game,ironSource{enter}");

    cy.tagsList().should("have.length", +defaultValue.tagsAmount + 2);
    cy.tagsList().contains("game").should("have.length", 1);
  });

  //#stp26
  it("Add the same tag name as a string split a by comma - check that only one of the duplicate tags counted.", () => {
    cy.addTag("game,game,ironSource{enter}");

    cy.counter().should(
      "have.text",
      defaultValue.maxTags - defaultValue.tagsAmount - 2
    );
  });
});
