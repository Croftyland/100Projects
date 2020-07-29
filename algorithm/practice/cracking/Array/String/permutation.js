function permutation (word1, word2) {
    return word1.split('').sort().join('') === word2.split('').sort().join('');
}

//permutation('word1','word2') --> false
//permutation('word','dropo') --> false
//permutation('word','wrod') --> true