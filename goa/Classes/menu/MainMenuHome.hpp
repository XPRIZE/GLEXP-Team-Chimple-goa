//
//  MainMenuHome.hpp
//  goa
//
//  Created by Shyamal.Upadhyaya on 25/04/17.
//
//

#ifndef MainMenuHome_hpp
#define MainMenuHome_hpp

#include <stdio.h>
#include "cocos2d.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "ui/CocosGUI.h"
#include "StartMenuScene.h"
#include "MenuContext.h"
#include "external/json/document.h"
#include "../story/QuestionHandler.h"
#include "storage/local-storage/LocalStorage.h"
#include "../menu/LevelHelpScene.h"

#define BACKGROUND_MENU "Background_menu/Background_menu.csb"
#define ICON_FOLDER "gameicons"
#define NUMBER_OF_BUTTONS_ROWS 4
#define NUMBER_OF_BUTTONS_COLS 5

#define MAIN_HOME_NUMBER_OF_BUTTONS_ROWS 2
#define MAIN_HOME_NUMBER_OF_BUTTONS_COLS 4


class MenuContext;

typedef std::map<std::string, cocos2d::Scene*> map_type;

class MainMenuHome : public cocos2d::Node {
public:
    static cocos2d::Scene* createScene();
    CREATE_FUNC(MainMenuHome);
    
CC_CONSTRUCTOR_ACCESS:
    virtual bool init();
    MainMenuHome();
    virtual ~MainMenuHome();
    
protected:
    MenuContext* menuContext;
    cocos2d::LayerColor* _greyLayer;
    std::string _gameNameToNavigate;
    float _leftMostX = 0.0f;
    float _rightMostX = 0.0f;

    
    void addGreyLayer();
    bool greyLayerTouched(cocos2d::Touch *touch, cocos2d::Event *event);
    void bindEvents(cocos2d::Node *rootNode);
    void mainMenuSelected(cocos2d::Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType);
    void transition(float dt);
    
    cocos2d::ui::Button* createButton();
    void storyTransition(float dt);
    void storySelected(cocos2d::Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType);
    
    
};

#endif /* MainMenuHome_hpp */
