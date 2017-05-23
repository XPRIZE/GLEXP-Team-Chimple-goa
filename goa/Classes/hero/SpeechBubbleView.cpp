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

SpeechBubbleView::SpeechBubbleView(): _button(nullptr),
_externalCharacter(nullptr),
_skeletonCharacter(nullptr)
{
    
}

SpeechBubbleView::~SpeechBubbleView() {
}


SpeechBubbleView* SpeechBubbleView::createForExternalCharacter(ExternalSkeletonCharacter* character ,std::unordered_map<int, std::string> textMap, Point position) {
    auto speechBubbleView = new SpeechBubbleView();
    if (speechBubbleView && speechBubbleView->initialize(textMap, position)) {
        speechBubbleView->_externalCharacter = character;
        speechBubbleView->autorelease();
        return speechBubbleView;
    }
    CC_SAFE_DELETE(speechBubbleView);
    return nullptr;
   
}

SpeechBubbleView* SpeechBubbleView::createForCharacter(SkeletonCharacter* character ,std::unordered_map<int, std::string> textMap, Point position) {
    
    auto speechBubbleView = new SpeechBubbleView();
    if (speechBubbleView && speechBubbleView->initialize(textMap, position)) {
        speechBubbleView->_skeletonCharacter = character;
        speechBubbleView->autorelease();
        return speechBubbleView;
    }
    CC_SAFE_DELETE(speechBubbleView);
    return nullptr;

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

std::vector<std::string> SpeechBubbleView::split(std::string s, char delim)
{
    std::vector<std::string> elems;
    std::stringstream ss;
    ss.str(s);
    std::string item;
    while (getline(ss, item, delim)) {
        elems.push_back(item);
    }
    return elems;
}

void SpeechBubbleView::join(const std::vector<std::string>& v, char c, std::string& s) {
    
    s.clear();
    int counter = 1;
    for (std::vector<std::string>::const_iterator p = v.begin();
         p != v.end(); ++p) {
        s += *p;
        
        if(s.length() > 30 * counter) {
            s += "\n";
            counter++;
        }
        if (p != v.end() - 1)
            s += c;
    }
}


bool SpeechBubbleView::initialize(std::unordered_map<int, std::string> textMap, Point position) {
    int delta = 100.0f;
    int priority = 1;
    
    for ( auto it = textMap.begin(); it != textMap.end(); ++it ) {
        
        _button = Button::create("Button_Normal.png", "Button_Press.png", "Button_Disable.png", ui::Widget::TextureResType::LOCAL);
        _soundButton = Button::create("template/template_02/sound_button.png", "template/template_02/click_sound_button.png", "template/template_02/click_sound_button.png", ui::Widget::TextureResType::PLIST);
        Size visibleSize = Director::getInstance()->getVisibleSize();
        
        
        _button->setPosition(Point(position.x, position.y + delta));
        CCLOG("Text to speak %s", it->second.c_str());
        std::string displayText = it->second;
        
        std::vector<std::string> tokens = this->split(displayText, ' ');
        std::string joinedStr = "";
        
        this->join(tokens, ' ', joinedStr);
        
        CCLOG(" final string %s", joinedStr.c_str());
        
        _button->setTitleText(joinedStr);
        _button->setTitleColor(cocos2d::Color3B::BLACK);
        _button->setTitleFontSize(SPEECH_TEXT_FONT_SIZE);
        _button->setTitleFontName(SPEECH_TEXT_FONT_FILE);
        _button->setUserData((void *) it->first);
        _button->addTouchEventListener(CC_CALLBACK_2(SpeechBubbleView::dialogSelected, this));
        _button->ignoreContentAdaptWithSize(false);
        auto lbl_size = _button->getTitleRenderer()->getContentSize();
        _button->setContentSize(
                               Size(
                                    lbl_size.width * 1.25f,
                                    lbl_size.height * 1.25f
                                    )
                               );
        
        
        CCLOG("_button->getBoundingBox().size.height %f", _button->getBoundingBox().size.height);
        if(position.y + delta + _button->getBoundingBox().size.height > visibleSize.height) {
            position.y = position.y - _button->getBoundingBox().size.height/2;
            _button->setPosition(Point(position.x, position.y));
        } else if(position.y - _button->getBoundingBox().size.height < 0.0f) {
            position.y = position.y + _button->getBoundingBox().size.height/2;
            _button->setPosition(Point(position.x, position.y));
        } else if(position.x + _button->getBoundingBox().size.width > visibleSize.width) {
            position.x = position.x - _button->getBoundingBox().size.width/2;
            _button->setPosition(Point(position.x, position.y + delta));
        } else if(position.x - _button->getBoundingBox().size.width < 0.0f) {
            position.x = position.x + _button->getBoundingBox().size.width/2;
            _button->setPosition(Point(position.x, position.y + delta));
        }
        
        
        _soundButton->setPosition(Vec2( _button->getBoundingBox().size.width, _button->getBoundingBox().size.height/2));
        _soundButton->setScale(0.5);
        _soundButton->addTouchEventListener(CC_CALLBACK_2(SpeechBubbleView::soundSelected, this));
        
        _button->addChild(_soundButton);
        
        this->textButtons.push_back(_button);
        this->addChild(_button, priority);

        
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
    
    this->getEventDispatcher()->addCustomEventListener(RPGConfig::SEND_BUBBLE_DESTROY_NOTIFICATION, CC_CALLBACK_1(SpeechBubbleView::bubbleDestoryMessageEvent, this));
    
    return true;
}

void SpeechBubbleView::bubbleDestoryMessageEvent(EventCustom * event) {
    CCLOG("Received destory bubble");
    this->destroySpeechBubbles();

}

cocos2d::ui::Button* SpeechBubbleView::currentButton() {
    return _button;
}

void SpeechBubbleView::performAction() {
    if(_button != NULL && _button->getUserData())
    {
        int preConditionId = (int)(size_t)_button->getUserData();
        EVENT_DISPATCHER->dispatchCustomEvent(RPGConfig::SPEECH_MESSAGE_ON_TEXT_TAP_NOTIFICATION, (void *) preConditionId);
        this->destroySpeechBubbles();
    }
}

void SpeechBubbleView::dialogSelected(Ref* pSender, ui::Widget::TouchEventType eEventType)
{
    switch (eEventType) {
        case ui::Widget::TouchEventType::BEGAN:
        {
            break;
        }
        case ui::Widget::TouchEventType::MOVED:
            break;
        case ui::Widget::TouchEventType::ENDED:
        {
            this->performAction();
            break;
        }
            
        case ui::Widget::TouchEventType::CANCELED:
            break;
        default:
            break;
    }
    
}

void SpeechBubbleView::destroySpeechBubbles() {
    if(_externalCharacter != nullptr) {
        _externalCharacter->getExternalSkeletonActionTimeLine()->play(IDLE, true);
    }
    
    if(_skeletonCharacter != nullptr) {
        _skeletonCharacter->getSkeletonActionTimeLine()->play(IDLE, true);
    }
    
    for (std::vector<Button*>::iterator it = this->textButtons.begin() ; it != this->textButtons.end(); ++it) {
        Button* button =  *it;
        button->setVisible(false);
        button->removeFromParentAndCleanup(true);
    }
    this->removeFromParentAndCleanup(true);
}


void SpeechBubbleView::soundSelected(Ref* pSender, ui::Widget::TouchEventType eEventType)
{
    switch (eEventType) {
        case ui::Widget::TouchEventType::BEGAN:
        {
            break;
        }
        case ui::Widget::TouchEventType::MOVED:
            break;
        case ui::Widget::TouchEventType::ENDED:
        {
            MenuContext::pronounceWord(_button->getTitleText());
            break;
        }
            
        case ui::Widget::TouchEventType::CANCELED:
            break;
        default:
            break;
    }
    
}
