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
		_water->setScaleY(_water->getScaleY() - .00005);
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
		} },
		{ 3,
		{
			{ 0, "Hexagon" },
			{ 1, "Octagon" },
			{ 2, "circle" },
		} },
		{ 4,
		{
			{ 0, "Rectangle" },
			{ 1, "cross" },
			{ 2, "pentagon" },
		} },
		{ 5,
		{
			{ 0, "heart" },
			{ 1, "oval" },
			{ 2, "pentagon" },
			{ 3, "Hexagon" },
		} },
		{ 6,
		{
			{ 0, "star" },
			{ 1, "triangle" },
			{ 2, "cross" },
			{ 3, "heart" },
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
	};

	int _posIndex = -1;
	for (int i = 0; i < _differntSceneMapping.at(_level).size(); i++)
	{
		std::ostringstream _trans;
		_posIndex++;
		int _posIndexY = 1 + _posIndex;
		_trans << "Shape/" << _differntSceneMapping.at(_level).at(i) << "_trans.png";

		TransSpriteDetails._sprite = Sprite::createWithSpriteFrameName(_trans.str());
		TransSpriteDetails._sprite->setPosition(Vec2(_differntPosition.at(1).at(_posIndex), _differntPosition.at(1).at(_posIndexY)));
		TransSpriteDetails._sprite->setOpacity(0);
		TransSpriteDetails._id = i;
		TransSpriteDetails._flag = 0;
		this->addChild(TransSpriteDetails._sprite);

		std::ostringstream _main;
		_main << "Shape/" << _differntSceneMapping.at(_level).at(i) << ".png";
		RealSpriteDetails._sprite = Sprite::createWithSpriteFrameName(_main.str());
		RealSpriteDetails._sprite->setPosition(Vec2(TransSpriteDetails._sprite->getPositionX(), TransSpriteDetails._sprite->getPositionY()));
		RealSpriteDetails._id = i;
		RealSpriteDetails._flag = 0;
		RealSpriteDetails._xp = RealSpriteDetails._sprite->getPositionX();
		RealSpriteDetails._yp = visibleSize.height * .08;
		this->addChild(RealSpriteDetails._sprite, 2);

		CCParticleSystemQuad *_particle = CCParticleSystemQuad::create("Shape/particle_texture.plist");
		_particle->setTexture(CCTextureCache::sharedTextureCache()->addImage("Shape/particle_texture.png"));
		_particle->setPosition(Vec2(RealSpriteDetails._sprite->getPositionX(), RealSpriteDetails._sprite->getPositionY()));
		_particle->setVisible(false);
		this->addChild(_particle);

		std::transform(_differntSceneMapping.at(_level).at(i).begin(), _differntSceneMapping.at(_level).at(i).end(), _differntSceneMapping.at(_level).at(i).begin(), ::toupper);
		TransSpriteDetails._name = _differntSceneMapping.at(_level).at(i);
		RealSpriteDetails._name = _differntSceneMapping.at(_level).at(i);
		_realSpriteDetails.push_back(RealSpriteDetails);
		_transSpriteDetails.push_back(TransSpriteDetails);
		_particleDetails.push_back(_particle);
		_posIndex = _posIndexY;

		addEvents(RealSpriteDetails);
	}

	_shapeName = Label::createWithSystemFont("", "Arial", 100);
	_shapeName->setPositionX(_ShapeBg->getChildByName("alphabet_board_4")->getPositionX());
	_shapeName->setPositionY(_ShapeBg->getChildByName("alphabet_board_4")->getPositionY() - _ShapeBg->getChildByName("alphabet_board_4")->getContentSize().height / 4);
	_shapeName->setColor(Color3B(255, 255, 255));
	this->addChild(_shapeName);

	this->runAction(Sequence::create(DelayTime::create(1), CallFunc::create([=] {
		objectMovement();
	}), NULL));


	if (_level == 1)
	{
		_help = HelpLayer::create(Rect(_transSpriteDetails.at(0)._sprite->getPositionX(), visibleSize.height * .10, _transSpriteDetails.at(0)._sprite->getContentSize().height, _transSpriteDetails.at(0)._sprite->getContentSize().width), Rect(_transSpriteDetails.at(0)._sprite->getPositionX(), _transSpriteDetails.at(0)._sprite->getPositionY(), _transSpriteDetails.at(0)._sprite->getContentSize().height, _transSpriteDetails.at(0)._sprite->getContentSize().width));
		this->addChild(_help, 3);
		_helpFlag = 1;
	}
}

void Shape::objectMovement()
{
	for(int i = 0; i<_realSpriteDetails.size(); i++)
	{
		_particleDetails.at(i)->setVisible(true);
		_realSpriteDetails.at(i)._sprite->runAction(MoveTo::create(.5, Vec2(_realSpriteDetails.at(i)._sprite->getPositionX(), visibleSize.height * .08)));
		_transSpriteDetails.at(i)._sprite->runAction(Sequence::create(FadeIn::create(.5), CallFunc::create([=] {
			if (i == _realSpriteDetails.size() - 1)
			{
				_moveFlag = 1;

				if (_level == 1)
					_help->clickAndDrag(Vec2(_transSpriteDetails.at(0)._sprite->getPositionX(), visibleSize.height * .08), Vec2(_transSpriteDetails.at(0)._sprite->getPositionX(), _transSpriteDetails.at(0)._sprite->getPositionY()));
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
			_shapeName->setString(sprite._name);
			if (_helpFlag == 1)
			{
				this->removeChild(_help);
				_helpFlag = -1;
			}

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
				_particleDetails.at(sprite._id)->setVisible(false);

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