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
    
    virtual void setSkeletonInContactWithGround(bool skeletonInContactWithGround);
    
    virtual void playJumpingUpEndingAnimation(std::function<void ()> func);
    
    virtual void playStartingJumpUpAnimation(std::function<void ()> func);
    
    virtual void HandlePostJumpDownEndingAnimation();
    
    virtual void HandleJumpDownStartingAnimation();
        
    bool isWalking;

    bool isRunning;
    
    bool isJumpingUp;
    
    bool isJumping;

    
protected:
        cocostudio::timeline::SkeletonNode* skeletonNode;
        cocostudio::timeline::ActionTimeline* skeletonActionTime;
        StateMachine* stateMachine;
        bool skeletonInContactWithGround;
    
};

#endif /* SkeletonCharacter_h */


