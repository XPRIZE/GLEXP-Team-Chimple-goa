//
//  Shoot.cpp 
//  goa
//
//  Created by Karim Mirazul  on 05/12/16
//
//

#include "Shoot.h"
#include "../menu/HelpLayer.h"
#include "../util/CommonLabelTTF.h"

#define COCOS2D_DEBUG 1;
using namespace std;
using namespace cocos2d;

Scene* Shoot::createScene()
{
	auto scene = Scene::create();
	auto layer = Shoot::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, Shoot::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

Shoot *Shoot::create() {
	Shoot *blast = new (std::nothrow) Shoot();
	if (blast && blast->init()) {
		blast->autorelease();
		return blast;
	}
	CC_SAFE_DELETE(blast);
	return nullptr;

}

bool Shoot::init()
{
	if (!Layer::init()) { return false; }

	return true;
}

void Shoot::onEnterTransitionDidFinish() {

	_eventDispatcher->addCustomEventListener("multipleChoiceQuiz", CC_CALLBACK_1(Shoot::gameBegin, this));

	_lesson.getMultiChoices(5, 2);
	

}

void Shoot::gameBegin(cocos2d::EventCustom *eventCustom) {
	CCLOG("onLessonReady begin");
	std::string* buf = static_cast<std::string*>(eventCustom->getUserData());
	CCLOG("onLessonReady to unmarshallMultiChoices");
	vector<Lesson::MultiChoice> vmc = Lesson::unmarshallMultiChoices(buf);

	std::string playerGUI = "";
	int heightTolrence = 0;
	_menuContext->setMaxPoints(10);

	std::string gameRand[] = { "pinatacity" ,"pinatacream","pinatajungle" };
	int gameCurrentLevel = _menuContext->getCurrentLevel();
	//	std::tuple<int, int, int> levelKeyNumber = levelAllInfo(gameCurrentLevel, 3, 5, 3, 10);
	std::string gameTheme = gameRand[RandomHelper::random_int(0, 2)];

	auto topBoard = Sprite::create();
	topBoard->setTextureRect(Rect(0, 0, Director::getInstance()->getVisibleSize().width / 2, 165));
	topBoard->setColor(Color3B(128, 196, 206));
	topBoard->setPosition(Vec2(Director::getInstance()->getVisibleSize().width / 2, Director::getInstance()->getVisibleSize().height*0.92));
	addChild(topBoard, 4);
	topBoard->setName("topBoard");

	auto upText = CommonLabelTTF::create(TextGenerator::getInstance()->translateString("choose same sounding word"), "res/fonts/BalooBhai-Regular.ttf", topBoard->getContentSize().height * 0.5);
	upText->setPosition(topBoard->getContentSize().width / 2, topBoard->getContentSize().height / 2);
	topBoard->addChild(upText);

	if (gameTheme.compare("pinatacream") == 0) {

		Node* gameBg = CSLoader::createNode("pinatacream/pinatacream.csb");
		addChild(gameBg);
		gameBg->setName("bg");

		auto targetA = gameBg->getChildByName("targeta");
		heightTolrence = targetA->getContentSize().height * 0.25;
		stringColor = Color4F(Color4B(158, 45, 45, 255));
		topBoard->setOpacity(164);
		playerGUI = "pinatacream/player.png";
		((Sprite*)this->getChildByName("topBoard"))->setColor(Color3B(251, 107, 124));
	}
	else if (gameTheme.compare("pinatacity") == 0) {

		Node* gameBg = CSLoader::createNode("pinatacity/pinatacity.csb");
		addChild(gameBg);
		gameBg->setName("bg");

		stringColor = Color4F(Color4B(140, 234, 19, 255));
		topBoard->setOpacity(180);
		playerGUI = "pinatacity/player.png";
		((Sprite*)this->getChildByName("topBoard"))->setColor(Color3B(36, 184, 184));
	}
	else if (gameTheme.compare("pinatajungle") == 0) {
		Node* gameBg = CSLoader::createNode("jungle/pinatajungle.csb");
		addChild(gameBg);
		gameBg->setName("bg");
		stringColor = Color4F(Color4B(124, 252, 0, 255));
		topBoard->setOpacity(180);
		playerGUI = "jungle/junglec/player.png";
		((Sprite*)this->getChildByName("topBoard"))->setColor(Color3B(228, 171, 80));
	}

	if (Director::getInstance()->getVisibleSize().width > 2560) {
		this->xPosi = Director::getInstance()->getVisibleSize().width - 2560;
		this->getChildByName("bg")->setPositionX(this->xPosi / 2);
	}


	_vmc = vmc;

	mapKey = _vmc[counterlevelStatus].question;
	_correctAnswerVmc = _vmc[counterlevelStatus].answers[_vmc[counterlevelStatus].correctAnswer];
	//	mapKey = _data_key[getRandomInt(0, 2)];

	int a = 0, b = 1, c = 2;

	
	if (gameCurrentLevel == 1) {
		if (_vmc[counterlevelStatus].correctAnswer == 0) { a = 1; c = 2;  b = 0; }
		else if (_vmc[counterlevelStatus].correctAnswer == 1) { a = 0; c = 2; b = 1; }
		else if (_vmc[counterlevelStatus].correctAnswer == 2) { a = 0; c = 1; b = 2; }
	}

	auto board = this->getChildByName("bg")->getChildByName("board");
	auto boardText = CommonLabelTTF::create(mapKey, "res/fonts/BalooBhai-Regular.ttf", 120);
	boardText->setName(board->getName());
	boardText->setPosition(Vec2(board->getContentSize().width / 2, board->getContentSize().height / 2));
	board->addChild(boardText);
	if (gameTheme.compare("pinatacream") == 0) { boardText->setColor(Color3B(155, 42, 50)); }
	if (gameTheme.compare("pinatacity") == 0) { boardText->setColor(Color3B(0, 0, 0)); }

	auto targetA = this->getChildByName("bg")->getChildByName("targeta");
	auto targetAText = CommonLabelTTF::create(_vmc[counterlevelStatus].answers[a], "res/fonts/BalooBhai-Regular.ttf", 80);
	if (gameTheme.compare("pinatajungle") == 0) targetAText->setFontSize(80);
	if (gameTheme.compare("pinatacity") == 0) { targetAText->setColor(Color3B(0, 0, 0)); }
	targetAText->setName(targetA->getName());
	targetAText->setPosition(Vec2(targetA->getContentSize().width / 2, targetA->getContentSize().height / 2 - heightTolrence));
	targetA->addChild(targetAText);
	targetA->setTag(0);

	auto targetB = this->getChildByName("bg")->getChildByName("targetb");
	auto targetBText = CommonLabelTTF::create(_vmc[counterlevelStatus].answers[b], "res/fonts/BalooBhai-Regular.ttf", 80);
	if (gameTheme.compare("pinatajungle") == 0) targetBText->setFontSize(80);
	if (gameTheme.compare("pinatacity") == 0) { targetBText->setColor(Color3B(0, 0, 0)); }
	targetBText->setName(targetB->getName());
	targetBText->setPosition(targetB->getContentSize().width / 2, targetB->getContentSize().height / 2 - heightTolrence);
	targetB->addChild(targetBText);
	targetB->setTag(0);

	auto targetC = this->getChildByName("bg")->getChildByName("targetc");
	auto targetCText = CommonLabelTTF::create(_vmc[counterlevelStatus].answers[c], "res/fonts/BalooBhai-Regular.ttf", 80);
	if (gameTheme.compare("pinatajungle") == 0) targetCText->setFontSize(80);
	if (gameTheme.compare("pinatacity") == 0) { targetCText->setColor(Color3B(0, 0, 0)); }
	targetCText->setName(targetC->getName());
	targetCText->setPosition(Vec2(targetC->getContentSize().width / 2, targetC->getContentSize().height / 2 - heightTolrence));
	targetC->addChild(targetCText);
	targetC->setTag(0);

	bubblePlayer = Sprite::createWithSpriteFrameName(playerGUI);
	bubblePlayer->setName(gameTheme);
	bubblePlayer->setPosition(Vec2((xPosi / 2) + (this->getChildByName("bg")->getChildByName("left")->getPositionX() + this->getChildByName("bg")->getChildByName("right")->getPositionX()) / 2, this->getChildByName("bg")->getChildByName("right")->getPositionY()));
	addChild(bubblePlayer, 1);
	player.x = bubblePlayer->getPositionX();    player.y = bubblePlayer->getPositionY();

	rightLine = DrawNode::create();
	rightLine->drawSegment(Vec2(this->getChildByName("bg")->getChildByName("right")->getPositionX() + (xPosi / 2), this->getChildByName("bg")->getChildByName("right")->getPositionY()), Vec2(player.x + (bubblePlayer->getContentSize().width / 2), player.y), 10, stringColor);
	this->addChild(rightLine, 3);
	rightLine->setName("rightLine");

	leftLine = DrawNode::create();
	leftLine->drawSegment(Vec2(this->getChildByName("bg")->getChildByName("left")->getPositionX() + (xPosi / 2), this->getChildByName("bg")->getChildByName("left")->getPositionY()), Vec2(player.x - (bubblePlayer->getContentSize().width / 2), player.y), 10, stringColor);
	this->addChild(leftLine);
	leftLine->setName("leftLine");

	targetYcoordSave = targetB->getPositionX();
	bubblePlayer->setVisible(false);
	rightLine->setVisible(false);
	leftLine->setVisible(false);

	this->getChildByName("bg")->getChildByName("right")->setVisible(false);
	this->getChildByName("bg")->getChildByName("left")->setVisible(false);
	this->getChildByName("bg")->getChildByName("board")->setTag(0);
	if (bubblePlayer->getName() == "pinatacity")
		this->getChildByName("bg")->getChildByName("slingshot_16")->setVisible(false);

	if (_menuContext->getCurrentLevel() == 1) {
		auto help = HelpLayer::create(Rect((xPosi / 2) + targetB->getPositionX(), targetB->getPositionY(), targetB->getContentSize().width + targetB->getContentSize().width * 0.3, targetB->getContentSize().height + targetB->getContentSize().height * 0.1), Rect((xPosi / 2) + board->getPositionX(), board->getPositionY(), board->getContentSize().width, board->getContentSize().height));
		help->click(Vec2((xPosi / 2) + targetB->getPositionX(), targetB->getPositionY()));
		help->setName("helpLayer");
		addChild(help, 4);
	}

	//if (LevelInfoForSpeaker()) {
	//	_wrongCounter = 0;
	//	pronounceWord();
	//}

	bgListner();
	choosingListner();
	this->scheduleUpdate();

}

void Shoot::update(float dt) {
	//commet
	if (!this->shootingFlag && _menuContext->isGamePaused() && (this->getChildByName("bg")->getChildByName("board")->getTag() == 1)) {
		this->bubblePlayer->setPosition((this->xPosi / 2) + (this->getChildByName("bg")->getChildByName("left")->getPositionX() + this->getChildByName("bg")->getChildByName("right")->getPositionX()) / 2, this->getChildByName("bg")->getChildByName("right")->getPositionY());
		if (this->rightLine) {
			this->removeChild(this->rightLine);
		}
		this->rightLine = DrawNode::create();
		this->rightLine->drawSegment(Vec2((this->xPosi / 2) + this->getChildByName("bg")->getChildByName("right")->getPositionX(), this->getChildByName("bg")->getChildByName("right")->getPositionY()), Vec2(this->bubblePlayer->getPositionX() + (this->bubblePlayer->getContentSize().width / 2), this->bubblePlayer->getPositionY()),10,this->stringColor);
		this->addChild(this->rightLine);

		if (this->leftLine) {
			this->removeChild(this->leftLine);
		}
		this->leftLine = DrawNode::create();
		this->leftLine->drawSegment(Vec2((this->xPosi / 2) + this->getChildByName("bg")->getChildByName("left")->getPositionX(), this->getChildByName("bg")->getChildByName("left")->getPositionY()), Vec2(this->bubblePlayer->getPositionX() - (this->bubblePlayer->getContentSize().width / 2), this->bubblePlayer->getPositionY()),10,this->stringColor);
		this->addChild(this->leftLine);

	}

	if (this->shootingFlag && !_menuContext->isGamePaused()) {
		this->stateShootBubble(dt);
		if (!(this->bubblePlayer->getPositionY() >= 0)) {
			this->bubblePlayer->setPosition(Vec2((this->xPosi / 2) + (this->getChildByName("bg")->getChildByName("left")->getPositionX() + this->getChildByName("bg")->getChildByName("right")->getPositionX()) / 2, this->getChildByName("bg")->getChildByName("right")->getPositionY()));
			this->player.x = this->bubblePlayer->getPositionX();    this->player.y = this->bubblePlayer->getPositionY();
			this->shootingFlag = false;
			this->getChildByName("bg")->getChildByName("board")->setTag(1);
		}
	}
	if (this->shootingFlag) {
		auto path = "";
		float size = 0.5;
		if (this->bubblePlayer->getName() == "pinatacity") {
			path = "pinatacity/pinatacityanim.csb";
			size = 0.7;
		}
		else if (this->bubblePlayer->getName() == "pinatacream") {
			path = "pinatacream/pinatacreamanim.csb";
			size = 0.5;
		}
		else if (this->bubblePlayer->getName() == "pinatajungle") {
			path = "jungle/target.csb";
			size = 0.9;
		}

		auto firstX = this->targetPlayer->getPositionX() - (this->targetPlayer->getContentSize().width*size / 2) + (this->xPosi / 2);
		auto firstY = this->targetPlayer->getPositionY() - (this->targetPlayer->getContentSize().height*size / 2);
		auto height = this->targetPlayer->getContentSize().height*size;
		auto width = this->targetPlayer->getContentSize().width*size;

		auto firstXs = this->bubblePlayer->getPositionX() - (this->bubblePlayer->getContentSize().width / 4);
		auto firstYs = this->bubblePlayer->getPositionY() - (this->bubblePlayer->getContentSize().height / 4);
		auto heights = this->bubblePlayer->getContentSize().width / 2;
		auto widths = this->bubblePlayer->getContentSize().height / 2;

		auto targetObject = Rect(this->targetPlayer->getPositionX() - (this->targetPlayer->getContentSize().width*size / 2) + (this->xPosi / 2), this->targetPlayer->getPositionY() - (this->targetPlayer->getContentSize().height*size / 2), this->targetPlayer->getContentSize().width*size, this->targetPlayer->getContentSize().height*size);
		auto playerObject = Rect(this->bubblePlayer->getPositionX() - (this->bubblePlayer->getContentSize().width / 4), this->bubblePlayer->getPositionY() - (this->bubblePlayer->getContentSize().height / 4), this->bubblePlayer->getContentSize().width / 2, this->bubblePlayer->getContentSize().height / 2);

		if (targetObject.intersectsRect(playerObject)) {
			this->shootingFlag = false;
			this->flagSingleTouchFirst = false;
			this->runAnimations(CSLoader::createNode(path), this->targetPlayer->getPositionX(), this->targetPlayer->getPositionY(), path);
			this->getChildByName("bg")->getChildByName("board")->setTag(0);
			this->bubblePlayer->setVisible(false);
			this->targetPlayer->setVisible(false);
			auto classReference = this;
			auto audioEngine = CocosDenshion::SimpleAudioEngine::getInstance();
			audioEngine->playEffect("sounds/sfx/pinata_select.ogg",false);

			auto checkGameCompleteOrNot = CallFunc::create([=]()
			{
				if (classReference->counterlevelStatus >= 4) {
					_menuContext->setMaxPoints(classReference->counterHit);
					_menuContext->showScore();
				}
				else {
					classReference->counterlevelStatus++;
					classReference->reCreateSceneElement();
					//_dummy = 1;
				}
			});

			this->runAction(Sequence::create(DelayTime::create(1.2),checkGameCompleteOrNot,DelayTime::create(1),NULL));
		}
	}
	//if (_dummy == 1 && LevelInfoForSpeaker()) {
	//	dummyTextLabelPopUp();
	//	_dummy = 0;
	//}
}

void Shoot::choosingListner() {
	
	auto classRefer = this;
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(false);

	listener->onTouchBegan = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		Size targetSize = target->getContentSize();
		auto location = target->convertToNodeSpace(touch->getLocation());
		Rect targetRect = Rect(0, 0, targetSize.width, targetSize.height);

		if (target->getBoundingBox().containsPoint(touch->getLocation()) && (classRefer->getChildByName("bg")->getChildByName("board")->getTag() == 0) && !classRefer->shootingFlag && classRefer->flagSingleTouchFirst) {

			if (classRefer->getChildByName("helpLayer")) {
				classRefer->removeChildByName("helpLayer");
			}

			classRefer->flagSingleTouchFirst = false;

			std::string path = "";

			if (classRefer->bubblePlayer->getName() == "pinatacity") {
				path = "pinatacity/pinatacityanim.csb";
			}
			else if (classRefer->bubblePlayer->getName() == "pinatacream") {
				path = "pinatacream/pinatacreamanim.csb";
			}
			else if (classRefer->bubblePlayer->getName() == "pinatajungle") {
				path = "jungle/target.csb";
			}
			auto boardText = classRefer->getChildByName("bg")->getChildByName("board")->getChildByName("board");

		//	auto stringmap = ((CommonLabelTTF *)boardText)->getString();
			if (checkAnswer(mapKey,((CommonLabelTTF *)target->getChildByName(target->getName()))->getString())) {

				auto targetA = classRefer->getChildByName("bg")->getChildByName("targeta");
				auto targetB = classRefer->getChildByName("bg")->getChildByName("targetb");
				auto targetC = classRefer->getChildByName("bg")->getChildByName("targetc");

				auto audioEngine = CocosDenshion::SimpleAudioEngine::getInstance();
				if (target->getName() == "targetc") {
					if (targetA->getTag() == 0) { classRefer->runAnimations(CSLoader::createNode(path), targetA->getPositionX(), targetA->getPositionY(), path); targetA->setVisible(false); }
					if (targetB->getTag() == 0) { classRefer->runAnimations(CSLoader::createNode(path), targetB->getPositionX(), targetB->getPositionY(), path); targetB->setVisible(false); }
					classRefer->targetXcoordSave = targetC->getPositionX();
					audioEngine->playEffect("sounds/sfx/pinata_select.ogg", false);
					classRefer->counterHit++;
					_menuContext->addPoints(2);
					classRefer->gamePlay(targetC);
				}
				else if (target->getName() == "targetb") {
					if (targetA->getTag() == 0) { classRefer->runAnimations(CSLoader::createNode(path), targetA->getPositionX(), targetA->getPositionY(), path); targetA->setVisible(false); }
					if (targetC->getTag() == 0) { classRefer->runAnimations(CSLoader::createNode(path), targetC->getPositionX(), targetC->getPositionY(), path); targetC->setVisible(false); }
					classRefer->targetXcoordSave = targetB->getPositionX();
					classRefer->gamePlay(targetB);
					audioEngine->playEffect("sounds/sfx/pinata_select.ogg", false);
					classRefer->counterHit++;
					_menuContext->addPoints(2);
				}
				else if (target->getName() == "targeta") {
					if (targetC->getTag() == 0) { classRefer->runAnimations(CSLoader::createNode(path), targetC->getPositionX(), targetC->getPositionY(), path); targetC->setVisible(false); }
					if (targetB->getTag() == 0) { classRefer->runAnimations(CSLoader::createNode(path), targetB->getPositionX(), targetB->getPositionY(), path); targetB->setVisible(false); }
					classRefer->targetXcoordSave = targetA->getPositionX();
					classRefer->gamePlay(targetA);
					audioEngine->playEffect("sounds/sfx/pinata_select.ogg", false);
					classRefer->counterHit++;
					_menuContext->addPoints(2);
				}

			}
			else {
				//    console.log("its wrong answer");
				auto targetA = (Node*)classRefer->getChildByName("bg")->getChildByName("targeta");
				auto targetB = (Node*)classRefer->getChildByName("bg")->getChildByName("targetb");
				auto targetC = (Node*)classRefer->getChildByName("bg")->getChildByName("targetc");

				if (target->getName() == "targetc") {
					if (targetC->getTag() == 0) {
						classRefer->counterHit++;
						_menuContext->addPoints(-1);
						classRefer->runAnimations(CSLoader::createNode(path), targetC->getPositionX(), targetC->getPositionY(), path);
						targetC->setVisible(false);
						auto audioEngine1 = CocosDenshion::SimpleAudioEngine::getInstance();
						audioEngine1->playEffect("sounds/sfx/pinata_select.ogg", false);
						auto audioEngine2 = CocosDenshion::SimpleAudioEngine::getInstance();
						audioEngine2->playEffect("sounds/sfx/pinata_select.ogg", false);
						targetC->setTag(1);
					}

				}
				else if (target->getName() == "targetb") {
					if (targetB->getTag() == 0) {
						classRefer->counterHit++;
						_menuContext->addPoints(-1);
						classRefer->runAnimations(CSLoader::createNode(path), targetB->getPositionX(), targetB->getPositionY(), path);
						targetB->setTag(1);
						auto audioEngine1 = CocosDenshion::SimpleAudioEngine::getInstance();
						audioEngine1->playEffect("sounds/sfx/pinata_select.ogg", false);
						auto audioEngine2 = CocosDenshion::SimpleAudioEngine::getInstance();
						audioEngine2->playEffect("sounds/sfx/pinata_select.ogg", false);
						targetB->setVisible(false);
					}

				}
				else if (target->getName() == "targeta") {
					if (targetA->getTag() == 0) {
						classRefer->counterHit++;
						_menuContext->addPoints(-1);
						classRefer->runAnimations(CSLoader::createNode(path), targetA->getPositionX(), targetA->getPositionY(), path);
						targetA->setTag(1);
						auto audioEngine1 = CocosDenshion::SimpleAudioEngine::getInstance();
						audioEngine1->playEffect("sounds/sfx/pinata_select.ogg", false);
						auto audioEngine2 = CocosDenshion::SimpleAudioEngine::getInstance();
						audioEngine2->playEffect("sounds/sfx/pinata_select.ogg", false);
						targetA->setVisible(false);

					}
				}

			//	if (LevelInfoForSpeaker())
			//		checkMistakeOnWord();
			}

			auto changeFlagInTouch = CallFunc::create([=]()
			{
				classRefer->flagSingleTouchFirst = true;
			});
			classRefer->runAction(Sequence::create(DelayTime::create(1), changeFlagInTouch, NULL));

			return false;
		}
		return false;
	};

	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, classRefer->getChildByName("bg")->getChildByName("targeta"));
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener->clone(), classRefer->getChildByName("bg")->getChildByName("targetb"));
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener->clone(), classRefer->getChildByName("bg")->getChildByName("targetc"));
}

bool Shoot::checkAnswer(string creamText, string coneText) {

	for (int i = 0; i < _vmc.size(); i++) {
		if (_vmc[i].question.compare(creamText) == 0) {
			if (_vmc[i].answers[_vmc[i].correctAnswer].compare(coneText) == 0) {
				return true;
			}
		}
	}
	return false;
}


void Shoot::bgListner() {
	auto classRefer = this;
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(false);

	listener->onTouchBegan = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		Size targetSize = target->getContentSize();
		auto location = target->convertToNodeSpace(touch->getLocation());
		Rect targetRect = Rect(0, 0, targetSize.width, targetSize.height);
		//target->getBoundingBox().containsPoint(touch->getLocation())
		if (classRefer->getChildByName("bg")->getChildByName("board")->getTag() == 1) {
			if (target->getBoundingBox().containsPoint(touch->getLocation())) {
				player.prevX = touch->getLocation().x;
				player.prevY = touch->getLocation().y;
				return true;
			}
		}
		return false;
	};

	listener->onTouchMoved = [=](cocos2d::Touch* touch, cocos2d::Event* event) {
		auto classReference = this;
		auto target = event->getCurrentTarget();
		
		classReference->checkBoundaryBall(target, touch);
		if (classReference->rightLine) {
			classReference->removeChild(classReference->rightLine);
		}
		classReference->rightLine = DrawNode::create();
		classReference->rightLine->drawSegment(Vec2((classReference->xPosi / 2) + classReference->getChildByName("bg")->getChildByName("right")->getPositionX(), classReference->getChildByName("bg")->getChildByName("right")->getPositionY()), Vec2(classReference->bubblePlayer->getPositionX() + (classReference->bubblePlayer->getContentSize().width / 2), classReference->bubblePlayer->getPositionY()),10,classReference->stringColor);
		classReference->addChild(classReference->rightLine);

		if (classReference->leftLine) {
			classReference->removeChild(classReference->leftLine);
		}
		classReference->leftLine = DrawNode::create();
		classReference->leftLine->drawSegment(Vec2((classReference->xPosi / 2) + classReference->getChildByName("bg")->getChildByName("left")->getPositionX(), classReference->getChildByName("bg")->getChildByName("left")->getPositionY()), Vec2(classReference->bubblePlayer->getPositionX() - (classReference->bubblePlayer->getContentSize().width / 2), classReference->bubblePlayer->getPositionY()),10,classReference->stringColor);
		classReference->addChild(classReference->leftLine);
		
		return true;

	};

	listener->onTouchEnded = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto classReference = this;

		auto prex = classReference->player.prevX;
		auto prey = classReference->player.prevY;
		auto currentX = touch->getLocation().x;
		auto currentY = touch->getLocation().y;
		auto playerdatay = classReference->player.y;
		auto playerdatax = classReference->player.x;

		auto angless = atan2((currentY - playerdatay), (-currentX + playerdatax));
		auto convertDegree = radToDeg(angless);

		classReference->player.angle = classReference->radToDeg(atan2((touch->getLocation().y - classReference->player.y), (-touch->getLocation().x + classReference->player.x)));
		auto angle = classReference->player.angle;
		classReference->player.prevX = abs(classReference->player.prevX - touch->getLocation().x);
		classReference->player.prevY = abs(classReference->player.prevY - touch->getLocation().y);


		if (classReference->rightLine) {
			classReference->removeChild(classReference->rightLine);
		}
		classReference->rightLine = DrawNode::create();
		classReference->rightLine->drawSegment(Vec2((classReference->xPosi / 2) + classReference->getChildByName("bg")->getChildByName("right")->getPositionX(), classReference->getChildByName("bg")->getChildByName("right")->getPositionY()), Vec2(classReference->player.x - 10, classReference->player.y),10,classReference->stringColor);
		classReference->addChild(classReference->rightLine);

		if (classReference->leftLine) {
			classReference->removeChild(classReference->leftLine);
		}
		classReference->leftLine = DrawNode::create();
		classReference->leftLine->drawSegment(Vec2((classReference->xPosi / 2) + classReference->getChildByName("bg")->getChildByName("left")->getPositionX(), classReference->getChildByName("bg")->getChildByName("left")->getPositionY()), Vec2(classReference->player.x + 10, classReference->player.y),10,classReference->stringColor);
		classReference->addChild(classReference->leftLine);

		if (classReference->player.prevY != 0 && classReference->player.prevX != 0) {
			classReference->shootingFlag = true;
			classReference->getChildByName("bg")->getChildByName("board")->setTag(0);
			classReference->soundReleaseBall = true;
			auto audioEngine = CocosDenshion::SimpleAudioEngine::getInstance();
			audioEngine->playEffect("sounds/sfx/ball_release_sound.ogg");
			if (!((abs(classReference->player.angle) < 175) && (abs(classReference->player.angle) > 5))) {
				//   console.log("the range is not correct ");

				auto againSetToOriginalPosition = CallFunc::create([=]()
				{
					classReference->bubblePlayer->setPosition(Vec2((classReference->xPosi / 2) + (classReference->getChildByName("bg")->getChildByName("left")->getPositionX() + classReference->getChildByName("bg")->getChildByName("right")->getPositionX()) / 2, classReference->getChildByName("bg")->getChildByName("right")->getPositionY()));
					classReference->player.x = classReference->bubblePlayer->getPositionX();    classReference->player.y = classReference->bubblePlayer->getPositionY();
					classReference->shootingFlag = false;
					classReference->getChildByName("bg")->getChildByName("board")->setTag(1);
				});
				classReference->runAction(Sequence::create(DelayTime::create(3), againSetToOriginalPosition,NULL));
			}
		}

		if (!classReference->shootingFlag && (classReference->getChildByName("bg")->getChildByName("board")->getTag() == 1)) {
			auto xPositionForBall = (classReference->xPosi / 2) + (classReference->getChildByName("bg")->getChildByName("left")->getPositionX() + classReference->getChildByName("bg")->getChildByName("right")->getPositionX()) / 2;
			auto yPositionForBall = classReference->getChildByName("bg")->getChildByName("right")->getPositionY();

			if (classReference->bubblePlayer->getPositionX() != xPositionForBall && classReference->bubblePlayer->getPositionY() != yPositionForBall) {
				auto ballTouchMovementAllow = CallFunc::create([=]()
				{
					classReference->isItinOriginalPosition = true;
				});
				classReference->isItinOriginalPosition = false;
				classReference->bubblePlayer->runAction(Sequence::create(MoveTo::create(0.2, Vec2(xPositionForBall, yPositionForBall)), ballTouchMovementAllow,NULL));
			}
		}
		auto xPositionForBall = (classReference->xPosi / 2) + (classReference->getChildByName("bg")->getChildByName("left")->getPositionX() + classReference->getChildByName("bg")->getChildByName("right")->getPositionX()) / 2;
		auto yPositionForBall = classReference->getChildByName("bg")->getChildByName("right")->getPositionY();
	};

	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, bubblePlayer);
}

void Shoot::reCreateSceneElement() {

	//dummyTextLabelPopUp();
	_gamePlay = 0;
	this->getChildByName("topBoard")->setVisible(true);
	
	mapKey = _vmc[counterlevelStatus].question;
	_correctAnswerVmc = _vmc[counterlevelStatus].answers[_vmc[counterlevelStatus].correctAnswer];

	vector<string> optionsFromVmc;
	for (int i = 0; i < _vmc[counterlevelStatus].answers.size() ; i++) {
		optionsFromVmc.push_back(_vmc[counterlevelStatus].answers[i]);
	}
	std::random_shuffle(optionsFromVmc.begin(), optionsFromVmc.end());

	auto optionValue = std::make_tuple(optionsFromVmc[0], optionsFromVmc[1], optionsFromVmc[2]);

	auto targetA = this->getChildByName("bg")->getChildByName("targeta");
	auto targetB = this->getChildByName("bg")->getChildByName("targetb");
	auto targetC = this->getChildByName("bg")->getChildByName("targetc");

	((CommonLabelTTF*)targetA->getChildByName(targetA->getName()))->setString(std::get<0>(optionValue));
	((CommonLabelTTF*)targetB->getChildByName(targetB->getName()))->setString(std::get<1>(optionValue));
	((CommonLabelTTF*)targetC->getChildByName(targetC->getName()))->setString(std::get<2>(optionValue));

	auto board = this->getChildByName("bg")->getChildByName("board");
	auto boardText = board->getChildByName(board->getName());
	((CommonLabelTTF*)boardText)->setString(this->mapKey);
	this->getChildByName("bg")->getChildByName("board")->setTag(0);
	///if(LevelInfoForSpeaker())
	//	boardText->setVisible(false);

	this->targetPlayer->setPositionX(this->targetXcoordSave);
	this->targetPlayer->getActionManager()->removeAllActions();

	this->targetPlayer->setScaleX(1);   this->targetPlayer->setScaleY(1);

	if (this->bubblePlayer->getName() == "pinatacream") {
		this->targetPlayer->setScaleX(1); this->targetPlayer->setScaleY(1);
		this->targetPlayer->setPositionY(this->targetYcoordSave - Director::getInstance()->getVisibleSize().height * 0.11);
	}
	if (this->bubblePlayer->getName() == "pinatajungle") {
		this->targetPlayer->setScaleX(1.2); this->targetPlayer->setScaleY(1.2);
		this->targetPlayer->setPositionY(this->targetYcoordSave - Director::getInstance()->getVisibleSize().height * 0.2);
	}
	if (this->bubblePlayer->getName() == "pinatacity") {
		this->targetPlayer->setScaleX(1); this->targetPlayer->setScaleY(1);
		this->targetPlayer->setPositionY(this->targetYcoordSave - Director::getInstance()->getVisibleSize().height * 0.1);
	}

	targetA->setVisible(true);   targetA->setTag(0);
	targetB->setVisible(true);   targetB->setTag(0);
	targetC->setVisible(true);   targetC->setTag(0);

	this->flagSingleTouchFirst = true;

	this->bubblePlayer->setPosition((this->xPosi / 2) + (this->getChildByName("bg")->getChildByName("left")->getPositionX() + this->getChildByName("bg")->getChildByName("right")->getPositionX()) / 2, this->getChildByName("bg")->getChildByName("right")->getPositionY());

	this->getChildByName("bg")->getChildByName("board")->setVisible(true);
	if (this->bubblePlayer->getName() == "pinatacream")
		this->getChildByName("bg")->getChildByName("Panel_2")->setVisible(true);

	this->bubblePlayer->setVisible(false);
	this->rightLine->setVisible(false);
	this->leftLine->setVisible(false);
	if (this->bubblePlayer->getName() == "pinatajungle") {
		this->getChildByName("bg")->getChildByName("rightshoot")->setVisible(false);
		this->getChildByName("bg")->getChildByName("leftshoot")->setVisible(false);
	}
	this->getChildByName("bg")->getChildByName("right")->setVisible(false);
	this->getChildByName("bg")->getChildByName("left")->setVisible(false);
	if (this->bubblePlayer->getName() == "pinatacity")
		this->getChildByName("bg")->getChildByName("slingshot_16")->setVisible(false);
	this->getChildByName("bg")->getChildByName("board")->setTag(0);

}

void Shoot::runAnimations(Node* AnimNode, int x, int y, std::string path) {

	auto animation = CSLoader::createTimeline(path);
	AnimNode->runAction(animation);
	animation->gotoFrameAndPlay(0, false);
	AnimNode->setPosition(Vec2(x + (xPosi / 2), y));
	addChild(AnimNode);
	auto classRefer = this;

	auto removeAnimaCallFunc = CallFunc::create([=]() 
	{
		classRefer->removeChild(AnimNode);
	});
	auto sequence = Sequence::create(DelayTime::create(0.8), removeAnimaCallFunc, NULL);
	this->runAction(sequence);
	auto ss = 20;
}

void Shoot::stateShootBubble(float dt) {

	auto currentx = this->bubblePlayer->getPositionX();
	auto currenttxangle = cos(this->degToRad(this->player.angle));
	auto currenty = this->bubblePlayer->getPositionY();
	auto currenttyangle = -1 * sin(this->degToRad(this->player.angle));
	auto angless = this->player.angle;
	auto radianAngle = this->degToRad(this->player.angle);
	auto addingy = ((1.0 / 60) * 2500 * -1 * sin(this->degToRad(this->player.angle)));
	auto addingx = ((1.0 / 60) * 2500 * cos(this->degToRad(this->player.angle)));
	
	auto nextY = this->bubblePlayer->getPositionY() + ((1.0f / 60.0f) * 2500 * -1 * sin(this->degToRad(this->player.angle)));
	auto nextX = this->bubblePlayer->getPositionX() + ((1.0f / 60.0f) * 2500 * cos(this->degToRad(this->player.angle)));
	this->bubblePlayer->setPositionX(nextX);
	this->bubblePlayer->setPositionY(nextY);
	
	if (this->bubblePlayer->getPositionX() < (this->bubblePlayer->getContentSize().width / 2)) {
		// Left edge
		this->player.angle = 180 - this->player.angle;
		auto audioEngine = CocosDenshion::SimpleAudioEngine::getInstance();
		audioEngine->playEffect("sounds/sfx/collide_ball_wall.ogg", false);
	}
	else if (this->bubblePlayer->getPositionX() > Director::getInstance()->getVisibleSize().width - (this->bubblePlayer->getContentSize().width / 2)) {
		// Right edge
		this->player.angle = 180 - this->player.angle;
		auto audioEngine = CocosDenshion::SimpleAudioEngine::getInstance();
		audioEngine->playEffect("sounds/sfx/collide_ball_wall.ogg", false);
	}
	if (this->bubblePlayer->getPositionY() > Director::getInstance()->getVisibleSize().height - (this->bubblePlayer->getContentSize().width / 2)) {
		// Top collision
		this->player.angle = 360 - this->player.angle;
		auto audioEngine = CocosDenshion::SimpleAudioEngine::getInstance();
		audioEngine->playEffect("sounds/sfx/collide_ball_wall.ogg", false);
	}
}

 void Shoot::gamePlay(Node* correctObject) {

	     _gamePlay = 1;
		 if (getChildByName("speaker")) {
				 if (getChildByName("speaker")->isVisible()) {
				 this->_wrongCounter = 0;
				 this->getChildByName("speaker")->setVisible(false);
				 this->getChildByName("bg")->getChildByName("board")->getChildByName("board")->stopAllActions();
			 }
		 }

		((Sprite*)this->getChildByName("topBoard"))->setVisible(false);
		float size = 0.5;
		if (bubblePlayer->getName() == "pinatacity") { size = 0.7; };
		if (bubblePlayer->getName() == "pinatajungle") { size = 1.0; };
		this->targetPlayer = correctObject;
		auto classReference = this;
	
		auto sequenceForRepeatMovement = CallFunc::create([=]()
		{
			auto  leftTOright = MoveTo::create(4, Vec2(((correctObject->getContentSize().width * size) / 2) - (classReference->xPosi / 2), Director::getInstance()->getVisibleSize().height * 0.85));
			auto  rightTOleft = MoveTo::create(4, Vec2(Director::getInstance()->getVisibleSize().width - (correctObject->getContentSize().width * size / 2) - (classReference->xPosi / 2), Director::getInstance()->getVisibleSize().height * 0.85));
			auto repeatForeverAction = RepeatForever::create(Sequence::create(rightTOleft, leftTOright,NULL));
			correctObject->runAction(repeatForeverAction);
		});
		auto SequenceVal = Sequence::create(ScaleTo::create(0.3, size), MoveTo::create(0.5, Vec2(Director::getInstance()->getVisibleSize().width / 2, Director::getInstance()->getVisibleSize().height * 0.85)), MoveTo::create(2, Vec2(((correctObject->getContentSize().width * size) / 2) - (xPosi / 2), Director::getInstance()->getVisibleSize().height * 0.85)), sequenceForRepeatMovement,NULL);
		correctObject->runAction(SequenceVal);

		this->getChildByName("bg")->getChildByName("board")->setVisible(false);
		if (bubblePlayer->getName() == "pinatacream")
		this->getChildByName("bg")->getChildByName("Panel_2")->setVisible(false);

		bubblePlayer->setVisible(true);
		rightLine->setVisible(true);
		leftLine->setVisible(true);
		if (bubblePlayer->getName() == "pinatajungle") {
			this->getChildByName("bg")->getChildByName("rightshoot")->setVisible(true);
			this->getChildByName("bg")->getChildByName("leftshoot")->setVisible(true);
		}
		this->getChildByName("bg")->getChildByName("right")->setVisible(true);
		this->getChildByName("bg")->getChildByName("left")->setVisible(true);
		if (bubblePlayer->getName() == "pinatacity")
		this->getChildByName("bg")->getChildByName("slingshot_16")->setVisible(true);

		auto changeFlagInTouchBoard = CallFunc::create([=]()
		{
			classReference->getChildByName("bg")->getChildByName("board")->setTag(1);
		});
		this->runAction(Sequence::create(DelayTime::create(0.8),changeFlagInTouchBoard,NULL));
}

void Shoot::checkBoundaryBall(Node* target, cocos2d::Touch* touch) {

	 if ((touch->getLocation().x >= (Director::getInstance()->getVisibleSize().width * 0.1)) && (touch->getLocation().x <= (Director::getInstance()->getVisibleSize().height * 0.05)) && (touch->getLocation().y <= (Director::getInstance()->getVisibleSize().height * 0.5))) {
		 target->setPosition(touch->getLocation());
			CCLOG("default if touch condition - 660");
	 }

	 if (touch->getLocation().x < (Director::getInstance()->getVisibleSize().width * 0.1)) {
		 if ((bubblePlayer->getPositionY() >= (Director::getInstance()->getVisibleSize().height * 0.05)) && (bubblePlayer->getPositionY() <= (Director::getInstance()->getVisibleSize().height * 0.5))) {
			 target->setPositionY(touch->getLocation().y);
			 CCLOG(" left X fixed , Y coordinate Changes if condition - 666");
		 }
	 }
	 if (touch->getLocation().x > (Director::getInstance()->getVisibleSize().width * 0.9)) {
		 if ((bubblePlayer->getPositionY() >= (Director::getInstance()->getVisibleSize().height * 0.05)) && (bubblePlayer->getPositionY() <= (Director::getInstance()->getVisibleSize().height * 0.5))) {
			 target->setPositionY(touch->getLocation().y);
			 CCLOG(" right X fixed , Y coordinate Changes if condition - 672");
		 }
	 }

	 if ((touch->getLocation().y > (Director::getInstance()->getVisibleSize().height * 0.05))) {
		 if ((touch->getLocation().x >= (Director::getInstance()->getVisibleSize().width * 0.1)) && (touch->getLocation().x <= (Director::getInstance()->getVisibleSize().width * 0.9))) {
			 target->setPositionX(touch->getLocation().x);
			 CCLOG(" bottom Y fixed , X coordinate changes if condition - 679");
		 }
	 }

	 if ((touch->getLocation().y < (Director::getInstance()->getVisibleSize().height * 0.5))) {
		 if ((touch->getLocation().x >= (Director::getInstance()->getVisibleSize().width * 0.1)) && (touch->getLocation().x <= (Director::getInstance()->getVisibleSize().width * 0.9))) {
			 target->setPosition(touch->getLocation());
			 CCLOG("CONDITION XXXX changes done here - 686");
		 }
 }

 if (touch->getLocation().y >= (Director::getInstance()->getVisibleSize().height * 0.5)) {
	 target->setPositionY(Director::getInstance()->getVisibleSize().height * 0.5);
	 CCLOG("CONDITION YYYY -  692");
 }
}

float Shoot::radToDeg(float angle) {
	return angle * (180.0f / M_PI);
}

float Shoot::degToRad(float angle) {
	return angle * (M_PI / 180.0f);
}

int Shoot::getRandomInt(int min, int max) {
	auto randomValue = floor(rand_0_1() * (max - min + 1)) + min;
	
	if (randomValue >= max)
		return max;
	if (randomValue <= min)
		return min;

	return  randomValue;
}

void Shoot::setSpriteProperties(Sprite* ImageObject, float positionX, float positionY, float scaleX, float scaleY, float anchorX, float anchorY, float rotation, int zorder) {
	ImageObject->setPosition(Vec2(positionX, positionY));
	ImageObject->setScaleX(scaleX);
	ImageObject->setScaleY(scaleY);
	ImageObject->setAnchorPoint(Vec2(anchorX, anchorY));
	ImageObject->setRotation(rotation);
	ImageObject->setZOrder(zorder);

	auto flagTest = shootingFlag;
	auto f = this->shootingFlag;
	auto flagTests = shootingFlag;
}

void Shoot::checkMistakeOnWord() {

	_wrongCounter++;

	if (_wrongCounter >= 2) {
		_wrongCounter = 0;
		auto boardText = getChildByName("bg")->getChildByName("board")->getChildByName("board");
		boardText->stopAllActions();
		popUpText();
	}
}

void Shoot::dummyTextLabelPopUp() {
	
	auto action1 = ScaleTo::create(0.2, 1.1);
	auto action2 = ScaleTo::create(0.2, 1);
	auto action3 = ScaleTo::create(0.2, 1.1);
	auto action4 = ScaleTo::create(0.2, 1);

	auto board = getChildByName("bg")->getChildByName("board");
	
	if (getChildByName("dummy")){
		getChildByName("dummy")->setVisible(true);
		((CommonLabelTTF*)getChildByName("dummy"))->setString(this->mapKey);
	}
	else {
		auto textLabel = CommonLabelTTF::create(this->mapKey, "res/fonts/BalooBhai-Regular.ttf", 120);
		textLabel->setPosition(board->getPositionX(), board->getPositionY());
		textLabel->setColor(board->getChildByName("board")->getColor());
		this->addChild(textLabel);
		textLabel->setName("dummy");
	}

	getChildByName("dummy")->runAction(Sequence::create(action1, action2, action3, action4, CallFunc::create([=]() {getChildByName("dummy")->setVisible(false);
		if (getChildByName("speaker"))
			getChildByName("speaker")->setVisible(true);

	}), NULL));

}

void Shoot::pronounceWord() {

	auto boardText = getChildByName("bg")->getChildByName("board")->getChildByName("board");
	auto size = boardText->getContentSize();

	if (getChildByName("speaker"))
		removeChildByName("speaker");

	auto speaker = Sprite::create("speaker/speaker.png");
	speaker->setPosition(Vec2(boardText->getParent()->getPositionX(), boardText->getParent()->getPositionY()));
	speaker->setScale(0.6);
	addChild(speaker, 1);
	speaker->setName("speaker");
	speaker->setTag(1);
	addEventsOnSpeaker(speaker);
	popUpText();
}

void Shoot::popUpText() {

	auto action1 = ScaleTo::create(0.2, 1.1);
	auto action2 = ScaleTo::create(0.2, 1);
	auto action3 = ScaleTo::create(0.2, 1.1);
	auto action4 = ScaleTo::create(0.2, 1);
	auto self = this;

	auto boardText = getChildByName("bg")->getChildByName("board")->getChildByName("board");

	auto scaleAction = Sequence::create(
		CallFunc::create([=]() {

		auto speaker = self->getChildByName("speaker");
		if (speaker) {
			boardText->setVisible(true);
			speaker->setVisible(false);
			speaker->setTag(0);
		}
	}),
		action1, action2, action3, action4, DelayTime::create(2),

		CallFunc::create([=]() {

		auto speaker = self->getChildByName("speaker");
		if (speaker && (_gamePlay == 0)) {
			boardText->setVisible(false);
			speaker->setVisible(true);
			speaker->setTag(1);
		}
	}),
		NULL);

	boardText->runAction(scaleAction);

}

Shoot::Shoot()
{
}

bool Shoot::LevelInfoForSpeaker() {

	int levelInfo[] = { 1,2,3,4,5,16,17,18,19,20,31,32,33,34,35,46,47,48,49,50,61,62,63,64,65 };
	auto lenght = sizeof(levelInfo) / sizeof(levelInfo[0]);
	for (int i = 0; i < lenght; i++) {
		if (_menuContext->getCurrentLevel() == levelInfo[i])
			return true;
	}
	return false;
}

void Shoot::addEventsOnSpeaker(cocos2d::Sprite* callerObject)
{
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(false);
	auto classRefer = this;
	listener->onTouchBegan = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		Size s = target->getContentSize();
		Rect rect = Rect(0, 0, s.width, s.height);
		if (target->getBoundingBox().containsPoint(touch->getLocation()) && target->getTag() == 1) {

			if (classRefer->getChildByName("helpLayer")) {
				classRefer->removeChildByName("helpLayer");
			}

			auto action1 = ScaleTo::create(0.1, 0.5);
			auto action2 = ScaleTo::create(0.1, 0.6);
			auto scaleAction = Sequence::create(action1, action2, NULL);
			target->runAction(scaleAction);

			_menuContext->pronounceWord(this->mapKey);

			return true;
		}
		return false;
	};

	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, callerObject);
}
Shoot::~Shoot(void)
{
    _eventDispatcher->removeCustomEventListeners("multipleChoiceQuiz");
	this->removeAllChildrenWithCleanup(true);
}
