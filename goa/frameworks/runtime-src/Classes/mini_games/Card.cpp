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

	if (_level >= 1 && _level <= 5)
		_pairSum = 5;
	else if (_level >= 6 && _level <= 10)
		_pairSum = 10;
	else if (_level >= 11 && _level <= 15)
		_pairSum = 15;
	else if (_level >= 16 && _level <= 20)
		_pairSum = 20;

	if (_level >= 1 || _level == 2 || _level == 6 || _level == 7 || _level == 11 || _level == 12 || _level == 16)
	{
		_pairCard = 2;
	}
	else
		_pairCard = 3;

	visibleSize = Director::getInstance()->getWinSize();

	_p1.x = visibleSize.width * .20;
	_p1.y = visibleSize.height * .65;

	_p2.x = visibleSize.width * .50;
	_p2.y = visibleSize.height * .65;

	_p3.x = visibleSize.width * .80;
	_p3.y = visibleSize.height * .65;

	_p4.x = visibleSize.width * .20;
	_p4.y = visibleSize.height * .23;

	_p5.x = visibleSize.width * .50;
	_p5.y = visibleSize.height * .23;

	_p6.x = visibleSize.width * .80;
	_p6.y = visibleSize.height * .23;

	_position.push_back(_p1);
	_position.push_back(_p2);
	_position.push_back(_p3);
	_position.push_back(_p4);
	_position.push_back(_p5);
	_position.push_back(_p6);

	_CardBg = CSLoader::createNode("card/background.csb");
	this->addChild(_CardBg);

	for (int i = 0; i < _position.size(); i++)
	{
		std::ostringstream _fileName;
		_fileName << "card/" << _differentLevel[_level - 1][i] << ".csb";
		SpriteDetails._sprite = (Node*) CSLoader::createNode(_fileName.str());
		SpriteDetails._sprite->setPosition(Vec2(_position[i].x, _position[i].y));
		SpriteDetails._sprite->setScale(.9);
		this->addChild(SpriteDetails._sprite);
		SpriteDetails._flag = 0;
		SpriteDetails._index = i;
		SpriteDetails._id = _differentLevel[_level - 1][i];
		_spriteDetails.push_back(SpriteDetails);
		addEvents(SpriteDetails);
	}

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

void Card::addEvents(struct SpriteDetails sprite)
{
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(true);

	listener->onTouchBegan = [=] (cocos2d::Touch *touch, cocos2d::Event *event)
	{
		auto target = static_cast<Sprite*>(event->getCurrentTarget());
		Point locationInNode = target->convertToNodeSpace(touch->getLocation());
		Size size = target->getContentSize();
		Rect rect = Rect(0, 0, sprite._sprite->getChildByName("box_1")->getBoundingBox().size.width, sprite._sprite->getChildByName("box_1")->getBoundingBox().size.height);

		if (rect.containsPoint(locationInNode))
		{
			if (_spriteDetails.at(sprite._index)._flag == 0)
			{
				_spriteDetails.at(sprite._index)._sprite->setScale(1);
				_totalSum += sprite._id;
				_spriteDetails.at(sprite._index)._flag = 1;
				_useCard++;
			}
			else
			{
				_spriteDetails.at(sprite._index)._sprite->setScale(.9);
				_totalSum -= sprite._id;
				_useCard--;
				_spriteDetails.at(sprite._index)._flag = 0;
			}

			if (_useCard == _pairCard)
			{
				if (_totalSum == _pairSum)
				{
					for (int i = 0; i < _spriteDetails.size(); i++)
					{
						if (_spriteDetails.at(i)._flag == 1)
						{
							_spriteDetails.at(i)._sprite->runAction(Sequence::create(
							MoveTo::create(.5, Vec2(visibleSize.width / 2, visibleSize.height / 2)),
							CallFunc::create([=]() {
									removeChild(_spriteDetails.at(i)._sprite);
									_totalSum = 0;
									_useCard = 0;
							}), NULL));
						}
					}
				}
				else
				{
					for (int i = 0; i < _spriteDetails.size(); i++)
					{
						_spriteDetails.at(i)._sprite->setScale(.9);
						_spriteDetails.at(i)._flag = 0;
					}
					_totalSum = 0;
					_useCard = 0;
				}
			}

			return true;
		}
		return false;
	};

	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener->clone(), sprite._sprite->getChildByName("box_1"));
}
