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
#include "RPGConfig.h"
#include "StateMachine.h"


#ifndef SkeletonCharacter_h
#define SkeletonCharacter_h

class SkeletonCharacter : public cocos2d::Node {
public:
    SkeletonCharacter();
    virtual ~SkeletonCharacter();
    
    static SkeletonCharacter* create(const std::string& filename);
    
    virtual bool initializeSkeletonCharacter(const std::string& filename);
    
    virtual cocostudio::timeline::SkeletonNode* getSkeletonNode();
    
    virtual cocostudio::timeline::ActionTimeline* getSkeletonActionTimeLine();
    
    virtual void createSkeletonNode(const std::string& filename);
    
    virtual void setStateMachine(StateMachine* stateMachine);
    
    virtual StateMachine* getStateMachine();
    
    virtual bool getSkeletonInContactWithGround();
    
    
    virtual void playJumpingUpEndingAnimation();
    
    virtual void playJumpingContinuousRotationAnimation();
    
    virtual void playStartingJumpUpAnimation(std::function<void ()> func);
    
    virtual void playStartingJumpUpWithRotationAnimation(std::function<void ()> func);
    
    virtual void HandlePostJumpDownEndingAnimation();
    
    bool isWalking;

    bool isRunning;
    
    bool isJumpingUp;
    
    bool isJumping;
    
    bool isJumpingAttemptedWhileDragging;
    
    bool isPlayingContinousRotationWhileJumping;
    
    virtual bool didSkeletonContactBeginDuringJumpingUp(cocos2d::PhysicsContact &contact, SkeletonCharacterState currentStateCommand);

    
protected:
        cocostudio::timeline::SkeletonNode* skeletonNode;
        cocostudio::timeline::ActionTimeline* skeletonActionTime;
        StateMachine* stateMachine;        
        CC_SYNTHESIZE(std::string, key, Key);
};

#endif /* SkeletonCharacter_h */


