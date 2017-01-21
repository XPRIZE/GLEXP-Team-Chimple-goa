//
//  SkeletonCharacter.h
//  Hello3
//
//  Created by Shyamal  Upadhyaya on 24/06/16.
//
//

#include "cocos2d.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "editor-support/cocostudio/ActionTimeline/CCSkeletonNode.h"
#include "editor-support/cocostudio/ActionTimeline/CCActionTimeline.h"
#include "../RPGConfig.h"
#include "../state/StateMachine.h"
#include "../../sqlite3/Sqlite3Helper.hpp"


#ifndef SkeletonCharacter_h
#define SkeletonCharacter_h

class SkeletonCharacter : public cocos2d::Node {
public:
    SkeletonCharacter();
    virtual ~SkeletonCharacter();
    
    static SkeletonCharacter* create(cocos2d::Node* node, const std::string& island, const std::string& sceneName, const std::string& filename, Sqlite3Helper* sqlite3Helper);
    
    virtual bool initializeSkeletonCharacter(cocos2d::Node* node, const std::string& island, const std::string& sceneName, const std::string& filename, Sqlite3Helper* sqlite3Helper);
    
    virtual cocostudio::timeline::SkeletonNode* getSkeletonNode();
    
    virtual cocostudio::timeline::ActionTimeline* getSkeletonActionTimeLine();
    
    virtual void setSkeletonActionTimeLine(cocostudio::timeline::ActionTimeline* timeline);
    
    virtual void createSkeletonNode(cocos2d::Node* node, const std::string& island, const std::string& sceneName, const std::string& filename);
    
    virtual void setStateMachine(StateMachine* stateMachine);
    
    virtual StateMachine* getStateMachine();
    
    virtual bool getSkeletonInContactWithGround();
    
    
    virtual void playJumpingUpEndingAnimation();
    
    virtual void playJumpingContinuousRotationAnimation();
    
    virtual void playStartingJumpUpAnimation(std::function<void ()> func);
    
    virtual void playStartingJumpUpWithRotationAnimation(std::function<void ()> func);
    
    virtual void HandlePostJumpDownEndingAnimation();
    
    virtual void HandlePostJumpDownWithDragEndingAnimation();
    
    bool isWalking;

    bool isRunning;
    
    bool isJumpingUp;
    
    bool isJumping;
    
    bool isJumpingAttemptedWhileDragging;
    
    bool isPlayingContinousRotationWhileJumping;
    
    bool isFalling;
    
    bool isStanding;
    
    virtual bool didSkeletonContactBeginDuringJumpingUp(cocos2d::PhysicsContact &contact, SkeletonCharacterState currentStateCommand, float sceneWidth);
    
    virtual void changeSkinForBone(std::string bone, std::string skinName, std::string imageName, std::string anchorX = ZERO_POINT, std::string anchorY = ZERO_POINT);
    
    virtual void changeSkinForMouthBone(std::string bone, std::string skinName, std::string imageName, std::string anchorX = ZERO_POINT, std::string anchorY = ZERO_POINT);
    
    virtual void configureCharacter();
    
    void setExternalCharacterNames(std::vector<std::string> names);
    std::vector<std::string> getExternalCharacterNames();
    
protected:
        cocostudio::timeline::SkeletonNode* skeletonNode;
        cocostudio::timeline::ActionTimeline* skeletonActionTime;
        cocostudio::timeline::SkinNode* mouthSkin;
    
        StateMachine* stateMachine;
        Sqlite3Helper* sqlite3Helper;
        CC_SYNTHESIZE(std::string, key, Key);
        CC_SYNTHESIZE(std::string, fileName, fileName);
    
        CC_SYNTHESIZE(std::string, islandName, IslandName);
        CC_SYNTHESIZE(std::string, sceneName, SceneName);
    
        void onEnterTransitionDidFinish();
        bool onTouchBegan(cocos2d::Touch *touch, cocos2d::Event *event);
    
        std::vector<std::string> externalCharacterNames;
};

#endif /* SkeletonCharacter_h */


