#ifndef __HELLOWORLD_SCENE_H__
#define __HELLOWORLD_SCENE_H__


#include "cocos2d.h"
#include "editor-support/cocostudio/ActionTimeline/CCSkeletonNode.h"
#include "RPGConfig.h"
#include "SkeletonCharacter.h"
#include "ExternalSkeletonCharacter.h"
#include "StateMachine.h"
#include "Sqlite3Helper.hpp"
#include "MessageSender.hpp"
#include "MessageReceiver.hpp"
#include "ui/CocosGUI.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "editor-support/cocostudio/ActionTimeline/CCSkeletonNode.h"
#include "PhysicsShapeCache.h"
#include "GestureLayer.hpp"
#include <cmath>
#include <map>
#include <typeinfo>
#include <regex>
#include "editor-support/cocostudio/CCComExtensionData.h"
#include "ExternalSkeletonCharacter.h"
#include "SpeechBubbleView.hpp"
#include "MessageContent.hpp"
#include "RPGSprite.h"
#include "AlphamonSprite.h"
#include "alphamon/Alphamon.h"
#include "SkeletonPosition.h"



class GestureLayer;
class MessageContent;

#define MAIN_CHARACTER_FILE "human_skeleton.csb"


class HelloWorld : public cocos2d::Layer
{
private:
    //member variables
    
    cocos2d::Point currentTouchPoint;
    
    cocos2d::Sprite* showTouchSignNode;
    
    GestureLayer* gesture_layer_;
    
    StateMachine* stateMachine;
    
    Sqlite3Helper* sqlite3Helper;
    
    MessageSender* messageSender;
    
    MessageReceiver* messageReceiver;
    
    SkeletonCharacter* skeletonCharacter;
    
    void loadGameScene();
    
    void enablePhysicsBoundaries(Node* rootNode);
    
    cocostudio::timeline::SkeletonNode* createMainGameCharacter();
    
    void addMainCharacterToScene(const std::string& filename);
    
    void updatePositionForMainCharacter();
    
    void initGestureLayer();
    
    static void initPhysics(cocos2d::Scene* scene);
    
    void startJumpUpEndingAnimation(float dt);
    
    void startContinuousRoationAnimation(float dt);
    
    void update(float dt);
    
    void initializeStateMachine();
    
    bool checkTouchWithinBoundsOfCharacter(cocos2d::Point point, cocostudio::timeline::SkeletonNode* characterNode);
    
    bool checkTouchVerticallyUpOnBoundsOfCharacter(cocos2d::Point point, cocostudio::timeline::SkeletonNode* characterNode);
    
    bool checkTouchLeftOfCharacter(cocos2d::Point point, cocostudio::timeline::SkeletonNode* characterNode);
    
    bool checkTouchRightOfCharacter(cocos2d::Point point, cocostudio::timeline::SkeletonNode* characterNode);
    
    bool checkHoldWithinWalkLimitOfCharacter(cocos2d::Point point, cocostudio::timeline::SkeletonNode* characterNode);
    
    bool checkHoldWithinSittingLimitOfCharacter(cocos2d::Point point, cocostudio::timeline::SkeletonNode* characterNode);
    
    void applyImpulseOnSkeletonToJumpOnHoldOrDrag(cocos2d::Point position);
    
    void applyImpulseOnSkeletonToJumpOnTap(cocos2d::Point position);
    
    void applyImpulseOnSkeletonToJump(cocos2d::Point position, float angle, float velocity, float timeToStart);
    
    void walkCharacterOnLeftOrRightDirection(cocos2d::Point position);
    
    void runCharacterOnLeftOrRightDirection(cocos2d::Point position);
    
    void HoldOrDragBehaviour(cocos2d::Point position);
    
    void scheduleContinuousRotationCall(float timeToStart);
    
    void moveBackGroundLayerInParallex();
    
    void setReferencesToGameLayers(cocos2d::Node *rootNode);
        
    void processMessage(std::vector<MessageContent*>*messages);
    
    void processTextMessage(std::unordered_map<int, std::string> textMap, std::string ownerOfMessage);
    
    void processShowMessage(std::vector<MessageContent*>showMessages);
    
    void processAnimationMessage(std::vector<MessageContent*>animationMessages);
    
    void processCustomAnimationMessage(std::vector<MessageContent*>animationMessages);
    
    void processChangeSceneMessages(std::vector<MessageContent*>changeSceneMessages);
    
    void processMainLayerNonAlphamonChildrenForCustomEvents();
    
    void querySceneToLoadInIsland();
    
    //Gesture Handler
    void HandleTap(cocos2d::Point position);
    void HandleHold(cocos2d::Point position);
    void HandleSwipeUp(cocos2d::Point position);
    void HandleSwipeDown(cocos2d::Point position);
    void HandleSwipeLeft(cocos2d::Point position);
    void HandleSwipeRight(cocos2d::Point position);
    void HandleTouchedEnded(cocos2d::Point position);
    bool isTapOnInterActObject(cocos2d::Point position);
    void sendBubbleDestroySignal();

    
    cocos2d::Size sceneSize;
    
    //references to all external Skeletons
    
    
    //reference to Layers
    cocos2d::Node* mainLayer;
    cocos2d::Node* backgroundLayer;
    cocos2d::Node* foregroundLayer;

    //category bit mask for main skeleton
    int mainCharacterCategoryBitMask;
    
    CC_SYNTHESIZE(int, alphamonNodesCount, AlphamonNodesCount);
    
    CC_SYNTHESIZE(std::string, sceneName, SceneName);
    
    CC_SYNTHESIZE(std::string, island, Island);
    
    CC_SYNTHESIZE(std::string, physicsFile, PhysicsFile);
    
    CC_SYNTHESIZE(std::string, mainCharacterFile, MainCharacterFile);
    
    CC_SYNTHESIZE(bool, isSpeechBubbleAlreadyVisible, SpeechBubbleAlreadyVisible);
    
    CC_SYNTHESIZE(std::string, initialMainSkeletonY, InitialMainSkeletonY);
    
    CC_SYNTHESIZE(std::string, initialMainSkeletonX, InitialMainSkeletonX);
    
public:
    static cocos2d::Scene* createScene(const std::string& island);
    
    static HelloWorld* create(const std::string& island);
    
    HelloWorld();
    ~HelloWorld();
    
    virtual bool init(const std::string& island);
    
    virtual void initializeSafari();
    
    
    //bind Gesture
    void OnGestureReceived(Ref* sender);
    
    
    void HandleJumpWithAnimation();
    void HandlePostJumpUpAnimation();
    
    
    void HandlePostJumpUpWithRotationAnimation();
    
    void scheduleJumpUpEndCall(float time);
    
    void flipSkeletonDirection(cocos2d::Point point, cocostudio::timeline::SkeletonNode* characterNode);
    
    void HandleJumpWithContinueousRotation();
        
    //set scene attributes
    virtual void setSceneSize(const cocos2d::Size& size);
    
    virtual cocos2d::Size getSceneSize();
        
    virtual void registerPhysicsEventContactLister();
    
    virtual void loadSqlite3FileForScene();
    
    virtual void registerMessageSenderAndReceiver();
    
    virtual bool handlePhysicsContactEventForMainCharacter(cocos2d::PhysicsContact &contact, cocos2d::Node* nodeA, cocos2d::Node* nodeB);
    
    virtual bool handlePhysicsContactEventForOtherSkeletonCharacter(cocos2d::PhysicsContact &contact, cocos2d::Node* nodeA, cocos2d::Node* nodeB);
    
    virtual void onEnterTransitionDidFinish();
    
    virtual void onExitTransitionDidStart();
    
    virtual void createRPGSprite(cocos2d::Node* node, std::unordered_map<std::string, std::string> attributes, cocos2d::Node* parentNode);
    
    virtual void createAlphaMonSprite(cocos2d::Node* node, std::unordered_map<std::string, std::string> attributes, cocos2d::Node* parentNode, char alphabet);
    
    virtual void processNodeWithCustomAttributes(Node* node, cocos2d::Node* parentNode);
    
    virtual bool checkTapOnRPGSprite(RPGSprite* rpgNode, cocos2d::Point position);
    
    virtual void hideTouchPointSign();
    
    virtual void transitionToDuelScene(char alphabet);
    
    virtual void addAlphaMonsters(char alphabet, std::string alphamonNodeName);
    
    virtual void createAlphaMons(float dt);
        
    virtual void calculateAlphamonNodesInScene(cocos2d::Node *rootNode);
    
    
    
        
 
    
};

#endif // __HELLOWORLD_SCENE_H__
