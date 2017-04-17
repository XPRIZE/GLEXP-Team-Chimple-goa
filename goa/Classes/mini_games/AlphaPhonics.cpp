#include "AlphaPhonics.h"
#include "../menu/HelpLayer.h"
#include "../util/CommonLabelTTF.h"

USING_NS_CC;

Scene* AlphaPhonics::createScene()
{
	auto scene = Scene::create();
	auto layer = AlphaPhonics::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, AlphaPhonics::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

AlphaPhonics *AlphaPhonics::create() {
	AlphaPhonics *blast = new (std::nothrow) AlphaPhonics();
	if (blast && blast->init()) {
		blast->autorelease();
		return blast;
	}
	CC_SAFE_DELETE(blast);
	return nullptr;
}

bool AlphaPhonics::init()
{
	if (!Layer::init()) { return false; }

	return true;
}

void AlphaPhonics::onEnterTransitionDidFinish() {

	Node* bg = CSLoader::createNode("alphaphonics/alphaphonics.csb");
	addChild(bg);
	bg->setName("bg");
	if (Director::getInstance()->getVisibleSize().width > 2560) {
		auto myGameWidth = (Director::getInstance()->getVisibleSize().width - 2560) / 2;
		bg->setPositionX(myGameWidth);
	}
	
	_optionValue = getRandomValueRange(1, 4, 4);
	LiftAnimationHandler(_optionValue[liftOpenChoice]);
		
	auto parentOption = this->getChildByName("bg")->getChildByName("FileNode_2");
	
	auto upperLetter = TextGenerator::getInstance()->getAllChars();
	std::ostringstream boardDisplay;
	boardDisplay << (char)tolower(upperLetter[_menuContext->getCurrentLevel()-1][0])<<" "<< upperLetter[_menuContext->getCurrentLevel() - 1];
	
	auto boardText = CommonLabelTTF::create(TextGenerator::getInstance()->translateString(boardDisplay.str()), "Helvetica", parentOption->getChildByName("board")->getContentSize().height * 0.5);
	boardText->setPosition(parentOption->getChildByName("board")->getContentSize().width / 2, parentOption->getChildByName("board")->getContentSize().height / 2);
	parentOption->getChildByName("board")->addChild(boardText);
	boardText->setName("board");

	createOptions();

	vector<pair<string, string>> resuffleVector;
	for (int i = 0; i < 4; i++) {
		resuffleVector.push_back(_optionsMap[_optionSelection++]);
	}
	std::random_shuffle(resuffleVector.begin(), resuffleVector.end());

	_optionSprite.push_back(createSprite(resuffleVector[0],1,parentOption->getChildByName("option1")->getContentSize(), parentOption->getChildByName("option1")->getPosition()));
	_optionSprite.push_back(createSprite(resuffleVector[1],2, parentOption->getChildByName("option2")->getContentSize(), parentOption->getChildByName("option2")->getPosition()));
	_optionSprite.push_back(createSprite(resuffleVector[2],3,parentOption->getChildByName("option3")->getContentSize(), parentOption->getChildByName("option3")->getPosition()));
	_optionSprite.push_back(createSprite(resuffleVector[3],4, parentOption->getChildByName("option4")->getContentSize(), parentOption->getChildByName("option4")->getPosition()));

	this->scheduleUpdate();
}

void AlphaPhonics::update(float delta) {

}

void AlphaPhonics::OptionListner(Sprite *option) {
	auto classRefer = this;
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(false);

	listener->onTouchBegan = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		Size targetSize = target->getContentSize();
		auto location = target->convertToNodeSpace(touch->getLocation());
		Rect targetRect = Rect(0, 0, targetSize.width, targetSize.height);
		if (target->getBoundingBox().containsPoint(touch->getLocation()) && touchOption) {
			classRefer->currentOptionPosition = target->getTag();
			target->setScale(1.3);
			touchOption = false;
			return true;
		}
		return false;
	};

	listener->onTouchMoved = [=](cocos2d::Touch* touch, cocos2d::Event* event) {
		auto classReference = this;
		auto target = event->getCurrentTarget();
		target->setPosition(touch->getLocation());
		return true;

	};

	listener->onTouchEnded = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		auto parentOption = this->getChildByName("bg")->getChildByName("FileNode_2");
		
		auto setTouchPermission = CallFunc::create([=]() {
			touchOption = true;
		});
		
		auto setTagOfCorrectObj = CallFunc::create([=]() {
			
			classRefer->OptionChangeAnimation(target->getTag());
			target->setTag(0);
			target->pause();
			if (liftOpenChoice < 3) {
				LiftAnimationHandler(_optionValue[++liftOpenChoice]);
			}
			else {
				//_menuContext->setMaxPoints(classReference->counterHit);
				++liftOpenChoice;
				classRefer->runAction(Sequence::create(DelayTime::create(2),CallFunc::create([=]() {_menuContext->showScore(); }), NULL));
			}
		});

		auto elevatorObj = parentOption->getChildByName(StringandIntConcat("elevator", _optionValue[liftOpenChoice]));
		if (target->getBoundingBox().intersectsRect(elevatorObj->getBoundingBox())&& DataCorrectOrNot((Sprite*)target)) {

			target->runAction(Sequence::create(MoveTo::create(0.1, Vec2(elevatorObj->getPosition())), setTagOfCorrectObj, NULL));
		}
		else {		
			if (target->getTag() == 1) {
				target->runAction(Sequence::create(MoveTo::create(0.6, Vec2(parentOption->getChildByName("option1")->getPosition())), setTouchPermission, NULL));
			}
			else if (target->getTag() == 2) {
				target->runAction(Sequence::create(MoveTo::create(0.6, Vec2(parentOption->getChildByName("option2")->getPosition())), setTouchPermission, NULL));
			}
			else if (target->getTag() == 3) {
				target->runAction(Sequence::create(MoveTo::create(0.6, Vec2(parentOption->getChildByName("option3")->getPosition())), setTouchPermission, NULL));
			}
			else if (target->getTag() == 4) {
				target->runAction(Sequence::create(MoveTo::create(0.6, Vec2(parentOption->getChildByName("option4")->getPosition())), setTouchPermission, NULL));
			}
			target->setScale(1);
		}

	};

	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, option);
}

string AlphaPhonics::StringandIntConcat(string data,int number) {
	
	std::ostringstream value;
	value << data << number;
	return value.str();
}

void AlphaPhonics::LiftAnimationPlay(string elevatorName,string animationName)
{
	auto timelineLift = CSLoader::createTimeline("alphaphonics/elevator.csb");
	auto lift = this->getChildByName("bg")->getChildByName("FileNode_2")->getChildByName(elevatorName);
	lift->runAction(timelineLift);
	timelineLift->play(animationName, false);
}

void AlphaPhonics::LiftAnimationHandler(int elevatorNo) {
	auto liftUp = CallFunc::create([=]() {
		touchOption = false;
		LiftAnimationPlay(StringandIntConcat("elevator", elevatorNo), "liftup");
	});

	auto liftOpen = CallFunc::create([=]() {
		touchOption = true;
		LiftAnimationPlay(StringandIntConcat("elevator", elevatorNo), "dooropen");
	});

	this->runAction(Sequence::create(liftUp, DelayTime::create(2), liftOpen, NULL));

}

bool AlphaPhonics::DataCorrectOrNot(Sprite* option) {

	auto parentOption = this->getChildByName("bg")->getChildByName("FileNode_2");
	CommonLabelTTF *ttfBoard = (CommonLabelTTF*)parentOption->getChildByName("board")->getChildByName("board");
	auto boardText = ttfBoard->getString();

	string optionText = option->getName();

	if (boardText[0] == optionText[0]) {
		return true;
	}
	return false;
}

void AlphaPhonics::OptionChangeAnimation(int optionNumber) {
	auto parentOption = this->getChildByName("bg")->getChildByName("FileNode_2");
	vector<Sprite*> options;

	for (int i = 1; i <= 4; i++) {
			if (i != optionNumber) {
			auto optionObj = (Sprite*)this->getChildByName(_optionSprite[i-1]->getName());
			options.push_back(optionObj);
		}
	}

	for (int i = 0; i < options.size(); i++) {
		options[i]->runAction(RotateBy::create(1.5f, 360.0f));
		options[i]->runAction(ScaleTo::create(1.5f, 0.0f));
	}

	if(liftOpenChoice < 4)
	this->runAction(Sequence::create(DelayTime::create(1.6), CallFunc::create([=]() {
		for(int i = 0 ; i < options.size() ; i++)
			this->removeChild(options[i]);
		_optionSprite.clear();
		if(liftOpenChoice < 4)
		RecreateOptions();
	}), NULL));
}

vector<int> AlphaPhonics::getRandomValueRange(int min, int max, int getValue) {
	int count = 0;
	vector<int> objectVector;
	while (count < getValue) {
		int temp = RandomHelper::random_int(min, max);
		bool flag = true;

		for (size_t index = 0; index < objectVector.size(); index++) {
			if (objectVector[index] == temp) {
				flag = false;
				break;
			}
		}

		if (flag) {
			objectVector.push_back(temp);
			count++;
		}
	}

//	sort(objectVector.begin(), objectVector.end());
	return objectVector;
}

void AlphaPhonics::RecreateOptions() {
	auto parentOption = this->getChildByName("bg")->getChildByName("FileNode_2");
	vector<pair<string, string>> resuffleVector;
	for (int i = 0; i < 4; i++) {
		resuffleVector.push_back(_optionsMap[_optionSelection++]);
	}

	std::random_shuffle(resuffleVector.begin(), resuffleVector.end());

	_optionSprite.push_back(createSprite(resuffleVector[0], 1, parentOption->getChildByName("option1")->getContentSize(), parentOption->getChildByName("option1")->getPosition()));
	_optionSprite.push_back(createSprite(resuffleVector[1], 2, parentOption->getChildByName("option2")->getContentSize(), parentOption->getChildByName("option2")->getPosition()));
	_optionSprite.push_back(createSprite(resuffleVector[2], 3, parentOption->getChildByName("option3")->getContentSize(), parentOption->getChildByName("option3")->getPosition()));
	_optionSprite.push_back(createSprite(resuffleVector[3], 4, parentOption->getChildByName("option4")->getContentSize(), parentOption->getChildByName("option4")->getPosition()));
	resuffleVector.clear();
}

Sprite* AlphaPhonics::createSprite(pair<string, string> data, int currentOptionPosition,Size size,Vec2 position) {
	auto sprite = Sprite::create(data.second);
	sprite->setPosition(Vec2(position.x,position.y));
	sprite->setTag(currentOptionPosition);
	sprite->setName(data.first);
	addChild(sprite);
	OptionListner(sprite);
	return sprite;
}

void AlphaPhonics::createOptions() {

	auto upperLetter = TextGenerator::getInstance()->getAllChars();
	std::ostringstream boardDisplay;
	boardDisplay << (char)tolower(upperLetter[_menuContext->getCurrentLevel() - 1][0]);
	auto currentLetter = boardDisplay.str();

	auto b = TextGenerator::getInstance()->getWordsForInitial(_menuContext->getCurrentLevel(), 4);
	auto c = TextGenerator::getInstance()->getWordsNotForInitial(_menuContext->getCurrentLevel(), 12);

	std::map<std::string, std::string> newMapping;

	newMapping.insert(b.begin(), b.end());
	newMapping.insert(c.begin(), c.end());

	vector<pair<string, string>> optionsMap;
	for (std::map<std::string, std::string>::iterator it = newMapping.begin(); it != newMapping.end(); ++it) {
		auto pairs = std::make_pair(it->first, it->second);
		optionsMap.push_back(pairs);
	}

	bool flagAlphabetsCheck = true;

	for (size_t i = 0; i < 4; i++) {

		flagAlphabetsCheck = true;
		int counter = 0;

		for (int index = 0; index < optionsMap.size(); index++) {
			auto it = optionsMap[index];
			auto data = it.first;
			if (it.first[0] == currentLetter[0] && flagAlphabetsCheck) {
				flagAlphabetsCheck = false;
				_optionsMap.push_back(it);
				data = string("#") + data;
				optionsMap[index].first = data;
				counter++;
			}
			else if (it.first[0] != currentLetter[0] && it.first[0] != '#') {
				_optionsMap.push_back(it);
				data = string("#") + data;
				optionsMap[index].first = data;
				counter++;
			}
			if (counter >= 4)
				break;
		}
	}
}

AlphaPhonics::~AlphaPhonics(void)
{
	this->removeAllChildrenWithCleanup(true);
}
