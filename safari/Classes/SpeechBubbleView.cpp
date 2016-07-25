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
using namespace cocos2d::ui;

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
    int priority = 1;
    
    for ( auto it = textMap.begin(); it != textMap.end(); ++it ) {
        
        auto button = Button::create("Button_Normal.png", "Button_Press.png", "Button_Disable.png", ui::Widget::TextureResType::LOCAL);
        
        button->setPosition(Point(position.x, position.y + delta));
        button->setTitleText(it->second);
        button->setTitleColor(cocos2d::Color3B::BLACK);
        button->setTitleFontSize(SPEECH_TEXT_FONT_SIZE);
        button->setTitleFontName(SPEECH_TEXT_FONT_FILE);
        button->setUserData((void *) it->first);
        button->addTouchEventListener(CC_CALLBACK_2(SpeechBubbleView::dialogSelected, this));
        button->ignoreContentAdaptWithSize(false);
        auto lbl_size = button->getTitleRenderer()->getContentSize();
        button->setContentSize(
                               Size(
                                    lbl_size.width * 1.5f,
                                    lbl_size.height * 1.5f
                                    )
                               );
        
        

        this->textButtons.push_back(button);
        this->addChild(button, priority);

        
//        auto textLabel = Label::createWithTTF(it->second, SPEECH_TEXT_FONT_FILE, SPEECH_TEXT_FONT_SIZE, Size(SPEECH_TEXT_WIDTH, SPEECH_TEXT_HEIGHT), TextHAlignment::LEFT, TextVAlignment::CENTER);
//        
//        textLabel->setPosition(Point(position.x, position.y + delta));
//        
//        textLabel->setUserData((void *) it->first);
//        this->texts.push_back(textLabel);
//        this->addChild(textLabel, priority);
        delta += 100.0f;
        priority += 1;
        
    }

    
    //bind listeners
    
//    auto listenerTouches = EventListenerTouchOneByOne::create();
//    listenerTouches->setSwallowTouches(true);
//    listenerTouches->onTouchBegan = CC_CALLBACK_2(SpeechBubbleView::onTouchBegan, this);
//    listenerTouches->onTouchEnded = CC_CALLBACK_2(SpeechBubbleView::touchEnded, this);
//    this->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listenerTouches, this);

    //register for custom event
    
    auto bubbleDestoryMessageEvent = [=] (EventCustom * event) {
        CCLOG("Received destory bubble");
        this->destroySpeechBubbles();
    };
    
    SEND_BUBBLE_DESTROY_SIGNAL(this, RPGConfig::SEND_BUBBLE_DESTROY_NOTIFICATION, bubbleDestoryMessageEvent);

    
    return true;
}

void SpeechBubbleView::dialogSelected(Ref* pSender, ui::Widget::TouchEventType eEventType)
{
    Button* clickedButton = dynamic_cast<Button *>(pSender);
    switch (eEventType) {
        case ui::Widget::TouchEventType::BEGAN:
        {
            int preConditionId = (int)(size_t)clickedButton->getUserData();
            EVENT_DISPATCHER->dispatchCustomEvent(RPGConfig::SPEECH_MESSAGE_ON_TEXT_TAP_NOTIFICATION, (void *) preConditionId);
            break;
        }
        case ui::Widget::TouchEventType::MOVED:
            break;
        case ui::Widget::TouchEventType::ENDED:
        {
            this->destroySpeechBubbles();
            break;
        }
            
        case ui::Widget::TouchEventType::CANCELED:
            break;
        default:
            break;
    }
    
}

void SpeechBubbleView::destroySpeechBubbles() {
    for (std::vector<Button*>::iterator it = this->textButtons.begin() ; it != this->textButtons.end(); ++it) {
        Button* button =  *it;
        button->removeFromParentAndCleanup(true);
    }
    this->removeFromParentAndCleanup(true);
    EVENT_DISPATCHER->dispatchCustomEvent(RPGConfig::SPEECH_BUBBLE_DESTROYED_NOTIFICATION);
}


//bool SpeechBubbleView::onTouchBegan(Touch *touch, Event *event)
//{
//    Point touch_point = touch->getLocationInView();
//    touch_point = Director::getInstance()->convertToGL(touch_point);
//    for (std::vector<Label*>::iterator it = this->texts.begin() ; it != this->texts.end(); ++it) {
//        Label* label =  *it;
//        if(label != NULL && label->getParent() != NULL && label->getBoundingBox().containsPoint(this->getParent()->convertToNodeSpace(touch_point))) {
//            int preConditionId = (int)(size_t)label->getUserData();
//            EVENT_DISPATCHER->dispatchCustomEvent(RPGConfig::SPEECH_MESSAGE_ON_TEXT_TAP_NOTIFICATION, (void *) preConditionId);
//            return true;
//        }
//    }    
//    return false;
//}
//
//void SpeechBubbleView::touchEnded(Touch *touch, Event *event)
//{
//    Point touch_point = touch->getLocationInView();
//    touch_point = Director::getInstance()->convertToGL(touch_point);
//    for (std::vector<Label*>::iterator it = this->texts.begin() ; it != this->texts.end(); ++it) {
//        Label* label =  *it;
//        label->removeFromParentAndCleanup(true);
//        
//    }
//    this->removeFromParentAndCleanup(true);
//    EVENT_DISPATCHER->dispatchCustomEvent(RPGConfig::SPEECH_BUBBLE_DESTROYED_NOTIFICATION);
//}
