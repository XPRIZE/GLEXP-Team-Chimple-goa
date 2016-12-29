//
//  ScoreBoardContent.cpp
//  safari
//
//  Created by Shyamal  Upadhyaya on 02/08/16.
//
//

#include "ScoreBoardContext.h"
#include "../HelloWorldScene.h"
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
_stars(0),
_gameToUnlock("")
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
    std::map<std::string, std::string> gameIcons;
    if (false == d.Parse<0>(contents.c_str()).HasParseError()) {
        for (rapidjson::SizeType i = 0; i < d.Size(); i++) {
            const rapidjson::Value& game = d[i];
            std::string jsonGameName = game["name"].GetString();
            gameIcons[jsonGameName] = game["icon"].GetString();
            if(gameName == jsonGameName) {
                if(game.HasMember("rewards")) {
                    const rapidjson::Value& rewards = game["rewards"];
                    if(rewards.HasMember(MenuContext::to_string(level).c_str())) {
                        const rapidjson::Value& levelRewards = rewards[MenuContext::to_string(level).c_str()];
                        if(levelRewards.HasMember("unlock")) {
                            std::string gameToUnlock = levelRewards["unlock"].GetString();
                            unlockGame(gameToUnlock);
                        }
                        auto badgesToAdd = getStarBadges(level);
                        if(levelRewards.HasMember("badge")) {
                            badgesToAdd.push_back(levelRewards["badge"].GetString());
                        }
                        addBadges(badgesToAdd);
                        if(levelRewards.HasMember("unlockMin")) {
                            std::string unlockMin = levelRewards["unlockMin"].GetString();
                            std::string unlockMinStr;
                            localStorageGetItem("unlockMin", &unlockMinStr);
                            rapidjson::Document unlockMinDoc;
                            rapidjson::Document::AllocatorType& allocator = unlockMinDoc.GetAllocator();
                            if(unlockMinStr.empty()) {
                                unlockMinDoc.SetObject();
                            } else {
                                unlockMinDoc.Parse(unlockMinStr.c_str());
                            }
                            bool unlockMinModified = true;
                            int unlockCount = 0;
                            if(unlockMinDoc.HasMember(unlockMin.c_str())) {
                                rapidjson::Value& unlockMinGames = unlockMinDoc[unlockMin.c_str()];
                                for (rapidjson::SizeType bgi = 0; bgi < unlockMinGames.Size(); bgi++) {
                                    if(unlockMinGames[bgi].GetString() == gameName) {
                                        unlockMinModified = false;
                                        break;
                                    }
                                }
                                if(unlockMinModified) {
                                    unlockMinGames.PushBack(rapidjson::Value(gameName.c_str(), allocator).Move(), allocator);
                                    unlockCount = unlockMinGames.Size();
                                }
                            } else {
                                rapidjson::Value unlockMinGames(rapidjson::kArrayType);
                                unlockMinGames.PushBack(rapidjson::Value(gameName.c_str(), allocator).Move(), allocator);
                                unlockMinDoc.AddMember(rapidjson::Value(unlockMin.c_str(), allocator).Move(), unlockMinGames, allocator);
                                unlockCount = 1;
                            }
                            if(unlockMinModified) {
                                if(levelRewards.HasMember("min")) {
                                    std::string minStr = levelRewards["min"].GetString();
                                    int min = atoi(minStr.c_str());
                                    if(unlockCount >= min) {
                                        unlockGame(unlockMin);
                                    }
                                }
                                rapidjson::StringBuffer buffer;
                                rapidjson::Writer<rapidjson::StringBuffer> writer(buffer);
                                unlockMinDoc.Accept(writer);
                                const char* output = buffer.GetString();
                                localStorageSetItem("unlockMin", output);
                            }
                        }
                    }
                }
            }
        }
    }
    if(!_gameToUnlock.empty() && gameIcons.count(_gameToUnlock) > 0) {
        auto sprite = Sprite::create(gameIcons[_gameToUnlock]);
        addChild(sprite);
    }
    return true;
}

std::vector<std::string> ScoreBoardContext::getStarBadges(int level) {
    std::vector<std::string> starBadges;
    std::string progressStr;
    localStorageGetItem(_gameName + ".level", &progressStr);
    rapidjson::Document d;
    if(!progressStr.empty()) {
        d.Parse(progressStr.c_str());
        if(d.Size() >= level) {
            if(d[level].GetInt() == 3) {
                starBadges.push_back("3_star");
            }
            if(level >= 3) {
                if(d[level-2].GetInt() == 3 && d[level-1].GetInt() == 3 && d[level].GetInt() == 3) {
                    starBadges.push_back("3_3_star_in_a_row");
                }
            }
            if(level >= 5) {
                if(d[level-4].GetInt() == 3 && d[level-3].GetInt() == 3 && d[level-2].GetInt() == 3 && d[level-1].GetInt() == 3 && d[level].GetInt() == 3) {
                    starBadges.push_back("5_3_star_in_a_row");
                }
            }
        }
    }
    return starBadges;
}

bool ScoreBoardContext::addBadges(std::vector<std::string> badges) {
    std::string badgesStr;
    localStorageGetItem("badges", &badgesStr);
    rapidjson::Document badgesDoc;
    rapidjson::Document::AllocatorType& allocator = badgesDoc.GetAllocator();
    if(badgesStr.empty()) {
        badgesDoc.SetObject();
    } else {
        badgesDoc.Parse(badgesStr.c_str());
    }
    bool badgeModified = false;
    for (auto it = badges.begin() ; it != badges.end(); ++it) {
        auto badge = *it;
        if(badgesDoc.HasMember(badge.c_str())) {
            rapidjson::Value& badgeGames = badgesDoc[badge.c_str()];
            for (rapidjson::SizeType bgi = 0; bgi < badgeGames.Size(); bgi++) {
                if(badgeGames[bgi].GetString() == _gameName) {
                    break;
                }
                badgeModified = true;
            }
            if(badgeModified) {
                badgeGames.PushBack(rapidjson::Value(_gameName.c_str(), allocator).Move(), allocator);
                _badges.push_back(badge);
            }
        } else {
            rapidjson::Value badgeGames(rapidjson::kArrayType);
            badgeGames.PushBack(rapidjson::Value(_gameName.c_str(), allocator).Move(), allocator);
            badgesDoc.AddMember(rapidjson::Value(badge.c_str(), allocator).Move(), badgeGames, allocator);
            badgeModified = true;
            _badges.push_back(badge);
        }
    }
    if(badgeModified) {
        rapidjson::StringBuffer buffer;
        rapidjson::Writer<rapidjson::StringBuffer> writer(buffer);
        badgesDoc.Accept(writer);
        const char* output = buffer.GetString();
        localStorageSetItem("badges", output);
    }
    return badgeModified;
}

bool ScoreBoardContext::unlockGame(std::string gameToUnlock) {
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
        ScrollableGameMapScene::pushTopBarGame(gameToUnlock);
        _gameToUnlock = gameToUnlock;
        return true;
    }
    return false;
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
            if(clickedButton->getName() == "replay") {
                this->transit();
            }
            else if(clickedButton->getName() == "level") {
                if(!this->_sceneName.empty()) {
                    Director::getInstance()->replaceScene(TransitionFade::create(0.5, HelloWorld::createScene("camp","", true), Color3B::BLACK));
                    
                } else {
                    Director::getInstance()->replaceScene(LevelMenu::createScene(_gameName));
                    
                }
            }
            else if(clickedButton->getName() == "home") {
                Director::getInstance()->replaceScene(TransitionFade::create(2.0, ScrollableGameMapScene::createScene(), Color3B::BLACK));
            }
            else if(clickedButton->getName() == "next")  {
                
            }
            break;
        }
            
        case ui::Widget::TouchEventType::CANCELED:
            break;
        default:
            break;
    }
    
    
    
}
