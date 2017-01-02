
#include "Circle.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../lang/LangUtil.h"
#include "../lang/TextGenerator.h"
#include "../effects/FShake.h"
#include "../menu/MenuContext.h"
#include "../menu/HelpLayer.h"
#include "../util/CommonLabel.h"

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

	layer->menu = MenuContext::create(layer,Circle::gameName());
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
	float toplabelX = visibleSize.width / 2 - 30;
	_differntSceneMapping = {
		{
			{ "city",  //pratap designs
			{
				{ "plist", "circlehero/circlehero.plist" },
				{ "bg", "circlehero/circlehero.csb" },
				{ "friend", "circlehero/stoneman.csb" },
				{ "friend_dot", "stoneman" },
				{ "enemy", "circlehero/meteor.csb" },
				{ "enemy1", "meteor1" },
				{ "enemy2", "meteor2" },
				{ "enemy3", "meteor3" },
				{ "enemy4", "meteor4" },
				{ "enemy5", "meteor5" },
				{ "enemy6", "meteor6" },
				{ "animation_select", "one" },
				{"topLabelX",""},
				
			} },
			{ "iceLand",  //anu designs
			{
				{ "plist", "circle/circle.plist" },
				{ "bg", "circle/circle.csb" },
				{ "friend", "circle/octopus.csb" },
				{ "friend_dot", "dot_14" },
				{ "enemy", "circle/fish.csb" },
				{ "enemy1", "dot_2_2" },
				{ "enemy2", "dot_2_3" },
				{ "enemy3", "dot_2_4" },
				{ "enemy4", "dot_2_1" },
				{ "enemy5", "dot_2_0" },
				{ "enemy6", "dot_2" },
				{ "animation_select", "two" }
				
			} },
			{ "candy",  //teju design
			{
				{ "plist", "circlecandy/circlecandy.plist" },
				{ "bg", "circlecandy/circlecandy.csb" },
				{ "friend", "circlecandy/cake.csb" },
				{ "friend_dot", "dot_14" },
				{ "enemy", "circlecandy/ingredients.csb" },
				{ "enemy1", "board_2_0_0" },
				{ "enemy2", "board_2" },
				{ "enemy3", "board_2_0_0_0" },
				{ "enemy4", "board_2_0_0_0_0" },
				{ "enemy5", "board_2_0_0_0_0_0" },
				{ "enemy6", "board_2_0_0_0_0_0_0" },
				{ "animation_select", "three" }
			} },

		}
	};

	
	//wordGenerateWithOptions();
	return true;
}
void Circle::onEnterTransitionDidFinish()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Node::onEnterTransitionDidFinish();
	int level = menu->getCurrentLevel();
	std::vector<std::string> theme = { "city","iceLand","candy" };
	std::string themeName;
	int division = ((level - 1) % 15) + 1;
	
	if (division >= 1 && division < 6) {
		int roundLevel = std::ceil(level / 15.0);
		int inner = division + ((roundLevel - 1) * 5);
		int subLevel = 1;
		if (inner < 16) {
			subLevel = (std::ceil(inner / 3.0));
		}
		else {
			inner = inner - 15;
			subLevel = (std::ceil(inner / 2.0));
			subLevel += 5;
		}
		CCLOG("Sysnonyms sub Level = %d", subLevel);
		themeName = "city";
		_synonyms = TextGenerator::getInstance()->getSynonyms(10, subLevel);
		_title = LangUtil::getInstance()->translateString("Make word of same meaning as : ");
		_header = LangUtil::getInstance()->translateString("List of same meaning words");
	}
	else if (division >5 && division < 11) {
		int roundLevel = std::ceil(level / 15.0);
		int inner = division - 5 + ((roundLevel - 1) * 5);

		int subLevel = 1;
		if (inner < 16) {
			subLevel = (std::ceil(inner / 3.0));
		}
		else {
			inner = inner - 15;
			subLevel = (std::ceil(inner / 2.0));
			subLevel += 5;
		}
		CCLOG("Antonyms Sub Level = %d", subLevel);
		themeName = "iceLand";
		_synonyms = TextGenerator::getInstance()->getAntonyms(10, subLevel);
		_title = LangUtil::getInstance()->translateString("Make opposite of : ");
		_header = LangUtil::getInstance()->translateString("List of opposite words");
	}
	else {
		int roundLevel = std::ceil(level / 15.0);
		int inner = division - 10 + ((roundLevel - 1) * 5);

		int subLevel = 1;
		if (inner < 16) {
			subLevel = (std::ceil(inner / 3.0));
		}
		else {
			inner = inner - 15;
			subLevel = (std::ceil(inner / 2.0));
			subLevel += 5;
		}
		CCLOG("Homonyms SubLevel = %d", subLevel);
		themeName = "candy";
		_synonyms = TextGenerator::getInstance()->getHomonyms(10, subLevel);
		_title = LangUtil::getInstance()->translateString("Make same sounding word as : ");
		_header = LangUtil::getInstance()->translateString("List of same sounding words");
	}

	for (auto it = _synonyms.begin(); it != _synonyms.end(); ++it) {
		_mapKey.push_back(it->first);
	}
	//wordGenerateWithOptions();

	

	
	_scenePath = _differntSceneMapping.at(themeName);

	auto spritecache1 = SpriteFrameCache::getInstance();
	spritecache1->addSpriteFramesWithFile(_scenePath.at("plist"));

	background = CSLoader::createNode(_scenePath.at("bg"));//"circle/circle.csb"
	extraX = 0;
	if (visibleSize.width > 2560) {
		extraX = (visibleSize.width - 2560) / 2;
		background->setPositionX((visibleSize.width - 2560) / 2);
	}
	this->addChild(background, 0);



	_enemyRef.push_back(background->getChildByName(_scenePath.at("enemy1")));
	_enemyRef.push_back(background->getChildByName(_scenePath.at("enemy2")));
	_enemyRef.push_back(background->getChildByName(_scenePath.at("enemy3")));
	_enemyRef.push_back(background->getChildByName(_scenePath.at("enemy4")));
	_enemyRef.push_back(background->getChildByName(_scenePath.at("enemy5")));
	_enemyRef.push_back(background->getChildByName(_scenePath.at("enemy6")));

	if (_scenePath.at("animation_select").compare("one") == 0)
	{
		CCLOG("one");
		auto dot = background->getChildByName(_scenePath.at("friend_dot"));
		_friend = CSLoader::createNode(_scenePath.at("friend"));//"circle/octopus.csb"
		_friend->setPositionX(dot->getPositionX() + extraX);
		_friend->setPositionY(dot->getPositionY());

		this->addChild(_friend);

		for (int i = 0; i < 6; i++)
		{
			auto enemyadding = CSLoader::createNode(_scenePath.at("enemy"));
			enemyadding->setPositionX(_enemyRef.at(i)->getPositionX() + extraX);
			enemyadding->setPositionY(_enemyRef.at(i)->getPositionY());
			_enemyRef1.push_back(enemyadding);
			this->addChild(enemyadding);
		}

	}


	if (_scenePath.at("animation_select").compare("two") == 0)
	{
		CCLOG("two");
		auto dot = background->getChildByName(_scenePath.at("friend_dot"));
		_friend = CSLoader::createNode(_scenePath.at("friend"));//"circle/octopus.csb"
		_friend->setPositionX(dot->getPositionX() + extraX);
		_friend->setPositionY(dot->getPositionY());
		this->addChild(_friend);

		for (int i = 0; i < 6; i++)
		{
			auto enemyadding = CSLoader::createNode(_scenePath.at("enemy"));
			enemyadding->setPositionX(_enemyRef.at(i)->getPositionX() + extraX);
			enemyadding->setPositionY(_enemyRef.at(i)->getPositionY());
			if (i < 3) {
				enemyadding->setScaleX(-1 * enemyadding->getScaleX());
			}
			_enemyRef1.push_back(enemyadding);
			this->addChild(enemyadding);
		}
		for (int i = 0; i < _enemyRef1.size(); i++)
		{
			auto timeline = CSLoader::createTimeline(("circle/fish.csb"));
			auto fish = _enemyRef1.at(i);
			fish->runAction(timeline);
			timeline->gotoFrameAndPlay(0, true);

		}

	}
	if (_scenePath.at("animation_select").compare("three") == 0)
	{
		_friend = background->getChildByName("cake");
	}
	if (_scenePath.at("animation_select").compare("three") == 0)
	{
		menu->setMaxPoints(6);
	}
	else
	{
		menu->setMaxPoints(5);
	}
	wordGenerateWithOptions();
}

void Circle::gameHelp()
{
	_helpFlage = true;
	//game help only for first level
	auto labelSize = _topLabel->getContentSize();
	auto labelPosition = _topLabel->getPosition();
	auto ans = _synonyms.at(_gameWord);
	std::string name;
	for (int i = 0; i < _answers.size(); i++) {
		if (_answers.at(i).find(ans) == 0) {
			CCLOG("help");
			name = _answers.at(i);
		}
	}
	auto optionLayer = this->getChildByName(name.c_str());
	auto optionSize = optionLayer->getContentSize();
	auto optionPosition = optionLayer->getPosition();
	auto help = HelpLayer::create(Rect(optionPosition.x, optionPosition.y, optionSize.width+ 40, optionSize.height), Rect(labelPosition.x, labelPosition.y, labelSize.width + 300, labelSize.height));
	help->click(Vec2(optionPosition));
	help->setName("helpLayer");
	this->addChild(help);

}
void Circle::eat(char str)
{
	std::stringstream ss; 
	ss << str;
	ss >> _target;
	int num = atoi(_target.c_str());
	if (str < '4')
	{
		auto mouthTimeline = CSLoader::createTimeline(("circle/tail.csb"));
		_friend->getChildByName("tail_" + _target)->runAction(mouthTimeline);
		mouthTimeline->gotoFrameAndPlay(0, false);
	}
	else
	{
		auto mouthTimeline = CSLoader::createTimeline(("circle/tail1.csb"));
		_friend->getChildByName("tail_" + _target)->runAction(mouthTimeline);
		mouthTimeline->gotoFrameAndPlay(0, false);
	}
//	auto fishRemove = background->getChildByName("fish_" + _target);
	auto fishRemove = _enemyRef1.at(num - 1);
	FShake* shake = FShake::actionWithDuration(1.0f, 10.0f);
	//fishRemove->runAction(shake);
	fishRemove->runAction(Sequence::create(shake, CallFunc::create([=]() {
	//	wordGenerateWithOptions();
  }), NULL));
	if (_score == 5)
	{
	//	this->scheduleOnce(schedule_selector(Circle::bigpuff), 1.5f);
		
		
		this->runAction(Sequence::create(DelayTime::create(3.0f), CallFunc::create([=]() {
			auto correct = CSLoader::createNode("circle/correct.csb");
			correct->setPositionX(_friend->getPositionX());
			correct->setPositionY(_friend->getPositionY());
			this->addChild(correct);
			auto timeline = CSLoader::createTimeline("circle/correct.csb");
			correct->runAction(timeline);
			timeline->play("correct", true);
			_friend->setVisible(false);
		}), CallFunc::create([=]() {
			this->scheduleOnce(schedule_selector(Circle::scoreBoard), 3.0f);
		}), NULL));


		
		
	}
	else
	{
		this->runAction(Sequence::create(DelayTime::create(1.0f), CallFunc::create([=]() {
		wordGenerateWithOptions();
		}), NULL));
	}


}

void Circle::change(char  str)
{
	CCLOG("change begin");
	std::stringstream ss;
	ss << str;
	ss >> _target;

	int num = atoi(_target.c_str());
	CCLOG("num= %d", num);
	auto timeline = CSLoader::createTimeline(_scenePath.at("enemy"));
	auto blastref = _enemyRef1.at(num - 1);
	//blastref->runAction(timeline);
	std::vector<int> angleRef = { 70, 40, 10, -10, -45, -80 };
	_friend->setRotation(angleRef.at(num - 1));
	auto timeline1 = CSLoader::createTimeline("circlehero/punch.csb");
/*	this->runAction(Sequence::create(CallFunc::create([=]() {
		_friend->runAction(timeline1);
		timeline1->gotoFrameAndPlay(0,false);

	}), DelayTime::create(1.0f), CallFunc::create([=]() {
		_friend->setRotation(0.0f);
	//	addEnemy(num);
	}), NULL));*/

	this->runAction(Sequence::create(CallFunc::create([=]() {
		if (num < 4)
		{
			CCLOG("righthand num= %d", num);
			_friend->getChildByName("righthand")->runAction(timeline1);
			timeline1->play("punch", false);
		}
		else
		{
			CCLOG("lefthand num= %d", num);
			_friend->getChildByName("lefthand")->runAction(timeline1);
			timeline1->play("punch", false);
		}

	}), CallFunc::create([=]() {
		blastref->runAction(timeline);
		timeline->play("blast", false);
		
	}), DelayTime::create(2.0f), CallFunc::create([=]() {
	//	_friend->setRotation(0.0f);
		addEnemy(num);
	}), NULL));
	CCLOG("change end");
	CCLOG("out num= %d", num);
}

void Circle::addEnemy(int num)
{
	CCLOG("addEnemy begin");
	CCLOG(" addEnemy num= %d", num);
	auto mouthTimeline = CSLoader::createTimeline(("circlehero/punch.csb"));
	_friend->runAction(mouthTimeline);
//	mouthTimeline->gotoFrameAndPlay(0, true);
	auto blastref = _enemyRef1.at(num - 1);
	this->removeChild(blastref);
	auto enemyadding = CSLoader::createNode(_scenePath.at("enemy"));
	
	this->addChild(enemyadding);
	if (num < 4)
	{
		enemyadding->setPositionX(_enemyRef.at(num - 1)->getPositionX() - 1000);
		enemyadding->setPositionY(_enemyRef.at(num - 1)->getPositionY() - 300);
	}
	else
	{
		enemyadding->setPositionX(_enemyRef.at(num - 1)->getPositionX() + 1000 );
		enemyadding->setPositionY(_enemyRef.at(num - 1)->getPositionY() + 100);
	}
	auto action = MoveTo::create(1.0, Vec2(_enemyRef.at(num - 1)->getPositionX() + extraX, _enemyRef.at(num - 1)->getPositionY()));
	enemyadding->runAction(Sequence::create(action,CallFunc::create([=]() {

		if (_score == 5)
		{
			_friend->setRotation(0.0f);
			auto timeline = CSLoader::createTimeline(("circlehero/punch.csb"));
			_friend->getChildByName("lefthand")->runAction(timeline);
			timeline->play("flex", true);
			auto timeline2 = CSLoader::createTimeline(("circlehero/punch.csb"));
			_friend->getChildByName("righthand")->runAction(timeline2);
			timeline2->play("flex", true);

			this->scheduleOnce(schedule_selector(Circle::scoreBoard), 3.0f);
		}
		else
		{
			wordGenerateWithOptions();
		}
		
	}), NULL));
	auto timeline = CSLoader::createTimeline(_scenePath.at("enemy"));
	//auto blastref = _enemyRef1.at(num - 1);

	enemyadding->runAction(timeline);
	timeline->play("meteorfloat", false);
	CCLOG("addEnemy end");
}

void Circle::topping(char  str)
{
	std::stringstream ss;
	ss << str;
	ss >> _target;
	int num = atoi(_target.c_str());
	_candyRef = { "lollipop" ,"cherry", "candy", "strawberry", "chocolate" , "cookie" };
	auto path = "circlecandy/"+ _candyRef.at(num - 1) + ".csb";
	cocos2d::Node * candyMove = CSLoader::createNode(path);
	candyMove->setPositionX(background->getChildByName(_candyRef.at(num - 1))->getPositionX());
	candyMove->setPositionY(background->getChildByName(_candyRef.at(num - 1))->getPositionY());
	this->addChild(candyMove);
	candyMove->setScale(0.3);
	std::vector<std::string> dotRef = {"dot_43_1","dot_43_1_0","dot_43_1_0_0","dot_43_1_0_0_0","dot_43_1_0_0_0_0","dot_43_1_0_0_0_0_0"};
	auto action = JumpTo::create(1.0, Vec2(background->getChildByName(dotRef.at(_score - 1))->getPositionX()+extraX, background->getChildByName(dotRef.at(_score - 1))->getPositionY()),500,1);
	//candyMove->runAction(action);
	auto callbackStart = CallFunc::create(CC_CALLBACK_0(Circle::puff, this));
	auto seq = Sequence::create(action,callbackStart, NULL);
	candyMove->runAction(seq);
	
	
}
void Circle::puff()
{
	auto puff = CSLoader::createNode("circlecandy/puff.csb");
	puff->setPosition(background->getChildByName("cake")->getPositionX(), background->getChildByName("cake")->getPositionY());
	this->addChild(puff);
	auto timeline = CSLoader::createTimeline("circlecandy/puff.csb");
	puff->runAction(timeline);
	timeline->play("puff", false);
	if (_score == 6)
	{
		this->scheduleOnce(schedule_selector(Circle::bigpuff), 1.5f);
	}
	else
	{
		wordGenerateWithOptions();
	}
	

}
void Circle::scoreBoard(float dt)
{
	CCLOG("scoreBoard begin");
	//menu->showScore();
	menu->showAnswer("wordPairs", _header);
	CCLOG("scoreBoard end");
}
void Circle::bigpuff(float dt)
{
	if (_scenePath.at("animation_select").compare("three") == 0)
	{
		CCLOG("bigpuff");
		auto bigpuff = CSLoader::createNode("circlecandy/bigpuff.csb");
		bigpuff->setPosition(background->getChildByName("cake")->getPositionX(), background->getChildByName("cake")->getPositionY());
		this->addChild(bigpuff, 1);
		auto timeline = CSLoader::createTimeline("circlecandy/bigpuff.csb");
		bigpuff->runAction(timeline);
		timeline->play("bigpuff", false);

		auto cakeRef = CSLoader::createNode("circlecandy/cake.csb");
		cakeRef->setPosition(background->getChildByName("cake")->getPositionX() + extraX, background->getChildByName("cake")->getPositionY() + 80);
		this->addChild(cakeRef);
		//cakeRef->setAnchorPoint(Vec2(1, 1));
		auto cake = CSLoader::createTimeline("circlecandy/cake.csb");
		cakeRef->runAction(cake);
		timeline->play("cake2", false);
		this->scheduleOnce(schedule_selector(Circle::scoreBoard), 2.0f);
	}
	if (_scenePath.at("animation_select").compare("two") == 0)
	{
		/*auto timeline = CSLoader::createTimeline("circle/correct.csb");
		_friend->runAction(timeline);
		timeline->gotoFrameAndPlay(0, false);
		this->scheduleOnce(schedule_selector(Circle::scoreBoard), 4.0f);*/
	}
}
void Circle::wordGenerateWithOptions()
{
	CCLOG("wordGenerateWithOptions begin");
	if (_helpFlage) {
		this->removeChildByName("helpLayer");
		_helpFlage = false;
	}
	std::vector<std::string> answer;
	Size visibleSize = Director::getInstance()->getVisibleSize();
	int size = _mapKey.size();
	_gameWord = _mapKey.at(cocos2d::RandomHelper::random_int(0, size - 1));
	answer.push_back(_synonyms.at(_gameWord));
	//_sentence = LangUtil::getInstance()->translateString(_title);

	std::ostringstream boardName;
	boardName << _title << _gameWord;
	_topLabel = CommonLabel::createWithTTF(boardName.str(), "fonts/Roboto-Regular.ttf", 100);
	_topLabel->setColor(Color3B(0, 0, 0));
	if (_scenePath.at("animation_select").compare("one") == 0)
	{
        _topLabel->setPositionX(visibleSize.width / 2 );
		_topLabel->setPositionY(visibleSize.height - _topLabel->getContentSize().height );
	}
	else if (_scenePath.at("animation_select").compare("three") == 0)
	{
		_topLabel->setPositionX(visibleSize.width / 2   );
		_topLabel->setPositionY(visibleSize.height - _topLabel->getContentSize().height);
	}
	else
	{
		_topLabel->setPositionX(visibleSize.width / 2 + 40);
		_topLabel->setPositionY(visibleSize.height - _topLabel->getContentSize().height);
    }
	this->addChild(_topLabel,2);

	int randomInt1 = cocos2d::RandomHelper::random_int(0, size - 1);
	for (int j = 0; j < 5; j++) {
		auto str = _synonyms.at(_mapKey.at(randomInt1 % size));
		if (_synonyms.at(_gameWord).compare(str) == 0) {
			randomInt1++;
			answer.push_back(_synonyms.at(_mapKey.at(randomInt1 % size)));
		}
		else {
			answer.push_back(str);
		}
		randomInt1++;
	}
	int answerSize = answer.size() - 1;
	//CCLOG(answer);
	int randomInt = cocos2d::RandomHelper::random_int(0, answerSize);
	for (int i = 0; i < _enemyRef.size(); i++) {

		auto str = answer.at(randomInt % (answerSize + 1));
		auto myLabel = CommonLabel::createWithTTF(str, "fonts/Roboto-Regular.ttf", 100);
		std::stringstream ss;
		ss << (i+1);
		std::string str1 = ss.str();
	//	myLabel->setPositionX(_enemyRef1.at(i)->getContentSize().width/2);
	//	myLabel->setPositionY(_enemyRef1.at(i)->getContentSize().height/ 2);

		myLabel->setPositionX(_enemyRef.at(i)->getPositionX() + extraX);
		myLabel->setPositionY(_enemyRef.at(i)->getPositionY());
		
		//myLabel->setColor(Color3B(0, 0, 0));
		myLabel->setName(str+str1);
		_answers.push_back(str + str1);
		this->addChild(myLabel,1);
		_choiceLabel.pushBack(myLabel);
		auto listener = EventListenerTouchOneByOne::create();
		listener->setSwallowTouches(true);
		listener->onTouchBegan = CC_CALLBACK_2(Circle::onTouchBegan, this);
		_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, myLabel);
		randomInt++;
	}
	auto x = menu->getCurrentLevel();
	if (menu->getCurrentLevel() == 1 && _score == 0) {
		gameHelp();
	}
	CCLOG("wordGenerateWithOptions end");
}

bool Circle::onTouchBegan(cocos2d::Touch * touch, cocos2d::Event * event)
{
	Size visibleSize = Director::getInstance()->getVisibleSize();

	auto target = event->getCurrentTarget();
	auto  location = target->convertToNodeSpace(touch->getLocation());
	//auto  location = target->convertToNodeSpace(touch->getLocation() - ;
	if (target->getBoundingBox().containsPoint(Vec2(touch->getLocation().x , touch->getLocation().y)))
	{
		std::string wordStr = target->getName();
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
		CCLOG("ssss= %c", ssss);
		if (wordStr.compare(_synonyms.at(_gameWord)+" ") == 0) {
			//    CCLOG("11111111111111111");
			this->removeChild(_topLabel);
			for (int i = 0; i < _choiceLabel.size(); i++) {
				this->removeChild(_choiceLabel.at(i));
				}
		//	_eventDispatcher->removeEventListenersForTarget(target);
			_choiceLabel.clear();
			menu->wordPairList(_gameWord, _synonyms.at(_gameWord));
			if (_scenePath.at("animation_select").compare("one") == 0)
			{
				CCLOG("addpoints begin");
				_score++;
				menu->addPoints(1);
				auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
				audio->playEffect("sounds/sfx/success.ogg", false);
				change(ssss);
				CCLOG("addpoints end");
			}
			else if (_scenePath.at("animation_select").compare("two") == 0)
			{
				_score++;
				menu->addPoints(1);
				auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
				audio->playEffect("sounds/sfx/success.ogg", false);
				eat(ssss);
			}
			else
			{ 
				_score++;
				menu->addPoints(1);
				auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
				audio->playEffect("sounds/sfx/success.ogg", false);
				topping(ssss);
				
			}
			
			
		}
		else
		{
			CCLOG("shake begin");
			auto audio1 = CocosDenshion::SimpleAudioEngine::getInstance();
			audio1->playEffect("sounds/sfx/error.ogg", false);
			menu->addPoints(-1);
			FShake* shake = FShake::actionWithDuration(1.0f, 10.0f);
			_friend->runAction(shake);
			CCLOG("shake ends");
		}
		return true;
	}
	return false;
}
