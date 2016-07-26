#include "Cannon_Ball_Listener.h"
#include "Cannon_Ball_Main.h"
#include "../puzzle/Alphabet.h"

using namespace cocos2d;

EventListenerClass* EventListenerClass::cannon1Target;
EventListenerClass* EventListenerClass::cannon2Target;
EventListenerClass* EventListenerClass::cannon3Target;
EventListenerClass* EventListenerClass::cannon4Target;

int EventListenerClass::cannon1;
int EventListenerClass::cannon2;
int EventListenerClass::cannon3;
int EventListenerClass::cannon4;

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

EventListenerClass* EventListenerClass::createCannonBall(std::string spriteName, EventListenerClass* e1, EventListenerClass* e2, EventListenerClass* e3, int spriteInd, char spriteId, float x, float y, MainGame *callerObject)
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

EventListenerClass* EventListenerClass::createSprite(std::string spriteName, float x, float y, char charid, MainGame *callerObject)
{
	EventListenerClass *createSprite_pSprite = new EventListenerClass();
	CCSpriteFrameCache::sharedSpriteFrameCache()->addSpriteFramesWithFile("cannonball_mainassetPlist.plist");
	std::string val = "cannonball/cannonball_mainasset/";
//	CCSpriteFrameCache::sharedSpriteFrameCache()->addSpriteFramesWithFile("cannonball/Game_screen.plist");
//	std::string val = "background_asset/";
//	val.append(spriteName);
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


LabelClass* LabelClass::createSpt(char spriteName, float x, float y, char charid, MainGame *callerObject)
{
	LabelClass *createSprite_pSprite = new LabelClass();
	std::string val = "";
	val += spriteName;

//	createSprite_pSprite = (LabelClass *)Label::createWithBMFont("baloo_bhai.fnt", val);
//	createSprite_pSprite->setPosition(x, y);
	createSprite_pSprite->flag = 0;
	createSprite_pSprite->xP = x;
	createSprite_pSprite->yP = y;
	createSprite_pSprite->id = charid;
	createSprite_pSprite->answer = 'o';
	return createSprite_pSprite;
//	CC_SAFE_DELETE(createSprite_pSprite);
}

EventListenerClass * EventListenerClass::createCannon(std::string spriteName, int flag1, int currentShoot1, int totalShoot1, int id)
{
	EventListenerClass* createCannon_pSprite = new EventListenerClass();
	CCSpriteFrameCache::sharedSpriteFrameCache()->addSpriteFramesWithFile("cannonball_mainassetPlist.plist");
	std::string val = "cannonball/cannonball_mainasset/";
	val.append(spriteName);
	if (createCannon_pSprite->initWithSpriteFrameName(val))
	{
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

	int overlapped = 0;

//	int cannon1 = 0, cannon2 = 0, cannon3 = 0, cannon4 = 0;

	listener->onTouchBegan = [&](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = static_cast<Sprite*>(event->getCurrentTarget());
		Point locationInNode = target->convertToNodeSpace(touch->getLocation());
		Size s = target->getContentSize();
		Rect rect = Rect(0, 0, s.width, s.height);

		if (rect.containsPoint(locationInNode))
		{
			cannon1 = 0, cannon2 = 0, cannon3 = 0, cannon4 = 0;
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
				if (callerObject->cannonArray[i]->cannonID == 3)
				{
					cannon4 = 1;
				}
			}
/*			for (int i = 0; i < target1->self_reference->getChildrenCount(); i++)
			{
				if (target1->getChildren().contains(trans1))
				{
					cannon1 = 1;
				}
				if (target1->getChildren().at(i) == trans2)
				{
					cannon2 = 1;
				}
				if (target1->getChildren().at(i) == trans3)
				{
					cannon3 = 1;
				}
				if (target1->getChildren().at(i) == trans4)
				{
					cannon4 = 1;
				}
			}
	*/		return true;
		}
		return false;
	};

	listener->onTouchMoved = [&](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		EventListenerClass* target = static_cast<EventListenerClass*>(event->getCurrentTarget());
//		auto letterSprite = static_cast<Alphabet*>(callerObject->cannonLetter_actualImage[target->spriteIndex]);

		target->setPosition(target->getPosition() + touch->getDelta());
//		letterSprite->setPosition(target->getPosition() + touch->getDelta());


/*		EventListenerClass* target = static_cast<EventListenerClass*>(event->getCurrentTarget());
		target->setPosition(target->getPosition() + touch->getDelta());

		auto letterSprite = static_cast<Label*>(callerObject->cannonLetter_actualImage[target->spriteIndex]);
		letterSprite->setPosition(target->getPosition() + touch->getDelta());

		Rect targetRect = target->getBoundingBox();

		if (cannon1==1 && targetRect.intersectsRect(cannon1Target->getBoundingBox()) && cannon1Target->flag == 0)
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

			auto callback = CallFunc::create([this, target, callerObject]() { callerObject->loadCannon(target); });
			auto moveto = MoveTo::create(.2, Vec2(cannon1Target->getPositionX() + (cannon1Target->getContentSize().width / 4), cannon1Target->getPositionY()));
			auto seq = Sequence::create(moveto, callback, NULL);
			target->runAction(seq);

			callerObject->cannonLetter_actualImage[target->spriteIndex]->runAction(MoveTo::create(.2, Vec2(cannon1Target->getPositionX() + (cannon1Target->getContentSize().width / 4), cannon1Target->getPositionY())));
			overlapped = 1;
			cannon1Target->flag = 1;

			cocos2d::Director::getInstance()->getEventDispatcher()->removeEventListenersForTarget(target, true);
		}
		else if (cannon2 == 1 && targetRect.intersectsRect(cannon2Target->getBoundingBox()) && cannon2Target->flag == 0)
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

			auto callback = CallFunc::create([this, target, callerObject]() { callerObject->loadCannon(target); });
			auto moveto = MoveTo::create(.2, Vec2(cannon2Target->getPositionX() + (cannon2Target->getContentSize().width / 4), cannon2Target->getPositionY()));
			auto seq = Sequence::create(moveto, callback, NULL);
			target->runAction(seq);

			callerObject->cannonLetter_actualImage[target->spriteIndex]->runAction(MoveTo::create(.2, Vec2(cannon2Target->getPositionX() + (cannon2Target->getContentSize().width / 4), cannon2Target->getPositionY())));
			overlapped = 1;
			cannon2Target->flag = 1;

			cocos2d::Director::getInstance()->getEventDispatcher()->removeEventListenersForTarget(target, true);
		}
		else if (cannon3 == 1 && targetRect.intersectsRect(cannon3Target->getBoundingBox()) && cannon3Target->flag == 0)
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

			auto callback = CallFunc::create([this, target, callerObject]() { callerObject->loadCannon(target); });
			auto moveto = MoveTo::create(.2, Vec2(cannon3Target->getPositionX() + (cannon3Target->getContentSize().width / 4), cannon3Target->getPositionY()));
			auto seq = Sequence::create(moveto, callback, NULL);
			target->runAction(seq);

			callerObject->cannonLetter_actualImage[target->spriteIndex]->runAction(MoveTo::create(.2, Vec2(cannon3Target->getPositionX() + (cannon3Target->getContentSize().width / 4), cannon3Target->getPositionY())));
			overlapped = 1;
			cannon3Target->flag = 1;
			cocos2d::Director::getInstance()->getEventDispatcher()->removeEventListenersForTarget(target, true);
		}
		else if (cannon4 == 1 && targetRect.intersectsRect(cannon4Target->getBoundingBox()) && cannon4Target->flag == 0)
		{
//			callerObject::cannon_ballArray[target->spriteIndex]->placedNumber = 4;
			target->placedNumber = 3;
			for (int i = 0; i < MainGame::cannonArray.size(); i++)
			{
				if (MainGame::cannonArray[i]->cannonID == 3)
				{
					MainGame::cannonArray[i]->placedNumber = 3;
					break;
				}
			}

			auto callback = CallFunc::create([this, target, callerObject]() { callerObject->loadCannon(target); });
			auto moveto = MoveTo::create(.2, Vec2(cannon4Target->getPositionX() + (cannon4Target->getContentSize().width / 4), cannon4Target->getPositionY()));
			auto seq = Sequence::create(moveto, callback, NULL);
			target->runAction(seq);

			callerObject->cannonLetter_actualImage[target->spriteIndex]->runAction(MoveTo::create(.2, Vec2(cannon4Target->getPositionX() + (cannon4Target->getContentSize().width / 4), cannon4Target->getPositionY())));
			overlapped = 1;
			cannon4Target->flag = 1;

			cocos2d::Director::getInstance()->getEventDispatcher()->removeEventListenersForTarget(target, true);
		}
*/	};

	listener->onTouchEnded = [&](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		EventListenerClass* target = static_cast<EventListenerClass*>(event->getCurrentTarget());
		target->setPosition(target->getPosition() + touch->getDelta());

//		auto letterSprite = static_cast<Alphabet*>(callerObject->cannonLetter_actualImage[target->spriteIndex]);
//		letterSprite->setPosition(target->getPosition() + touch->getDelta());

		Rect targetRect = target->getBoundingBox();

		if (cannon1 == 1 && targetRect.intersectsRect(cannon1Target->getBoundingBox()) && cannon1Target->flag == 0)
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

			auto callback = CallFunc::create([this, target, callerObject]() { callerObject->loadCannon(target); });
			auto moveto = MoveTo::create(.2, Vec2(cannon1Target->getPositionX() + (cannon1Target->getContentSize().width / 4), cannon1Target->getPositionY()));
			auto seq = Sequence::create(moveto, callback, NULL);
			target->runAction(seq);

//			callerObject->cannonLetter_actualImage[target->spriteIndex]->runAction(MoveTo::create(.2, Vec2(cannon1Target->getPositionX() + (cannon1Target->getContentSize().width / 4), cannon1Target->getPositionY())));
			cannon1Target->flag = 1;

			cocos2d::Director::getInstance()->getEventDispatcher()->removeEventListenersForTarget(target, true);
		}
		else if (cannon2 == 1 && targetRect.intersectsRect(cannon2Target->getBoundingBox()) && cannon2Target->flag == 0)
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

			auto callback = CallFunc::create([this, target, callerObject]() { callerObject->loadCannon(target); });
			auto moveto = MoveTo::create(.2, Vec2(cannon2Target->getPositionX() + (cannon2Target->getContentSize().width / 4), cannon2Target->getPositionY()));
			auto seq = Sequence::create(moveto, callback, NULL);
			target->runAction(seq);

//			callerObject->cannonLetter_actualImage[target->spriteIndex]->runAction(MoveTo::create(.2, Vec2(cannon2Target->getPositionX() + (cannon2Target->getContentSize().width / 4), cannon2Target->getPositionY())));
			cannon2Target->flag = 1;

			cocos2d::Director::getInstance()->getEventDispatcher()->removeEventListenersForTarget(target, true);
		}
		else if (cannon3 == 1 && targetRect.intersectsRect(cannon3Target->getBoundingBox()) && cannon3Target->flag == 0)
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

			auto callback = CallFunc::create([this, target, callerObject]() { callerObject->loadCannon(target); });
			auto moveto = MoveTo::create(.2, Vec2(cannon3Target->getPositionX() + (cannon3Target->getContentSize().width / 4), cannon3Target->getPositionY()));
			auto seq = Sequence::create(moveto, callback, NULL);
			target->runAction(seq);

//			callerObject->cannonLetter_actualImage[target->spriteIndex]->runAction(MoveTo::create(.2, Vec2(cannon3Target->getPositionX() + (cannon3Target->getContentSize().width / 4), cannon3Target->getPositionY())));
			cannon3Target->flag = 1;
			cocos2d::Director::getInstance()->getEventDispatcher()->removeEventListenersForTarget(target, true);
		}
		else if (cannon4 == 1 && targetRect.intersectsRect(cannon4Target->getBoundingBox()) && cannon4Target->flag == 0)
		{
			//			callerObject::cannon_ballArray[target->spriteIndex]->placedNumber = 4;
			target->placedNumber = 3;
			for (int i = 0; i < MainGame::cannonArray.size(); i++)
			{
				if (MainGame::cannonArray[i]->cannonID == 3)
				{
					MainGame::cannonArray[i]->placedNumber = 3;
					break;
				}
			}

			auto callback = CallFunc::create([this, target, callerObject]() { callerObject->loadCannon(target); });
			auto moveto = MoveTo::create(.2, Vec2(cannon4Target->getPositionX() + (cannon4Target->getContentSize().width / 4), cannon4Target->getPositionY()));
			auto seq = Sequence::create(moveto, callback, NULL);
			target->runAction(seq);

//			callerObject->cannonLetter_actualImage[target->spriteIndex]->runAction(MoveTo::create(.2, Vec2(cannon4Target->getPositionX() + (cannon4Target->getContentSize().width / 4), cannon4Target->getPositionY())));
			cannon4Target->flag = 1;

			cocos2d::Director::getInstance()->getEventDispatcher()->removeEventListenersForTarget(target, true);
		}
		else
		{
			auto target = static_cast<EventListenerClass*>(event->getCurrentTarget());
			target->runAction(MoveTo::create(.2, Vec2(target->xP, target->yP)));

//			Alphabet* letterSprite = static_cast<Alphabet*>(callerObject->cannonLetter_actualImage[target->spriteIndex]);

//			letterSprite->runAction(MoveTo::create(.2, Vec2(target->xP, target->yP)));
		}
	};
	
	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener, this);
}

void EventListenerClass::print(EventListenerClass* eve)
{
	CCLOG("yes");
	CCLOG("%d", eve->xP);
}

void EventListenerClass::touchEvent(cocos2d::Touch* touch, cocos2d::Vec2 _p)
{
	CCLOG("yes");
}
//    Size visibleSize = Director::getInstance()->getVisibleSize();
//    Vec2 origin = Director::getInstance()->getVisibleOrigin();
