
#include "Circle.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../lang/LangUtil.h"
#include "../lang/TextGenerator.h"
#include "../effects/FShake.h"

USING_NS_CC;

Circle::Circle()
{
	
}

Circle::~Circle()
{

}

Circle * Circle::create()
{
	Circle* CircleGame = new (std::nothrow) Circle();
	if (CircleGame && CircleGame->init()) {
		CircleGame->autorelease();
		return CircleGame;
	}
	CC_SAFE_DELETE(CircleGame);
	return nullptr;
}

cocos2d::Scene * Circle::createScene()
{
	auto scene = cocos2d::Scene::create();
	auto layer = Circle::create();
	scene->addChild(layer);

	layer->menu = MenuContext::create(layer, "Circle");
	scene->addChild(layer->menu);
	return scene;
}

bool Circle::init()
{

	if (!Layer::init())
	{
		return false;
	}
	Size visibleSize = Director::getInstance()->getVisibleSize();

	background = CSLoader::createNode("circle/circle.csb");
	if(visibleSize.width > 2560) {
		background->setPositionX((visibleSize.width - 2560) / 2);
	}
	this->addChild(background, 0);

	auto dot = background->getChildByName("dot_14");
	_octopus = CSLoader::createNode("circle/octopus.csb");
	_octopus->setPositionX(dot->getPositionX()+ (visibleSize.width - 2560) / 2);
	_octopus->setPositionY(dot->getPositionY());
    this->addChild(_octopus, 2);


	_fishRef.push_back(background->getChildByName("fish_1"));
	_fishRef.push_back(background->getChildByName("fish_2"));
	_fishRef.push_back(background->getChildByName("fish_3"));
	_fishRef.push_back(background->getChildByName("fish_4"));
	_fishRef.push_back(background->getChildByName("fish_5"));
	_fishRef.push_back(background->getChildByName("fish_6"));

	_dotRef.push_back(background->getChildByName("dot_2_2"));
	_dotRef.push_back(background->getChildByName("dot_2_3"));
	_dotRef.push_back(background->getChildByName("dot_2_4"));
	_dotRef.push_back(background->getChildByName("dot_2_1"));
	_dotRef.push_back(background->getChildByName("dot_2_0"));
	_dotRef.push_back(background->getChildByName("dot_2"));

	for (int i = 0; i < 6; i++)
	{

	}

	_synonyms = TextGenerator::getInstance()->getSynonyms(10);
	//CCLOG("synonyms = %s", _synonyms.at(1));


	for (auto it = _synonyms.begin(); it != _synonyms.end(); ++it) {
		_mapKey.push_back(it->first);
	}

	wordGenerateWithOptions();
	return true;
}

void Circle::eat(char str)
{
	std::stringstream ss; 
	
	ss << str;
	ss >> _target;
	if (str < '4')
	{
		auto mouthTimeline = CSLoader::createTimeline(("circle/tail.csb"));
		_octopus->getChildByName("tail_" + _target)->runAction(mouthTimeline);
		mouthTimeline->gotoFrameAndPlay(0, false);
	}
	else
	{
		auto mouthTimeline = CSLoader::createTimeline(("circle/tail1.csb"));
		_octopus->getChildByName("tail_" + _target)->runAction(mouthTimeline);
		mouthTimeline->gotoFrameAndPlay(0, false);
	}
	auto fishRemove = background->getChildByName("fish_" + _target);
	FShake* shake = FShake::actionWithDuration(1.0f, 10.0f);
	//fishRemove->runAction(shake);
	fishRemove->runAction(Sequence::create(shake, CallFunc::create([=]() {
		wordGenerateWithOptions();

	}), NULL));
//	this->scheduleOnce(schedule_selector(Circle::change), 1.5f);


}

void Circle::change(float dt)
{
	CCLOG("remove");
	auto fishRemove = background->getChildByName("fish_" + _target);
	fishRemove->setVisible(false);
}
void Circle::wordGenerateWithOptions()
{
	std::vector<std::string> answer;
	Size visibleSize = Director::getInstance()->getVisibleSize();
	int size = _mapKey.size();
	_gameWord = _mapKey.at(cocos2d::RandomHelper::random_int(0, size - 1));
	answer.push_back(_synonyms.at(_gameWord));
	_topLabel = Label::createWithSystemFont(_gameWord.c_str(), "Arial", 100);
	_topLabel->setPositionX(visibleSize.width / 2  + 60);
	_topLabel->setPositionY(visibleSize.height - _topLabel->getContentSize().height - 200);
	this->addChild(_topLabel,2);

	int randomInt1 = cocos2d::RandomHelper::random_int(0, size - 1);
	for (int j = 0; j < 5; j++) {
		answer.push_back(_synonyms.at(_mapKey.at(randomInt1 % size)));
		randomInt1++;
	}
	int answerSize = answer.size() - 1;
	//CCLOG(answer);
	int randomInt = cocos2d::RandomHelper::random_int(0, answerSize);
	for (int i = 0; i < _fishRef.size(); i++) {

		auto str = answer.at(randomInt % (answerSize + 1));
		auto myLabel = Label::createWithSystemFont(str, "Arial", 100);
		std::stringstream ss;
		ss << (i+1);
		std::string str1 = ss.str();

		myLabel->setName(str + str1);
		if (i == 1)
		{
			myLabel->setPositionX(_fishRef.at(i)->getContentSize().width / 2 );
			myLabel->setPositionY(_fishRef.at(i)->getContentSize().height / 2 - 50);

		}
		else if (i == 2)
		{
			myLabel->setPositionX(_fishRef.at(i)->getContentSize().width / 2 - 80);
			myLabel->setPositionY(_fishRef.at(i)->getContentSize().height / 2);

		}
		else
		{
			myLabel->setPositionX(_fishRef.at(i)->getContentSize().width / 2);
			myLabel->setPositionY(_fishRef.at(i)->getContentSize().height / 2);
        }
		
		//myLabel->setPositionX(_fishRef.at(i)->getPositionX());
		//myLabel->setPositionY(_fishRef.at(i)->getPositionY());
		//myLabel->setColor(Color3B(0, 0, 0));
		_fishRef.at(i)->addChild(myLabel);
		_choiceLabel.pushBack(myLabel);
		auto listener = EventListenerTouchOneByOne::create();
		listener->setSwallowTouches(true);
		listener->onTouchBegan = CC_CALLBACK_2(Circle::onTouchBegan, this);
		_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, _fishRef.at(i));
		randomInt++;
	}

}

bool Circle::onTouchBegan(cocos2d::Touch * touch, cocos2d::Event * event)
{
	Size visibleSize = Director::getInstance()->getVisibleSize();

	auto target = event->getCurrentTarget();
	auto  location = target->convertToNodeSpace(touch->getLocation());
	//auto  location = target->convertToNodeSpace(touch->getLocation() - ;
	if (target->getBoundingBox().containsPoint(Vec2(touch->getLocation().x - ((visibleSize.width - 2560) / 2), touch->getLocation().y)))
	{
		std::string wordStr = target->getChildren().at(0)->getName();
		char sss[100];
		strcpy(sss, wordStr.c_str());
		//auto strArray = (char[]) wordStr;
		//auto test = strtok(sss, " _");
		//std::string number;
		/*while (test != NULL)
		{
			number = strtok(NULL, "_");
		}*/
		 char ssss = wordStr.at(wordStr.length()-1);
		 wordStr.at(wordStr.length() - 1) = ' ';
		CCLOG("");
		if (wordStr.compare(_synonyms.at(_gameWord)+" ") == 0) {
			//    CCLOG("11111111111111111");
			this->removeChild(_topLabel);
			for (int i = 0; i < _choiceLabel.size(); i++) {
				_fishRef.at(i)->removeChild(_choiceLabel.at(i));
				}
			_eventDispatcher->removeAllEventListeners();
			_choiceLabel.clear();
			eat(ssss);	
		}
		else
		{
			FShake* shake = FShake::actionWithDuration(1.0f, 10.0f);
			_octopus->runAction(shake);
		}
		return true;
	}
	return false;
}
