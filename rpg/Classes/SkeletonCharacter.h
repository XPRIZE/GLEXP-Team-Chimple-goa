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

class SkeletonCharacter {
public:
    SkeletonCharacter();
    virtual ~SkeletonCharacter();
    
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
    
    //virtual void HandleJumpDownStartingAnimation();
        
    bool isWalking;

    bool isRunning;
    
    bool isJumpingUp;
    
    bool isJumping;
    
    bool isJumpingAttemptedWhileDragging;
    
    bool isPlayingContinousRotationWhileJumping;
    
    /// Vector dot product.
    static inline float cpvdot(const cocos2d::Vec2 v1, const cocos2d::Vec2 v2)
    {
        return v1.x*v2.x + v1.y*v2.y;
    }


    
protected:
        cocostudio::timeline::SkeletonNode* skeletonNode;
        cocostudio::timeline::ActionTimeline* skeletonActionTime;
        StateMachine* stateMachine;        
        unsigned int contactWithGround = 1;
    
    
        virtual bool didSkeletonContactBeginDuringJumpingUp(cocos2d::PhysicsContact &contact, SkeletonCharacterState currentStateCommand);
    
};

#endif /* SkeletonCharacter_h */


