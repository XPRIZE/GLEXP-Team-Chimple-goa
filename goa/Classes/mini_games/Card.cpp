#include "Card.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../menu/HelpLayer.h"
#include "../util/CommonLabelTTF.h"

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
	_level = _menuContext->getCurrentLevel();

	if (_level >= 1 && _level <= 5)
	{
		_pairSum = 5;
	}
	else if (_level >= 6 && _level <= 10)
	{
		_pairSum = 10;
	}
	else if (_level >= 11 && _level <= 15)
	{
		_pairSum = 15;
	}
	else if (_level >= 16 && _level <= 20)
	{
		_pairSum = 20;
	}

	if (_level == 1 || _level == 2 || _level == 6 || _level == 7 || _level == 11 || _level == 12 || _level == 16)
	{
		_pairCard = 2;
		_menuContext->setMaxPoints(6);
	}
	else
	{
		_menuContext->setMaxPoints(6);
		_pairCard = 3;
	}

	visibleSize = Director::getInstance()->getWinSize();

	_cp1.x = visibleSize.width * .06;
	_cp1.y = visibleSize.height * .93;

	_cp2.x = visibleSize.width * .17;
	_cp2.y = visibleSize.height * .93;

	_cp3.x = visibleSize.width * .28;
	_cp3.y = visibleSize.height * .93;

	_cardPosition.push_back(_cp1);
	_cardPosition.push_back(_cp2);
	_cardPosition.push_back(_cp3);

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

	std::ostringstream _boardTextName;
	_boardTextName << _pairSum;

	Node *_board = _CardBg->getChildByName("board_6");
	LabelTTF *_boardText = CommonLabelTTF::create(_boardTextName.str(), "fonts/Roboto-Regular.ttf", 120);
	_boardText->setPosition(Vec2(_board->getPositionX(), _board->getPositionY() - _board->getContentSize().height / 2));
	this->addChild(_boardText);

	CCSpriteFrameCache::sharedSpriteFrameCache()->addSpriteFramesWithFile("card/card.plist");

	for (int i = 0; i < _pairCard; i++)
	{
		ToDoDetails._sprite = Sprite::createWithSpriteFrameName("card/todo.png");
		ToDoDetails._sprite->setPosition(Vec2(_cardPosition[i].x, _cardPosition[i].y));
		this->addChild(ToDoDetails._sprite);
		ToDoDetails._child = 0;
		_toDoDetails.push_back(ToDoDetails);

		if (i < _pairCard - 1)
		{
			LabelTTF *_boardText = CommonLabelTTF::create("+", "fonts/Roboto-Regular.ttf", 120);
			_boardText->setPosition(Vec2(ToDoDetails._sprite->getPositionX() + ToDoDetails._sprite->getContentSize().width, ToDoDetails._sprite->getPositionY()));
			this->addChild(_boardText);
		}
		else
		{
			LabelTTF *_boardText = CommonLabelTTF::create("=", "fonts/Roboto-Regular.ttf", 120);
			_boardText->setPosition(Vec2(ToDoDetails._sprite->getPositionX() + ToDoDetails._sprite->getContentSize().width, ToDoDetails._sprite->getPositionY()));
			this->addChild(_boardText);
		}
	}

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

	if (_level == 1)
	{
		auto origin = Director::getInstance()->getVisibleOrigin();

		_help = HelpLayer::create(Rect(_spriteDetails.at(0)._sprite->getPositionX(), _spriteDetails.at(0)._sprite->getPositionY() - _spriteDetails.at(0)._sprite->getChildByName("box_1")->getBoundingBox().size.width / 2, _spriteDetails.at(0)._sprite->getChildByName("box_1")->getBoundingBox().size.width, _spriteDetails.at(0)._sprite->getChildByName("box_1")->getBoundingBox().size.height * 1.5), Rect(_board->getPositionX(), _board->getPositionY() - _board->getContentSize().height / 2, _board->getContentSize().width, _board->getContentSize().height));
//		_help = HelpLayer::create(Rect(_spriteDetails.at(0)._sprite->getChildByName("box_1")->getPositionX() + _spriteDetails.at(0)._sprite->getChildByName("box_1")->getBoundingBox().size.width * .73, _spriteDetails.at(0)._sprite->getChildByName("box_1")->getPositionY() + _spriteDetails.at(0)._sprite->getChildByName("box_1")->getBoundingBox().size.height * 105 / 100, _spriteDetails.at(0)._sprite->getChildByName("box_1")->getBoundingBox().size.width, _spriteDetails.at(0)._sprite->getChildByName("box_1")->getBoundingBox().size.height * 2), Rect(_board->getPositionX(), _board->getPositionY() - _board->getContentSize().height / 2, _board->getContentSize().width, _board->getContentSize().height));
		addChild(_help, 5);
		_help->clickTwice(Vec2(_spriteDetails.at(0)._sprite->getChildByName("box_1")->getPositionX() + _spriteDetails.at(0)._sprite->getChildByName("box_1")->getBoundingBox().size.width/2, _spriteDetails.at(0)._sprite->getChildByName("box_1")->getPositionY() + _spriteDetails.at(0)._sprite->getChildByName("box_1")->getBoundingBox().size.height/ 2), Vec2(_spriteDetails.at(0)._sprite->getChildByName("box_1")->getPositionX() + _spriteDetails.at(0)._sprite->getChildByName("box_1")->getBoundingBox().size.width / 2, _spriteDetails.at(3)._sprite->getChildByName("box_1")->getPositionY() + _spriteDetails.at(3)._sprite->getChildByName("box_1")->getBoundingBox().size.height * 1.5));
		_helpFlag = 1;
	}

}

bool Card::init()
{
	if (!Layer::init())
	{
		return false;
	}

	return true;
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
			if (_programFlag == 0)
			{
				CocosDenshion::SimpleAudioEngine *drop = CocosDenshion::SimpleAudioEngine::getInstance();
				drop->playEffect("sounds/sfx/drop.ogg", false);

				if (_spriteDetails.at(sprite._index)._flag == 0)
				{
					for (int i = 0; i < _toDoDetails.size(); i++)
					{
						if (_toDoDetails.at(i)._child == 0)
						{
							std::ostringstream _digit;
							_digit << sprite._id;

							LabelTTF *_boardText = CommonLabelTTF::create(_digit.str(), "fonts/Roboto-Regular.ttf", 120);
							_boardText->setPosition(Vec2(_toDoDetails.at(i)._sprite->getContentSize().width / 2, _toDoDetails.at(i)._sprite->getContentSize().height / 2));
							_toDoDetails.at(i)._sprite->addChild(_boardText);
							_toDoDetails.at(i)._child = 1;
							_toDoDetails.at(i)._id = sprite._id;
							break;
						}
					}

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

					for (int i = 0; i < _toDoDetails.size(); i++)
					{
						if (_toDoDetails.at(i)._child == 1 && _toDoDetails.at(i)._id == sprite._id)
						{
							_toDoDetails.at(i)._sprite->removeChild(_toDoDetails.at(i)._sprite->getChildren().at(0), true);
							_toDoDetails.at(i)._child = 0;
							break;
						}
					}
				}

				if (_helpFlag == 1)
				{
					this->removeChild(_help);
					_helpFlag = 0;
				}

				if (_useCard == _pairCard)
				{
					_programFlag = 1;
					if (_totalSum == _pairSum)
					{

						this->runAction(Sequence::create(DelayTime::create(.5), CallFunc::create([=]() {

							CocosDenshion::SimpleAudioEngine *success = CocosDenshion::SimpleAudioEngine::getInstance();
							success->playEffect("sounds/sfx/success.ogg", false);
							_menuContext->addPoints(_pairCard);
							_menuContext->pickNumber(_pairSum, _totalSum, _menuContext->ADD);
							for (int i = 0; i < _spriteDetails.size(); i++)
							{
								if (_spriteDetails.at(i)._flag == 1)
								{
									_spriteDetails.at(i)._sprite->setLocalZOrder(1);
									_spriteDetails.at(i)._sprite->runAction(Sequence::create(
										MoveTo::create(.5, Vec2(visibleSize.width / 2, visibleSize.height / 2)),
										CallFunc::create([=]() {

										if (_remainingCard == 0)
											_menuContext->showScore();

										removeChild(_spriteDetails.at(i)._sprite);
										_totalSum = 0;
										_programFlag = 0;
										_spriteDetails.at(i)._flag = 0;

										_remainingCard -= _useCard;
										_useCard = 0;

									}), NULL));
								}
							}

							for (int i = 0; i < _toDoDetails.size(); i++)
							{
								if (_toDoDetails.at(i)._child == 1)
								{
									_toDoDetails.at(i)._sprite->removeChild(_toDoDetails.at(i)._sprite->getChildren().at(0), true);
									_toDoDetails.at(i)._child = 0;
								}
							}

						}), NULL));
					}
					else
					{
						CocosDenshion::SimpleAudioEngine *error = CocosDenshion::SimpleAudioEngine::getInstance();
						error->playEffect("sounds/sfx/error.ogg", false);
						_menuContext->addPoints(1 - _pairCard);
						this->runAction(Sequence::create(DelayTime::create(.3), CallFunc::create([=]() {
						_menuContext->pickNumber(_pairSum, _totalSum, _menuContext->ADD);

							for (int i = 0; i < _spriteDetails.size(); i++)
							{
								if (_spriteDetails.at(i)._flag == 1)
								{
									_spriteDetails.at(i)._sprite->setScale(.9);
									_spriteDetails.at(i)._flag = 0;
								}
							}

							for (int i = 0; i < _toDoDetails.size(); i++)
							{
								if (_toDoDetails.at(i)._child == 1)
								{
									_toDoDetails.at(i)._sprite->removeChild(_toDoDetails.at(i)._sprite->getChildren().at(0), true);
									_toDoDetails.at(i)._child = 0;
								}
							}

							_totalSum = 0;
							_useCard = 0;
							_programFlag = 0;
						}), NULL));
					}
				}
			}
			return true;
		}
		return false;
	};
	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener->clone(), sprite._sprite->getChildByName("box_1"));
}
