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
#include "menu/MenuContext.h"
#include "lang/LangUtil.h"
#include "puzzle/CharGenerator.h"
#include "WordSprite.h"
#include "puzzle/WordBoard.h"

class GestureLayer;
class MessageContent;

#define MAIN_CHARACTER_FILE "hero_skeleton.csb"


class HelloWorld : public cocos2d::Layer
{
private:
    //member variables
    
    cocos2d::Point currentTouchPoint;
    
    GestureLayer* gesture_layer_;
    
    StateMachine* stateMachine;
    
    Sqlite3Helper* sqlite3Helper;
    
    LangUtil* currentLangUtil;
    
    MessageSender* messageSender;
    
    MessageReceiver* messageReceiver;
    
    SkeletonCharacter* skeletonCharacter;
    
    MenuContext* menuContext;
    
    SkeletonPosition* skeletonPositionInLastVisitedScene;
    
    void loadGameScene();
    
    void enablePhysicsBoundaries(Node* rootNode);
    
    cocostudio::timeline::SkeletonNode* createMainGameCharacter();
    
    void addMainCharacterToScene(const std::string& filename, cocos2d::Node* node);
    
    void updatePositionAndCategoryBitMaskMainCharacter();
    
    void initGestureLayer();
    
    static void initPhysics(cocos2d::Scene* scene);
    
    void startJumpUpEndingAnimation(float dt);
    
    void startContinuousRotationAnimation(float dt);
    
    void update(float dt);
    
    void initializeStateMachine();
    
    bool checkTouchWithinBoundsOfCharacter(cocos2d::Point point, cocostudio::timeline::SkeletonNode* characterNode);
    
    bool checkTouchVerticallyUpOnBoundsOfCharacter(cocos2d::Point point, cocostudio::timeline::SkeletonNode* characterNode, float delta);
    
    bool checkTouchLeftOfCharacter(cocos2d::Point point, cocostudio::timeline::SkeletonNode* characterNode);
    
    bool checkTouchRightOfCharacter(cocos2d::Point point, cocostudio::timeline::SkeletonNode* characterNode);
    
    bool checkHoldWithinWalkLimitOfCharacter(cocos2d::Point point, cocostudio::timeline::SkeletonNode* characterNode);
    
    bool checkHoldWithinRunningLimitOfCharacter(cocos2d::Point point, cocostudio::timeline::SkeletonNode* characterNode);
    
    bool checkHoldWithinSittingLimitOfCharacter(cocos2d::Point point, cocostudio::timeline::SkeletonNode* characterNode);
    
    void applyImpulseOnSkeletonToJumpOnHoldOrDrag(cocos2d::Point position);
    
    void applyImpulseOnSkeletonToJumpOnTap(cocos2d::Point position);
    
    void applyImpulseOnSkeletonToJump(cocos2d::Point position, float angle, float velocity, float timeToStart);
    
    void walkCharacterOnLeftOrRightDirection(cocos2d::Point position);
    
    void runCharacterOnLeftOrRightDirection(cocos2d::Point position);
    
    void HoldOrDragBehaviour(cocos2d::Point position);
    
    void scheduleContinuousRotationCall(float timeToStart);
    
    void moveLayersInParallex();
    
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
    void transitToMenu(EventCustom* event);
    void changeScene(std::string nextScene = "", bool isMiniGame = false);
    void cleanUpResources();
    
    void transitionToDuelScene(wchar_t alphabet);

    void loadWords();
    
    void createWordSprite(cocos2d::Node* node, std::string word, cocos2d::Node* parentNode);
    
    void handleCharacterMovement(cocos2d::Point position);
    
//    void changeWordScene(EventCustom * event);
    
    void updateSpeechBubbleStatus(EventCustom *event);
    
    void processMessageEvent(EventCustom *event);
    
    bool onContactBegin(PhysicsContact &contact);
    
    cocos2d::Size sceneSize;
    
    std::vector<std::string> activeAlphamonNodes;
    
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
        
    CC_SYNTHESIZE(bool, isSpeechBubbleAlreadyVisible, SpeechBubbleAlreadyVisible);
    
public:
    static cocos2d::Scene* createScene(const std::string& island, const std::string& sceneName);
    
    static HelloWorld* create(const std::string& island, const std::string& sceneName);
    
    HelloWorld();
    ~HelloWorld();
    
    virtual bool init(const std::string& island, const std::string& sceneName);
    
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
    
    virtual void loadSqlite3FileForIsland();
    
    virtual void registerMessageSenderAndReceiver();
    
    virtual bool handlePhysicsContactEventForMainCharacter(cocos2d::PhysicsContact &contact, cocos2d::Node* nodeA, cocos2d::Node* nodeB);
    
    virtual bool handlePhysicsContactEventForOtherSkeletonCharacter(cocos2d::PhysicsContact &contact, cocos2d::Node* nodeA, cocos2d::Node* nodeB);
    
    virtual void createRPGSprite(cocos2d::Node* node, std::unordered_map<std::string, std::string> attributes, cocos2d::Node* parentNode);
    
    virtual void processNodeWithCustomAttributes(Node* node, cocos2d::Node* parentNode);
    
    virtual bool checkTapOnRPGSprite(RPGSprite* rpgNode, cocos2d::Point position);    
    
    static const char* gameName() { return "Safari RPG";}
};

#endif // __HELLOWORLD_SCENE_H__
