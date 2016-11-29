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

	if (_ShapeBg->getChildByName("water_level")->getPositionY() + _water->getBoundingBox().size.height < _fish->getPositionY() && _firstFishFlag == 0)
	{
		for (int i = 0; i < _realSpriteDetails.size(); i++)
		{
			Director::getInstance()->getEventDispatcher()->removeEventListenersForTarget(_realSpriteDetails.at(i)._sprite);
		}

		_firstFishFlag = 1;
		_fish->stopAction(_fishTimeline);
		_fish->stopAction(_fishRepeat);

		_fish->runAction(Sequence::create(MoveTo::create(1, Vec2(_fish->getPositionX(), visibleSize.height * .35)), CallFunc::create([=] {
			_menuContext->addPoints(-10);
			_menuContext->showScore();
			this->unscheduleUpdate();
		}), NULL));
	}

	if (_ShapeBg->getChildByName("water_level")->getPositionY() + _water->getBoundingBox().size.height < (_transSpriteDetails.at(0)._sprite->getPositionY() - _transSpriteDetails.at(0)._sprite->getContentSize().height * .30))
	{
		this->unscheduleUpdate();

		int _flag = 0;
		for (int i = 0; i < _realSpriteDetails.size(); i++)
		{
			if (_realSpriteDetails.at(i)._flag == 1)
				_flag++;
		}

		if (_flag != _realSpriteDetails.size())
		{
			_menuContext->addPoints(-10);
			_menuContext->showScore();
		}
		else
		{
			_menuContext->addPoints(10);
			_menuContext->showScore();
		}
	}
}

void Shape::onEnterTransitionDidFinish()
{
	_menuContext->setMaxPoints(10);
	_level = _menuContext->getCurrentLevel();

	visibleSize = Director::getInstance()->getWinSize();

	_ShapeBg = CSLoader::createNode("Shape/Shape.csb");
	this->addChild(_ShapeBg);

	if (_level == 1)
	{
//		_help = HelpLayer::create(Rect(_position[2].x, _position[2].y + _allBar.at(2)->getContentSize().width / 2, _allBar.at(2)->getContentSize().height, _allBar.at(2)->getContentSize().width), Rect(0, 0, 0, 0));
//		_help->clickAndDrag(Vec2(_position[2].x, _position[2].y), Vec2(_position[2].x, _position[2].y + _allBar.at(2)->getContentSize().width));
//		this->addChild(_help);
//		_helpFlag = 0;
	}

	_water = (Sprite*)_ShapeBg->getChildByName("water_level")->getChildren().at(0);
	_water->setAnchorPoint(Vec2(.5, 0));

	_fish = CSLoader::createNode("Shape/fish.csb");
	_fish->setPosition(Vec2(visibleSize.width * .80, visibleSize.height * .50));
	this->addChild(_fish);

	_fishTimeline = CSLoader::createTimeline("Shape/fish.csb");
	_fish->runAction(_fishTimeline);
	_fishTimeline->play("fish_01", true);


	auto _moveBy = MoveBy::create(5, Vec2(-(_fish->getPositionX() - visibleSize.width * .20), 0));
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
//			{ 3, "tringle" },
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

	int _posIndex = -1;
	for (int i = 0; i < _differntSceneMapping.at(_level).size(); i++)
	{
		std::ostringstream _trans;
		_posIndex++;
		int _posIndexY = 1 + _posIndex;
		_trans << "Shape/" << _differntSceneMapping.at(_level).at(i) << "_trans.png";

		TransSpriteDetails._sprite = Sprite::createWithSpriteFrameName(_trans.str());
		TransSpriteDetails._sprite->setPosition(Vec2(_differntPosition.at(_level).at(_posIndex), _differntPosition.at(_level).at(_posIndexY)));
		TransSpriteDetails._sprite->setOpacity(0);
		TransSpriteDetails._id = i;
		TransSpriteDetails._flag = 0;
		this->addChild(TransSpriteDetails._sprite);

		_transSpriteDetails.push_back(TransSpriteDetails);

		std::ostringstream _main;
		_main << "Shape/" << _differntSceneMapping.at(_level).at(i) << ".png";
		RealSpriteDetails._sprite = Sprite::createWithSpriteFrameName(_main.str());
		RealSpriteDetails._sprite->setPosition(Vec2(TransSpriteDetails._sprite->getPositionX(), TransSpriteDetails._sprite->getPositionY()));
		RealSpriteDetails._id = i;
		RealSpriteDetails._flag = 0;
		RealSpriteDetails._xp = RealSpriteDetails._sprite->getPositionX();
		RealSpriteDetails._yp = visibleSize.height * .08;
		this->addChild(RealSpriteDetails._sprite);
		_realSpriteDetails.push_back(RealSpriteDetails);
		_posIndex = _posIndexY;

		addEvents(RealSpriteDetails);
	}

	this->runAction(Sequence::create(DelayTime::create(1), CallFunc::create([=] {
		objectMovement();
	}), NULL));

//	ParticleSystem *ps = ParticleSystem::create("Shape/particle_texture.plist")
//	ps->setPosition(Vec2(visibleSize.width / 2, visibleSize.height / 2));
//	this->addChild(ps, 2);
}

void Shape::objectMovement()
{
	for(int i = 0; i<_realSpriteDetails.size(); i++)
	{
		_realSpriteDetails.at(i)._sprite->runAction(MoveTo::create(.5, Vec2(_realSpriteDetails.at(i)._sprite->getPositionX(), visibleSize.height * .08)));
		_transSpriteDetails.at(i)._sprite->runAction(Sequence::create(FadeIn::create(.5), CallFunc::create([=] {
			if (i == _realSpriteDetails.size() - 1)
			{
				_moveFlag = 1;
			}
		}), NULL));
	}
	this->scheduleUpdate();
}

void Shape::addEvents(struct SpriteDetails sprite)
{
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(true);

	listener->onTouchBegan = [=] (cocos2d::Touch *touch, cocos2d::Event *event)
	{
		auto target = static_cast<Sprite*>(event->getCurrentTarget());
		Point locationInNode = target->convertToNodeSpace(touch->getLocation());
		Size size = target->getContentSize();
		Rect rect = Rect(0, 0, target->getContentSize().width, target->getContentSize().height);

		if (rect.containsPoint(locationInNode) && _moveFlag==1)
		{
			_moveFlag = 0;
			return true;
		}
		return false;
	};

	listener->onTouchMoved = [=](cocos2d::Touch *touch, cocos2d::Event *event)
	{
		auto target = static_cast<Sprite*>(event->getCurrentTarget());
		target->setPosition(touch->getLocation());
	};

	listener->onTouchEnded = [=](cocos2d::Touch *touch, cocos2d::Event *event)
	{
		auto target = static_cast<Sprite*>(event->getCurrentTarget());
		Rect _targetRect = target->getBoundingBox();
		Rect _transRect = _transSpriteDetails.at(sprite._id)._sprite->getBoundingBox();

		if (_transRect.intersectsRect(_targetRect))
		{
			_realSpriteDetails.at(sprite._id)._flag = 1;
			target->runAction(Sequence::create(MoveTo::create(.5, Vec2(_transSpriteDetails.at(sprite._id)._sprite->getPositionX(), _transSpriteDetails.at(sprite._id)._sprite->getPositionY())),
				CallFunc::create([=] {
				_transSpriteDetails.at(sprite._id)._sprite->setOpacity(0);
				_moveFlag = 1;

				int _flag = 0;
				for (int i = 0; i < _realSpriteDetails.size(); i++)
				{
					if (_realSpriteDetails.at(i)._flag == 1)
						_flag++;
				}

				if (_flag == _realSpriteDetails.size() && _firstFishFlag==0)
					_menuContext->showScore();

			}), NULL));
			Director::getInstance()->getEventDispatcher()->removeEventListenersForTarget(target);
		}
		else
		{
			target->runAction(Sequence::create(MoveTo::create(.5, Vec2(sprite._xp, sprite._yp)), CallFunc::create([=] {
				_moveFlag = 1;
			}), NULL));
		}
	};

	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener->clone(), sprite._sprite);
}