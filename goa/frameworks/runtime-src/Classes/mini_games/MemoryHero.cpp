//
//  MemoryHero.cpp
//
//  Created by Jyoti Prakash on 29/09/16.
//
//

#include "MemoryHero.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "SimpleAudioEngine.h"
#include "../lang/LangUtil.h"
#include "../StartMenuScene.h"
#include "../lang/TextGenerator.h"


USING_NS_CC;

//TextGenerator::getInstance()->getSynonyms(9)
//TextGenerator::getInstance()->getAntonyms(9)
//TextGenerator::getInstance()->getHomonyms(9)



MemoryHero::MemoryHero() :
	_currentNest(1),
	_touchActive(false),
	_currentClickedPair(3),
	_currentSelectedNestNames(2),
	_level(0),
	_activeNestIds(25),
	_chickenTimeline(25),
	_wallTimeline(25),
	objects(4, std::vector<struct object>(4)),
	xycoordinates(4, std::vector<struct xy>(4))
{

}

MemoryHero::~MemoryHero() {

}


Scene *MemoryHero::createScene() {

	auto scene = Scene::create();
	auto layer = MemoryHero::create();

	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, MemoryHero::classname());
	scene->addChild(layer->_menuContext);

	return scene;

}

MemoryHero *MemoryHero::create() {

	MemoryHero *memoryHero = new (std::nothrow) MemoryHero();
	if (memoryHero && memoryHero->init()) {
		memoryHero->autorelease();
		return memoryHero;
	}
	CC_SAFE_DELETE(memoryHero);
	return nullptr;

}

bool MemoryHero::init() {


	if (!Layer::init()) {
		return false;
	}

	CCSpriteFrameCache::sharedSpriteFrameCache()->addSpriteFramesWithFile("memoryhero/memoryhero.plist");


	_data = TextGenerator::getInstance()->getAntonyms(12);


	for (std::map<std::string, std::string>::iterator it = _data.begin(); it != _data.end(); ++it) {
		_data_key.push_back(it->first);
	}

	for (std::map<std::string, std::string>::iterator it = _data.begin(); it != _data.end(); ++it) {
		_data_value.push_back(it->second);
	}

	int a = _data.size();
	std::vector<int> randomIndex;

	while (randomIndex.size() != _data.size()) {
		bool duplicateCheck = true;
		int numberPicker = RandomHelper::random_int(0, a - 1);
		for (int i = 0; i < randomIndex.size(); i++) {
			if (numberPicker == randomIndex[i]) {
				duplicateCheck = false;
			}
		}
		if (duplicateCheck) {
			randomIndex.push_back(numberPicker);
		}
	}

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();


	_memoryfarm = CSLoader::createNode("memoryhero/memoryhero.csb");

	_memoryfarm->setPosition(Vec2(visibleSize.width / 2 + origin.x, visibleSize.height / 2 + origin.y));
	_memoryfarm->setAnchorPoint(Vec2(0.5, 0.5));
	addChild(_memoryfarm);

	//_chickenTimelineTemp = CSLoader::createTimeline("memoryfarm/chicken.csb");
	//_memoryfarm->getChildByName("background")->getChildByName("nest1")->getChildByName("chicken")->runAction(_chickenTimelineTemp);
	//_chickenTimelineTemp->play("fly", false);

	int nestsCount = _memoryfarm->getChildByName("mainground")->getChildrenCount();
	int j = 0;
	for (int i = _currentNest; i <= nestsCount; i++) {

		std::ostringstream sstreamc;
		sstreamc << "board" << _currentNest;
		std::string queryc = sstreamc.str();

		_activeNestIds[_currentNest] = _currentNest;
		_memoryfarm->getChildByName("mainground")->getChildByName(queryc)->getChildByName("window")->getChildByName("windowborder")->setAnchorPoint(Vec2(0.5, 0.5));


		_memoryfarm->getChildByName("mainground")->getChildByName(queryc)->getChildByName("window")->getChildByName("windowborder")->setTag(_currentNest);

		std::string labelName;

		_chickenTimeline[i] = CSLoader::createTimeline("memoryhero/window.csb");
		_memoryfarm->getChildByName("mainground")->getChildByName(queryc)->getChildByName("window")->runAction(_chickenTimeline[i]);

		_wallTimeline[i] = CSLoader::createTimeline("memoryhero/wall.csb");
		_memoryfarm->getChildByName("mainground")->getChildByName(queryc)->getChildByName("wall")->runAction(_wallTimeline[i]);


		if (i <= 12) {

			labelName = _data_key[randomIndex[i - 1]];
		}
		else {

			labelName = _data_value[randomIndex[j]];
			j++;
		}


		auto label = ui::Text::create();
		label->setString(labelName);
		label->setFontSize(50);
		label->setFontName("fonts/Marker Felt.ttf");
		label->setPosition(Vec2(30, 20));
		label->setAnchorPoint(Vec2(0, 0));
		label->setColor(Color3B::BLUE);
		label->setName(labelName);


		_memoryfarm->getChildByName("mainground")->getChildByName(queryc)->getChildByName("window")->getChildByName("windowborder")->addChild(label, 0);

		//_memoryfarm->getChildByName("background")->getChildByName(queryc)->getChildByName("egg")->setVisible(true);

//		_memoryfarm->getChildByName("mainground")->getChildByName(queryc)->getChildByName("egg")->setPositionY(105);


		label->setVisible(false);

		setupTouch();
	}


	_nests.resize(24);

	return true;
}

void MemoryHero::startGame() {
	//_menuContext->showStartupHelp(CC_CALLBACK_0(Memory::dummy, this));
	//	runAction(Sequence::create(CallFunc::create(CC_CALLBACK_0(MenuContext::showStartupHelp,_menuContext)), NULL));
}



void MemoryHero::setupTouch() {

	// CCLOG("NEST %d setuptouch done", nestIndex);
	std::ostringstream sstreamc;
	sstreamc << "board" << _currentNest;
	std::string queryc = sstreamc.str();

	auto _nest = _memoryfarm->getChildByName("mainground")->getChildByName(queryc)->getChildByName("window")->getChildByName("windowborder");

	//nestj->setPosition(Vec2(1000,1000));
	//CC_SPRITE_DEBUG_DRAW;
	_nest->setAnchorPoint(Vec2(0.5, 0.5));
	//_nest->setVisible(true);
	CCLOG("nest xpos : %f", _nest->getPosition().x);
	CCLOG("nest ypos : %f", _nest->getPosition().y);
	CCLOG("nest anchor : %f  :   %f ", _nest->getAnchorPoint().x, _nest->getAnchorPoint().y);
	//nestj->getChildByName("chicken")->setVisible(false);
	//nestj->setPosition(Vec2(500, 500));
	//auto nest = _nest->getChildByName("nestfront");
	auto listener = EventListenerTouchOneByOne::create();
	listener->onTouchBegan = CC_CALLBACK_2(MemoryHero::onTouchBegan, this);
	listener->onTouchEnded = CC_CALLBACK_2(MemoryHero::onTouchEnded, this);
	listener->onTouchMoved = CC_CALLBACK_2(MemoryHero::onTouchMoved, this);
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, _nest);
	_currentNest++;

}


bool MemoryHero::onTouchBegan(Touch* touch, Event* event) {


	auto target = event->getCurrentTarget();
	Point locationInNode = target->getParent()->convertToNodeSpace(touch->getLocation());

	//Size s = target->getContentSize();
	//Rect rect = Rect(0, 0, s.width, s.height);
	static int counter = 0;

	auto bb = target->getBoundingBox();

	if (target->getBoundingBox().containsPoint(locationInNode))
	{

		//CCLOG("NEST CLICKED : %d ", counter++);
		if (counter < 2) {

			std::ostringstream sstreamc;
			sstreamc << "board" << target->getTag();
			std::string queryc = sstreamc.str();

			auto child = target->getChildren();
			std::string childName = child.at(0)->getName();

			_currentSelectedNestNames[counter] = childName;
			//target->getChildByName("Chimple")->setVisible(true);
			auto pauseCurrentTarget = _memoryfarm->getChildByName("mainground")->getChildByName(queryc)->getChildByName("window")->getChildByName("windowborder");

			_memoryfarm->getChildByName("mainground")->getChildByName(queryc)->getChildByName("window")->getChildByName("windowborder")->getChildByName(childName)->setVisible(true);

			Director::getInstance()->getEventDispatcher()->pauseEventListenersForTarget(pauseCurrentTarget);



			_currentClickedPair[counter] = target->getTag();

			_chickenTimeline[_currentClickedPair[counter]]->play("dooropen", false);


			bool flag;
			if (counter == 1) {

				//pause listener on all nests which have non zero values
				pauseAllActiveListeners();
				flag = checkMatch();

				if (flag == true) {

					//make the hen fly

					auto flycallfunc = CallFunc::create([=] {chickenFly(); });

					auto removelistenercallfunc = CallFunc::create([=] {

						removecurrentlabelsandlisteners();
						_activeNestIds[_currentClickedPair[0]] = 0;
						_activeNestIds[_currentClickedPair[1]] = 0;
					});

					auto resumeListenercallfunc = CallFunc::create([=] {

						resumeAllActiveListeners();
					});


					auto completeSequence = Sequence::create(flycallfunc, DelayTime::create(2.0), removelistenercallfunc, resumeListenercallfunc, NULL);

					this->runAction(completeSequence);



				}
				else {

					//if they doesnot matches resume the listener of current two selected nest



					auto resumelistenercallfunc = CallFunc::create([=] {

						std::ostringstream sstreamc;
						sstreamc << "board" << _currentClickedPair[0];
						std::string queryc = sstreamc.str();

						auto pauseNode1 = _memoryfarm->getChildByName("mainground")->getChildByName(queryc)->getChildByName("window")->getChildByName("windowborder");

						Director::getInstance()->getEventDispatcher()->resumeEventListenersForTarget(pauseNode1);


						std::ostringstream sstreamd;
						sstreamd << "board" << _currentClickedPair[1];
						std::string queryd = sstreamd.str();

						auto pauseNode2 = _memoryfarm->getChildByName("mainground")->getChildByName(queryd)->getChildByName("window")->getChildByName("windowborder");

						Director::getInstance()->getEventDispatcher()->resumeEventListenersForTarget(pauseNode2);

						resumeAllActiveListeners();

					});

					auto makeChickenSit = CallFunc::create([=] {

						_chickenTimeline[_currentClickedPair[0]]->play("doorclose", false);
						_chickenTimeline[_currentClickedPair[1]]->play("doorclose", false);

					});

					auto setspritesinvisiblefunc = CallFunc::create([=] {

						std::ostringstream sstreamc;
						sstreamc << "board" << _currentClickedPair[0];
						std::string queryc = sstreamc.str();

						_memoryfarm->getChildByName("mainground")->getChildByName(queryc)->getChildByName("window")->getChildByName("windowborder")->getChildByName(_currentSelectedNestNames[0])->setVisible(false);


						std::ostringstream sstreamd;
						sstreamd << "board" << _currentClickedPair[1];
						std::string queryd = sstreamd.str();


						_memoryfarm->getChildByName("mainground")->getChildByName(queryd)->getChildByName("window")->getChildByName("windowborder")->getChildByName(_currentSelectedNestNames[1])->setVisible(false);

					});

					auto wrongSequence = Sequence::create(DelayTime::create(1.0), makeChickenSit, setspritesinvisiblefunc, resumelistenercallfunc, NULL);

					this->runAction(wrongSequence);


				}

				counter = -1;
			}

		}
		counter++;

		return true; // to indicate that we have consumed it.
	}

	return false; // we did not consume this event, pass thru.
}

void MemoryHero::onTouchEnded(cocos2d::Touch *touch, cocos2d::Event *event) {
	//    CCLOG("onTouchEnded");

	auto target = event->getCurrentTarget();
	Point locationInNode = target->getParent()->convertToNodeSpace(touch->getLocation());


}

void MemoryHero::onTouchMoved(cocos2d::Touch *touch, cocos2d::Event *event) {
	//    CCLOG("onTouchMoved");

}


void MemoryHero::hideAll() {

	int nestsCount = _memoryfarm->getChildByName("mainground")->getChildrenCount();
	for (int i = 1; i <= nestsCount; i++) {


		std::ostringstream sstreamc;
		sstreamc << "board" << i;
		std::string queryc = sstreamc.str();


		_memoryfarm->getChildByName("mainground")->getChildByName(queryc)->getChildByName("window")->getChildByName("Chimple")->setVisible(false);



	}
}

void MemoryHero::pauseAllActiveListeners() {


	for (int i = 1; i <= 24; i++) {

		if (_activeNestIds[i] == 0 || _currentClickedPair[0] == i || _currentClickedPair[1] == i) {
			continue;
		}


		std::ostringstream sstreamc;
		sstreamc << "board" << i;
		std::string queryc = sstreamc.str();

		auto pauseNode = _memoryfarm->getChildByName("mainground")->getChildByName(queryc)->getChildByName("window")->getChildByName("windowborder");

		Director::getInstance()->getEventDispatcher()->pauseEventListenersForTarget(pauseNode);


	}
	//_currentClickedPair[0] = _currentClickedPair[1] = 0;

}

void MemoryHero::resumeAllActiveListeners() {



	for (int i = 1; i <= 24; i++) {

		if (_activeNestIds[i] == 0) {
			continue;
		}


		std::ostringstream sstreamc;
		sstreamc << "board" << i;
		std::string queryc = sstreamc.str();

		auto pauseNode = _memoryfarm->getChildByName("mainground")->getChildByName(queryc)->getChildByName("window")->getChildByName("windowborder");

		Director::getInstance()->getEventDispatcher()->resumeEventListenersForTarget(pauseNode);


	}
	//_currentClickedPair[0] = _currentClickedPair[1] = 0;

}

bool MemoryHero::checkMatch() {

	std::string str1 = _currentSelectedNestNames[0];
	std::string str2 = _currentSelectedNestNames[1];

	if (_data[str1] == str2 || _data[str2] == str1) {
		if (_level == 11) {
			_menuContext->showScore();
		}
		_level++;
		return true;
	}
	return false;
}



void MemoryHero::chickenFly() {

	std::ostringstream sstreamnest1;
	sstreamnest1 << "board" << _currentClickedPair[0];
	std::string querynest1 = sstreamnest1.str();

	std::ostringstream sstreamnest2;
	sstreamnest2 << "board" << _currentClickedPair[1];
	std::string querynest2 = sstreamnest2.str();


	_chickenTimeline[_currentClickedPair[0]]->play("doorfall", false);
	_chickenTimeline[_currentClickedPair[1]]->play("doorfall", false);
	_wallTimeline[_currentClickedPair[0]]->play("fall", false);
	_wallTimeline[_currentClickedPair[1]]->play("fall", false);
	

	/*
	auto moveTonest1 = MoveTo::create(4, Vec2(-3100, 1800));
	Sprite *chicken1 = (Sprite *)_memoryfarm->getChildByName("mainground")->getChildByName(querynest1)->getChildByName("window")->getChildByName("windowborder");
	chicken1->runAction(moveTonest1);

	auto moveTonest2 = MoveTo::create(4, Vec2(-3100, 1800));
	Sprite *chicken2 = (Sprite *)_memoryfarm->getChildByName("mainground")->getChildByName(querynest2)->getChildByName("window")->getChildByName("windowborder");
	chicken2->runAction(moveTonest2);
	*/


}

void MemoryHero::removecurrentlabelsandlisteners() {

	std::ostringstream sstreamc;
	sstreamc << "board" << _currentClickedPair[0];
	std::string queryc = sstreamc.str();

	_memoryfarm->getChildByName("mainground")->getChildByName(queryc)->getChildByName("window")->getChildByName("windowborder")->getChildByName(_currentSelectedNestNames[0])->setVisible(false);


	std::ostringstream sstreamd;
	sstreamd << "board" << _currentClickedPair[1];
	std::string queryd = sstreamd.str();

	_memoryfarm->getChildByName("mainground")->getChildByName(queryd)->getChildByName("window")->getChildByName("windowborder")->getChildByName(_currentSelectedNestNames[1])->setVisible(false);

	auto pauseNode1 = _memoryfarm->getChildByName("mainground")->getChildByName(queryc)->getChildByName("window")->getChildByName("windowborder");

	Director::getInstance()->getEventDispatcher()->pauseEventListenersForTarget(pauseNode1);

	auto pauseNode2 = _memoryfarm->getChildByName("mainground")->getChildByName(queryd)->getChildByName("window")->getChildByName("windowborder");

	Director::getInstance()->getEventDispatcher()->pauseEventListenersForTarget(pauseNode2);

}