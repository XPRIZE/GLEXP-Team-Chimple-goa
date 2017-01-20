#include "Step.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../menu/HelpLayer.h"
#include "../util/CommonLabelTTF.h"

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
	_menuContext->setMaxPoints(10);
	_level = _menuContext->getCurrentLevel();

	visibleSize = Director::getInstance()->getWinSize();

	_StepBg = CSLoader::createNode("bar/shop.csb");
	_StepBg->setPosition(Vec2(visibleSize.width / 2, 0));
	_StepBg->setAnchorPoint(Vec2(.5, 0));
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

	_startPercent = 10;	// _percent[_percentLevelNo][0];

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
			LoadingBarDetails._label = CommonLabelTTF::create("?", "fonts/Roboto-Regular.ttf", 120);
			LoadingBarDetails._upLabel = CommonLabelTTF::create("?", "fonts/Roboto-Regular.ttf", 120);
			LoadingBarDetails._upLabel->setColor(Color3B::BLACK);
			LoadingBarDetails._label->setPosition(Vec2(_position.at(i).x, _stepBar->getPositionY() - LoadingBarDetails._loadingBar->getContentSize().height / 2));
			LoadingBarDetails._upLabel->setPosition(Vec2(_position.at(i).x, _stepBar->getPositionY() + LoadingBarDetails._loadingBar->getContentSize().height));
			this->addChild(LoadingBarDetails._label);
			this->addChild(LoadingBarDetails._upLabel);

			LoadingBarDetails._upLabel->runAction(RepeatForever::create(Sequence::create(ScaleTo::create(1, 1.3), DelayTime::create(.2f), ScaleTo::create(1, 1), NULL)));

			_loadingBarDetails.push_back(LoadingBarDetails);
			addEvents(LoadingBarDetails);

			_allBar.push_back(LoadingBarDetails._loadingBar);
		}
		else
		{
			cocos2d::ui::LoadingBar *_loadingBar = (cocos2d::ui::LoadingBar*)_stepBar->getChildByName("LoadingBar_2");
			_loadingBar->setPercent(_startPercent);

			LabelTTF *_label = CommonLabelTTF::create(_labelText.str(), "fonts/Roboto-Regular.ttf", 120);
			_label->setPosition(Vec2(_position.at(i).x, _stepBar->getPositionY() - _loadingBar->getContentSize().height / 2));
			this->addChild(_label);

			_allBar.push_back(_loadingBar);
		}
		_startPercent += 10;	// _percent[_percentLevelNo][0];
	}

	_fluffyNode = CSLoader::createNode("bar/fluffy.csb");
	_fluffyNode->setPosition(Vec2(_position.at(0).x, visibleSize.height * .70));
	_fluffyNode->setScale(.5);
	this->addChild(_fluffyNode);

	_fluffyTime = CSLoader::createTimeline("bar/fluffy.csb");
	_fluffyNode->runAction(_fluffyTime);
	_fluffyTime->play("blink", true);

	_blastNode = CSLoader::createNode("bar/blast.csb");
	_blastNode->setPosition(Vec2(visibleSize.width * .01, visibleSize.height * .67));
	_blastNode->setVisible(false);
	this->addChild(_blastNode);

	_balloonRepeat = RepeatForever::create(Sequence::create(ScaleTo::create(1, 1.2), DelayTime::create(.2f), ScaleTo::create(1, 1), NULL));
	_blastNode->runAction(_balloonRepeat);

	_balloon = Sprite::createWithSpriteFrameName("bar/balloons.png");
	_balloon->setPosition(Vec2(visibleSize.width * .10, visibleSize.height * .80));
	this->addChild(_balloon);

	Events(_balloon);

//	_balloonRepeat = RepeatForever::create(Sequence::create(ScaleTo::create(1, 1.2), DelayTime::create(.2f), ScaleTo::create(1, 1), NULL));

	if (_level == 1)
	{
		_help = HelpLayer::create(Rect(_position[2].x, _position[2].y + _allBar.at(2)->getContentSize().width / 2, _allBar.at(2)->getContentSize().height, _allBar.at(2)->getContentSize().width), Rect(0, 0, 0, 0));
		_help->clickAndDrag(Vec2(_position[2].x, _position[2].y), Vec2(_position[2].x, _position[2].y + _allBar.at(2)->getContentSize().width));
		this->addChild(_help);
		_helpFlag = 0;
	}

}

bool Step::init()
{
	if (!Layer::init())
	{
		return false;
	}
	return true;
}

void Step::update(float d)
{
	if (_menuContext->isGamePaused())
	{
		_moveFlag = 0;
	}
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
		Rect rect = Rect(0, 0, target->getContentSize().width, target->getContentSize().height * 1.05);

		if (rect.containsPoint(locationInNode) && _moveFlag==0)
		{
			if (_helpFlag == 0)
			{
				this->removeChild(_help);
				_helpFlag = 1;
			}
			std::ostringstream _textValue;
			if (sprite._loadingBar->getPercent() <= 100 && sprite._loadingBar->getPercent() >= 0)
			{
//				_balloonRepeat = RepeatForever::create(Sequence::create(ScaleTo::create(1, 1.2), DelayTime::create(.2f), ScaleTo::create(1, 1), NULL));

					_moveFlag = 1;

					int _percentValue = (int)(locationInNode.x / target->getContentSize().width * 100);
					if (_percentValue >= 98)
					{
						sprite._loadingBar->setPercent(100);
						_textValue << 10 * _differentLevel[_level - 1][0];
						sprite._label->setString(_textValue.str());
					}
					else if (_percentValue >= 10)
					{
						sprite._loadingBar->setPercent(_percentValue / 10 * 10);
						_textValue << (int)_percentValue / 10 * _differentLevel[_level - 1][0];
						sprite._label->setString(_textValue.str());
					}
					else
					{
						sprite._loadingBar->setPercent(0);
						sprite._label->setString("0");
					}

					for (int i = 0; i < _loadingBarDetails.size(); i++)
					{
						if (_loadingBarDetails.at(i)._loadingBar->getPercent() == 0)
						{
							_loadingBarDetails.at(i)._upLabel->setVisible(true);
						}
						else
						{
							_loadingBarDetails.at(i)._upLabel->setVisible(false);
						}
					}

					return true;
			}
			return false;
		}
		return false;
	};

	listener->onTouchMoved = [=](cocos2d::Touch *touch, cocos2d::Event *event)
	{
		auto target = static_cast<Sprite*>(event->getCurrentTarget());
		Point locationInNode = target->convertToNodeSpace(touch->getLocation());
		Size size = target->getContentSize();
		Rect rect = Rect(0, 0, target->getContentSize().width, target->getContentSize().height * 1.05);

		if (rect.containsPoint(locationInNode) && _moveFlag == 1)
		{
			std::ostringstream _textValue;
			if (sprite._loadingBar->getPercent() <= 100 && sprite._loadingBar->getPercent() >= 0)
			{
				int _percentValue = (int)(locationInNode.x / target->getContentSize().width * 100);

				if (_percentValue >= 98)
				{
					sprite._loadingBar->setPercent(100);
					_textValue << 10 * _differentLevel[_level - 1][0];
					sprite._label->setString(_textValue.str());
				}
				else if (_percentValue >= 10)
				{
					sprite._loadingBar->setPercent(_percentValue / 10 * 10);
					_textValue << (int)_percentValue / 10 * _differentLevel[_level - 1][0];
					sprite._label->setString(_textValue.str());
				}
				else
				{
					sprite._loadingBar->setPercent(0);
					sprite._label->setString("0");
				}
/*				int _updatePer = (int)(locationInNode.x / target->getContentSize().width * 100);
				if (_updatePer > _percent[_percentLevelNo][2])
				{

				}
				else
				{
					if (sprite._loadingBar->getPercent() == 0)
					{
//						sprite._loadingBar->setPercent((int)(locationInNode.x / target->getContentSize().width * 100));
//						_textValue << (int)(sprite._loadingBar->getPercent() / _percent[_percentLevelNo][1]);
						sprite._label->setString("?");
					}
					else
					{
						sprite._loadingBar->setPercent((int)(locationInNode.x / target->getContentSize().width * 100));
						_textValue << (int)(sprite._loadingBar->getPercent() / _percent[_percentLevelNo][1]);
						sprite._label->setString(_textValue.str());
					}
				}
*/			}
		}
	};

	listener->onTouchEnded = [=](cocos2d::Touch *touch, cocos2d::Event *event)
	{
		int _touchFlag = 0;
		for (int i = 0; i < _loadingBarDetails.size(); i++)
		{
			if (_loadingBarDetails.at(i)._loadingBar->getPercent() == 0)
			{
				_loadingBarDetails.at(i)._upLabel->setVisible(true);
			}
			else
			{
				_loadingBarDetails.at(i)._upLabel->setVisible(false);
			}

			if (atoi(_loadingBarDetails.at(i)._label->getString().c_str()) == _loadingBarDetails.at(i)._answer)
			{
				_touchFlag++;
			}
		}
		_moveFlag = 0;

		if (_touchFlag == _loadingBarDetails.size())
		{
//			_balloonRepeat = RepeatForever::create(Sequence::create(ScaleTo::create(1, 1.2), DelayTime::create(.2f), ScaleTo::create(1, 1), NULL));
//			_balloon->runAction(_balloonRepeat);
			_ballonFlag = 1;

//			this->removeChild(_balloon);
			_balloon->setVisible(false);
			_blastNode->setVisible(true);
			_blastTime = CSLoader::createTimeline("bar/blast.csb");
			_blastNode->runAction(_blastTime);
			_blastTime->play("go", true);

		}
		else if (_ballonFlag == 1)
		{
//			_balloon->stopAction(_balloonRepeat);
			_balloon->setVisible(true);
			_blastNode->setVisible(false);
//			_blastNode->stopAllActions();
//			_balloon->runAction(ScaleTo::create(.01, 1));
			_ballonFlag = -1;
		}
	};

	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener->clone(), sprite._loadingBar);
}

void Step::Events(Sprite *sprite)
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
				auto m = _loadingBarDetails.at(i)._label->getString();
				if (atoi(_loadingBarDetails.at(i)._label->getString().c_str()) == _loadingBarDetails.at(i)._answer)
				{
					_touchFlag++;
				}
			}

			if (_touchFlag == _loadingBarDetails.size())
			{
				_fluffyNode->stopAction(_fluffyTime);

				_fluffyTime = CSLoader::createTimeline("bar/fluffy.csb");
				_fluffyNode->runAction(_fluffyTime);
				_fluffyTime->play("fall", true);

				this->removeChild(_balloon);
				_blastNode->setVisible(true);
				_blastTime = CSLoader::createTimeline("bar/blast.csb");
				_blastNode->runAction(_blastTime);
				_blastTime->play("blast", false);
				_blastTime->setAnimationEndCallFunc("blast", CC_CALLBACK_0(Step::removeAnimation, this));

				CocosDenshion::SimpleAudioEngine *success = CocosDenshion::SimpleAudioEngine::getInstance();
				success->playEffect("sounds/sfx/success.ogg", false);

				_menuContext->addPoints(10 - _score);
				finalAnimation(0);
			}
			else
			{
				CocosDenshion::SimpleAudioEngine *error = CocosDenshion::SimpleAudioEngine::getInstance();
				error->playEffect("sounds/sfx/error.ogg", false);

				auto _moveBy = MoveBy::create(.5, Vec2(0, -100));
				auto delay = DelayTime::create(0.25f);
				auto _seq = Sequence::create(_moveBy, delay, _moveBy->reverse(), CallFunc::create([=](){
					_menuContext->addPoints(-1);
					_score += _score;
					_moveFlag = 0;
				}), NULL);

				_fluffyNode->runAction(_seq);
			}

			return true;
		}
		return false;
	};
	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener->clone(), sprite);
}

void Step::removeAnimation()
{
	this->removeChild(_blastNode);
}

void Step::finalAnimation(int _index)
{
	if (_index == 1)
	{
		_fluffyNode->stopAction(_fluffyTime);

		_fluffyTime = CSLoader::createTimeline("bar/fluffy.csb");
		_fluffyNode->runAction(_fluffyTime);
		_fluffyTime->play("jump", true);
	}

	if (_index == 0)
	{
		auto _height = _allBar.at(_index)->getContentSize().width;
		auto _barPercent = _allBar.at(_index)->getPercent();

		auto _moveTo = MoveTo::create(.4, Vec2(_position.at(_index).x, (visibleSize.height * .14 + (_fluffyNode->getChildByName("body_1")->getContentSize().height * .30) + (_height * _barPercent / 100))));
		auto _delay = DelayTime::create(.3);
		auto _sequence = Sequence::create(_moveTo, _delay, CallFunc::create([=]() {

			finalAnimation(_index + 1);
		}), NULL);

		_fluffyNode->runAction(_sequence);
	}
	else if (_index < _allBar.size())
	{
		auto _height = _allBar.at(_index)->getContentSize().width;
		auto _barPercent = _allBar.at(_index)->getPercent();

		ccBezierConfig bezierConfig;
		bezierConfig.controlPoint_1 = Point(_fluffyNode->getPositionX(), _fluffyNode->getPositionY());
		bezierConfig.controlPoint_2 = Point(_fluffyNode->getPositionX() + 200, _fluffyNode->getPositionY() + _fluffyNode->getChildByName("body_1")->getContentSize().height);
		bezierConfig.endPosition = Point(_position.at(_index).x, (visibleSize.height * .14 + (_fluffyNode->getChildByName("body_1")->getContentSize().height * .25) + (_height * _barPercent / 100)));

		auto _moveTo = BezierTo::create(.4, bezierConfig);
		auto _delay = DelayTime::create(.3);
		auto _sequence = Sequence::create(_moveTo, _delay, CallFunc::create([=]() {
			finalAnimation(_index+1);
		}), NULL);

		_fluffyNode->runAction(_sequence);

		CocosDenshion::SimpleAudioEngine *jump2 = CocosDenshion::SimpleAudioEngine::getInstance();
		jump2->playEffect("sounds/sfx/jump2.ogg", false);
	}
	else
	{
		_menuContext->showScore();
	}
}
