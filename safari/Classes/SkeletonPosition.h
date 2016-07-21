//
//  SkeletonPosition.h
//  safari
//
//  Created by Shyamal  Upadhyaya on 20/07/16.
//
//

#include <stdio.h>
#include "cocos2d.h"

#ifndef SkeletonPosition_h
#define SkeletonPosition_h

class SkeletonPosition {
public:
    SkeletonPosition();
    ~SkeletonPosition();
    CC_SYNTHESIZE(std::string, islandName, IslandName);
    CC_SYNTHESIZE(std::string, sceneName, SceneName);
    CC_SYNTHESIZE(std::string, xPosition, XPosition);
    CC_SYNTHESIZE(std::string, yPosition, YPosition);
};

#endif /* SkeletonPosition_h */
