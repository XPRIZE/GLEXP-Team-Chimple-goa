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
#include "../RPGConfig.h"
#include "../state/StateMachine.h"
#include "../character/SkeletonCharacter.h"
#include "../../lang/LangUtil.h"
#include "../../lang/WordInfo.h"



#ifndef WordSprite_h
#define WordSprite_h

class WordSprite : public cocos2d::Node {
    
public:
    WordSprite();
    
    virtual ~WordSprite();
    
    static WordSprite* create(cocos2d::Node* sprite, std::string word);
    
    virtual bool initialize(cocos2d::Node* sprite, std::string word);
    
    virtual cocos2d::Node* getSprite();
    
    virtual bool onTouchBegan(cocos2d::Touch * touch, cocos2d::Event* event);
    
    virtual void touchEnded(cocos2d::Touch* touch, cocos2d::Event* event);
    
protected:
    cocos2d::Node* sprite;
    cocos2d::Sprite* touchPointerNode;
    void showTouchPointer();
    std::string word;
};

#endif /* WordSprite_h */
