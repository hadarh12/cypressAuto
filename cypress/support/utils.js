function buildArryByIndex(arryIndex) {
  let tagListToCheck = [];

  for (let i = 0; i < arryIndex; i++) {
    tagListToCheck.push(`${i}${i}`);
  }

  return tagListToCheck;
}

export { buildArryByIndex };
