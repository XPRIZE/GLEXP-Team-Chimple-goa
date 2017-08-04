//
//  AlphamonSprite.h
//  safari
//
//  Created by Shyamal  Upadhyaya on 19/07/16.
//
//

#include <stdio.h>
#include "cocos2d.h"
#include <unordered_map>
#include "editor-support/cocostudio/CocoStudio.h"
#include "editor-support/cocostudio/ActionTimeline/CCSkeletonNode.h"
#include "editor-support/cocostudio/ActionTimeline/CCActionTimeline.h"
#include "../RPGConfig.h"
#include "../state/StateMachine.h"



#ifndef AlphamonSprite_h
#define AlphamonSprite_h

class Alphamon;

class AlphamonSprite : public cocos2d::Node {
public:
    
    AlphamonSprite();
    
    virtual ~AlphamonSprite();
    
    static AlphamonSprite* create(cocos2d::Node* sprite, std::unordered_map<std::string, std::string> attributes, std::string alphabet);
    
    virtual bool initialize(cocos2d::Node* sprite, std::unordered_map<std::string, std::string> attributes, std::string alphabet);
    
    virtual Alphamon* getAlphaMon();
    
    virtual void setAttributes(std::unordered_map<std::string, std::string> attributes);
    
    virtual std::unordered_map<std::string, std::string> getAttributes();    
    
    CC_SYNTHESIZE(std::string, interAct, InterAct);
        
    CC_SYNTHESIZE(bool, vicinityToMainCharacter, VicinityToMainCharacter);    
    
    virtual void update(float dt);
    
    virtual void checkVicinityToMainSkeleton(SkeletonCharacter* skeletonCharacter);
    
    virtual SkeletonCharacter* getMainSkeleton();
    
    virtual void onAlphabetSelected(cocos2d::EventCustom *event);

    virtual void destoryAlphaMon(float dt);
    
    void checkVicinityWithMainCharacter(cocos2d::EventCustom * event);
    
protected:
    std::unordered_map<std::string, std::string> attributes;
    SkeletonCharacter* mainSkeleton;
    cocos2d::Sprite* touchPointerNode;
    std::string alphabet;
    bool isSelectedForBattle;
    void showTouchPointer();
    void destroyTouchPointer();
};

#endif /* AlphamonSprite_h */
