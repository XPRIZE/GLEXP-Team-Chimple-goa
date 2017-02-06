#include "Pop.h"
#include "../menu/HelpLayer.h"
#include <math.h> 
#include "../util/CommonLabelTTF.h"
#include "../lang/LangUtil.h"
#define COCOS2D_DEBUG 1

USING_NS_CC;

Scene* Pop::createScene()
{
	auto scene = Scene::create();
	auto layer = Pop::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, Pop::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

void Pop::onEnterTransitionDidFinish()
{
	CCSpriteFrameCache* framecache1 = CCSpriteFrameCache::sharedSpriteFrameCache();
	framecache1->addSpriteFramesWithFile("pop/pop.plist");

	int gameCurrentLevel = _menuContext->getCurrentLevel();

	std::pair<int, int> levelKeyNumber = levelAllInfo(gameCurrentLevel, 4, 2, 8, 6);
	
	Node* popBackground;
	float multiplyFactor;
	if (levelKeyNumber.first == 0)
	{
		popBackground = CSLoader::createNode("pop/pop.csb");
		multiplyFactor = 0.68;
	}
	else
	{
		popBackground = CSLoader::createNode("pop/pop2.csb");
		multiplyFactor = 0.73;
	}

	 this->addChild(popBackground, 0);
	 popBackground->setName("bg");

	 if (visibleSize.width > 2560) {
		 auto myGameWidth = (visibleSize.width - 2560) / 2;
		 popBackground->setPositionX(myGameWidth);
	 }

	 int catagoryMap[] = {9, 4, 5, 6, 7, 8};

	 auto catagoryLevel = catagoryMap[levelKeyNumber.second];
	 CCLOG("catagoryLevel: " + catagoryLevel);
	 std::string wordForSentanceArray = TextGenerator::getInstance()->generateASentence(catagoryLevel);
	 int length = wordForSentanceArray.length();
	 auto sentanceBin = convertSentenceIntoWords(wordForSentanceArray);
	// _menuContext->setMaxPoints(vect.length()*1);

	 cocostudio::timeline::ActionTimeline* timeline = CSLoader::createTimeline("pop/plane.csb");
	 Sprite* plane = (Sprite *)CSLoader::createNode("pop/plane.csb");
	 this->addChild(plane, 0);
	 plane->runAction(timeline);
	 timeline->play("planerun", true);
	 plane->setName("plane");
	 plane->setPosition(Vec2(visibleSize.width + 200, visibleSize.height*multiplyFactor));


	 auto label = CommonLabelTTF::create(wordForSentanceArray, "Helvetica", 90);
	 label->setPosition(Vec2(visibleSize.width/2, visibleSize.height*0.93));
	 label->setColor(cocos2d::Color3B(255, 255, 255));
	 label->setName("displaySentance");
	 this->addChild(label, 0);

	 auto labelAction_1 = ScaleTo::create(3,1.1);
	 auto labelAction_2 = ScaleTo::create(3,1);

	 label->runAction(Sequence::create(labelAction_1, labelAction_2, NULL));
	
	 std::vector<int> randomNumbers;

	 while ( randomNumbers.size() != sentanceBin.size()) {
		 bool duplicateCheck = true;
		 int numberPicker = RandomHelper::random_int(1, 12);
		 for (int i = 0; i < randomNumbers.size(); i++) {
			 if (numberPicker == randomNumbers[i])
				 duplicateCheck = false;
		 }
		 if (duplicateCheck)
			 randomNumbers.push_back(numberPicker);
	 }

	     auto x = 0.7;
		 auto y = 0;

	 for (int i = 0; i < sentanceBin.size(); i++) {
		 Sprite* cloud = Sprite::createWithSpriteFrameName("pop/cloud.png");
		 //cloud->setName("cloud_" + (i + 1));
		 this->addChild(cloud); 
		 _cloudContainer.push_back(cloud);
		 cloud->setTag(y);
		 y++;

		 if (randomNumbers[i] >= 1 && randomNumbers[i] <= 4) {
			 _cloudXPos.push_back((visibleSize.width / 4) * (randomNumbers[i] - 1) + 315);
			 auto yPos = visibleSize.height * 0.71;
			 cloud->setPosition(visibleSize.width + 300, yPos);
		 }

		 else if (randomNumbers[i] >= 5 && randomNumbers[i] <= 8) {
			 _cloudXPos.push_back((visibleSize.width / 4) * (randomNumbers[i] - 5) + 405);
			 auto yPos = (visibleSize.height * 0.71) - (cloud->getContentSize().height+ 30);
			 cloud->setPosition(visibleSize.width + 300, yPos);
		 }

		 else if (randomNumbers[i] >= 9 && randomNumbers[i] <= 12) {
			 _cloudXPos.push_back((visibleSize.width / 4) * (randomNumbers[i] - 9) + 255);
			 auto yPos = (visibleSize.height * 0.71) - (cloud->getContentSize().height * 2 + 60);
			 cloud->setPosition(visibleSize.width + 300, yPos);
		 }

		 auto label = CommonLabelTTF::create(sentanceBin[i], "Helvetica", 80);
		 label->setPosition(Vec2(cloud->getContentSize().width/2, cloud->getContentSize().height/2));
		 label->setColor(cocos2d::Color3B(229, 78, 78));
		 label->setName(sentanceBin[i]);
		 cloud->addChild(label, 0);
		 addEvents(cloud);
		
		 _stringContainer.push_back(sentanceBin[i]);
	 }

	 auto textRemoval = CallFunc::create([=] {
		this->removeChildByName("displaySentance");
	 });

	 auto cloudMotion = CallFunc::create([=] {
		 for (int l = 0; l < sentanceBin.size(); l++)
		 {
			 auto time = RandomHelper::random_int(9,11);
			 auto sequence_A = MoveTo::create(time, Vec2(_cloudXPos[l], _cloudContainer[l]->getPositionY()));
			 EaseBackOut *easeAction = EaseBackOut::create(sequence_A);
			 _cloudContainer[l]->runAction(easeAction);
		 }
	 });

	
	 auto helpLayer = CallFunc::create([=]
	 {
		 if (gameCurrentLevel == 1) {
			 Sprite* obj = _cloudContainer[0];
			 _help = HelpLayer::create(Rect(obj->getPositionX(), obj->getPositionY(), _cloudContainer[0]->getContentSize().width, _cloudContainer[0]->getContentSize().height),
				 Rect( visibleSize.width*0.5, visibleSize.height*.93, 0, 0));
			 _help->click(Vec2(obj->getPositionX(), obj->getPositionY()));
			 this->addChild(_help, 5);

			 _helpFlag = true;
		 }
	 });

	 auto planeMotion = CallFunc::create([=] {
		 
		 auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
		 audio->playEffect("res/sounds/sfx/pop_helicopter.ogg", false);
		 plane->runAction(MoveTo::create(5, Vec2(-220, visibleSize.height*multiplyFactor)));
	 });

	 auto isClickReady = CallFunc::create([=] {
		 _clickableFlag = true;
	 });

	 this->runAction(Sequence::create(DelayTime::create(6), textRemoval, planeMotion, DelayTime::create(1.7), cloudMotion, DelayTime::create(10), helpLayer, DelayTime::create(0.7), isClickReady, NULL));

	 this->scheduleUpdate();
}
Pop::~Pop()
{

}

void Pop::update(float dt)
{

}

void Pop::addEvents(Sprite* clickedObject)
{
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(false);

	listener->onTouchBegan = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		Point locationInNode = target->convertToNodeSpace(touch->getLocation());
		Size s = target->getContentSize();
		Rect rect = Rect(0, 0, s.width, s.height);
		if (rect.containsPoint(locationInNode) )
		{
			if (_clickableFlag)
			{
				if (_menuContext->getCurrentLevel() == 1 && _helpFlag)
				{
					_helpFlag = false;
					this->removeChild(_help);
				}
				setWordInRightOrder(target);
			}

			return true;
		}
	
		return false;
	};
	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener, clickedObject);
}

void Pop::setWordInRightOrder(Node* wordObj)
{
	auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
	if (_wordInOrder.size() == 0)
	{
		if (!wordObj->getChildren().at(0)->getName().compare(_stringContainer[_wordInOrder.size()]))
		{
			 makeSentance(wordObj);
			_menuContext->addPoints(1);
			audio->playEffect("sounds/sfx/success.ogg", false);
			CCLOG("MATCHED");
		}
		else
		{
			 cloudShake(wordObj);
			 audio->playEffect("sounds/sfx/error.ogg", false);
			_menuContext->addPoints(-1);
		}
	}
	else if (_wordInOrder.size() != 0)
	{
		if (!wordObj->getChildren().at(0)->getName().compare(_stringContainer[_wordInOrder.size()]))
		{
		 	 makeSentance(wordObj);
			_menuContext->addPoints(1);
			audio->playEffect("sounds/sfx/success.ogg", false);
		}
		else
		{
			cloudShake(wordObj);
			audio->playEffect("sounds/sfx/error.ogg", false);
			_menuContext->addPoints(-1);
		}

	}

}

void Pop::makeSentance(Node* clickedObj)
{
	if (_wordInOrder.size() == 0)
	{
		_correctSentance = CommonLabelTTF::create(clickedObj->getChildren().at(0)->getName(), "Helvetica", 80);
		_correctSentance->setPosition(Vec2(visibleSize.width / 2, visibleSize.height*0.93));
		_correctSentance->setColor(cocos2d::Color3B(255, 255, 255));
		this->addChild(_correctSentance, 0);

		_wordInOrder.push_back(clickedObj->getChildren().at(0)->getName());
		this->removeChild(clickedObj);
	}
	else
	{
		_wordInOrder.push_back(clickedObj->getChildren().at(0)->getName());
		_correctSentance->setString(_correctSentance->getString() + " " + clickedObj->getChildren().at(0)->getName());
	   	this->removeChild(clickedObj);
	}
	removePlaneFromScene();
}
void Pop::cloudShake(Node* sprite)
{
	auto act_1 = MoveBy::create(0.1, Vec2(10, 0));
	auto act_2 = MoveBy::create(0.1, Vec2(0, -10));
	auto act_3 = MoveBy::create(0.1, Vec2(0, 10));
	auto act_4 = MoveBy::create(0.1, Vec2(-10, 0));

	sprite->runAction(Sequence::create(act_1, act_2, act_3, act_4, NULL));

}
void Pop :: removePlaneFromScene()
{
	if (_wordInOrder.size() == _stringContainer.size()) {
		this->removeChildByName("plane");
		this->runAction(Sequence::create(DelayTime::create(1.2), CCCallFunc::create([=] {
		
			_menuContext->showScore();
		
		}), NULL));
	}
}
std::vector<std::string> Pop::convertSentenceIntoWords(std::string sentance)
{
	std::vector<std::string> strWords;
	std::string currentWord;
	for (short i = 0; i<=sentance.length(); i++)
	{ 
		if ((sentance[i] == ' ' && !currentWord.empty()) || (i == sentance.length()))
		{ 
			strWords.push_back(currentWord); 
			currentWord.clear(); 
		} 
		else {
			currentWord += sentance[i];
		}
	}
	return strWords;
}


std::pair<int, int> Pop::levelAllInfo(int currentLevel, int sceneRepetitionNo, int totalScene, int catagoryRepetitionNo, int totalcatagory)
{
	float currentLevelInFloat = static_cast<float>(currentLevel);
	int sceneBaseValue = static_cast<int>(std::ceil(currentLevelInFloat / sceneRepetitionNo));
	int sceneNo = sceneBaseValue % totalScene;

	int catagoryBaseValue = static_cast<int>(std::ceil(currentLevelInFloat / catagoryRepetitionNo));
	int catagoryNo = catagoryBaseValue % totalcatagory;

	return std::make_pair(sceneNo, catagoryNo);
}