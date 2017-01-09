//
//  ScrollableCatalogue.hpp
//  goa
//
//  Created by Shyamal.Upadhyaya on 08/01/17.
//
//

#ifndef ScrollableCatalogue_hpp
#define ScrollableCatalogue_hpp

#include <stdio.h>
#include "../menu/MenuContext.h"
#include "cocos2d.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "ui/CocosGUI.h"
#include "StartMenuScene.h"
#include "external/json/document.h"

#define STORY_NUMBER_OF_BUTTONS_ROWS 3
#define STORY_NUMBER_OF_BUTTONS_COLS 5


class ScrollableCatalogue : public cocos2d::Node {
    
public:
    static cocos2d::Scene* createScene();
    static ScrollableCatalogue* create();
    
    static std::vector<std::string> getTopBarGames();
    static void pushTopBarGame(std::string game);
    
    void onExitTransitionDidStart() override;
    
    void createBook(int i, int j, int numRows, int numCols, cocos2d::ui::Widget* parent, int index, const rapidjson::Value& storyJson, int yOffset, Color3B bookColor);
    
CC_CONSTRUCTOR_ACCESS:
    bool init() override;
    ScrollableCatalogue();
    ~ScrollableCatalogue();
    
protected:
    cocos2d::LayerColor* _greyLayer;
    cocos2d::ui::PageView* _pageView;
    MenuContext* menuContext;
    rapidjson::Value storyConfigs;
    int selectedIndex;    
    bool lockAll;
    std::map<std::string, std::string> titleMap;

    void addGreyLayer();
    bool greyLayerTouched(cocos2d::Touch *touch, cocos2d::Event *event);
    
    void loadStory(cocos2d::Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType);
    
    void transitionToStory(float dt);    
};


#endif /* ScrollableCatalogue_hpp */
