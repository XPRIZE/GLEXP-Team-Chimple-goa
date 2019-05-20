//
//  ChooseCharacter.cpp
//  goa
//
//  Created by Shyamal.Upadhyaya on 06/01/17.
//
//

#include "ChooseCharacter.hpp"
#include "../hero/HelloWorldScene.h"

USING_NS_CC;

Scene* ChooseCharacter::createScene(const std::string& island)
{
    // 'scene' is an autorelease object
    auto scene = Scene::create();
    
    // 'layer' is an autorelease object
    auto layer = ChooseCharacter::create(island);
    
    // add layer as a child to scene
    scene->addChild(layer);
    
    layer->menuContext = MenuContext::create(layer, "ChooseCharacterScene");
    scene->addChild(layer->menuContext);
    
    // return the scene
    
    return scene;
}

ChooseCharacter* ChooseCharacter::create(const std::string& island)
{
    ChooseCharacter* chooseCharacterLayer = new (std::nothrow) ChooseCharacter();
    if(chooseCharacterLayer && chooseCharacterLayer->init(island)) {
        chooseCharacterLayer->autorelease();
        return chooseCharacterLayer;
    }
    CC_SAFE_DELETE(chooseCharacterLayer);
    return nullptr;
}


ChooseCharacter::ChooseCharacter():
menuContext(nullptr)
{
}

ChooseCharacter::~ChooseCharacter() {
}

bool ChooseCharacter::init(const std::string& island)
{
    //////////////////////////////
    // 1. super init first
    if ( !Layer::init() )
    {
        return false;
    }
    
    this->island = island;
    this->load();
    
    return true;
}


void ChooseCharacter::load() {
    Node *rootNode = CSLoader::createNode("choose/choose.csb");
    this->addChild(rootNode);
    this->processChildNodes(rootNode);
}


void ChooseCharacter::processChildNodes(cocos2d::Node *rootNode) {
    //iterate thru all children
    auto children = rootNode->getChildren();
    Node* mainLayer = NULL;
    for (std::vector<Node*>::iterator it = children.begin() ; it != children.end(); ++it) {
        cocos2d::Node* node = *it;
        CCLOG("node name %s", node->getName().c_str());
        if(node->getName().compare(MAIN_LAYER) == 0) {
            mainLayer = node;
        }
    }
    
    assert(mainLayer != NULL);
    
    
    Node* chooseText = mainLayer->getChildByName(CHOOSE_TEXT);
    if(chooseText != NULL) {
        cocos2d::ui::Text* chooseLabel = dynamic_cast<cocos2d::ui::Text *>(chooseText);
        if(chooseLabel != NULL) {
            std::string chooseText = LangUtil::getInstance()->translateString(CHOOSE_CHARACTER_TEXT);
            chooseLabel->setString(chooseText);
            chooseLabel->setFontSize(150);
            chooseLabel->setFontName("fonts/Chanakya.ttf");
            chooseLabel->setTextColor(Color4B::WHITE);
        }
    }
    
    Node* boyNode = mainLayer->getChildByName(BOY_BUTTON);
    if(boyNode != NULL) {
        cocos2d::ui::Button* boyButton = dynamic_cast<cocos2d::ui::Button *>(boyNode);
        if(boyButton != NULL) {
            boyButton->addTouchEventListener(CC_CALLBACK_2(ChooseCharacter::characterSelected, this));
        }
    }

    Node* girlNode = mainLayer->getChildByName(GIRL_BUTTON);
    if(girlNode != NULL) {
        cocos2d::ui::Button* girlButton = dynamic_cast<cocos2d::ui::Button *>(girlNode);
        if(girlButton != NULL) {
            girlButton->addTouchEventListener(CC_CALLBACK_2(ChooseCharacter::characterSelected, this));
        }
    }

    
    Node* boyText = mainLayer->getChildByName(BOY_TEXT);
    if(boyText != NULL) {
        cocos2d::ui::Text* boyLabel = dynamic_cast<cocos2d::ui::Text *>(boyText);
        if(boyLabel != NULL) {
            std::string boyText = "ÜÇ¸·UUUæ";
            boyLabel->setString(boyText);
            boyLabel->setFontSize(100);
            boyLabel->setFontName("fonts/Chanakya.ttf");
            boyLabel->setTextColor(Color4B::WHITE);
            
        }
    }

    Node* girlText = mainLayer->getChildByName(GIRL_TEXT);
    if(boyText != NULL) {
        cocos2d::ui::Text* girlLabel = dynamic_cast<cocos2d::ui::Text *>(girlText);
        if(girlLabel != NULL) {
            std::string girlText = "ÜÇ¸·UUUè";
            girlLabel->setString(girlText);
            girlLabel->setFontSize(100);
            girlLabel->setFontName("fonts/Chanakya.ttf");
            girlLabel->setTextColor(Color4B::WHITE);
            
        }
    }
}



void ChooseCharacter::characterSelected(Ref* pSender, ui::Widget::TouchEventType eEventType)
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
            std::string characterPreference = "";
            if(clickedButton->getName().compare(BOY_BUTTON) == 0) {
                characterPreference = "true";
            } else if(clickedButton->getName().compare(GIRL_BUTTON) == 0) {
                characterPreference = "false";
            }
                        
            if(!characterPreference.empty()) {
                localStorageSetItem(CHARACTER_PREFERENCE, characterPreference);
            }
            
            
            Director::getInstance()->replaceScene(TransitionFade::create(0.5, HelloWorld::createScene(this->island.c_str(),"",true), Color3B::BLACK));
            
            break;
        }
            
        case ui::Widget::TouchEventType::CANCELED:
            break;
        default:
            break;
    }
    
}
