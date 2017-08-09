#ifndef __EVENTLISTENERCLASS_SCENE_H__
#define __EVENTLISTENERCLASS_SCENE_H__

#include "cocos2d.h"

class MainGame;

class EventListenerClass : public cocos2d::Sprite
{
public:
	EventListenerClass();
	~EventListenerClass();
	int flag, currentShoot, totalShoot, spriteIndex, placedNumber, cannonID;
	float xP, yP;
	static EventListenerClass *cannon1Target, *cannon2Target, *cannon3Target, *cannon4Target;
	static int cannon1, cannon2, cannon3, cannon4;
	std::string id;
	static EventListenerClass* createCannonBall(std::string spriteName, EventListenerClass*, EventListenerClass*, EventListenerClass*, int, std::string, float, float, MainGame*);
	static EventListenerClass* createCannon(std::string spriteName, int flag1, int currentShoot1, int totalShoot1, int, float, float);
	static EventListenerClass* createSprite(std::string spriteName, float x, float y, std::string, MainGame*);
	void addEvents(MainGame*, EventListenerClass*, EventListenerClass*, EventListenerClass*);
	void touchEvent(cocos2d::Touch* touch, cocos2d::Vec2 _p);
	static void print(EventListenerClass*);

private :
};

class LabelClass
{
public:
	LabelClass();
	~LabelClass();
	int flag;
	float xP, yP;
	std::string id, answer;
	static LabelClass* createSpt(std::string spriteName, float x, float y, std::string wt, MainGame*);
private:
};

#endif // __EVENTLISTENERCLASS_SCENE_H__
