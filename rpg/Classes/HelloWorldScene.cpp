    #include "HelloWorldScene.h"
#include "ui/CocosGUI.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "editor-support/cocostudio/ActionTimeline/CCSkeletonNode.h"
#include "PhysicsShapeCache.h"
#include "GestureLayer.hpp"
#include <cmath>
#include <map>
#include <typeinfo>
#include <regex>

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
    gesture_layer_ = NULL;
    skeletonCharacter = NULL;
    sceneSize = Size(0, 0);
}

HelloWorld::~HelloWorld() {
    delete skeletonCharacter;
    delete stateMachine;
}

//TODO
void HelloWorld::createRPGGame() {
    //load scene statically for now, later load externally either using XML or JSON
    loadGameScene();
    
    //create character
    //cocostudio::timeline::SkeletonNode* mainGameCharacter = createMainGameCharacter();
    createSkeletonCharacter();
    cocostudio::timeline::SkeletonNode* mainGameCharacter = skeletonCharacter->getSkeletonNode();
    addMainCharacterToScene(mainGameCharacter);
    initializeStateMachine();
}

void HelloWorld::loadGameScene() {
    Node *rootNode = CSLoader::createNode("MainScene.csb");
    this->setSceneSize(rootNode->getContentSize());
    this->addChild(rootNode);
    enablePhysicsBoundaries(rootNode);
}


void HelloWorld::enablePhysicsBoundaries(Node* rootNode) {
//    PhysicsShapeCache::getInstance()->addShapesWithFile("story.plist");
    PhysicsShapeCache::getInstance()->addShapesWithFile("farm_house.plist");
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
                    CCLOG("matching name: %s", matchingName.c_str());
                    PhysicsShapeCache::getInstance()->setBodyOnSprite(matchingName, (Sprite *)subChild);
                    auto body = subChild->getPhysicsBody();
                    if(body) {
//                        CCLOG("category mask %d", body->getCategoryBitmask());    
                    }
                    
                }
            }
        }
    }
}

void HelloWorld::createSkeletonCharacter() {
    skeletonCharacter = new SkeletonCharacter();
    skeletonCharacter->createSkeletonNode("human_skeleton.csb");
    
    
}


void HelloWorld::initializeStateMachine() {
    stateMachine = StateMachine::getInstance();
    stateMachine->addState(S_STANDING_STATE, skeletonCharacter);
    stateMachine->addState(S_RUNNING_STATE, skeletonCharacter);
    stateMachine->addState(S_JUMPING_STATE, skeletonCharacter);
    stateMachine->addState(S_WALKING_STATE, skeletonCharacter);
    stateMachine->addState(S_FALLING_STATE, skeletonCharacter);
    
    stateMachine->setInitialState(S_STANDING_STATE);
    this->skeletonCharacter->setStateMachine(stateMachine);
}

void HelloWorld::addMainCharacterToScene(cocostudio::timeline::SkeletonNode* skeletonNode) {
    auto visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();
    
    skeletonNode->setPosition(Vec2(origin.x + visibleSize.width/2, origin.y + visibleSize.height/2));
    
    this->addChild(skeletonNode);
    
    //change
    auto followAction = Follow::create(skeletonNode, Rect(0,0,this->getSceneSize().width, this->getSceneSize().height));
    this->runAction(followAction);
    
    
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
    
    createRPGGame();
    
    initGestureLayer();
    
    this->scheduleUpdate();
    
    
    return true;
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
        if(this->skeletonCharacter->isRunning || this->skeletonCharacter->isWalking) {
            this->stateMachine->handleInput(S_FALLING_STATE, cocos2d::Vec2(0,0));
        }
    }
    
    if(this->skeletonCharacter->isJumping)
    {
        if(this->skeletonCharacter->isJumpingUp &&
           this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->getVelocity().y <=0) {
            this->skeletonCharacter->isJumpingUp = false;
            if(!this->skeletonCharacter->isPlayingContinousRotationWhileJumping)
            {
                this->skeletonCharacter->getSkeletonActionTimeLine()->play(JUMP_END, false);                
            }
            
        }
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
    Rect characterBoundingRect = characterNode->getBoundingBox();
    
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
                //CCLOG("%s", "Withing walking area");
                this->flipSkeletonDirection(position, this->skeletonCharacter->getSkeletonNode());
                this->walkCharacterOnLeftOrRightDirection(position);
            } else {
                CCLOG("%s", "Withing running area");
                this->flipSkeletonDirection(position, this->skeletonCharacter->getSkeletonNode());
                this->runCharacterOnLeftOrRightDirection(position);
            }
            
        } else {
            //Same Force as TAP
            CCLOG("this->skeletonCharacter->isJumping %d", this->skeletonCharacter->isJumping);
            CCLOG("this->skeletonCharacter->isJumpingAttemptedWhileDragging %d", this->skeletonCharacter->isJumpingAttemptedWhileDragging);
            if(this->skeletonCharacter->isJumping || this->skeletonCharacter->isJumpingAttemptedWhileDragging) {
                return;
            }
            CCLOG("%s", "HOLDING WITH DRAG EFFECT..............");
            this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->resetForces();
            this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->setVelocity(Vec2(0,0));
            this->flipSkeletonDirection(position, this->skeletonCharacter->getSkeletonNode());
            //this->HandleJumpWithAnimation();
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
    
    Vec2 characterPosition = this->skeletonCharacter->getSkeletonNode()->getParent()->convertToWorldSpace(this->skeletonCharacter->getSkeletonNode()->getPosition());
    
    if(checkTouchLeftOfCharacter(position, this->skeletonCharacter->getSkeletonNode())) {
        this->stateMachine->handleInput(S_WALKING_STATE, Vec2(-MAIN_CHARACTER_FORCE, 0));
        this->skeletonCharacter->isWalking = true;
        
    } else if (checkTouchRightOfCharacter(position, this->skeletonCharacter->getSkeletonNode())){
        this->stateMachine->handleInput(S_WALKING_STATE, Vec2(MAIN_CHARACTER_FORCE, 0));
        this->skeletonCharacter->isWalking = true;
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
    
    float angle = RPGConfig::calcuateAngleForJump(position, characterPosition);
    float value = RPGConfig::calcuateVelocityForJump(position, characterPosition);
    float timeToStart = RPGConfig::calcuateTimeToStartJumpUpAnimation(value, angle, JUMP_UP_ENDING_ANIMATION_FRAMES);
    
    this->scheduleContinuousRotationCall(0.0f);
    this->applyImpulseOnSkeletonToJump(position, angle, value, timeToStart);
    
    
}

void HelloWorld::applyImpulseOnSkeletonToJumpOnTap(Point position) {
    CCLOG("%s", "applyImpulseOnSkeletonToJumpOnTap");
    Vec2 characterPosition = this->skeletonCharacter->getSkeletonNode()->getParent()->convertToWorldSpace(this->skeletonCharacter->getSkeletonNode()->getPosition());
    
    float angle = RPGConfig::calcuateAngleForJump(position, characterPosition);
    float value = RPGConfig::calcuateVelocityForJump(position, characterPosition);
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


//Handle Tap
void HelloWorld::HandleTap(Point position)
{
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
    if(this->skeletonCharacter->isRunning) {
        
        CCLOG("%s", "HandleTouchedEnded => on Ground!!! while running");
        std::map<std::string,std::string> multiAnimationMap;
        multiAnimationMap.insert(std::pair<std::string,std::string>("stop","idle"));
        
        this->stateMachine->handleInput(S_STANDING_STATE, cocos2d::Vec2(0,0), multiAnimationMap);
        this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->resetForces();
        this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->setVelocity(Vec2(0,0));
        
    } else if(this->skeletonCharacter->getSkeletonInContactWithGround() || this->skeletonCharacter->isWalking) {
        this->stateMachine->handleInput(S_STANDING_STATE, cocos2d::Vec2(0,0));
        this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->resetForces();
        this->skeletonCharacter->getSkeletonNode()->getPhysicsBody()->setVelocity(Vec2(0,0));
        
    }
    
    this->skeletonCharacter->isWalking = false;
    this->skeletonCharacter->isRunning = false;
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

