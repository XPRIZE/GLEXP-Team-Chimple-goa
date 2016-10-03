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

	flag = true;

	SpriteFrameCache::getInstance()->addSpriteFramesWithFile("talkisland/talkisland.plist");

	visibleSize = Director::getInstance()->getWinSize();
	std::vector<std::string> scene = { "island", "superhero" , "farm" };
	sceneName = "island";

	if (sceneName == "island")
	{
		_talkBg = (Node *)CSLoader::createNode("talkisland/talkisland.csb");
		_heroChar = CSLoader::createTimeline("talkisland/hero.csb");
		_enemyChar = CSLoader::createTimeline("talkisland/enemy.csb");

		_hhand = (Sprite*)_talkBg->getChildren().at(1)->getChildByName("hhand");
		_ehand = (Sprite*)_talkBg->getChildren().at(1)->getChildByName("ehand");
		_hero = (Sprite*)_talkBg->getChildren().at(1)->getChildByName("hero");
		_enemy = (Sprite*)_talkBg->getChildren().at(1)->getChildByName("enemy");
	}

	_text = "hello world how are you";

	this->addChild(_talkBg);

	auto drawNode = DrawNode::create();
//	this->addChild(drawNode);
	Color4F white(1, 1, 1, 1);
//	drawNode->drawRect(Vec2(_hhand->getBoundingBox().origin.x , _hhand->getBoundingBox().origin.y), Vec2(_hhand->getBoundingBox().origin.x + _hhand->getBoundingBox().size.width, _hhand->getBoundingBox().origin.y + _hhand->getBoundingBox().size.height), white);


	_textToShow = Talk::split(_text, ' ');

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
			LabelDetails.label->setPosition(Vec2(lab->getPositionX() + lab->getBoundingBox().size.width, lab->getPositionY()));
		}
		LabelDetails.sequence = i;
		LabelDetails.id = _textToShow.at(i);
		LabelDetails.flag = 0;
		LabelDetails.answer = 'c';

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
		if (fish_Rect.intersectsRect(_hhand->getBoundingBox()))
		{
			_fish->stopAction(_action);
			_heroFish.push_back(_fish);
			_handFlag = false;
		}
		else if (_heroFish.size() >= 1 && fish_Rect.intersectsRect(_heroFish.at(_heroFish.size() - 1)->getBoundingBox()))
		{
			_fish->stopAction(_action);
			_heroFish.push_back(_fish);
			_handFlag = false;
		}
		else if (fish_Rect.intersectsRect(_ehand->getBoundingBox()))
		{
			_fish->stopAction(_action);
			_enemyFish.push_back(_fish);
			_handFlag = false;
		}
		else if (_enemyFish.size() >= 1 && fish_Rect.intersectsRect(_enemyFish.at(_enemyFish.size() - 1)->getBoundingBox()))
		{
			_fish->stopAction(_action);
			_enemyFish.push_back(_fish);
			_handFlag = false;
		}
	}
}

void Talk::generateWord()
{
}

void Talk::wordShow(LabelTTF *_wordLabel)
{
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

		if (rect.containsPoint(locationInNode))
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
				}
				else
				{
					_fish->setPosition(Vec2(visibleSize.width * .34, visibleSize.height));
					_heroChar->play("h_wrong", false);
					_enemyChar->play("e_correct", false);
				}
				_action = MoveTo::create(3, Vec2(_fish->getPositionX(), 0));
				_fish->runAction(_action);
				_handFlag = true;
				cocos2d::Director::getInstance()->getEventDispatcher()->removeEventListenersForTarget(sprite.label);
			}
			return true;
		}
		return false;
	};

	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener->clone(), sprite.label);
}

void Talk::wordLabelAnim(struct LabelDetails sprite)
{
}

void Talk::afterAnimation(struct LabelDetails sprite)
{
}