#include "Shape.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../menu/HelpLayer.h"

USING_NS_CC;

Shape::Shape() {
}

Shape::~Shape() {
}

Scene* Shape::createScene()
{
	auto scene = Scene::create();
	auto layer = Shape::create();
	scene->addChild(layer);
    layer->_menuContext = MenuContext::create(layer, Shape::gameName());
    scene->addChild(layer->_menuContext);
	return scene;
}

void Shape::onEnterTransitionDidFinish()
{
	_menuContext->setMaxPoints(10);
	_level = _menuContext->getCurrentLevel();

	visibleSize = Director::getInstance()->getWinSize();

	_ShapeBg = CSLoader::createNode("bar/shop.csb");
	_ShapeBg->setPosition(Vec2(visibleSize.width / 2, 0));
	_ShapeBg->setAnchorPoint(Vec2(.5, 0));
	this->addChild(_ShapeBg);

	if (_level == 1)
	{
//		_help = HelpLayer::create(Rect(_position[2].x, _position[2].y + _allBar.at(2)->getContentSize().width / 2, _allBar.at(2)->getContentSize().height, _allBar.at(2)->getContentSize().width), Rect(0, 0, 0, 0));
//		_help->clickAndDrag(Vec2(_position[2].x, _position[2].y), Vec2(_position[2].x, _position[2].y + _allBar.at(2)->getContentSize().width));
//		this->addChild(_help);
//		_helpFlag = 0;
	}

}

bool Shape::init()
{
	if (!Layer::init())
	{
		return false;
	}
	return true;
}

void Shape::addEvents()
{
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(true);

	listener->onTouchBegan = [=] (cocos2d::Touch *touch, cocos2d::Event *event)
	{
		auto target = static_cast<Sprite*>(event->getCurrentTarget());
		Point locationInNode = target->convertToNodeSpace(touch->getLocation());
		Size size = target->getContentSize();
/*		Rect rect = Rect(0, 0, target->getContentSize().width * _percent[_percentLevelNo][2] / 100, target->getContentSize().height);

		if (rect.containsPoint(locationInNode))
		{
			return true;
		}
*/		return false;
	};

	listener->onTouchMoved = [=](cocos2d::Touch *touch, cocos2d::Event *event)
	{
	};

	listener->onTouchEnded = [=](cocos2d::Touch *touch, cocos2d::Event *event)
	{
	};

//	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener->clone(), sprite._loadingBar);
}