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
//	_menuContext->setMaxPoints(10);
	_level = _menuContext->getCurrentLevel();

	visibleSize = Director::getInstance()->getWinSize();

	_StepBg = CSLoader::createNode("bar/shop.csb");
	this->addChild(_StepBg);

	p1.x = visibleSize.width * .05;
	p1.y = visibleSize.height * .14;

	p2.x = visibleSize.width * .15;
	p2.y = visibleSize.height * .14;

	p3.x = visibleSize.width * .25;
	p3.y = visibleSize.height * .14;

	p4.x = visibleSize.width * .35;
	p4.y = visibleSize.height * .14;

	p5.x = visibleSize.width * .45;
	p5.y = visibleSize.height * .14;

	p6.x = visibleSize.width * .55;
	p6.y = visibleSize.height * .14;

	p7.x = visibleSize.width * .65;
	p7.y = visibleSize.height * .14;

	p8.x = visibleSize.width * .75;
	p8.y = visibleSize.height * .14;

	p9.x = visibleSize.width * .85;
	p9.y = visibleSize.height * .14;

	p10.x = visibleSize.width * .95;
	p10.y = visibleSize.height * .14;

	_position.push_back(p1);
	_position.push_back(p2);
	_position.push_back(p3);
	_position.push_back(p4);
	_position.push_back(p5);
	_position.push_back(p6);
	_position.push_back(p7);
	_position.push_back(p8);
	_position.push_back(p9);
	_position.push_back(p10);

	if (_level % 5 == 0)
	{
		_percentLevelNo = (_level / 5) - 1;
	}
	else
		_percentLevelNo = (_level / 5);

	_startPercent = _percent[_percentLevelNo][0];

	for (int i = 0; i < _position.size(); i++)
	{
		Node *_stepBar = CSLoader::createNode("bar/bar.csb");
		_stepBar->setPosition(Vec2(_position.at(i).x, _position.at(i).y));
		this->addChild(_stepBar);

		std::ostringstream _labelText;
		_labelText << _differentLevel[_level - 1][i];
		if (_differentLevel[_level - 1][i] == 0)
		{
			LoadingBarDetails._loadingBar = (cocos2d::ui::LoadingBar*)_stepBar->getChildByName("LoadingBar_2");
			LoadingBarDetails._loadingBar->setPercent(0);
			LoadingBarDetails._id = _loadingBarDetails.size() + 1;
			LoadingBarDetails._answer = _answer[_level - 1][_loadingBarDetails.size()];
			LoadingBarDetails._label = LabelTTF::create(_labelText.str(), "Arial", 120);
			LoadingBarDetails._label->setPosition(Vec2(_position.at(i).x, _stepBar->getPositionY() - LoadingBarDetails._loadingBar->getContentSize().height / 2));
			this->addChild(LoadingBarDetails._label);

			_loadingBarDetails.push_back(LoadingBarDetails);
			addEvents(LoadingBarDetails);
		}
		else
		{
			cocos2d::ui::LoadingBar *_loadingBar = (cocos2d::ui::LoadingBar*)_stepBar->getChildByName("LoadingBar_2");
			_loadingBar->setPercent(_startPercent);

			LabelTTF *_label = LabelTTF::create(_labelText.str(), "Arial", 120);
			_label->setPosition(Vec2(_position.at(i).x, _stepBar->getPositionY() - _loadingBar->getContentSize().height / 2));
			this->addChild(_label);
		}
		_startPercent += _percent[_percentLevelNo][0];
	}

	_fluffy = CSLoader::createNode("bar/fluffy.csb");
	_fluffy->setPosition(Vec2(visibleSize.width * .10, visibleSize.height * .60));
	this->addChild(_fluffy);

	_blast = CSLoader::createNode("bar/blast.csb");
	_blast->getChildByName("Sprite_1")->setPosition(Vec2(visibleSize.width * .20, visibleSize.height * .70));
	this->addChild(_blast->getChildByName("Sprite_1"));

	Sprite *sp = Sprite::createWithSpriteFrameName("bar/cake.png");
	sp->setPosition(Vec2(200, visibleSize.height * .75));
//	this->addChild(sp);
	Events(_blast);
}

bool Step::init()
{
	if (!Layer::init())
	{
		return false;
	}
	return true;
}

void Step::addEvents(struct LoadingBarDetails sprite)
{
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(true);

	listener->onTouchBegan = [=] (cocos2d::Touch *touch, cocos2d::Event *event)
	{
		auto target = static_cast<Sprite*>(event->getCurrentTarget());
		Point locationInNode = target->convertToNodeSpace(touch->getLocation());
		Size size = target->getContentSize();
		Rect rect = Rect(0, 0, target->getContentSize().width * _percent[_percentLevelNo][2] / 100, target->getContentSize().height);

		if (rect.containsPoint(locationInNode) && _moveFlag==0)
		{
			_previousY = touch->getLocation().y;

			std::ostringstream _textValue;
			if (sprite._loadingBar->getPercent() <= _percent[_percentLevelNo][2] && sprite._loadingBar->getPercent() >= 0)
			{
					_moveFlag = 1;
					sprite._loadingBar->setPercent((int)(locationInNode.x / target->getContentSize().width * 100));
					_textValue << (int)(sprite._loadingBar->getPercent() / 2);
					sprite._label->setString(_textValue.str());

					return true;
			}
/*			else if (sprite._loadingBar->getPercent() > 0)
			{
				sprite._loadingBar->setPercent(locationInNode.x / target->getContentSize().width * 100);
				_textValue << (int)sprite._loadingBar->getPercent();
				sprite._label->setString(_textValue.str());
			}
*/
			return false;
		}
		return false;
	};

	listener->onTouchMoved = [=](cocos2d::Touch *touch, cocos2d::Event *event)
	{
		auto target = static_cast<Sprite*>(event->getCurrentTarget());
		Point locationInNode = target->convertToNodeSpace(touch->getLocation());
		if (_moveFlag == 1)
		{
			std::ostringstream _textValue;
			if (sprite._loadingBar->getPercent() <= _percent[_percentLevelNo][2] && sprite._loadingBar->getPercent() >= 0)
			{
				int _updatePer = (int)(locationInNode.x / target->getContentSize().width * 100);
				if (_updatePer > _percent[_percentLevelNo][2])
				{

				}
				else
				{
					sprite._loadingBar->setPercent((int)(locationInNode.x / target->getContentSize().width * 100));
					_textValue << (int)(sprite._loadingBar->getPercent() / _percent[_percentLevelNo][1]);
					sprite._label->setString(_textValue.str());
				}
			}
			CCLOG("%f", sprite._loadingBar->getPercent());
		}
	};

	listener->onTouchEnded = [=](cocos2d::Touch *touch, cocos2d::Event *event)
	{
		_moveFlag = 0;
	};

	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener->clone(), sprite._loadingBar);
}

void Step::Events(Node *sprite)
{
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(true);

	listener->onTouchBegan = [=](cocos2d::Touch *touch, cocos2d::Event *event)
	{
		auto target = static_cast<Sprite*>(event->getCurrentTarget());
		Point locationInNode = target->convertToNodeSpace(touch->getLocation());
		Size size = target->getContentSize();
		Rect rect = Rect(0, 0, target->getContentSize().width, target->getContentSize().height);
		int _touchFlag = 0;
		if (rect.containsPoint(locationInNode) && _moveFlag == 0)
		{
			_moveFlag = 1;
			for (int i = 0; i < _loadingBarDetails.size(); i++)
			{
				if (atoi(_loadingBarDetails.at(i)._label->getString().c_str()) == _loadingBarDetails.at(i)._answer)
				{
					_touchFlag++;
				}
			}
			if (_touchFlag == _loadingBarDetails.size())
				_menuContext->showScore();
			else
				_moveFlag = 0;

			return true;
		}
		return false;
	};
	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener->clone(), sprite->getChildByName("Sprite_1"));
}