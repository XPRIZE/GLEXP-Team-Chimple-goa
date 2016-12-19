//
//  SkeletonCharacter.cpp
//  Hello3
//
//  Created by Shyamal  Upadhyaya on 24/06/16.
//
//

#include <stdio.h>
#include "RPGConfig.h"
#include "HelloWorldScene.h"
#include "SkeletonCharacter.h"

USING_NS_CC;

SkeletonCharacter* SkeletonCharacter::create(cocos2d::Node* node, const std::string& island, const std::string& sceneName, const std::string& filename, Sqlite3Helper* sqlite3Helper) {
    auto skeletonCharacter = new SkeletonCharacter();
    if (skeletonCharacter && skeletonCharacter->initializeSkeletonCharacter(node, island, sceneName, filename, sqlite3Helper)) {
        skeletonCharacter->autorelease();
        return skeletonCharacter;
    }
    CC_SAFE_DELETE(skeletonCharacter);
    return nullptr;
}

bool SkeletonCharacter::initializeSkeletonCharacter(cocos2d::Node* node, const std::string& island, const std::string& sceneName, const std::string& filename, Sqlite3Helper* sqlite3Helper) {
    this->sqlite3Helper = sqlite3Helper;
    this->setIslandName(island);
    this->setSceneName(sceneName);
    this->setName(node->getName());
    this->createSkeletonNode(node, island, sceneName, filename);
    this->setfileName(filename);
    this->addChild(this->skeletonNode);
    
    return true;
}

SkeletonCharacter::SkeletonCharacter()
{
    this->skeletonNode = NULL;
    this->sqlite3Helper = NULL;
    this->islandName = "";
    this->sceneName = "";
    this->isWalking = false;
    this->isRunning = false;
    this->isJumpingUp = false;
    this->isJumping = false;
    this->isJumpingAttemptedWhileDragging = false;
    this->isPlayingContinousRotationWhileJumping = false;
    this->isFalling = false;
    this->mouthSkin = NULL;
    this->isStanding = false;
}

SkeletonCharacter::~SkeletonCharacter()
{
}

void SkeletonCharacter::setStateMachine(StateMachine* stateMachine) {
    this->stateMachine = stateMachine;
}

void SkeletonCharacter::playStartingJumpUpAnimation(std::function<void ()> func) {
    this->getSkeletonActionTimeLine()->setAnimationEndCallFunc(JUMP_START, func);
    this->getSkeletonActionTimeLine()->setTimeSpeed(4.0f);
    this->getSkeletonActionTimeLine()->play(JUMP_START, false);
}


void SkeletonCharacter::playStartingJumpUpWithRotationAnimation(std::function<void ()> func) {
    this->getSkeletonActionTimeLine()->setAnimationEndCallFunc(JUMP_START, func);
    this->getSkeletonActionTimeLine()->setTimeSpeed(4.0f);
    this->getSkeletonActionTimeLine()->play(JUMP_START, false);
}


void SkeletonCharacter::playJumpingUpEndingAnimation() {    
    this->getSkeletonActionTimeLine()->play(JUMP_MID, false);
}


void SkeletonCharacter::playJumpingContinuousRotationAnimation() {
    this->getSkeletonActionTimeLine()->play(ROTATE_SKELETON, true);
}

StateMachine* SkeletonCharacter::getStateMachine() {
    return this->stateMachine;
}

void SkeletonCharacter::HandlePostJumpDownWithDragEndingAnimation() {
    if(this->isVisible()) {
        this->getSkeletonActionTimeLine()->clearFrameEventCallFunc();
        this->getSkeletonActionTimeLine()->setTimeSpeed(1.0f);
        this->stateMachine->handleInput(S_WALKING_STATE, cocos2d::Vec2(0,0));
        this->isRunning = false;
        this->isWalking = false;        
    }
}



void SkeletonCharacter::HandlePostJumpDownEndingAnimation() {
    if(this->isVisible()) {
        this->getSkeletonActionTimeLine()->clearFrameEventCallFunc();
        this->getSkeletonActionTimeLine()->setTimeSpeed(1.0f);
        this->stateMachine->handleInput(S_STANDING_STATE, cocos2d::Vec2(0,0));
        this->isRunning = false;
        this->isWalking = false;
    }
}


bool SkeletonCharacter::didSkeletonContactBeginDuringJumpingUp(PhysicsContact &contact, SkeletonCharacterState currentStateCommand, float sceneWidth) {
    cocos2d::Node* nodeA = contact.getShapeA()->getBody()->getNode();
    cocos2d::Node* nodeB = contact.getShapeB()->getBody()->getNode();
    if((RPGConfig::compareCaseInsensitive(nodeA->getName(),HUMAN_SKELETON_NAME) && contact.getShapeA()->getBody()->getVelocity().y > -GRAVITY_VELOCITY_TO_STICK_TO_GROUND) ||
       (RPGConfig::compareCaseInsensitive(nodeB->getName(),HUMAN_SKELETON_NAME) && contact.getShapeB()->getBody()->getVelocity().y > -GRAVITY_VELOCITY_TO_STICK_TO_GROUND))
    {
        if((RPGConfig::compareCaseInsensitive(nodeA->getName(),HUMAN_SKELETON_NAME) && nodeB->getPhysicsBody()->getCategoryBitmask() == INVISIBLE_BOUNDARY_CATEGORY_BITMASK) || (RPGConfig::compareCaseInsensitive(nodeB->getName(),HUMAN_SKELETON_NAME) && nodeA->getPhysicsBody()->getCategoryBitmask() == INVISIBLE_BOUNDARY_CATEGORY_BITMASK)) {

            float limit  = X_OFFSET_IF_HERO_DISAPPER;
            if(this->getSkeletonNode()->getPosition().x <= limit || this->getSkeletonNode()->getPosition().x >= sceneWidth - limit) {
                return false;
            }
        }
        return true;
    }
    
    return false;
}

void SkeletonCharacter::createSkeletonNode(cocos2d::Node* node, const std::string& island, const std::string& sceneName, const std::string& filename) {
    //get Origin and VisibleSize
    
    if(node != NULL) {
        node->removeFromParent();
    }
    
    
    //create Skeleton
    this->skeletonNode = (cocostudio::timeline::SkeletonNode*) CSLoader::createNode(filename);
    
    if(node != NULL) {
        this->getSkeletonNode()->setName(node->getName());
        this->getSkeletonNode()->setPosition(node->getPosition());
        this->skeletonNode->setLocalZOrder(1000);
    }
    
    this->setLocalZOrder(1000);
    
    this->skeletonActionTime = (cocostudio::timeline::ActionTimeline*) CSLoader::createTimeline(filename);
    this->skeletonActionTime->retain();
    this->skeletonNode->runAction(this->skeletonActionTime);
    this->skeletonActionTime->gotoFrameAndPause(0);
    
//    this->configureCharacter();
    
    auto physicsBody = PhysicsBody::createBox(Size(HUMAN_SKELETON_COLLISION_BOX_WIDTH, HUMAN_SKELETON_COLLISION_BOX_HEIGHT), PHYSICSBODY_MATERIAL_DEFAULT, Vec2(0,HUMAN_SKELETON_COLLISION_BOX_HEIGHT/2));
    
    //set as dynamic
    physicsBody->setDynamic(DYNAMIC_BODY);
    physicsBody->setMass(MAIN_CHARACTER_MASS);    
    this->skeletonNode->setPhysicsBody(physicsBody);
    this->skeletonNode->getPhysicsBody()->setRotationEnable(false);
    this->skeletonNode->getPhysicsBody()->setCollisionBitmask(MAIN_CHARACTER_MASS_COLLISION_MASK);
    this->skeletonNode->getPhysicsBody()->setContactTestBitmask(MAIN_CHARACTER_MASS_CONTACT_MASK);
    this->skeletonNode->getPhysicsBody()->setLinearDamping(MAIN_CHARACTER_MASS_DAMPING);
    this->skeletonNode->getPhysicsBody()->setGroup(MAIN_CHARACTER_GROUP);
    
    this->skeletonNode->setScale(MAIN_CHARACTER_SCALE);    
}

cocostudio::timeline::SkeletonNode* SkeletonCharacter::getSkeletonNode() {
    return this->skeletonNode;
}

cocostudio::timeline::ActionTimeline* SkeletonCharacter::getSkeletonActionTimeLine() {
    return this->skeletonActionTime;
}


bool SkeletonCharacter::getSkeletonInContactWithGround() {
    if(this->getSkeletonNode()->getPhysicsBody()->getVelocity().y < GRAVITY_VELOCITY_TO_STICK_TO_GROUND ||
       this->getSkeletonNode()->getPhysicsBody()->getVelocity().y > -GRAVITY_VELOCITY_TO_STICK_TO_GROUND)
    {
        return false;
    } else {
        return true;
    }
}

void SkeletonCharacter::setSkeletonActionTimeLine(cocostudio::timeline::ActionTimeline* timeline) {
    this->skeletonActionTime = timeline;    
}

void SkeletonCharacter::changeSkinForMouthBone(std::string bone, std::string skinName, std::string imageName, std::string anchorX, std::string anchorY) {
    
    cocostudio::timeline::BoneNode* boneNode = this->getSkeletonNode()->getBoneNode(bone);
    
    if(boneNode != NULL) {
        if(this->mouthSkin == NULL) {
            for (std::vector<Node*>::iterator it = boneNode->getSkins().begin() ; it != boneNode->getSkins().end(); ++it) {
                cocostudio::timeline::SkinNode* skin = *it;
                if(skin->getName() == skinName) {
                    this->mouthSkin = skin;
                    break;
                }
            }
            
        }
        
        
        if(this->mouthSkin != NULL) {
            cocos2d::Sprite* boneSkin = cocos2d::Sprite::createWithSpriteFrameName(imageName);
            boneSkin->setName(imageName);
            float xAnchor = String::create(anchorX)->floatValue();
            float yAnchor = String::create(anchorY)->floatValue();
            
            if(xAnchor == 0.0f) {
                xAnchor = this->mouthSkin->getAnchorPoint().x;
            }
            
            if(yAnchor == 0.0f) {
                yAnchor = this->mouthSkin->getAnchorPoint().y;
            }
            
            
            boneSkin->setPosition(this->mouthSkin->getPosition());
            boneSkin->setAnchorPoint(Vec2(xAnchor,yAnchor));
            boneNode->addSkin(boneSkin, true);
            boneNode->displaySkin(boneSkin, true);

        }
        
    }
    
}


void SkeletonCharacter::changeSkinForBone(std::string bone, std::string skinName, std::string imageName, std::string anchorX, std::string anchorY) {
    cocostudio::timeline::BoneNode* boneNode = this->getSkeletonNode()->getBoneNode(bone);
    
    if(boneNode != NULL) {
        
        cocostudio::timeline::SkinNode* referenceToSkin = nullptr;
        for (std::vector<Node*>::iterator it = boneNode->getSkins().begin() ; it != boneNode->getSkins().end(); ++it) {
            cocostudio::timeline::SkinNode* skin = *it;
            if(skin->getName() == skinName) {
                referenceToSkin = skin;
                break;
            }
        }
        
        if(referenceToSkin != NULL) {
            cocos2d::Sprite* boneSkin = cocos2d::Sprite::createWithSpriteFrameName(imageName);
            boneSkin->setName(imageName);
            float xAnchor = String::create(anchorX)->floatValue();
            float yAnchor = String::create(anchorY)->floatValue();
            
            if(xAnchor == 0.0f) {
                xAnchor = referenceToSkin->getAnchorPoint().x;
            }
            
            if(yAnchor == 0.0f) {
                yAnchor = referenceToSkin->getAnchorPoint().y;
            }

            
            boneSkin->setPosition(referenceToSkin->getPosition());
            boneSkin->setAnchorPoint(Vec2(xAnchor,yAnchor));
            boneNode->addSkin(boneSkin, true);
            boneNode->displaySkin(boneSkin, true);
        }
    }
}


void SkeletonCharacter::configureCharacter() {
    //load database and find out all bones for this skeleton
    std::vector<SkeletonConfiguration*> skeletonConfiguration = this->sqlite3Helper->loadSkeletonConfigurationInScene(this->getIslandName().c_str(), this->getSceneName().c_str(), this->getName().c_str());
    
    std::map<std::string, std::map<std::string, std::string>> loadedBoneConfig = RPGConfig::getSkeletonConfigMap(this->getName());
    
    for (std::vector<SkeletonConfiguration*>::iterator it = skeletonConfiguration.begin() ; it != skeletonConfiguration.end(); ++it) {
        SkeletonConfiguration* config = *it;
        
        std::string anchorX = config->getSkinAnchorX();
        std::string anchorY = config->getSkinAnchorY();
        
        if(config->getSkinAnchorX().empty() || config->getSkinAnchorY().empty()) {
            std::map<std::string, std::string> skinAnchorMap = loadedBoneConfig.at(config->getBoneName());
            if(skinAnchorMap.size() > 0) {
                anchorX = skinAnchorMap.at(ANCHOR_X);
                anchorY = skinAnchorMap.at(ANCHOR_Y);
            }
        }
        
        this->changeSkinForBone(config->getBoneName(), config->getImageName(), anchorX, anchorY);
        
        ;
    }        
}
