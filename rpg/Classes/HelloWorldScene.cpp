
#include <unordered_map>
#include "HelloWorldScene.h"


USING_NS_CC;

Scene* HelloWorld::createScene()
{
    // 'scene' is an autorelease object
    auto scene = Scene::createWithPhysics();
    
    // 'layer' is an autorelease object
    auto layer = HelloWorld::create();
    
    // add layer as a child to scene
    scene->addChild(layer);
    initPhysics(scene);
    
    // return the scene
    return scene;
}

void HelloWorld::initPhysics(Scene* scene)
{
    scene->getPhysicsWorld()->setGravity(Vec2(0.0f, RPG_GRAVITY));
    if(ENABLE_DEBUGDRAW) {
        scene->getPhysicsWorld()->setDebugDrawMask(PhysicsWorld::DEBUGDRAW_ALL);
    }
}

HelloWorld::HelloWorld() {
    this->gesture_layer_ = NULL;
    this->skeletonCharacter = NULL;
    this->sceneSize = Size(0, 0);
    this->mainCharacterCategoryBitMask = 1;
    this->setSpeechBubbleAlreadyVisible(false);
}

HelloWorld::~HelloWorld() {
    delete this->stateMachine;
    delete this->sqlite3Helper;
}

//TODO
void HelloWorld::createRPGGame() {
    //load scene statically for now, later load externally either using XML or JSON
    this->loadGameScene();
    
    //create Main Game Character
    this->addMainCharacterToScene(this->getMainCharacterFile());
    
    this->initializeStateMachine();
}

void HelloWorld::loadGameScene() {
    std::string mainSceneName = this->getBaseDir() + "_MainScene.csb";
    Node *rootNode = CSLoader::createNode(mainSceneName);
    cocostudio::ComExtensionData* rootData = (cocostudio::ComExtensionData*)rootNode->getComponent("ComExtensionData");
    if(rootData != NULL && !rootData->getCustomProperty().empty())
    {
        std::unordered_map<std::string, std::string> sceneAttributes = RPGConfig::parseUserData(rootData->getCustomProperty());
        std::unordered_map<std::string,std::string>::const_iterator it = sceneAttributes.find(DIALOG_FILE);
        if ( it != sceneAttributes.end() ) {
            this->setDialogFile(it->second);
        }


        it = sceneAttributes.find(PHYSICS_FILE);
        if ( it != sceneAttributes.end() ) {
            this->setPhysicsFile(it->second);
        }
        
        it = sceneAttributes.find(MAIN_CHARACTER_FILE);
        if ( it != sceneAttributes.end() ) {
            this->setMainCharacterFile(it->second);
        }
    }
    
    this->setSceneSize(rootNode->getContentSize());
    this->addChild(rootNode);
    this->parseScene(rootNode);
    this->addExternalCharacters(rootNode);
    this->enablePhysicsBoundaries(rootNode);
}


void HelloWorld::parseScene(cocos2d::Node *rootNode) {
    //iterate thru all children
    auto children = rootNode->getChildren();
    
    for (std::vector<Node*>::iterator it = children.begin() ; it != children.end(); ++it) {
        cocos2d::Node* node = *it;
        //based on custom data create layers
        cocostudio::ComExtensionData* data = (cocostudio::ComExtensionData*)node->getComponent("ComExtensionData");
        if(data) {
            CCLOG("%s", data->getCustomProperty().c_str());
            
            if(data->getCustomProperty() == MAIN_LAYER)
            {
                this->mainLayer = node;
            } else if(data->getCustomProperty() == BACK_GROUND_LAYER)
            {
                this->backgroundLayer = node;
            } else if(data->getCustomProperty() == FORE_GROUND_LAYER)
            {
                this->foregroundLayer = node;
            }
        }
    }
}


void HelloWorld::addExternalCharacters(cocos2d::Node *rootNode) {
    auto children = rootNode->getChildren();
    
    for (std::vector<Node*>::iterator it = children.begin() ; it != children.end(); ++it) {
        cocos2d::Node* node = *it;
        //based on custom data create layers
        cocostudio::ComExtensionData* data = (cocostudio::ComExtensionData*)node->getComponent("ComExtensionData");
        if(data != NULL && dynamic_cast<cocostudio::timeline::SkeletonNode *>(node)) {
            //remove node from parent
            //create external skeleton character
            node->removeFromParent();
            std::unordered_map<std::string, std::string> attributes = RPGConfig::parseUserData(data->getCustomProperty());
            
            ExternalSkeletonCharacter* externalSkeletonCharacter = ExternalSkeletonCharacter::create(dynamic_cast<cocostudio::timeline::SkeletonNode *>(node), attributes);

            //check for memory leak ----->>>>
            this->mainLayer->addChild(externalSkeletonCharacter);
            this->externalSkeletons.push_back(externalSkeletonCharacter);
        }
    }
}

void HelloWorld::enablePhysicsBoundaries(Node* rootNode) {
    PhysicsShapeCache::getInstance()->addShapesWithFile(this->getBaseDir()+"/"+this->getPhysicsFile());
    std::regex pattern(".*(_[[:d:]])+");
    for (auto child : rootNode->getChildren()) {
        PhysicsShapeCache::getInstance()->setBodyOnSprite(child->getName(), (Sprite *)child);
        for (auto subChild : child->getChildren()) {
            if(dynamic_cast<Sprite*>(subChild)) {
                Sprite* sprite = dynamic_cast<Sprite*>(subChild);
                if(sprite) {
                    auto matchingName = subChild->getName();
                    if(regex_match(matchingName, pattern)) {
                        std::size_t found = subChild->getName().find_last_of("_");
                        matchingName = matchingName.substr(0,found);                        
                    }
                    PhysicsShapeCache::getInstance()->setBodyOnSprite(matchingName, (Sprite *)subChild);
                    auto body = subChild->getPhysicsBody();
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
    this->stateMachine->addState(S_STANDING_STATE, skeletonCharacter);
    this->stateMachine->addState(S_RUNNING_STATE, skeletonCharacter);
    this->stateMachine->addState(S_JUMPING_STATE, skeletonCharacter);
    this->stateMachine->addState(S_WALKING_STATE, skeletonCharacter);
    this->stateMachine->addState(S_FALLING_STATE, skeletonCharacter);
    
    this->stateMachine->setInitialState(S_STANDING_STATE);
    this->skeletonCharacter->setStateMachine(stateMachine);
}

void HelloWorld::addMainCharacterToScene(const std::string& filename) {
    
    //create Main Game Character
    this->skeletonCharacter = SkeletonCharacter::create(filename);
    this->mainLayer->addChild(this->skeletonCharacter);
    this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->setCategoryBitmask(this->mainCharacterCategoryBitMask);

    auto followAction = Follow::create(this->skeletonCharacter->getSkeletonNode(), Rect(0,0,this->getSceneSize().width, this->getSceneSize().height));
    this->mainLayer->runAction(followAction);
}

void HelloWorld::initGestureLayer() {
    gesture_layer_ = GestureLayer::create(this, callfuncO_selector(HelloWorld::OnGestureReceived));
    this->addChild(gesture_layer_);
}


// on "init" you need to initialize your instance
bool HelloWorld::init()
{
    //////////////////////////////
    // 1. super init first
    if ( !Layer::init() )
    {
        return false;
    }
    
    
    //set up current Base Dir to load resources from
    this->setBaseDir(RPGConfig::initialMainSceneBase);
    
    FileUtils::getInstance()->addSearchPath(this->getBaseDir());
    

    
    this->createRPGGame();
    
    this->initGestureLayer();
    
    this->registerPhysicsEventContactLister();
    
    //load specific sqlite3 file to bind all speakers with events
    
    this->loadSqlite3FileForScene();
    
    this->registerMessageSenderAndReceiver();
    
    this->scheduleUpdate();
    
    
    return true;
}

void HelloWorld::loadSqlite3FileForScene() {
    
    this->sqlite3Helper = Sqlite3Helper::getInstance(this->getBaseDir()+"/"+this->getDialogFile());    
}

void HelloWorld::registerMessageSenderAndReceiver() {
    this->messageSender = MessageSender::getInstance(this->sqlite3Helper);
    this->addChild(this->messageSender);
    
    this->messageReceiver = MessageReceiver::getInstance();
    this->addChild(this->messageReceiver);

    auto updateSpeechBubbleStatus = [=] (EventCustom * event) {
        this->setSpeechBubbleAlreadyVisible(false);
    };
    
    EventListenerCustom* speechBubbleDestroyedEvent = EventListenerCustom::create(RPGConfig::SPEECH_BUBBLE_DESTROYED_NOTIFICATION, updateSpeechBubbleStatus);
    
    EVENT_DISPATCHER->addEventListenerWithSceneGraphPriority(speechBubbleDestroyedEvent, this);

    
    auto processMessageEvent = [=] (EventCustom * event) {
        std::vector<MessageContent*>*messages = reinterpret_cast<std::vector<MessageContent*>*>(event->getUserData());
        this->processMessage(messages);
    };
    
    PROCESS_MESSAGE_AND_CREATE_UI(this, RPGConfig::PROCESS_CUSTOM_MESSAGE_AND_CREATE_UI_NOTIFICATION, processMessageEvent);
}


void HelloWorld::processMessage(std::vector<MessageContent*>*messages) {
    std::unordered_map<int, std::string> textMap;
    std::string ownerOfMessage;
    for (std::vector<MessageContent* >::iterator it = messages->begin() ; it != messages->end(); ++it)
    {
        MessageContent* content = (MessageContent*) *it;
        ownerOfMessage = content->getOwner();
        textMap.insert({content->getEventId(),content->getDialog()});
        delete content;
    }
    
    
    assert(!ownerOfMessage.empty());
    assert(!textMap.empty());
    
    //find node based on ownerOfMessage
    auto selectedNode = this->mainLayer->getChildByName(ownerOfMessage);
    assert(selectedNode != NULL);
    
    //do dynamic cast
    bool isExternalCharacter = dynamic_cast<ExternalSkeletonCharacter *>(selectedNode);
    bool isSkeletonCharacter = dynamic_cast<SkeletonCharacter *>(selectedNode);
    if(isExternalCharacter) {
        ExternalSkeletonCharacter* character = dynamic_cast<ExternalSkeletonCharacter *>(selectedNode);
        Point touch_point = character->convertToWorldSpace(character->getExternalSkeletonNode()->getPosition());
        SpeechBubbleView* speechBubble = SpeechBubbleView::create(textMap, Point(touch_point.x, touch_point.y + character->getExternalSkeletonNode()->getBoundingBox().size.height));
        
        this->addChild(speechBubble, 1);
        
    } else if(isSkeletonCharacter) {
        Point touch_point = this->skeletonCharacter->convertToWorldSpace(this->skeletonCharacter->getSkeletonNode()->getPosition());
        
        SpeechBubbleView* speechBubble = SpeechBubbleView::create(textMap, Point(touch_point.x, touch_point.y + this->skeletonCharacter->getSkeletonNode()->getBoundingBox().size.height));
        
        this->addChild(speechBubble, 1);
        
    }
}

void HelloWorld::update(float dt) {
    
    if(this->skeletonCharacter->getSkeletonInContactWithGround())
    {
        if(this->skeletonCharacter->isWalking) {
            this->flipSkeletonDirection(this->currentTouchPoint, this->skeletonCharacter->getSkeletonNode());
            if(checkTouchLeftOfCharacter(this->currentTouchPoint, this->skeletonCharacter->getSkeletonNode())) {
                this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->setVelocity(Vec2(-MAIN_CHARACTER_FORCE,GRAVITY_VELOCITY_TO_STICK_TO_GROUND));
            } else if (checkTouchRightOfCharacter(this->currentTouchPoint, this->skeletonCharacter->getSkeletonNode())) {
                this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->setVelocity(Vec2(MAIN_CHARACTER_FORCE,GRAVITY_VELOCITY_TO_STICK_TO_GROUND));
            }
            
            
        } else if(this->skeletonCharacter->isRunning) {
            this->flipSkeletonDirection(this->currentTouchPoint, this->skeletonCharacter->getSkeletonNode());
            if(checkTouchLeftOfCharacter(this->currentTouchPoint, this->skeletonCharacter->getSkeletonNode())) {
                this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->setVelocity(Vec2(-MAIN_CHARACTER_RUNNING_FORCE,GRAVITY_VELOCITY_TO_STICK_TO_GROUND));
            } else if (checkTouchRightOfCharacter(this->currentTouchPoint, this->skeletonCharacter->getSkeletonNode())) {
                this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->setVelocity(Vec2(MAIN_CHARACTER_RUNNING_FORCE,GRAVITY_VELOCITY_TO_STICK_TO_GROUND));
            }
            
            
        }
    } else {
        if(this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->getVelocity().y <= 0 && (this->skeletonCharacter->isRunning || this->skeletonCharacter->isWalking)) {
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
    
    this->moveBackGroundLayerInParallex();
    
}


void HelloWorld::moveBackGroundLayerInParallex() {
    this->backgroundLayer->setPositionX(this->mainLayer->getPosition().x * HORIZONTAL_PARALLEX_RATIO);
    this->backgroundLayer->setPositionY(this->mainLayer->getPosition().y * VERTICAL_PARALLEX_RATIO);
    this->foregroundLayer->setPositionX(this->mainLayer->getPosition().x);
    this->foregroundLayer->setPositionY(this->mainLayer->getPosition().y);
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
            
        case E_GESTURE_SWIPE_LEFT:
            HandleSwipeLeft(gesture_layer->GetTouchEnd());
            break;
            
        case E_GESTURE_SWIPE_RIGHT:
            HandleSwipeRight(gesture_layer->GetTouchEnd());
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
    //Rect characterBoundingRect = characterNode->getBoundingBox();
    Rect characterBoundingRect = Rect(characterNode->getBoundingBox().origin.x, characterNode->getBoundingBox().origin.y, HUMAN_SKELETON_COLLISION_BOX_WIDTH, HUMAN_SKELETON_COLLISION_BOX_WIDTH);
    
    if(characterBoundingRect.containsPoint(characterNode->getParent()->convertToNodeSpace(point))) {
        CCLOG("%s", "touch on Character");
        if(this->skeletonCharacter->isRunning || this->skeletonCharacter->isWalking)
        {
            this->stateMachine->handleInput(S_STANDING_STATE, cocos2d::Vec2(0,0));
            this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->resetForces();
            this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->setVelocity(Vec2(0,0));
        }
        
        //change mouse to different image
        return true;
    }
    
    return false;
}

bool HelloWorld::checkTouchVerticallyUpOnBoundsOfCharacter(Point point, cocostudio::timeline::SkeletonNode* characterNode)
{
    //find out touch Location
    Vec2 characterPosition = characterNode->getParent()->convertToWorldSpace(characterNode->getPosition());
    Rect characterBoundingRect = characterNode->getBoundingBox();
    
    Rect boundingRectUpCharacter = Rect((characterPosition.x - characterBoundingRect.size.width/2), characterPosition.y, characterBoundingRect.size.width, (Director::getInstance()->getWinSize().height - characterPosition.y));
    
    if(boundingRectUpCharacter.containsPoint(point)) {
        return true;
    }
    
    return false;
}


void HelloWorld::flipSkeletonDirection(Point point, cocostudio::timeline::SkeletonNode* characterNode)
{
    //find out touch Location
    Vec2 characterPosition = characterNode->getParent()->convertToWorldSpace(characterNode->getPosition());
    auto scaleX = this->skeletonCharacter->getSkeletonNode()->getScaleX();
    if(point.x < characterPosition.x) {
        if(scaleX < 0) {
            scaleX = -scaleX;
        }
    } else if(point.x > characterPosition.x) {
        if(scaleX > 0) {
            scaleX = -scaleX;
        }
    }
    this->skeletonCharacter->getSkeletonNode()->setScaleX(scaleX);
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
    
    Rect boundingLeftRect = Rect((characterPosition.x - characterBoundingRect.size.width/2 - 2 * characterBoundingRect.size.width), 0, 2 * characterBoundingRect.size.width, characterPosition.y + characterBoundingRect.size.height);
    
    if(boundingLeftRect.containsPoint(point)) {
        CCLOG("%s", "left walking area on hold");
        //change mouse to different image
        return true;
    }
    
    Rect boundingRightRect = Rect((characterPosition.x + characterBoundingRect.size.width/2), 0, 2 * characterBoundingRect.size.width, characterPosition.y + characterBoundingRect.size.height);
    
    if(boundingRightRect.containsPoint(point)) {
        CCLOG("%s", "right walking area on hold");
        //change mouse to different image
        return true;
    }
    
    return false;
}


bool HelloWorld::checkHoldWithinSittingLimitOfCharacter(Point point, cocostudio::timeline::SkeletonNode* characterNode)
{
    //find out touch Location
    Vec2 characterPosition = characterNode->getParent()->convertToWorldSpace(characterNode->getPosition());
    Rect characterBoundingRect = characterNode->getBoundingBox();
    
    Rect boundingSittingRect = Rect((characterPosition.x - characterBoundingRect.size.width/2), 0,  characterBoundingRect.size.width, characterPosition.y);
    
    if(boundingSittingRect.containsPoint(point)) {
        CCLOG("%s", "sitting area on hold");
        //change mouse to different image
        return true;
    }
    
    
    return false;
}

void HelloWorld::HoldOrDragBehaviour(Point position) {
    
    if(this->isTapOnSpeakableObject(position)) {
        return;
    }

    if(this->skeletonCharacter->isJumping || this->skeletonCharacter->isJumpingAttemptedWhileDragging) {
        return;
    }
    
    
    if(this->skeletonCharacter->getSkeletonInContactWithGround())
    {
        Vec2 characterPosition = this->skeletonCharacter->getSkeletonNode()->getParent()->convertToWorldSpace(this->skeletonCharacter->getSkeletonNode()->getPosition());
        
        if(position.y >= 0 && position.y <= characterPosition.y + this->skeletonCharacter->getSkeletonNode()->getBoundingBox().size.height) {
            //if within sitting boundary then sit
            //elseif within walking boundary then walk
            //else run
            //0nly LEFT/RIGHT Horizontal force
            
            if(checkHoldWithinSittingLimitOfCharacter(position, this->skeletonCharacter->getSkeletonNode()))
            {
                CCLOG("%s", "Withing sitting area");
            }
            else if(checkHoldWithinWalkLimitOfCharacter(position, this->skeletonCharacter->getSkeletonNode())) {
                CCLOG("%s", "Withing walking area");
                this->flipSkeletonDirection(position, this->skeletonCharacter->getSkeletonNode());
                this->walkCharacterOnLeftOrRightDirection(position);
            } else {
                CCLOG("%s", "Withing running area");
                this->flipSkeletonDirection(position, this->skeletonCharacter->getSkeletonNode());
                this->runCharacterOnLeftOrRightDirection(position);
            }
            
        } else {
            //Same Force as TAP

            if(this->skeletonCharacter->isJumping || this->skeletonCharacter->isJumpingAttemptedWhileDragging) {
                return;
            }
            CCLOG("%s", "HOLDING WITH DRAG EFFECT..............");
            this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->resetForces();
            this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->setVelocity(Vec2(0,0));
            this->flipSkeletonDirection(position, this->skeletonCharacter->getSkeletonNode());
            this->HandleJumpWithContinueousRotation();
            this->skeletonCharacter->isJumpingAttemptedWhileDragging = true;
            
        }
        
    } else {
        //animate JUMP Down
    }
}

//Handle Tap
void HelloWorld::HandleHold(Point position)
{
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
    
    Vec2 characterPosition = this->skeletonCharacter->getSkeletonNode()->getParent()->convertToWorldSpace(this->skeletonCharacter->getSkeletonNode()->getPosition());
    
    if(checkTouchLeftOfCharacter(position, this->skeletonCharacter->getSkeletonNode())) {
        this->stateMachine->handleInput(S_RUNNING_STATE, Vec2(-MAIN_CHARACTER_RUNNING_FORCE, GRAVITY_VELOCITY_TO_STICK_TO_GROUND));
        CCLOG("%s", "Only Run Left!!!");
        this->skeletonCharacter->isRunning = true;
    } else if (checkTouchRightOfCharacter(position, this->skeletonCharacter->getSkeletonNode())) {
        this->stateMachine->handleInput(S_RUNNING_STATE, Vec2(MAIN_CHARACTER_RUNNING_FORCE, GRAVITY_VELOCITY_TO_STICK_TO_GROUND));
        CCLOG("%s", "Only Run Right!!!");
        this->skeletonCharacter->isRunning = true;
    }
    
}

void HelloWorld::scheduleJumpUpEndCall(float timeToStart) {
    this->scheduleOnce(schedule_selector(HelloWorld::startJumpUpEndingAnimation), timeToStart);
}


void HelloWorld::scheduleContinuousRotationCall(float timeToStart) {
    this->scheduleOnce(schedule_selector(HelloWorld::startContinuousRoationAnimation), timeToStart);
}


void HelloWorld::applyImpulseOnSkeletonToJumpOnHoldOrDrag(Point position) {
    CCLOG("%s", "applyImpulseOnSkeletonToJumpOnHoldOrDrag");
    Vec2 characterPosition = this->skeletonCharacter->getSkeletonNode()->getParent()->convertToWorldSpace(this->skeletonCharacter->getSkeletonNode()->getPosition());
    CCLOG("width %f", this->skeletonCharacter->getSkeletonNode()->getBoundingBox().size.width);
    CCLOG("height %f", this->skeletonCharacter->getSkeletonNode()->getBoundingBox().size.height);
    float angle = RPGConfig::calcuateAngleForJump(position, characterPosition, 0.0f, 0.0f);
    float value = RPGConfig::calcuateVelocityForJump(position, characterPosition, angle, 0.0f, 0.0f);
    float timeToStart = RPGConfig::calcuateTimeToStartJumpUpAnimation(value, angle, JUMP_UP_ENDING_ANIMATION_FRAMES);
    
    this->scheduleContinuousRotationCall(0.0f);
    this->applyImpulseOnSkeletonToJump(position, angle, value, timeToStart);
    
    
}

void HelloWorld::applyImpulseOnSkeletonToJumpOnTap(Point position) {
    CCLOG("%s", "applyImpulseOnSkeletonToJumpOnTap");
    Vec2 characterPosition = this->skeletonCharacter->getSkeletonNode()->getParent()->convertToWorldSpace(this->skeletonCharacter->getSkeletonNode()->getPosition());
    CCLOG("width %f", this->skeletonCharacter->getSkeletonNode()->getBoundingBox().size.width);
    CCLOG("height %f", this->skeletonCharacter->getSkeletonNode()->getBoundingBox().size.height);

    float angle = RPGConfig::calcuateAngleForJump(position, characterPosition, 0.0f, 0.0f);
    float value = RPGConfig::calcuateVelocityForJump(position, characterPosition, angle, 0.0f, 0.0f);
    CCLOG("impluse on jump %f", value);
    float timeToStart = RPGConfig::calcuateTimeToStartJumpUpAnimation(value, angle, JUMP_UP_ENDING_ANIMATION_FRAMES);
    
    this->scheduleJumpUpEndCall(timeToStart);
    this->applyImpulseOnSkeletonToJump(position, angle, value, timeToStart);    
}

void HelloWorld::applyImpulseOnSkeletonToJump(Point position, float angle, float value, float timeToStart) {
    CCLOG("%s", "applyImpulseOnSkeletonToJump");
    
    if(checkTouchLeftOfCharacter(position, this->skeletonCharacter->getSkeletonNode())) {
        this->stateMachine->handleInput(S_JUMPING_STATE, Vec2(-value * cos(angle * PI/RADIAN_TO_DEGREE), -value * sin(angle * PI/RADIAN_TO_DEGREE)));
        
    } else if (checkTouchRightOfCharacter(position, this->skeletonCharacter->getSkeletonNode())) {
        this->stateMachine->handleInput(S_JUMPING_STATE, Vec2(value * cos(angle * PI/RADIAN_TO_DEGREE), value * sin(angle * PI/RADIAN_TO_DEGREE)));
    }
}

void HelloWorld::startJumpUpEndingAnimation(float dt) {
    this->skeletonCharacter->isJumpingUp = true;
    this->skeletonCharacter->playJumpingUpEndingAnimation();
}


void HelloWorld::startContinuousRoationAnimation(float dt) {
    this->skeletonCharacter->isJumpingUp = true;
    this->skeletonCharacter->isPlayingContinousRotationWhileJumping = true;
    this->skeletonCharacter->playJumpingContinuousRotationAnimation();
}

bool HelloWorld::isTapOnSpeakableObject(Point position) {
    
        if(this->getSpeechBubbleAlreadyVisible()) {
            return false;
        }
    
        for (std::vector<ExternalSkeletonCharacter*>::iterator it = this->externalSkeletons.begin() ; it != this->externalSkeletons.end(); ++it)
        {
            ExternalSkeletonCharacter* eSkeleton = *it;
            if(eSkeleton->getCanSpeak() == "true" && eSkeleton->getExternalSkeletonNode()->getBoundingBox().containsPoint(eSkeleton->getExternalSkeletonNode()->getParent()->convertToNodeSpace(position))) {
                CCLOG("%s", "CLICKED ON Spekable External Skeleton dispatching speech message");
                std::string s(eSkeleton->getKey());
                EVENT_DISPATCHER->dispatchCustomEvent(RPGConfig::SPEECH_MESSAGE_ON_TAP_NOTIFICATION, static_cast<void*>(&s));
                this->setSpeechBubbleAlreadyVisible(true);
                return true;
            }
        }

    return false;
}

//Handle Tap
void HelloWorld::HandleTap(Point position)
{
    if(this->isTapOnSpeakableObject(position)) {
        //later launch custom event
        return;
    }
    if(this->skeletonCharacter->isJumping || this->skeletonCharacter->isRunning || this->skeletonCharacter->isWalking) {
        return;
    }
    
    if(checkTouchWithinBoundsOfCharacter(position, this->skeletonCharacter->getSkeletonNode())) {
        return;
    };
    
    CCLOG("%s", "Handle Tap!!!");
    this->flipSkeletonDirection(this->currentTouchPoint, this->skeletonCharacter->getSkeletonNode());
    this->HandleJumpWithAnimation();
}

void HelloWorld::HandlePostJumpUpAnimation() {
    this->skeletonCharacter->getSkeletonActionTimeLine()->clearLastFrameCallFunc();
    this->skeletonCharacter->getSkeletonActionTimeLine()->clearFrameEndCallFuncs();
    this->applyImpulseOnSkeletonToJumpOnTap(this->currentTouchPoint);
}


void HelloWorld::HandlePostJumpUpWithRotationAnimation() {
    this->skeletonCharacter->getSkeletonActionTimeLine()->clearLastFrameCallFunc();
    this->skeletonCharacter->getSkeletonActionTimeLine()->clearFrameEndCallFuncs();
    this->applyImpulseOnSkeletonToJumpOnHoldOrDrag(this->currentTouchPoint);
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
    if(checkTouchWithinBoundsOfCharacter(position, this->skeletonCharacter->getSkeletonNode())) {
        return;
    };
    
    CCLOG("%s", "Handle Drag Up!!!");
    
    if(checkTouchVerticallyUpOnBoundsOfCharacter(position, this->skeletonCharacter->getSkeletonNode()))
    {
        stateMachine->handleInput(S_JUMPING_STATE, Vec2(0, MAIN_CHARACTER_VERTICAL_IMPULSE));
    }
}

//Handle Swipe Down
void HelloWorld::HandleSwipeDown(Point position) {
    if(checkTouchWithinBoundsOfCharacter(position, this->skeletonCharacter->getSkeletonNode())) {
        return;
    };
    
    //CCLOG("%s", "Handle Drag Down!!!");
    //go to standing and kill all force
}


//Handle Swipe Left
void HelloWorld::HandleSwipeLeft(Point position) {
    if(checkTouchWithinBoundsOfCharacter(position, this->skeletonCharacter->getSkeletonNode())) {
        return;
    };
    
    //CCLOG("%s", "Handle Drag Left!!!");
    
    this->HoldOrDragBehaviour(position);
}

void HelloWorld::HandleTouchedEnded(Point position) {
    CCLOG("%s", "HandleTouchedEnded!!!");
    if(!this->skeletonCharacter->isJumping) {
        if(this->skeletonCharacter->isRunning) {
            this->stateMachine->handleInput(S_STANDING_STATE, cocos2d::Vec2(0,0));
            this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->resetForces();
            this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->setVelocity(Vec2(0,0));
            
        } else if(this->skeletonCharacter->getSkeletonInContactWithGround() || this->skeletonCharacter->isWalking) {
            this->stateMachine->handleInput(S_STANDING_STATE, cocos2d::Vec2(0,0));
            this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->resetForces();
            this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->setVelocity(Vec2(0,0));
            
        }
        
        this->skeletonCharacter->isWalking = false;
        this->skeletonCharacter->isRunning = false;
        this->stateMachine->handleInput(S_STANDING_STATE, cocos2d::Vec2(0,0));
    }
}

//Handle Swipe Right
void HelloWorld::HandleSwipeRight(Point position) {
    
    if(checkTouchWithinBoundsOfCharacter(position, this->skeletonCharacter->getSkeletonNode())) {
        return;
    };
    
    //CCLOG("%s", "Handle Drag Right!!!");
    
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
    CCLOG("contact BEGAN Main Skeleton!!!");
    if(nodeA->getName() == HUMAN_SKELETON_NAME || nodeB->getName() == HUMAN_SKELETON_NAME)
    {
        if(this->skeletonCharacter->didSkeletonContactBeginDuringJumpingUp(contact, this->stateMachine->getCurrentState()->getState())) {
            return false;
        }
        
        
        if(this->stateMachine != NULL && this->stateMachine->getCurrentState() != NULL)
        {
            if(this->stateMachine->getCurrentState()->getState() == S_JUMPING_STATE)
            {
                //made contact with ground - assumption this point
                if(this->skeletonCharacter->isJumpingAttemptedWhileDragging && this->skeletonCharacter->isPlayingContinousRotationWhileJumping) {
                    //CCLOG("%s", "contact began after jump => while dragging");
                    
                    //                    this->getSkeletonActionTimeLine()->setTimeSpeed(2.0f);
                    //                    std::function<void(void)> jumpEndingAnimation = std::bind(&SkeletonCharacter::HandlePostJumpDownEndingAnimation, this);
                    //
                    //                    this->getSkeletonActionTimeLine()->setAnimationEndCallFunc(ROTATE_SKELETON, jumpEndingAnimation);
                    
                    this->skeletonCharacter->getSkeletonActionTimeLine()->play(ROTATE_SKELETON, false);
                    
                    this->skeletonCharacter->isPlayingContinousRotationWhileJumping = false;
                    
                    this->stateMachine->handleInput(S_STANDING_STATE, cocos2d::Vec2(0,0));
                    this->skeletonCharacter->isRunning = false;
                    this->skeletonCharacter->isWalking = false;
                    
                    
                } else {
                    //CCLOG("%s", "contact began after jump => NOOOOOOO dragging");
                    std::function<void(void)> jumpEndingAnimation = std::bind(&SkeletonCharacter::HandlePostJumpDownEndingAnimation, this->skeletonCharacter);
                    
                    this->skeletonCharacter->getSkeletonActionTimeLine()->setAnimationEndCallFunc(JUMP_END, jumpEndingAnimation);
                    this->skeletonCharacter->getSkeletonActionTimeLine()->play(JUMP_END, false);
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
    
    if(isSkeletonNodeA && contact.getShapeB()->getCollisionBitmask() == 3) {
        CCLOG("contact BEGAN external sekleton!!!");
        nodeA->setScaleX(-nodeA->getScaleX());
        RPGConfig::externalSkeletonMoveDelta = -RPGConfig::externalSkeletonMoveDelta;
        
    } else if(isSkeletonNodeB && contact.getShapeA()->getCollisionBitmask() == 3) {
        CCLOG("contact BEGAN external sekleton!!!");
        nodeB->setScaleX(-nodeB->getScaleX());
        RPGConfig::externalSkeletonMoveDelta = -RPGConfig::externalSkeletonMoveDelta;

        
    }

    return true;
}

void HelloWorld::registerPhysicsEventContactLister() {
    auto contactListener = EventListenerPhysicsContact::create();
    contactListener->onContactBegin = [=](PhysicsContact &contact) -> bool
    {
        // We we handle what happen when character collide with something else
        // if we return true, we say: collision happen please. => Top-Down Char Jump
        // otherwise, we say the engine to ignore this collision => Bottom-Up Char Jump
        //CCLOG("contact BEGAN!!! %d", this->stateMachine->getCurrentState()->getState());
        cocos2d::Node* nodeA = contact.getShapeA()->getBody()->getNode();
        cocos2d::Node* nodeB = contact.getShapeB()->getBody()->getNode();
        
        
//        CCLOG("nodeA name %s", nodeA->getName().c_str());
//        CCLOG("nodeB name %s", nodeB->getName().c_str());
        
        
        //Dynamic cast
        bool isSkeletonNodeA = dynamic_cast<cocostudio::timeline::SkeletonNode *>(nodeA);
        bool isSkeletonNodeB = dynamic_cast<cocostudio::timeline::SkeletonNode *>(nodeB);
        
        if(isSkeletonNodeA || isSkeletonNodeB)
        {
            if(nodeA->getName() == HUMAN_SKELETON_NAME || nodeB->getName() == HUMAN_SKELETON_NAME)
            {
                return this->handlePhysicsContactEventForMainCharacter(contact, nodeA, nodeB);
            } else {
                return this->handlePhysicsContactEventForOtherSkeletonCharacter(contact, nodeA, nodeB);
            }
        }

        return true;
    };
    
    
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
