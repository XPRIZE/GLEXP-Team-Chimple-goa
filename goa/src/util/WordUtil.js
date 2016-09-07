var xc = xc || {};

xc.WordUtil = xc.WordUtil || {};

// The MIT License (MIT)
// Copyright (c) 2015 Mateo Gianolio
// https://github.com/mateogianolio/scrabbler

xc.WordUtil.getValidCombinations = function(string) {
    var allWords = cc.loader.getRes(xc.path + "english/allwords.json");
    // generate power set
    var set = xc.WordUtil.power(string);
    
    // cache length for performance
    var set_length = set.length,
        element;
    
    // permute power set
    for(i = 0; i < set_length; i++) {
        element = set[i].join('');
        set[i] = xc.WordUtil.permute(element);
    }
    
    var words = [];
    set_length = set.length;
    
    // flatten and deduplicate
    for(i = 0; i < set_length; i++) {
        for(j = 0; j < set[i].length; j++) {
        element = set[i][j];

        if(element.length > 1 && words.indexOf(element) === -1)
            words.push(element);
        }
    }
    
    var words_length = words.length;
    var output = [];
    // start looking up words
    for(i = 0; i < words_length; i++) {
        if(allWords.indexOf(words[i]) != -1) {
            output.push(words[i]);
        }
    }

    return output;
}

// helper to generate a power set
xc.WordUtil.power = function(string) {
  var copy,
      deep_copy;
  
  return [].slice.call(string).reduce(function(previous, current) {
    copy = previous.slice(0);
    copy.forEach(function(element) {
      deep_copy = element.slice(0);
      deep_copy.push(current);
      previous.push(deep_copy);
    });

    return previous;
  }, [[]]);
}

// helper to generate string permutations
xc.WordUtil.permute = function(string){
  var words = [];
  
  function permute(string, prefix) {
    var balance,
        word,
        i,
        c;
    
    prefix = prefix || '';
    
    // loop over str to separate each single character
    for(i = 0; i < string.length; i++) {
      c = string[i];
      balance = string.slice(0, i) + string.slice(i + 1);
      
      // join the prefix with each of the combinations
      word = prefix + c + balance;
 
      // inject this word only if it does not exist
      if(words.indexOf(word) < 0)
        words.push(word);
      
      // recursively call this function in case there are balance characters
      if(balance.length > 1)
        permute(balance, prefix + c);
    }
  }
  
  permute(string);
  return words;
}
