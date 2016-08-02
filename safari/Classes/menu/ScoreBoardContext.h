//
//  ScoreBoardContext.h
//  safari
//
//  Created by Shyamal  Upadhyaya on 02/08/16.
//
//

#include <stdio.h>
#include "cocos2d.h"
#include "RPGConfig.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "editor-support/cocostudio/CCComExtensionData.h"
#include "ui/UIWidget.h"
#include "ui/GUIExport.h"
#include "cocos-ext.h"
#include "GameMapScene.h"
#include "StartMenuScene.h"

#ifndef ScoreBoardContext_h
#define ScoreBoardContext_h

class ScoreBoardContext : public cocos2d::Layer {
public:
    
    static ScoreBoardContext* create(int points, std::string gameName);
    
CC_CONSTRUCTOR_ACCESS:
    virtual bool init(int points, std::string gameName);
    ScoreBoardContext();
    virtual ~ScoreBoardContext();
    
private:
    void createScoreBoard();
    void processChildNodes(cocos2d::Node *rootNode);
    void buttonClicked(Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType);
    void showStars();
    cocos2d::Node* starOne;
    cocos2d::Node* starTwo;
    cocos2d::Node* starThree;
    std::string _gameName;
    int _points;
    
};
#endif /* ScoreBoardContext_h */
