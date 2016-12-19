#include <iostream>
#include <string>
#include <sstream>
#include <regex>
#include <unordered_map>
#include "HelloWorldScene.h"
#include "StartMenuScene.h"
#include "GameMapScene.h"
#include "MapScene.h"

USING_NS_CC;

Scene* HelloWorld::createScene(const std::string& island, const std::string& sceneName)
{
    // 'scene' is an autorelease object
    auto scene = Scene::createWithPhysics();
    
    // 'layer' is an autorelease object
    auto layer = HelloWorld::create(island, sceneName);
    
    // add layer as a child to scene
    scene->addChild(layer);

    layer->menuContext = MenuContext::create(layer, HelloWorld::gameName(), true);
    scene->addChild(layer->menuContext);

    initPhysics(scene);
    
    // return the scene
    
    return scene;
}

HelloWorld* HelloWorld::create(const std::string& island, const std::string& sceneName)
{
    HelloWorld* helloWorldLayer = new (std::nothrow) HelloWorld();
    if(helloWorldLayer && helloWorldLayer->init(island, sceneName)) {
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
skeletonPositionInLastVisitedScene(nullptr)
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
    
    //this->loadWords();
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
    std::string wordFile = !this->getSceneName().empty() ? this->getSceneName(): this->getIsland();
    
    std::map<std::string,std::string> mapping = this->sqlite3Helper->loadNodeWordMapping(wordFile.c_str());
    
    std::map<std::string, std::string>::iterator it;
    CCLOG("wordFile %s", wordFile.c_str());
    for(it = mapping.begin(); it != mapping.end(); it++) {
        std::string word  = it->first;
        std::string nodeName = it->second;
        
        CCLOG("node=%s, word=%s", nodeName.c_str(), word.c_str());
        Node* node = this->mainLayer->getChildByName(nodeName.c_str());
        if(node != NULL && !word.empty()) {
            this->createWordSprite(node, word, this->mainLayer);
        } else {
            if(this->foregroundLayer != NULL)
            {
                node = this->foregroundLayer->getChildByName(nodeName.c_str());
                if(node != NULL && !word.empty()) {
                    this->createWordSprite(node, word, this->foregroundLayer);
                }
            }
        }
    }
}

void HelloWorld::createWordSprite(Node* node, std::string word, Node* parentNode)
{
    WordSprite* wordSprite = WordSprite::create(node, word);
    parentNode->addChild(wordSprite);
}


void HelloWorld::processMainLayerNonAlphamonChildrenForCustomEvents() {
    assert(this->mainLayer != NULL);
    //iterate thru all children
    auto children = this->mainLayer->getChildren();
    for (std::vector<Node*>::iterator it = children.begin() ; it != children.end(); ++it) {
        cocos2d::Node* node = *it;
        this->processNodeWithCustomAttributes(node, this->mainLayer);
    }
}

void HelloWorld::processNodeWithCustomAttributes(Node* node, Node* parentNode) {
//    if(node->getName().compare("red_button_2") == 0) {
//        std::unordered_map<std::string, std::string> attributes = RPGConfig::parseUserData("canInteract=true");
//        this->createRPGSprite(node, attributes, parentNode);
//    }
//    
//    if(node->getName().compare("green_button_1") == 0) {
//        std::unordered_map<std::string, std::string> attributes = RPGConfig::parseUserData("canInteract=true");
//        this->createRPGSprite(node, attributes, parentNode);
//    }

    
    cocostudio::ComExtensionData* data = (cocostudio::ComExtensionData*)node->getComponent("ComExtensionData");
    
    if(data != NULL && !data->getCustomProperty().empty()) {
        
        CCLOG("found user data for child %s", node->getName().c_str());
        
        std::regex pattern("\\b(alphamon)([^ ]*)");
        
        if(!regex_match(node->getName(), pattern)) {
            
            std::unordered_map<std::string, std::string> attributes = RPGConfig::parseUserData(data->getCustomProperty());

            std::regex skeletonFile ("\\b(.*)_skeleton.csb");
            std::unordered_map<std::string,std::string>::const_iterator it = attributes.find("fileName");
            std::unordered_map<std::string,std::string>::const_iterator itLeft = attributes.find("left");
            std::unordered_map<std::string,std::string>::const_iterator itRight = attributes.find("right");
            if ( it != attributes.end() ) {
                std::string fileName(it->second);
            //    fileName = std::regex_replace(fileName, std::regex("^ +| +$|( ) +"), "$1");

                if(regex_match(fileName, skeletonFile)) {
                    //process hero node
					std::string value = node->getName();// std::regex_replace(node->getName(), std::regex("^ +| +$|( ) +"), "$1");
                    if(value == HUMAN_SKELETON_NAME) {
                        //create Hero character
                        this->addMainCharacterToScene(fileName, node);
                        
                    } else  {
                        //create external characters
                        ExternalSkeletonCharacter* externalSkeletonCharacter = ExternalSkeletonCharacter::create(node, attributes);
                        this->mainLayer->addChild(externalSkeletonCharacter);

                    }
                }
            } else if(itLeft != attributes.end()) {
                auto physicsBody = PhysicsBody::createBox(Size(INVISIBLE_BOUNDARY_WIDTH, this->getSceneSize().height), PHYSICSBODY_MATERIAL_DEFAULT, Vec2(INVISIBLE_LEFT_BOUNDARY_OFFSET,this->getSceneSize().height/2));
                physicsBody->setDynamic(false);
                physicsBody->setMass(INFINITY);
                node->setPhysicsBody(physicsBody);
                
                node->getPhysicsBody()->setRotationEnable(false);
                node->getPhysicsBody()->setCategoryBitmask(INVISIBLE_BOUNDARY_CATEGORY_BITMASK);
                node->getPhysicsBody()->setCollisionBitmask(INVISIBLE_BOUNDARY_COLLISION_BITMASK);
                node->getPhysicsBody()->setContactTestBitmask(INVISIBLE_BOUNDARY_CONTACT_BITMASK);
                
            } else if(itRight != attributes.end()) {
                auto physicsBody = PhysicsBody::createBox(Size(INVISIBLE_BOUNDARY_WIDTH, this->getSceneSize().height), PHYSICSBODY_MATERIAL_DEFAULT, Vec2(INVISIBLE_RIGHT_BOUNDARY_OFFSET,this->getSceneSize().height/2));
                physicsBody->setDynamic(false);
                physicsBody->setMass(INFINITY);
                node->setPhysicsBody(physicsBody);
                node->getPhysicsBody()->setRotationEnable(false);
                node->getPhysicsBody()->setCategoryBitmask(INVISIBLE_BOUNDARY_CATEGORY_BITMASK);
                node->getPhysicsBody()->setCollisionBitmask(INVISIBLE_BOUNDARY_CONTACT_BITMASK);
                node->getPhysicsBody()->setContactTestBitmask(INVISIBLE_BOUNDARY_CONTACT_BITMASK);
                
                
            }            
            else {
                std::unordered_map<std::string, std::string> attributes = RPGConfig::parseUserData(data->getCustomProperty());
                this->createRPGSprite(node, attributes, parentNode);
                
            }
        }
    }
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
                        
//                        CCLOG("matchingName %s", matchingName.c_str());
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

void HelloWorld::initGestureLayer() {
    gesture_layer_ = GestureLayer::create(this, callfuncO_selector(HelloWorld::OnGestureReceived));
    this->mainLayer->addChild(gesture_layer_);
}


// on "init" you need to initialize your instance
bool HelloWorld::init(const std::string& island, const std::string& sceneName)
{
    //////////////////////////////
    // 1. super init first
    if ( !Layer::init() )
    {
        return false;
    }
    
    this->setIsland(island);
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
    //testing
    
    this->loadSqlite3FileForIsland();
    
    this->initializeSafari();
    
    this->registerPhysicsEventContactLister();
    
    this->registerMessageSenderAndReceiver();
    
    if(this->getAlphamonNodesCount() != 0) {
//        this->schedule(CC_SCHEDULE_SELECTOR(HelloWorld::createAlphaMons), ALPHAMON_CREATE_FREQUENCY);
    }
    
    this->scheduleUpdate();
    
    CocosDenshion::SimpleAudioEngine::getInstance()->playBackgroundMusic("sounds/Adagio teru (ft. teru).m4a", true);
    CocosDenshion::SimpleAudioEngine::getInstance()->setEffectsVolume(1.0f);
    
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

//    this->getEventDispatcher()->addCustomEventListener(RPGConfig::ON_ALPHAMON_PRESSED_NOTIFICATION, CC_CALLBACK_1(HelloWorld::alphamonDestroyed, this));
//    
    
//    this->getEventDispatcher()->addCustomEventListener(RPGConfig::ON_WORD_INFO_NOTIFICATION, CC_CALLBACK_1(HelloWorld::changeWordScene, this));
//    
    
}

//void HelloWorld::alphamonDestroyed(EventCustom* event) {
//    std::string &alphamon = *(static_cast<std::string*>(event->getUserData()));
//    activeAlphamonNodes.erase(std::remove(activeAlphamonNodes.begin(), activeAlphamonNodes.end(), alphamon), activeAlphamonNodes.end());
//
//}

void HelloWorld::transitionToDuelScene(wchar_t alphabet) {
    this->cleanUpResources();
    std::string firstParam = LangUtil::getInstance()->convertUTF16CharToString(CharGenerator::getInstance()->generateAChar());
    std::string secondParam = LangUtil::getInstance()->convertUTF16CharToString(alphabet);
    StartMenu::startScene(DUEL_SCENE_NAME, firstParam, secondParam);
}

void HelloWorld::processTextMessage(std::unordered_map<int, std::string> textMap, std::string ownerOfMessage)
{
    //find node based on ownerOfMessage
    auto selectedNode = this->mainLayer->getChildByName(ownerOfMessage);
    assert(selectedNode != NULL);
    
    //do dynamic cast
    bool isExternalCharacter = dynamic_cast<ExternalSkeletonCharacter *>(selectedNode);
    bool isSkeletonCharacter = dynamic_cast<SkeletonCharacter *>(selectedNode);
    bool isRPGSprite = dynamic_cast<RPGSprite *>(selectedNode);
    if(isExternalCharacter) {
        ExternalSkeletonCharacter* character = dynamic_cast<ExternalSkeletonCharacter *>(selectedNode);
        Point touch_point = character->convertToWorldSpace(character->getExternalSkeletonNode()->getPosition());
        SpeechBubbleView* speechBubble = SpeechBubbleView::create(textMap, Point(touch_point.x, touch_point.y + character->getExternalSkeletonNode()->getBoundingBox().size.height));
        
        this->setSpeechBubbleAlreadyVisible(true);
        
        this->addChild(speechBubble, 1);
        
    } else if(isSkeletonCharacter) {
        Point touch_point = this->skeletonCharacter->convertToWorldSpace(this->skeletonCharacter->getSkeletonNode()->getPosition());
        
        SpeechBubbleView* speechBubble = SpeechBubbleView::create(textMap, Point(touch_point.x, touch_point.y + this->skeletonCharacter->getSkeletonNode()->getBoundingBox().size.height));
        this->setSpeechBubbleAlreadyVisible(true);
        
        this->addChild(speechBubble, 1);
        
    } else if(isRPGSprite) {
        RPGSprite* sprite = dynamic_cast<RPGSprite *>(selectedNode);
        Point touch_point = sprite->convertToWorldSpace(sprite->getSprite()->getPosition());
        SpeechBubbleView* speechBubble = SpeechBubbleView::create(textMap, Point(touch_point.x, touch_point.y + sprite->getSprite()->getBoundingBox().size.height));
        this->setSpeechBubbleAlreadyVisible(true);
        
        this->addChild(speechBubble, 1);
    }
}

void HelloWorld::processShowMessage(std::vector<MessageContent*>showMessages) {
    
    for (std::vector<MessageContent* >::iterator it = showMessages.begin() ; it != showMessages.end(); ++it)
    {
        MessageContent* content = (MessageContent*) *it;
        CCLOG("content owner %s", content->getOwner().c_str());
        Node* ownerNode = this->mainLayer->getChildByName(content->getOwner());
        RPGSprite* ownerSprite = NULL;
        if(ownerNode != NULL) {
            ownerSprite = dynamic_cast<RPGSprite *>(ownerNode);
            if(ownerSprite != NULL) {
                ownerSprite->getSprite()->setVisible(false);
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
        
        if(!content->getPreOutComeAction().empty()) {
            CCLOG("content->getPreOutComeAction() %s", content->getPreOutComeAction().c_str());
            
            if(content->getShouldDisplayInBag() == 0 && ownerSprite != NULL) {
                //play animation of bag opening and insert item into bag
                moveitemIntoBagAnimation(ownerSprite);
            }
            
            this->sqlite3Helper->deleteItemFromMyBag(this->getIsland().c_str(), content->getPreOutComeAction().c_str());
        }

        if(!content->getPostOutComeAction().empty()) {
            if(content->getShouldDisplayInBag() == 1 && ownerSprite != NULL) {
                //play animation of bag opening and insert item into bag
                moveitemIntoBagAnimation(ownerSprite);
            }
            CCLOG("content->getPostOutComeAction() %s", content->getPostOutComeAction().c_str());
            this->sqlite3Helper->insertItemToMyBag(this->getIsland().c_str(), content->getPostOutComeAction().c_str());
        }
        
        //execute any other condition based on this pre-condition
        this->messageSender->createMessagesForPreconditionId(content->getEventId());
        
        delete content;
    }
}


void HelloWorld::moveItemIntoBag(RPGSprite* item) {
    CCLOG("move item into bag %s", item->getName().c_str());
    Size visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();
    Sprite* orgSprite = dynamic_cast<Sprite *>(item->getSprite());
    if(orgSprite != NULL) {
        Sprite* copySprite = Sprite::createWithSpriteFrame(orgSprite->getSpriteFrame());
        if(copySprite != NULL) {
            addChild(copySprite);
            copySprite->setPosition(orgSprite->getPosition());
            auto copySpriteMoveTo = MoveTo::create(1, Vec2(origin.x + visibleSize.width / 2, origin.y + visibleSize.height / 2));
            auto fade = FadeOut::create(1.0);
            
            runAction(Sequence::create(TargetedAction::create(copySprite, copySpriteMoveTo), DelayTime::create(0.5), TargetedAction::create(copySprite, fade), NULL));
            
        }
    }
}

void HelloWorld::moveitemIntoBagAnimation(RPGSprite* item) {
    auto node = CSLoader::createNode("booknode.csb");
    auto pos = Vec2(2300, 1600);
    node->setPosition(pos);
    addChild(node);
    node->setScale(0.2);
    Size visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();
    
    auto jumpTo = MoveTo::create(1, Vec2(origin.x + visibleSize.width / 2, origin.y + visibleSize.height / 2));
    
    auto scaleTo = ScaleTo::create(1, 1);
    cocostudio::timeline::ActionTimeline* anim = CSLoader::createTimeline("booknode.csb");
    node->runAction(anim);
    auto spawn = Spawn::create(scaleTo, jumpTo, NULL);
    auto callbackOpen = CallFunc::create(CC_CALLBACK_0(cocostudio::timeline::ActionTimeline::play, anim, "book_open", false));
    auto callbackClose = CallFunc::create(CC_CALLBACK_0(cocostudio::timeline::ActionTimeline::play, anim, "book_close", false));
    anim->setAnimationEndCallFunc("book_open", CC_CALLBACK_0(HelloWorld::moveItemIntoBag, this, item));
    
    auto fade = FadeOut::create(1.0);
    auto scaleDown = ScaleTo::create(1, 0.2);
    auto jumpBack = MoveTo::create(1, Vec2(2300, 1600));
    auto spawnBack = Spawn::create(scaleDown, jumpBack, NULL);
    
    auto sequence = Sequence::create(TargetedAction::create(node, spawn), callbackOpen, DelayTime::create(3.0), callbackClose, DelayTime::create(1.0), TargetedAction::create(node, spawnBack), DelayTime::create(0.5), TargetedAction::create(node, fade), NULL);
    runAction(sequence);
    
}

void HelloWorld::processChangeSceneMessages(std::vector<MessageContent*>changeSceneMessages) {
    for (std::vector<MessageContent* >::iterator it = changeSceneMessages.begin() ; changeSceneMessages.size() == 1 && it != changeSceneMessages.end(); ++it)
    {
        MessageContent* content = (MessageContent*) *it;
//        CCLOG("content owner %s", content->getOwner().c_str());
        
        if(content != NULL && (content->getCondition().empty() || (!content->getCondition().empty() && content->getConditionSatisfied() == 1)))
        {
            Node* actor = this->mainLayer->getChildByName(content->getOwner());
            RPGSprite* rpgActor = dynamic_cast<RPGSprite *>(actor);
            
            std::string nextScene = rpgActor->getNextScene();
            
            
            if(!nextScene.empty())
            {
                this->changeScene(nextScene, false);                
            }
        }
    }
}

void HelloWorld::transitToMenu(EventCustom * event) {
    std::string &menuName = *(static_cast<std::string*>(event->getUserData()));
    this->cleanUpResources();
    if(menuName == GAME_MAP_MENU) {
        Director::getInstance()->replaceScene(TransitionFade::create(2.0, GameMapScene::createScene(), Color3B::BLACK));
    } else if(menuName == MAP_MENU) {
        Director::getInstance()->replaceScene(TransitionFade::create(2.0, MapScene::createScene(), Color3B::BLACK));
    } else {
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
//    EVENT_DISPATCHER->removeCustomEventListeners(RPGConfig::ON_ALPHAMON_PRESSED_NOTIFICATION);
//    EVENT_DISPATCHER->removeCustomEventListeners(RPGConfig::ON_WORD_INFO_NOTIFICATION);
    
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
    this->cleanUpResources();
    
    if(!nextScene.empty()) {
        if(isMiniGame) {
            this->skeletonCharacter->getSkeletonNode()->stopAllActions();
            Director::getInstance()->replaceScene(TransitionFade::create(3.0, HelloWorld::createScene(nextScene,""), Color3B::BLACK));            
        } else {
            this->skeletonCharacter->getSkeletonNode()->stopAllActions();
            Director::getInstance()->replaceScene(TransitionFade::create(3.0, HelloWorld::createScene(this->getIsland(),nextScene), Color3B::BLACK));
        }
    }
}

//void HelloWorld::changeWordScene(EventCustom * event) {
//    std::string &word = *(static_cast<std::string*>(event->getUserData()));
//    this->cleanUpResources();
//    CCLOG("changeWordScene %s", word.c_str());
//    Director::getInstance()->replaceScene(TransitionFade::create(3.0, WordBoard::createSceneWithWordInIslandAndSceneName(word, this->getIsland(), this->getSceneName()), Color3B::BLACK));
//}


void HelloWorld::processAnimationMessage(std::vector<MessageContent*>animationMessages) {
    
    //CURRENTLY only one animation supported - TBD (later extend to play multiples)
    
    for (std::vector<MessageContent* >::iterator it = animationMessages.begin() ; animationMessages.size() == 1 && it != animationMessages.end(); ++it)
    {
        MessageContent* content = (MessageContent*) *it;
//        CCLOG("content owner %s", content->getOwner().c_str());
        
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
                cocostudio::timeline::ActionTimeline* timeline = NULL;
                bool timeLineExists = false;
                if(animationNode->getActionTimeLine() == NULL) {
                    timeline =  CSLoader::createTimeline(animFile);
                    animationNode->setActionTimeLine(timeline);
                    timeLineExists = false;
                } else {
                    timeline = animationNode->getActionTimeLine();
                    timeLineExists = true;
                }
                
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
                            if(!timeLineExists) {
                                animationNode->getSprite()->runAction(timeline);
                            }
                            
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


void HelloWorld::processCustomAnimationMessage(std::vector<MessageContent*>customAnimationMessages) {
    
    //CURRENTLY only one animation supported - TBD (later extend to play multiples)
//    this->unschedule(CC_SCHEDULE_SELECTOR(HelloWorld::createAlphaMons));
    for (std::vector<MessageContent* >::iterator it = customAnimationMessages.begin() ; customAnimationMessages.size() == 1 && it != customAnimationMessages.end(); ++it)
    {
        MessageContent* content = (MessageContent*) *it;
        //find out animation name
        if(!content->getDialog().empty() && !content->getOwner().empty()) {
            String* alphamonName = String::createWithFormat("sel_%s", content->getOwner().c_str());
            Node* node = this->mainLayer->getChildByName(alphamonName->getCString());
            AlphamonSprite* alphamonAnimationNode = dynamic_cast<AlphamonSprite *>(node);
            if(alphamonAnimationNode) {
                std::string animationMethod = content->getDialog();
                Alphamon* alphamone = alphamonAnimationNode->getAlphaMon();
                
                if(animationMethod == "shakeAction") {
                    auto sequence = Sequence::create(alphamone->shakeAction(), CallFunc::create(std::bind(&HelloWorld::transitionToDuelScene, this, alphamone->getAlphabet())), nullptr);
                    alphamonAnimationNode->runAction(sequence);
                }
            }
            delete content;
        }
    }
}

void HelloWorld::processMessage(std::vector<MessageContent*>*messages) {
    std::unordered_map<int, std::string> textMap;
    std::vector<MessageContent*>showMessages;
    std::vector<MessageContent*>animationMessages;
    std::vector<MessageContent*>customAnimationMessages;
    std::vector<MessageContent*>changeSceneMessages;
    std::string ownerOfMessage;
    
    for (std::vector<MessageContent* >::iterator it = messages->begin() ; it != messages->end(); ++it)
    {
        MessageContent* content = (MessageContent*) *it;
        if(content->getAction() == "say") {
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
        return;
    }

    if(this->getSpeechBubbleAlreadyVisible()) {
        this->sendBubbleDestroySignal();
        return;
    }

    if(this->skeletonCharacter->isJumping || this->skeletonCharacter->isJumpingAttemptedWhileDragging) {

        if(this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->getVelocity().y == 0 )
        {
            this->stateMachine->handleInput(S_STANDING_STATE, cocos2d::Vec2(0,0));
            this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->resetForces();
            this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->setVelocity(Vec2(0,0));
            this->skeletonCharacter->isRunning = false;
            this->skeletonCharacter->isWalking = false;

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
        return;
    }
    
    if(this->getSpeechBubbleAlreadyVisible()) {
        this->sendBubbleDestroySignal();
        return;
    }
    
    if(!this->skeletonCharacter)
    {
        return;
    }
    
    if(this->skeletonCharacter->isJumping)
    {
        if(this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->getVelocity().y == 0 )
        {
            this->stateMachine->handleInput(S_STANDING_STATE, cocos2d::Vec2(0,0));
            this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->resetForces();
            this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->setVelocity(Vec2(0,0));
            this->skeletonCharacter->isRunning = false;
            this->skeletonCharacter->isWalking = false;

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
    CCLOG("contact BEGAN 1111!!! %d", this->stateMachine->getCurrentState()->getState());
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
