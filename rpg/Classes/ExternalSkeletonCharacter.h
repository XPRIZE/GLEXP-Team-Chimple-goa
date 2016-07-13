//
//  ExternalSkeletonCharacter.h
//  rpg
//
//  Created by Shyamal  Upadhyaya on 05/07/16.
//
//

#include <unordered_map>
#include "cocos2d.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "editor-support/cocostudio/ActionTimeline/CCSkeletonNode.h"
#include "editor-support/cocostudio/ActionTimeline/CCActionTimeline.h"
#include "RPGConfig.h"
#include "StateMachine.h"


#ifndef ExternalSkeletonCharacter_h
#define ExternalSkeletonCharacter_h


class SkeletonCharacter;

class ExternalSkeletonCharacter : public cocos2d::Node {
public:
    ExternalSkeletonCharacter();
    virtual ~ExternalSkeletonCharacter();
    
    static ExternalSkeletonCharacter* create(cocostudio::timeline::SkeletonNode* skeletonNode, std::unordered_map<std::string, std::string> attributes);
    
    virtual bool initializeExternalSkeletonCharacter(cocostudio::timeline::SkeletonNode* skeletonNode, std::unordered_map<std::string, std::string> attributes);
    
    virtual cocostudio::timeline::SkeletonNode* getExternalSkeletonNode();
    
    virtual cocostudio::timeline::ActionTimeline* getExternalSkeletonActionTimeLine();
    
    virtual void createAnimationAndPhysicsSupportForExternalSkeletonNode();
    
    virtual void setAttributes(std::unordered_map<std::string, std::string> attributes);
    
    virtual std::unordered_map<std::string, std::string> getAttributes();
    
    CC_SYNTHESIZE(std::string, fileName, FileName);
        
    CC_SYNTHESIZE(std::string, canSpeak, CanSpeak);
    
    CC_SYNTHESIZE(std::string, defaultAnimationName, DefaultAnimationName);
    
    CC_SYNTHESIZE(std::string, key, Key);
    
    virtual void update(float dt);
    
    
    virtual bool checkVicinityToMainSkeleton(SkeletonCharacter* skeletonCharacter);
protected:
    cocostudio::timeline::SkeletonNode* externalSkeletonNode;
    SkeletonCharacter* mainSkeleton;
    cocostudio::timeline::ActionTimeline* externalSkeletonActionTime;
    std::unordered_map<std::string, std::string> attributes;
    
    CC_SYNTHESIZE(bool, vicinityToMainCharacter, VicinityToMainCharacter);
    
};

#endif /* ExternalSkeletonCharacter_h */
