// https://github.com/angus-c/just/blob/master/packages/string-kebab-case/index.js
// BUT preserving delimiters --
const wordSeparators = /[\s\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,.\/:;<=>?@\[\]^_`{|}~]+/;
const capitals = /[A-Z\u00C0-\u00D6\u00D9-\u00DD]/g;

export const kebabCase = (str: string) => {
  //replace capitals with space + lower case equivalent for later parsing
  str = str.replace(capitals, function (match) {
    return " " + (match.toLowerCase() || match);
  });
  return str.trim().split(wordSeparators).join("-");
};
