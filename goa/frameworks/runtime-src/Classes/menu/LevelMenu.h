//
//  LevelMenu.h
//  goa
//
//  Created by Srikanth Talapadi on 22/12/2016.
//
//

#ifndef LevelMenu_h
#define LevelMenu_h

#include "cocos2d.h"
#include "ui/CocosGUI.h"


class LevelMenu: public cocos2d::Node {
public:
    static cocos2d::Scene *createScene(std::string gameName);
    static LevelMenu *create(std::string gameName);
    void scrolled(cocos2d::Ref *target, cocos2d::ui::ScrollView::EventType event);
    void onEnterTransitionDidFinish();
    void startGame(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType);
    
CC_CONSTRUCTOR_ACCESS:
    LevelMenu();
    virtual ~LevelMenu();
    virtual bool initWithGame(std::string gameName);
protected:
    std::string _gameName;
    cocos2d::ParallaxNode *_parallax;
    cocos2d::ui::ScrollView *_scrollView;
    cocos2d::Vec2 _initPos;
    std::map<std::string, std::string> parseGameConfigToMap(std::string gameConfig);
};

#endif /* LevelMenu_h */
