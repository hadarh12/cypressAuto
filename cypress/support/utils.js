function buildArrayByIndex(arrayIndex) {
  let tagListToCheck = [];

  for (let i = 0; i < arrayIndex; i++) {
    tagListToCheck.push(`${i}${i}`);
  }

  return tagListToCheck;
}

export { buildArrayByIndex };
