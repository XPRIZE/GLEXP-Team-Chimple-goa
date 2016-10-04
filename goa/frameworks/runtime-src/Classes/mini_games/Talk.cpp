#include "Talk.h"
#include "editor-support/cocostudio/CocoStudio.h"

USING_NS_CC;

Talk::Talk() {
}

Talk::~Talk() {
}

Scene* Talk::createScene()
{
	auto scene = Scene::create();
	auto layer = Talk::create();
	scene->addChild(layer);
    layer->_menuContext = MenuContext::create(layer, Talk::gameName());
    scene->addChild(layer->_menuContext);

	return scene;
}

bool Talk::init()
{
	if (!Layer::init())
	{
		return false;
	}

	_handFlag = false;
	_totalCount = 0;
	_totalAnswer = 0;
	_correctAnswer = 0;

	visibleSize = Director::getInstance()->getWinSize();
	std::vector<std::string> scene = { "island", "city" , "farm" };
	sceneName = "island";

	if (sceneName == "island")
	{
		_talkBg = (Node *)CSLoader::createNode("talkisland/talkisland.csb");
		for (int i = 0; i < _talkBg->getChildrenCount(); i++)
		{
			for (int j = 0; j < _talkBg->getChildren().at(i)->getChildrenCount(); j++)
			{
				if (_talkBg->getChildren().at(i)->getChildren().at(j)->getName().find("bubble") != std::string::npos)
				{
					auto bubble = CSLoader::createTimeline("talkisland/bubble.csb");
					_talkBg->getChildren().at(i)->getChildren().at(j)->runAction(bubble);
					bubble->play("bubble", true);
				}
			}
		}

		_heroChar = CSLoader::createTimeline("talkisland/hero.csb");
		_enemyChar = CSLoader::createTimeline("talkisland/enemy.csb");

		_hhand = (Sprite*)_talkBg->getChildren().at(1)->getChildByName("h_hand"); // getChildren().at(7);
		_ehand = (Sprite*)_talkBg->getChildren().at(1)->getChildByName("e_hand"); //getChildren().at(6);
		_hero = (Sprite*)_talkBg->getChildren().at(1)->getChildByName("hero");
		_enemy = (Sprite*)_talkBg->getChildren().at(1)->getChildByName("enemy");
	}
	else if (sceneName == "city")
	{
		_talkBg = (Node *)CSLoader::createNode("talkcity/talkcity.csb");
	}

	this->addChild(_talkBg);


	LabelTTF *lb = LabelTTF::create("Select verbs", "Arial", 80);
	lb->setPosition(Vec2(visibleSize.width * .40, visibleSize.height * .80));
	this->addChild(lb);


//	auto drawNode = DrawNode::create();
//	this->addChild(drawNode);
//	Color4F white(1, 1, 1, 1);
//	drawNode->drawRect(Vec2(_hero->getBoundingBox().origin.x , _hero->getBoundingBox().origin.y), Vec2(_hero->getBoundingBox().origin.x + _hero->getBoundingBox().size.width, _hero->getBoundingBox().origin.y + _hero->getBoundingBox().size.height), white);

	_allSentense.push_back("I will play football");
	_allSentense.push_back("I want to play cricket");
	_allSentense.push_back("I will go to office");
	_allSentense.push_back("If you will not play then i will not go");
	_allSentense.push_back("I will not help until you will not play");
	_allSentense.push_back("If you will go there then will help you");

	_textToShow = Talk::split(_allSentense[(rand() % _allSentense.size())], ' ');

	for (int i = 0; i < _textToShow.size(); i++)
	{
		LabelDetails.label = LabelTTF::create(_textToShow.at(i), "Arial", 80);
		if (i == 0)
		{
			LabelDetails.label->setPosition(Vec2(visibleSize.width * .30, visibleSize.height * .70));
		}
		else
		{
			LabelTTF *lab = _labelDetails.at(i - 1).label;
			LabelDetails.label->setPosition(Vec2(lab->getPositionX() + lab->getBoundingBox().size.width + 20, lab->getPositionY()));
		}
		LabelDetails.sequence = i;
		LabelDetails.id = _textToShow.at(i);
		LabelDetails.flag = 0;
		LabelDetails.label->setAnchorPoint(Vec2(0, 0));

		if (_textToShow.at(i) == "go" || _textToShow.at(i) == "play" || _textToShow.at(i) == "help" || _textToShow.at(i) == "want")
		{
			LabelDetails.answer = 'c';
			_totalAnswer++;
		}
		else
		{
			LabelDetails.answer = 'w';
		}

		Talk::addEvents(LabelDetails);
		this->addChild(LabelDetails.label);
		_labelDetails.push_back(LabelDetails);
	}

	this->scheduleUpdate();

	return true;
}

std::vector<std::string> Talk::split(std::string s, char delim)
{
	std::vector<std::string> elems;
	std::stringstream ss;
	ss.str(s);
	std::string item;
	while (getline(ss, item, delim)) {
		elems.push_back(item);
	}
	return elems;
}

void Talk::update(float d)
{
	if (_handFlag == true)
	{
		Rect fish_Rect = _fish->getBoundingBox();
		Rect aa = _hhand->getBoundingBox();
		if (fish_Rect.intersectsRect(_hhand->getBoundingBox()) || (_heroFish.size() >= 1 && fish_Rect.intersectsRect(_heroFish.at(_heroFish.size() - 1)->getBoundingBox())))
		{
			_fish->stopAction(_action);
			_heroFish.push_back(_fish);
			_handFlag = false;

			if (_totalCount == _textToShow.size() || _totalAnswer == _correctAnswer)
			{
				_menuContext->showScore();
			}
		}
		else if (fish_Rect.intersectsRect(_ehand->getBoundingBox()) || (_enemyFish.size() >= 1 && fish_Rect.intersectsRect(_enemyFish.at(_enemyFish.size() - 1)->getBoundingBox())))
		{
			_fish->stopAction(_action);
			_enemyFish.push_back(_fish);
			_handFlag = false;

			if (_totalCount == _textToShow.size() || _totalAnswer == _correctAnswer)
			{
				_menuContext->showScore();
			}
		}
	}
}

void Talk::addEvents(struct LabelDetails sprite)
{
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(true);

	listener->onTouchBegan = [=] (cocos2d::Touch *touch, cocos2d::Event *event)
	{
		auto target = static_cast<Sprite*>(event->getCurrentTarget());
		Point locationInNode = target->convertToNodeSpace(touch->getLocation());
		Size size = target->getContentSize();
		Rect rect = Rect(0, 0, size.width, size.height);

		if (rect.containsPoint(locationInNode) && _handFlag==false)
		{
			if (sceneName == "island")
			{
				std::ostringstream counterForLetter;
				counterForLetter << "talkisland/fish" << (rand() % (6-1) + 1) << ".png";

				_heroChar = CSLoader::createTimeline("talkisland/hero.csb");
				_enemyChar = CSLoader::createTimeline("talkisland/enemy.csb");
				_talkBg->runAction(_heroChar);
				_talkBg->runAction(_enemyChar);
				_fish = Sprite::createWithSpriteFrameName(counterForLetter.str());
				this->addChild(_fish);

				if (sprite.answer == 'c')
				{
					_fish->setPosition(Vec2(visibleSize.width * .61, visibleSize.height));
					_heroChar->play("h_correct", false);
					_enemyChar->play("e_wrong", false);
					sprite.label->setColor(Color3B::GREEN);
					_correctAnswer++;
				}
				else
				{
					_fish->setPosition(Vec2(visibleSize.width * .34, visibleSize.height));
					_heroChar->play("h_wrong", false);
					_enemyChar->play("e_correct", false);
					sprite.label->setColor(Color3B::RED);
				}
				_action = MoveTo::create(3, Vec2(_fish->getPositionX(), 0));
				_fish->runAction(_action);
				_handFlag = true;
				_totalCount++;
				cocos2d::Director::getInstance()->getEventDispatcher()->removeEventListenersForTarget(sprite.label);
			}
			return true;
		}
		return false;
	};

	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener->clone(), sprite.label);
}
