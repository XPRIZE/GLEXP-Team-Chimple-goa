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
    
    static ExternalSkeletonCharacter* create(cocos2d::Node* node, std::unordered_map<std::string, std::string> attributes);
    
    virtual bool initializeExternalSkeletonCharacter(cocos2d::Node* node, std::unordered_map<std::string, std::string> attributes);
    
    virtual cocostudio::timeline::SkeletonNode* getExternalSkeletonNode();
    
    virtual cocostudio::timeline::ActionTimeline* getExternalSkeletonActionTimeLine();
    
    
    
    virtual void setAttributes(std::unordered_map<std::string, std::string> attributes);
    
    virtual std::unordered_map<std::string, std::string> getAttributes();
    
    CC_SYNTHESIZE(std::string, fileName, FileName);
        
    CC_SYNTHESIZE(std::string, interAct, InterAct);
    
    CC_SYNTHESIZE(std::string, defaultAnimationName, DefaultAnimationName);
    
    CC_SYNTHESIZE(std::string, key, Key);
    
    
    // touch listeners
    
    virtual bool onTouchBegan(cocos2d::Touch * touch, cocos2d::Event* event);
    
    virtual void touchEnded(cocos2d::Touch* touch, cocos2d::Event* event);
        
    void onEnterTransitionDidFinish();
    
protected:
    cocostudio::timeline::SkeletonNode* externalSkeletonNode;
    SkeletonCharacter* mainSkeleton;
    cocostudio::timeline::ActionTimeline* externalSkeletonActionTime;
    std::unordered_map<std::string, std::string> attributes;
    
    CC_SYNTHESIZE(bool, vicinityToMainCharacter, VicinityToMainCharacter);
    
    void createExternalSkeletonNode(cocos2d::Node* node, const std::string& filename);
    
    float posX;
    float posY;
    
    cocos2d::Sprite* touchPointerNode;
    void showTouchPointer();
    
};

#endif /* ExternalSkeletonCharacter_h */
