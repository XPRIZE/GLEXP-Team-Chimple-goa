//
//  WordSprite.h
//  safari
//
//  Created by Shyamal  Upadhyaya on 07/08/16.
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
#include "SkeletonCharacter.h"


#ifndef WordSprite_h
#define WordSprite_h

class WordSprite : public cocos2d::Node {
    
public:
    WordSprite();
    
    virtual ~WordSprite();
    
    static WordSprite* create(cocos2d::Node* sprite, std::string word);
    
    virtual bool initialize(cocos2d::Node* sprite, std::string word);
    
    virtual cocos2d::Node* getSprite();

    
    CC_SYNTHESIZE(bool, vicinityToMainCharacter, VicinityToMainCharacter);
    
    virtual void update(float dt);
    
    virtual SkeletonCharacter* getMainSkeleton();
    
    virtual bool onTouchBegan(cocos2d::Touch * touch, cocos2d::Event* event);
    
    virtual void touchEnded(cocos2d::Touch* touch, cocos2d::Event* event);
    
protected:
    cocos2d::Node* sprite;
    SkeletonCharacter* mainSkeleton;
    cocos2d::Sprite* touchPointerNode;
    void checkVicinityToMainSkeleton(SkeletonCharacter* skeletonCharacter);
    void showTouchPointer();
    void destroyTouchPointer();
    std::string word;
};

#endif /* WordSprite_h */
