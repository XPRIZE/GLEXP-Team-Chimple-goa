#include "EndlessRunner.h"
#include <vector>
#include "SpriteCreate.h"
#include "StartMenuScene.h"

#define COCOS2D_DEBUG 1

using namespace std;
USING_NS_CC;

Scene* EndlessRunner::createScene()
{
	Scene* scene = Scene::create();
	auto layer = EndlessRunner::create();
	scene->addChild(layer);
    layer->_menuContext = MenuContext::create(layer, EndlessRunner::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

EndlessRunner::~EndlessRunner(void)
{
	audioBg->stopAllEffects();
	this->removeAllChildrenWithCleanup(true);
}

bool EndlessRunner::init()
{
	if (!Layer::init()) { return false;}

	CCSpriteFrameCache* framecache1 = CCSpriteFrameCache::sharedSpriteFrameCache();
	framecache1->addSpriteFramesWithFile("endlessrunner/endlessrunner_01.plist");
	CCSpriteFrameCache* framecache2 = CCSpriteFrameCache::sharedSpriteFrameCache();
	framecache2->addSpriteFramesWithFile("endlessrunner/endlessrunner_02.plist");

	visibleSize = Director::getInstance()->getVisibleSize();
	origin = Director::getInstance()->getVisibleOrigin();
	tempChar = CharGenerator::getInstance()->generateAChar();
	letters = CharGenerator::getInstance()->generateMatrixForChoosingAChar(tempChar,21, 1,70);

	this->addChild(LayerGradient::create(Color4B(255, 255, 255, 255), Color4B(255, 255, 255, 255)), 0);

	EndlessRunner::addEvents(EndlessRunner::CreateSprites("endlessrunner/bgTouchImage.png", origin.x, origin.y, visibleSize.width, visibleSize.height, 0, "IMG"));
	leftBarrier = EndlessRunner::CreateSprites("endlessrunner/barrier.png", (visibleSize.width * -15 / 100) + origin.x, (visibleSize.height * 0) + origin.y, 1, 1, 0, "IMG");

	leftBarrierForBigObject = EndlessRunner::CreateSprites("endlessrunner/barrier.png", (visibleSize.width * -70 / 100) + origin.x, (visibleSize.height * 0) + origin.y, 1, 1, 0, "IMG");
	rightBarrier = EndlessRunner::CreateSprites("endlessrunner/barrier.png", (visibleSize.width * 120 / 100) + origin.x, (visibleSize.height * 0) + origin.y, 1, 1, 0, "IMG");
	upBarrier = EndlessRunner::CreateSprites("endlessrunner/bgTouchImage.png", origin.x, origin.y + (visibleSize.height * 110 / 100), visibleSize.width, 1, 0, "IMG");
	upBarrier->setAnchorPoint(Vec2(0, 1));

	Character.action = CSLoader::createTimeline("endlessrunner/main_char.csb");
	Character.character = (Sprite *)CSLoader::createNode("endlessrunner/main_char.csb");
	Character.character->setPosition(Vec2((visibleSize.width * 25 / 100) + origin.x,(int)(visibleSize.height * 11 / 100) + origin.y));
	this->addChild(Character.character, 11);
	Character.character->runAction(Character.action);
	Character.character->setScale(1.2);
	Character.action->play("run", true);
	Character.character->getChildByName("net")->setVisible(false);
	happyManAction = CSLoader::createTimeline("endlessrunner/happy_mad.csb");
	hpUiCatchAction = CSLoader::createTimeline("endlessrunner/catch_score.csb");
	
	auto rotate1 = CSLoader::createTimeline("endlessrunner/life.csb");
	auto rotate2 = CSLoader::createTimeline("endlessrunner/life.csb");
	auto rotate3 = CSLoader::createTimeline("endlessrunner/life.csb");
	auto rotate4 = CSLoader::createTimeline("endlessrunner/life.csb");
	auto rotate5 = CSLoader::createTimeline("endlessrunner/life.csb");

	hpUi = (Sprite *)CSLoader::createNode("endlessrunner/hp_ui.csb");
	hpUi->setPosition(Vec2((visibleSize.width * 0.005) + origin.x,(visibleSize.height + origin.y) - (visibleSize.height * 0.38)));
	hpUi->setScale(0.7);
	this->addChild(hpUi, 7);
	hpUi->runAction(hpUiCatchAction);
	hpUi->getChildByName("happy_mad")->setScale(1.2);
	hpUi->getChildByName("life_1")->runAction(rotate1);	rotate1->play("rotate", true);
	hpUi->getChildByName("life_2")->runAction(rotate2); rotate2->play("rotate", true);
	hpUi->getChildByName("life_3")->runAction(rotate3); rotate3->play("rotate", true);
	hpUi->getChildByName("life_4")->runAction(rotate4); rotate4->play("rotate", true);
	hpUi->getChildByName("life_5")->runAction(rotate5); rotate5->play("rotate", true);
	
	hpUi->runAction(happyManAction);
	happyManAction->play("happy_idle",true);

	auto boardDisplay = (Sprite *)CSLoader::createNode("endlessrunner/letter_board.csb");
	boardDisplay->setPosition(Vec2((visibleSize.width / 2) + origin.x, (visibleSize.height + origin.y) - (visibleSize.height * 0.07)));
	this->addChild(boardDisplay, 10);
	
	letterOnBoard =  Alphabet::createWithSize(tempChar, 300);
	letterOnBoard->setPosition(Vec2((visibleSize.width / 2) + origin.x,(visibleSize.height + origin.y) - (visibleSize.height * 0.07)));
	letterOnBoard->enableShadow(Color4B::BLACK, Size(8, -6), 5);
	this->addChild(letterOnBoard, 10);

	EndlessRunner::beforeInitBackgroundScene();
	EndlessRunner::sceneBackgroundFlow();

	SpriteCreate* mountain;
	int MountainRandomvalue = 0;
	int startPosition = origin.x;

	for (int i = 0; i <= 15; i++) {
		MountainRandomvalue = EndlessRunner::randmValueIncludeBoundery(0, (sizeof(mountainMidImages) / sizeof(mountainMidImages[0])) - 1);
		mountain = SpriteCreate::createSprite(mountainMidImages[MountainRandomvalue], startPosition, origin.y, 0, 0, "midLand", "midLand", "firstLayer");
		this->addChild(mountain, 9);
		mountain->setName("MidLand");

		if (i == 15) { mountain->setName("LastInit"); mountain->NextRockName = "endLand"; }
		startPosition = startPosition + mountain->getContentSize().width - LayerMode.tolerence;
		allPathBlocks.push_back(mountain);
		mountain->runAction(MoveTo::create(EndlessRunner::movingTime(mountain), Vec2((leftBarrier->getPosition().x), origin.y)));
		}
		
		setonEnterTransitionDidFinishCallback(CC_CALLBACK_0(EndlessRunner::startGame, this));
	
		return true;
}

void EndlessRunner::scheduleMethod() {
	Character.onAir = true;
	
	this->schedule(schedule_selector(EndlessRunner::sceneTree1Flow), 2.5f);
	this->schedule(schedule_selector(EndlessRunner::sceneTree2Flow), 1.4f);
	this->schedule(schedule_selector(EndlessRunner::CreateMonsterWithLetter), 6.0f);
	this->schedule(schedule_selector(EndlessRunner::addFirstBlockSecondLayer), randmValueIncludeBoundery(10,13));

	this->scheduleUpdate();
}

void EndlessRunner::startGame() {
	audioBg = CocosDenshion::SimpleAudioEngine::getInstance();
	audioBg->playEffect("endlessrunner/sound/african_drum.wav", true);
	_menuContext->showStartupHelp(CC_CALLBACK_0(EndlessRunner::scheduleMethod, this));
//	runAction(Sequence::create(CallFunc::create(CC_CALLBACK_0(MenuContext::showStartupHelp, _menuContext)), CallFunc::create(CC_CALLBACK_0(EndlessRunner::scheduleMethod, this)), NULL));
}

void EndlessRunner::update(float delta) {

	if (initBool) {
		for (std::size_t i = 0; i < allPathBlocks.size(); i++) {
			if (rightBarrier->getBoundingBox().intersectsRect(allPathBlocks[i]->getBoundingBox())) {
				if (allPathBlocks[i]->getName() == "LastInit") {
					currentFirstLayerRock = allPathBlocks[i];
					FirstLayerModes = 1;
					initBool = false;
				}
			}
		}
	}

	if (Character.onAir) {
		EndlessRunner::FallDownCharacter();
	}

	if (Character.stillCheckFalg) {
		EndlessRunner::stillCharacterOnPath(delta);
	}
	EndlessRunner::mountainLayer1();

	EndlessRunner::startingIntersectMode();

	EndlessRunner::removePathBlockTouchByLeftBarrier();
	
	if (counterAlphabets == 10 || counterLife == 1) {
		_menuContext->showScore();
	}
}

void EndlessRunner::FallDownCharacter() {
	Character.onAir = false;
	Character.stillCheckFalg = true;
	Character.fallingTime = Character.character->getPositionY() / 700;
	Character.fallDownAction = MoveTo::create(Character.fallingTime, Vec2(Character.character->getPositionX(), origin.y));
	Character.character->runAction(Character.fallDownAction);
	Character.groundTouchFlag = true;
}

void EndlessRunner::stillCharacterOnPath(float delta) {
	
	for (std::size_t i = 0; i < allPathBlocks.size(); i++) {
		
		auto box = Character.character->getChildByName("floor_2")->getBoundingBox();
		Rect parent = Character.character->getBoundingBox();
		Rect boxs = Rect(parent.origin.x + box.origin.x, parent.origin.y + box.origin.y, box.size.width*1.2, box.size.height*1.2);

		if (boxs.intersectsRect(allPathBlocks[i]->getBoundingBox())) {
			
			if (allPathBlocks[i]->LayerTypeName == "firstLayer") {
				Character.character->setPosition(Vec2((visibleSize.width * 25 / 100) + origin.x, (int)(visibleSize.height * 11 / 100) + origin.y + 15));
				if (Character.groundTouchFlag) {
					Character.groundTouchFlag = false;
					Character.Clicked = false;
					Character.character->stopAction(Character.fallDownAction);

					auto A = CallFunc::create([=]() {Character.action->play("jump_end", false); });

					auto B = CallFunc::create([=]() {Character.action->play("run", true);});

					auto main_Sequence = Sequence::create(A, B, NULL);
					Character.character->runAction(main_Sequence);
				}
				
			}
			else if (allPathBlocks[i]->LayerTypeName == "secondLayer") {
				Character.character->setPosition(Vec2((visibleSize.width * 25 / 100) + origin.x, (visibleSize.height * 23 / 100) + origin.y));

				if (Character.groundTouchFlag) {
					Character.groundTouchFlag = false;
					Character.Clicked = false;
					Character.character->stopAction(Character.fallDownAction);

					auto A = CallFunc::create([=]() {
						Character.action->play("jump_end", false);
					});

					auto B = CallFunc::create([=]() {
						Character.action->play("run", true);
					});

					auto main_Sequence = Sequence::create(A, B, NULL);
					Character.character->runAction(main_Sequence);
				}
			}
		}
		else {
			Character.character->setPositionY(Character.character->getPositionY() - (0.8));
		}
	}
}

void EndlessRunner::startingIntersectMode() {

	if (FirstLayerModes == LayerMode.FirstLayerRightIntersectMode) {
		if (!rightBarrier->getBoundingBox().intersectsRect(currentFirstLayerRock->getBoundingBox())) {
			int MountainRandomvalue = EndlessRunner::randmValueIncludeBoundery(0, (sizeof(mountainMidImages) / sizeof(mountainMidImages[0])) - 1);
			SpriteCreate* currentImage = SpriteCreate::createSprite(mountainMidImages[MountainRandomvalue], EndlessRunner::setPositionX(currentFirstLayerRock), 0 + origin.y, 0, 0, "midLand", "midLand", "firstLayer");
			this->addChild(currentImage, 9);
			allPathBlocks.push_back(currentImage);
			currentFirstLayerRock = currentImage;
			position = EndlessRunner::movingUpto(0);
			currentFirstLayerRock->runAction(MoveTo::create(EndlessRunner::movingTime(currentFirstLayerRock), Vec2(position.first, position.second)));
			FirstLayerModes = 1;
		}
	}
	
	if (SecondLayerModes == LayerMode.SecondLayerRightIntersectMode) {
		if (!rightBarrier->getBoundingBox().intersectsRect(currentSecondLayerRock->getBoundingBox())) {
			SecondLayerModes = 4;

			EndlessRunner::AddRocksInSecondLayerPath();
		}
	}

	for (std::size_t i = 0; i < allLabels.size(); i++) {

		auto box = Character.character->getChildByName("net")->getBoundingBox();
		Rect parent = Character.character->getBoundingBox();
		Rect netBoxs = Rect(parent.origin.x + (box.origin.x), parent.origin.y + (box.origin.y), box.size.width*1.2, box.size.height*1.2);

		Rect letteBox = allLabels[i]->getBoundingBox();
		Rect newLetterBox = Rect(letteBox.origin.x-30, letteBox.origin.y+(letteBox.size.height/2), letteBox.size.width,30);

		if (netBoxs.intersectsRect(newLetterBox))
		{
			auto mystr = LangUtil::convertUTF16CharToString(tempChar);
			if (allLabels[i]->getName() == mystr) {
				
				if (popUp) {
					auto highScale = CallFunc::create([=]() { happyManAction->play("happy_pop", false); });
					auto smallScale = CallFunc::create([=]() {happyManAction->play("happy_idle", true); });
					auto scaleVary = Sequence::create(highScale, DelayTime::create(1.3), smallScale, NULL);
					hpUi->getChildByName("happy_mad")->runAction(scaleVary);
				}
				else {
					popUp = false;
				}
				_menuContext->pickAlphabet(tempChar,allLabels[i]->getChar(), true);

				auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
				auto path = LangUtil::getInstance()->getAlphabetSoundFileName(allLabels[i]->getChar());
				audio->playEffect(path.c_str(), false);

				counterAlphabets = counterAlphabets + 1;
				std::ostringstream counterForLetter;	counterForLetter << counterAlphabets; std::string counterValue = counterForLetter.str();
				hpUiCatchAction->play(counterValue,false);
				hpUi->getChildByName("happy_mad")->setScale(1.2);
				if (!popUp) {
					auto highScale = CallFunc::create([=]() { happyManAction->play("change_mad_happy", false);});
					auto smallScale = CallFunc::create([=]() {happyManAction->play("happy_idle", true); });
					auto scaleVary = Sequence::create(highScale,DelayTime::create(1.3),smallScale,NULL);
					hpUi->getChildByName("happy_mad")->runAction(scaleVary);
					popUp = true;
				}
				for (std::size_t k = 0; k <allMonster.size(); k++) {
					if (allMonster[k]->getTag() == allLabels[i]->getTag()) {
						this->removeChild(allLabels[i]);
						allLabels.erase(allLabels.begin() + i);
						Character.action->play("correct_catch", false);
						allMonster[k]->getChildByName("monster_egg")->setVisible(false);
						hpUi->getChildByName("happy_mad")->getChildByName("happy")->setVisible(true);	
						hpUi->getChildByName("happy_mad")->getChildByName("mad")->setVisible(false);
						allMonster[k]->runAction(MoveBy::create(3, Vec2((visibleSize.width * 90 / 100) + origin.x, (visibleSize.height * 70 / 100) + origin.y)));
					}
				}
			}
			else {
				_menuContext->pickAlphabet(tempChar, allLabels[i]->getChar(), true);
				hpUi->getChildByName("happy_mad")->setScale(1);
				
				if (!popUp) {
					auto highScale = CallFunc::create([=]() { happyManAction->play("mad_pop", false); });
					auto smallScale = CallFunc::create([=]() {happyManAction->play("mad_idle", true); });
					auto scaleVary = Sequence::create(highScale, DelayTime::create(1.3), smallScale, NULL);
					hpUi->getChildByName("happy_mad")->runAction(scaleVary);
				}
				else {
					popUp = true;
				}

				auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
				auto path = LangUtil::getInstance()->getAlphabetSoundFileName(allLabels[i]->getChar());
				audio->playEffect(path.c_str(), false);
				if (popUp) {
					auto highScale = CallFunc::create([=]() { happyManAction->play("change_happy_mad", false); });
					auto smallScale = CallFunc::create([=]() {happyManAction->play("mad_idle", true); });
					auto scaleVary = Sequence::create(highScale, DelayTime::create(1.3), smallScale, NULL);
					hpUi->getChildByName("happy_mad")->runAction(scaleVary);
					popUp = false;
				}
				for (std::size_t k = 0; k <allMonster.size(); k++) {
					if (allMonster[k]->getTag() == allLabels[i]->getTag()) {

						Character.action->play("worng_catch", false);
						this->removeChild(allLabels[i]);
						allLabels.erase(allLabels.begin() + i);
						hpUi->getChildByName("happy_mad")->getChildByName("mad")->setVisible(true);
						hpUi->getChildByName("happy_mad")->getChildByName("happy")->setVisible(false);
						allMonster[k]->getChildByName("monster_egg")->setVisible(false);
						allMonster[k]->getChildByName("monster_egg_crack")->setVisible(true);
						allMonster[k]->runAction(MoveBy::create(3, Vec2((visibleSize.width * 90 / 100) + origin.x, (visibleSize.height * 70 / 100) + origin.y)));
					}
				}
			}
		}
	}
	if (flagLifeDemo) {
		for (std::size_t i = 0; i < allBeforeStartBlocks.size(); i++) {
			
			auto box = Character.character->getChildByName("floor_3")->getBoundingBox();
			Rect parent = Character.character->getBoundingBox();
			Rect boxs = Rect(parent.origin.x + (box.origin.x), parent.origin.y + (box.origin.y), box.size.width, box.size.height);

			if (boxs.intersectsRect(allBeforeStartBlocks[i]->getBoundingBox())) {
				flagLifeDemo = false;
				counterLife = counterLife - 1;
				std::ostringstream sstreamc; sstreamc << "life_" << counterLife; std::string counterLife = sstreamc.str();
				hpUi->getChildByName(counterLife)->stopAllActions();
				hpUi->getChildByName(counterLife)->getChildByName("life_on")->setVisible(false);
				hpUi->getChildByName(counterLife)->getChildByName("life_off")->setVisible(true);
				auto upVisible = CallFunc::create([=]() {
					Character.character->setVisible(false);
				});
				auto blink = Blink::create(1.2, 10);
				auto visible = CallFunc::create([=]() {
					Character.character->setVisible(true);
					flagLifeDemo = true;
				});
				auto blinking = Sequence::create(upVisible,DelayTime::create(0.3),blink, visible, NULL);
				Character.character->runAction(blinking);
				CCLOG("INTERSET MAN");
			}
		}
	}
}

void EndlessRunner::sceneBackgroundFlow() {
	//Sprite Background for start the infinite flow .....
	currentlayer1Sprite = EndlessRunner::CreateSprites("endlessrunner/layer_1_mountain.png", rightBarrier->getPosition().x - LayerMode.tolerence, (int)((visibleSize.height * 18 / 100) + origin.y), 1, 1, 1, "bgElement");
	currentlayer1Sprite->runAction(MoveTo::create(EndlessRunner::movingTimes(currentlayer1Sprite, 100), Vec2(leftBarrierForBigObject->getPosition().x, (int)((visibleSize.height * 18 / 100) + origin.y))));

	currentlayer2Sprite = EndlessRunner::CreateSprites("endlessrunner/layer_2_mountain.png", 0, (int)((visibleSize.height * 15 / 100) + origin.y), 1, 1, 2, "bgElement");
	currentlayer2Sprite->setPositionX(rightBarrier->getPosition().x - LayerMode.tolerence - currentlayer2Sprite->getContentSize().width / 3);
	currentlayer2Sprite->runAction(MoveTo::create(EndlessRunner::movingTimes(currentlayer2Sprite, 230), Vec2(leftBarrierForBigObject->getPosition().x, (int)((visibleSize.height * 15 / 100) + origin.y))));

	currentlayer3Sprite = EndlessRunner::CreateSprites("endlessrunner/layer_3_bush.png", 0, (int)((visibleSize.height * 13 / 100) + origin.y), 1, 1, 3, "bgElement");
	currentlayer3Sprite->setPositionX(rightBarrier->getPosition().x - LayerMode.tolerence - currentlayer3Sprite->getContentSize().width / 3);
	currentlayer3Sprite->runAction(MoveTo::create(EndlessRunner::movingTimes(currentlayer3Sprite, 230), Vec2(leftBarrierForBigObject->getPosition().x, (int)((visibleSize.height * 13 / 100) + origin.y))));

	currentlayer5Sprite = EndlessRunner::CreateSprites("endlessrunner/layer_5_bush.png", 0, (int)((visibleSize.height * 7 / 100) + origin.y), 1, 1, 5, "bgElement");
	currentlayer5Sprite->setPositionX(rightBarrier->getPosition().x - LayerMode.tolerence - currentlayer5Sprite->getContentSize().width / 3);
	currentlayer5Sprite->runAction(MoveTo::create(EndlessRunner::movingTimes(currentlayer5Sprite, 260), Vec2(leftBarrierForBigObject->getPosition().x, (int)((visibleSize.height * 7 / 100) + origin.y))));

	currentlayer7Sprite = EndlessRunner::CreateSprites("endlessrunner/layer_7_bush.png", 0, (int)((visibleSize.height * 0 / 100) + origin.y), 1, 1, 7, "bgElement");
	currentlayer7Sprite->setPositionX(rightBarrier->getPosition().x - LayerMode.tolerence - currentlayer5Sprite->getContentSize().width / 3);
	currentlayer7Sprite->runAction(MoveTo::create(EndlessRunner::movingTimes(currentlayer7Sprite, 400), Vec2(leftBarrierForBigObject->getPosition().x, (int)((visibleSize.height * 0 / 100) + origin.y))));
}

void EndlessRunner::mountainLayer1() {
	//Endless Monutain Running Code 
	if (!rightBarrier->getBoundingBox().intersectsRect(currentlayer1Sprite->getBoundingBox())) {
		int xSizeIndexRange = EndlessRunner::randmValueIncludeBoundery(0, 6);
		auto layer1Mountain = EndlessRunner::CreateSprites("endlessrunner/layer_1_mountain.png", rightBarrier->getPosition().x - LayerMode.tolerence, (int)((visibleSize.height * 18 / 100) + origin.y), xSizeArray[xSizeIndexRange], 1, 1, "bgElement");
		currentlayer1Sprite = layer1Mountain;
		currentlayer1Sprite->runAction(MoveTo::create(EndlessRunner::movingTimes(currentlayer1Sprite, 100), Vec2(leftBarrierForBigObject->getPosition().x, (int)((visibleSize.height * 18 / 100) + origin.y))));
	}

	if (!rightBarrier->getBoundingBox().intersectsRect(currentlayer2Sprite->getBoundingBox())) {
		int xSizeIndexRange = EndlessRunner::randmValueIncludeBoundery(0, 6);
		auto layer2Mountain = EndlessRunner::CreateSprites("endlessrunner/layer_2_mountain.png", rightBarrier->getPosition().x - LayerMode.tolerence, (int)((visibleSize.height * 15 / 100) + origin.y), xSizeArray[xSizeIndexRange], 1, 2, "bgElement");
		currentlayer2Sprite = layer2Mountain;
		currentlayer2Sprite->runAction(MoveTo::create(EndlessRunner::movingTimes(currentlayer2Sprite, 230), Vec2(leftBarrierForBigObject->getPosition().x, (int)((visibleSize.height * 15 / 100) + origin.y))));
	}

	if (!rightBarrier->getBoundingBox().intersectsRect(currentlayer3Sprite->getBoundingBox())) {
		auto layer3bush = EndlessRunner::CreateSprites("endlessrunner/layer_3_bush.png", rightBarrier->getPosition().x - LayerMode.tolerence, (int)((visibleSize.height * 13 / 100) + origin.y), 1, 1, 3, "bgElement");
		currentlayer3Sprite = layer3bush;
		currentlayer3Sprite->runAction(MoveTo::create(EndlessRunner::movingTimes(currentlayer3Sprite, 230), Vec2(leftBarrierForBigObject->getPosition().x, (int)((visibleSize.height * 13 / 100) + origin.y))));
	}

	if (!rightBarrier->getBoundingBox().intersectsRect(currentlayer5Sprite->getBoundingBox())) {
		auto layer5bush = EndlessRunner::CreateSprites("endlessrunner/layer_5_bush.png", rightBarrier->getPosition().x - LayerMode.tolerence, (int)((visibleSize.height * 7 / 100) + origin.y), 1, 1, 5, "bgElement");
		currentlayer5Sprite = layer5bush;
		currentlayer5Sprite->runAction(MoveTo::create(EndlessRunner::movingTimes(currentlayer5Sprite, 260), Vec2(leftBarrierForBigObject->getPosition().x, (int)((visibleSize.height * 7 / 100) + origin.y))));
	}

	if (!rightBarrier->getBoundingBox().intersectsRect(currentlayer7Sprite->getBoundingBox())) {
		auto layer7bush = EndlessRunner::CreateSprites("endlessrunner/layer_7_bush.png", rightBarrier->getPosition().x - LayerMode.tolerence, (int)((visibleSize.height * 0 / 100) + origin.y), 1, 1, 7, "bgElement");
		currentlayer7Sprite = layer7bush;
		currentlayer7Sprite->runAction(MoveTo::create(EndlessRunner::movingTimes(currentlayer7Sprite, 400), Vec2(leftBarrierForBigObject->getPosition().x, (int)((visibleSize.height * 0 / 100) + origin.y))));
	}
}

void EndlessRunner::sceneTree1Flow(float dt) {
	int MountainRandomvalue = EndlessRunner::randmValueIncludeBoundery(0, (sizeof(treeLayer4) / sizeof(treeLayer4[0])) - 1);
	auto layer4tree = EndlessRunner::CreateSprites(treeLayer4[MountainRandomvalue], rightBarrier->getPosition().x, (int)((visibleSize.height * 10 / 100) + origin.y), 1, 1, 4, "bgElement");
	layer4tree->runAction(MoveTo::create(EndlessRunner::movingTimes(layer4tree, 260), Vec2(leftBarrierForBigObject->getPosition().x, (int)((visibleSize.height * 10 / 100) + origin.y))));
}

void EndlessRunner::sceneTree2Flow(float dt) {
	int MountainRandomvalue = EndlessRunner::randmValueIncludeBoundery(0, (sizeof(treeLayer6) / sizeof(treeLayer6[0])) - 1);
	auto layer6tree = EndlessRunner::CreateSprites(treeLayer6[MountainRandomvalue], rightBarrier->getPosition().x, (int)((visibleSize.height * 4 / 100) + origin.y), 1, 1, 6, "bgElement");
	layer6tree->runAction(MoveTo::create(EndlessRunner::movingTimes(layer6tree, 400), Vec2(leftBarrierForBigObject->getPosition().x, (int)((visibleSize.height * 4 / 100) + origin.y))));
}

void EndlessRunner::beforeInitBackgroundScene() {

	int newtolerence = 0;

	auto layer0ground = EndlessRunner::CreateSprites("endlessrunner/ground.png", origin.x, origin.y, visibleSize.width, 1, 0, "none");

	for (int i = 0; i < 3; i++) {
		newtolerence = newtolerence + (LayerMode.tolerence);
		auto layer1mountain = EndlessRunner::CreateSprites("endlessrunner/layer_1_mountain.png", origin.x, origin.y, 1, 1, 1, "bgElement");
		layer1mountain->setPosition(Vec2(origin.x + (layer1mountain->getContentSize().width * i) - newtolerence - layer1mountain->getContentSize().width / 2, (int)((visibleSize.height * 18 / 100) + origin.y)));
		layer1mountain->runAction(MoveTo::create(EndlessRunner::movingTimes(layer1mountain, 100), Vec2(leftBarrierForBigObject->getPosition().x, (int)((visibleSize.height * 18 / 100) + origin.y))));
		if (i == 2) { layer1mountain->setScaleX(1.5); }
	}
	newtolerence = 0;
	for (int i = 0; i < 2; i++) {
		newtolerence = newtolerence + (LayerMode.tolerence);
		auto layer2mountain = EndlessRunner::CreateSprites("endlessrunner/layer_2_mountain.png", origin.x, origin.y, 1, 1, 2, "bgElement");
		layer2mountain->setPosition(Vec2(origin.x + (layer2mountain->getContentSize().width * i) - newtolerence, (int)((visibleSize.height * 15 / 100) + origin.y)));
		layer2mountain->runAction(MoveTo::create(EndlessRunner::movingTimes(layer2mountain, 230), Vec2(leftBarrierForBigObject->getPosition().x, (int)((visibleSize.height * 15 / 100) + origin.y))));
		if (i == 1) { layer2mountain->setScaleX(1.5); }
	}

	newtolerence = 0;
	for (int i = 0; i < 2; i++) {
		newtolerence = newtolerence + (LayerMode.tolerence * 2);
		auto layer3 = EndlessRunner::CreateSprites("endlessrunner/layer_3_bush.png", origin.x, origin.y, 1, 1, 3, "bgElement");
		layer3->setPosition(Vec2(origin.x + (layer3->getContentSize().width * i) - newtolerence, (int)((visibleSize.height * 13 / 100) + origin.y)));
		layer3->runAction(MoveTo::create(EndlessRunner::movingTimes(layer3, 230), Vec2(leftBarrierForBigObject->getPosition().x, (int)((visibleSize.height * 13 / 100) + origin.y))));
		if (i == 1) { layer3->setScaleX(1.5); }
	}
	newtolerence = 0;
	for (int i = 0; i < 4; i++) {
		auto layer4 = EndlessRunner::CreateSprites(treeLayer4[2], origin.x, origin.y, 1, 1, 4, "bgElement");
		newtolerence = newtolerence + (LayerMode.tolerence);
		layer4->setPosition(Vec2(origin.x + (layer4->getContentSize().width * i) - newtolerence, (int)((visibleSize.height * 10 / 100) + origin.y)));
		layer4->runAction(MoveTo::create(EndlessRunner::movingTimes(layer4, 260), Vec2(leftBarrierForBigObject->getPosition().x, (int)((visibleSize.height * 10 / 100) + origin.y))));
	}
	newtolerence = 0;
	for (int i = 0; i < 2; i++) {
		auto layer5 = EndlessRunner::CreateSprites("endlessrunner/layer_5_bush.png", origin.x, origin.y, 1, 1, 5, "bgElement");
		newtolerence = newtolerence + (LayerMode.tolerence * 2);
		layer5->setPosition(Vec2(origin.x + (layer5->getContentSize().width * i) - newtolerence, (int)((visibleSize.height * 7 / 100) + origin.y)));
		layer5->runAction(MoveTo::create(EndlessRunner::movingTimes(layer5, 260), Vec2(leftBarrierForBigObject->getPosition().x, (int)((visibleSize.height * 7 / 100) + origin.y))));
		if (i == 1) { layer5->setScaleX(1.5); }
	}
	newtolerence = 0;
	for (int i = 0; i < 4; i++) {
		auto layer6 = EndlessRunner::CreateSprites(treeLayer6[0], origin.x, origin.y, 1, 1, 6, "bgElement");
		layer6->setPosition(Vec2(origin.x + (layer6->getContentSize().width * i), (int)((visibleSize.height * 4 / 100) + origin.y)));
		layer6->runAction(MoveTo::create(EndlessRunner::movingTimes(layer6, 400), Vec2(leftBarrierForBigObject->getPosition().x, (int)((visibleSize.height * 4 / 100) + origin.y))));
	}
	newtolerence = 0;
	for (int i = 0; i < 2; i++) {
		auto layer7 = EndlessRunner::CreateSprites("endlessrunner/layer_7_bush.png", origin.x, origin.y, 1, 1, 7, "bgElement");
		newtolerence = newtolerence + (LayerMode.tolerence * 2);
		layer7->setPosition(Vec2(origin.x + (layer7->getContentSize().width * i) - newtolerence, (int)((visibleSize.height * 0 / 100) + origin.y)));
		layer7->runAction(MoveTo::create(EndlessRunner::movingTimes(layer7, 400), Vec2(leftBarrierForBigObject->getPosition().x, (int)((visibleSize.height * 0 / 100) + origin.y))));
		if (i == 1) { layer7->setScaleX(1.5); }
	}
}

void EndlessRunner::AddRocksInFirstLayerPath() {

	if (currentFirstLayerRock->NextRockName == "midLand") {
		int MountainRandomvalue = EndlessRunner::randmValueIncludeBoundery(0, (sizeof(mountainMidImages) / sizeof(mountainMidImages[0])) - 1);
		SpriteCreate* currentImage = SpriteCreate::createSprite(mountainMidImages[MountainRandomvalue], EndlessRunner::setPositionX(currentFirstLayerRock), 0 + origin.y, 0, 0, "midLand", "", "firstLayer");
		this->addChild(currentImage, 9);
		allPathBlocks.push_back(currentImage);
		currentFirstLayerRock = currentImage;
		position = EndlessRunner::movingUpto(0);
		currentFirstLayerRock->runAction(MoveTo::create(EndlessRunner::movingTime(currentFirstLayerRock), Vec2(position.first, position.second)));
		FirstLayerModes = 1;

	}
}

void EndlessRunner::addFirstBlockSecondLayer(float dt) {
	if (startSecondFlag) {
		SpriteCreate* newSprite = EndlessRunner::addUpperLayerStartSpriteRock(currentFirstLayerRock, "secondLayer", (int)(visibleSize.height * 11 / 100) + origin.y, 10, 0);
		currentSecondLayerRock = newSprite;
		currentSecondLayerRock->runAction(MoveTo::create(EndlessRunner::movingTime(currentSecondLayerRock), Vec2(leftBarrier->getPosition().x + origin.x, (int)(visibleSize.height * 11 / 100) + origin.y)));
		SecondLayerModes = 2;
		int midValue[8] = {10,3,5,1,6,8,2,9};
		SecondLayerCounterMidObjectValue = midValue[randmValueIncludeBoundery(0,7)];
		startSecondFlag = false;
	}
}
void EndlessRunner::AddRocksInSecondLayerPath() {
	
	if (currentSecondLayerRock->NextRockName == "endLand") {
		SpriteCreate* currentImage = SpriteCreate::createSprite("endlessrunner/path_right_lands.png", EndlessRunner::setPositionX(currentSecondLayerRock), (int)(visibleSize.height * 11 / 100) + origin.y, 0, 0, "endLand","", "secondLayer");
		this->addChild(currentImage, 10);
		allPathBlocks.push_back(currentImage);
		currentSecondLayerRock = currentImage;
		currentSecondLayerRock->runAction(MoveTo::create(EndlessRunner::movingTime(currentSecondLayerRock), Vec2(leftBarrier->getPosition().x + origin.x, (int)(visibleSize.height * 11 / 100) + origin.y)));
		startSecondFlag = true;
	}

	if (currentSecondLayerRock->NextRockName == "midLand") {
		int MountainRandomvalue = randmValueIncludeBoundery(0, (sizeof(mountainMidImages) / sizeof(mountainMidImages[0])) - 1);

		SpriteCreate* currentImage = SpriteCreate::createSprite(mountainMidImages[MountainRandomvalue], EndlessRunner::setPositionX(currentSecondLayerRock), (int)(visibleSize.height * 11 / 100) + origin.y, 0, 0, "midLand", "", "secondLayer");
		this->addChild(currentImage, 10);
		allPathBlocks.push_back(currentImage);

		if (SecondLayerCounterMidObjectValue > SecondLayerCounterMid) {
			currentImage->NextRockName = "midLand";
		}
		else {
			currentImage->NextRockName = "endLand";
			SecondLayerCounterMid = 0;
		}
		SecondLayerModes = 2;
		SecondLayerCounterMid++;
		currentSecondLayerRock = currentImage;
		currentSecondLayerRock->runAction(MoveTo::create(EndlessRunner::movingTime(currentSecondLayerRock), Vec2(leftBarrier->getPosition().x + origin.x, (int)(visibleSize.height * 11 / 100) + origin.y)));
	}
}

Sprite* EndlessRunner::CreateSprites(std::string name, int PositionX, int positionY, float scaleX, float scaleY, int zOrder, std::string vectorType) {
	Sprite* sprite = Sprite::createWithSpriteFrameName(name);
	sprite->setPosition(Vec2(PositionX, positionY));
	sprite->setAnchorPoint(Vec2(0, 0));
	sprite->setScaleX(scaleX);
	sprite->setScaleY(scaleY);
	this->addChild(sprite, zOrder);

	if (vectorType == "bgElement") {
		allSceneObject.push_back(sprite);
	}
	if (vectorType == "blinkBlock") {
		allBeforeStartBlocks.push_back(sprite);
	}
	return sprite;
}

SpriteCreate* EndlessRunner::addUpperLayerStartSpriteRock(SpriteCreate* SpriteObject, std::string MountainType, int positionY, int zOrder, int xCordinateforBlankSpace) {
	SpriteCreate* currentImage = SpriteCreate::createSprite("endlessrunner/path_left_lands.png", EndlessRunner::setPositionX(SpriteObject), positionY, 0, 0, "startLand", "midLand", MountainType);
	this->addChild(currentImage, zOrder);
	allPathBlocks.push_back(currentImage);
	auto extra = EndlessRunner::CreateSprites("endlessrunner/bgTouchImage.png", EndlessRunner::setPositionX(SpriteObject), positionY, 10, 20, 11, "blinkBlock");
	extra->runAction(MoveTo::create(EndlessRunner::movingTime(currentImage), Vec2(leftBarrier->getPosition().x + origin.x, positionY)));
	extra->setVisible(false);
	return currentImage;
}

float EndlessRunner::movingTime(SpriteCreate* SpriteObject) {
	if (leftBarrier->getPosition().x < 0) { return ((SpriteObject->getPosition().x + std::abs(leftBarrier->getPosition().x)) / LayerMode.PathMovingSpeed); }
	return ((SpriteObject->getPosition().x - std::abs(leftBarrier->getPosition().x)) / LayerMode.PathMovingSpeed);
}

float EndlessRunner::movingTimes(Sprite* SpriteObject, int Speed) {
	if (leftBarrierForBigObject->getPosition().x < 0) { return ((SpriteObject->getPosition().x + std::abs(leftBarrierForBigObject->getPosition().x)) / Speed); }
	return ((SpriteObject->getPosition().x - std::abs(leftBarrierForBigObject->getPosition().x)) / Speed);
}

std::pair<float, float> EndlessRunner::movingUpto(float positionY) {
	return std::make_pair((leftBarrier->getPosition().x + origin.x), (visibleSize.height * positionY) + origin.y);
}

float EndlessRunner::setPositionX(SpriteCreate* SpriteObject) {
	return (SpriteObject->getPosition().x + SpriteObject->getContentSize().width - LayerMode.tolerence);
}

int EndlessRunner::randmValueIncludeBoundery(int min, int max) {
	int maxValue = max, minValue = min;
	if (min > max) { maxValue = min;  minValue = max; }
	else if (min == max) { return min; }
	return (rand() % (maxValue - minValue + 1) + minValue);
}

void EndlessRunner::removePathBlockTouchByLeftBarrier() {
	for (std::size_t i = 0; i < allPathBlocks.size(); i++) {
		if (allPathBlocks[i]->getBoundingBox().intersectsRect(leftBarrier->getBoundingBox()))
		{
			this->removeChild(allPathBlocks[i]);
			allPathBlocks.erase(allPathBlocks.begin() + i);
		}
	}
	for (std::size_t i = 0; i < allSceneObject.size(); i++) {
		if (allSceneObject[i]->getBoundingBox().intersectsRect(leftBarrierForBigObject->getBoundingBox()))
		{
			this->removeChild(allSceneObject[i]);
			allSceneObject.erase(allSceneObject.begin() + i);
		}
	}
	for (std::size_t i = 0; i < allLabels.size(); i++) {
		if (allLabels[i]->getBoundingBox().intersectsRect(leftBarrier->getBoundingBox()))
		{
			this->removeChild(allLabels[i]);
			allLabels.erase(allLabels.begin() + i);
		}
	}
	for (std::size_t i = 0; i <allMonster.size(); i++) {
		if (allMonster[i]->getBoundingBox().intersectsRect(upBarrier->getBoundingBox()) || allMonster[i]->getBoundingBox().intersectsRect(leftBarrier->getBoundingBox()))
		{
			this->removeChild(allMonster[i]);
			allMonster.erase(allMonster.begin() + i);
		}
	}

	for (std::size_t i = 0; i < allBeforeStartBlocks.size(); i++) {
		if (allBeforeStartBlocks[i]->getBoundingBox().intersectsRect(leftBarrier->getBoundingBox()))
		{
			this->removeChild(allBeforeStartBlocks[i]);
			allBeforeStartBlocks.erase(allBeforeStartBlocks.begin() + i);
		}
	}
}

void EndlessRunner::CreateMonsterWithLetter(float dt) {

	cocostudio::timeline::ActionTimeline* timeline;
	Sprite* monsterImage;
	int switchMonster = EndlessRunner::randmValueIncludeBoundery(0, 1);
	if (switchMonster == 0) {
		timeline = CSLoader::createTimeline("endlessrunner/monster_yellow.csb");
		monsterImage = (Sprite *)CSLoader::createNode("endlessrunner/monster_yellow.csb");
	}
	else {
		timeline = CSLoader::createTimeline("endlessrunner/monster_red.csb");
		monsterImage = (Sprite *)CSLoader::createNode("endlessrunner/monster_red.csb");
	}
	auto nameLand = currentFirstLayerRock->currentRockName;
	monsterImage->setScale(1.175);
	Rect box = monsterImage->getChildByName("monster_egg")->getBoundingBox();

	monsterImage->runAction(timeline);  timeline->gotoFrameAndPlay(0);
	
	auto str = letters.at(counterLetter).at(0);
	counterLetter++;
	if (counterLetter == 21) {
		letters = CharGenerator::getInstance()->generateMatrixForChoosingAChar(tempChar, 21, 1, 70);
		counterLetter = 0;
	}
	auto mystr = LangUtil::convertUTF16CharToString(str);
	auto label = Alphabet::createWithSize(str,300);
	label->setName(mystr);
	label->enableShadow(Color4B::BLACK, Size(8, -6), 5);
	label->setTag(Character.uniqueId);
	monsterImage->setTag(Character.uniqueId);

	if (!startSecondFlag) {
		monsterImage->setPosition(Vec2(rightBarrier->getPosition().x, (visibleSize.height * 58.8 / 100) + origin.y));
	}
	else if (FirstLayerModes == LayerMode.FirstLayerRightIntersectMode) {
		monsterImage->setPosition(Vec2(rightBarrier->getPosition().x, (visibleSize.height * 47.3 / 100) + origin.y));
		if (nameLand == "endLand") {
			monsterImage->setPositionX(rightBarrier->getPosition().x - 500); }
	}
	else {
		monsterImage->setPosition(Vec2(rightBarrier->getPosition().x, (visibleSize.height * 47 / 100) + origin.y));
	}
	auto parent = monsterImage->getBoundingBox();
	auto boxs = Rect(parent.origin.x + (box.origin.x), parent.origin.y + (box.origin.y), box.size.width, box.size.height);
	label->setPosition(Vec2(boxs.origin.x + (box.size.width / 2), boxs.origin.y + (box.size.height / 2)+20));

	this->addChild(monsterImage, 9);
	this->addChild(label, 9);
	monsterImage->runAction(MoveTo::create((monsterImage->getPosition().x + std::abs(leftBarrier->getPosition().x)) / LayerMode.PathMovingSpeed, Vec2(leftBarrier->getPosition().x + origin.x, monsterImage->getPosition().y)));
	label->runAction(MoveTo::create((label->getPosition().x + std::abs(leftBarrier->getPosition().x)) / LayerMode.PathMovingSpeed, Vec2(leftBarrier->getPosition().x + origin.x, label->getPosition().y)));

	Character.uniqueId = Character.uniqueId + 1;
	allMonster.push_back(monsterImage);
	allLabels.push_back(label);
}

void EndlessRunner::addEvents(Sprite* sprite)
{
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(true);

	listener->onTouchBegan = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = static_cast<Sprite*>(event->getCurrentTarget());
		Point locationInNode = target->convertToNodeSpace(touch->getLocation());
		Size s = target->getContentSize();
		Rect rect = Rect(0, 0, s.width, s.height);

		if (rect.containsPoint(locationInNode))
		{
			if (!Character.Clicked) {
				Character.stillCheckFalg = false;
				Character.Clicked = true;

				auto A = CallFunc::create([=]() {
					Character.action->play("jump_start", false);
				});
				auto B = CallFunc::create([=]() {
					auto x = Character.action;
					Character.action->play("jump_up", false);
				});
				auto C = MoveTo::create(Character.upTime, Vec2(Character.character->getPositionX(), Character.character->getPositionY() + LayerMode.heightJump));
				auto D = CallFunc::create([=]() {
					Character.action->play("jump_mid", false);
				});
				auto E = CallFunc::create([=]() {
					Character.action->play("jump_down", false);
				});
				auto G = CallFunc::create([=]() {
					Character.onAir = true;
				});
				auto F = CallFunc::create([=]() {
					EndlessRunner::FallDownCharacter();
				});
				auto main_Sequence = Sequence::create(A, B, C, DelayTime::create(0.4), D, E, F, NULL);
				Character.character->runAction(main_Sequence);
			}
		}
		return false;
	};
	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener, sprite);
}