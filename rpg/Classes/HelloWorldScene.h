#ifndef __HELLOWORLD_SCENE_H__
#define __HELLOWORLD_SCENE_H__


#include "cocos2d.h"
#include "editor-support/cocostudio/ActionTimeline/CCSkeletonNode.h"
#include "RPGConfig.h"
#include "SkeletonCharacter.h"
#include "StateMachine.h"

class GestureLayer;

class HelloWorld : public cocos2d::Layer
{
private:
    //member variables
    
    cocos2d::Point currentTouchPoint;
    
    GestureLayer* gesture_layer_;
    
    StateMachine* stateMachine;
    
    SkeletonCharacter* skeletonCharacter;
    
    bool _isFingerTouchedToScreen;
    
    float _xVelocity = 0;
    
    bool checkTouchWithinBoundsOfCharacter(cocos2d::Point point, cocostudio::timeline::SkeletonNode* characterNode);
    
    bool checkTouchVerticallyUpOnBoundsOfCharacter(cocos2d::Point point, cocostudio::timeline::SkeletonNode* characterNode);
    
    bool checkTouchLeftOfCharacter(cocos2d::Point point, cocostudio::timeline::SkeletonNode* characterNode);
    
    bool checkTouchRightOfCharacter(cocos2d::Point point, cocostudio::timeline::SkeletonNode* characterNode);
    
    bool checkHoldWithinWalkLimitOfCharacter(cocos2d::Point point, cocostudio::timeline::SkeletonNode* characterNode);
    
    bool checkHoldWithinSittingLimitOfCharacter(cocos2d::Point point, cocostudio::timeline::SkeletonNode* characterNode);
    
    void applyImpulseOnSkeletonToJump(cocos2d::Point position);
    
    void walkCharacterOnLeftOrRightDirection(cocos2d::Point position);
    
    void runCharacterOnLeftOrRightDirection(cocos2d::Point position);
    
    void HoldOrDragBehaviour(cocos2d::Point position);
    
public:
    static cocos2d::Scene* createScene();
    
    HelloWorld();
    ~HelloWorld();
    
    virtual bool init();
    
    void createRPGGame();
    
    void loadGameScene();
    
    void enablePhysicsBoundaries(Node* rootNode);
    
    cocostudio::timeline::SkeletonNode* createMainGameCharacter();
    
    void addMainCharacterToScene(cocostudio::timeline::SkeletonNode* skeleton);
    
    virtual void createSkeletonCharacter();
    
    void initGestureLayer();
    
    static void initPhysics(cocos2d::Scene* scene);
    
    void startJumpUpEndingAnimation(float dt);
    
    void update(float dt);
    
    void initializeStateMachine();
    
    //bind Gesture
    void OnGestureReceived(Ref* sender);
    
    //Gesture Handler
    void HandleTap(cocos2d::Point position);
    void HandleHold(cocos2d::Point position);
    void HandleSwipeUp(cocos2d::Point position);
    void HandleSwipeDown(cocos2d::Point position);
    void HandleSwipeLeft(cocos2d::Point position);
    void HandleSwipeRight(cocos2d::Point position);
    void HandleTouchedEnded(cocos2d::Point position);
    
    
    void HandleJumpWithAnimation();
    void HandlePostJumpUpAnimation();
    void scheduleJumpUpEndCall(float time);
    
    // a selector callback
    void menuCloseCallback(cocos2d::Ref* pSender);
    
    // implement the "static create()" method manually
    CREATE_FUNC(HelloWorld);
};

#endif // __HELLOWORLD_SCENE_H__
