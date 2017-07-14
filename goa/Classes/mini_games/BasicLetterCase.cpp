//
//  BasicLetterCase.cpp 
//  goa
//
//  Created by Karim Mirazul  on 14/07/17
//
//

#include "BasicLetterCase.h"
#include "../menu/HelpLayer.h"
#include "../util/CommonLabelTTF.h"

USING_NS_CC;

Scene* BasicLetterCase::createScene()
{
	auto scene = Scene::create();
	auto layer = BasicLetterCase::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, BasicLetterCase::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

BasicLetterCase *BasicLetterCase::create() {
	BasicLetterCase *blast = new (std::nothrow) BasicLetterCase();
	if (blast && blast->init()) {
		blast->autorelease();
		return blast;
	}
	CC_SAFE_DELETE(blast);
	return nullptr;
}

bool BasicLetterCase::init()
{
	if (!Layer::init()) { return false; }

	return true;
}

void BasicLetterCase::onEnterTransitionDidFinish() {


	this->scheduleUpdate();
}

void BasicLetterCase::update(float delta) {
}

void BasicLetterCase::setSpriteProperties(Sprite* ImageObject, float positionX, float positionY, float scaleX, float scaleY, float anchorX, float anchorY, float rotation, int zorder) {
	ImageObject->setPosition(Vec2(positionX, positionY));
	ImageObject->setScaleX(scaleX);
	ImageObject->setScaleY(scaleY);
	ImageObject->setAnchorPoint(Vec2(anchorX, anchorY));
	ImageObject->setRotation(rotation);
	ImageObject->setZOrder(zorder);
}

void BasicLetterCase::addEventsOnCream(cocos2d::Sprite* callerObject)
{
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(false);

	listener->onTouchBegan = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		auto locationInNode = target->getParent()->convertToNodeSpace(touch->getLocation());

		if (target->getBoundingBox().containsPoint(locationInNode)) {
			return true;
		}
		return false;
	};

	listener->onTouchEnded = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		auto locationInNode = target->getParent()->convertToNodeSpace(touch->getLocation());
		
		if (target->getBoundingBox().containsPoint(locationInNode)) {
	
		}
		return false;
	};

	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, callerObject);
}

BasicLetterCase::~BasicLetterCase(void)
{
	this->removeAllChildrenWithCleanup(true);
}