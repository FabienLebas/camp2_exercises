function toWords(sentence) {
  const allWords = sentence.split(/[.?!, :;']+/);//manquait ; et ' 

  return allWords.filter(word => word !== "");
}

module.exports = toWords;
