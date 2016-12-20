//
//  WordSprite.cpp
//  safari
//
//  Created by Shyamal  Upadhyaya on 07/08/16.
//
//

#include "WordSprite.h"

USING_NS_CC;

WordSprite::WordSprite():
vicinityToMainCharacter(false)
{
    this->touchPointerNode = NULL;
    this->sprite = NULL;
    this->mainSkeleton = NULL;
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
    
//    auto checkVicinityWithMainCharacter = [=] (EventCustom * event) {
//        this->mainSkeleton = static_cast<SkeletonCharacter*>(event->getUserData());
//        this->checkVicinityToMainSkeleton(this->mainSkeleton);
//        
//    };
//    
//    ADD_VICINITY_NOTIFICATION(this, RPGConfig::MAIN_CHARACTER_VICINITY_CHECK_NOTIFICATION, checkVicinityWithMainCharacter);
//
    this->scheduleUpdate();
    
    return true;
    
}

cocos2d::Node* WordSprite::getSprite() {
    return this->sprite;
}


void WordSprite::update(float dt) {
    if(!this->getVicinityToMainCharacter() && this->mainSkeleton != NULL && !this->mainSkeleton->isStanding) {
        this->checkVicinityToMainSkeleton(this->mainSkeleton);
    }
}

void WordSprite::checkVicinityToMainSkeleton(SkeletonCharacter* skeletonCharacter) {
    Vec2 mainSkeletonPositionFromBottom = Point(skeletonCharacter->getSkeletonNode()->getPosition().x, skeletonCharacter->getSkeletonNode()->getPosition().y);
    Vec2 mainSkeletonPositionFromTop = Point(skeletonCharacter->getSkeletonNode()->getPosition().x, skeletonCharacter->getSkeletonNode()->getPosition().y + skeletonCharacter->getSkeletonNode()->getBoundingBox().size.height);
    
    float distanceFromTop= mainSkeletonPositionFromTop.getDistance(this->getSprite()->getPosition());
    float distanceFromBottom = mainSkeletonPositionFromBottom.getDistance(this->getSprite()->getPosition());
    
    if((distanceFromTop >= -OBJECT_TAP_BOUNDING_BOX_WIDTH && distanceFromTop <= OBJECT_TAP_BOUNDING_BOX_WIDTH) || (distanceFromBottom >= -OBJECT_TAP_BOUNDING_BOX_WIDTH && distanceFromBottom <= OBJECT_TAP_BOUNDING_BOX_WIDTH)) {
        this->setVicinityToMainCharacter(true);
        this->showTouchPointer();
    } else {
        this->setVicinityToMainCharacter(false);
    }
    
    
    if((distanceFromTop >= -OBJECT_NEAR_BY_BOUNDING_BOX_WIDTH && distanceFromTop <= OBJECT_NEAR_BY_BOUNDING_BOX_WIDTH) || (distanceFromBottom >= -OBJECT_NEAR_BY_BOUNDING_BOX_WIDTH && distanceFromBottom <= OBJECT_NEAR_BY_BOUNDING_BOX_WIDTH)) {
        if(!this->vicinityToMainCharacter) {
            this->showTouchPointer();
        }
    }
}


void WordSprite::destroyTouchPointer() {
    if(this->touchPointerNode != NULL) {
        this->touchPointerNode->removeFromParent();
        this->touchPointerNode = NULL;
    }
}

void WordSprite::showTouchPointer() {
    if(this->sprite && this->sprite->isVisible() && this->touchPointerNode == NULL)
    {
        this->touchPointerNode =  Sprite::create(SEARCH_POINTER_IMG);
        this->touchPointerNode->setScale(0.5f, 0.5f);
        this->touchPointerNode->setPosition(this->sprite->getPosition());
        this->addChild(this->touchPointerNode);
        this->touchPointerNode->setVisible(true);
        
        auto scaleBy = ScaleBy::create(0.5, 1.2);
        auto sequenceScale = Sequence::create(scaleBy, scaleBy->reverse(), nullptr);
        auto repeatScaleAction = Repeat::create(sequenceScale, 5);
        auto callbackStart = CallFunc::create(CC_CALLBACK_0(WordSprite::destroyTouchPointer, this));
        auto sequence = Sequence::create(repeatScaleAction, callbackStart, nullptr);
        this->touchPointerNode->runAction(sequence);
    }
}

SkeletonCharacter* WordSprite::getMainSkeleton() {
    return this->mainSkeleton;
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
    
    if(this->getSprite()->isVisible() && this->getVicinityToMainCharacter() == true && boundingBoxRect.containsPoint(n)) {
        
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
    
    if(this->touchPointerNode != NULL) {
        this->touchPointerNode->setVisible(false);
    }
}
