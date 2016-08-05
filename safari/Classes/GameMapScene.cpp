//
//  GameMapScene.cpp
//  safari
//
//  Created by Shyamal  Upadhyaya on 29/07/16.
//
//

#include "GameMapScene.h"
#include "alphamon/SelectAlphamonScene.h"
#include "puzzle/DuelScene.h"
#include "mini_games/PatchTheWallScene.h"
#include "mini_games/CrossTheBridgeScene.h"
#include "mini_games/SmashTheRockScene.h"
#include "mini_games/EndlessRunner.h"
#include "mini_games/Cannon_Ball_Main.h"
#include "mini_games/TraceScene.h"
#include "mini_games/AlphamonFeedScene.h"
#include "StartMenuScene.h"
#include "mini_games/Baja.h"

USING_NS_CC;

Scene* GameMapScene::createScene()
{
    // 'scene' is an autorelease object
    auto scene = Scene::create();
    
    // 'layer' is an autorelease object
    auto layer = GameMapScene::create();
    
    // add layer as a child to scene
    scene->addChild(layer);
    
    layer->menuContext = MenuContext::create(layer);
    scene->addChild(layer->menuContext);
    
    // return the scene
    
    return scene;
}

GameMapScene* GameMapScene::create()
{
    GameMapScene* mapLayer = new (std::nothrow) GameMapScene();
    if(mapLayer && mapLayer->init()) {
        mapLayer->autorelease();
        return mapLayer;
    }
    CC_SAFE_DELETE(mapLayer);
    return nullptr;
}


GameMapScene::GameMapScene():
menuContext(nullptr)
{
}

GameMapScene::~GameMapScene() {
}

bool GameMapScene::init()
{
    //////////////////////////////
    // 1. super init first
    if ( !Layer::init() )
    {
        return false;
    }
    
    FileUtils::getInstance()->addSearchPath("res/gamemap");
    
    this->languageManger = LanguageManager::getInstance();
    
    
    this->loadGameMap();
    
    return true;
}


void GameMapScene::loadGameMap() {
    Node *rootNode = CSLoader::createNode(GAME_MAP_FILE);
    this->addChild(rootNode);
    this->processChildNodes(rootNode);
}


void GameMapScene::processChildNodes(cocos2d::Node *rootNode) {
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
    auto mapChildren = mainLayer->getChildren();
    
    for (std::vector<Node*>::iterator it = mapChildren.begin() ; it != mapChildren.end(); ++it) {
        cocos2d::Node* node = *it;
        
        
        
        cocostudio::ComExtensionData* data = (cocostudio::ComExtensionData*)node->getComponent("ComExtensionData");
        if(data != NULL && !data->getCustomProperty().empty()) {
            std::string gameName = data->getCustomProperty();
            
            if(gameName == "Trace Alphabet") {
                gameName = KUNG_FU_ALPHA;
            } else if(gameName == "Endless Runner") {
                gameName = ENDLESS_RUNNER;
            }
            
            cocos2d::ui::Button* button = dynamic_cast<cocos2d::ui::Button *>(node);
            button->setName(gameName);
            if(button) {
                button->addTouchEventListener(CC_CALLBACK_2(GameMapScene::islandSelected, this));
            }
            
        }
        
    }
    
}



void GameMapScene::islandSelected(Ref* pSender, ui::Widget::TouchEventType eEventType)
{
    cocos2d::ui::Button* clickedButton = dynamic_cast<cocos2d::ui::Button *>(pSender);
    switch (eEventType) {
        case ui::Widget::TouchEventType::BEGAN:
            break;
        case ui::Widget::TouchEventType::MOVED:
            break;
        case ui::Widget::TouchEventType::ENDED:
        {
            clickedButton->setEnabled(false);
            if(clickedButton->getName() == PATCH_THE_WALL) {
                Director::getInstance()->replaceScene(PatchTheWall::createScene());
            } else if(clickedButton->getName() == CROSS_THE_BRIDGE) {
                Director::getInstance()->replaceScene(CrossTheBridge::createScene());
            } else if(clickedButton->getName() == PATCH_THE_WALL) {
                Director::getInstance()->replaceScene(PatchTheWall::createScene());
            } else if(clickedButton->getName() == SMASH_THE_ROCK) {
                Director::getInstance()->replaceScene(SmashTheRock::createScene());
            } else if(clickedButton->getName() == CANNON_BALL) {
                Director::getInstance()->replaceScene(MainGame::createScene());
            } else if(clickedButton->getName() == ENDLESS_RUNNER) {
                Director::getInstance()->replaceScene(EndlessRunner::createScene());
            } else if(clickedButton->getName() == KUNG_FU_ALPHA) {
                Director::getInstance()->replaceScene(Trace::createScene(0));
            } else if(clickedButton->getName() == ALPHAMON_FEED) {
                Director::getInstance()->replaceScene(AlphamonFeed::createScene());
            }
            break;
        }
            
        case ui::Widget::TouchEventType::CANCELED:
            break;
        default:
            break;
    }
    
}
