//
//  WordInfo.h
//  safari
//
//  Created by Shyamal  Upadhyaya on 08/08/16.
//
//

#include <stdio.h>
#include "cocos2d.h"


#ifndef WordInfo_h
#define WordInfo_h

class WordInfo {

public:
    WordInfo();
    ~WordInfo();
    
    CC_SYNTHESIZE(std::string, wordInEnglish, WordInEnglish);
    CC_SYNTHESIZE(std::string, utfConversion, UtfConversion);
    
};



#endif /* WordInfo_h */
