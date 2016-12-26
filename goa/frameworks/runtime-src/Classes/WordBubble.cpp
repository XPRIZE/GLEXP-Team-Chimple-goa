//
//  WordBubble.cpp
//  goa
//
//  Created by Shyamal.Upadhyaya on 25/12/16.
//
//

#include "WordBubble.hpp"
#include "RPGConfig.h"
#include "menu/MenuContext.h"



USING_NS_CC;
using namespace cocos2d::ui;

WordBubble::WordBubble():
_button(nullptr),
_soundButton(nullptr)
{
    
}

WordBubble::~WordBubble() {
}


WordBubble* WordBubble::create(std::string word, Point position) {
    auto wordBubble = new WordBubble();
    if (wordBubble && wordBubble->initialize(word, position)) {
        wordBubble->autorelease();
        return wordBubble;
    }
    CC_SAFE_DELETE(wordBubble);
    return nullptr;
}

std::vector<std::string> WordBubble::split(std::string s, char delim)
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

void WordBubble::join(const std::vector<std::string>& v, char c, std::string& s) {
    
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


bool WordBubble::initialize(std::string word, Point position) {
    
    _button = Button::create("Button_Normal.png", "Button_Press.png", "Button_Disable.png", ui::Widget::TextureResType::LOCAL);
    
    _soundButton = Button::create("template/template_02/sound_button.png", "template/template_02/click_sound_button.png", "template/template_02/click_sound_button.png", ui::Widget::TextureResType::PLIST);
    
    _button->setPosition(Point(position.x, position.y));
    CCLOG("Text to speak %s", word.c_str());
    std::string displayText = word;
    
    std::vector<std::string> tokens = this->split(displayText, ' ');
    std::string joinedStr = "";
    
    this->join(tokens, ' ', joinedStr);
    
    CCLOG(" final string %s", joinedStr.c_str());
    
    _button->setTitleText(joinedStr);
    _button->setTitleAlignment(TextHAlignment::LEFT, TextVAlignment::CENTER);
    _button->setTitleColor(cocos2d::Color3B::BLACK);
    _button->setTitleFontSize(SPEECH_TEXT_FONT_SIZE);
    _button->setTitleFontName(SPEECH_TEXT_FONT_FILE);
    _button->ignoreContentAdaptWithSize(false);
    auto lbl_size = _button->getTitleRenderer()->getContentSize();
    _button->setContentSize(
                            Size(
                                 (lbl_size.width + _soundButton->getBoundingBox().size.width/2) * 2.0f,
                                 lbl_size.height * 1.5f
                                 )
                            );
    
    
    _soundButton->setPosition(Vec2( _button->getBoundingBox().size.width - _soundButton->getBoundingBox().size.width/4, _button->getBoundingBox().size.height/2));
    _soundButton->setScale(0.3);
    _soundButton->addTouchEventListener(CC_CALLBACK_2(WordBubble::soundSelected, this));

    this->addChild(_button, 1);
    _button->addChild(_soundButton);
    return true;
}

void WordBubble::soundSelected(Ref* pSender, ui::Widget::TouchEventType eEventType)
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



cocos2d::ui::Button* WordBubble::currentButton() {
    return _button;
}
