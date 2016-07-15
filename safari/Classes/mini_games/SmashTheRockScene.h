#ifndef __SMASHTHEROCK_SCENE_H__
#define __SMASHTHEROCK_SCENE_H__

#include "cocos2d.h"
#include "SkeletonCharacter.h"
#include "cocostudio\ActionTimeline\CCSkeletonNode.h"

class SmashTheRock : public cocos2d::Layer
{
public:
	static cocos2d::Scene* createScene(std::string st);

	virtual bool init();

	int click = 0;
    cocos2d::Sprite* target;
	cocos2d::Node* character;
	cocostudio::timeline::SkeletonNode* mainGameCharacter;
	cocostudio::timeline::SkeletonNode* skeletonNode;

	cocos2d::Vector < cocos2d::Node *> blockRef;
	std::map<std::string, std::int32_t> alphabetMap;
	
	int key;
	// a selector callback
	// void menuCloseCallback(cocos2d::Ref* pSender);
	virtual bool onTouchBegan(cocos2d::Touch *touch, cocos2d::Event * event);
	virtual void onTouchMoved(cocos2d::Touch *touch, cocos2d::Event * event);
	virtual void onTouchEnded(cocos2d::Touch *touch, cocos2d::Event * event);
	virtual void onTouchCancelled(cocos2d::Touch *touch, cocos2d::Event * event);
	cocos2d::Label* label1;
	cocos2d::Label* label;
	cocos2d::ClippingNode* maskedFill = nullptr;
	void update(float dt);
	virtual void masking();
	virtual void jump();
	virtual void back();

	virtual void createSkeletonCharacter();
	void addMainCharacterToScene(cocostudio::timeline::SkeletonNode* skeleton);
	// implement the "static create()" method manually



private:
	SkeletonCharacter* skeletonCharacter;


	CREATE_FUNC(SmashTheRock);
};

#endif // __HELLOWORLD_SCENE_H__
