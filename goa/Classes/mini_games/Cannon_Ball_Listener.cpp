#include "Cannon_Ball_Listener.h"
#include "Cannon_Ball_Main.h"
#include "../puzzle/Alphabet.h"

using namespace cocos2d;

EventListenerClass* EventListenerClass::cannon1Target;
EventListenerClass* EventListenerClass::cannon2Target;
EventListenerClass* EventListenerClass::cannon3Target;

int EventListenerClass::cannon1;
int EventListenerClass::cannon2;
int EventListenerClass::cannon3;

EventListenerClass::EventListenerClass()
{
}

EventListenerClass::~EventListenerClass()
{
}

LabelClass::LabelClass()
{
}

LabelClass::~LabelClass()
{
}

EventListenerClass* EventListenerClass::createCannonBall(std::string spriteName, EventListenerClass* e1, EventListenerClass* e2, EventListenerClass* e3, int spriteInd, wchar_t spriteId, float x, float y, MainGame *callerObject)
{
	EventListenerClass* createCannonBall_pSprite = new EventListenerClass();
	CCSpriteFrameCache::sharedSpriteFrameCache()->addSpriteFramesWithFile("cannonball_mainassetPlist.plist");
	std::string val = "cannonball/cannonball_mainasset/";
	val.append(spriteName);
	if (createCannonBall_pSprite->initWithSpriteFrameName(val))
	{
		createCannonBall_pSprite->setPosition(x, y);
		createCannonBall_pSprite->flag = 0;
		createCannonBall_pSprite->placedNumber = -1;
		createCannonBall_pSprite->id = spriteId;
		createCannonBall_pSprite->xP = x;
		createCannonBall_pSprite->yP = y;
		createCannonBall_pSprite->spriteIndex = spriteInd;

		createCannonBall_pSprite->addEvents(callerObject, e1, e2, e3);
		EventListenerClass::cannon1Target = e1;
		EventListenerClass::cannon2Target = e2;
		EventListenerClass::cannon3Target = e3;

		return createCannonBall_pSprite;
	}
	CC_SAFE_DELETE(createCannonBall_pSprite);
	return NULL;
}

EventListenerClass* EventListenerClass::createSprite(std::string spriteName, float x, float y, wchar_t charid, MainGame *callerObject)
{
	EventListenerClass *createSprite_pSprite = new EventListenerClass();
	CCSpriteFrameCache::sharedSpriteFrameCache()->addSpriteFramesWithFile("cannonball_mainassetPlist.plist");
	std::string val = "cannonball/cannonball_mainasset/";

	if (createSprite_pSprite->initWithSpriteFrameName(spriteName))
	{
		createSprite_pSprite->setPosition(x, y);
		createSprite_pSprite->flag = 0;
		createSprite_pSprite->xP = x;
		createSprite_pSprite->yP = y;
		createSprite_pSprite->id = charid;
		return createSprite_pSprite;
	}
	CC_SAFE_DELETE(createSprite_pSprite);
	return NULL;
}


LabelClass* LabelClass::createSpt(wchar_t spriteName, float x, float y, wchar_t charid, MainGame *callerObject)
{
	LabelClass *createSprite_pSprite = new LabelClass();
	std::string val = "";
	val += spriteName;

	createSprite_pSprite->flag = 0;
	createSprite_pSprite->xP = x;
	createSprite_pSprite->yP = y;
	createSprite_pSprite->id = charid;
	createSprite_pSprite->answer = 'o';
	return createSprite_pSprite;
}

EventListenerClass * EventListenerClass::createCannon(std::string spriteName, int flag1, int currentShoot1, int totalShoot1, int id, float x, float y)
{
	EventListenerClass* createCannon_pSprite = new EventListenerClass();
	CCSpriteFrameCache::sharedSpriteFrameCache()->addSpriteFramesWithFile("cannonball_mainassetPlist.plist");
	std::string val = "cannonball/cannonball_mainasset/";
	val.append(spriteName);
	if (createCannon_pSprite->initWithSpriteFrameName(val))
	{
		createCannon_pSprite->setPosition(x, y);
		createCannon_pSprite->flag = flag1;
		createCannon_pSprite->currentShoot = currentShoot1;
		createCannon_pSprite->totalShoot = totalShoot1;
		createCannon_pSprite->placedNumber = -1;
		createCannon_pSprite->cannonID = id;
		return createCannon_pSprite;
	}
	CC_SAFE_DELETE(createCannon_pSprite);
	return NULL;
}

void EventListenerClass::addEvents(MainGame *callerObject, EventListenerClass* trans1, EventListenerClass* trans2 , EventListenerClass* trans3)
{
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(true);

	listener->onTouchBegan = [&](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = static_cast<Sprite*>(event->getCurrentTarget());
		Point locationInNode = target->convertToNodeSpace(touch->getLocation());
		Size s = target->getContentSize();
		Rect rect = Rect(0, 0, s.width, s.height);

		if (rect.containsPoint(locationInNode))
		{
			target->setScale(2);
			cannon1 = 0, cannon2 = 0, cannon3 = 0;
//			target->setScale(2, 2);
			target->setZOrder(4);
			for (int i = 0; i < callerObject->cannonArray.size(); i++)
			{
				if (callerObject->cannonArray[i]->cannonID == 0)
				{
					cannon1 = 1;
				}
				if (callerObject->cannonArray[i]->cannonID == 1)
				{
					cannon2 = 1;
				}
				if (callerObject->cannonArray[i]->cannonID == 2)
				{
					cannon3 = 1;
				}
			}
			return true;
		}
		return false;
	};

	listener->onTouchMoved = [&](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		EventListenerClass* target = static_cast<EventListenerClass*>(event->getCurrentTarget());
		target->setPosition(target->getPosition() + touch->getDelta());
	};

	listener->onTouchEnded = [&](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		EventListenerClass* target = static_cast<EventListenerClass*>(event->getCurrentTarget());
		target->setPosition(target->getPosition() + touch->getDelta());
		target->setZOrder(2);
		Rect targetRect = target->getBoundingBox();
		target->setScale(1);
		Rect targetRect1 = Rect(cannon1Target->getPositionX() - cannon1Target->getBoundingBox().size.width / 2, cannon1Target->getPositionY() - cannon1Target->getContentSize().height / 2, cannon1Target->getBoundingBox().size.width, cannon1Target->getBoundingBox().size.height);
		Rect targetRect2 = Rect(cannon2Target->getPositionX() - cannon2Target->getBoundingBox().size.width / 2, cannon2Target->getPositionY() - cannon2Target->getContentSize().height / 2, cannon2Target->getBoundingBox().size.width, cannon2Target->getBoundingBox().size.height);
		Rect targetRect3 = Rect(cannon3Target->getPositionX() - cannon3Target->getBoundingBox().size.width / 2, cannon3Target->getPositionY() - cannon3Target->getContentSize().height / 2, cannon3Target->getBoundingBox().size.width, cannon3Target->getBoundingBox().size.height);

		if (!(targetRect2.intersectsRect(target->getBoundingBox())) && MainGame::_helpFlag == 1)
		{
			auto target = static_cast<EventListenerClass*>(event->getCurrentTarget());
			target->runAction(MoveTo::create(.2, Vec2(target->xP, target->yP)));
			//			target->setScale(1, 1);
			target->setZOrder(1);
		}
		else if (cannon1 == 1 && targetRect1.intersectsRect(target->getBoundingBox()) && cannon1Target->flag == 0)
		{
			target->placedNumber = 0;

			for (int i = 0; i < MainGame::cannonArray.size(); i++)
			{
				if (MainGame::cannonArray[i]->cannonID == 0)
				{
					MainGame::cannonArray[i]->placedNumber = 0;
					break;
				}
			}

			auto callback = CallFunc::create([this, target, callerObject]() { 
				target->setOpacity(0); 
				target->getChildren().at(0)->setOpacity(0);
				callerObject->loadCannon(target); });

			auto moveto = MoveTo::create(.2, Vec2(cannon1Target->getPositionX() + (cannon1Target->getContentSize().width / 4), cannon1Target->getPositionY()));
			auto seq = Sequence::create(moveto, callback, NULL);
			target->runAction(seq);

			cannon1Target->flag = 1;

			cocos2d::Director::getInstance()->getEventDispatcher()->removeEventListenersForTarget(target, true);
		}
		else if (cannon2 == 1 && targetRect2.intersectsRect(target->getBoundingBox()) && cannon2Target->flag == 0)
		{
			target->placedNumber = 1;
			for (int i = 0; i < MainGame::cannonArray.size(); i++)
			{
				if (MainGame::cannonArray[i]->cannonID == 1)
				{
					MainGame::cannonArray[i]->placedNumber = 1;
					break;
				}
			}

			auto callback = CallFunc::create([this, target, callerObject]() { 
				target->setOpacity(0); 
				target->getChildren().at(0)->setOpacity(0);
				callerObject->loadCannon(target); });

			auto moveto = MoveTo::create(.2, Vec2(cannon2Target->getPositionX() + (cannon2Target->getContentSize().width / 4), cannon2Target->getPositionY()));
			auto seq = Sequence::create(moveto, callback, NULL);
			target->runAction(seq);

			cannon2Target->flag = 1;

			cocos2d::Director::getInstance()->getEventDispatcher()->removeEventListenersForTarget(target, true);
		}
		else if (cannon3 == 1 && targetRect3.intersectsRect(target->getBoundingBox()) && cannon3Target->flag == 0)
		{
			target->placedNumber = 2;

			for (int i = 0; i < MainGame::cannonArray.size(); i++)
			{
				if (MainGame::cannonArray[i]->cannonID == 2)
				{
					MainGame::cannonArray[i]->placedNumber = 2;
					break;
				}
			}

			auto callback = CallFunc::create([this, target, callerObject]() { 
				target->setOpacity(0); 
				target->getChildren().at(0)->setOpacity(0);
				callerObject->loadCannon(target); });
			auto moveto = MoveTo::create(.2, Vec2(cannon3Target->getPositionX() + (cannon3Target->getContentSize().width / 4), cannon3Target->getPositionY()));
			auto seq = Sequence::create(moveto, callback, NULL);
			target->runAction(seq);

			cannon3Target->flag = 1;
			cocos2d::Director::getInstance()->getEventDispatcher()->removeEventListenersForTarget(target, true);
		}
		else
		{
			auto target = static_cast<EventListenerClass*>(event->getCurrentTarget());
			target->runAction(MoveTo::create(.2, Vec2(target->xP, target->yP)));
//			target->setScale(1, 1);
			target->setZOrder(1);
		}
	};
	
	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener, this);
}

void EventListenerClass::print(EventListenerClass* eve)
{
}

void EventListenerClass::touchEvent(cocos2d::Touch* touch, cocos2d::Vec2 _p)
{
}