#include "Stack.h"
#include "editor-support/cocostudio/CocoStudio.h"

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

	flag = false;

	visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	auto stackbg = CSLoader::createNode("stack/stack.csb");
	stackbg->setPosition(Vec2(visibleSize.width / 2, visibleSize.height / 2));
	stackbg->setAnchorPoint(Vec2(.5, .5));
	this->addChild(stackbg);

	_textToSHow = TextGenerator::getInstance()->getInitialSyllableWords(5, 3);

	auto secondChild = stackbg->getChildren().at(1);

	Position.push_back(secondChild->getChildByName("1")->getPosition());
	Position.push_back(secondChild->getChildByName("2")->getPosition());
	Position.push_back(secondChild->getChildByName("3")->getPosition());
	Position.push_back(secondChild->getChildByName("4")->getPosition());
	Position.push_back(secondChild->getChildByName("5")->getPosition());

	int i = 0;
	for (std::map<std::string, std::map<std::string, std::string>>::iterator it = _textToSHow.begin(); it != _textToSHow.end(); ++it, i++)
	{
		LabelDetails.label = LabelTTF::create(it->first, "Helvetica", 100, CCSizeMake(200, 200));
		LabelDetails.label->setPosition(Position[i].x * 105 / 100, Position[i].y * .95);
		LabelDetails.label->setAnchorPoint(Vec2(.5, .5));
		LabelDetails.id = it->first;
		LabelDetails.sequence = i;
		
		Stack::addEvents(LabelDetails);
		this->addChild(LabelDetails.label);
		_startName.push_back(it->first);

		for (std::map<std::string, std::string>::iterator inIt = it->second.begin(); inIt != it->second.end(); ++inIt)
		{
			_allWords.push_back(inIt->first);
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

	_suckpipebar = (cocos2d::ui::LoadingBar*) (secondChild->getChildByName("suckpipebar"));
	_suckpipebar->setPercent(0);

	Stack::generateWord();

	return true;
}

void Stack::generateWord()
{
	flag = false;
	_word = _allWords.at(rand() % _allWords.size());
	_wordLabel = LabelTTF::create(_word, "Helvetica", 100, CCSizeMake(500, 300));
	_wordLabel->setPosition(visibleSize.width * .10, visibleSize.height * .25);
	this->addChild(_wordLabel);
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
			if ((_word.substr(0, sprite.id.length())==sprite.id) && flag == false)
			{
				float fuelPer = 0, delay = 0;
				flag = true;
				while (fuelPer <= 100)
				{
					auto sequenceFuel = Sequence::create(DelayTime::create(delay), CallFunc::create([=]() { _suckpipebar->setPercent(fuelPer); }), NULL);
					fuelPer++;	delay = delay + 0.03;
					_suckpipebar->runAction(sequenceFuel);
				}

				if (fuelPer >= 100)
				{
					fuelPer = 0;
					while (fuelPer <= 100)
					{
						auto sequenceFuel = Sequence::create(DelayTime::create(delay), CallFunc::create([=]() { fillpipebar[sprite.sequence]->setPercent(fuelPer); }), NULL);
						fuelPer++;	delay = delay + 0.03;
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

						if (fuelPer >= 25)
						{
							this->runAction(Sequence::create(DelayTime::create(delay), CallFunc::create([=]() {
								this->removeChild(_wordLabel);
								_allWords.erase(std::remove(_allWords.begin(), _allWords.end(), _word), _allWords.end());
								Stack::generateWord();
							}), NULL));
						}
					}
				}
			}

			return true;
		}

		return false;
	};

	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener, sprite.label);

}