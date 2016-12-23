//
//  LevelHelpOverlay.cpp
//  goa
//
//  Created by Srikanth Talapadi on 23/12/2016.
//
//

#include "LevelHelpOverlay.h"
#include "MenuContext.h"

USING_NS_CC;

LevelHelpOverlay *LevelHelpOverlay::create(std::string gameName) {
    LevelHelpOverlay* lhs = new (std::nothrow) LevelHelpOverlay();
    if(lhs && lhs->initWithGame(gameName))
    {
        lhs->autorelease();
        return lhs;
    }
    CC_SAFE_DELETE(lhs);
    return nullptr;
}

LevelHelpOverlay::LevelHelpOverlay() {
    
}
LevelHelpOverlay::~LevelHelpOverlay() {
    
}

bool LevelHelpOverlay::initWithGame(std::string gameName) {
    if(!LevelHelpScene::initWithGame(gameName)) {
        return false;
    }
    
    return true;
}

void LevelHelpOverlay::gotoGame(Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
    auto menuContext = static_cast<MenuContext *>(getParent());
    removeFromParent();
    menuContext->removeMenu();
}
