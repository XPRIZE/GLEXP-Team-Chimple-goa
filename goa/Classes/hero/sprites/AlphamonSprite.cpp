//
//  AlphamonSprite.cpp
//  safari
//
//  Created by Shyamal  Upadhyaya on 19/07/16.
//
//

#include "AlphamonSprite.h"
#include "../character/SkeletonCharacter.h"
#include "../../alphamon/Alphamon.h"

USING_NS_CC;

AlphamonSprite::AlphamonSprite():
vicinityToMainCharacter(false),
interAct(""),
isSelectedForBattle(false)
{    
    this->touchPointerNode = NULL;    
    this->mainSkeleton = NULL;
}


AlphamonSprite::~AlphamonSprite() {
    CCLOG("removed AlphamonSprite => alphamon_pressed");
    EVENT_DISPATCHER->removeCustomEventListeners("alphamon_pressed");
}


AlphamonSprite* AlphamonSprite::create(cocos2d::Node* node, std::unordered_map<std::string, std::string> attributes, std::string alphabet)
{
    auto alphaMonSprite = new AlphamonSprite();
    if (alphaMonSprite && alphaMonSprite->initialize(node, attributes, alphabet)) {
        alphaMonSprite->autorelease();
        return alphaMonSprite;
    }
    CC_SAFE_DELETE(alphaMonSprite);
    return nullptr;
}


bool AlphamonSprite::initialize(cocos2d::Node* node, std::unordered_map<std::string,std::string> attributes, std::string alphabet) {
    this->alphabet = alphabet;
    Alphamon* alphamon = Alphamon::createWithAlphabet(alphabet);
    String* alphamonName = String::createWithFormat("sel_%s", node->getName().c_str());
    alphamon->setName(alphamonName->getCString());
    alphamon->setScale(ALPHAMON_CHARACTER_SCALE);
    this->setAttributes(attributes);
    this->addChild(alphamon);
    this->setName(alphamonName->getCString());
    alphamon->setPosition(node->getPosition());
    
    
    this->getEventDispatcher()->addCustomEventListener("alphamon_pressed", CC_CALLBACK_1(AlphamonSprite::onAlphabetSelected, this));
    
    
    this->getEventDispatcher()->addCustomEventListener(RPGConfig::MAIN_CHARACTER_VICINITY_CHECK_NOTIFICATION, CC_CALLBACK_1(AlphamonSprite::checkVicinityWithMainCharacter, this));

    
    this->schedule(CC_SCHEDULE_SELECTOR(AlphamonSprite::destoryAlphaMon), ALPHAMON_DESTRUCTION_FREQUENCY);
    this->scheduleUpdate();
    
    return true;
    
}

void AlphamonSprite::checkVicinityWithMainCharacter(EventCustom * event) {
    this->mainSkeleton = static_cast<SkeletonCharacter*>(event->getUserData());
    this->checkVicinityToMainSkeleton(this->mainSkeleton);

}

Alphamon* AlphamonSprite::getAlphaMon() {
    assert(!this->getChildren().empty());
    assert(this->getChildren().size() == 1);
    
    Alphamon* alphaMone = dynamic_cast<Alphamon *>(this->getChildren().at(0));
    return alphaMone;
}

void AlphamonSprite::setAttributes(std::unordered_map<std::string, std::string> attributes) {
    this->attributes = attributes;
    //process it
    
    std::unordered_map<std::string,std::string>::const_iterator it = this->attributes.find("canInteract");
    if ( it != this->attributes.end() ) {
        this->setInterAct(it->second);
    }
}

std::unordered_map<std::string, std::string> AlphamonSprite::getAttributes() {
    return this->attributes;
}

void AlphamonSprite::update(float dt) {
    if(!this->vicinityToMainCharacter && this->mainSkeleton != NULL && !this->mainSkeleton->isStanding) {
        this->checkVicinityToMainSkeleton(this->mainSkeleton);
    }
}

void AlphamonSprite::checkVicinityToMainSkeleton(SkeletonCharacter* skeletonCharacter) {
    Vec2 mainSkeletonPositionFromBottom = Point(skeletonCharacter->getSkeletonNode()->getPosition().x, skeletonCharacter->getSkeletonNode()->getPosition().y);
    Vec2 mainSkeletonPositionFromTop = Point(skeletonCharacter->getSkeletonNode()->getPosition().x, skeletonCharacter->getSkeletonNode()->getPosition().y + skeletonCharacter->getSkeletonNode()->getBoundingBox().size.height);
    
    float distanceFromTop= mainSkeletonPositionFromTop.getDistance(this->getAlphaMon()->getPosition());
    float distanceFromBottom = mainSkeletonPositionFromBottom.getDistance(this->getAlphaMon()->getPosition());
    
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

SkeletonCharacter* AlphamonSprite::getMainSkeleton() {
    return this->mainSkeleton;
}

void AlphamonSprite::destroyTouchPointer() {
    if(this->touchPointerNode != NULL) {
        this->touchPointerNode->removeFromParent();
        this->touchPointerNode = NULL;
    }
}

void AlphamonSprite::showTouchPointer() {
    if(this->touchPointerNode == NULL)
    {
        this->touchPointerNode =  Sprite::create(TOUCH_POINTER_IMG);
        this->touchPointerNode->setScale(0.5f, 0.5f);
        this->touchPointerNode->setPosition(this->getPosition());
        this->addChild(this->touchPointerNode);
        this->touchPointerNode->setVisible(true);
        
        auto scaleBy = ScaleBy::create(0.5, 1.2);
        auto sequenceScale = Sequence::create(scaleBy, scaleBy->reverse(), nullptr);
        auto repeatScaleAction = Repeat::create(sequenceScale, 5);
        auto callbackStart = CallFunc::create(CC_CALLBACK_0(AlphamonSprite::destroyTouchPointer, this));
        auto sequence = Sequence::create(repeatScaleAction, callbackStart, nullptr);
        this->touchPointerNode->runAction(sequence);
    }
}


void AlphamonSprite::onAlphabetSelected(cocos2d::EventCustom *event) {
    std::string s(this->getAlphaMon()->getName());
    std::string removeStr("sel_");
    std::string::size_type i = s.find(removeStr);
    if (i != std::string::npos) {
        s.erase(i, removeStr.length());
    }
    
    this->isSelectedForBattle = true;
    
//    wchar_t* buf = static_cast<wchar_t*>(event->getUserData());
//    if(alphabet == buf[0]) {
        //EVENT_DISPATCHER->dispatchCustomEvent(RPGConfig::SPEECH_MESSAGE_ON_TAP_NOTIFICATION, static_cast<void*>(&s));
//    }
}


void AlphamonSprite::destoryAlphaMon(float dt) {
    if(!this->getChildren().empty() && !this->isSelectedForBattle) {
        EventCustom event(RPGConfig::ON_ALPHAMON_PRESSED_NOTIFICATION);
        std::string s(this->getAlphaMon()->getName());
        std::string removeStr("sel_");
        std::string::size_type i = s.find(removeStr);
        
        if (i != std::string::npos) {
            s.erase(i, removeStr.length());
        }

        event.setUserData(&s);
        _eventDispatcher->dispatchEvent(&event);
        CCLOG("removed AlphamonSprite");
        this->removeFromParentAndCleanup(true);
    }
    
}
