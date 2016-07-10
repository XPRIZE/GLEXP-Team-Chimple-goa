//
//  SpeechBubbleView.cpp
//  rpg
//
//  Created by Shyamal  Upadhyaya on 10/07/16.
//
//

#include "SpeechBubbleView.hpp"
#include "cocos2d.h"
#include "RPGConfig.h"

USING_NS_CC;

SpeechBubbleView::SpeechBubbleView() {
    
}

SpeechBubbleView::~SpeechBubbleView() {
}


SpeechBubbleView* SpeechBubbleView::create(std::unordered_map<int, std::string> textMap, Point position) {
    auto speechBubbleView = new SpeechBubbleView();
    if (speechBubbleView && speechBubbleView->initialize(textMap, position)) {
        speechBubbleView->autorelease();
        return speechBubbleView;
    }
    CC_SAFE_DELETE(speechBubbleView);
    return nullptr;
}

bool SpeechBubbleView::initialize(std::unordered_map<int, std::string> textMap, Point position) {
    int delta = 0;
    for ( auto it = textMap.begin(); it != textMap.end(); ++it ) {
        auto textLabel = Label::createWithTTF(it->second, SPEECH_TEXT_FONT_FILE, SPEECH_TEXT_FONT_SIZE, Size(SPEECH_TEXT_WIDTH, SPEECH_TEXT_HEIGHT), TextHAlignment::LEFT, TextVAlignment::CENTER);
        
        textLabel->setPosition(Point(position.x, position.y + delta));
        
        textLabel->setUserData((void *) it->first);
        this->texts.push_back(textLabel);
        this->addChild(textLabel, 1);
        delta += 50.0f;
        
    }

    
    //bind listeners
    
    auto listenerTouches = EventListenerTouchOneByOne::create();
    listenerTouches->setSwallowTouches(true);
    listenerTouches->onTouchBegan = CC_CALLBACK_2(SpeechBubbleView::onTouchBegan, this);
    listenerTouches->onTouchEnded = CC_CALLBACK_2(SpeechBubbleView::touchEnded, this);
    this->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listenerTouches, this);

    return true;
}


bool SpeechBubbleView::onTouchBegan(Touch *touch, Event *event)
{
    Point touch_point = touch->getLocationInView();
    touch_point = Director::getInstance()->convertToGL(touch_point);
    for (std::vector<Label*>::iterator it = this->texts.begin() ; it != this->texts.end(); ++it) {
        Label* label =  *it;
        if(label != NULL && label->getParent() != NULL && label->getBoundingBox().containsPoint(this->getParent()->convertToNodeSpace(touch_point))) {
            int preConditionId = (int)(size_t)label->getUserData();
            EVENT_DISPATCHER->dispatchCustomEvent(RPGConfig::SPEECH_MESSAGE_ON_TEXT_TAP_NOTIFICATION, (void *) preConditionId);
            return true;
        }
    }    
    return false;
}

void SpeechBubbleView::touchEnded(Touch *touch, Event *event)
{
    Point touch_point = touch->getLocationInView();
    touch_point = Director::getInstance()->convertToGL(touch_point);
    for (std::vector<Label*>::iterator it = this->texts.begin() ; it != this->texts.end(); ++it) {
        Label* label =  *it;
        label->removeFromParentAndCleanup(true);
        
    }
    this->removeFromParentAndCleanup(true);
}
