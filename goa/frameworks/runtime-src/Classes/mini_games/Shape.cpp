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
	if (_transSpriteDetails.size() >= 1 && _waterSoundFlag == 0)
	{
		_waterSound = CocosDenshion::SimpleAudioEngine::getInstance();
		_waterSound->playEffect("sounds/sfx/water.ogg", true);
		_waterSoundFlag = 1;
	}
	else if (_transSpriteDetails.size() == 0 && _waterSoundFlag == 1)
	{
		_waterSound->stopAllEffects();
		_waterSoundFlag = 0;
	}


	if (_transSpriteDetails.size()>=1 && _water->getScaleY() >= 0.0)
	{
		_water->setScaleY(_water->getScaleY() - _waterSpeed);
	}

	if (_ShapeBg->getChildByName("water_level")->getPositionY() + _water->getBoundingBox().size.height < _fish->getPositionY() && _firstFishFlag == 0)
	{
		for (int i = 0; i < _transSpriteDetails.size(); i++)
		{
			Director::getInstance()->getEventDispatcher()->removeEventListenersForTarget(_transSpriteDetails.at(i)._sprite);
		}

		_firstFishFlag = 1;
		_fish->stopAction(_fishTimeline);
		_fish->stopAction(_fishRepeat);

		_fish->runAction(Sequence::create(MoveTo::create(1, Vec2(_fish->getPositionX(), visibleSize.height * .35)), CallFunc::create([=] {
			this->unscheduleUpdate();
			_waterSound->stopAllEffects();
			_menuContext->showScore();
		}), NULL));
	}

	for (int i = 0; i < _transSpriteDetails.size(); i++)
	{
		if (_transSpriteDetails.at(i)._flag == 0 && _transSpriteDetails.at(i)._sprite->getPositionY() > _ShapeBg->getChildByName("water_level")->getPositionY() + _water->getBoundingBox().size.height)
		{
			_transSpriteDetails.at(i)._flag = 1;
			_transSpriteDetails.at(i)._sprite->removeChild(_transSpriteDetails.at(i)._sprite->getChildren().at(0), true);
		}
	}

	if (_menuContext->isGamePaused())
	{
		_moveFlag = 1;
	}
}

void Shape::onEnterTransitionDidFinish()
{
	_level = _menuContext->getCurrentLevel();

	_waterSpeed = .00004;

	visibleSize = Director::getInstance()->getWinSize();

	_ShapeBg = CSLoader::createNode("Shape/Shape.csb");

	if (visibleSize.width > 2560)
	{
		float xP = (visibleSize.width - 2560) / 2;
		_ShapeBg->setPosition(Vec2(xP, 0));
//		_ShapeBg->setAnchorPoint(Vec2(.5, 0));
	}
	else
	{
		_ShapeBg->setPosition(Vec2(visibleSize.width / 2, 0));
		_ShapeBg->setAnchorPoint(Vec2(.5, 0));
	}

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

		{ 7,
		{
			{ 0, "Rectangle" },
			{ 1, "Octagon" },
			{ 2, "square" },
			{ 3, "diamond" },
			{ 4, "circle" },
		} },
		{ 8,
		{
			{ 0, "heart" },
			{ 1, "oval" },
			{ 2, "pentagon" },
			{ 3, "Hexagon" },
			{ 4, "star" },
		} },

		{ 9,
		{
			{ 0, "Hexagon" },
			{ 1, "heart" },
			{ 2, "square" },
			{ 3, "oval" },
			{ 4, "star" },
			{ 5, "diamond" },
		} },
		{ 10,
		{
			{ 0, "pentagon" },
			{ 1, "oval" },
			{ 2, "Rectangle" },
			{ 3, "Hexagon" },
			{ 4, "circle" },
			{ 5, "star" },
		} },
	};

	_differntPosition = {

		{ 2,
		{
			{ 0, visibleSize.width * .30 },
			{ 1, visibleSize.width * .70 },
			{ 2, 10 },
			{ 3, 5 },
		} },

		{ 4,
		{
			{ 0, visibleSize.width * .20 },
			{ 1, visibleSize.width * .50 },
			{ 2, visibleSize.width * .80 },
			{ 3, 15 },
			{ 4, 4 },
		} },

		{ 6,
		{
			{ 0, visibleSize.width * .15 },
			{ 1, visibleSize.width * .40 },
			{ 2, visibleSize.width * .60 },
			{ 3, visibleSize.width * .85 },
			{ 4, 20 },
			{ 5, 3 },
		} },

		{ 8,
		{
			{ 0, visibleSize.width * .10 },
			{ 1, visibleSize.width * .30 },
			{ 2, visibleSize.width * .50 },
			{ 3, visibleSize.width * .70 },
			{ 4, visibleSize.width * .90 },
			{ 5, 25 },
			{ 6, 2.5 },
		} },

		{ 10,
		{
			{ 0, visibleSize.width * .10 },
			{ 1, visibleSize.width * .25 },
			{ 2, visibleSize.width * .40 },
			{ 3, visibleSize.width * .55 },
			{ 4, visibleSize.width * .70 },
			{ 5, visibleSize.width * .88 },
			{ 6, 30 },
			{ 7, 2 },
		} },
	};

	int _posIndex = -1;
	if (_level % 2 == 0)
	{
		_posmainIndex = _level;
	}
	else
		_posmainIndex = _level + 1;


	for (int i = 0; i < _differntSceneMapping.at(_level).size(); i++)
	{
		std::ostringstream _main;
		_main << "Shape/" << _differntSceneMapping.at(_level).at(i) << ".png";
		RealSpriteDetails._sprite = Sprite::createWithSpriteFrameName(_main.str());
		RealSpriteDetails._sprite->setPosition(Vec2(_differntPosition.at(_posmainIndex).at(i), visibleSize.height * .08));
		RealSpriteDetails._id = i;
		RealSpriteDetails._spriteName = _main.str();
		RealSpriteDetails._flag = 0;
		RealSpriteDetails._xp = RealSpriteDetails._sprite->getPositionX();
		RealSpriteDetails._yp = RealSpriteDetails._sprite->getPositionY();
		this->addChild(RealSpriteDetails._sprite, 2);

		std::string _shapeName = _differntSceneMapping.at(_level).at(i);
		std::transform(_shapeName.begin(), _shapeName.end(), _shapeName.begin(), ::toupper);
		RealSpriteDetails._name = _shapeName;
		_realSpriteDetails.push_back(RealSpriteDetails);

		addEvents(RealSpriteDetails);
	}

	_shapeName = Label::createWithSystemFont("", "Arial", 50);
	_shapeName->setPositionX(_ShapeBg->getChildByName("alphabet_board_4")->getContentSize().width /2);
	_shapeName->setPositionY(_ShapeBg->getChildByName("alphabet_board_4")->getContentSize().height / 2.5);
//	_shapeName->setAnchorPoint(Vec2(.3, 1));
	_shapeName->setColor(Color3B(255, 255, 255));
	_ShapeBg->getChildByName("alphabet_board_4")->addChild(_shapeName);

	int Xstart = _ShapeBg->getChildByName("water_level")->getPositionX() - _water->getBoundingBox().size.width / 2 + _realSpriteDetails.at(0)._sprite->getContentSize().width * 1.1;

	_position.push_back(Xstart + _water->getBoundingBox().size.width * .07);
	_position.push_back(Xstart + _water->getBoundingBox().size.width * .25);
	_position.push_back(Xstart + _water->getBoundingBox().size.width * .43);
	_position.push_back(Xstart + _water->getBoundingBox().size.width * .61);
	_position.push_back(Xstart + _water->getBoundingBox().size.width * .79);

	this->runAction(RepeatForever::create(Sequence::create(DelayTime::create(_differntPosition.at(_posmainIndex).at(_differntPosition.at(_posmainIndex).size() - 1)), CallFunc::create([=] {
		createTrans();
	}), NULL)));

	createTrans();
	this->scheduleUpdate();
	_moveFlag = 1;

	_menuContext->setMaxPoints(_differntPosition.at(_posmainIndex).at(_differntPosition.at(_posmainIndex).size() - 2));
}

void Shape::createTrans()
{
	if (_maxTransAtTime < 5)
	{
		if (_totalCount < _differntPosition.at(_posmainIndex).at(_differntPosition.at(_posmainIndex).size() - 2))
		{
			int _randNumber;

			if (_level == 1 && _helpFlag == 0)
				_randNumber = 0;
			else
				_randNumber = rand() % _differntSceneMapping.at(_level).size();

			std::ostringstream _trans;
			_trans << "Shape/" << _differntSceneMapping.at(_level).at(_randNumber) << "_trans.png";

			TransSpriteDetails._sprite = Sprite::createWithSpriteFrameName(_trans.str());

			int Xstart = _ShapeBg->getChildByName("water_level")->getPositionX() - _water->getBoundingBox().size.width / 2 + TransSpriteDetails._sprite->getContentSize().width;
			int Xend = _ShapeBg->getChildByName("water_level")->getPositionX() + _water->getBoundingBox().size.width / 2 - TransSpriteDetails._sprite->getContentSize().width;

			int Ystart = _ShapeBg->getChildByName("water_level")->getPositionY() + TransSpriteDetails._sprite->getContentSize().height / 2;
			int Yend = _ShapeBg->getChildByName("water_level")->getPositionY() + _water->getBoundingBox().size.height - TransSpriteDetails._sprite->getContentSize().height / 2;

			float Y = Ystart + (std::rand() % (Yend - Ystart + 1));
			float X = Xstart + (std::rand() % (Xend - Xstart + 1));

			int _ind = std::rand() % _position.size();

			TransSpriteDetails._sprite->setPosition(Vec2(_position.at(_ind), Y));
			TransSpriteDetails._flag = 0;
			this->addChild(TransSpriteDetails._sprite);
			_position.erase(_position.begin() + _ind);

			std::string _shapeName = _differntSceneMapping.at(_level).at(_randNumber);
			std::transform(_shapeName.begin(), _shapeName.end(), _shapeName.begin(), ::toupper);
			TransSpriteDetails._name = _shapeName;
			_transSpriteDetails.push_back(TransSpriteDetails);

			CCParticleSystemQuad *_particle = CCParticleSystemQuad::create("Shape/particle_texture.plist");
			_particle->setTexture(CCTextureCache::sharedTextureCache()->addImage("Shape/particle_texture.png"));
			_particle->setPosition(Vec2(TransSpriteDetails._sprite->getContentSize().width / 2, TransSpriteDetails._sprite->getContentSize().height / 2));
			TransSpriteDetails._sprite->addChild(_particle);


			if (_level == 1 && _helpFlag == 0)
			{
				_help = HelpLayer::create(Rect(_realSpriteDetails.at(0)._sprite->getPositionX(), visibleSize.height * .08, _realSpriteDetails.at(0)._sprite->getContentSize().height, _realSpriteDetails.at(0)._sprite->getContentSize().width), Rect(_transSpriteDetails.at(0)._sprite->getPositionX(), _transSpriteDetails.at(0)._sprite->getPositionY(), _transSpriteDetails.at(0)._sprite->getContentSize().height, _transSpriteDetails.at(0)._sprite->getContentSize().width));
				_help->clickAndDrag(Vec2(_realSpriteDetails.at(0)._sprite->getPositionX(), _realSpriteDetails.at(0)._sprite->getPositionY()), Vec2(_transSpriteDetails.at(0)._sprite->getPositionX(), _transSpriteDetails.at(0)._sprite->getPositionY()));
				this->addChild(_help, 3);
				_helpFlag = 1;
			}

			_waterSpeed += .00001;
			_totalCount++;
		}
		_maxTransAtTime++;
	}
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

			_spriteDetails._sprite = Sprite::createWithSpriteFrameName(sprite._spriteName);
			_spriteDetails._sprite->setPosition(Vec2(sprite._sprite->getPositionX(), sprite._sprite->getPositionY()));
			_spriteDetails._name = sprite._name;
			this->addChild(_spriteDetails._sprite);
			addEvents(_spriteDetails);
			_spriteMoved = 0;
			return true;
		}
		return false;
	};

	listener->onTouchMoved = [=](cocos2d::Touch *touch, cocos2d::Event *event)
	{
		_spriteDetails._sprite->setPosition(touch->getLocation());
		_spriteMoved = 1;
	};

	listener->onTouchEnded = [=](cocos2d::Touch *touch, cocos2d::Event *event)
	{
		Rect _targetRect = _spriteDetails._sprite->getBoundingBox();
		int _flag = 0;
		for (int i = 0; i < _transSpriteDetails.size(); i++)
		{
			_transSpriteDetails.at(i)._sprite->setScale(.7);
			Rect _transRect = _transSpriteDetails.at(i)._sprite->getBoundingBox();
			_transSpriteDetails.at(i)._sprite->setScale(1);
			if (_transRect.intersectsRect(_targetRect) && _spriteDetails._name == _transSpriteDetails.at(i)._name)
			{
				_spriteDetails._sprite->runAction(Sequence::create(MoveTo::create(.5, Vec2(_transSpriteDetails.at(i)._sprite->getPositionX(), _transSpriteDetails.at(i)._sprite->getPositionY())),
					CallFunc::create([=] {
					_position.push_back(_transSpriteDetails.at(i)._sprite->getPositionX());
					this->removeChild(_spriteDetails._sprite);
					this->removeChild(_transSpriteDetails.at(i)._sprite);
					_transSpriteDetails.erase(_transSpriteDetails.begin() + i);
					_moveFlag = 1;
					_menuContext->addPoints(1);
					_waterSpeed -= .00001;
					_maxTransAtTime--;
					CocosDenshion::SimpleAudioEngine *success = CocosDenshion::SimpleAudioEngine::getInstance();
					success->playEffect("sounds/sfx/success.ogg", false);
					
					if (_totalPatch == _differntPosition.at(_posmainIndex).at(_differntPosition.at(_posmainIndex).size() - 2))
					{
						_waterSound->stopAllEffects();
						_menuContext->showScore();
					}

				}), NULL));
				_flag = 1;
				_totalPatch++;
				break;
			}
		}

		if (_flag != 1)
		{
			this->removeChild(_spriteDetails._sprite);
			_moveFlag = 1;

			CocosDenshion::SimpleAudioEngine *error = CocosDenshion::SimpleAudioEngine::getInstance();
			error->playEffect("sounds/sfx/error.ogg", false);

			if (_spriteMoved == 1)
				_menuContext->addPoints(-1);
		}
	};

	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener->clone(), sprite._sprite);
}