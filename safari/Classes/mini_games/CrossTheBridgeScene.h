#ifndef __CROSSTHEBRIDGE_SCENE_H__
#define __CROSSTHEBRIDGE_SCENE_H__

#include "cocos2d.h"
using namespace cocos2d;

class CrossTheBridge : public cocos2d::Layer
{
public:
	
    static cocos2d::Scene* createScene();
    virtual bool init();
	virtual void sceneMaking();

	virtual void leftMove_Alpha(Sprite* spriteAlphabet, int time, float positionX, float positionY);
	virtual void leftMove_Mons(Sprite* spriteAlphabet, int time, float positionX, float positionY);
	
	virtual void update(float dt);

	virtual void alphabetGeneration(float dt);
	virtual void monsGeneration(float dt);

	virtual void alphaDeletion();
	virtual void monsDeletion();

	virtual void checkIntersectWithAlpha();
	virtual void checkIntersectWithMons();

	void removeObjectFromScene_Alpha();
	void removeObjectFromScene_Mons();

	void removeMonsAtRightMost();
	void letterDisplayCombinationMethod(float dt);
	void comboFiveDynamicShuffle(float dt);

	virtual void addEvents(Sprite* touchSprite);

    // a selector callback
    void menuCloseCallback(cocos2d::Ref* pSender);
	
protected:
	int falana;
	Sprite* cubeAtRest;
	Sprite* barrierRight;
	Sprite* barrierRight_1;
	Sprite* barrierLeft;
	Sprite* barrierFlat;
	Label* displayLetter;
	Sprite* pathClose_right;
	Sprite* pathClose_left;
	Sprite* pathOpen_right;
	Sprite* pathOpen_left;
	 
	std::vector<cocos2d::Sprite*> alphaContainer;
	std::vector<cocos2d::Sprite*> monsContainer;
	std::string randomInAlpha = "";
	std::string letterAZ[26] = { "A","B","C","D","E" ,"F","G" ,"H","I" ,"J","K","L","M" ,"N","O" ,"P","Q" ,"R","S" ,"T","U" ,"V","W" ,"X","Y","Z" };
	double positionGap_Alpha[22] = { 3.5, 4.5, 6.2, 4.9, 5.4, 3.9, 6.2, 6.0, 8.0,5.5, 6.6, 7.7, 4.3, 8.1, 6.7,4.6,2.4,2.9,5.4,8.1,7.5, 4.8 };
	std::string comboFive[5] = {};
	std::pair<float, float> letterDisplayPosition[12] = { { 185.29,117.88 },{ 538.72,117.88 },{ 932.43, 117.88 },
	{ 1300.78,117.88 } ,{ 1679.82,117.88 } ,{ 2030.82,117.88 } ,
	{ 2395.70,117.88 } };
	bool openFlag = false;
	bool letterIsThere = false;
	bool oneSecondClick = false;
    // implement the "static create()" method manually
    CREATE_FUNC(CrossTheBridge);
};

#endif // __CROSSTHEBRIDGE_SCENE_H__
