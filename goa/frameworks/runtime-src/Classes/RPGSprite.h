//
//  RPGSprite.h
//  rpg
//
//  Created by Shyamal  Upadhyaya on 12/07/16.
//
//

#include <stdio.h>
#include <unordered_map>
#include "cocos2d.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "editor-support/cocostudio/ActionTimeline/CCSkeletonNode.h"
#include "editor-support/cocostudio/ActionTimeline/CCActionTimeline.h"
#include "RPGConfig.h"
#include "StateMachine.h"

#ifndef RPGSprite_h
#define RPGSprite_h

class SkeletonCharacter;

class RPGSprite : public cocos2d::Node {

public:
    RPGSprite();
    
    virtual ~RPGSprite();
    
    static RPGSprite* create(cocos2d::Node* sprite, std::unordered_map<std::string, std::string> attributes);
    
    virtual bool initialize(cocos2d::Node* sprite, std::unordered_map<std::string, std::string> attributes);
    
    virtual cocos2d::Node* getSprite();
    
    virtual void setAttributes(std::unordered_map<std::string, std::string> attributes);
    
    virtual std::unordered_map<std::string, std::string> getAttributes();
    
    CC_SYNTHESIZE(std::string, posX, PosX);
    
    CC_SYNTHESIZE(std::string, posY, PosY);
    
    CC_SYNTHESIZE(std::string, transitToGameScene, TransitToGameScene);
    
    CC_SYNTHESIZE(std::string, nextScene, NextScene);
        
    CC_SYNTHESIZE(std::string, interAct, InterAct);
    
    CC_SYNTHESIZE(std::string, fileName, FileName);
        
    CC_SYNTHESIZE(std::string, defaultAnimationName, DefaultAnimationName);
    
    CC_SYNTHESIZE(std::string, key, Key);
    
    CC_SYNTHESIZE(std::string, show, Show);
    
    CC_SYNTHESIZE(bool, vicinityToMainCharacter, VicinityToMainCharacter);
        
    virtual void update(float dt);

    virtual SkeletonCharacter* getMainSkeleton();

    virtual bool onTouchBegan(cocos2d::Touch * touch, cocos2d::Event* event);
    
    virtual void touchEnded(cocos2d::Touch* touch, cocos2d::Event* event);
    
    virtual cocostudio::timeline::ActionTimeline* getActionTimeLine();
    
    virtual void setActionTimeLine(cocostudio::timeline::ActionTimeline* timeline);

    void checkVicinityWithMainCharacter(cocos2d::EventCustom * event);
    
protected:
    cocos2d::Node* sprite;
    cocostudio::timeline::ActionTimeline* actionTimeLine;
    std::unordered_map<std::string, std::string> attributes;
    SkeletonCharacter* mainSkeleton;
    cocos2d::Sprite* touchPointerNode;
    void checkVicinityToMainSkeleton(SkeletonCharacter* skeletonCharacter);
    void showTouchPointer();
    void destroyTouchPointer();
    std::string walkingStarted;
};

#endif /* RPGSprite_h */
