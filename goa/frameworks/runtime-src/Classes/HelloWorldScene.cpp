#include <iostream>
#include <string>
#include <sstream>
#include <regex>
#include <unordered_map>
#include "HelloWorldScene.h"
#include "StartMenuScene.h"
#include "ScrollableGameMapScene.hpp"
#include "MapScene.h"
#include "effects/FShake.h"
#include "storage/local-storage/LocalStorage.h"

USING_NS_CC;

static const std::string HINT_TEXT = ".hintText";

Scene* HelloWorld::createScene(const std::string& island, const std::string& sceneName, bool fromMenu)
{
    // 'scene' is an autorelease object
    auto scene = Scene::createWithPhysics();
    
    // 'layer' is an autorelease object
    auto layer = HelloWorld::create(island, sceneName, fromMenu);
    layer->setTouchEnabled(false);
    // add layer as a child to scene
    scene->addChild(layer);

    layer->menuContext = MenuContext::create(layer, HelloWorld::gameName(), true);
    layer->menuContext->setMaxPoints(3);
    scene->addChild(layer->menuContext);

    initPhysics(scene);
    
    // return the scene
    
    return scene;
}

HelloWorld* HelloWorld::create(const std::string& island, const std::string& sceneName, bool fromMenu)
{
    HelloWorld* helloWorldLayer = new (std::nothrow) HelloWorld();
    if(helloWorldLayer && helloWorldLayer->init(island, sceneName, fromMenu)) {
        helloWorldLayer->autorelease();
        return helloWorldLayer;
    }
    CC_SAFE_DELETE(helloWorldLayer);
    return nullptr;
}

void HelloWorld::initPhysics(Scene* scene)
{
    scene->getPhysicsWorld()->setGravity(Vec2(0.0f, RPG_GRAVITY));
    if(ENABLE_DEBUGDRAW) {
        scene->getPhysicsWorld()->setDebugDrawMask(PhysicsWorld::DEBUGDRAW_ALL);
    }
}

HelloWorld::HelloWorld()
:gesture_layer_(nullptr),
skeletonCharacter(nullptr),
mainCharacterCategoryBitMask(INVISIBLE_BOUNDARY_CATEGORY_BITMASK),
isSpeechBubbleAlreadyVisible(false),
sqlite3Helper(nullptr),
stateMachine(nullptr),
messageSender(nullptr),
messageReceiver(nullptr),
currentTouchPoint(0,0),
mainLayer(nullptr),
backgroundLayer(nullptr),
foregroundLayer(nullptr),
physicsFile(""),
sceneSize(0,0),
island(""),
sceneName(""),
alphamonNodesCount(0),
skeletonPositionInLastVisitedScene(nullptr),
_fromMenu(false),
_speechBubbleView(nullptr),
_textDisplayAnimationRunning(false),
_greyLayer(nullptr),
_wordToPronounce(""),
_bagPackNode(nullptr),
_hintText(""),
leftBoundaryNodeExists(false),
rightBoundaryNodeExists(false)
{
    this->stateMachine = NULL;
}

HelloWorld::~HelloWorld() {
}

//TODO
void HelloWorld::initializeSafari() {
    
    this->querySceneToLoadInIsland();
    
    this->loadGameScene();
    
    this->initializeStateMachine();
    
    this->loadWords();
    
    this->showBagPackButton();
}

void HelloWorld::showBagPackButton() {
    this->createMenuItem("menu/backpack_icon.png", "menu/backpack_icon.png", "menu/backpack_icon.png");
}

void HelloWorld::renderBagPack() {
    _bagPackMenu->setVisible(false);
    _bagPackMenu->setEnabled(false);
    auto children = _bagPackNode->getChildren();
    ;
    for (std::vector<Node*>::iterator it = children.begin() ; it != children.end(); ++it) {
        cocos2d::Node* node = *it;
        cocos2d::ui::Button* sNode = dynamic_cast<cocos2d::ui::Button*>(node);
        if(sNode != NULL && sNode->getChildrenCount() == 0) {
            if(sNode->getName().compare("Button") == 0) {
                continue;
            }
            std::string nodeName = node->getName();
            nodeName.erase(std::remove(nodeName.begin(), nodeName.end(), '\n'), nodeName.end());

            int result = this->sqlite3Helper->checkIfItemExistsInBag(nodeName.c_str(), this->getIsland().c_str());

            CCLOG("render bag processing %s", nodeName.c_str());
            if(result == 1) {
                //in bag
                CCLOG("already in bag %s", nodeName.c_str());
                sNode->setEnabled(true);
            } else {
                sNode->setEnabled(false);
            }
        }
        
        if(_wordMappings.size() > 0) {
            cocos2d::ui::Text* sLabel = dynamic_cast<cocos2d::ui::Text*>(node);
            if(sLabel != NULL && sLabel->getChildrenCount() == 0) {
                CCLOG("putting label text %s", sLabel->getName().c_str());
                std::string label = sLabel->getName();
                label.erase(std::remove(label.begin(), label.end(), '\n'), label.end());
                std::string from = "_label";
                size_t start_pos = label.find(from);
                if(start_pos == std::string::npos) {
                    
                } else {
                    label = label.replace(start_pos, from.length(), "");
                    
                    std::string::iterator end_pos = std::remove(label.begin(), label.end(), ' ');
                    label.erase(end_pos, label.end());
                }
                
                std::map<std::string,std::string>::const_iterator it = _wordMappings.find(label);
                if ( it != _wordMappings.end() ) {
                    std::string labelStr = it->second;
                    sLabel->setString(labelStr);
                    sLabel->setFontSize(50);
                    sLabel->setFontName("fonts/Roboto-Regular.ttf");
                    sLabel->setTextColor(Color4B::BLACK);
                }
                
            }            
        }
        
        
    }
    
    Node* textFieldNode = _bagPackNode->getChildByName("TextField");
    cocos2d::ui::TextField* sTextField = dynamic_cast<cocos2d::ui::TextField*>(textFieldNode);
    if(sTextField != NULL) {
        //store hint into local storage
        std::string hintText;
        localStorageGetItem(HINT_TEXT, &hintText);
        
        if(hintText.empty()) {
            std::string firstHint = this->sqlite3Helper->findFirstHint(this->getIsland().c_str());
            if(!firstHint.empty()) {
                localStorageSetItem(HINT_TEXT, firstHint);
            }
        }
        
        sTextField->setString(hintText);
        sTextField->setFontName("fonts/Roboto-Regular.ttf");
        sTextField->setFontSize(50);
        sTextField->setTextColor(Color4B::BLACK);
        sTextField->setTextHorizontalAlignment(TextHAlignment::CENTER);
        sTextField->setTextVerticalAlignment(TextVAlignment::TOP);
    }
}

void HelloWorld::showBagpackOpenAnimation(std::unordered_map<int, std::string> textMapFollowedByAnimation, std::string owner) {
    
        CCLOG("show bag pack for %s", this->getIsland().c_str());
        std::string backPackFile = "";
        backPackFile = this->getIsland()+"_bagpack" + "/" + this->getIsland() + "_bagpack.csb";
    
        if(FileUtils::getInstance()->isFileExist(backPackFile)) {
            Size visibleSize = Director::getInstance()->getVisibleSize();
            Vec2 origin = Director::getInstance()->getVisibleOrigin();
            
            _bagPackNode = CSLoader::createNode(backPackFile);
            _bagPackNode->setAnchorPoint(Vec2(0.5,0.5));
            _bagPackNode->setPosition(Vec2(origin.x + visibleSize.width / 2, origin.y + visibleSize.height + 650));
            this->addChild(_bagPackNode, 4);
            
            auto moveTo = MoveTo::create(1.0, Vec2(origin.x + visibleSize.width / 2, origin.y + visibleSize.height/2));
            auto elastic = EaseBackOut::create(moveTo);
            auto bubbleAction = TargetedAction::create(_bagPackNode, elastic);
            auto renderBagpackCallAction = CallFunc::create(CC_CALLBACK_0(HelloWorld::renderBagPack, this));
            runAction(Sequence::create(renderBagpackCallAction,bubbleAction, NULL));
            
            
            //bind events
            Node* closeButtonNode = _bagPackNode->getChildByName("Button");
            if(closeButtonNode != NULL) {
                cocos2d::ui::Button * closeButton = dynamic_cast<cocos2d::ui::Button *>(closeButtonNode);
                if(closeButton != NULL) {
                    closeButton->addTouchEventListener(CC_CALLBACK_2(HelloWorld::closeBagPack, this,textMapFollowedByAnimation, owner));
                }
                
            }
        }
}

void HelloWorld::showBagPack(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
    if(eEventType == cocos2d::ui::Widget::TouchEventType::ENDED) {
        if(_bagPackNode == NULL)
        {
            std::unordered_map<int, std::string> textMapFollowedByAnimation;
            showBagpackOpenAnimation(textMapFollowedByAnimation, "");
        }
    }
}


void HelloWorld::removeBagPack(std::unordered_map<int, std::string> textMapFollowedByAnimation, std::string owner) {
    if(_bagPackNode != NULL) {
        _bagPackNode->removeFromParent();
        _bagPackNode = NULL;        
    }
    if(textMapFollowedByAnimation.size() > 0 && !owner.empty())
    {
        this->processTextMessage(textMapFollowedByAnimation, owner);
    }
    
    
    _bagPackMenu->setVisible(true);
    _bagPackMenu->setEnabled(true);
    
}

void HelloWorld::closeBagPack(Ref* pSender, ui::Widget::TouchEventType eEventType, std::unordered_map<int, std::string> textMapFollowedByAnimation, std::string owner)
{
    switch (eEventType) {
        case ui::Widget::TouchEventType::BEGAN:
        {
            break;
        }
        case ui::Widget::TouchEventType::MOVED:
            break;
        case ui::Widget::TouchEventType::ENDED:
        {
            Size visibleSize = Director::getInstance()->getVisibleSize();
            Vec2 origin = Director::getInstance()->getVisibleOrigin();
            auto moveTo = MoveTo::create(1.0, Vec2(origin.x + visibleSize.width / 2, origin.y + visibleSize.height + 750));
            auto elastic = EaseBackIn::create(moveTo);
            auto goBackAction = TargetedAction::create(_bagPackNode, elastic);
            auto callBack = CallFunc::create(CC_CALLBACK_0(HelloWorld::removeBagPack, this, textMapFollowedByAnimation, owner));
            runAction(Sequence::create(goBackAction, callBack, NULL));
            
            
            break;
        }
        case ui::Widget::TouchEventType::CANCELED:
            break;
        default:
            break;
    }
}


cocos2d::ui::Button* HelloWorld::createMenuItem(const std::string normalImage,
                                                 const std::string selectedImage ,
                                                const std::string disableImage) {
    _bagPackMenu = cocos2d::ui::Button::create(normalImage, selectedImage, disableImage, cocos2d::ui::Widget::TextureResType::LOCAL);
    Size visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();
    
    _bagPackMenu->setPosition(Vec2(origin.x + 150, origin.y + visibleSize.height - 150));
    _bagPackMenu->addTouchEventListener(CC_CALLBACK_2(HelloWorld::showBagPack, this));
    
    addChild(_bagPackMenu);
    
    return _bagPackMenu;
}


void HelloWorld::updatePositionAndCategoryBitMaskMainCharacter() {
    if(this->skeletonCharacter)
    {
        this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->setCategoryBitmask(this->mainCharacterCategoryBitMask);
        
        if(this->skeletonPositionInLastVisitedScene &&
           !this->skeletonPositionInLastVisitedScene->getXPosition().empty() &&
           !this->skeletonPositionInLastVisitedScene->getYPosition().empty()) {
            
            float xPos = String::create(this->skeletonPositionInLastVisitedScene->getXPosition())->floatValue();
            float yPos = String::create(this->skeletonPositionInLastVisitedScene->getYPosition())->floatValue();
            if(xPos != 0.0f && yPos != 0.0f) {
                this->skeletonCharacter->getSkeletonNode()->setPosition(Vec2(xPos, yPos));
            }
        } else {
            if(this->island == this->sceneName) {
                float xPosInIsland = UserDefault::getInstance()->getFloatForKey(SKELETON_POSITION_IN_PARENT_ISLAND_X);
                float yPosInIsland = UserDefault::getInstance()->getFloatForKey(SKELETON_POSITION_IN_PARENT_ISLAND_Y);
                if(xPosInIsland != 0.0f && yPosInIsland != 0.0f) {
                    this->skeletonCharacter->getSkeletonNode()->setPosition(Vec2(xPosInIsland, yPosInIsland));
                }
                
            }
        }
    }
}

void HelloWorld::loadGameScene() {
    std::string mainSceneName = this->getSceneName() + ".csb";
    if(!sceneName.empty()) {
        this->setSceneName(sceneName);
    } else {
    }
    
    
    Node *rootNode = CSLoader::createNode(mainSceneName);
    this->setSceneSize(rootNode->getContentSize());
    this->addChild(rootNode);
    
    this->setPhysicsFile(this->getSceneName()+"_physics.plist");

    this->setReferencesToGameLayers(rootNode);
    
    this->initGestureLayer();
    
    this->processMainLayerNonAlphamonChildrenForCustomEvents();
    
    this->enablePhysicsBoundaries(rootNode);
    
    this->updatePositionAndCategoryBitMaskMainCharacter();
}


void HelloWorld::loadWords() {
    
    //create hang bubble
    
    _hangBubbleNode = CSLoader::createNode("template/hang_bubble.csb");

    std::string bagPackFile = this->getIsland()+"_bagpack" + "/" + this->getIsland()+"_bagpack.mapping.json";
    
    if(FileUtils::getInstance()->isFileExist(bagPackFile)) {
        std::string jsonData = FileUtils::getInstance()->getStringFromFile(bagPackFile);
        CCLOG("got data %s", jsonData.c_str());
        
        
        rapidjson::Document d;
        rapidjson::Value::MemberIterator M;
        const char *key,*value;
        
        d.Parse<0>(jsonData.c_str());
        if (d.HasParseError()) {
            CCLOG("GetParseError %u\n",d.GetParseError());
        } else
        {
            
            for (M=d.MemberBegin(); M!=d.MemberEnd(); M++)
            {
                key   = M->name.GetString();
                value = M->value.GetString();
                std::string sValue = value;
                sValue = LangUtil::getInstance()->translateString(sValue);
                
                if (key!=NULL && value!=NULL)
                {
                    CCLOG("%s = %s", key,sValue.c_str());
                }
                
                _wordMappings.insert({key,sValue});
            }
        }
    }
    
    
    std::string wordFile = !this->getSceneName().empty() ? this->getSceneName() + ".mapping.json":  this->getIsland() + ".mapping.json";
    
    if(FileUtils::getInstance()->isFileExist(wordFile)) {
        std::string jsonData = FileUtils::getInstance()->getStringFromFile(wordFile);
        CCLOG("got data %s", jsonData.c_str());
        
        
        rapidjson::Document d;
        rapidjson::Value::MemberIterator M;
        const char *key,*value;

        d.Parse<0>(jsonData.c_str());
        if (d.HasParseError()) {
            CCLOG("GetParseError %u\n",d.GetParseError());
        } else
        {
            
            for (M=d.MemberBegin(); M!=d.MemberEnd(); M++)
            {
                key   = M->name.GetString();
                value = M->value.GetString();
                std::string sValue = value;
                sValue = LangUtil::getInstance()->translateString(sValue);
                
                if (key!=NULL && value!=NULL)
                {
                    CCLOG("%s = %s", key,sValue.c_str());
                }
                
                _wordMappings.insert({key,sValue});
            }
        }
    }
    
    
    std::map<std::string,std::string> mapping = _wordMappings;
    
    std::map<std::string, std::string>::iterator it;
    for(it = mapping.begin(); it != mapping.end(); it++) {
        std::string nodeName  = it->first;
        std::string word = it->second;
        
        CCLOG("node=%s, word=%s", nodeName.c_str(), word.c_str());
        Node* node = this->mainLayer->getChildByName(nodeName.c_str());
        if(node != NULL && !word.empty()) {
            this->createWordSprite(node, word, this->mainLayer);
            CCLOG("Found node %s for word %s", node->getName().c_str(), word.c_str());
        } else {
            if(this->foregroundLayer != NULL)
            {
                node = this->foregroundLayer->getChildByName(nodeName.c_str());
                if(node != NULL && !word.empty()) {
                    CCLOG("Found node %s for word %s", node->getName().c_str(), word.c_str());
                    this->createWordSprite(node, word, this->foregroundLayer);
                }
            }
        }
    }
}

void HelloWorld::createWordSprite(Node* node, std::string word, Node* parentNode)
{
    WordBubble* wordBubble = WordBubble::create(word, Vec2(node->getPosition().x, node->getPosition().y));
    wordBubble->setName(word+"_wordBubble");
    wordBubble->setVisible(false);
    parentNode->addChild(wordBubble, 12);
}


void HelloWorld::processMainLayerNonAlphamonChildrenForCustomEvents() {
    assert(this->mainLayer != NULL);
    //iterate thru all children
    auto children = this->mainLayer->getChildren();
    for (std::vector<Node*>::iterator it = children.begin() ; it != children.end(); ++it) {
        cocos2d::Node* node = *it;
        this->processNodeWithCustomAttributes(node, this->mainLayer);
    }
    
    if(!leftBoundaryNodeExists) {
        Node* leftNode = Node::create();
        this->mainLayer->addChild(leftNode);
        leftNode->setPosition(Vec2(0,0));
        leftNode->setAnchorPoint(Vec2(0.5,0.5));
        leftBoundaryNodeExists = true;
        createLeftBoundary(leftNode);
        
    }

    
    if(!rightBoundaryNodeExists) {
        Node* rightNode = Node::create();
        this->mainLayer->addChild(rightNode);
        rightNode->setPosition(Vec2(this->getSceneSize().width,0));
        rightNode->setAnchorPoint(Vec2(0.5,0.5));
        rightBoundaryNodeExists = true;
        createRightBoundary(rightNode);
    }

    this->skeletonCharacter->setExternalCharacterNames(this->getExternalCharacterNames());
    
}

void HelloWorld::processNodeWithCustomAttributes(Node* node, Node* parentNode) {
    
    cocostudio::ComExtensionData* data = (cocostudio::ComExtensionData*)node->getComponent("ComExtensionData");
    
    if(data != NULL && !data->getCustomProperty().empty()) {
        
            CCLOG("found user data for child %s", node->getName().c_str());
            CCLOG("user data for child %s", data->getCustomProperty().c_str());
        
            std::unordered_map<std::string, std::string> attributes = RPGConfig::parseUserData(data->getCustomProperty());

            if(!attributes.empty())
            {
                std::regex skeletonFile ("\\b(.*)_skeleton.csb");
                std::unordered_map<std::string,std::string>::const_iterator it = attributes.find("fileName");
                std::unordered_map<std::string,std::string>::const_iterator itLeft = attributes.find("left");
                std::unordered_map<std::string,std::string>::const_iterator itRight = attributes.find("right");
                std::unordered_map<std::string,std::string>::const_iterator itLeftBoundary = attributes.find("leftboundary");
                std::unordered_map<std::string,std::string>::const_iterator itRightBoundary = attributes.find("rightboundary");
                
                
                if ( it != attributes.end() ) {
                    std::string fileName(it->second);
                    //    fileName = std::regex_replace(fileName, std::regex("^ +| +$|( ) +"), "$1");
                    
                    if(regex_match(fileName, skeletonFile)) {
                        //process hero node
                        std::string value = node->getName();// std::regex_replace(node->getName(), std::regex("^ +| +$|( ) +"), "$1");
                        if(value == HUMAN_SKELETON_NAME) {
                            CCLOG("Creating HERO Skeleton for node %s", node->getName().c_str());
                            //create Hero character
                            this->addMainCharacterToScene(fileName, node);
                            
                        } else  {
                            //create external characters
                            CCLOG("Creating External Skeleton for node %s", node->getName().c_str());
                            _externalCharactersNames.push_back(node->getName());
                            ExternalSkeletonCharacter* externalSkeletonCharacter = ExternalSkeletonCharacter::create(node, attributes);
                            this->mainLayer->addChild(externalSkeletonCharacter);
                            
                        }
                    }
                } else if(itLeft != attributes.end() || itLeftBoundary != attributes.end()) {
                    leftBoundaryNodeExists = true;
                    createLeftBoundary(node);                    
                } else if(itRight != attributes.end() || itRightBoundary != attributes.end()) {
                    rightBoundaryNodeExists = true;
                    createRightBoundary(node);
                }
                else {
                    CCLOG("Creating RPG Sprite for Node %s", node->getName().c_str());
                    this->createRPGSprite(node, attributes, parentNode);
                }
            }
    }
}


void HelloWorld::createRightBoundary(Node* node) {
    CCLOG("Creating Right boundary");
    auto physicsBody = PhysicsBody::createBox(Size(INVISIBLE_BOUNDARY_WIDTH, this->getSceneSize().height), PHYSICSBODY_MATERIAL_DEFAULT, Vec2(INVISIBLE_RIGHT_BOUNDARY_OFFSET,this->getSceneSize().height/2));
    physicsBody->setDynamic(false);
    physicsBody->setMass(INFINITY);
    node->setPhysicsBody(physicsBody);
    node->getPhysicsBody()->setRotationEnable(false);
    node->getPhysicsBody()->setCategoryBitmask(INVISIBLE_BOUNDARY_CATEGORY_BITMASK);
    node->getPhysicsBody()->setCollisionBitmask(INVISIBLE_BOUNDARY_CONTACT_BITMASK);
    node->getPhysicsBody()->setContactTestBitmask(INVISIBLE_BOUNDARY_CONTACT_BITMASK);
    
}


void HelloWorld::createLeftBoundary(Node* node) {
    auto physicsBody = PhysicsBody::createBox(Size(INVISIBLE_BOUNDARY_WIDTH, this->getSceneSize().height), PHYSICSBODY_MATERIAL_DEFAULT, Vec2(INVISIBLE_LEFT_BOUNDARY_OFFSET,this->getSceneSize().height/2));
    physicsBody->setDynamic(false);
    physicsBody->setMass(INFINITY);
    node->setPhysicsBody(physicsBody);
    
    node->getPhysicsBody()->setRotationEnable(false);
    node->getPhysicsBody()->setCategoryBitmask(INVISIBLE_BOUNDARY_CATEGORY_BITMASK);
    node->getPhysicsBody()->setCollisionBitmask(INVISIBLE_BOUNDARY_COLLISION_BITMASK);
    node->getPhysicsBody()->setContactTestBitmask(INVISIBLE_BOUNDARY_CONTACT_BITMASK);
}

void HelloWorld::createRPGSprite(Node* node, std::unordered_map<std::string, std::string> attributes, Node* parentNode)
{
    RPGSprite* rpgSprite = RPGSprite::create(node, attributes);
    parentNode->addChild(rpgSprite);
    
}

void HelloWorld::setReferencesToGameLayers(cocos2d::Node *rootNode) {
    //iterate thru all children
    auto children = rootNode->getChildren();
    
    for (std::vector<Node*>::iterator it = children.begin() ; it != children.end(); ++it) {
        cocos2d::Node* node = *it;
        //based on custom data create layers
        cocostudio::ComExtensionData* data = (cocostudio::ComExtensionData*)node->getComponent("ComExtensionData");
        if(data != NULL) {
			std::string value = data->getCustomProperty();// std::regex_replace(data->getCustomProperty(), std::regex("^ +| +$|( ) +"), "$1");

            if(value == MAIN_LAYER)
            {
                this->mainLayer = node;
            } else if(value == BACK_GROUND_LAYER)
            {
                this->backgroundLayer = node;
            } else if(value == FORE_GROUND_LAYER)
            {
                this->foregroundLayer = node;
            }
        }
    }
    assert(this->mainLayer != NULL);
}

void HelloWorld::enablePhysicsBoundaries(Node* rootNode) {
    bool fileProcessed = PhysicsShapeCache::getInstance()->addShapesWithFile(this->getSceneName()+"/"+this->getPhysicsFile())
    ;
    
    if(!fileProcessed) {
        this->setPhysicsFile(this->getSceneName()+".plist");
        fileProcessed = PhysicsShapeCache::getInstance()->addShapesWithFile(this->getSceneName()+"/"+this->getPhysicsFile())
        ;        
    }
    std::regex pattern(".*(_[[:d:]+]+)+");
    for (Node* child : rootNode->getChildren()) {
        CCLOG("processing child %s", child->getName().c_str());
        
        PhysicsShapeCache::getInstance()->setBodyOnSprite(child->getName(), (Sprite *)child);
        if(child->getChildrenCount() > 0) {
            for (auto subChild : child->getChildren()) {
                CCLOG("processing subchild %s", subChild->getName().c_str());
                Sprite* sprite = dynamic_cast<Sprite*>(subChild);
                if(sprite) {
                    Sprite* sprite = dynamic_cast<Sprite*>(subChild);
                    if(sprite) {
                        auto matchingName = subChild->getName();
                        std::string v1 = subChild->getName();
                        
                        do {
                                std::size_t found = matchingName.find_last_of("_");
                                if(found != std::string::npos) {
                                    matchingName = matchingName.substr(0,found);
                                }
                           } while(regex_match(matchingName, pattern));
                        
                        CCLOG("matchingName %s", matchingName.c_str());
                        PhysicsShapeCache::getInstance()->setBodyOnSprite(matchingName, (Sprite *)subChild);

                        auto body = subChild->getPhysicsBody();
                        if(body) {
                            this->mainCharacterCategoryBitMask = this->mainCharacterCategoryBitMask | body->getCategoryBitmask();
                        }
                        
                    }
                    
                    if(sprite->getChildrenCount() > 0) {
                        this->enablePhysicsBoundaries(sprite);
                    }
                } else {
                    bool isSkeletonCharacter = dynamic_cast<SkeletonCharacter *>(subChild);
                    bool isExternalCharacter = dynamic_cast<ExternalSkeletonCharacter *>(subChild);
                    if(!(isSkeletonCharacter || isExternalCharacter)) {
                        Node* sprite = dynamic_cast<Node*>(subChild);
                        if(sprite->getChildrenCount() > 0) {
                            this->enablePhysicsBoundaries(sprite);
                        }
                    }
                }
            }
        } else {
            if(dynamic_cast<Sprite*>(child)) {
                Sprite* sprite = dynamic_cast<Sprite*>(child);
                if(sprite) {
                    std::string matchingName = child->getName();
                    do {
                        std::size_t found = matchingName.find_last_of("_");
                        if(found != std::string::npos) {
                            matchingName = matchingName.substr(0,found);
                        }
                    } while(regex_match(matchingName, pattern));
                    
                    CCLOG("matchingName %s", matchingName.c_str());
                    PhysicsShapeCache::getInstance()->setBodyOnSprite(matchingName, (Sprite *)child);

                    auto body = child->getPhysicsBody();
                    if(body) {
                        this->mainCharacterCategoryBitMask = this->mainCharacterCategoryBitMask | body->getCategoryBitmask();
                    }
                    
                }
            }
        }
    }
}


void HelloWorld::initializeStateMachine() {
    this->stateMachine = StateMachine::getInstance();
    assert(this->skeletonCharacter != NULL);
    this->stateMachine->addState(S_STANDING_STATE, this->skeletonCharacter);
    this->stateMachine->addState(S_RUNNING_STATE, this->skeletonCharacter);
    this->stateMachine->addState(S_JUMPING_STATE, this->skeletonCharacter);
    this->stateMachine->addState(S_WALKING_STATE, this->skeletonCharacter);
    this->stateMachine->addState(S_FALLING_STATE, this->skeletonCharacter);
    
    this->stateMachine->setInitialState(S_STANDING_STATE);
    
    this->skeletonCharacter->setStateMachine(stateMachine);
}

void HelloWorld::addMainCharacterToScene(const std::string& filename, cocos2d::Node* node) {
    
    //create Main Game Character
    this->skeletonCharacter = SkeletonCharacter::create(node, this->getIsland(), this->getSceneName(), filename, this->sqlite3Helper);
    this->mainLayer->addChild(this->skeletonCharacter);

    auto followAction = Follow::create(this->skeletonCharacter->getSkeletonNode(), Rect(0,0,this->getSceneSize().width, this->getSceneSize().height));
    this->mainLayer->runAction(followAction);
    
}

std::vector<std::string> HelloWorld::getExternalCharacterNames()
{
    return _externalCharactersNames;
}

void HelloWorld::initGestureLayer() {
    gesture_layer_ = GestureLayer::create(this, callfuncO_selector(HelloWorld::OnGestureReceived));
    this->mainLayer->addChild(gesture_layer_);
}


// on "init" you need to initialize your instance
bool HelloWorld::init(const std::string& island, const std::string& sceneName, bool fromMenu)
{
    //////////////////////////////
    // 1. super init first
    if ( !Layer::init() )
    {
        return false;
    }
    
    this->setIsland(island);
    this->_fromMenu = fromMenu;
    if(!sceneName.empty()) {
        this->setSceneName(sceneName);
    }
    
    
    
    //default sceneName should be the same as island and default search path
    if(!sceneName.empty()) {
        this->setSceneName(sceneName);
        FileUtils::getInstance()->addSearchPath("res/" + this->getSceneName());
    } else {
        FileUtils::getInstance()->addSearchPath("res/" + this->getIsland());
    }
    
    //Added for testing purpose - remove later....
    this->currentLangUtil = LangUtil::getInstance();
    auto defaultStr = this->currentLangUtil->translateString("Hello world!");
//  CCLOG("defaultStr translatedString %s", defaultStr.c_str());

    
    //this->currentLangUtil->changeLanguage(SupportedLanguages::GERMAN);
    //auto translatedString = this->currentLangUtil->translateString("Hello world!");
//    CCLOG("translatedString %s", translatedString.c_str());
    
    CCSpriteFrameCache::getInstance()->addSpriteFramesWithFile("template/template_02/template_02.plist");
    
    CCSpriteFrameCache::getInstance()->addSpriteFramesWithFile(this->getIsland()+"_bagpack" + "/" + this->getIsland() + "_bagpack.plist");
    
    
    return true;
}

void HelloWorld::querySceneToLoadInIsland() {
    this->skeletonPositionInLastVisitedScene = this->sqlite3Helper->findLastVisitedSceneInIsland(this->getIsland().c_str(), this->getSceneName().c_str());
    
    if(this->skeletonPositionInLastVisitedScene != NULL) {
        this->setSceneName(this->skeletonPositionInLastVisitedScene->getSceneName());
        FileUtils::getInstance()->addSearchPath("res/" + this->getSceneName());
    } else {
        if(!this->getSceneName().empty()) {
            FileUtils::getInstance()->addSearchPath("res/" + this->getSceneName());
        } else {
            this->setSceneName(this->getIsland());
            FileUtils::getInstance()->addSearchPath("res/" + this->getIsland());
        }
    }
    
}

void HelloWorld::loadSqlite3FileForIsland() {
    std::string sqlite3FileName = this->getIsland() + ".db3";
    String* connectionURL = String::createWithFormat("res/%s/%s", this->getIsland().c_str(), sqlite3FileName.c_str());
    this->sqlite3Helper = Sqlite3Helper::getInstance(connectionURL->getCString(), sqlite3FileName);
}

void HelloWorld::updateSpeechBubbleStatus(EventCustom *event) {
    this->setSpeechBubbleAlreadyVisible(false);
}


void HelloWorld::processMessageEvent(EventCustom *event) {
    std::vector<MessageContent*>*messages = reinterpret_cast<std::vector<MessageContent*>*>(event->getUserData());
    this->processMessage(messages);
}


void HelloWorld::registerMessageSenderAndReceiver() {
    this->messageSender = MessageSender::getInstance(this->sqlite3Helper, this->getSceneName());
    this->addChild(this->messageSender);
    
    this->messageReceiver = MessageReceiver::getInstance();
    this->addChild(this->messageReceiver);

    this->getEventDispatcher()->addCustomEventListener(RPGConfig::SPEECH_BUBBLE_DESTROYED_NOTIFICATION, CC_CALLBACK_1(HelloWorld::updateSpeechBubbleStatus, this));
    
    this->getEventDispatcher()->addCustomEventListener(RPGConfig::PROCESS_CUSTOM_MESSAGE_AND_CREATE_UI_NOTIFICATION, CC_CALLBACK_1(HelloWorld::processMessageEvent, this));
    
    this->getEventDispatcher()->addCustomEventListener(RPGConfig::ON_MENU_EXIT_NOTIFICATION, CC_CALLBACK_1(HelloWorld::transitToMenu, this));

    
    this->getEventDispatcher()->addCustomEventListener(RPGConfig::ON_WORD_INFO_NOTIFICATION, CC_CALLBACK_1(HelloWorld::buildText, this));

    this->getEventDispatcher()->addCustomEventListener(RPGConfig::WORD_BUBBLE_SHOW_NOTIFICATION, CC_CALLBACK_1(HelloWorld::showWordBubblesNotificationReceived, this));

    this->getEventDispatcher()->addCustomEventListener(RPGConfig::WORD_BUBBLE_HIDE_NOTIFICATION, CC_CALLBACK_1(HelloWorld::hideWordBubbles, this));
    
}

void HelloWorld::showWordBubblesNotificationReceived(EventCustom * event) {
        this->unschedule(schedule_selector(HelloWorld::showWordBubbles));
        this->scheduleOnce(schedule_selector(HelloWorld::showWordBubbles), TIME_TO_SHOW_WORD_BUBBLE);
}

void HelloWorld::showWordBubbles(float dt) {
    if(this->skeletonCharacter->isStanding && _bagPackNode == NULL && !this->getSpeechBubbleAlreadyVisible()) {
        std::map<std::string,std::string> mapping = _wordMappings;
        
        std::map<std::string, std::string>::iterator it;
        for(it = mapping.begin(); it != mapping.end(); it++) {
            std::string word = it->second + "_wordBubble";
            
            Node* node = this->mainLayer->getChildByName(word.c_str());
            if(node != NULL) {
                node->setVisible(true);
            }
        }
    }
}

void HelloWorld::hideWordBubbles(EventCustom * event) {
    std::map<std::string,std::string> mapping = _wordMappings;
    
    std::map<std::string, std::string>::iterator it;
    for(it = mapping.begin(); it != mapping.end(); it++) {
        std::string word = it->second + "_wordBubble";
        
        Node* node = this->mainLayer->getChildByName(word.c_str());
        if(node != NULL) {
            node->setVisible(false);
        }
    }

}



void HelloWorld::transitionToDuelScene(wchar_t alphabet) {
    std::string firstParam = LangUtil::getInstance()->convertUTF16CharToString(CharGenerator::getInstance()->generateAChar());
    std::string secondParam = LangUtil::getInstance()->convertUTF16CharToString(alphabet);
    StartMenu::startScene(DUEL_SCENE_NAME, firstParam, secondParam);
}

void HelloWorld::processTextMessage(std::unordered_map<int, std::string> textMap, std::string ownerOfMessage)
{
    
    if(textMap.size() == 0)
    {
        return;
    }
    //find node based on ownerOfMessage
    auto selectedNode = this->mainLayer->getChildByName(ownerOfMessage);
    assert(selectedNode != NULL);
    
    //do dynamic cast
    bool isExternalCharacter = dynamic_cast<ExternalSkeletonCharacter *>(selectedNode);
    bool isSkeletonCharacter = dynamic_cast<SkeletonCharacter *>(selectedNode);
    bool isRPGSprite = dynamic_cast<RPGSprite *>(selectedNode);
    if(!this->getSpeechBubbleAlreadyVisible()) {
        if(isExternalCharacter) {
            ExternalSkeletonCharacter* character = dynamic_cast<ExternalSkeletonCharacter *>(selectedNode);
            Point touch_point = character->convertToWorldSpace(character->getExternalSkeletonNode()->getPosition());
            _speechBubbleView = SpeechBubbleView::createForExternalCharacter(character, textMap, Point(touch_point.x, touch_point.y + character->getExternalSkeletonNode()->getBoundingBox().size.height));
            
            this->setSpeechBubbleAlreadyVisible(true);
            
            character->getExternalSkeletonActionTimeLine()->play("talk", true);
            
            this->addChild(_speechBubbleView, 1);
            
        } else if(isSkeletonCharacter) {
            Point touch_point = this->skeletonCharacter->convertToWorldSpace(this->skeletonCharacter->getSkeletonNode()->getPosition());
            
            _speechBubbleView = SpeechBubbleView::createForCharacter(this->skeletonCharacter, textMap, Point(touch_point.x, touch_point.y + this->skeletonCharacter->getSkeletonNode()->getBoundingBox().size.height));
            this->setSpeechBubbleAlreadyVisible(true);
            this->skeletonCharacter->getSkeletonActionTimeLine()->gotoFrameAndPause(0);
            this->skeletonCharacter->getSkeletonActionTimeLine()->play("talk", true);
            this->addChild(_speechBubbleView, 1);
            
        } else if(isRPGSprite) {
            RPGSprite* sprite = dynamic_cast<RPGSprite *>(selectedNode);
            sprite->setEventProcessed(false);
            Point touch_point = sprite->convertToWorldSpace(sprite->getSprite()->getPosition());
            _speechBubbleView = SpeechBubbleView::create(textMap, Point(touch_point.x, touch_point.y + sprite->getSprite()->getBoundingBox().size.height));
            this->setSpeechBubbleAlreadyVisible(true);
            
            this->addChild(_speechBubbleView, 1);
        }
    }

}

void HelloWorld::processUseInBackPackAndPutInBackPackMessages(std::vector<MessageContent*>showMessages) {
    Node* preNode = NULL;
    Node* ownerNode = NULL;
    for (std::vector<MessageContent* >::iterator it = showMessages.begin() ; it != showMessages.end(); ++it)
    {
        int deleteResult = 0;
        int insertResult = 0;
        MessageContent* content = (MessageContent*) *it;
        CCLOG("content owner %s", content->getOwner().c_str());
        CCLOG("content item in bag %s", content->getPreOutComeAction().c_str());
        
        if(!content->getPreOutComeAction().empty()) {
            preNode = this->mainLayer->getChildByName(content->getPreOutComeAction());
            std::vector<std::string> elems;
            std::stringstream ss;
            ss.str(content->getPreOutComeAction());
            std::string item;
            while (getline(ss, item, ',')) {
                elems.push_back(item);
            }
            
            for (std::vector<std::string>::iterator it = elems.begin() ; it != elems.end(); ++it)
            {
                std::string item = *(it);
                deleteResult = this->sqlite3Helper->deleteItemFromMyBag(this->getIsland().c_str(), item.c_str());
            }
        } else if(!content->getPostOutComeAction().empty()) {
            ownerNode = this->mainLayer->getChildByName(content->getOwner());
            std::vector<std::string> elems;
            std::stringstream ss;
            ss.str(content->getPostOutComeAction());
            std::string item;
            while (getline(ss, item, ',')) {
                elems.push_back(item);
            }
            
            for (std::vector<std::string>::iterator it = elems.begin() ; it != elems.end(); ++it)
            {
                std::string item = *(it);
                if(item.compare(TASK_FINISHED) == 0) {
                    finishedTask();
                } else {
                    insertResult = this->sqlite3Helper->insertItemToMyBag(this->getIsland().c_str(), item.c_str());
                }

            }
        }
        
        //run animations
        if(preNode != NULL && ownerNode != NULL) {
            RPGSprite* preRPGSpriteNode = dynamic_cast<RPGSprite *>(preNode);
            RPGSprite* postOwnerSprite = dynamic_cast<RPGSprite *>(ownerNode);
            if(preRPGSpriteNode != NULL && postOwnerSprite != NULL)
            {
                useItemFromBagAndPutItemInBagAnimation(preRPGSpriteNode, postOwnerSprite, insertResult, deleteResult);
            }            
        }
        
    }
}

void HelloWorld::processUseInBackPackMessages(std::vector<MessageContent*>showMessages, std::unordered_map<int, std::string> textMapFollowedByAnimation) {
    for (std::vector<MessageContent* >::iterator it = showMessages.begin() ; it != showMessages.end(); ++it)
    {
        MessageContent* content = (MessageContent*) *it;
        CCLOG("content owner %s", content->getOwner().c_str());
        CCLOG("content item in bag %s", content->getPreOutComeAction().c_str());
        CCLOG("content needs dialog %d", content->getPreConditionEventId());
        Node* ownerNode = NULL;
        std::string imageFile = "";
        if(!content->getPreOutComeAction().empty()) {
//            auto cache = SpriteFrameCache::getInstance();
//            cache->addSpriteFramesWithFile("res/HD/camp_bagpack/camp_bagpack.plist");
//            auto sprite = Sprite::createWithSpriteFrameName("camp_bagpack/latern.png");
            
//            if(content->getPreOutComeAction().compare("lantern") == 0) {
//                imageFile = this->getIsland()+"_bagpack" + "/latern.png";
//            }
            imageFile = this->getIsland()+"_bagpack" + "/" + content->getPreOutComeAction() + ".png";
        }
        
        
        
        
        if(!imageFile.empty()) {
            int result = 0;
            CCLOG("Image Name %s", imageFile.c_str());
            if(content != NULL && !imageFile.empty()) {
                
                std::vector<std::string> elems;
                std::stringstream ss;
                ss.str(content->getPreOutComeAction());
                std::string item;
                while (getline(ss, item, ',')) {
                    elems.push_back(item);
                }
                
                for (std::vector<std::string>::iterator it = elems.begin() ; it != elems.end(); ++it)
                {
                    std::string item = *(it);
                    result = this->sqlite3Helper->deleteItemFromMyBag(this->getIsland().c_str(), item.c_str());
                }
                
                if(result == 1 && content->getShouldDisplayInBag())
                {
                    if(!content->getHint().empty()) {
                        CCLOG("content->hint %s", content->getHint().c_str());
                        _hintText = content->getHint();
                        if (!_hintText.empty()) {
                            localStorageSetItem(HINT_TEXT, _hintText);
                        }
                        
                    }
                    
                    createAndUseItemFromBag(imageFile, content, textMapFollowedByAnimation);
                } else if(content->getHasTextAfterAnimation() == 1) {
                    CCLOG("calling text after animation");
                    this->processTextMessage(textMapFollowedByAnimation, content->getOwner());
                }
                
                
                
                
                if(!content->getPostOutComeAction().empty()) {
                    CCLOG("content->getPostOutComeAction() %s", content->getPostOutComeAction().c_str());
                    //play animation
                    
                    std::vector<std::string> elems;
                    std::stringstream ss;
                    ss.str(content->getPostOutComeAction());
                    std::string item;
                    while (getline(ss, item, ',')) {
                        elems.push_back(item);
                    }
                    
                    for (std::vector<std::string>::iterator it = elems.begin() ; it != elems.end(); ++it)
                    {
                        std::string item = *(it);
                        if(item.compare(TASK_FINISHED) == 0) {
                            finishedTask();
                        } else {
                            this->sqlite3Helper->insertItemToMyBag(this->getIsland().c_str(), item.c_str());
                        }
                    }
                }
            }
        }
    }
}

//void HelloWorld::processUseInBackPackMessages(std::vector<MessageContent*>showMessages, std::unordered_map<int, std::string> textMapFollowedByAnimation) {
//    for (std::vector<MessageContent* >::iterator it = showMessages.begin() ; it != showMessages.end(); ++it)
//    {
//        MessageContent* content = (MessageContent*) *it;
//        CCLOG("content owner %s", content->getOwner().c_str());
//        CCLOG("content item in bag %s", content->getPreOutComeAction().c_str());
//        CCLOG("content needs dialog %d", content->getPreConditionEventId());
//        Node* ownerNode = NULL;
//        if(!content->getPreOutComeAction().empty()) {
//            //check if preoutcome exists in MY_BAG
//            //this->getIsland()+"_bagpack" + "/"
//            ownerNode = this->mainLayer->getChildByName(content->getPreOutComeAction());
//        }
//        
//        
//        if(ownerNode != NULL) {
//            int result = 0;
//            CCLOG("ownerNode getName %s", ownerNode->getName().c_str());
//            RPGSprite* ownerSprite = NULL;
//            if(content != NULL && ownerNode != NULL) {
//                ownerSprite = dynamic_cast<RPGSprite *>(ownerNode);
//
//                std::vector<std::string> elems;
//                std::stringstream ss;
//                ss.str(content->getPreOutComeAction());
//                std::string item;
//                while (getline(ss, item, ',')) {
//                    elems.push_back(item);
//                }
//                
//                for (std::vector<std::string>::iterator it = elems.begin() ; it != elems.end(); ++it)
//                {
//                    std::string item = *(it);
//                    result = this->sqlite3Helper->deleteItemFromMyBag(this->getIsland().c_str(), item.c_str());
//                }
//                
//                if(result == 1 && content->getShouldDisplayInBag())
//                {
//                    useItemFromBag(ownerSprite, content, textMapFollowedByAnimation);
//                } else if(content->getHasTextAfterAnimation() == 1) {
//                    CCLOG("calling text after animation");
//                    this->processTextMessage(textMapFollowedByAnimation, content->getOwner());
//                }
//                
//                if(!content->getHint().empty()) {
//                    CCLOG("content->hint %s", content->getHint().c_str());
//                    _hintText = content->getHint();
//                }
//                
//
//                
//                if(!content->getPostOutComeAction().empty()) {
//                    CCLOG("content->getPostOutComeAction() %s", content->getPostOutComeAction().c_str());
//                    //play animation
//                                        
//                    std::vector<std::string> elems;
//                    std::stringstream ss;
//                    ss.str(content->getPostOutComeAction());
//                    std::string item;
//                    while (getline(ss, item, ',')) {
//                        elems.push_back(item);
//                    }
//                    
//                    for (std::vector<std::string>::iterator it = elems.begin() ; it != elems.end(); ++it)
//                    {
//                        std::string item = *(it);
//                        if(item.compare(TASK_FINISHED) == 0) {
//                            finishedTask();
//                        } else {
//                            this->sqlite3Helper->insertItemToMyBag(this->getIsland().c_str(), item.c_str());
//                        }
//                    }
//                }
//                
//                ownerSprite->setEventProcessed(false);
//            }
//        }
//    }
//}

void HelloWorld::finishedTask() {
    //this->getEventDispatcher()->dispatchCustomEvent(RPGConfig::ON_MENU_EXIT_NOTIFICATION);
}

void HelloWorld::processPutInBackPackMessages(std::vector<MessageContent*>showMessages, std::unordered_map<int, std::string> textMapFollowedByAnimation) {
    for (std::vector<MessageContent* >::iterator it = showMessages.begin() ; it != showMessages.end(); ++it)
    {
        MessageContent* content = (MessageContent*) *it;
        CCLOG("content owner %s", content->getOwner().c_str());
        Node* ownerNode = this->mainLayer->getChildByName(content->getOwner());
        RPGSprite* ownerSprite = NULL;
        Sprite* sprite = NULL;
        if(ownerNode != NULL) {
            ownerSprite = dynamic_cast<RPGSprite *>(ownerNode);            
        }
        
        if(content != NULL && ownerSprite != NULL) {
            if(!content->getPostOutComeAction().empty()) {
                
                std::vector<std::string> elems;
                std::stringstream ss;
                ss.str(content->getPostOutComeAction());
                std::string item;
                while (getline(ss, item, ',')) {
                    elems.push_back(item);
                }
                
                int result = 0;
                for (std::vector<std::string>::iterator it = elems.begin() ; it != elems.end(); ++it)
                {
                    std::string item = *(it);
                    if(item.compare(TASK_FINISHED) == 0) {
                        finishedTask();
                    } else {
                        result = this->sqlite3Helper->insertItemToMyBag(this->getIsland().c_str(), item.c_str());
                    }
                    
                }
                
                CCLOG("content->getPostOutComeAction() %s", content->getPostOutComeAction().c_str());

                
                
                
                //play animation
                
                if(content->getShouldDisplayInBag() && result == 1) {
                    if(!content->getHint().empty()) {
                        CCLOG("content->hint %s", content->getHint().c_str());
                        _hintText = content->getHint();
                        
                        if (!_hintText.empty()) {
                            localStorageSetItem(HINT_TEXT, _hintText);
                        }
                        
                    }
                    
                    copySpriteForAnimation(ownerSprite, textMapFollowedByAnimation, content->getOwner());
                } else if(content->getHasTextAfterAnimation() == 1) {
                    this->processTextMessage(textMapFollowedByAnimation, content->getOwner());
//                    if(content->getShouldDisplayInBag()) {
//                        showBagpackOpenAnimation(textMapFollowedByAnimation, content->getOwner());
//                    } else {
//                        this->processTextMessage(textMapFollowedByAnimation, content->getOwner());
//                    }
                }
                ownerSprite->setEventProcessed(false);
            }
        }
    }
}

void HelloWorld::processShowMessage(std::vector<MessageContent*>showMessages) {
    
    for (std::vector<MessageContent* >::iterator it = showMessages.begin() ; it != showMessages.end(); ++it)
    {
        MessageContent* content = (MessageContent*) *it;
        if(!content->getHint().empty()) {
            CCLOG("content->hint %s", content->getHint().c_str());
            _hintText = content->getHint();
            if (!_hintText.empty()) {
                localStorageSetItem(HINT_TEXT, _hintText);
            }
            
        }

        CCLOG("content owner %s", content->getOwner().c_str());
        Node* ownerNode = this->mainLayer->getChildByName(content->getOwner());
        RPGSprite* ownerSprite = NULL;
        if(ownerNode != NULL) {
            ownerSprite = dynamic_cast<RPGSprite *>(ownerNode);
            if(ownerSprite != NULL) {
                ownerSprite->getSprite()->setVisible(false);
                ownerSprite->setEventProcessed(false);
            }
        }
        
        Node* showSpriteNode = this->mainLayer->getChildByName(content->getDialog());
        RPGSprite* showRPGSpriteNode = dynamic_cast<RPGSprite *>(showSpriteNode);
        if(showRPGSpriteNode != NULL) {
            showRPGSpriteNode->setVisible(true);
            if(showRPGSpriteNode->getSprite() != NULL) {
                showRPGSpriteNode->getSprite()->setVisible(true);
            }
        }
        
        //execute any other condition based on this pre-condition
        this->messageSender->createMessagesForPreconditionId(content->getEventId());
        
        delete content;
    }
}


void HelloWorld::moveItemIntoBag(Sprite* orgSprite) {
    Size visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();
    if(orgSprite != NULL) {
        auto copySpriteMoveTo = MoveTo::create(1, Vec2(origin.x + visibleSize.width / 2, origin.y + visibleSize.height / 2));
        auto fade = FadeOut::create(1.0);
        if(orgSprite != NULL) {
            auto copySpriteMoveTo = MoveTo::create(1, Vec2(origin.x + visibleSize.width / 2, origin.y + visibleSize.height / 2));
            auto fade = FadeOut::create(1.0);
            
            runAction(Sequence::create(TargetedAction::create(orgSprite, copySpriteMoveTo), DelayTime::create(0.5), TargetedAction::create(orgSprite, fade), NULL));
            
        }
    }
}

void HelloWorld::createAndUseItemFromBag(std::string imageName, MessageContent* content, std::unordered_map<int, std::string> textMapFollowedByAnimation) {
    CCLOG("useItemFromBag %s", imageName.c_str());
    if(!imageName.empty()) {
        
        auto newspriteFrame = SpriteFrameCache::getInstance()->getSpriteFrameByName(imageName);
        Sprite* copySprite = Sprite::createWithSpriteFrame(newspriteFrame);

        if(copySprite != NULL) {
            this->mainLayer->addChild(copySprite, 1000);
            
            Point posInParent = _bagPackMenu->getParent()->convertToWorldSpace(_bagPackMenu->getPosition());
            Point bagPackMenuPos = this->mainLayer->convertToNodeSpace(posInParent);
            
            copySprite->setPosition(bagPackMenuPos);
            auto fade = FadeOut::create(2.0);
            
            
            if(content != NULL) {
                std::string ownerOfMessage = content->getOwner();
                if(!ownerOfMessage.empty()) {
                    auto selectedNode = this->mainLayer->getChildByName(ownerOfMessage);
                    if(selectedNode != NULL)
                    {
                        bool isExternalCharacter = dynamic_cast<ExternalSkeletonCharacter *>(selectedNode);
                        
                        if(isExternalCharacter) {
                            ExternalSkeletonCharacter* character = dynamic_cast<ExternalSkeletonCharacter *>(selectedNode);
                            Point touch_point = character->convertToWorldSpace(character->getExternalSkeletonNode()->getPosition());
                            
                            auto copySpriteMoveToOwner = MoveTo::create(1, Vec2(character->getExternalSkeletonNode()->getPosition().x, character->getExternalSkeletonNode()->getPosition().y + 200));
                            
                            auto callBack1 = CallFunc::create(CC_CALLBACK_0(HelloWorld::useItemFromBagFinished, this, content, textMapFollowedByAnimation));
                            
                            runAction(Sequence::create(TargetedAction::create(copySprite, copySpriteMoveToOwner), DelayTime::create(0.2), TargetedAction::create(copySprite, fade), callBack1, NULL));
                        }
                    }
                }
            }
        }
    }
}

void HelloWorld::useItemFromBag(RPGSprite* item, MessageContent* content, std::unordered_map<int, std::string> textMapFollowedByAnimation) {
    CCLOG("useItemFromBag %s", item->getName().c_str());
    Sprite* orgSprite = dynamic_cast<Sprite *>(item->getSprite());
    if(orgSprite != NULL) {

        Sprite* copySprite = Sprite::createWithSpriteFrame(orgSprite->getSpriteFrame());
        if(orgSprite != NULL) {
            item->getParent()->addChild(copySprite, 1000);
            
            Point posInParent = _bagPackMenu->getParent()->convertToWorldSpace(_bagPackMenu->getPosition());
            Point bagPackMenuPos = this->mainLayer->convertToNodeSpace(posInParent);
            
            copySprite->setPosition(bagPackMenuPos);
            auto fade = FadeOut::create(2.0);
            
            
            if(content != NULL) {
                std::string ownerOfMessage = content->getOwner();
                if(!ownerOfMessage.empty()) {
                        auto selectedNode = this->mainLayer->getChildByName(ownerOfMessage);
                        if(selectedNode != NULL)
                        {
                            bool isExternalCharacter = dynamic_cast<ExternalSkeletonCharacter *>(selectedNode);
                            
                            if(isExternalCharacter) {
                                ExternalSkeletonCharacter* character = dynamic_cast<ExternalSkeletonCharacter *>(selectedNode);
                                Point touch_point = character->convertToWorldSpace(character->getExternalSkeletonNode()->getPosition());
                                
                                auto copySpriteMoveToOwner = MoveTo::create(1, Vec2(character->getExternalSkeletonNode()->getPosition().x, character->getExternalSkeletonNode()->getPosition().y + 200));
                                
                                auto callBack1 = CallFunc::create(CC_CALLBACK_0(HelloWorld::useItemFromBagFinished, this, content, textMapFollowedByAnimation));

                                runAction(Sequence::create(TargetedAction::create(copySprite, copySpriteMoveToOwner), DelayTime::create(0.2), TargetedAction::create(copySprite, fade), callBack1, NULL));
                            }
                        }
                }
            }
        }
    }
}


void HelloWorld::useItemFromBagAndPutItemInBag(RPGSprite* item, RPGSprite* putItem, int insertResult, int deleteResult) {
    
    if(insertResult == 1 && deleteResult == 1)
    {
        CCLOG("remove item from bag %s", item->getName().c_str());
        Size visibleSize = Director::getInstance()->getVisibleSize();
        Vec2 origin = Director::getInstance()->getVisibleOrigin();
        Sprite* orgSprite = dynamic_cast<Sprite *>(item->getSprite());
        
        CCLOG("move item into bag %s", putItem->getName().c_str());
        Sprite* putSprite = dynamic_cast<Sprite *>(putItem->getSprite());
        
        if(orgSprite != NULL && putSprite != NULL) {
            Sprite* copyPutSprite = Sprite::createWithSpriteFrame(putSprite->getSpriteFrame());
            Sprite* copySprite = Sprite::createWithSpriteFrame(orgSprite->getSpriteFrame());
            if(copySprite != NULL && copyPutSprite != NULL) {
                addChild(copySprite);
                addChild(copyPutSprite);
                
                copySprite->setPosition(Vec2(origin.x + visibleSize.width / 2, origin.y + visibleSize.height / 2));
                auto fade = FadeOut::create(2.0);
                
                
                copyPutSprite->setPosition(putItem->getPosition());
                auto copySpriteMoveTo = MoveTo::create(1, Vec2(origin.x + visibleSize.width / 2, origin.y + visibleSize.height / 2));
                
                runAction(Sequence::create(DelayTime::create(1.0), TargetedAction::create(copySprite, fade), DelayTime::create(0.5),TargetedAction::create(copyPutSprite, copySpriteMoveTo), DelayTime::create(0.5), TargetedAction::create(copyPutSprite, fade), NULL));
                
            }
        }
    }
}

void HelloWorld::useItemFromBagAndPutItemInBagAnimation(RPGSprite* useItem, RPGSprite* putItem, int insertResult, int deleteResult) {

    auto node = CSLoader::createNode("backpack/backpack.csb");
    auto pos = Vec2(2300, 1600);
    node->setPosition(pos);
    addChild(node);
    node->setScale(0.2);
    Size visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();
    
    auto jumpTo = MoveTo::create(1, Vec2(origin.x + visibleSize.width / 2, origin.y + visibleSize.height / 2));
    
    auto scaleTo = ScaleTo::create(1, 1);
    cocostudio::timeline::ActionTimeline* anim = CSLoader::createTimeline("backpack/backpack.csb");
    node->runAction(anim);
    auto spawn = Spawn::create(scaleTo, jumpTo, NULL);
    auto callbackOpen = CallFunc::create(CC_CALLBACK_0(cocostudio::timeline::ActionTimeline::play, anim, "bag_open", false));
    auto callbackClose = CallFunc::create(CC_CALLBACK_0(cocostudio::timeline::ActionTimeline::play, anim, "bag_close", false));
    
    
    anim->setAnimationEndCallFunc("bag_open", CC_CALLBACK_0(HelloWorld::useItemFromBagAndPutItemInBag, this, useItem, putItem, insertResult, deleteResult));

    auto fade = FadeOut::create(1.0);
    auto scaleDown = ScaleTo::create(1, 0.2);
    auto jumpBack = MoveTo::create(1, Vec2(2300, 1600));
    auto spawnBack = Spawn::create(scaleDown, jumpBack, NULL);
    
    auto sequence = Sequence::create(TargetedAction::create(node, spawn), callbackOpen, DelayTime::create(7.0), callbackClose, DelayTime::create(1.0), TargetedAction::create(node, spawnBack), DelayTime::create(0.5), TargetedAction::create(node, fade), NULL);
    runAction(sequence);
    
}

void HelloWorld::useItemFromBagAnimation(MessageContent* content, RPGSprite* item, std::unordered_map<int, std::string> textMapFollowedByAnimation) {
//    auto node = CSLoader::createNode("backpack/backpack.csb");
//    auto pos = Vec2(2300, 1600);
//    node->setPosition(pos);
//    addChild(node);
//    node->setScale(0.2);
//    Size visibleSize = Director::getInstance()->getVisibleSize();
//    Vec2 origin = Director::getInstance()->getVisibleOrigin();
//    
//    auto jumpTo = MoveTo::create(1, Vec2(origin.x + visibleSize.width / 2, origin.y + visibleSize.height / 2));
//    
//    auto scaleTo = ScaleTo::create(1, 1);
//    cocostudio::timeline::ActionTimeline* anim = CSLoader::createTimeline("backpack/backpack.csb");
//    node->runAction(anim);
//    auto spawn = Spawn::create(scaleTo, jumpTo, NULL);
//    auto callbackOpen = CallFunc::create(CC_CALLBACK_0(cocostudio::timeline::ActionTimeline::play, anim, "bag_open", false));
//    auto callbackClose = CallFunc::create(CC_CALLBACK_0(cocostudio::timeline::ActionTimeline::play, anim, "bag_close", false));
//    anim->setAnimationEndCallFunc("bag_open", CC_CALLBACK_0(HelloWorld::useItemFromBag, this, item, content));
//    anim->setAnimationEndCallFunc("bag_close", CC_CALLBACK_0(HelloWorld::useItemFromBagFinished, this, content, textMapFollowedByAnimation));
//    
//    auto fade = FadeOut::create(1.0);
//    auto scaleDown = ScaleTo::create(1, 0.2);
//    auto jumpBack = MoveTo::create(1, Vec2(2300, 1600));
//    auto spawnBack = Spawn::create(scaleDown, jumpBack, NULL);
//    
//    
//    auto sequence = Sequence::create(TargetedAction::create(node, spawn), callbackOpen, DelayTime::create(3.0), callbackClose, DelayTime::create(1.0), TargetedAction::create(node, spawnBack), DelayTime::create(0.5), TargetedAction::create(node, fade), NULL);
//    runAction(sequence);
    
}

void HelloWorld::useItemFromBagFinished(MessageContent* content, std::unordered_map<int, std::string> textMapFollowedByAnimation) {
    if(content->getHasTextAfterAnimation() == 1) {
        this->processTextMessage(textMapFollowedByAnimation, content->getOwner());
    }
    
}

void HelloWorld::hideObject(Sprite* copySprite) {
    copySprite->setVisible(false);
}

void HelloWorld::copySpriteForAnimation(RPGSprite* item, std::unordered_map<int, std::string> textMapFollowedByAnimation, std::string owner) {
    //copy sprite
    Size visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();
 
    Sprite* orgSprite = dynamic_cast<Sprite *>(item->getSprite());
    Sprite* copySprite = NULL;
    if(orgSprite != NULL) {
        copySprite = Sprite::createWithSpriteFrame(orgSprite->getSpriteFrame());
        if(orgSprite != NULL) {
            item->getParent()->addChild(copySprite, 1000);
            copySprite->setPosition(orgSprite->getPosition());
            Point posInParent = _bagPackMenu->getParent()->convertToWorldSpace(_bagPackMenu->getPosition());
            Point bagPackMenuPos = this->mainLayer->convertToNodeSpace(posInParent);
            auto copySpriteMoveTo = MoveTo::create(1, bagPackMenuPos);
            
            auto callBack = CallFunc::create(CC_CALLBACK_0(HelloWorld::showBagpackOpenAnimation, this, textMapFollowedByAnimation, owner));
            
            auto hideObject = CallFunc::create(CC_CALLBACK_0(HelloWorld::hideObject, this, copySprite));
            
            runAction(Sequence::create(TargetedAction::create(copySprite, copySpriteMoveTo), DelayTime::create(0.5), hideObject, callBack, NULL));
            
        }
    }
    
    
}

void HelloWorld::moveitemIntoBagAnimation(Sprite* copySprite) {
//    auto node = CSLoader::createNode("backpack/backpack.csb");
//    auto pos = Vec2(2300, 1600);
//    node->setPosition(pos);
//    addChild(node);
//    node->setScale(0.2);
//    Size visibleSize = Director::getInstance()->getVisibleSize();
//    Vec2 origin = Director::getInstance()->getVisibleOrigin();
//    
//    
//    auto jumpTo = MoveTo::create(1, Vec2(origin.x + visibleSize.width / 2, origin.y + visibleSize.height / 2));
//    
//    auto scaleTo = ScaleTo::create(1, 1);
//    cocostudio::timeline::ActionTimeline* anim = CSLoader::createTimeline("backpack/backpack.csb");
//    node->runAction(anim);
//    auto spawn = Spawn::create(scaleTo, jumpTo, NULL);
//    auto callbackOpen = CallFunc::create(CC_CALLBACK_0(cocostudio::timeline::ActionTimeline::play, anim, "bag_open", false));
//    auto callbackClose = CallFunc::create(CC_CALLBACK_0(cocostudio::timeline::ActionTimeline::play, anim, "bag_close", false));
//    anim->setAnimationEndCallFunc("bag_open", CC_CALLBACK_0(HelloWorld::moveItemIntoBag, this, copySprite));
//    
//    auto fade = FadeOut::create(1.0);
//    auto scaleDown = ScaleTo::create(1, 0.2);
//    auto jumpBack = MoveTo::create(1, Vec2(2300, 1600));
//    auto spawnBack = Spawn::create(scaleDown, jumpBack, NULL);
//    
//    auto sequence = Sequence::create(TargetedAction::create(node, spawn), callbackOpen, DelayTime::create(3.0), callbackClose, DelayTime::create(1.0), TargetedAction::create(node, spawnBack), DelayTime::create(0.5), TargetedAction::create(node, fade), NULL);
//    runAction(sequence);
    
}

void HelloWorld::processChangeSceneMessages(std::vector<MessageContent*>changeSceneMessages) {
    this->gesture_layer_->disableAllTouch();
    
    for (std::vector<MessageContent* >::iterator it = changeSceneMessages.begin() ; changeSceneMessages.size() == 1 && it != changeSceneMessages.end(); ++it)
    {
        MessageContent* content = (MessageContent*) *it;
        Node* animationSpriteNode = this->mainLayer->getChildByName(content->getOwner());
        
        //find out animation name
        std::size_t found = -1;
        if(!content->getDialog().empty()) {
            found = content->getDialog().find_last_of("#");
            std::string animFile = content->getDialog();
            std::string animName = "";
            if(found != std::string::npos) {
                animFile = content->getDialog().substr(0,found);
                animName = content->getDialog().substr(found+1, content->getDialog().length());
            }
            
            if(animationSpriteNode != NULL)
            {
                RPGSprite* animationNode = dynamic_cast<RPGSprite *>(animationSpriteNode);
                if(animationNode != NULL) {
                    cocostudio::timeline::ActionTimeline* timeline = NULL;
                    timeline =  CSLoader::createTimeline(animFile);
                    animationNode->setActionTimeLine(timeline);
                    animationNode->getSprite()->runAction(timeline);
                    
                    if(timeline != NULL && animationSpriteNode != NULL && animationNode != NULL )
                    {
                        timeline->setLastFrameCallFunc([=]() {
                            if(content != NULL && (content->getCondition().empty() || (!content->getCondition().empty() && content->getConditionSatisfied() == 1)))
                            {
                                std::string nextScene = animationNode->getNextScene();
                                
                                if(!nextScene.empty())
                                {
                                    CCLOG("calling changeScene for nextScene %s", nextScene.c_str());
                                    this->changeScene(nextScene, false);
                                }
                            }
                            timeline->clearLastFrameCallFunc();
                        });
                        
                        Node* animationSpriteNode = this->mainLayer->getChildByName(content->getOwner());
                        RPGSprite* animationNode = dynamic_cast<RPGSprite *>(animationSpriteNode);
                        if(animationNode != NULL) {
                            animationNode->setVisible(true);
                            if(animationNode->getSprite() != NULL) {
                                
                                bool playInLoop = content->getPlayAnimationInLoop() == 1 ? true : false;
                                if(!animName.empty()) {
                                    timeline->play(animName, playInLoop);
                                } else {
                                    timeline->gotoFrameAndPlay(0, playInLoop);
                                }
                            }
                        }
                    }
                }
            }
        } else {
            if(animationSpriteNode != NULL)
            {
                RPGSprite* animationNode = dynamic_cast<RPGSprite *>(animationSpriteNode);
                if(animationNode != NULL) {
                    if(content != NULL && (content->getCondition().empty() || (!content->getCondition().empty() && content->getConditionSatisfied() == 1)))
                    {
                        std::string nextScene = animationNode->getNextScene();
                        
                        if(!nextScene.empty())
                        {
                            CCLOG("calling changeScene for nextScene %s", nextScene.c_str());
                            this->changeScene(nextScene, false);
                        }
                    }
                }
            }
            
        }
    }
}

void HelloWorld::addGreyLayer() {
    if(!_greyLayer) {
        Size visibleSize = Director::getInstance()->getVisibleSize();
        _greyLayer = LayerColor::create(Color4B(255.0, 255.0, 255.0, 0.0));
        _greyLayer->setContentSize(visibleSize);
        addChild(_greyLayer, 3);
        
        auto _listener = EventListenerTouchOneByOne::create();
        _listener->setSwallowTouches(true);
        _listener->onTouchBegan = CC_CALLBACK_2(HelloWorld::greyLayerTouched, this);
        _eventDispatcher->addEventListenerWithSceneGraphPriority(_listener, _greyLayer);
        
    }
}

bool HelloWorld::greyLayerTouched(Touch *touch, Event *event)
{
    CCLOG("Grey layer touched");
    return true;
}



void HelloWorld::transitToMenu(EventCustom * event) {
    std::string &menuName = *(static_cast<std::string*>(event->getUserData()));
    if(menuName == GAME_MAP_MENU) {
        Director::getInstance()->replaceScene(TransitionFade::create(2.0, ScrollableGameMapScene::createScene(), Color3B::BLACK));
    } else if(menuName == MAP_MENU) {
        Director::getInstance()->replaceScene(TransitionFade::create(2.0, MapScene::createScene(), Color3B::BLACK));
    } else {
        menuContext->addPoints(3);
        menuContext->showScore();
    }
}

void HelloWorld::cleanUpResources() {
    
    Vec2 origin = Director::getInstance()->getVisibleOrigin();
    if(this->skeletonCharacter != NULL) {
        float xPos = this->skeletonCharacter->getSkeletonNode()->getPosition().x < 0 ? Director::getInstance()->getWinSize().width/2  : this->skeletonCharacter->getSkeletonNode()->getPosition().x > this->getSceneSize().width ? Director::getInstance()->getWinSize().width/2 : this->skeletonCharacter->getSkeletonNode()->getPosition().x;
        
        float yPos = this->skeletonCharacter->getSkeletonNode()->getPosition().y < 0 ? Y_OFFSET_IF_HERO_DISAPPER : this->skeletonCharacter->getSkeletonNode()->getPosition().y;
        
        if(this->skeletonCharacter->getSkeletonNode()->getPosition().y < 0) {
            xPos = xPos - X_OFFSET_IF_HERO_DISAPPER;
        }
        
        //record position in main Island in UserDefault
        if(this->island == this->sceneName) {
            UserDefault::getInstance()->setFloatForKey(SKELETON_POSITION_IN_PARENT_ISLAND_X, xPos);
            UserDefault::getInstance()->setFloatForKey(SKELETON_POSITION_IN_PARENT_ISLAND_Y, yPos);
        }
        
        this->sqlite3Helper->recordMainCharacterPositionInScene(this->island.c_str(), this->sceneName.c_str(), xPos, yPos);
    }
    
    EVENT_DISPATCHER->removeCustomEventListeners(RPGConfig::MAIN_CHARACTER_VICINITY_CHECK_NOTIFICATION);
    EVENT_DISPATCHER->removeCustomEventListeners(RPGConfig::SPEECH_MESSAGE_ON_TAP_NOTIFICATION);
    EVENT_DISPATCHER->removeCustomEventListeners(RPGConfig::SPEECH_MESSAGE_ON_TEXT_TAP_NOTIFICATION);
    EVENT_DISPATCHER->removeCustomEventListeners(RPGConfig::RECEIVE_CUSTOM_MESSAGE_NOTIFICATION);
    EVENT_DISPATCHER->removeCustomEventListeners(RPGConfig::SPEECH_BUBBLE_DESTROYED_NOTIFICATION);
    EVENT_DISPATCHER->removeCustomEventListeners(RPGConfig::PROCESS_CUSTOM_MESSAGE_AND_CREATE_UI_NOTIFICATION);
    EVENT_DISPATCHER->removeCustomEventListeners(RPGConfig::ON_MENU_EXIT_NOTIFICATION);
    EVENT_DISPATCHER->removeCustomEventListeners(RPGConfig::ON_WORD_INFO_NOTIFICATION);
    EVENT_DISPATCHER->removeCustomEventListeners(RPGConfig::WORD_BUBBLE_SHOW_NOTIFICATION);
    EVENT_DISPATCHER->removeCustomEventListeners(RPGConfig::WORD_BUBBLE_HIDE_NOTIFICATION);
    if(_greyLayer) {
        Director::getInstance()->getEventDispatcher()->removeEventListenersForTarget(_greyLayer);
    }
    //addGreyLayer
    CocosDenshion::SimpleAudioEngine::getInstance()->pauseBackgroundMusic();
    
    if(this->stateMachine != nullptr) {
        delete this->stateMachine;
        this->stateMachine = NULL;
    }
    
    Sqlite3Helper::instanceFlag = false;
    Sqlite3Helper::shared = NULL;
    
    if(this->sqlite3Helper != nullptr ) {
        delete this->sqlite3Helper;
    }
   
    cocostudio::timeline::ActionTimelineCache::getInstance()->destroyInstance();
}

void HelloWorld::changeScene(std::string nextScene, bool isMiniGame) {
    //disable touch
    if(!nextScene.empty()) {
        addGreyLayer();
        if(isMiniGame) {
            this->skeletonCharacter->getSkeletonNode()->stopAllActions();
            Director::getInstance()->replaceScene(HelloWorld::createScene(nextScene,"", false));
        } else {
            this->skeletonCharacter->getSkeletonNode()->stopAllActions();
            Director::getInstance()->replaceScene(HelloWorld::createScene(this->getIsland(),nextScene, false));
        }
    }
}

void HelloWorld::displayText(std::string word) {
//    Size visibleSize = Director::getInstance()->getVisibleSize();
//    Vec2 origin = Director::getInstance()->getVisibleOrigin();
//    
//    if(_textDisplayAnimationRunning) {
//        if(!_wordToPronounce.empty()) {
//            showText(_wordToPronounce);
//            this->unschedule(schedule_selector(HelloWorld::removeDisplayText));
//            displayTextAnimationFinished();
//        }
//    } else {
//        if(!_wordToPronounce.empty()) {
//            showText(_wordToPronounce);
//            _textDisplayAnimationRunning = true;
//            this->unschedule(schedule_selector(HelloWorld::removeDisplayText));
//            _hangBubbleNode->setPosition(Vec2(origin.x + visibleSize.width / 2, origin.y + visibleSize.height + 650));
//            auto moveTo = MoveTo::create(1.5, Vec2(origin.x + visibleSize.width / 2, origin.y + visibleSize.height - 45));
//            auto elastic = EaseBackOut::create(moveTo);
//            auto callBack = CallFunc::create(CC_CALLBACK_0(HelloWorld::displayTextAnimationFinished, this));
//            auto bubbleAction = TargetedAction::create(_hangBubbleNode, elastic);
//            runAction(Sequence::create(bubbleAction, callBack, NULL));
//        }
//    }
    
}


void HelloWorld::showText(std::string word) {
//    Node* textFieldNode = _hangBubbleNode->getChildByName("TextField_1");
//    if(textFieldNode) {
//        cocos2d::ui::TextField* textField = dynamic_cast<cocos2d::ui::TextField *>(textFieldNode);
//        if(textField != NULL) {
//            textField->setString(word);
//            textField->setTextHorizontalAlignment(TextHAlignment.CENTER);
//            textField->setTextVerticalAlignment(TextVAlignment.CENTER);
//            textField->setTouchEnabled(false);
//
//        }
//    }
    
}

void HelloWorld::displayTextAnimationFinished() {
//    this->scheduleOnce(schedule_selector(HelloWorld::removeDisplayText), 3.0);
}


void HelloWorld::beforeDisplayTextDisapperFinished() {
//    _textDisplayAnimationRunning = true;
    
}

void HelloWorld::afterDisplayTextDisapperFinished() {
//    _textDisplayAnimationRunning = false;
}




void HelloWorld::removeDisplayText(float dt) {
//    Size visibleSize = Director::getInstance()->getVisibleSize();
//    Vec2 origin = Director::getInstance()->getVisibleOrigin();
//
//        auto textDropActionDisappearMoveTo = MoveTo::create(1.5, Vec2(origin.x + visibleSize.width / 2, origin.y + visibleSize.height + 650));
//        auto textDropActionDisappearAction = TargetedAction::create(_hangBubbleNode, textDropActionDisappearMoveTo);
//        auto beforeDisplayTextDisapperAction = CallFunc::create(CC_CALLBACK_0(HelloWorld::beforeDisplayTextDisapperFinished, this));
//        auto afterDisplayTextDisapperAction = CallFunc::create(CC_CALLBACK_0(HelloWorld::afterDisplayTextDisapperFinished, this));
//    
//        runAction(Sequence::create(beforeDisplayTextDisapperAction, textDropActionDisappearAction, afterDisplayTextDisapperAction,  NULL));
//    
//    CCLOG("HelloWorld::removeDisplayText");
}

void HelloWorld::buildText(EventCustom * event) {
//    std::string &word = *(static_cast<std::string*>(event->getUserData()));
//    CCLOG("changeWordScene %s", word.c_str());
//    
//    _wordToPronounce = word;
//    
//    displayText(_wordToPronounce);
}


void HelloWorld::onExitTransitionDidStart() {
    Node::onExitTransitionDidStart();
    CCLOG("HelloWorld::onExitTransitionDidStart");
    
    this->gesture_layer_->disableAllTouch();
    this->cleanUpResources();
    
    
}


void HelloWorld::onEnterTransitionDidFinish() {
    Node::onEnterTransitionDidFinish();
    CCLOG("HelloWorld::onEnterTransitionDidFinish");
    
    this->loadSqlite3FileForIsland();
    
    this->initializeSafari();
    
    this->registerPhysicsEventContactLister();
    
    this->registerMessageSenderAndReceiver();
    
    if(this->getAlphamonNodesCount() != 0) {
        //        this->schedule(CC_SCHEDULE_SELECTOR(HelloWorld::createAlphaMons), ALPHAMON_CREATE_FREQUENCY);
    }
    
    this->scheduleUpdate();
    
    int allTasksFinished = this->sqlite3Helper->checkIfAllTaskedFinished(this->getIsland().c_str());
    
    if(allTasksFinished == 1) {
        CCLOG("deleting all items from bag for island %s", this->getIsland().c_str());
        this->sqlite3Helper->deleteAllItemFromMyBag(this->getIsland().c_str());
        
        //clear all hints
        std::string hintText;
        localStorageGetItem(HINT_TEXT, &hintText);
        if(!hintText.empty()) {
            localStorageRemoveItem(HINT_TEXT);
        }
    }

    //CocosDenshion::SimpleAudioEngine::getInstance()->playBackgroundMusic("sounds/Adagio teru (ft. teru).m4a", true);
    //CocosDenshion::SimpleAudioEngine::getInstance()->setEffectsVolume(1.0f);
    this->gesture_layer_->enableAllTouch();
}

void HelloWorld::processAnimationMessage(std::vector<MessageContent*>animationMessages) {
    
    for (std::vector<MessageContent* >::iterator it = animationMessages.begin() ; animationMessages.size() == 1 && it != animationMessages.end(); ++it)
    {
        MessageContent* content = (MessageContent*) *it;
//        CCLOG("content owner %s", content->getOwner().c_str());
        
        
        if(!content->getHint().empty()) {
            CCLOG("content->hint %s", content->getHint().c_str());
            _hintText = content->getHint();
            if (!_hintText.empty()) {
                localStorageSetItem(HINT_TEXT, _hintText);
            }
            
        }

        //find out animation name
        std::size_t found = -1;
        if(!content->getDialog().empty()) {
            found = content->getDialog().find_last_of("#");
            std::string animFile = content->getDialog();
            std::string animName = "";
            if(found != std::string::npos) {
                animFile = content->getDialog().substr(0,found);
                animName = content->getDialog().substr(found+1, content->getDialog().length());
            }

            Node* animationSpriteNode = this->mainLayer->getChildByName(content->getOwner());
            if(animationSpriteNode != NULL)
            {
                RPGSprite* animationNode = dynamic_cast<RPGSprite *>(animationSpriteNode);
                if(animationNode != NULL) {
                    cocostudio::timeline::ActionTimeline* timeline = NULL;
                    timeline =  CSLoader::createTimeline(animFile);
                    animationNode->setActionTimeLine(timeline);
                    animationNode->getSprite()->runAction(timeline);
                    
                    if(timeline != NULL && animationSpriteNode != NULL && animationNode != NULL )
                    {
                        timeline->setLastFrameCallFunc([=]() {
                            if(content != NULL && (content->getCondition().empty() || (!content->getCondition().empty() && content->getConditionSatisfied() == 1)))
                            {
                                std::string nextScene = animationNode->getNextScene();
                                
                                if(!nextScene.empty())
                                {
                                    CCLOG("calling changeScene for nextScene %s", nextScene.c_str());
                                    this->changeScene(nextScene, false);
                                    animationNode->setEventProcessed(false);
                                }
                            }
                            timeline->clearLastFrameCallFunc();
                        });
                        
                        Node* animationSpriteNode = this->mainLayer->getChildByName(content->getOwner());
                        RPGSprite* animationNode = dynamic_cast<RPGSprite *>(animationSpriteNode);
                        if(animationNode != NULL) {
                            animationNode->setVisible(true);
                            if(animationNode->getSprite() != NULL) {
                                
                                bool playInLoop = content->getPlayAnimationInLoop() == 1 ? true : false;
                                if(!animName.empty()) {
                                    timeline->play(animName, playInLoop);
                                } else {
                                    timeline->gotoFrameAndPlay(0, playInLoop);
                                }
                            }
                        }
                    }   
                }
            }
        }
    }
}


void HelloWorld::processCustomAnimationMessage(std::vector<MessageContent*>customAnimationMessages) {
    
    //CURRENTLY only one animation supported - TBD (later extend to play multiples)
//    this->unschedule(CC_SCHEDULE_SELECTOR(HelloWorld::createAlphaMons));
    for (std::vector<MessageContent* >::iterator it = customAnimationMessages.begin() ; customAnimationMessages.size() == 1 && it != customAnimationMessages.end(); ++it)
    {
        MessageContent* content = (MessageContent*) *it;
        //find out animation name
        if(!content->getHint().empty()) {
            CCLOG("content->hint %s", content->getHint().c_str());
            _hintText = content->getHint();
            if (!_hintText.empty()) {
                localStorageSetItem(HINT_TEXT, _hintText);
            }
            
        }

        if(!content->getDialog().empty() && !content->getOwner().empty()) {

            
            Node* node = this->mainLayer->getChildByName(content->getOwner());
            RPGSprite* ownerSprite = dynamic_cast<RPGSprite *>(node);
            if(node != NULL &&  ownerSprite != NULL) {
                FShake* shake = FShake::actionWithDuration(1.0f, 10.0f);
                node->runAction(TargetedAction::create(node, shake));
                ownerSprite->setEventProcessed(false);
            }
            delete content;
        }
    }
}

void HelloWorld::processMessage(std::vector<MessageContent*>*messages) {
    std::unordered_map<int, std::string> textMap;
    std::unordered_map<int, std::string> textMapFollowedByAnimation;
    std::vector<MessageContent*>showMessages;
    std::vector<MessageContent*>animationMessages;
    std::vector<MessageContent*>customAnimationMessages;
    std::vector<MessageContent*>changeSceneMessages;
    std::vector<MessageContent*>putInBackPackMessages;
    std::vector<MessageContent*>useInBackPackMessages;
    std::vector<MessageContent*>useInBackPackAndPutInBackPackMessages;
    std::string ownerOfMessage;
    int howTextManyMessages = 0;
    int howUseManyMessages = 0;
    for (std::vector<MessageContent* >::iterator it = messages->begin() ; it != messages->end(); ++it)
    {
        MessageContent* content = (MessageContent*) *it;
        if(content->getAction() == "say") {
            howTextManyMessages++;
        } else if(content->getAction() == "use") {
            howUseManyMessages++;
        } else if(content->getAction() == "put") {
            howUseManyMessages++;
        }
    }
    
    for (std::vector<MessageContent* >::iterator it = messages->begin() ; it != messages->end(); ++it)
    {
        MessageContent* content = (MessageContent*) *it;
        
        //special text message
        if(howTextManyMessages == 1 && howUseManyMessages == 1 && content->getAction() == "say")
        {
            ownerOfMessage = content->getOwner();
            assert(!ownerOfMessage.empty());
            std::string translatedString = this->currentLangUtil->translateString(content->getDialog());
            if(!translatedString.empty()) {
                textMapFollowedByAnimation.insert({content->getEventId(),translatedString});
            } else {
                textMapFollowedByAnimation.insert({content->getEventId(),content->getDialog()});
            }
            
            delete content;
        }
        else if(content->getAction() == "say") {
            ownerOfMessage = content->getOwner();
            assert(!ownerOfMessage.empty());
            std::string translatedString = this->currentLangUtil->translateString(content->getDialog());
            if(!translatedString.empty()) {
                textMap.insert({content->getEventId(),translatedString});
            } else {
                textMap.insert({content->getEventId(),content->getDialog()});
            }
            
            delete content;
        }
        else if(content->getAction() == "show") {
            ownerOfMessage = content->getOwner();
            showMessages.push_back(content);
        }
        else if(content->getAction() == "animation") {
            ownerOfMessage = content->getOwner();
            animationMessages.push_back(content);
        }
        else if(content->getAction() == "customAnimation") {
            ownerOfMessage = content->getOwner();
            customAnimationMessages.push_back(content);
        }
        else if(content->getAction() == "changeScene") {
            ownerOfMessage = content->getOwner();
            changeSceneMessages.push_back(content);
        }
        else if(content->getAction() == "put") {
            if(howTextManyMessages == 1 && howUseManyMessages == 1) {
                content->setHasTextAfterAnimation(1);
            }
            
            ownerOfMessage = content->getOwner();
            putInBackPackMessages.push_back(content);
        }
        else if(content->getAction() == "use") {
            if(howTextManyMessages == 1 && howUseManyMessages == 1) {
                content->setHasTextAfterAnimation(1);
            }
            
            ownerOfMessage = content->getOwner();
            useInBackPackMessages.push_back(content);
        }
    }
    
    if(!textMap.empty()) {
        this->processTextMessage(textMap, ownerOfMessage);
    }
    
    if(!showMessages.empty()) {
        this->processShowMessage(showMessages);
    }
    
    if(!animationMessages.empty()) {
        this->processAnimationMessage(animationMessages);
    }
    
    if(!customAnimationMessages.empty()) {
        this->processCustomAnimationMessage(customAnimationMessages);
    }
    
    if(!changeSceneMessages.empty()) {
        this->processChangeSceneMessages(changeSceneMessages);
    }
    
    if(!putInBackPackMessages.empty() && useInBackPackMessages.empty()) {
        this->processPutInBackPackMessages(putInBackPackMessages, textMapFollowedByAnimation);
    }
    
    if(!useInBackPackMessages.empty() && putInBackPackMessages.empty()) {
        this->processUseInBackPackMessages(useInBackPackMessages, textMapFollowedByAnimation);
    }
    
    if(!useInBackPackMessages.empty() && !putInBackPackMessages.empty()) {
        useInBackPackAndPutInBackPackMessages.push_back(useInBackPackMessages.at(0));
        useInBackPackAndPutInBackPackMessages.push_back(putInBackPackMessages.at(0));
        this->processUseInBackPackAndPutInBackPackMessages(useInBackPackAndPutInBackPackMessages);
    }
}

void HelloWorld::update(float dt) {
    
    if(this->skeletonCharacter)
    {
        if(this->skeletonCharacter->getSkeletonNode() != NULL && (this->skeletonCharacter->getSkeletonNode()->getPositionX() < 0 || this->skeletonCharacter->getSkeletonNode()->getPositionY() < 0 || this->skeletonCharacter->getSkeletonNode()->getPositionX() > this->getSceneSize().width)) {
            this->pause();
            this->skeletonCharacter->setVisible(false);
            this->skeletonCharacter->getSkeletonNode()->stopAllActions();
            this->changeScene(this->getSceneName(), false);
            return;
        }
        
        if(this->skeletonCharacter->getSkeletonInContactWithGround())
        {
            if(this->skeletonCharacter->isWalking) {
                if(checkTouchLeftOfCharacter(this->currentTouchPoint, this->skeletonCharacter->getSkeletonNode())) {
                    this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->setVelocity(Vec2(-MAIN_CHARACTER_FORCE,GRAVITY_VELOCITY_TO_STICK_TO_GROUND));
                } else if (checkTouchRightOfCharacter(this->currentTouchPoint, this->skeletonCharacter->getSkeletonNode())) {
                    this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->setVelocity(Vec2(MAIN_CHARACTER_FORCE,GRAVITY_VELOCITY_TO_STICK_TO_GROUND));
                }
            } else if(this->skeletonCharacter->isRunning) {
                
                if(checkTouchLeftOfCharacter(this->currentTouchPoint, this->skeletonCharacter->getSkeletonNode())) {
                    this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->setVelocity(Vec2(-MAIN_CHARACTER_RUNNING_FORCE,GRAVITY_VELOCITY_TO_STICK_TO_GROUND));
                } else if (checkTouchRightOfCharacter(this->currentTouchPoint, this->skeletonCharacter->getSkeletonNode())) {
                    this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->setVelocity(Vec2(MAIN_CHARACTER_RUNNING_FORCE,GRAVITY_VELOCITY_TO_STICK_TO_GROUND));
                }
            }
            else if (this->skeletonCharacter->isFalling && this->stateMachine != NULL) {
                this->stateMachine->handleInput(S_STANDING_STATE, cocos2d::Vec2(0,0));
                this->skeletonCharacter->isRunning = false;
                this->skeletonCharacter->isWalking = false;

            }
            
        } else {
            if(this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->getVelocity().y <=GRAVITY_VELOCITY_TO_STICK_TO_GROUND &&
               this->skeletonCharacter->isJumping == false && this->stateMachine != NULL) {
                
                this->stateMachine->handleInput(S_FALLING_STATE, cocos2d::Vec2(0,0));
            }
        }
                
        if(this->skeletonCharacter->isJumping)
        {
            if(this->skeletonCharacter->isJumpingUp &&
               this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->getVelocity().y <= 0) {
                this->skeletonCharacter->isJumpingUp = false;
                if(!this->skeletonCharacter->isPlayingContinousRotationWhileJumping)
                {
                    this->skeletonCharacter->getSkeletonActionTimeLine()->play(JUMP_END, false);
                }
                
            } 
        }
        
        
    }
    
    this->moveLayersInParallex();
    
}


void HelloWorld::moveLayersInParallex() {
    if(this->backgroundLayer != NULL) {
        this->backgroundLayer->setPositionX(this->mainLayer->getPosition().x * HORIZONTAL_PARALLEX_RATIO);
        this->backgroundLayer->setPositionY(this->mainLayer->getPosition().y * VERTICAL_PARALLEX_RATIO);
    }
    
    if(this->foregroundLayer != NULL) {
        this->foregroundLayer->setPositionX(this->mainLayer->getPosition().x);
        this->foregroundLayer->setPositionY(this->mainLayer->getPosition().y);
    }
}

void HelloWorld::OnGestureReceived(Ref* sender)
{
    //CCLOG("%s", "OnGestureReceived");
    GestureLayer* gesture_layer = (GestureLayer*)sender;
    // call the respective gesture's handler
    
    this->currentTouchPoint = gesture_layer->GetTouchEnd();
    switch(gesture_layer->GetGestureType())
    {
        case E_GESTURE_TAP:
            HandleTap(gesture_layer->GetTouchEnd());
            break;
            
        case E_GESTURE_HOLD:
            HandleHold(gesture_layer->GetTouchEnd());
            break;
            
        case E_GESTURE_SWIPE_UP:
            HandleSwipeUp(gesture_layer->GetTouchEnd());
            break;
            
        case E_GESTURE_SWIPE_DOWN:
            HandleSwipeDown(gesture_layer->GetTouchEnd());
            break;
            
            
        case E_GESTURE_TOUCH_ENDED:
            HandleTouchedEnded(gesture_layer->GetTouchEnd());
            break;
            
        default: E_GESTURE_NONE:
            break;
            
    }
}

bool HelloWorld::checkTouchWithinBoundsOfCharacter(Point point, cocostudio::timeline::SkeletonNode* characterNode)
{
    //find out touch Location
    Rect characterBoundingRect = Rect(characterNode->getBoundingBox().origin.x - characterNode->getBoundingBox().size.width/2, characterNode->getBoundingBox().origin.y, characterNode->getBoundingBox().size.width * 2, characterNode->getBoundingBox().size.height);
    
    Vec2 covertedPoint = characterNode->getParent()->convertToNodeSpace(point);
    if(characterBoundingRect.containsPoint(covertedPoint)) {
        if(this->skeletonCharacter->isRunning || this->skeletonCharacter->isWalking)
        {
            
            if(covertedPoint.x < characterBoundingRect.origin.x + 20.0f || covertedPoint.x + 20.0f >= characterBoundingRect.origin.x + characterBoundingRect.size.width) {
                CCLOG("touch within bounds of character tolerance standing");
           
            } else {
                this->skeletonCharacter->isRunning = false;
                this->skeletonCharacter->isWalking = false;
                this->stateMachine->handleInput(S_STANDING_STATE, cocos2d::Vec2(0,0));
                this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->resetForces();
                this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->setVelocity(Vec2(0,0));
                
            }
        }
        
        return true;
    }
    
    return false;
}

bool HelloWorld::checkTouchVerticallyUpOnBoundsOfCharacter(Point point, cocostudio::timeline::SkeletonNode* characterNode, float delta)
{
    //find out touch Location
    Vec2 characterPosition = characterNode->getParent()->convertToWorldSpace(characterNode->getPosition());
    Rect characterBoundingRect = characterNode->getBoundingBox();
    
    Rect boundingRectUpCharacter = Rect((characterPosition.x - characterBoundingRect.size.width/2 - delta), characterPosition.y, characterBoundingRect.size.width + 2 * delta, (Director::getInstance()->getWinSize().height - characterPosition.y ));
    
    if(boundingRectUpCharacter.containsPoint(point)) {
        return true;
    }
    
    return false;
}


void HelloWorld::flipSkeletonDirection(Point point, cocostudio::timeline::SkeletonNode* characterNode)
{
    //find out touch Location
    if(!this->skeletonCharacter) {
        return;
    }
    
    Vec2 characterPosition = characterNode->getParent()->convertToWorldSpace(characterNode->getPosition());
    auto scaleX = this->skeletonCharacter->getSkeletonNode()->getScaleX();
    if(point.x < characterPosition.x) {
        if(scaleX < 0) {
            scaleX = -scaleX;
            this->skeletonCharacter->getSkeletonNode()->setScaleX(scaleX);
            CCLOG("pausing all animation on node");
            this->skeletonCharacter->getSkeletonActionTimeLine()->pause();
            this->stateMachine->handleInput(S_STANDING_STATE, cocos2d::Vec2(0,0));
            this->skeletonCharacter->isRunning = false;
            this->skeletonCharacter->isWalking = false;

        }
    } else if(point.x > characterPosition.x) {
        if(scaleX > 0) {
            scaleX = -scaleX;
            this->skeletonCharacter->getSkeletonNode()->setScaleX(scaleX);
            CCLOG("pausing all animation on node");
            if(this->skeletonCharacter->getSkeletonActionTimeLine() != NULL) {
                this->skeletonCharacter->getSkeletonActionTimeLine()->pause();
            }
            
            this->stateMachine->handleInput(S_STANDING_STATE, cocos2d::Vec2(0,0));
            this->skeletonCharacter->isRunning = false;
            this->skeletonCharacter->isWalking = false;

        }
    }
    
}

bool HelloWorld::checkTouchLeftOfCharacter(Point point, cocostudio::timeline::SkeletonNode* characterNode)
{
    //find out touch Location
    Vec2 characterPosition = characterNode->getParent()->convertToWorldSpace(characterNode->getPosition());
    
    if(point.x < characterPosition.x) {
        return true;
    }
    return false;
}

bool HelloWorld::checkTouchRightOfCharacter(Point point, cocostudio::timeline::SkeletonNode* characterNode)
{
    //find out touch Location
    Vec2 characterPosition = characterNode->getParent()->convertToWorldSpace(characterNode->getPosition());
    
    if(point.x >= characterPosition.x) {
        return true;
    }
    return false;
}


bool HelloWorld::checkHoldWithinWalkLimitOfCharacter(Point point, cocostudio::timeline::SkeletonNode* characterNode)
{
    //find out touch Location
    Vec2 characterPosition = characterNode->getParent()->convertToWorldSpace(characterNode->getPosition());
    Rect characterBoundingRect = characterNode->getBoundingBox();
    
    Rect boundingRect = Rect((characterPosition.x - 3.5 * characterBoundingRect.size.width), 0, 3.5 * 2 * characterBoundingRect.size.width, characterPosition.y + characterBoundingRect.size.height);
    
    if(this->skeletonCharacter->isRunning)
    {
        Rect boundingRect = Rect((characterPosition.x - 2.5 * characterBoundingRect.size.width), 0, 2.5 * 2 * characterBoundingRect.size.width, characterPosition.y + characterBoundingRect.size.height);
        
        if(boundingRect.containsPoint(point)) {
            return true;
        }
        
    } else {
        if(boundingRect.containsPoint(point)) {
            return true;
        }
    }
    
    
    
    return false;
}

bool HelloWorld::checkHoldWithinRunningLimitOfCharacter(Point point, cocostudio::timeline::SkeletonNode* characterNode)
{
    //find out touch Location
    Vec2 characterPosition = characterNode->getParent()->convertToWorldSpace(characterNode->getPosition());
    Rect characterBoundingRect = characterNode->getBoundingBox();
    
    Rect boundingRect = Rect((characterPosition.x - 1.5 * characterBoundingRect.size.width), 0, 1.5 * 2 * characterBoundingRect.size.width, characterPosition.y + characterBoundingRect.size.height);

    if(!boundingRect.containsPoint(point)) {
        return true;
    }
    
    return false;
}


bool HelloWorld::checkHoldWithinSittingLimitOfCharacter(Point point, cocostudio::timeline::SkeletonNode* characterNode)
{
    //find out touch Location
    Vec2 characterPosition = characterNode->getParent()->convertToWorldSpace(characterNode->getPosition());
    Rect characterBoundingRect = characterNode->getBoundingBox();
    
    Rect boundingSittingRect = Rect((characterPosition.x - characterBoundingRect.size.width), 0,  characterBoundingRect.size.width * 2, characterPosition.y);
    
    if(boundingSittingRect.containsPoint(point)) {
        CCLOG("%s", "sitting area on hold");
        //change mouse to different image
        
        this->skeletonCharacter->isRunning = false;
        this->skeletonCharacter->isWalking = false;
        this->stateMachine->handleInput(S_STANDING_STATE, cocos2d::Vec2(0,0));
        this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->resetForces();
        this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->setVelocity(Vec2(0,0));
        
        return true;
    }
    
    
    return false;
}

void HelloWorld::HoldOrDragBehaviour(Point position) {
    
    if(this->isTapOnInterActObject(position)) {
        if(_speechBubbleView != nullptr) {
            _speechBubbleView->performAction();
        }
        

        return;
    }


    if(this->skeletonCharacter->isJumping || this->skeletonCharacter->isJumpingAttemptedWhileDragging) {

        
        if(std::abs(this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->getVelocity().y) == 0.0 )
        {
            this->stateMachine->handleInput(S_STANDING_STATE, cocos2d::Vec2(0,0));
            this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->resetForces();
            this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->setVelocity(Vec2(0,0));
            this->skeletonCharacter->isRunning = false;
            this->skeletonCharacter->isWalking = false;
            this->skeletonCharacter->isJumping = false;
            this->skeletonCharacter->isJumpingAttemptedWhileDragging = false;
            this->skeletonCharacter->isPlayingContinousRotationWhileJumping = false;
        }

        return;
    }
    
    if(this->skeletonCharacter->isFalling) {
        return;
    }
    
    this->handleCharacterMovement(position);
}


void HelloWorld::handleCharacterMovement(Point position) {
    this->flipSkeletonDirection(position, this->skeletonCharacter->getSkeletonNode());
    
    if(this->skeletonCharacter->getSkeletonInContactWithGround())
    {
        Vec2 characterPosition = this->skeletonCharacter->getSkeletonNode()->getParent()->convertToWorldSpace(this->skeletonCharacter->getSkeletonNode()->getPosition());
        
        if(position.y >= 0 && position.y <= characterPosition.y + this->skeletonCharacter->getSkeletonNode()->getBoundingBox().size.height)
        {
            if(checkTouchWithinBoundsOfCharacter(position, this->skeletonCharacter->getSkeletonNode()) || checkHoldWithinSittingLimitOfCharacter(position, this->skeletonCharacter->getSkeletonNode())) {
                
            }
//            else if(checkHoldWithinWalkLimitOfCharacter(position, this->skeletonCharacter->getSkeletonNode())) {
//                CCLOG("%s", "Withing walking area");
//                this->walkCharacterOnLeftOrRightDirection(position);
//            }
            else if(checkHoldWithinRunningLimitOfCharacter(position, this->skeletonCharacter->getSkeletonNode())){
                CCLOG("%s", "Withing running area");
                this->runCharacterOnLeftOrRightDirection(position);
            } else {
                this->stateMachine->handleInput(S_STANDING_STATE, cocos2d::Vec2(0,0));
                this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->resetForces();
                this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->setVelocity(Vec2(0,0));
                this->skeletonCharacter->isRunning = false;
                this->skeletonCharacter->isWalking = false;

                
            }
            
        } else {
            //Same Force as TAP
            if(this->skeletonCharacter->isJumping || this->skeletonCharacter->isJumpingAttemptedWhileDragging) {
                return;
            }
            this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->resetForces();
            this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->setVelocity(Vec2(0,0));
            
            if(checkTouchVerticallyUpOnBoundsOfCharacter(position, this->skeletonCharacter->getSkeletonNode(), SWIPE_DELTA))
            {
                this->HandleJumpWithAnimation();
                this->skeletonCharacter->isJumpingAttemptedWhileDragging = false;
            }
            else {
                this->HandleJumpWithContinueousRotation();
                this->skeletonCharacter->isJumpingAttemptedWhileDragging = true;
            }
        }    
    }
}

//Handle Tap
void HelloWorld::HandleHold(Point position)
{
    if(!this->skeletonCharacter)
    {
        return;
    }

    if(checkTouchWithinBoundsOfCharacter(position, this->skeletonCharacter->getSkeletonNode())) {
        return;
    };
    
    this->HoldOrDragBehaviour(position);
}


void HelloWorld::walkCharacterOnLeftOrRightDirection(Point position) {
    this->skeletonCharacter->isWalking = true;
    Vec2 characterPosition = this->skeletonCharacter->getSkeletonNode()->getParent()->convertToWorldSpace(this->skeletonCharacter->getSkeletonNode()->getPosition());
    
    if(checkTouchLeftOfCharacter(position, this->skeletonCharacter->getSkeletonNode())) {
        this->stateMachine->handleInput(S_WALKING_STATE, Vec2(-MAIN_CHARACTER_FORCE, 0));
        
    } else if (checkTouchRightOfCharacter(position, this->skeletonCharacter->getSkeletonNode())){
        this->stateMachine->handleInput(S_WALKING_STATE, Vec2(MAIN_CHARACTER_FORCE, 0));
    }
    
}


void HelloWorld::runCharacterOnLeftOrRightDirection(Point position) {
    this->skeletonCharacter->isRunning = true;
    Vec2 characterPosition = this->skeletonCharacter->getSkeletonNode()->getParent()->convertToWorldSpace(this->skeletonCharacter->getSkeletonNode()->getPosition());
    
    if(checkTouchLeftOfCharacter(position, this->skeletonCharacter->getSkeletonNode())) {
        this->stateMachine->handleInput(S_RUNNING_STATE, Vec2(-MAIN_CHARACTER_RUNNING_FORCE, GRAVITY_VELOCITY_TO_STICK_TO_GROUND));
        CCLOG("%s", "Only Run Left!!!");
        
    } else if (checkTouchRightOfCharacter(position, this->skeletonCharacter->getSkeletonNode())) {
        this->stateMachine->handleInput(S_RUNNING_STATE, Vec2(MAIN_CHARACTER_RUNNING_FORCE, GRAVITY_VELOCITY_TO_STICK_TO_GROUND));
        CCLOG("%s", "Only Run Right!!!");
        
    }
    
}

void HelloWorld::scheduleJumpUpEndCall(float timeToStart) {
    this->scheduleOnce(schedule_selector(HelloWorld::startJumpUpEndingAnimation), timeToStart);
}


void HelloWorld::scheduleContinuousRotationCall(float timeToStart) {
    this->scheduleOnce(schedule_selector(HelloWorld::startContinuousRotationAnimation), timeToStart);
}


void HelloWorld::applyImpulseOnSkeletonToJumpOnHoldOrDrag(Point position) {
    Vec2 characterPosition = this->skeletonCharacter->getSkeletonNode()->getParent()->convertToWorldSpace(this->skeletonCharacter->getSkeletonNode()->getPosition());
    float angle = RPGConfig::calcuateAngleForJump(position, characterPosition, 0.0f, 0.0f);
    float value = RPGConfig::calcuateVelocityForJump(position, characterPosition, angle, 0.0f, 0.0f);
    float timeToStart = RPGConfig::calcuateTimeToStartJumpUpAnimation(value, angle, JUMP_UP_ENDING_ANIMATION_FRAMES);
    this->scheduleContinuousRotationCall(0.0f);
    this->applyImpulseOnSkeletonToJump(position, angle, value, timeToStart);
    
    
}

void HelloWorld::applyImpulseOnSkeletonToJumpOnTap(Point position) {
    Vec2 characterPosition = this->skeletonCharacter->getSkeletonNode()->getParent()->convertToWorldSpace(this->skeletonCharacter->getSkeletonNode()->getPosition());
//    CCLOG("width %f", this->skeletonCharacter->getSkeletonNode()->getBoundingBox().size.width);
//    CCLOG("height %f", this->skeletonCharacter->getSkeletonNode()->getBoundingBox().size.height);

    float angle = RPGConfig::calcuateAngleForJump(position, characterPosition, 0.0f, 0.0f);
    float value = RPGConfig::calcuateVelocityForJump(position, characterPosition, angle, 0.0f, 0.0f);
    float timeToStart = RPGConfig::calcuateTimeToStartJumpUpAnimation(value, angle, JUMP_UP_ENDING_ANIMATION_FRAMES);
    this->scheduleJumpUpEndCall(timeToStart);
    this->applyImpulseOnSkeletonToJump(position, angle, value, timeToStart);    
}

void HelloWorld::applyImpulseOnSkeletonToJump(Point position, float angle, float value, float timeToStart) {
    if(checkTouchLeftOfCharacter(position, this->skeletonCharacter->getSkeletonNode())) {
        this->stateMachine->handleInput(S_JUMPING_STATE, Vec2(-value * cos(angle * MYPI/RADIAN_TO_DEGREE), -value * sin(angle * MYPI/RADIAN_TO_DEGREE)));
        
    } else if (checkTouchRightOfCharacter(position, this->skeletonCharacter->getSkeletonNode())) {
        this->stateMachine->handleInput(S_JUMPING_STATE, Vec2(value * cos(angle * MYPI/RADIAN_TO_DEGREE), value * sin(angle * MYPI/RADIAN_TO_DEGREE)));
    }
}

void HelloWorld::startJumpUpEndingAnimation(float dt) {
    this->skeletonCharacter->isJumpingUp = true;
    this->skeletonCharacter->playJumpingUpEndingAnimation();
}


void HelloWorld::startContinuousRotationAnimation(float dt) {
    this->skeletonCharacter->isJumpingUp = true;
    this->skeletonCharacter->isPlayingContinousRotationWhileJumping = true;
    this->skeletonCharacter->playJumpingContinuousRotationAnimation();
}

void HelloWorld::sendBubbleDestroySignal() {
    if(this->getSpeechBubbleAlreadyVisible()) {
        EVENT_DISPATCHER->dispatchCustomEvent(RPGConfig::SEND_BUBBLE_DESTROY_NOTIFICATION);
    }
}

bool HelloWorld::isTapOnInterActObject(Point position) {
    if(this->getSpeechBubbleAlreadyVisible()) {
        return true;
    }
    return false;
}

bool HelloWorld::checkTapOnRPGSprite(RPGSprite* rpgNode, Point position) {
    
    Rect boundingBoxRect = Rect(rpgNode->getSprite()->getBoundingBox().origin.x, rpgNode->getSprite()->getBoundingBox().origin.y, rpgNode->getSprite()->getBoundingBox().size.width == 0 ? OBJECT_TAP_BOUNDING_BOX_WIDTH : rpgNode->getSprite()->getBoundingBox().size.width, rpgNode->getSprite()->getBoundingBox().size.height == 0 ? OBJECT_TAP_BOUNDING_BOX_WIDTH : rpgNode->getSprite()->getBoundingBox().size.height);
    
    if(rpgNode->getSprite()->isVisible() && rpgNode->getInterAct() == "true" && rpgNode->getVicinityToMainCharacter() == true && boundingBoxRect.containsPoint(rpgNode->getSprite()->getParent()->convertToNodeSpace(position))) {
        return true;
    }
       
    return false;
}

//Handle Tap
void HelloWorld::HandleTap(Point position)
{
    if(this->isTapOnInterActObject(position)) {
        //later launch custom event
        if(_speechBubbleView != nullptr) {
            _speechBubbleView->performAction();
        }
        
        return;
    }
    
    
    if(!this->skeletonCharacter)
    {
        return;
    }
    
    if(this->skeletonCharacter->isJumping)
    {
        if(std::abs(this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->getVelocity().y) == 0 )
        {
            this->stateMachine->handleInput(S_STANDING_STATE, cocos2d::Vec2(0,0));
            this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->resetForces();
            this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->setVelocity(Vec2(0,0));
            this->skeletonCharacter->isRunning = false;
            this->skeletonCharacter->isWalking = false;
            this->skeletonCharacter->isJumping = false;
            this->skeletonCharacter->isJumpingAttemptedWhileDragging = false;
            this->skeletonCharacter->isPlayingContinousRotationWhileJumping = false;

        }
        
        return;
    }
    
    if(this->skeletonCharacter->isFalling) {
        return;
    }
        
    
    if(checkTouchWithinBoundsOfCharacter(position, this->skeletonCharacter->getSkeletonNode()) || checkHoldWithinSittingLimitOfCharacter(position, this->skeletonCharacter->getSkeletonNode())) {
        return;
    }
    
//    CCLOG("%s", "Handle Tap!!!");
    this->flipSkeletonDirection(this->currentTouchPoint, this->skeletonCharacter->getSkeletonNode());
    this->HandleJumpWithAnimation();
}

void HelloWorld::HandlePostJumpUpAnimation() {
    this->skeletonCharacter->getSkeletonActionTimeLine()->setTimeSpeed(1.0f);
    this->applyImpulseOnSkeletonToJumpOnTap(this->currentTouchPoint);
    this->skeletonCharacter->getSkeletonActionTimeLine()->clearLastFrameCallFunc();
    this->skeletonCharacter->getSkeletonActionTimeLine()->clearFrameEndCallFuncs();

}


void HelloWorld::HandlePostJumpUpWithRotationAnimation() {
    this->skeletonCharacter->getSkeletonActionTimeLine()->setTimeSpeed(1.0);
    this->applyImpulseOnSkeletonToJumpOnHoldOrDrag(this->currentTouchPoint);
    this->skeletonCharacter->getSkeletonActionTimeLine()->clearLastFrameCallFunc();
    this->skeletonCharacter->getSkeletonActionTimeLine()->clearFrameEndCallFuncs();

}


void HelloWorld::HandleJumpWithContinueousRotation()
{
    //define function to be callback once initial jumping animation is over
    std::function<void(void)> startJumpingStateWithRotationAfterJumpStartAnimation = std::bind(&HelloWorld::HandlePostJumpUpWithRotationAnimation, this);
    //start playing start jump animation
    this->skeletonCharacter->playStartingJumpUpWithRotationAnimation(startJumpingStateWithRotationAfterJumpStartAnimation);

}

void HelloWorld::HandleJumpWithAnimation() {
    //define function to be callback once initial jumping animation is over
    std::function<void(void)> startJumpingStateAfterJumpStartAnimation = std::bind(&HelloWorld::HandlePostJumpUpAnimation, this);
    //start playing start jump animation
    this->skeletonCharacter->playStartingJumpUpAnimation(startJumpingStateAfterJumpStartAnimation);
}

//Handle Swipe Up
void HelloWorld::HandleSwipeUp(Point position) {
    
    if(!this->skeletonCharacter)
    {
        return;
    }

    
    if(checkTouchWithinBoundsOfCharacter(position, this->skeletonCharacter->getSkeletonNode())) {
        return;
    };
    
    if(this->skeletonCharacter->isFalling) {
        return;
    }
    
    if(checkTouchVerticallyUpOnBoundsOfCharacter(position, this->skeletonCharacter->getSkeletonNode(), 0.0f))
    {
        stateMachine->handleInput(S_JUMPING_STATE, Vec2(0, MAIN_CHARACTER_VERTICAL_IMPULSE));
    }
}

//Handle Swipe Down
void HelloWorld::HandleSwipeDown(Point position) {
    if(!this->skeletonCharacter)
    {
        return;
    }

    if(checkTouchWithinBoundsOfCharacter(position, this->skeletonCharacter->getSkeletonNode())) {
        return;
    };
    
    if(this->skeletonCharacter->isFalling) {
        return;
    }

}


//Handle Swipe Left
void HelloWorld::HandleSwipeLeft(Point position) {
    if(!this->skeletonCharacter)
    {
        return;
    }

    if(checkTouchWithinBoundsOfCharacter(position, this->skeletonCharacter->getSkeletonNode())) {
        return;
    };
    
    
//        CCLOG("%s", "Handle Drag Left!!!");
        this->HoldOrDragBehaviour(position);
    
}

void HelloWorld::HandleTouchedEnded(Point position) {

    if(!this->skeletonCharacter)
    {
        return;
    }

    if(!this->skeletonCharacter->isJumping) {
        if(this->skeletonCharacter->isRunning || this->skeletonCharacter->getSkeletonInContactWithGround() || this->skeletonCharacter->isWalking) {
            this->stateMachine->handleInput(S_STANDING_STATE, cocos2d::Vec2(0,0));
            this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->resetForces();
            this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->setVelocity(Vec2(0,0));
            this->skeletonCharacter->isRunning = false;
            this->skeletonCharacter->isWalking = false;
        } else {
            this->skeletonCharacter->isWalking = false;
            this->skeletonCharacter->isRunning = false;
            this->stateMachine->handleInput(S_FALLING_STATE, cocos2d::Vec2(0,0));
        }
        
    }
}

//Handle Swipe Right
void HelloWorld::HandleSwipeRight(Point position) {
    
    if(!this->skeletonCharacter)
    {
        return;
    }

    
    if(checkTouchWithinBoundsOfCharacter(position, this->skeletonCharacter->getSkeletonNode())) {
        return;
    };
    
    
    
//        CCLOG("%s", "Handle Drag Right!!!");
        this->HoldOrDragBehaviour(position);
    
}

cocos2d::Size HelloWorld::getSceneSize() {
    return this->sceneSize;
}



void HelloWorld::setSceneSize(const cocos2d::Size& size) {
    this->sceneSize = size;
}

bool HelloWorld::handlePhysicsContactEventForMainCharacter(PhysicsContact &contact, cocos2d::Node* nodeA, cocos2d::Node* nodeB)
{
    CCLOG("contact current BEGAN Main Skeleton!!! %s", this->stateMachine->enumToString(this->stateMachine->getCurrentState()->getState()));
    
    if(RPGConfig::compareCaseInsensitive(nodeA->getName(),HUMAN_SKELETON_NAME) ||
       RPGConfig::compareCaseInsensitive(nodeB->getName(),HUMAN_SKELETON_NAME))
    {
        
        if(this->skeletonCharacter->didSkeletonContactBeginDuringJumpingUp(contact, this->stateMachine->getCurrentState()->getState(), this->getSceneSize().width)) {
            CCLOG("ignore contact while jumping up for Main Skeleton!!!");
            return false;
        }
        
        
        if(this->stateMachine != NULL && this->stateMachine->getCurrentState() != NULL)
        {
            if(this->stateMachine->getCurrentState()->getState() == S_JUMPING_STATE)
            {
                //made contact with ground - assumption this point
                if(this->skeletonCharacter->isJumpingAttemptedWhileDragging && this->skeletonCharacter->isPlayingContinousRotationWhileJumping) {
                    
                    this->skeletonCharacter->getSkeletonActionTimeLine()->setTimeSpeed(4.0f);
                    
                     std::function<void(void)> jumpEndingAnimation = std::bind(&SkeletonCharacter::HandlePostJumpDownEndingAnimation, this->skeletonCharacter);
                    
                     this->skeletonCharacter->getSkeletonActionTimeLine()->setAnimationEndCallFunc(ROLL_SKELETON, jumpEndingAnimation);
                    
                    this->skeletonCharacter->getSkeletonActionTimeLine()->play(ROLL_SKELETON, false);
                    
                } else {
                    //CCLOG("%s", "contact began after jump => NOOOOOOO dragging");
                    std::function<void(void)> jumpEndingAnimation = std::bind(&SkeletonCharacter::HandlePostJumpDownEndingAnimation, this->skeletonCharacter);
                    
                    this->skeletonCharacter->getSkeletonActionTimeLine()->setAnimationEndCallFunc(JUMP_FINISHED, jumpEndingAnimation);
                    this->skeletonCharacter->getSkeletonActionTimeLine()->play(JUMP_FINISHED, false);
                }
            } else if(this->stateMachine->getCurrentState()->getState() == S_WALKING_STATE || this->stateMachine->getCurrentState()->getState() == S_RUNNING_STATE) {
                
                if((nodeA->getName() != HUMAN_SKELETON_NAME && nodeA->getPhysicsBody()->getCategoryBitmask() != GROUND_CATEGORY_MASK) ||
                   (nodeB->getName() != HUMAN_SKELETON_NAME && nodeB->getPhysicsBody()->getCategoryBitmask() != GROUND_CATEGORY_MASK)) {

                    if((nodeA->getName() != HUMAN_SKELETON_NAME && nodeA->getPhysicsBody()->getCategoryBitmask() == NON_PASS_THRU_CATEGORY_MASK) ||
                       (nodeB->getName() != HUMAN_SKELETON_NAME && nodeB->getPhysicsBody()->getCategoryBitmask() == NON_PASS_THRU_CATEGORY_MASK)) {
                        return true;
                    }

                    
                    
                    float limit = X_OFFSET_IF_HERO_DISAPPER
                    if(this->skeletonCharacter->getSkeletonNode()->getPosition().x <= limit || this->skeletonCharacter->getSkeletonNode()->getPosition().x >= this->getSceneSize().width - limit) {
                        return true;
                    }
                    
                    return false;
                }
                
            }
        }
    }
    return true;
}


bool HelloWorld::handlePhysicsContactEventForOtherSkeletonCharacter(PhysicsContact &contact, cocos2d::Node* nodeA, cocos2d::Node* nodeB) {
    //find out external node in vector
    
    bool isSkeletonNodeA = dynamic_cast<cocostudio::timeline::SkeletonNode *>(nodeA);
    bool isSkeletonNodeB = dynamic_cast<cocostudio::timeline::SkeletonNode *>(nodeB);
    
    if(isSkeletonNodeA && contact.getShapeB()->getCollisionBitmask() == GROUND_CATEGORY_MASK) {
//        CCLOG("contact BEGAN external sekleton!!!");
        nodeA->setScaleX(-nodeA->getScaleX());
        RPGConfig::externalSkeletonMoveDelta = -RPGConfig::externalSkeletonMoveDelta;
        
    } else if(isSkeletonNodeB && contact.getShapeA()->getCollisionBitmask() == GROUND_CATEGORY_MASK) {
//        CCLOG("contact BEGAN external sekleton!!!");
        nodeB->setScaleX(-nodeB->getScaleX());
        RPGConfig::externalSkeletonMoveDelta = -RPGConfig::externalSkeletonMoveDelta;

        
    }

    return true;
}

bool HelloWorld::onContactBegin(PhysicsContact &contact) {
    // We we handle what happen when character collide with something else
    // if we return true, we say: collision happen please. => Top-Down Char Jump
    // otherwise, we say the engine to ignore this collision => Bottom-Up Char Jump
//    CCLOG("contact BEGAN 1111!!! %d", this->stateMachine->getCurrentState()->getState());
    cocos2d::Node* nodeA = contact.getShapeA()->getBody()->getNode();
    cocos2d::Node* nodeB = contact.getShapeB()->getBody()->getNode();
    
    
    //Dynamic cast
    bool isSkeletonNodeA = dynamic_cast<cocostudio::timeline::SkeletonNode *>(nodeA);
    bool isSkeletonNodeB = dynamic_cast<cocostudio::timeline::SkeletonNode *>(nodeB);
    
    if(isSkeletonNodeA || isSkeletonNodeB)
    {
        if(RPGConfig::compareCaseInsensitive(nodeA->getName(),HUMAN_SKELETON_NAME) ||
           RPGConfig::compareCaseInsensitive(nodeB->getName(),HUMAN_SKELETON_NAME))
        {
            return this->handlePhysicsContactEventForMainCharacter(contact, nodeA, nodeB);
        } else {
            return this->handlePhysicsContactEventForOtherSkeletonCharacter(contact, nodeA, nodeB);
        }
    }
    
    return true;
}


void HelloWorld::registerPhysicsEventContactLister() {
    auto contactListener = EventListenerPhysicsContact::create();
    
    contactListener->onContactBegin = CC_CALLBACK_1(HelloWorld::onContactBegin, this);
    
    
    contactListener->onContactPreSolve = [=](PhysicsContact &contact, PhysicsContactPreSolve& solve) -> bool
    {
        solve.setRestitution(0); //stop bounce
        return true;
    };
    
    
    contactListener->onContactSeparate = [=](PhysicsContact &contact) -> bool
    {
        return true;
    };
    
    
    Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(contactListener, this);    
}
