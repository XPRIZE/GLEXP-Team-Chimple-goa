//
//  CharacterConfiguration.h
//  goa
//
//  Created by Shyamal.Upadhyaya on 03/10/16.
//
//

#include "cocos2d.h"

#ifndef CharacterConfiguration_h
#define CharacterConfiguration_h

class CharacterConfiguration
{
public:
    CharacterConfiguration();
    ~CharacterConfiguration();
    
    CC_SYNTHESIZE(int, userId, userId);
    CC_SYNTHESIZE(std::string, userName, userName);
    CC_SYNTHESIZE(int, hat, hat);
    CC_SYNTHESIZE(int, glasses, glasses);
    CC_SYNTHESIZE(int, faceColor, faceColor);
    CC_SYNTHESIZE(int, hairStyle, hairStyle);
    CC_SYNTHESIZE(int, hairColor, hairColor);
    CC_SYNTHESIZE(int, eye, eye);
    CC_SYNTHESIZE(int, faceType, faceType);
    CC_SYNTHESIZE(int, mouthType, mouthType);
    CC_SYNTHESIZE(int, backgroundColor, backgroundColor);
    
};



#endif /* CharacterConfiguration_h */
