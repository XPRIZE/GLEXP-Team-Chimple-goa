//
//  ScoreBoardContext.h
//  safari
//
//  Created by Shyamal  Upadhyaya on 02/08/16.
//
//

#include <stdio.h>
#include "cocos2d.h"
#include "../RPGConfig.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "editor-support/cocostudio/CCComExtensionData.h"
#include "ui/UIWidget.h"
#include "ui/GUIExport.h"
#include "extensions/cocos-ext.h"
#include "../ScrollableGameMapScene.hpp"
#include "../StartMenuScene.h"

#ifndef ScoreBoardContext_h
#define ScoreBoardContext_h

class ScoreBoardContext : public cocos2d::Layer {
public:
    
    static ScoreBoardContext* create(int stars, std::string gameName, std::string sceneName = "", int level = 0);
    
CC_CONSTRUCTOR_ACCESS:
    virtual bool init(int stars, std::string gameName, std::string sceneName, int level);
    ScoreBoardContext();
    virtual ~ScoreBoardContext();
    
protected:
    bool unlockGame(std::string gameToUnlock);
    bool addBadges(std::vector<std::string> badges);
    std::vector<std::string> getStarBadges(int level);
    std::string _gameToUnlock;
    std::vector<std::string> _badges;
private:
    std::map<std::string, int> _gameNumberOfLevels;
    void createScoreBoard();
    void processChildNodes(cocos2d::Node *rootNode);
    void buttonClicked(Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType);
    void transit();
    void showStars();
    cocos2d::Node* starOne;
    cocos2d::Node* starTwo;
    cocos2d::Node* starThree;
    std::string _gameName;
    std::string _sceneName;
    int _stars;
    
};
#endif /* ScoreBoardContext_h */
