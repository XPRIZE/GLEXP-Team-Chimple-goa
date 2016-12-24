//
//  ScrollableGameMapScene.hpp
//  safari
//
//  Created by Shyamal  Upadhyaya on 12/08/16.
//
//

#ifndef ScrollableGameMapScene_hpp
#define ScrollableGameMapScene_hpp

#include <stdio.h>
#include "cocos2d.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "ui/CocosGUI.h"
#include "StartMenuScene.h"


#define ICON_FOLDER "gameicons"
#define NUMBER_OF_BUTTONS_ROWS 5
#define NUMBER_OF_BUTTONS_COLS 6

class MenuContext;

typedef std::map<std::string, cocos2d::Scene*> map_type;

class ScrollableGameMapScene : public cocos2d::ui::ScrollView {
public:
    static cocos2d::Scene* createScene();
    CREATE_FUNC(ScrollableGameMapScene);
    
    void nagivateToGame(std::string gameName);
    
CC_CONSTRUCTOR_ACCESS:
    virtual bool init();
    ScrollableGameMapScene();
    virtual ~ScrollableGameMapScene();

protected:
    cocos2d::Layer* _layer;
    MenuContext* menuContext;
    map_type mymap;
    void gameSelected(cocos2d::Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType);
    std::vector<std::string> split(std::string s, char delim);
    std::string parseGameConfig(std::string gameConfig);
    std::map<std::string, std::string> parseGameConfigToMap(std::string gameConfig);
};

#endif /* ScrollableGameMapScene_hpp */
