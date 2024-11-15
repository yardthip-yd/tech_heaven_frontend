// utils.js
export function getSimilarityScore(str1, str2) {
    const words1 = str1.toLowerCase().split(" ");
    const words2 = str2.toLowerCase().split(" ");
    const matchCount = words1.filter(word => words2.includes(word)).length;
    return matchCount / Math.max(words1.length, words2.length);
  }
  
  export function findBestMatchingProduct(aiProductName, products) {
    let bestMatch = null;
    let bestScore = 0;
  
    for (const product of products) {
      const score = getSimilarityScore(aiProductName, product.name);
      if (score > bestScore) {
        bestScore = score;
        bestMatch = product;
      }
    }
    
    return bestScore >= 0.5 ? bestMatch : null;
  }
  