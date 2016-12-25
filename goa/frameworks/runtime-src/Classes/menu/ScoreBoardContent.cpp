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
#include "storage/local-storage/LocalStorage.h"
#include "scripting/js-bindings/manual/ScriptingCore.h"

USING_NS_CC;

ScoreBoardContext* ScoreBoardContext::create(int stars, std::string gameName, std::string sceneName, int level)
{
    ScoreBoardContext* scoreBoard = new (std::nothrow) ScoreBoardContext();
    if(scoreBoard && scoreBoard->init(stars, gameName, sceneName, level)) {
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

bool ScoreBoardContext::init(int stars, std::string gameName, std::string sceneName, int level)
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
    std::string contents = FileUtils::getInstance()->getStringFromFile("config/game_map.json");
    
    rapidjson::Document d;
    
    if (false == d.Parse<0>(contents.c_str()).HasParseError()) {
        for (rapidjson::SizeType i = 0; i < d.Size(); i++) {
            const rapidjson::Value& game = d[i];
            std::string jsonGameName = game["name"].GetString();
            if(gameName == jsonGameName) {
                if(game.HasMember("rewards")) {
                    const rapidjson::Value& rewards = game["rewards"];
                    if(rewards.HasMember(MenuContext::to_string(level).c_str())) {
                        const rapidjson::Value& unlock = rewards[MenuContext::to_string(level).c_str()];
                        if(unlock.HasMember("unlock")) {
                            std::string gameToUnlock = unlock["unlock"].GetString();
                            std::string unlockedGamesStr;
                            localStorageGetItem("unlockedGames", &unlockedGamesStr);
                            rapidjson::Document unlockDoc;
                            rapidjson::Document::AllocatorType& allocator = unlockDoc.GetAllocator();
                            if(unlockedGamesStr.empty()) {
                                unlockDoc.SetObject();
                            } else {
                                unlockDoc.Parse(unlockedGamesStr.c_str());
                            }
                            if(!unlockDoc.HasMember(gameToUnlock.c_str())) {
                                unlockDoc.AddMember(rapidjson::Value(gameToUnlock.c_str(), allocator).Move(), "unlock", allocator);
                                rapidjson::StringBuffer buffer;
                                rapidjson::Writer<rapidjson::StringBuffer> writer(buffer);
                                unlockDoc.Accept(writer);
                                const char* output = buffer.GetString();
                                localStorageSetItem("unlockedGames", output);
                            }
                        }
                    }
                }
            }
        }
    }
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
