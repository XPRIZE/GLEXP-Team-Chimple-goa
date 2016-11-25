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

	_ShapeBg = CSLoader::createNode("Shape/Shape.csb");
//	_ShapeBg->setPosition(Vec2(visibleSize.width / 2, 0));
//	_ShapeBg->setAnchorPoint(Vec2(.5, 0));
	this->addChild(_ShapeBg);

//	auto back = Sprite::create("shape/Background.png");
//	back->setPosition(Vec2(visibleSize.width / 2, visibleSize.height / 2));
//	this->addChild(back);

	if (_level == 1)
	{
//		_help = HelpLayer::create(Rect(_position[2].x, _position[2].y + _allBar.at(2)->getContentSize().width / 2, _allBar.at(2)->getContentSize().height, _allBar.at(2)->getContentSize().width), Rect(0, 0, 0, 0));
//		_help->clickAndDrag(Vec2(_position[2].x, _position[2].y), Vec2(_position[2].x, _position[2].y + _allBar.at(2)->getContentSize().width));
//		this->addChild(_help);
//		_helpFlag = 0;
	}

	auto water_tank = Sprite::createWithSpriteFrameName("shape/water_tank.png");
	water_tank->setPosition(Vec2(visibleSize.width / 2, visibleSize.height / 2));
	this->addChild(water_tank);

	_water = Sprite::createWithSpriteFrameName("shape/water_level.png");
	_water->setPosition(Vec2(visibleSize.width / 2, visibleSize.height * .315));
	_water->setAnchorPoint(Vec2(.5, 0));
	this->addChild(_water);

	_fish = Sprite::createWithSpriteFrameName("shape/fish.png");
	_fish->setPosition(Vec2(visibleSize.width * .83, visibleSize.height * .60));
	this->addChild(_fish);


	auto _moveBy = MoveBy::create(2, Vec2(-(_fish->getPositionX() - visibleSize.width * .20), 0));
	auto _delay = DelayTime::create(.01f);

	_fishSequence = Sequence::create(_moveBy, CallFunc::create([=] {
		_fish->setScaleX(-_fish->getScaleX());
	}),  _delay, _moveBy->reverse(), _delay, CallFunc::create([=] {
		_fish->setScaleX(-_fish->getScaleX());
	}), NULL);
	_fishRepeat = RepeatForever::create(_fishSequence);
	_fish->runAction(_fishRepeat);

	_differntSceneMapping = {

		{ 1,
		{
			{ 0, "circle" },
			{ 1, "diamond" }
		} },
		{ 2,
		{
			{ 0, "pentagon" },
			{ 1, "square" },
			{ 2, "star" },
			{ 3, "tringle" },
		} },
		{ 3,
		{
			{ 0, "Left_Crack" },
			{ 1, "Right_Crack" },
			{ 2, "Top_Crack" },
			{ 3, "Bottom_Crack" }
		} },
	};

	_differntPosition = {

		{ 1,
		{
			{ 0, visibleSize.width * .30 },
			{ 1, visibleSize.height / 2 },

			{ 2, visibleSize.width * .70 },
			{ 3, visibleSize.height / 2 }
		} },
		{ 2,
		{
			{ 0, visibleSize.width * .20 },
			{ 1, visibleSize.height / 2 },

			{ 2, visibleSize.width * .50 },
			{ 3, visibleSize.height / 2 },

			{ 4, visibleSize.width * .80 },
			{ 5, visibleSize.height / 2 }
		} },
	};

	int val = -1;
	for (int i = 0; i < _differntSceneMapping.at(_level).size(); i++)
	{
		std::ostringstream _trans;

		_trans << "shape/" << _differntSceneMapping.at(_level).at(i) << "_trans.png";
		auto _circle_Trans = Sprite::createWithSpriteFrameName(_trans.str());
		_circle_Trans->setPosition(Vec2(_differntPosition.at(_level).at(++val), _differntPosition.at(_level).at(++val)));
		this->addChild(_circle_Trans);

		std::ostringstream _main;
		_main << "shape/" << _differntSceneMapping.at(_level).at(i) << ".png";
		auto _circle = Sprite::createWithSpriteFrameName(_main.str());
		_circle->setPosition(Vec2(_circle_Trans->getPositionX(), _circle_Trans->getPositionY()));
		this->addChild(_circle);
	}
	/*
	_circle = Sprite::create("shape/Circle.png");
	_circle->setPosition(Vec2(visibleSize.width / 2, visibleSize.height / 2));
	this->addChild(_circle);

	_circle_Trans = Sprite::create("shape/Circle_Trans.png");
	_circle_Trans->setPosition(Vec2(_circle->getPositionX(), _circle->getPositionY()));
	this->addChild(_circle_Trans);

	_bottom_Crack = Sprite::create("shape/Bottom_Crack.png");
	_bottom_Crack->setPosition(Vec2(_circle_Trans->getPositionX(), _circle_Trans->getPositionY() - _circle_Trans->getContentSize().height / 2));
	_bottom_Crack->setScale(.4);
	this->addChild(_bottom_Crack);
*/

	this->scheduleUpdate();
}

bool Shape::init()
{
	if (!Layer::init())
	{
		return false;
	}
	return true;
}

void Shape::update(float d)
{
	if (_water->getScaleY() >= 0.0)
	{
		_water->setScaleY(_water->getScaleY() - .00050);
	}
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