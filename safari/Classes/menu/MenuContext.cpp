//
//  MenuContext.cpp
//  safari
//
//  Created by Srikanth Talapadi on 19/07/16.
//
//

#include "MenuContext.h"
#include "ui/CocosGUI.h"
#include "../StartMenuScene.h"

USING_NS_CC;
using namespace cocos2d::ui;

const std::string MenuContext::LANG = "kan";

MenuContext* MenuContext::create(Node* main) {
    MenuContext* menuContext = new (std::nothrow) MenuContext();
    if(menuContext && menuContext->init(main)) {
        menuContext->autorelease();
        return menuContext;
    }
    CC_SAFE_DELETE(menuContext);
    return nullptr;
    
}

bool MenuContext::init(Node* main) {
    if(!Node::init()) {
        return false;
    }
    _main = main;
    Size visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();

    _menuButton = Button::create("menu/menu.png", "menu/menu.png", "menu/menu.png", Widget::TextureResType::LOCAL);
    _menuButton->addTouchEventListener(CC_CALLBACK_2(MenuContext::expandMenu, this));
    _menuButton->setPosition(Vec2(origin.x + visibleSize.width - 150, origin.y + visibleSize.height - 150));
    addChild(_menuButton, 1);
    
    _label = Label::createWithTTF("Points: 0", "fonts/arial.ttf", 50);
    _label->setPosition(Vec2(125, 125));
    _menuButton->addChild(_label);
    
    return true;
}

void MenuContext::pauseNodeAndDescendants(Node *pNode)
{
    pNode->pause();
    for(const auto &child : pNode->getChildren())
    {
        this->pauseNodeAndDescendants(child);
    }
}
// resume nodes
void MenuContext::resumeNodeAndDescendants(Node *pNode)
{
    pNode->resume();
    for(const auto &child : pNode->getChildren())
    {
        this->resumeNodeAndDescendants(child);
    }
}

void MenuContext::expandMenu(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
    if(eEventType == cocos2d::ui::Widget::TouchEventType::ENDED) {
        Button* clickedButton = dynamic_cast<Button *>(pSender);
        if(clickedButton == _menuButton) {
            if(_menuSelected) {
                auto moveTo = MoveTo::create(0.5, _menuButton->getPosition());
                auto elastic = EaseBackIn::create(moveTo);
                auto callbackRemoveMenu = CallFunc::create(CC_CALLBACK_0(MenuContext::removeMenu, this));
                _menu->runAction(Sequence::create(elastic, callbackRemoveMenu, NULL));
            } else {
                Size visibleSize = Director::getInstance()->getVisibleSize();
                _greyLayer = LayerColor::create(Color4B(128.0, 128.0, 128.0, 128.0));
                _greyLayer->setContentSize(visibleSize);
                addChild(_greyLayer, -1);
                _menu = Button::create("menu/close.png", "menu/close.png", "menu/close.png", Widget::TextureResType::LOCAL);
                _menu->addTouchEventListener(CC_CALLBACK_2(MenuContext::expandMenu, this));
                _menu->setPosition(_menuButton->getPosition());
                addChild(_menu);
                auto moveTo = MoveTo::create(0.5, Vec2(150, _menuButton->getPosition().y));
                auto elastic = EaseBackOut::create(moveTo);
                _menu->runAction(elastic);
                pauseNodeAndDescendants(_main);
                _menuSelected = true;
            }
        } else if (clickedButton == _menu) {
            Director::getInstance()->replaceScene(StartMenu::createScene());
        }
    }
}

void MenuContext::removeMenu() {
    removeChild(_menu);
    _menu = nullptr;
    removeChild(_greyLayer);
    _greyLayer = nullptr;
    resumeNodeAndDescendants(_main);
    _menuSelected = false;
}

void MenuContext::pickAlphabet(char targetAlphabet, char chosenAlphabet, bool choose, cocos2d::Vec2 position) {
    if((choose && targetAlphabet == chosenAlphabet) || (!choose && targetAlphabet != chosenAlphabet)) {
        _points++;
    } else {
        _points--;
    }
    _label->setString("Points: " + to_string(_points));
}

void MenuContext::finalizePoints() {
    
}

MenuContext::MenuContext() :
_points(0),
_label(nullptr),
_menuSelected(false),
_greyLayer(nullptr)
{
    
}

MenuContext::~MenuContext() {
    
}

