#ifndef __SMASHTHEROCK_SCENE_H__
#define __SMASHTHEROCK_SCENE_H__

#include "cocos2d.h"
#include "../hero/character/SkeletonCharacter.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../menu/MenuContext.h"
#include "SimpleAudioEngine.h" 
#include "../menu/StartMenuScene.h"
#include "../puzzle/Alphabet.h"

class SmashTheRock : public cocos2d::Layer
{
public:
	static cocos2d::Scene* createScene();

	virtual bool init();

	int click = 0;
	int clickWrong = 0;
	wchar_t mychar;
	bool flag = true;
    cocos2d::Sprite* target;
	cocos2d::Node* character;
	cocostudio::timeline::SkeletonNode* mainGameCharacter;
	cocostudio::timeline::SkeletonNode* skeletonNode;

	cocos2d::Vector < cocos2d::Node *> blockRef;
	cocos2d::Vector < cocos2d::Node *> rightRef;
	cocos2d::Vector < cocos2d::Node *> wrongRef;
	cocos2d::Vector <Alphabet*> labelRef;
	std::map<std::string, std::int32_t> alphabetMap;
	
	int key;
	int count;
	CocosDenshion::SimpleAudioEngine* audio ;
	// a selector callback
	// void menuCloseCallback(cocos2d::Ref* pSender);
	virtual bool onTouchBegan(cocos2d::Touch *touch, cocos2d::Event * event);
	virtual void onTouchMoved(cocos2d::Touch *touch, cocos2d::Event * event);
	virtual void onTouchEnded(cocos2d::Touch *touch, cocos2d::Event * event);
	virtual void onTouchCancelled(cocos2d::Touch *touch, cocos2d::Event * event);
	cocos2d::Label* label1;
	cocos2d::Label* label;
	
	cocos2d::Node* background;
	cocos2d::Node* centre;
	
	cocos2d::ClippingNode* maskedFill = nullptr;
	SmashTheRock();
	~SmashTheRock();
	void update(float dt);
	virtual void masking();
	virtual void jump();
	virtual void hit();
	virtual void blast();
	virtual void begin();
	virtual void change(float dt);
	virtual void createSkeletonCharacter();
	void gameHelp();
	bool _helpFlage;
	float helpX, helpY;
	Alphabet* _label1;
	std::vector<std::vector<wchar_t>> _charkey;
	void addMainCharacterToScene(cocostudio::timeline::SkeletonNode* skeleton);
	// implement the "static create()" method manually

    static const char* gameName() { return SMASH_THE_ROCK.c_str();}

private:
	SkeletonCharacter* skeletonCharacter;
	

protected:
	MenuContext * menu;
	void startGame();
	CREATE_FUNC(SmashTheRock);
};

#endif // __HELLOWORLD_SCENE_H__
