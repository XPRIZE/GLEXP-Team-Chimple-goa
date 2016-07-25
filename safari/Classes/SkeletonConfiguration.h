//
//  SkeletonConfiguration.h
//  safari
//
//  Created by Shyamal  Upadhyaya on 23/07/16.
//
//
#include <stdio.h>
#include "cocos2d.h"

#ifndef SkeletonConfiguration_h
#define SkeletonConfiguration_h

class SkeletonConfiguration
{
public:
    SkeletonConfiguration();
    ~SkeletonConfiguration();    
    
    CC_SYNTHESIZE(std::string, islandName, IslandName);
    CC_SYNTHESIZE(std::string, sceneName, SceneName);
    CC_SYNTHESIZE(std::string, skeletonName, SkeletonName);
    CC_SYNTHESIZE(std::string, boneName, BoneName);
    CC_SYNTHESIZE(std::string, skinName, SkinName);
    CC_SYNTHESIZE(std::string, imageName, ImageName);
    CC_SYNTHESIZE(std::string, skinAnchorX, SkinAnchorX);
    CC_SYNTHESIZE(std::string, skinAnchorY, SkinAnchorY);
    
};

#endif /* SkeletonConfiguration_h */
