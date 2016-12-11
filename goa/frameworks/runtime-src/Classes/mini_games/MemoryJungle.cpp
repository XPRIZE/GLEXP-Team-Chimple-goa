//
//  MemoryJungle.cpp
//
//  Created by Jyoti Prakash on 29/09/16.
//
//

#include "MemoryJungle.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "SimpleAudioEngine.h"
#include "../lang/LangUtil.h"
#include "../StartMenuScene.h"
#include "../lang/TextGenerator.h"


USING_NS_CC;

//TextGenerator::getInstance()->getSynonyms(9)
//TextGenerator::getInstance()->getAntonyms(9)
//TextGenerator::getInstance()->getHomonyms(9)



MemoryJungle::MemoryJungle() :
	_currentNest(0),
	_currentClickedPair(3),
	_currentSelectedNestNames(2),
	_level(0),
    _finalGridIds(0),   
	_activeNestIds(25),
	_chickenTimeline(25),
	_leaveTimeline(25),
    _gridTwoByTwoIds(4),
	_gridTwoByThreeIds(6),
    _gridThreeByFourIds(12),
    _gridThreeBySixIds(18),
    _gridFourByFiveIds(20),
    _gridFourBySixIds(24),
    _counter(0),
	_helpflag(0)
	
{

}

MemoryJungle::~MemoryJungle() {

}


Scene *MemoryJungle::createScene() {

	auto scene = Scene::create();
	auto layer = MemoryJungle::create();

	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, MemoryJungle::classname());
	scene->addChild(layer->_menuContext);

	return scene;

}

MemoryJungle *MemoryJungle::create() {

	MemoryJungle *memoryJungle = new (std::nothrow) MemoryJungle();
	if (memoryJungle && memoryJungle->init()) {
		memoryJungle->autorelease();
		return memoryJungle;
	}
	CC_SAFE_DELETE(memoryJungle);
	return nullptr;

}


bool MemoryJungle::init() {

	if (!Layer::init())
	{
		return false;
	}

	return true;

}

void MemoryJungle::onEnterTransitionDidFinish() {

    _finalGridIds.resize(0);

    
    if (_menuContext->getCurrentLevel() <= 6 && _menuContext->getCurrentLevel() >=1) { _gridTwoByTwoIds.resize(_gridTwoByTwoIds_Size); 
	_gridTwoByTwoIds = { 9, 10, 15, 16 };
	_pairCount = 2;

	_finalGridIds = _gridTwoByTwoIds;
	_menuContext->setMaxPoints(_pairCount);

	if (_menuContext->getCurrentLevel() >= 1 && _menuContext->getCurrentLevel() <= 2) {
		_data = TextGenerator::getInstance()->getAntonyms(_pairCount);
		_hint = LangUtil::getInstance()->translateString("Match the antonyms");
	}

	if (_menuContext->getCurrentLevel() >= 3 && _menuContext->getCurrentLevel() <= 4) {
		_data = TextGenerator::getInstance()->getSynonyms(_pairCount);
		_hint = LangUtil::getInstance()->translateString("Match the synonyms");
	}

	if (_menuContext->getCurrentLevel() >= 5 && _menuContext->getCurrentLevel() <= 6) {
		_data = TextGenerator::getInstance()->getHomonyms(_pairCount);
		_hint = LangUtil::getInstance()->translateString("Match the homonyms");
	}
	
	}
	
	if (_menuContext->getCurrentLevel() <= 12 && _menuContext->getCurrentLevel() > 6) { _gridTwoByThreeIds.resize(_gridTwoByThreeIds_Size); 
	_gridTwoByThreeIds = {8, 9, 10, 14, 15, 16};
	_pairCount = 3;

	_finalGridIds = _gridTwoByThreeIds;
	_menuContext->setMaxPoints(_pairCount);

	if (_menuContext->getCurrentLevel() >= 7 && _menuContext->getCurrentLevel() <= 8) {
		_data = TextGenerator::getInstance()->getAntonyms(_pairCount);
		_hint = LangUtil::getInstance()->translateString("Match the antonyms");
	}

	if (_menuContext->getCurrentLevel() >= 9 && _menuContext->getCurrentLevel() <= 10) {
		_data = TextGenerator::getInstance()->getSynonyms(_pairCount);
		_hint = LangUtil::getInstance()->translateString("Match the synonyms");
	}

	if (_menuContext->getCurrentLevel() >= 11 && _menuContext->getCurrentLevel() <= 12) {
		_data = TextGenerator::getInstance()->getHomonyms(_pairCount);
		_hint = LangUtil::getInstance()->translateString("Match the homonyms");
	}
	}
	
	if (_menuContext->getCurrentLevel() <= 18 && _menuContext->getCurrentLevel() > 12) { _gridThreeByFourIds.resize(_gridThreeByFourIds_Size); 
	_gridThreeByFourIds = {8, 9, 10, 11, 14, 15, 16, 17, 20, 21, 22, 23};
		_pairCount = 6;

		_finalGridIds = _gridThreeByFourIds;
		_menuContext->setMaxPoints(_pairCount);

		if (_menuContext->getCurrentLevel() >= 13 && _menuContext->getCurrentLevel() <= 14) {
			_data = TextGenerator::getInstance()->getAntonyms(_pairCount);
			_hint = LangUtil::getInstance()->translateString("Match the antonyms");
		}

		if (_menuContext->getCurrentLevel() >= 15 && _menuContext->getCurrentLevel() <= 16) {
			_data = TextGenerator::getInstance()->getSynonyms(_pairCount);
			_hint = LangUtil::getInstance()->translateString("Match the synonyms");
		}

		if (_menuContext->getCurrentLevel() >= 17 && _menuContext->getCurrentLevel() <= 18) {
			_data = TextGenerator::getInstance()->getHomonyms(_pairCount);
			_hint = LangUtil::getInstance()->translateString("Match the homonyms");
		}
	}
	
	if (_menuContext->getCurrentLevel() <= 24 && _menuContext->getCurrentLevel() > 18) { _gridThreeBySixIds.resize(_gridThreeBySixIds_Size); 
	_gridThreeBySixIds = {7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24};
	_pairCount = 9;

	_finalGridIds = _gridThreeBySixIds;
	_menuContext->setMaxPoints(_pairCount);

	if (_menuContext->getCurrentLevel() >= 19 && _menuContext->getCurrentLevel() <= 20) {
		_data = TextGenerator::getInstance()->getAntonyms(_pairCount);
		_hint = LangUtil::getInstance()->translateString("Match the antonyms");
	}

	if (_menuContext->getCurrentLevel() >= 21 && _menuContext->getCurrentLevel() <= 22) {
		_data = TextGenerator::getInstance()->getSynonyms(_pairCount);
		_hint = LangUtil::getInstance()->translateString("Match the synonyms");
	}

	if (_menuContext->getCurrentLevel() >= 23 && _menuContext->getCurrentLevel() <= 24) {
		_data = TextGenerator::getInstance()->getHomonyms(_pairCount);
		_hint = LangUtil::getInstance()->translateString("Match the homonyms");
	}
	}
	
	if (_menuContext->getCurrentLevel() <= 30 && _menuContext->getCurrentLevel() > 24) { _gridFourByFiveIds.resize(_gridFourByFiveIds_Size); 
	_gridFourByFiveIds = {1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23};
	_pairCount = 10;

	_finalGridIds = _gridFourByFiveIds;
	_menuContext->setMaxPoints(_pairCount);

	if (_menuContext->getCurrentLevel() >= 25 && _menuContext->getCurrentLevel() <= 26) {
		_data = TextGenerator::getInstance()->getAntonyms(_pairCount);
		_hint = LangUtil::getInstance()->translateString("Match the antonyms");
	}

	if (_menuContext->getCurrentLevel() >= 27 && _menuContext->getCurrentLevel() <= 28) {
		_data = TextGenerator::getInstance()->getSynonyms(_pairCount);
		_hint = LangUtil::getInstance()->translateString("Match the synonyms");
	}

	if (_menuContext->getCurrentLevel() >= 29 && _menuContext->getCurrentLevel() <= 30) {
		_data = TextGenerator::getInstance()->getHomonyms(_pairCount);
		_hint = LangUtil::getInstance()->translateString("Match the homonyms");
	}
	}
	
	if (_menuContext->getCurrentLevel() <= 36 && _menuContext->getCurrentLevel() > 30) { _gridFourBySixIds.resize(_gridFourBySixIds_Size); 
	_gridFourBySixIds = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,  13, 14, 15, 16,  17, 18, 19, 20, 21, 22, 23, 24 };
	_pairCount = 12;

	_finalGridIds = _gridFourBySixIds;
	_menuContext->setMaxPoints(_pairCount);

	if (_menuContext->getCurrentLevel() >= 31 && _menuContext->getCurrentLevel() <= 32) {
		_data = TextGenerator::getInstance()->getAntonyms(_pairCount);
		_hint = LangUtil::getInstance()->translateString("Match the antonyms");
	}

	if (_menuContext->getCurrentLevel() >= 33 && _menuContext->getCurrentLevel() <= 34) {
		_data = TextGenerator::getInstance()->getSynonyms(_pairCount);
		_hint = LangUtil::getInstance()->translateString("Match the synonyms");
	}

	if (_menuContext->getCurrentLevel() >= 35 && _menuContext->getCurrentLevel() <= 36) {
		_data = TextGenerator::getInstance()->getHomonyms(_pairCount);
		_hint = LangUtil::getInstance()->translateString("Match the homonyms");
	}
	}
	
    
	CCSpriteFrameCache::sharedSpriteFrameCache()->addSpriteFramesWithFile("jungle/junglea/junglea.plist");
	CCSpriteFrameCache::sharedSpriteFrameCache()->addSpriteFramesWithFile("jungle/jungleb/jungleb.plist");
	CCSpriteFrameCache::sharedSpriteFrameCache()->addSpriteFramesWithFile("jungle/junglec/junglec.plist");


	for (std::map<std::string, std::string>::iterator it = _data.begin(); it != _data.end(); ++it) {
		_data_key.push_back(it->first);
	}

	for (std::map<std::string, std::string>::iterator it = _data.begin(); it != _data.end(); ++it) {
		_data_value.push_back(it->second);
	}

	generateRandomNumbers();
    
    _chickenTimeline.resize(25);

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();


	_memoryfarm = CSLoader::createNode("jungle/memoryjungle.csb");

	_memoryfarm->setPosition(Vec2(visibleSize.width / 2 + origin.x, visibleSize.height / 2 + origin.y));
	_memoryfarm->setAnchorPoint(Vec2(0.5, 0.5));
	addChild(_memoryfarm);

    
	generateGrid(_finalGridIds);
	
    
	//_chickenTimelineTemp = CSLoader::createTimeline("memoryfarm/chicken.csb");
	//_memoryfarm->getChildByName("background")->getChildByName("nest1")->getChildByName("chicken")->runAction(_chickenTimelineTemp);
	//_chickenTimelineTemp->play("fly", false);

	int nestsCount = _pairCount*2;
	int j = 0;
	for (int i = 0; i < nestsCount; i++) {

		std::ostringstream sstreamc;
		sstreamc << "board" << _finalGridIds[_currentNest];
		std::string queryc = sstreamc.str();

		_activeNestIds[_finalGridIds[_currentNest]] = _finalGridIds[_currentNest];
		_memoryfarm->getChildByName("mainground")->getChildByName(queryc)->getChildByName("leave")->getChildByName("leave")->setAnchorPoint(Vec2(0, 0));

		_memoryfarm->getChildByName("mainground")->getChildByName(queryc)->getChildByName("leave")->setPositionX(10);


		_memoryfarm->getChildByName("mainground")->getChildByName(queryc)->getChildByName("leave")-> getChildByName("leave")->setTag(_finalGridIds[_currentNest]);

		std::string labelName;

		_chickenTimeline[_finalGridIds[_currentNest]] = CSLoader::createTimeline("jungle/cimpwalk.csb");
		_memoryfarm->getChildByName("mainground")->getChildByName(queryc)->getChildByName("chimp")->runAction(_chickenTimeline[_finalGridIds[_currentNest]]);

		
		

		_leaveTimeline[_finalGridIds[_currentNest]] = CSLoader::createTimeline("jungle/leave.csb");
		_memoryfarm->getChildByName("mainground")->getChildByName(queryc)->getChildByName("leave")->runAction(_leaveTimeline[_finalGridIds[_currentNest]]);


		_memoryfarm->getChildByName("mainground")->getChildByName(queryc)->getChildByName("chimp")->  setVisible(false);

		
        if (i == _pairCount) {
			generateRandomNumbers();
		}


		if (i < _pairCount) {

			labelName = _data_key[_randomIndex[i]];
		}
		else {

			labelName = _data_value[_randomIndex[j]];
			j++;
		}

		
		auto nestWidth = _memoryfarm->getChildByName("mainground")->getChildByName(queryc)->getChildByName("leave")->getChildByName("leave")->getContentSize().width;

		auto nestHeight = _memoryfarm->getChildByName("mainground")->getChildByName(queryc)->getChildByName("leave")->getChildByName("leave")->getContentSize().height;

		auto label = ui::Text::create();
		label->setString(labelName);
		label->setFontSize(100);
		label->setFontName("fonts/Marker Felt.ttf");
		label->setPosition(Vec2(nestWidth * 0.48, nestHeight * 0.53));
		label->setAnchorPoint(Vec2(0.5, 0.5));
		label->setTextColor(Color4B::BLUE);
		label->setName(labelName);

		

		_memoryfarm->getChildByName("mainground")->getChildByName(queryc)->getChildByName("leave")->getChildByName("leave")->addChild(label, 0);


		label->setVisible(false);

		setupTouch();
	}


    
    ////////////////////help


	if (_menuContext->getCurrentLevel() == 1) {

		auto box1 =_memoryfarm->getChildByName("mainground")->getChildByName("board9");
		auto box2 = _memoryfarm->getChildByName("mainground")->getChildByName("board16");


		box1pos = box1->getPosition() + Vec2(visibleSize.width * 0.03, 0);
		box2pos = box2->getPosition() + Vec2(visibleSize.width * 0.03, 0);

		help1 = HelpLayer::create(Rect(box1pos.x, box1pos.y, box1->getChildByName("leave")->getChildByName("leave")->getContentSize().width, box1->getChildByName("leave")->getChildByName("leave")->getContentSize().height), Rect(0, 0, 0, 0));


		help1->click(Vec2(box1pos));


		this->addChild(help1);
	}

	///////////////////////help end
	_counter = 0;
	_helpflag = 0;

	addGrid(visibleSize.width / 2, visibleSize.height * 0.15, visibleSize.width / 2, visibleSize.height * 0.95);

	cocos2d::ui::Text * _label;

	//_hint = "Catch the antonyms";
	_label = ui::Text::create();
	_label->setFontName("fonts/BalooBhai-Regular.ttf");
	_label->setString(_hint);
	_label->setFontSize(100);

	_label->setPosition(Vec2(visibleSize.width / 2, visibleSize.height * 0.95));
	_label->setAnchorPoint(Vec2(0.5, 0.5));
	_label->setName("label");
	_label->setTextColor(Color4B::BLUE);
	_label->setColor(Color3B::BLACK);

	this->addChild(_label, 20);
	
}


void MemoryJungle::setupTouch() {

	// CCLOG("NEST %d setuptouch done", nestIndex);
	std::ostringstream sstreamc;
	sstreamc << "board" << _finalGridIds[_currentNest];
	std::string queryc = sstreamc.str();

	auto _nest = _memoryfarm->getChildByName("mainground")->getChildByName(queryc)->getChildByName("leave")->getChildByName("leave");

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
	listener->onTouchBegan = CC_CALLBACK_2(MemoryJungle::onTouchBegan, this);
	listener->onTouchEnded = CC_CALLBACK_2(MemoryJungle::onTouchEnded, this);
	listener->onTouchMoved = CC_CALLBACK_2(MemoryJungle::onTouchMoved, this);
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, _nest);
	_currentNest++;

}


bool MemoryJungle::onTouchBegan(Touch* touch, Event* event) {


	auto target = event->getCurrentTarget();
	Point locationInNode = target->getParent()->convertToNodeSpace(touch->getLocation());

	//Size s = target->getContentSize();
	//Rect rect = Rect(0, 0, s.width, s.height);
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	auto bb = target->getBoundingBox();

	if (target->getBoundingBox().containsPoint(locationInNode))
	{

        
       
        	if (_menuContext->getCurrentLevel() == 1 && _helpflag == 0 && _counter == 0) {
			this->removeChild(help1);

			 auto box1 =_memoryfarm->getChildByName("mainground")->getChildByName("board9");
		auto box2 = _memoryfarm->getChildByName("mainground")->getChildByName("board16");


		box1pos = box1->getPosition() + Vec2(visibleSize.width * 0.03, 0);
		box2pos = box2->getPosition() + Vec2(visibleSize.width * 0.03, 0);

		help2 = HelpLayer::create(Rect(box2pos.x, box2pos.y, box2->getChildByName("leave")->getChildByName("leave")->getContentSize().width, box2->getChildByName("leave")->getChildByName("leave")->getContentSize().height), Rect(0, 0, 0, 0));

			help2->click(Vec2(box2pos));


			this->addChild(help2);
			_helpflag = 1;

		}

		if (_menuContext->getCurrentLevel() == 1 && _helpflag == 1 && _counter == 1) {
			this->removeChild(help2);
			_helpflag++;
		}
        
		//CCLOG("NEST CLICKED : %d ", counter++);
		if (_counter < 2) {

			auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
			audio->playEffect("sounds/memory/tap.mp3", false);

			std::ostringstream sstreamc;
			sstreamc << "board" << target->getTag();
			std::string queryc = sstreamc.str();

			auto child = target->getChildren();
			std::string childName = child.at(0)->getName();

			_currentSelectedNestNames[_counter] = childName;
			//target->getChildByName("Chimple")->setVisible(true);
			auto pauseCurrentTarget = _memoryfarm->getChildByName("mainground")->getChildByName(queryc)->getChildByName("leave")->getChildByName("leave");
			
			_memoryfarm->getChildByName("mainground")->getChildByName(queryc)->getChildByName("leave")->getChildByName("leave")->getChildByName(childName)->setVisible(true);

			Director::getInstance()->getEventDispatcher()->pauseEventListenersForTarget(pauseCurrentTarget);

			

			_currentClickedPair[_counter] = target->getTag();

			_memoryfarm->getChildByName("mainground")->getChildByName(queryc)->getChildByName("chimp")->setVisible(true);

			_chickenTimeline[_currentClickedPair[_counter]]->play("stand", false);


			bool flag;
			if (_counter == 1) {

				//pause listener on all nests which have non zero values
				pauseAllActiveListeners();
				flag = checkMatch();

				if (flag == true) {

					//make the hen fly

					auto flycallfunc = CallFunc::create([=] {chickenFly(); });

                    auto finishcallfunc = CallFunc::create([=] {
				

						if (_level == _pairCount) {

							auto createMatchLayer = CallFunc::create([=] {

								addGrid(visibleSize.width / 2, visibleSize.height, visibleSize.width / 2, visibleSize.height / 2);
								auto heightpercent = 0.90;
								for (auto& x : _data) {
									cocos2d::ui::Text * _label;


									_label = ui::Text::create();
									_label->setFontName("fonts/BalooBhai-Regular.ttf");

									auto first = x.first;
									auto second = x.second;

									_label->setString(x.first + " ------- " + x.second);
									_label->setFontSize(60);

									_label->setPosition(Vec2(visibleSize.width / 2, visibleSize.height * heightpercent));
									_label->setAnchorPoint(Vec2(0.5, 0.5));
									_label->setName("label");
									_label->setTextColor(Color4B::BLACK);
									_label->setColor(Color3B::BLACK);

									this->addChild(_label, 20);
									heightpercent -= 0.05;
								}

							});

							auto showScore = CallFunc::create([=] {
								_menuContext->showScore();
							});

							auto completeSequence = Sequence::create(createMatchLayer, DelayTime::create(5.0), showScore, NULL);

							this->runAction(completeSequence);
						}
						});
                    
					auto turnleavcallfunc = CallFunc::create([=] {

						_leaveTimeline[_currentClickedPair[0]]->play("correct", false);
						_leaveTimeline[_currentClickedPair[1]]->play("correct", false);
					});

					
					auto removelistenercallfunc = CallFunc::create([=] {

						removecurrentlabelsandlisteners();
						_activeNestIds[_currentClickedPair[0]] = 0;
						_activeNestIds[_currentClickedPair[1]] = 0;
					});

					auto resumeListenercallfunc = CallFunc::create([=] {

						
						resumeAllActiveListeners();
					});


					auto completeSequence = Sequence::create( flycallfunc, DelayTime::create(2.0), removelistenercallfunc,  turnleavcallfunc, DelayTime::create(0.5), resumeListenercallfunc, finishcallfunc, NULL);

					this->runAction(completeSequence);



				}
				else {

					//if they doesnot matches resume the listener of current two selected nest



					auto resumelistenercallfunc = CallFunc::create([=] {

						std::ostringstream sstreamc;
						sstreamc << "board" << _currentClickedPair[0];
						std::string queryc = sstreamc.str();

						auto pauseNode1 = _memoryfarm->getChildByName("mainground")->getChildByName(queryc)->getChildByName("leave")->getChildByName("leave");

						Director::getInstance()->getEventDispatcher()->resumeEventListenersForTarget(pauseNode1);


						std::ostringstream sstreamd;
						sstreamd << "board" << _currentClickedPair[1];
						std::string queryd = sstreamd.str();

						auto pauseNode2 = _memoryfarm->getChildByName("mainground")->getChildByName(queryd)->getChildByName("leave")->getChildByName("leave");

						Director::getInstance()->getEventDispatcher()->resumeEventListenersForTarget(pauseNode2);

						resumeAllActiveListeners();

					});

					auto makeChickenSit = CallFunc::create([=] {

						_chickenTimeline[_currentClickedPair[0]]->play("sit", false);
						_chickenTimeline[_currentClickedPair[1]]->play("sit", false);

					});

					auto setspritesinvisiblefunc = CallFunc::create([=] {

						std::ostringstream sstreamc;
						sstreamc << "board" << _currentClickedPair[0];
						std::string queryc = sstreamc.str();

						_memoryfarm->getChildByName("mainground")->getChildByName(queryc)->getChildByName("leave")->getChildByName("leave")->getChildByName(_currentSelectedNestNames[0])->setVisible(false);


						std::ostringstream sstreamd;
						sstreamd << "board" << _currentClickedPair[1];
						std::string queryd = sstreamd.str();


						_memoryfarm->getChildByName("mainground")->getChildByName(queryd)->getChildByName("leave")->getChildByName("leave")->getChildByName(_currentSelectedNestNames[1])->setVisible(false);

					});

					auto wrongSequence = Sequence::create(DelayTime::create(1.0), makeChickenSit, DelayTime::create(1.0), setspritesinvisiblefunc , resumelistenercallfunc, NULL);

					this->runAction(wrongSequence);


				}

				_counter = -1;
			}

		}
		_counter++;

		return true; // to indicate that we have consumed it.
	}

	return false; // we did not consume this event, pass thru.
}

void MemoryJungle::onTouchEnded(cocos2d::Touch *touch, cocos2d::Event *event) {
	//    CCLOG("onTouchEnded");

	auto target = event->getCurrentTarget();
	Point locationInNode = target->getParent()->convertToNodeSpace(touch->getLocation());


}

void MemoryJungle::onTouchMoved(cocos2d::Touch *touch, cocos2d::Event *event) {
	//    CCLOG("onTouchMoved");

}


void MemoryJungle::pauseAllActiveListeners() {


	for (int i = 0; i < _pairCount * 2; i++) {

		if (_activeNestIds[_finalGridIds[i]] == 0 || _currentClickedPair[0] == _finalGridIds[i] || _currentClickedPair[1] == _finalGridIds[i]) {
			continue;
		}


		std::ostringstream sstreamc;
		sstreamc << "board" << _finalGridIds[i];
		std::string queryc = sstreamc.str();

		auto pauseNode = _memoryfarm->getChildByName("mainground")->getChildByName(queryc)->getChildByName("leave")->getChildByName("leave");

		Director::getInstance()->getEventDispatcher()->pauseEventListenersForTarget(pauseNode);


	}
	//_currentClickedPair[0] = _currentClickedPair[1] = 0;

}

void MemoryJungle::resumeAllActiveListeners() {



	for (int i = 0; i < _pairCount * 2; i++) {

		if (_activeNestIds[_finalGridIds[i]] == 0) {
			continue;
		}


		std::ostringstream sstreamc;
		sstreamc << "board" << _finalGridIds[i];
		std::string queryc = sstreamc.str();

		auto pauseNode = _memoryfarm->getChildByName("mainground")->getChildByName(queryc)->getChildByName("leave")->getChildByName("leave");

		Director::getInstance()->getEventDispatcher()->resumeEventListenersForTarget(pauseNode);


	}
	//_currentClickedPair[0] = _currentClickedPair[1] = 0;

}

bool MemoryJungle::checkMatch() {

	std::string str1 = _currentSelectedNestNames[0];
	std::string str2 = _currentSelectedNestNames[1];

	if (_data[str1] == str2 || _data[str2] == str1) {
		
		_level++;
		return true;
	}
	return false;
}



void MemoryJungle::chickenFly() {

	std::ostringstream sstreamnest1;
	sstreamnest1 << "board" << _currentClickedPair[0];
	std::string querynest1 = sstreamnest1.str();

	std::ostringstream sstreamnest2;
	sstreamnest2 << "board" << _currentClickedPair[1];
	std::string querynest2 = sstreamnest2.str();


	_chickenTimeline[_currentClickedPair[0]]->play("walk", true);
	_chickenTimeline[_currentClickedPair[1]]->play("walk", true);
    
	float nest1y;
	nest1y = _memoryfarm->getChildByName("mainground")->getChildByName(querynest1)->getChildByName("chimp")->getPositionY();
	auto moveTonest1 = MoveTo::create(4, Vec2(-3100, nest1y));
	Sprite *chicken1 = (Sprite *)_memoryfarm->getChildByName("mainground")->getChildByName(querynest1)->getChildByName("chimp");
	chicken1->runAction(moveTonest1);

	float nest2y;
	nest2y = _memoryfarm->getChildByName("mainground")->getChildByName(querynest2)->getChildByName("chimp")->getPositionY();
	auto moveTonest2 = MoveTo::create(4, Vec2(-3100, nest2y));
	Sprite *chicken2 = (Sprite *)_memoryfarm->getChildByName("mainground")->getChildByName(querynest2)->getChildByName("chimp");
	//chicken2->setFlipX(true);

	chicken2->runAction(moveTonest2);


	_menuContext->addPoints(1);

}

void MemoryJungle::removecurrentlabelsandlisteners() {

	std::ostringstream sstreamc;
	sstreamc << "board" << _currentClickedPair[0];
	std::string queryc = sstreamc.str();

	_memoryfarm->getChildByName("mainground")->getChildByName(queryc)->getChildByName("leave")->getChildByName("leave")->getChildByName(_currentSelectedNestNames[0])->setVisible(false);

	
	std::ostringstream sstreamd;
	sstreamd << "board" << _currentClickedPair[1];
	std::string queryd = sstreamd.str();

	_memoryfarm->getChildByName("mainground")->getChildByName(queryd)->getChildByName("leave")->getChildByName("leave")->getChildByName(_currentSelectedNestNames[1])->setVisible(false);

	

	auto pauseNode1 = _memoryfarm->getChildByName("mainground")->getChildByName(queryc)->getChildByName("leave")->getChildByName("leave");

	Director::getInstance()->getEventDispatcher()->pauseEventListenersForTarget(pauseNode1);

	auto pauseNode2 = _memoryfarm->getChildByName("mainground")->getChildByName(queryd)->getChildByName("leave")->getChildByName("leave");

	Director::getInstance()->getEventDispatcher()->pauseEventListenersForTarget(pauseNode2);

}

void MemoryJungle::generateRandomNumbers() {

	int a = _data.size();
	//std::vector<int> randomIndex;
	_randomIndex.clear();
	while (_randomIndex.size() != _data.size()) {
		bool duplicateCheck = true;
		int numberPicker = RandomHelper::random_int(0, a - 1);
		for (int i = 0; i < _randomIndex.size(); i++) {
			if (numberPicker == _randomIndex[i]) {
				duplicateCheck = false;
			}
		}
		if (duplicateCheck) {
			_randomIndex.push_back(numberPicker);
		}
	}
}



void MemoryJungle::generateGrid(std::vector<int> grid) {
	int found = 0;

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	for (int i = 1; i <= 24; i++) {
		found = 0;
		for (int j = 0; j < grid.size(); j++) {
			if (i == grid[j]) {
				found = 1;
			}
		}
		

		std::ostringstream sstreamc;
		sstreamc << "board" << i;
		std::string queryc = sstreamc.str();

		if (found == 0) {
			
			auto pauseNode = _memoryfarm->getChildByName("mainground")->getChildByName(queryc);
			pauseNode->setVisible(false);
			Director::getInstance()->getEventDispatcher()->pauseEventListenersForTarget(pauseNode);

		}else{
		
			float currentX = _memoryfarm->getChildByName("mainground")->getChildByName(queryc)->getPositionX();
			float currentY = _memoryfarm->getChildByName("mainground")->getChildByName(queryc)->getPositionY();

	 // _memoryfarm->getChildByName("background")->getChildByName(queryc)->setPositionX(currentX);	//_memoryfarm->getChildByName("background")->getChildByName(queryc)->setPositionY(currentX);

			switch (grid.size()) {

			
			case 6:
				_memoryfarm->getChildByName("mainground")->getChildByName(queryc)->setPositionX(currentX + (0.07 * visibleSize.width));
				break;
			case 12:
				//_memoryfarm->getChildByName("background")->getChildByName(queryc)->setPositionY(currentY + (0.05 * visibleSize.height));
				
				//_memoryfarm->getChildByName("mainground")->getChildByName("Panel_1")->setPositionY(currentY + (0.09 * visibleSize.height));
				//_memoryfarm->getChildByName("mainground")->getChildByName("Panel_2")->setPositionY(currentY + (0.09 * visibleSize.height));
				//_memoryfarm->getChildByName("mainground")->getChildByName("Panel_3")->setPositionY(currentY + (0.09 * visibleSize.height));
				
				break;
			case 18:break;
			case 20:
				_memoryfarm->getChildByName("mainground")->getChildByName(queryc)->setPositionX(currentX + (0.07 * visibleSize.width));
				break;
			

			}

		}
		
	}

}



void MemoryJungle::addGrid(float sizex, float sizey, float posx, float posy) {

	auto gridPanel = Sprite::create();
	gridPanel->setTextureRect(Rect(0, 0, sizex, sizey));
	gridPanel->setColor(Color3B::WHITE);
	gridPanel->setPosition(Vec2(posx, posy));
	gridPanel->setOpacity(60);
	gridPanel->setName("gridpanel");
	addChild(gridPanel, 1);

}