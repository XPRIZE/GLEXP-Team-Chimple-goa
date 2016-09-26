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

	std::vector<std::string> scene = {"island", "superhero"};

	sceneName = scene.at(rand() % scene.size());
	sceneName = "superhero";

	std::vector<std::string> pankaj;

	if (sceneName == "island")
	{
		stackbg = (Node *)CSLoader::createNode("stackisland/stackisland.csb");

		wrongNode = (Node *)CSLoader::createNode("stackisland/animation1.csb");
		wrongNode->setPosition(-500, visibleSize.height * .15);
		wrongNode->setScale(.5);
		this->addChild(wrongNode , 2);

		correctNode = (Node *)CSLoader::createNode("stackisland/animation.csb");
		correctNode->setPosition(-500, visibleSize.height * .15);
		correctNode->setScale(.5);
		this->addChild(correctNode, 2);

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

	}
	else
	{
		stackbg = (Node *)CSLoader::createNode("stackhero/stackhero.csb");
	}

	this->addChild(stackbg);

	auto secondChild = stackbg->getChildren().at(1);

	_textToSHow = TextGenerator::getInstance()->getInitialSyllableWords(5, 3);

	for (int i = 0; i < secondChild->getChildrenCount(); i++)
	{
		if (secondChild->getChildren().at(i)->getName() == "1" || secondChild->getChildren().at(i)->getName() == "2" || secondChild->getChildren().at(i)->getName() == "3" || secondChild->getChildren().at(i)->getName() == "4" || secondChild->getChildren().at(i)->getName() == "5")
		{
			Position.push_back(secondChild->getChildren().at(i));
		}
	}

	if (sceneName == "superhero")
	{
		_trayfillbar = (cocos2d::ui::LoadingBar*) (secondChild->getChildByName("trayfill"));
		_tray = (Sprite*)secondChild->getChildByName("tray");

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

		_suckpipebar = (cocos2d::ui::LoadingBar*) (secondChild->getChildByName("suckpipebar"));
		_suckpipebar->setPercent(0);

		charNode = (Node *)CSLoader::createNode("superheroes/superheroes.csb");
		charNode->setPosition(visibleSize.width * .90, visibleSize.height * .13);
		charNode->setScale(.8);
		this->addChild(charNode);
	}
	

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
	if (_allWords.size() != 0 && sceneName == "superhero")
	{
		_word = _allWords.at(rand() % _allWords.size());
		_wordLabel = LabelTTF::create(_word, "Helvetica", 100, CCSizeMake(500, 300));
		_wordLabel->setPosition(-200, visibleSize.height * .22);
		this->addChild(_wordLabel);

		auto sequenceFuel = Sequence::create(MoveTo::create(2, Vec2(visibleSize.width * .065, visibleSize.height * .22)), CallFunc::create([=]() { 
			flag = false;
			stackbg->stopAction(treadmill);
		}), NULL);

		treadmill = CSLoader::createTimeline("stackhero/treadmill.csb");
		stackbg->runAction(treadmill);
		treadmill->gotoFrameAndPause(0);
		treadmill->play("treadmill", true);

		_trayfillbar->setPercent(100);
		_trayfillbar->setPosition(Vec2(-200, visibleSize.height * .27));
		_tray->setPosition(Vec2(-200, visibleSize.height * .28));

		_trayfillbar->runAction(MoveTo::create(2, Vec2(visibleSize.width * .065, visibleSize.height * .27)));
		_tray->runAction(MoveTo::create(2, Vec2(visibleSize.width * .065, visibleSize.height * .28)));

		_wordLabel->runAction(sequenceFuel);
	}
	else if (_allWords.size() != 0 && sceneName == "island")
	{
		flag = false;
		_word = _allWords.at(rand() % _allWords.size());
		_wordLabel = LabelTTF::create(_word, "Helvetica", 100, CCSizeMake(500, 300));
		_wordLabel->setPosition(visibleSize.width * .08, visibleSize.height * .17);
		this->addChild(_wordLabel);

		auto sparkleTime = CSLoader::createTimeline("stackisland/sparkle.csb");
		auto sparkleTime1 = CSLoader::createTimeline("stackisland/sparkle.csb");
		stackbg->getChildren().at(1)->getChildByName("FileNode_2")->runAction(sparkleTime);
		stackbg->getChildren().at(1)->getChildByName("FileNode_2_0")->runAction(sparkleTime1);
		sparkleTime->gotoFrameAndPlay(0, false);
		sparkleTime1->gotoFrameAndPlay(0, false);
	}
	else
	{
		_menuContext->showScore();
	}
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
					correctNode->setPosition(-500, visibleSize.height * .20);
					auto charTimeline = CSLoader::createTimeline("stackisland/animation.csb");
					correctNode->runAction(charTimeline);
					charTimeline->gotoFrameAndPlay(0, true);

					auto sequenceFuel = Sequence::create(MoveTo::create(1.3, Vec2(visibleSize.width * .02, visibleSize.height * .20)), CallFunc::create([=]() {
						flag = false;
						stackbg->getChildren().at(1)->getChildByName("pearl_22")->setVisible(false);
						stackbg->getChildren().at(1)->getChildByName("FileNode_2")->setVisible(false);
						stackbg->getChildren().at(1)->getChildByName("FileNode_2_0")->setVisible(false);
						correctNode->stopAction(charTimeline);

//						Sprite *newPearl = Sprite::createWithSpriteFrameName("stackisland/stackisland_1/pearl.png");

						auto putPearl = Sequence::create(MoveTo::create(3, Vec2(sprite.container->getPositionX() - sprite.container->getBoundingBox().size.width * .85 + stackbg->getChildren().at(1)->getChildByName("pearl_22")->getBoundingBox().size.width * sprite.item, sprite.container->getPositionY() + sprite.container->getBoundingBox().size.height)), CallFunc::create([=]() {

							Sprite *newPearl = Sprite::createWithSpriteFrameName("stackisland/stackisland_1/pearl.png");
							newPearl->setPosition(Vec2(correctNode->getPositionX() + correctNode->getBoundingBox().size.width * 2, correctNode->getPositionY() - correctNode->getBoundingBox().size.height / 2));
							this->addChild(newPearl, 3);

						}), NULL);

						correctNode->runAction(putPearl);

					}), NULL);
					correctNode->runAction(sequenceFuel);
				}
				else if ((_word.substr(0, sprite.id.length()) != sprite.id) && flag == false)
				{
					flag = true;
					wrongNode->setPosition(-500, visibleSize.height * .15);
					auto charTimeline = CSLoader::createTimeline("stackisland/animation1.csb");
					wrongNode->runAction(charTimeline);
					charTimeline->gotoFrameAndPlay(0, true);

					auto sequenceFuel = Sequence::create(MoveTo::create(5, Vec2(visibleSize.width, visibleSize.height * .15)), CallFunc::create([=]() {
						flag = false;
						wrongNode->setPosition(-500, visibleSize.height * .15);
						wrongNode->stopAction(charTimeline);
					}), NULL);
					wrongNode->runAction(sequenceFuel);
				}
			}
			else
			{
				if ((_word.substr(0, sprite.id.length()) == sprite.id) && flag == false)
				{
					flag = true;
					sprite.label->setColor(Color3B::GREEN);
					cocostudio::timeline::ActionTimeline *charTimeline = CSLoader::createTimeline("superheroes/superheroes.csb");
					charNode->runAction(charTimeline);
//					charTimeline->gotoFrameAndPlay(0, false);
					charTimeline->play("correct", false);
					charTimeline->setAnimationEndCallFunc("correct", CC_CALLBACK_0(Stack::afterAnimation, this, sprite, charTimeline, charNode));
				}
				else if ((_word.substr(0, sprite.id.length()) != sprite.id) && flag == false)
				{
					auto charTimeline = CSLoader::createTimeline("superheroes/superheroes.csb");
					charNode->runAction(charTimeline);
					charTimeline->play("wrong", false);
				}
			}
			return true;
		}
		return false;
	};

	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener, sprite.container);
	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener->clone(), sprite.label);
}

void Stack::afterAnimation(struct LabelDetails sprite, cocostudio::timeline::ActionTimeline *timeline, Node *charNode)
{
	if (sceneName == "island")
	{

	}
	else
	{
		charNode->stopAction(timeline);
		float fuelPer = 100, delay = 0;

		while (fuelPer >= 1)
		{
			auto trayfillbar_sequence = Sequence::create(DelayTime::create(delay), CallFunc::create([=]() { _trayfillbar->setPercent(fuelPer); }), NULL);
			auto suckpipebar_sequence = Sequence::create(DelayTime::create(delay), CallFunc::create([=]() { _suckpipebar->setPercent(_suckpipebar->getPercent() + 1); }), NULL);
			fuelPer--;	delay = delay + 0.01;
			_trayfillbar->runAction(trayfillbar_sequence);
			_suckpipebar->runAction(suckpipebar_sequence);
		}

		if (fuelPer <= 0)
		{
			fuelPer = 0;

			while (fuelPer <= 100)
			{
				auto sequenceFuel = Sequence::create(DelayTime::create(delay), CallFunc::create([=]() { fillpipebar[sprite.sequence]->setPercent(fuelPer); }), NULL);
				fuelPer++;
				delay = delay + 0.03;
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

			while (fuelPer <= 25)
			{
				auto sequenceFuel = Sequence::create(DelayTime::create(delay), CallFunc::create([=]() { containerBar[sprite.sequence]->setPercent(containerBar[sprite.sequence]->getPercent() + 1); }), NULL);
				fuelPer++;	delay = delay + 0.03;
				containerBar[sprite.sequence]->runAction(sequenceFuel);

				if (fuelPer == 25)
				{
					this->runAction(Sequence::create(DelayTime::create(delay), CallFunc::create([=]() {
						this->removeChild(_wordLabel);
						_allWords.erase(std::remove(_allWords.begin(), _allWords.end(), _word), _allWords.end());
						sprite.label->setColor(Color3B::BLACK);
						Stack::generateWord();
					}), NULL));
				}
			}
		}
	}
}