#include "Stack.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include <sstream>

USING_NS_CC;

Stack::Stack() {
}

Stack::~Stack() {
}


Scene* Stack::createScene()
{
	auto scene = Scene::create();
	auto layer = Stack::create();
	scene->addChild(layer);
    layer->_menuContext = MenuContext::create(layer, Stack::gameName());
    scene->addChild(layer->_menuContext);

	return scene;
}

bool Stack::init()
{
	if (!Layer::init())
	{
		return false;
	}

	SpriteFrameCache::getInstance()->addSpriteFramesWithFile("stackisland_1/stackisland_1.plist");

	flag = true;

	visibleSize = Director::getInstance()->getWinSize();

	std::vector<std::string> scene = { "island", "superhero" , "farm" };

	sceneName = scene.at(rand() % 3);
//	sceneName = "superhero";

	if (sceneName == "island")
	{
		stackbg = (Node *)CSLoader::createNode("stackisland/stackisland.csb");

		for (int i = 0; i < stackbg->getChildrenCount(); i++)
		{
			for (int j = 0; j < stackbg->getChildren().at(i)->getChildrenCount(); j++)
			{
				if (stackbg->getChildren().at(i)->getChildren().at(j)->getName().find("Sprite_1") != std::string::npos)
				{
					auto bubble = CSLoader::createTimeline("stackisland/bubble.csb");
					stackbg->getChildren().at(i)->getChildren().at(j)->runAction(bubble);
					bubble->play("bubble", true);
				}
			}
		}
	}
	else if(sceneName=="superhero")
	{
		stackbg = (Node *)CSLoader::createNode("stackhero/stackhero.csb");
	}
	else
	{
		stackbg = (Node *)CSLoader::createNode("stackfarm/stackfarm.csb");
		_tray = (Sprite*)stackbg->getChildren().at(1)->getChildByName("cow");
	}

	std::vector<std::string> pankaj;
	std::vector<int> pankaj1;
	for (int i = 0; i < stackbg->getChildrenCount(); i++)
	{
		for (int j = 0; j < stackbg->getChildren().at(i)->getChildrenCount(); j++)
		{
			pankaj.push_back(stackbg->getChildren().at(i)->getChildren().at(j)->getName());
			pankaj1.push_back(i);
		}
	}

	CCLOG("yes");


	this->addChild(stackbg);

	auto secondChild = stackbg->getChildren().at(1);

	_textToSHow = TextGenerator::getInstance()->getInitialSyllableWords(5, 4);

	for (int i = 0; i < secondChild->getChildrenCount(); i++)
	{
		if (secondChild->getChildren().at(i)->getName() == "1" || secondChild->getChildren().at(i)->getName() == "2" || secondChild->getChildren().at(i)->getName() == "3" || secondChild->getChildren().at(i)->getName() == "4" || secondChild->getChildren().at(i)->getName() == "5")
		{
			Position.push_back(secondChild->getChildren().at(i));
		}
	}

	_containerbar1 = (cocos2d::ui::LoadingBar*) (secondChild->getChildByName("containerbar1"));
	_containerbar1->setPercent(0);

	_containerbar2 = (cocos2d::ui::LoadingBar*) (secondChild->getChildByName("containerbar2"));
	_containerbar2->setPercent(0);

	_containerbar3 = (cocos2d::ui::LoadingBar*) (secondChild->getChildByName("containerbar3"));
	_containerbar3->setPercent(0);

	_containerbar4 = (cocos2d::ui::LoadingBar*) (secondChild->getChildByName("containerbar4"));
	_containerbar4->setPercent(0);

	_containerbar5 = (cocos2d::ui::LoadingBar*) (secondChild->getChildByName("containerbar5"));
	_containerbar5->setPercent(0);

	containerBar.push_back(_containerbar1);
	containerBar.push_back(_containerbar2);
	containerBar.push_back(_containerbar3);
	containerBar.push_back(_containerbar4);
	containerBar.push_back(_containerbar5);

	_fillpipebar1 = (cocos2d::ui::LoadingBar*) (secondChild->getChildByName("fillpipebar1"));
	_fillpipebar1->setPercent(0);

	_fillpipebar2 = (cocos2d::ui::LoadingBar*) (secondChild->getChildByName("fillpipebar2"));
	_fillpipebar2->setPercent(0);

	_fillpipebar3 = (cocos2d::ui::LoadingBar*) (secondChild->getChildByName("fillpipebar3"));
	_fillpipebar3->setPercent(0);

	_fillpipebar4 = (cocos2d::ui::LoadingBar*) (secondChild->getChildByName("fillpipebar4"));
	_fillpipebar4->setPercent(0);

	_fillpipebar5 = (cocos2d::ui::LoadingBar*) (secondChild->getChildByName("fillpipebar5"));
	_fillpipebar5->setPercent(0);


	fillpipebar.push_back(_fillpipebar1);
	fillpipebar.push_back(_fillpipebar2);
	fillpipebar.push_back(_fillpipebar3);
	fillpipebar.push_back(_fillpipebar4);
	fillpipebar.push_back(_fillpipebar5);

	if (sceneName == "superhero")
	{
		_trayfillbar = (cocos2d::ui::LoadingBar*) (secondChild->getChildByName("trayfill"));
		_tray = (Sprite*)secondChild->getChildByName("tray");

		charNode = (Node *)CSLoader::createNode("superheroes/superheroes.csb");
		charNode->setPosition(visibleSize.width * .90, visibleSize.height * .13);
		charNode->setScale(.8);
		this->addChild(charNode);

		_fillpipebar1->setColor(Color3B::BLUE);
		_fillpipebar2->setColor(Color3B::RED);
		_fillpipebar3->setColor(Color3B::GREEN);
		_fillpipebar4->setColor(Color3B::MAGENTA);
		_fillpipebar5->setColor(Color3B::ORANGE);

		_containerbar1->setColor(Color3B::BLUE);
		_containerbar2->setColor(Color3B::RED);
		_containerbar3->setColor(Color3B::GREEN);
		_containerbar4->setColor(Color3B::MAGENTA);
		_containerbar5->setColor(Color3B::ORANGE);

		_color.push_back(Color3B::BLUE);
		_color.push_back(Color3B::RED);
		_color.push_back(Color3B::GREEN);
		_color.push_back(Color3B::MAGENTA);
		_color.push_back(Color3B::ORANGE);
	}

	_suckpipebar = (cocos2d::ui::LoadingBar*) (secondChild->getChildByName("suckpipebar"));
	_suckpipebar->setPercent(0);

	int i = 0;
	for (std::map<std::string, std::map<std::string, std::string>>::iterator it = _textToSHow.begin(); it != _textToSHow.end(); ++it, i++)
	{
		std::ostringstream counterForLetter;
		counterForLetter << "container" << i+1;
		std::string counterValue = counterForLetter.str();

		LabelDetails.label = LabelTTF::create(it->first, "Helvetica", 100, CCSizeMake(200, 200));
		LabelDetails.container = (Sprite*) secondChild->getChildByName(counterForLetter.str());
		LabelDetails.label->setPosition(0, 0);
		LabelDetails.label->setColor(Color3B::BLACK);
		LabelDetails.label->setAnchorPoint(Vec2(.5, .7));
		LabelDetails.id = it->first;
		LabelDetails.sequence = i;
		LabelDetails.item = 0;

		Stack::addEvents(LabelDetails);
		Position[i]->addChild(LabelDetails.label);
		_startName.push_back(it->first);

		for (std::map<std::string, std::string>::iterator inIt = it->second.begin(); inIt != it->second.end(); ++inIt)
		{
			_allWords.push_back(inIt->first);
		}
	}


	Stack::generateWord();
	
	return true;
}

void Stack::generateWord()
{
	if (_allWords.size() != 0)
	{
		_word = _allWords.at(rand() % _allWords.size());
		_wordLabel = LabelTTF::create(_word, "Helvetica", 100, CCSizeMake(500, 300));
		_wordLabel->setColor(Color3B::BLACK);
		this->addChild(_wordLabel);

		if (sceneName == "superhero")
		{
			_wordLabel->setPosition(-200, visibleSize.height * .22);

			auto sequenceFuel = Sequence::create(MoveTo::create(2, Vec2(visibleSize.width * .065, visibleSize.height * .22)), CallFunc::create([=]() {
				flag = false;
				stackbg->stopAction(treadmill);
			}), NULL);

			int pos = std::find(_startName.begin(), _startName.end(), _word.substr(0, 2)) - _startName.begin();
			_trayfillbar->setColor(_color.at(pos));
			_suckpipebar->setColor(_color.at(pos));

			treadmill = CSLoader::createTimeline("stackhero/treadmill.csb");
			stackbg->runAction(treadmill);
			treadmill->play("treadmill", true);

			_trayfillbar->setPercent(100);
			_trayfillbar->setPosition(Vec2(-200, visibleSize.height * .27));
			_tray->setPosition(Vec2(-200, visibleSize.height * .28));

			_trayfillbar->runAction(MoveTo::create(2, Vec2(visibleSize.width * .065, visibleSize.height * .27)));
			_tray->runAction(MoveTo::create(2, Vec2(visibleSize.width * .065, visibleSize.height * .28)));

			_wordLabel->runAction(sequenceFuel);
		}
		else if (sceneName == "island")
		{
			_wordLabel->setPosition(visibleSize.width * .08, visibleSize.height * .17);

			treadmill = CSLoader::createTimeline("stackisland/treadmill.csb");
			stackbg->runAction(treadmill);
			treadmill->play("treadmill", false);
			treadmill->setAnimationEndCallFunc("treadmill", CC_CALLBACK_0(Stack::wordShow, this, _wordLabel));
		}
		else if (sceneName == "farm")
		{
			_wordLabel->setPosition(-200, visibleSize.height * .22);

			auto sequenceFuel = Sequence::create(MoveTo::create(2, Vec2(visibleSize.width * .14, visibleSize.height * .22)), CallFunc::create([=]() {
				flag = false;
				stackbg->stopAction(treadmill);
			}), NULL);

			treadmill = CSLoader::createTimeline("stackfarm/cow.csb");
			stackbg->runAction(treadmill);
			treadmill->play("treadmill", true);

			_tray->setPosition(Vec2(-500, visibleSize.height * .25));
			_tray->runAction(MoveTo::create(2, Vec2(visibleSize.width * .065, visibleSize.height * .25)));
			_wordLabel->runAction(sequenceFuel);
		}
	}
	else
	{
		_menuContext->showScore();
	}
}

void Stack::wordShow(LabelTTF *_wordLabel)
{
	flag = false;
	_wordLabel->setVisible(true);
}

void Stack::addEvents(struct LabelDetails sprite)
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
				if ((_word.substr(0, sprite.id.length()) == sprite.id) && flag == false)
				{
					flag = true;
					sprite.label->setColor(Color3B::GREEN);
					Stack::afterAnimation(sprite);
				}
				else if ((_word.substr(0, sprite.id.length()) != sprite.id) && flag == false)
				{
					_wordLabel->setVisible(false);
					treadmill = CSLoader::createTimeline("stackisland/treadmill.csb");
					stackbg->runAction(treadmill);
					treadmill->play("treadmill", false);
					treadmill->setAnimationEndCallFunc("treadmill", CC_CALLBACK_0(Stack::wordShow, this, _wordLabel));
				}
			}
			else
			{
				if ((_word.substr(0, sprite.id.length()) == sprite.id) && flag == false)
				{
					flag = true;
					sprite.label->setColor(Color3B::GREEN);

					if (sceneName == "superhero")
					{
						cocostudio::timeline::ActionTimeline *charTimeline = CSLoader::createTimeline("superheroes/superheroes.csb");
						charNode->runAction(charTimeline);
						charTimeline->play("correct", false);
						charTimeline->setAnimationEndCallFunc("correct", CC_CALLBACK_0(Stack::afterAnimation, this, sprite));
					}
					else
					{
						Stack::afterAnimation(sprite);
					}
				}
				else if ((_word.substr(0, sprite.id.length()) != sprite.id) && flag == false)
				{
					if (sceneName == "superhero")
					{
						auto charTimeline = CSLoader::createTimeline("superheroes/superheroes.csb");
						charNode->runAction(charTimeline);
						charTimeline->play("wrong", false);
					}
				}
			}
			return true;
		}
		return false;
	};

	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener, sprite.container);
	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener->clone(), sprite.label);
}

void Stack::wordLabelAnim(struct LabelDetails sprite)
{
	auto Sequ = Sequence::create(MoveTo::create(.7, Vec2(visibleSize.width / 2, visibleSize.height * .40)), CallFunc::create([=]() {
		auto delay = DelayTime::create(0.0f);

		auto Sequ2 = Sequence::create(ScaleTo::create(.7, 3.3, 3.3), delay, ScaleTo::create(.7, 3, 3), CallFunc::create([=]() {
			sprite.label->setColor(Color3B::BLACK);

			if (sceneName == "farm")
			{
				this->removeChild(_wordLabel);
				auto sequenceFuel1 = Sequence::create(MoveTo::create(4, Vec2(visibleSize.width, visibleSize.height * .22)), CallFunc::create([=]() {
					sprite.label->setColor(Color3B::BLACK);
					stackbg->stopAction(treadmill);
					Stack::generateWord();
				}), NULL);

				treadmill = CSLoader::createTimeline("stackfarm/cow.csb");
				stackbg->runAction(treadmill);
				treadmill->play("treadmill", true);
				_tray->runAction(sequenceFuel1);
			}
			else
			{
				this->removeChild(_wordLabel);
				Stack::generateWord();
			}
		}), NULL);
		_wordLabel->runAction(Sequ2);
	}), NULL);

	auto move = MoveTo::create(.7, Vec2(visibleSize.width / 2, visibleSize.height / 2));
	auto scale = ScaleTo::create(.7, 3);
	auto mySpawn = Spawn::createWithTwoActions(move, scale);
	_wordLabel->runAction(scale);
	_wordLabel->runAction(Sequ);
}

void Stack::afterAnimation(struct LabelDetails sprite)
{
	float fuelPer = 0, delay = 0, containerValue;

	if (sceneName == "island")
	{
		containerValue = 24;
		while (fuelPer <= 100)
		{
			auto suckpipebar_sequence = Sequence::create(DelayTime::create(delay), CallFunc::create([=]() { _suckpipebar->setPercent(_suckpipebar->getPercent() + 1); }), NULL);
			fuelPer++;	delay = delay + 0.01;
			_suckpipebar->runAction(suckpipebar_sequence);
		}
	}
	else
	{
		containerValue = 25;
		while (fuelPer <= 100)
		{
			auto suckpipebar_sequence = Sequence::create(DelayTime::create(delay), CallFunc::create([=]() { _suckpipebar->setPercent(_suckpipebar->getPercent() + 1); }), NULL);
			auto trayfillbar_sequence = Sequence::create(DelayTime::create(delay), CallFunc::create([=]() { _trayfillbar->setPercent(_trayfillbar->getPercent() - 1); }), NULL);
			fuelPer++;	delay = delay + 0.01;
			_suckpipebar->runAction(suckpipebar_sequence);
			if(sceneName=="superhero")
				_trayfillbar->runAction(trayfillbar_sequence);
		}
	}


	if (fuelPer >= 100)
	{
		fuelPer = 0;

		while (fuelPer <= 100)
		{
			auto sequenceFuel = Sequence::create(DelayTime::create(delay), CallFunc::create([=]() { fillpipebar[sprite.sequence]->setPercent(fuelPer); }), NULL);
			fuelPer++;
			delay = delay + 0.01;
			fillpipebar[sprite.sequence]->runAction(sequenceFuel);
		}
	}

	if (fuelPer >= 100)
	{
		auto sequenceFuel = Sequence::create(DelayTime::create(delay), CallFunc::create([=]() { _suckpipebar->setPercent(0); }), NULL);
		_suckpipebar->runAction(sequenceFuel);

		sequenceFuel = Sequence::create(DelayTime::create(delay), CallFunc::create([=]() { fillpipebar[sprite.sequence]->setPercent(0); }), NULL);
		fillpipebar[sprite.sequence]->runAction(sequenceFuel);

		fuelPer = 0;

		while (fuelPer <= containerValue)
		{
			auto sequenceFuel = Sequence::create(DelayTime::create(delay), CallFunc::create([=]() { containerBar[sprite.sequence]->setPercent(containerBar[sprite.sequence]->getPercent() + 1); }), NULL);
			fuelPer++;	delay = delay + 0.03;
			containerBar[sprite.sequence]->runAction(sequenceFuel);

			if (fuelPer == containerValue)
			{
				this->runAction(Sequence::create(DelayTime::create(delay), CallFunc::create([=]() {					
					_allWords.erase(std::remove(_allWords.begin(), _allWords.end(), _word), _allWords.end());
					Stack::wordLabelAnim(sprite);
				}), NULL));
			}
		}
	}
}