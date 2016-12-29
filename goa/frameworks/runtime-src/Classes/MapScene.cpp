//
//  MapScene.cpp
//  safari
//
//  Created by Shyamal  Upadhyaya on 26/07/16.
//
//

#include "MapScene.h"

USING_NS_CC;

Scene* MapScene::createScene()
{
    // 'scene' is an autorelease object
    auto scene = Scene::create();
    
    // 'layer' is an autorelease object
    auto layer = MapScene::create();
    
    // add layer as a child to scene
    scene->addChild(layer);
    
    layer->menuContext = MenuContext::create(layer, "map");
    scene->addChild(layer->menuContext);
    
    // return the scene
    
    return scene;
}

MapScene* MapScene::create()
{
    MapScene* mapLayer = new (std::nothrow) MapScene();
    if(mapLayer && mapLayer->init()) {
        mapLayer->autorelease();
        return mapLayer;
    }
    CC_SAFE_DELETE(mapLayer);
    return nullptr;
}


MapScene::MapScene():
menuContext(nullptr)
{
}

MapScene::~MapScene() {
}

bool MapScene::init()
{
    //////////////////////////////
    // 1. super init first
    if ( !Layer::init() )
    {
        return false;
    }
    
    FileUtils::getInstance()->addSearchPath("res/map");
    
    this->currentLangUtil = LangUtil::getInstance();

    
    this->loadMap();
    
    return true;
}


void MapScene::loadMap() {
    Node *rootNode = CSLoader::createNode(MAP_FILE);
    this->addChild(rootNode);
    this->processChildNodes(rootNode);
}


void MapScene::processChildNodes(cocos2d::Node *rootNode) {
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
            std::unordered_map<std::string, std::string> attributes = RPGConfig::parseUserData(data->getCustomProperty());
            
            std::unordered_map<std::string,std::string>::const_iterator it = attributes.find("text");
            
            std::unordered_map<std::string,std::string>::const_iterator itNextScene = attributes.find("nextScene");
            
            if ( it != attributes.end() ) {
                //process text
                std::string mapText = this->currentLangUtil->translateString(it->second);
                cocos2d::Label* label = Label::createWithTTF(mapText, "fonts/arial.ttf", 50);
                label->setPosition(node->getPosition());
                mainLayer->addChild(label);                
            }
            
            if(itNextScene != attributes.end())
            {
                //bind events
                cocos2d::ui::Button* button = dynamic_cast<cocos2d::ui::Button *>(node);
                if(button) {
                    button->setName(itNextScene->second);
                    button->addTouchEventListener(CC_CALLBACK_2(MapScene::islandSelected, this));
                }
            }

        }
        
    }
    
}



void MapScene::islandSelected(Ref* pSender, ui::Widget::TouchEventType eEventType)
{
    cocos2d::ui::Button* clickedButton = dynamic_cast<cocos2d::ui::Button *>(pSender);
    switch (eEventType) {
        case ui::Widget::TouchEventType::BEGAN:
        {
            clickedButton->setHighlighted(true);
            break;
        }
        case ui::Widget::TouchEventType::MOVED:
            break;
        case ui::Widget::TouchEventType::ENDED:
        {
            clickedButton->setEnabled(false);
            Director::getInstance()->replaceScene(TransitionFade::create(0.5, HelloWorld::createScene(clickedButton->getName().c_str(),"", true), Color3B::BLACK));
            //Director::getInstance()->replaceScene(TransitionFade::create(0.5, HelloWorld::createScene("city2",""), Color3B::BLACK));

            break;
        }
            
        case ui::Widget::TouchEventType::CANCELED:
            break;
        default:
            break;
    }
    
}
