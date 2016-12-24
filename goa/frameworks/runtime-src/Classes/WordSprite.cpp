//
//  WordSprite.cpp
//  safari
//
//  Created by Shyamal  Upadhyaya on 07/08/16.
//
//

#include "WordSprite.h"

USING_NS_CC;

WordSprite::WordSprite()
{
    this->touchPointerNode = NULL;
    this->sprite = NULL;
}


WordSprite::~WordSprite() {
    
}


WordSprite* WordSprite::create(cocos2d::Node* sprite, std::string word)
{
    auto wordSprite = new WordSprite();
    if (wordSprite && wordSprite->initialize(sprite, word)) {
        wordSprite->autorelease();
        return wordSprite;
    }
    CC_SAFE_DELETE(wordSprite);
    return nullptr;
}


bool WordSprite::initialize(cocos2d::Node* sprite, std::string word) {
    sprite->removeFromParent();
    this->sprite = sprite;
    this->setName(sprite->getName());
    this->word = word;
    this->addChild(this->sprite);
    
    auto listenerTouches = EventListenerTouchOneByOne::create();
    listenerTouches->setSwallowTouches(true);
    listenerTouches->onTouchBegan = CC_CALLBACK_2(WordSprite::onTouchBegan, this);
    listenerTouches->onTouchEnded = CC_CALLBACK_2(WordSprite::touchEnded, this);
    this->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listenerTouches, this);
    this->showTouchPointer();

    return true;
    
}

cocos2d::Node* WordSprite::getSprite() {
    return this->sprite;
}


void WordSprite::showTouchPointer() {
    if(this->sprite && this->sprite->isVisible() && this->touchPointerNode == NULL)
    {
        this->touchPointerNode =  Sprite::create(SEARCH_POINTER_IMG);
        this->touchPointerNode->setScale(1.0f, 1.0f);
        this->touchPointerNode->setPosition(this->sprite->getPosition());
        this->addChild(this->touchPointerNode);
        this->touchPointerNode->setVisible(true);
    }
}

bool WordSprite::onTouchBegan(Touch *touch, Event *event)
{
    auto n = this->convertTouchToNodeSpace(touch);
    Rect boundingBoxRect = Rect::ZERO;
    
    if(this->getSprite()->getBoundingBox().size.width == 0 && this->getSprite()->getBoundingBox().size.height == 0)
    {
        if(this->getSprite()->getChildren().size() == 1) {
            n = this->getSprite()->convertTouchToNodeSpace(touch);
            boundingBoxRect = this->getSprite()->getChildren().at(0)->getBoundingBox();
        }
    } else {
        boundingBoxRect = this->getSprite()->getBoundingBox();
    }
    
    if(this->getSprite()->isVisible() && boundingBoxRect.containsPoint(n)) {
        
        return true;
    }
    
    return false;
}

void WordSprite::touchEnded(Touch *touch, Event *event)
{
    CCLOG("PLAYING GAME WITH WORD %s", this->word.c_str());
    WordInfo* wordInfo = LangUtil::getInstance()->loadLanguageSpecificWordMappingForAWord(this->word.c_str());
    if(wordInfo != NULL) {
        std::string utfWord = wordInfo->getUtfConversion();
        CCLOG("UTF word %s", utfWord.c_str());
    
        EventCustom event(RPGConfig::ON_WORD_INFO_NOTIFICATION);
        std::string s(utfWord);
        event.setUserData(&s);
        _eventDispatcher->dispatchEvent(&event);        
    }    
}
