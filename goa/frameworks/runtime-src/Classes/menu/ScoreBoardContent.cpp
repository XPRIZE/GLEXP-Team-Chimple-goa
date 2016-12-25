//
//  ScoreBoardContent.cpp
//  safari
//
//  Created by Shyamal  Upadhyaya on 02/08/16.
//
//

#include "ScoreBoardContext.h"
#include "HelloWorldScene.h"
#include "LevelMenu.h"

#include "scripting/js-bindings/manual/ScriptingCore.h"

USING_NS_CC;

ScoreBoardContext* ScoreBoardContext::create(int stars, std::string gameName, std::string sceneName)
{
    ScoreBoardContext* scoreBoard = new (std::nothrow) ScoreBoardContext();
    if(scoreBoard && scoreBoard->init(stars, gameName, sceneName)) {
        scoreBoard->autorelease();
        return scoreBoard;
    }
    CC_SAFE_DELETE(scoreBoard);
    return nullptr;
}


ScoreBoardContext::ScoreBoardContext():
_stars(0)
{
    
}

ScoreBoardContext::~ScoreBoardContext() {
}

bool ScoreBoardContext::init(int stars, std::string gameName, std::string sceneName)
{
    //////////////////////////////
    // 1. super init first
    if ( !Layer::init() )
    {
        return false;
    }
        
    FileUtils::getInstance()->addSearchPath("res/scoreboard");
    this->_stars = stars;
    this->_gameName = gameName;
    this->_sceneName = sceneName;
    this->createScoreBoard();
    
    return true;
}


void ScoreBoardContext::createScoreBoard() {
    Node *rootNode = CSLoader::createNode(SCORE_BOARD_FILE);
    this->addChild(rootNode);
    this->processChildNodes(rootNode);
    this->showStars();
}



void ScoreBoardContext::processChildNodes(cocos2d::Node *rootNode) {
    //iterate thru all children
    auto children = rootNode->getChildren();
    Node* mainLayer = NULL;
    for (std::vector<Node*>::iterator it = children.begin() ; it != children.end(); ++it) {
        cocos2d::Node* node = *it;
        //based on custom data create layers
        cocostudio::ComExtensionData* data = (cocostudio::ComExtensionData*)node->getComponent("ComExtensionData");
        if(data != NULL) {
            CCLOG("%s", data->getCustomProperty().c_str());
            
            if(data->getCustomProperty() == MAIN_LAYER)
            {
                mainLayer = node;
            }
        }
    }
    
    assert(mainLayer != NULL);
    //iterate thru all children
    auto mainChildren = mainLayer->getChildren();
    
    for (std::vector<Node*>::iterator it = mainChildren.begin() ; it != mainChildren.end(); ++it) {
        cocos2d::Node* node = *it;
        
        cocostudio::ComExtensionData* data = (cocostudio::ComExtensionData*)node->getComponent("ComExtensionData");
        if(data != NULL && !data->getCustomProperty().empty()) {
            std::string action = data->getCustomProperty();
            CCLOG("action %s", action.c_str());
            if(dynamic_cast<cocos2d::ui::Button *>(node))
            {
                cocos2d::ui::Button * button = dynamic_cast<cocos2d::ui::Button *>(node);
                
                if(button) {
                    button->addTouchEventListener(CC_CALLBACK_2(ScoreBoardContext::buttonClicked, this));
                    button->setName(action);
                }
                
            } else if(dynamic_cast<Sprite *>(node)) {
                Sprite* sprite = dynamic_cast<Sprite *>(node);
                if(action == "show_one") {
                    this->starOne = sprite;
                    this->starOne->setVisible(false);
                } else if(action == "show_two") {
                    this->starTwo = sprite;
                    this->starTwo->setVisible(false);
                } else if(action == "show_three") {
                    this->starThree = sprite;
                    this->starThree->setVisible(false);
                }
            }
        }
        
    }
    
}

void ScoreBoardContext::showStars() {
    if(_stars == 1) {
        this->starOne->setVisible(true);
    } else if(_stars == 2) {
        this->starOne->setVisible(true);
        this->starTwo->setVisible(true);
    } else if(_stars == 3){
        this->starOne->setVisible(true);
        this->starTwo->setVisible(true);
        this->starThree->setVisible(true);
    }

}

void ScoreBoardContext::transit() {
    if(!this->_sceneName.empty()) {
        Director::getInstance()->replaceScene(TransitionFade::create(0.5, HelloWorld::createScene(this->_gameName,this->_sceneName, true), Color3B::BLACK));

    } else {
        StartMenu::startScene(this->_gameName);
    }
}

void ScoreBoardContext::buttonClicked(Ref* pSender, ui::Widget::TouchEventType eEventType)
{
    cocos2d::ui::Button* clickedButton = dynamic_cast<cocos2d::ui::Button *>(pSender);
    switch (eEventType) {
        case ui::Widget::TouchEventType::BEGAN:
        {
            break;
        }
        case ui::Widget::TouchEventType::MOVED:
            break;
        case ui::Widget::TouchEventType::ENDED:
        {
            if(clickedButton->getName() == "close") {                
                this->transit();
            }
            else if(clickedButton->getName() == "home") {
                if(!this->_sceneName.empty()) {
                    Director::getInstance()->replaceScene(TransitionFade::create(0.5, HelloWorld::createScene("camp","", true), Color3B::BLACK));
                    
                } else {
                    Director::getInstance()->replaceScene(LevelMenu::createScene(_gameName));
                    
                }
            }
            else  {
                this->transit();
            }
            
            break;
        }
            
        case ui::Widget::TouchEventType::CANCELED:
            break;
        default:
            break;
    }
    
    
    
}
