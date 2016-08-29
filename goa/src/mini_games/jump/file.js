

var permutate = (function() {
    
    var results = [];    
    
    function doPermute(input, output, used, size, level) {        
            
        if (size == level) {
            var word = output.join('');
            results.push(word);
            return;
        } 
        
        level++;
        
        for (var i = 0; i < input.length; i++) {
            
            if (used[i] === true) {
                continue;
            }            
            
            used[i] = true;

            output.push(input[i]);
            
            doPermute(input, output, used, size, level);
            
            used[i] = false;
            
            output.pop();
        }
    }
    
    return {
        getPermutations: function(input, size) {
            
            var chars = input.split('');
            var output = [];
            var used = new Array(chars.length);      

            doPermute(chars, output, used, size, 0);        

            return results;    
        }
    }
})();