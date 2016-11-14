#include "Card.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../menu/HelpLayer.h"

USING_NS_CC;

Card::Card() {
}

Card::~Card() {
}

Scene* Card::createScene()
{
	auto scene = Scene::create();
	auto layer = Card::create();
	scene->addChild(layer);
    layer->_menuContext = MenuContext::create(layer, Card::gameName());
    scene->addChild(layer->_menuContext);
	return scene;
}

void Card::onEnterTransitionDidFinish()
{
//	_menuContext->setMaxPoints(8);
	_level = _menuContext->getCurrentLevel();

	visibleSize = Director::getInstance()->getWinSize();
	this->scheduleUpdate();
}

bool Card::init()
{
	if (!Layer::init())
	{
		return false;
	}
	
	return true;
}

void Card::update(float d)
{
}

void Card::gameEnd()
{

}

void Card::addEvents()
{
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(true);

	listener->onTouchBegan = [=] (cocos2d::Touch *touch, cocos2d::Event *event)
	{
		auto target = static_cast<Sprite*>(event->getCurrentTarget());
		Point locationInNode = target->convertToNodeSpace(touch->getLocation());
		Size size = target->getContentSize();
		Rect rect = Rect(0, 0, size.width, size.height);

		if (rect.containsPoint(locationInNode))
		{
			return true;
		}
		return false;
	};

//	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener->clone(), sprite.sprite);
}
