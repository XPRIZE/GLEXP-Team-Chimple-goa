#include "Step.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../menu/HelpLayer.h"

USING_NS_CC;

Step::Step() {
}

Step::~Step() {
}

Scene* Step::createScene()
{
	auto scene = Scene::create();
	auto layer = Step::create();
	scene->addChild(layer);
    layer->_menuContext = MenuContext::create(layer, Step::gameName());
    scene->addChild(layer->_menuContext);
	return scene;
}

void Step::onEnterTransitionDidFinish()
{
//	_menuContext->setMaxPoints(8);
	_level = _menuContext->getCurrentLevel();

	visibleSize = Director::getInstance()->getWinSize();

	_StepBg = CSLoader::createNode("card/background.csb");
	this->addChild(_StepBg);
}

bool Step::init()
{
	if (!Layer::init())
	{
		return false;
	}

	return true;
}

void Step::addEvents()
{
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(true);

	listener->onTouchBegan = [=] (cocos2d::Touch *touch, cocos2d::Event *event)
	{
		auto target = static_cast<Sprite*>(event->getCurrentTarget());
		Point locationInNode = target->convertToNodeSpace(touch->getLocation());
		Size size = target->getContentSize();
		Rect rect = Rect(0, 0, 100, 100);

		if (rect.containsPoint(locationInNode))
		{
			return true;
		}
		return false;
	};
//	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener->clone(), sprite._sprite->getChildByName("box_1"));
}
