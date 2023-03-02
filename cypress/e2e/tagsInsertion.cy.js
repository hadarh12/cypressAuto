import elements from "../fixtures/elements.json";
import defaultValue from "../fixtures/default.json";

describe("add tag", () => {

  describe("long tag", () => {
    beforeEach(() => {
      cy.addLongTag(100);
    });

    it("Tags longer than the component framework's width should not be allowed", function () {
      cy.tagsContainer.then((frameworkElement) => {
        cy.tagsList().then((tagsListElement) => {
          const frameworkwidth = frameworkElement[0].getBoundingClientRect();
          const tagListwidth =
            tagsListElement[defaultValue.tagsAmount].getBoundingClientRect();

          expect(tagListwidth.width).to.be.lessThan(frameworkwidth.width);
        });
      });
    });

    it("Insert tag longer than the component framework – The tag splits into several lines suitable for framework", function () {
      cy.get("ul").then((frameworkElement) => {
        cy.tagsList().then((tagsListElement) => {
          const frameworkRect = frameworkElement[0].getBoundingClientRect();
          const tagElement = tagsListElement.eq(defaultValue.tagsAmount);
          const tagRect = tagElement[0].getBoundingClientRect();

          expect(tagRect.top).to.be.greaterThan(frameworkRect.top);
          expect(tagElement[0].clientWidth).to.be.lessThan(
            frameworkElement[0].clientWidth
          );
          expect(tagElement.css("white-space")).to.equal("normal");
        });
      });
    });
  });

  it("Add tag - check that the tag was added", function () {
    cy.addTag("ironSource{enter}");

    cy.tagsList().should("include.text", "ironSource");
  });

  it("Add several tags together - check that they were added", function () {
    cy.addTag("ironSource,game,play{enter}");

    cy.tagsList()
      .should("contain.text", "ironSource")
      .should("contain.text", "game")
      .should("contain.text", "play");
  });

  it("add single tag - check if the counter decreased", function () {
    cy.addTag("game{enter}");
    cy.counter().should(
      "have.text",
      defaultValue.maxTags - defaultValue.tagsAmount - 1
    );
  });

  it("add several tags - check if the counter decreased", function () {
    cy.addTag("game,ironSource,play{enter}");
    cy.counter().should(
      "have.text",
      defaultValue.maxTags - defaultValue.tagsAmount - 3
    );
  });
  //think how to make that func in commands
  it("add 11 tags one by one - not allowed", function () {
    for (let i = 0; i <= defaultValue.maxTags - defaultValue.tagsAmount; i++) {
      cy.addTag(`${i}${i}{enter}`);
    }
    cy.tagsList().should("have.length", defaultValue.maxTags);
  });

  it("add 10 tags one by one - allowed", function () {
    for (let i = 0; i < defaultValue.maxTags - defaultValue.tagsAmount; i++) {
      cy.addTag(`${i}${i}{enter}`);
    }
    cy.tagsList().should("have.length", defaultValue.maxTags);
  });

  it("add 11 tags together - not allowed", function () {
    let tagListToCheck = [];
    for (let i = 0; i < defaultValue.maxTags - defaultValue.tagsAmount + 1; i++) {
      tagListToCheck.push(`${i}${i}`);
    }
    const tagsString = tagListToCheck.join(",");
    cy.addTag(tagsString + "{enter}");
    cy.tagsList().should("have.length", defaultValue.maxTags);
  });

  it("add 11 tags together - the first tag won’t be added", function () {
    let tagListToCheck = [];
    for (let i = 0; i < defaultValue.maxTags - defaultValue.tagsAmount + 1; i++) {
      tagListToCheck.push(`${i}${i}`);
    }
    const tagsString = tagListToCheck.join(",");
    cy.addTag(tagsString + "{enter}");
    cy.tagsList().should("not.include.text", tagListToCheck[0]);
  });
  //split?
  it("add one char tag - the tag won’t be counted and added", function () {
    cy.addTag("£{enter}");
    cy.tagsList().should("not.include.text", "£");
    cy.counter().should("have.text", defaultValue.maxTags - defaultValue.tagsAmount);
  });
  //split?
  it("add a one char tag as a part of several tags - the tag with on char wont count and wont added", function () {
    cy.addTag("£,game{enter}");
    cy.counter().should(
      "have.text",
      defaultValue.maxTags - defaultValue.tagsAmount - 1
    );
    cy.tagsList().should("not.include.text", "£");
  });
  it("add tag that contains one char and a space - the tag will not be saved", function () {
    cy.addTag(" £ {enter}");
    cy.tagsList().should("not.include.text", "£ ");
  });
  it("add a one char tag as a part of several tags that contains one char and a space - the tag will not be saved", function () {
    cy.addTag(" £ ,game{enter}");
    cy.tagsList().should("not.include.text", "£ ");
  });

  it("add a tag and check if the input field empty", function () {
    cy.addTag("ironSource{enter}");
    cy.get(elements.input).should("be.empty");
  });

  it("add a several tags together and check if the input field empty", function () {
    cy.addTag("ironSource,game,play{enter}");
    cy.get(elements.input).should("be.empty");
  });

  it("add the same tag, one by one - check that only one added and counted", function () {
    cy.addTag("ironSource{enter}");
    cy.addTag("ironSource{enter}");
    cy.tagsList().should("have.length", +defaultValue.tagsAmount + 1);
    cy.tagsList().contains("ironSource").should("have.length", 1);
    cy.counter().should(
      "have.text",
      defaultValue.maxTags - defaultValue.tagsAmount - 1
    );
  });
  //split?
  it("add the same tag name as a string split by comma - check that only one of the duplicitous tag added and counted", function () {
    cy.addTag("game,game,ironSource{enter}");
    cy.tagsList().should("have.length", +defaultValue.tagsAmount + 2);
    cy.tagsList().contains("game").should("have.length", 1);
    cy.counter().should(
      "have.text",
      defaultValue.maxTags - defaultValue.tagsAmount - 2
    );
  });
});
