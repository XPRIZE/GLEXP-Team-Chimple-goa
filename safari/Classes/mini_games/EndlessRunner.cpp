#include "EndlessRunner.h"
#include <vector>
#include "SpriteCreate.h"

#define COCOS2D_DEBUG 1

using namespace std;
USING_NS_CC;

DrawNode* aa;
DrawNode* bb;

Scene* EndlessRunner::createScene()
{
	Scene* scene = Scene::create();
	auto layer = EndlessRunner::create();
	scene->addChild(layer);
	return scene;
}

bool EndlessRunner::init()
{
	if (!Layer::init()){return false;}

 	CCSpriteFrameCache* framecache = CCSpriteFrameCache::sharedSpriteFrameCache();
	framecache->addSpriteFramesWithFile("endlessrunner/endlessrunner.plist");
	
	visibleSize = Director::getInstance()->getVisibleSize();
	origin = Director::getInstance()->getVisibleOrigin();

	_menuContext = MenuContext::create();
	this->addChild(_menuContext,zOrderPathLayer.character);

	LayerYcoord.firstLayer = (int)(visibleSize.height * 11 / 100) + origin.y;

	SceneLayerYCoordinate.layer1 = (int)((visibleSize.height * 18 / 100) + origin.y);
	SceneLayerYCoordinate.layer2 = (int)((visibleSize.height * 15 / 100) + origin.y);
	SceneLayerYCoordinate.layer3 = (int)((visibleSize.height * 13 / 100) + origin.y);
	SceneLayerYCoordinate.layer4 = (int)((visibleSize.height * 10 / 100) + origin.y);
	SceneLayerYCoordinate.layer5 = (int)((visibleSize.height * 7 / 100) + origin.y);
	SceneLayerYCoordinate.layer6 = (int)((visibleSize.height * 4 / 100) + origin.y);
	SceneLayerYCoordinate.layer7 = (int)((visibleSize.height * 0 / 100) + origin.y);

	LayerGradient* GRadent = LayerGradient::create(Color4B(255, 255, 255, 255), Color4B(255, 255, 255, 255));
	this->addChild(GRadent,0);

	EndlessRunner::addEvents(EndlessRunner::CreateSprites("endlessrunner/bgTouchImage.png", origin.x, origin.y, visibleSize.width, visibleSize.height, 0, "IMG"));
	leftBarrier = EndlessRunner::CreateSprites("endlessrunner/barrier.png", (visibleSize.width * -15 / 100) + origin.x, (visibleSize.height * 0) + origin.y, 1, 1, 0, "IMG");

	leftBarrierForBigObject = EndlessRunner::CreateSprites("endlessrunner/barrier.png", (visibleSize.width * -70 / 100) + origin.x, (visibleSize.height * 0) + origin.y, 1, 1, 0, "IMG");
	rightBarrier = EndlessRunner::CreateSprites("endlessrunner/barrier.png", (visibleSize.width * 120 / 100) + origin.x, (visibleSize.height * 0) + origin.y, 1, 1, 0, "IMG");
	upBarrier = EndlessRunner::CreateSprites("endlessrunner/bgTouchImage.png", origin.x, origin.y + (visibleSize.height * 110 / 100), visibleSize.width, 1, 0, "IMG");
	upBarrier->setAnchorPoint(Vec2(0, 1));

	Character.action = CSLoader::createTimeline("endlessrunner/main_char.csb");
	Character.character = (Sprite *)CSLoader::createNode("endlessrunner/main_char.csb");
	Character.character->setPosition(Vec2((visibleSize.width * 25 / 100) + origin.x, LayerYcoord.firstLayer));
	this->addChild(Character.character,zOrderPathLayer.character);
	Character.character->runAction(Character.action);
	Character.character->setScale(1.1);
	Character.action->play("run", true);

	auto happyManAction = CSLoader::createTimeline("endlessrunner/happy_mad.csb");
	happyMan = (Sprite *)CSLoader::createNode("endlessrunner/happy_mad.csb");
	happyMan->setPosition(Vec2((visibleSize.width * 5 / 100) + origin.x, (visibleSize.height + origin.y) - (visibleSize.height * 0.18)));
	this->addChild(happyMan, zOrderPathLayer.layer7);
	happyMan->runAction(happyManAction);
	happyManAction->gotoFrameAndPlay(0, true);
	happyMan->getChildByName("mad")->setVisible(false);
	happyMan->getChildByName("happy")->setVisible(true);

	auto boardDisplay = (Sprite *)CSLoader::createNode("endlessrunner/letter_board.csb");
	boardDisplay->setPosition(Vec2((visibleSize.width / 2) + origin.x, (visibleSize.height + origin.y) - (visibleSize.height * 0.07)));
	this->addChild(boardDisplay, zOrderPathLayer.secondLayer);

	tempChar = letters[EndlessRunner::randmValueIncludeBoundery(0,35)];
	std::ostringstream sstreamc; 	sstreamc << tempChar;  std::string letterTemp = sstreamc.str();

	letterOnBoard = Label::createWithTTF(letterTemp, "fonts/Marker Felt.ttf", 130);
	letterOnBoard->setPosition(Vec2((visibleSize.width / 2) + origin.x, (visibleSize.height + origin.y) - (visibleSize.height * 0.08)));
	this->addChild(letterOnBoard, zOrderPathLayer.secondLayer);

	EndlessRunner::beforeInitBackgroundScene();
	EndlessRunner::sceneBackgroundFlow();

	SpriteCreate* mountain;
	int MountainRandomvalue = 0;
	int startPosition = origin.x;

	for (int i = 0; i <= 15; i++) {
		MountainRandomvalue = EndlessRunner::randmValueIncludeBoundery(0, (sizeof(mountainMidImages) / sizeof(mountainMidImages[0])) - 1);
		mountain = SpriteCreate::createSprite(mountainMidImages[MountainRandomvalue], startPosition,origin.y, 0, 0, mountainTypeObject.midLandPart, mountainTypeObject.midLandPart, mountainLayerTypes.FirstLayer);
		this->addChild(mountain, zOrderPathLayer.firstLayer);
		mountain->setName("MidLand");
		if (i == 15) {mountain->setName("LastInit"); mountain->NextRockName = mountainTypeObject.endLandPart;}
		startPosition = startPosition + mountain->getContentSize().width - LayerMode.tolerence;
		allPathBlocks.push_back(mountain);
		mountain->runAction(MoveTo::create(EndlessRunner::movingTime(mountain), Vec2((leftBarrier->getPosition().x),origin.y)));
	}
	jumpMode = false;
	Character.onAir = true;
	this->schedule(schedule_selector(EndlessRunner::sceneTree1Flow), 2.5f);
	this->schedule(schedule_selector(EndlessRunner::sceneTree2Flow), 1.4f);
	this->schedule(schedule_selector(EndlessRunner::CreateMonsterWithLetter), 6.0f);

	this->scheduleUpdate();
	return true;
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
}

void EndlessRunner::FallDownCharacter() {
	Character.onAir = false;
	Character.stillCheckFalg = true;
	Character.fallingTime = Character.character->getPositionY() / Character.fallDownSpeed;
	Character.fallDownAction = MoveTo::create(Character.fallingTime, Vec2(Character.character->getPositionX(), origin.y));
	Character.character->runAction(Character.fallDownAction);
	Character.groundTouchFlag = true;
}

void EndlessRunner::stillCharacterOnPath(float delta) {

	for (std::size_t i = 0; i < allPathBlocks.size(); i++) {
		auto man = Character.character;
		auto box = Character.character->getChildByName("floor_2")->getBoundingBox();
		Rect parent = Character.character->getBoundingBox();
		Rect boxs = Rect(parent.origin.x + box.origin.x, parent.origin.y + box.origin.y, box.size.width, box.size.height);

		if (aa != NULL)
		{
			this->removeChild(aa);
		}
		aa = DrawNode::create();
		this->addChild(aa, 20);
		//	aa->drawRect(Vec2(boxs.origin.x, boxs.origin.y), Vec2(boxs.origin.x +boxs.size.width, boxs.origin.y + boxs.size.height), Color4F(255, 255, 255, 22));
		if (boxs.intersectsRect(allPathBlocks[i]->getBoundingBox())) {
			if (allPathBlocks[i]->LayerTypeName == mountainLayerTypes.FirstLayer && !LayerMode.gapMode) {
				//	CCLOG("FIRST LAYER ");
				Character.character->setPositionY(LayerYcoord.firstLayer+15);
				if (Character.groundTouchFlag) {
					Character.groundTouchFlag = false;
					Character.Clicked = false;
					Character.character->stopAction(Character.fallDownAction);

					auto A = CallFunc::create([=]() {Character.action->play("jump_end", false);});

					auto B = CallFunc::create([=]() {Character.action->play("run", true);});

					auto main_Sequence = Sequence::create(A, B, NULL);
					Character.character->runAction(main_Sequence);

				}
			}
			else if (allPathBlocks[i]->LayerTypeName == mountainLayerTypes.SecondLayer && !LayerMode.gapMode) {
				//CCLOG("SECOND LAYER ");
				Character.character->setPositionY((visibleSize.height * 23 / 100) + origin.y);

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
			else if (allPathBlocks[i]->LayerTypeName == mountainLayerTypes.gap) {
				//CCLOG("GAP ");
				Character.onAir = false;
				Character.character->stopAction(Character.fallDownAction);
				Character.action->play("drop", true);
				Character.character->runAction(MoveBy::create(0.8, Vec2(-Character.character->getContentSize().width, -(visibleSize.height * 0.4))));
				Character.Clicked = true;
				LayerMode.gapMode = true;
				Character.stillCheckFalg = false;
			}
		}
		else {
			Character.character->setPositionY(Character.character->getPositionY() - (0.65));
		}
	}
}

void EndlessRunner::startingIntersectMode() {

	if (FirstLayerModes == LayerMode.FirstLayerRightIntersectMode) {
		if (!rightBarrier->getBoundingBox().intersectsRect(currentFirstLayerRock->getBoundingBox())) {
			FirstLayerModes = 4;
			if (currentFirstLayerRock->NextRockName == mountainTypeObject.startLandPart) {
				FirstLayerstartFlag = true;
			}
			else
			{
				FirstLayerstartFlag = false;
			}
			EndlessRunner::AddRocksInFirstLayerPath();
		}
	}
	else {
		CCLOG("GAP PE GIR GAYA");
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
		Rect boxs = Rect(parent.origin.x + (box.origin.x), parent.origin.y + (box.origin.y), box.size.width, box.size.height);
		Rect label = allLabels[i]->getBoundingBox();

		if (bb != NULL)
		{
			this->removeChild(bb);
		}
		bb = DrawNode::create();
		this->addChild(bb, 20);
		//		bb->drawRect(Vec2(boxs.origin.x, boxs.origin.y), Vec2(boxs.origin.x + boxs.size.width, boxs.origin.y + boxs.size.height), Color4F(255, 255, 255, 22));

		if (boxs.intersectsRect(allLabels[i]->getBoundingBox()))//.intersectsRect(Character.character->getChildren().at(0)->getBoundingBox()))
		{
			std::ostringstream sstreamc;
			sstreamc << tempChar;
			std::string letterTemp = sstreamc.str();

			if (allLabels[i]->getName() == letterTemp) {
				_menuContext->pickAlphabet(tempChar, allLabels[i]->getName()[0], true);
				for (std::size_t k = 0; k <allMonster.size(); k++) {
					if (allMonster[k]->getTag() == allLabels[i]->getTag()) {
						this->removeChild(allLabels[i]);
						allLabels.erase(allLabels.begin() + i);
						Character.action->play("correct_catch", false);
						allMonster[k]->getChildByName("monster_egg")->setVisible(false);
						happyMan->getChildByName("mad")->setVisible(false);
						happyMan->getChildByName("happy")->setVisible(true);
						allMonster[k]->runAction(MoveBy::create(3, Vec2((visibleSize.width * 90 / 100) + origin.x, (visibleSize.height * 70 / 100) + origin.y)));
					}
				}
			}
			else {
				_menuContext->pickAlphabet(tempChar, allLabels[i]->getName()[0], true);
				for (std::size_t k = 0; k <allMonster.size(); k++) {
					if (allMonster[k]->getTag() == allLabels[i]->getTag()) {
						Character.action->play("worng_catch", false);
						this->removeChild(allLabels[i]);
						allLabels.erase(allLabels.begin() + i);
						happyMan->getChildByName("happy")->setVisible(false);
						happyMan->getChildByName("mad")->setVisible(true);
						allMonster[k]->getChildByName("monster_egg")->setVisible(false);
						allMonster[k]->getChildByName("monster_egg_crack")->setVisible(true);
						allMonster[k]->runAction(MoveBy::create(3, Vec2((visibleSize.width * 90 / 100) + origin.x, (visibleSize.height * 70 / 100) + origin.y)));
					}
				}
			}
		}
	}

	for (std::size_t i = 0; i < allBeforeStartBlocks.size(); i++) {

		auto box = Character.character->getChildByName("floor_3")->getBoundingBox();
		Rect parent = Character.character->getBoundingBox();
		Rect boxs = Rect(parent.origin.x + (box.origin.x), parent.origin.y + (box.origin.y), box.size.width, box.size.height);

		if (boxs.intersectsRect(allBeforeStartBlocks[i]->getBoundingBox())) {

			auto blink = Blink::create(2, 10);
			auto visible = CallFunc::create([=]() {
				Character.character->setVisible(true);
			});
			auto blinking = Sequence::create(blink, visible, NULL);
			Character.character->runAction(blinking);

			CCLOG("INTERSET MAN ");

		}
	}
}

void EndlessRunner::sceneBackgroundFlow() {
	//Sprite Background for start the infinite flow .....
	currentlayer1Sprite = EndlessRunner::CreateSprites("endlessrunner/layer_1_mountain.png", rightBarrier->getPosition().x - LayerMode.tolerence, SceneLayerYCoordinate.layer1, 1, 1, zOrderPathLayer.layer1, "bgElement");
	currentlayer1Sprite->runAction(MoveTo::create(EndlessRunner::movingTimes(currentlayer1Sprite, LayerMode.Layer1Speed), Vec2(leftBarrierForBigObject->getPosition().x, SceneLayerYCoordinate.layer1)));

	currentlayer2Sprite = EndlessRunner::CreateSprites("endlessrunner/layer_2_mountain.png", 0, SceneLayerYCoordinate.layer2, 1, 1, zOrderPathLayer.layer2, "bgElement");
	currentlayer2Sprite->setPositionX(rightBarrier->getPosition().x - LayerMode.tolerence - currentlayer2Sprite->getContentSize().width / 3);
	currentlayer2Sprite->runAction(MoveTo::create(EndlessRunner::movingTimes(currentlayer2Sprite, LayerMode.Layer2Speed), Vec2(leftBarrierForBigObject->getPosition().x, SceneLayerYCoordinate.layer2)));

	currentlayer3Sprite = EndlessRunner::CreateSprites("endlessrunner/layer_3_bush.png", 0, SceneLayerYCoordinate.layer3, 1, 1, zOrderPathLayer.layer3, "bgElement");
	currentlayer3Sprite->setPositionX(rightBarrier->getPosition().x - LayerMode.tolerence - currentlayer3Sprite->getContentSize().width / 3);
	currentlayer3Sprite->runAction(MoveTo::create(EndlessRunner::movingTimes(currentlayer3Sprite, LayerMode.Layer3Speed), Vec2(leftBarrierForBigObject->getPosition().x, SceneLayerYCoordinate.layer3)));

	currentlayer5Sprite = EndlessRunner::CreateSprites("endlessrunner/layer_5_bush.png", 0, SceneLayerYCoordinate.layer5, 1, 1, zOrderPathLayer.layer5, "bgElement");
	currentlayer5Sprite->setPositionX(rightBarrier->getPosition().x - LayerMode.tolerence - currentlayer5Sprite->getContentSize().width / 3);
	currentlayer5Sprite->runAction(MoveTo::create(EndlessRunner::movingTimes(currentlayer5Sprite, LayerMode.Layer5Speed), Vec2(leftBarrierForBigObject->getPosition().x, SceneLayerYCoordinate.layer5)));

	currentlayer7Sprite = EndlessRunner::CreateSprites("endlessrunner/layer_7_bush.png", 0, SceneLayerYCoordinate.layer7, 1, 1, zOrderPathLayer.layer7, "bgElement");
	currentlayer7Sprite->setPositionX(rightBarrier->getPosition().x - LayerMode.tolerence - currentlayer5Sprite->getContentSize().width / 3);
	currentlayer7Sprite->runAction(MoveTo::create(EndlessRunner::movingTimes(currentlayer7Sprite, LayerMode.Layer7Speed), Vec2(leftBarrierForBigObject->getPosition().x, SceneLayerYCoordinate.layer7)));
}

void EndlessRunner::mountainLayer1() {
	//Endless Monutain Running Code
	if (!rightBarrier->getBoundingBox().intersectsRect(currentlayer1Sprite->getBoundingBox())) {
		int xSizeIndexRange = EndlessRunner::randmValueIncludeBoundery(0, 6);
		auto layer1Mountain = EndlessRunner::CreateSprites("endlessrunner/layer_1_mountain.png", rightBarrier->getPosition().x - LayerMode.tolerence, SceneLayerYCoordinate.layer1, xSizeArray[xSizeIndexRange], 1, zOrderPathLayer.layer1, "bgElement");
		currentlayer1Sprite = layer1Mountain;
		currentlayer1Sprite->runAction(MoveTo::create(EndlessRunner::movingTimes(currentlayer1Sprite, LayerMode.Layer1Speed), Vec2(leftBarrierForBigObject->getPosition().x, SceneLayerYCoordinate.layer1)));
	}

	if (!rightBarrier->getBoundingBox().intersectsRect(currentlayer2Sprite->getBoundingBox())) {
		int xSizeIndexRange = EndlessRunner::randmValueIncludeBoundery(0, 6);
		auto layer2Mountain = EndlessRunner::CreateSprites("endlessrunner/layer_2_mountain.png", rightBarrier->getPosition().x - LayerMode.tolerence, SceneLayerYCoordinate.layer2, xSizeArray[xSizeIndexRange], 1, zOrderPathLayer.layer2, "bgElement");
		currentlayer2Sprite = layer2Mountain;
		currentlayer2Sprite->runAction(MoveTo::create(EndlessRunner::movingTimes(currentlayer2Sprite, LayerMode.Layer2Speed), Vec2(leftBarrierForBigObject->getPosition().x, SceneLayerYCoordinate.layer2)));
	}

	if (!rightBarrier->getBoundingBox().intersectsRect(currentlayer3Sprite->getBoundingBox())) {
		auto layer3bush = EndlessRunner::CreateSprites("endlessrunner/layer_3_bush.png", rightBarrier->getPosition().x - LayerMode.tolerence, SceneLayerYCoordinate.layer3,1, 1, zOrderPathLayer.layer3, "bgElement");
		currentlayer3Sprite = layer3bush;
		currentlayer3Sprite->runAction(MoveTo::create(EndlessRunner::movingTimes(currentlayer3Sprite, LayerMode.Layer3Speed), Vec2(leftBarrierForBigObject->getPosition().x, SceneLayerYCoordinate.layer3)));
	}

	if (!rightBarrier->getBoundingBox().intersectsRect(currentlayer5Sprite->getBoundingBox())) {
		auto layer5bush = EndlessRunner::CreateSprites("endlessrunner/layer_5_bush.png", rightBarrier->getPosition().x - LayerMode.tolerence, SceneLayerYCoordinate.layer5, 1, 1, zOrderPathLayer.layer5, "bgElement");
		currentlayer5Sprite = layer5bush;
		currentlayer5Sprite->runAction(MoveTo::create(EndlessRunner::movingTimes(currentlayer5Sprite, LayerMode.Layer5Speed), Vec2(leftBarrierForBigObject->getPosition().x, SceneLayerYCoordinate.layer5)));
	}

	if (!rightBarrier->getBoundingBox().intersectsRect(currentlayer7Sprite->getBoundingBox())) {
		auto layer7bush = EndlessRunner::CreateSprites("endlessrunner/layer_7_bush.png", rightBarrier->getPosition().x - LayerMode.tolerence, SceneLayerYCoordinate.layer7, 1, 1, zOrderPathLayer.layer7, "bgElement");
		currentlayer7Sprite = layer7bush;
		currentlayer7Sprite->runAction(MoveTo::create(EndlessRunner::movingTimes(currentlayer7Sprite, LayerMode.Layer7Speed), Vec2(leftBarrierForBigObject->getPosition().x, SceneLayerYCoordinate.layer7)));
	}
}

void EndlessRunner::sceneTree1Flow(float dt) {
	int MountainRandomvalue = EndlessRunner::randmValueIncludeBoundery(0, (sizeof(treeLayer4) / sizeof(treeLayer4[0])) - 1);
	auto layer4tree = EndlessRunner::CreateSprites(treeLayer4[MountainRandomvalue], rightBarrier->getPosition().x, SceneLayerYCoordinate.layer4, 1, 1, zOrderPathLayer.layer4, "bgElement");
	layer4tree->runAction(MoveTo::create(EndlessRunner::movingTimes(layer4tree, LayerMode.Layer4Speed), Vec2(leftBarrierForBigObject->getPosition().x, SceneLayerYCoordinate.layer4)));
}

void EndlessRunner::sceneTree2Flow(float dt) {
	int MountainRandomvalue = EndlessRunner::randmValueIncludeBoundery(0, (sizeof(treeLayer6) / sizeof(treeLayer6[0])) - 1);
	auto layer6tree = EndlessRunner::CreateSprites(treeLayer6[MountainRandomvalue], rightBarrier->getPosition().x, SceneLayerYCoordinate.layer6, 1, 1, zOrderPathLayer.layer6, "bgElement");
	layer6tree->runAction(MoveTo::create(EndlessRunner::movingTimes(layer6tree, LayerMode.Layer6Speed), Vec2(leftBarrierForBigObject->getPosition().x, SceneLayerYCoordinate.layer6)));
}

void EndlessRunner::beforeInitBackgroundScene() {

	int newtolerence = 0;

	auto layer0ground = EndlessRunner::CreateSprites("endlessrunner/ground.png",origin.x, origin.y,visibleSize.width,1,zOrderPathLayer.layer0,"none");

	for (int i = 0; i < 3; i++) {
		newtolerence = newtolerence + (LayerMode.tolerence);
		auto layer1mountain = EndlessRunner::CreateSprites("endlessrunner/layer_1_mountain.png",origin.x, origin.y,1,1,zOrderPathLayer.layer1, "bgElement");
		layer1mountain->setPosition(Vec2(origin.x + (layer1mountain->getContentSize().width * i) - newtolerence - layer1mountain->getContentSize().width / 2, SceneLayerYCoordinate.layer1));
		layer1mountain->runAction(MoveTo::create(EndlessRunner::movingTimes(layer1mountain, LayerMode.Layer1Speed), Vec2(leftBarrierForBigObject->getPosition().x, SceneLayerYCoordinate.layer1)));
		if (i == 2) { layer1mountain->setScaleX(1.5);}
	}
	newtolerence = 0;
	for (int i = 0; i < 2; i++) {
		newtolerence = newtolerence + (LayerMode.tolerence);
		auto layer2mountain = EndlessRunner::CreateSprites("endlessrunner/layer_2_mountain.png", origin.x, origin.y, 1, 1, zOrderPathLayer.layer2, "bgElement");
		layer2mountain->setPosition(Vec2(origin.x + (layer2mountain->getContentSize().width * i) - newtolerence, SceneLayerYCoordinate.layer2));
		layer2mountain->runAction(MoveTo::create(EndlessRunner::movingTimes(layer2mountain, LayerMode.Layer2Speed), Vec2(leftBarrierForBigObject->getPosition().x, SceneLayerYCoordinate.layer2)));
		if (i == 1) { layer2mountain->setScaleX(1.5); }
	}

	newtolerence = 0;
	for (int i = 0; i < 2; i++) {
		newtolerence = newtolerence + (LayerMode.tolerence * 2);
		auto layer3 = EndlessRunner::CreateSprites("endlessrunner/layer_3_bush.png", origin.x, origin.y, 1, 1, zOrderPathLayer.layer3, "bgElement");
		layer3->setPosition(Vec2(origin.x + (layer3->getContentSize().width * i) - newtolerence, SceneLayerYCoordinate.layer3));
		layer3->runAction(MoveTo::create(EndlessRunner::movingTimes(layer3, LayerMode.Layer3Speed), Vec2(leftBarrierForBigObject->getPosition().x, SceneLayerYCoordinate.layer3)));
		if (i == 1) {layer3->setScaleX(1.5);}
	}
	newtolerence = 0;
	for (int i = 0; i < 4; i++) {
		auto layer4 = EndlessRunner::CreateSprites(treeLayer4[2], origin.x, origin.y, 1, 1, zOrderPathLayer.layer4, "bgElement");
		newtolerence = newtolerence + (LayerMode.tolerence);
		layer4->setPosition(Vec2(origin.x + (layer4->getContentSize().width * i) - newtolerence, SceneLayerYCoordinate.layer4));
		layer4->runAction(MoveTo::create(EndlessRunner::movingTimes(layer4, LayerMode.Layer4Speed), Vec2(leftBarrierForBigObject->getPosition().x, SceneLayerYCoordinate.layer4)));
	}
	newtolerence = 0;
	for (int i = 0; i < 2; i++) {
		auto layer5 = EndlessRunner::CreateSprites("endlessrunner/layer_5_bush.png",origin.x, origin.y, 1, 1, zOrderPathLayer.layer5, "bgElement");
		newtolerence = newtolerence + (LayerMode.tolerence * 2);
		layer5->setPosition(Vec2(origin.x + (layer5->getContentSize().width * i) - newtolerence, SceneLayerYCoordinate.layer5));
		layer5->runAction(MoveTo::create(EndlessRunner::movingTimes(layer5, LayerMode.Layer5Speed), Vec2(leftBarrierForBigObject->getPosition().x, SceneLayerYCoordinate.layer5)));
		if (i == 1) { layer5->setScaleX(1.5); }
	}
	newtolerence = 0;
	for (int i = 0; i < 4; i++) {
		auto layer6 = EndlessRunner::CreateSprites(treeLayer6[0], origin.x, origin.y, 1, 1, zOrderPathLayer.layer6, "bgElement");
		layer6->setPosition(Vec2(origin.x + (layer6->getContentSize().width * i), SceneLayerYCoordinate.layer6));
		layer6->runAction(MoveTo::create(EndlessRunner::movingTimes(layer6, LayerMode.Layer6Speed), Vec2(leftBarrierForBigObject->getPosition().x, SceneLayerYCoordinate.layer6)));
	}
	newtolerence = 0;
	for (int i = 0; i < 2; i++) {
		auto layer7 = EndlessRunner::CreateSprites("endlessrunner/layer_7_bush.png", origin.x, origin.y, 1, 1, zOrderPathLayer.layer7, "bgElement");
		newtolerence = newtolerence + (LayerMode.tolerence * 2);
		layer7->setPosition(Vec2(origin.x + (layer7->getContentSize().width * i) - newtolerence, SceneLayerYCoordinate.layer7));
		layer7->runAction(MoveTo::create(EndlessRunner::movingTimes(layer7, LayerMode.Layer7Speed), Vec2(leftBarrierForBigObject->getPosition().x, SceneLayerYCoordinate.layer7)));
	}
}

void EndlessRunner::AddRocksInFirstLayerPath() {

	if (currentFirstLayerRock->NextRockName == mountainTypeObject.gapLand) {

		SpriteCreate* currentImage = SpriteCreate::createSprite("endlessrunner/gapw.png", (currentFirstLayerRock->getPosition().x + currentFirstLayerRock->getContentSize().width), LayerYcoord.groundLevel + origin.y, 0, 0, mountainTypeObject.gapLand, mountainTypeObject.startLandPart, mountainLayerTypes.gap);
		this->addChild(currentImage, zOrderPathLayer.firstLayer);
		allPathBlocks.push_back(currentImage);
		currentFirstLayerRock = currentImage;
		currentImage->setScaleY(11);
		currentImage->setOpacity(0);
		position = EndlessRunner::movingUpto(LayerYcoord.groundLevel);
		currentFirstLayerRock->runAction(MoveTo::create(EndlessRunner::movingTime(currentFirstLayerRock), Vec2(leftBarrier->getPosition().x + origin.x, position.second)));
		FirstLayerModes = 1;
		FirstLayerstartFlag = false;
	}

	if (currentFirstLayerRock->NextRockName == mountainTypeObject.endLandPart) {

		SpriteCreate* currentImage = SpriteCreate::createSprite("endlessrunner/path_right_lands.png", EndlessRunner::setPositionX(currentFirstLayerRock), LayerYcoord.groundLevel + origin.y, 0, 0, mountainTypeObject.endLandPart, mountainTypeObject.gapLand, mountainLayerTypes.FirstLayer);
		this->addChild(currentImage, zOrderPathLayer.firstLayer);
		allPathBlocks.push_back(currentImage);

		currentFirstLayerRock = currentImage;
		position = EndlessRunner::movingUpto(LayerYcoord.groundLevel);
		currentFirstLayerRock->runAction(MoveTo::create(EndlessRunner::movingTime(currentFirstLayerRock), Vec2(position.first, position.second)));
		FirstLayerModes = 1;
	}

	if (currentFirstLayerRock->NextRockName == mountainTypeObject.midLandPart) {
		int MountainRandomvalue = EndlessRunner::randmValueIncludeBoundery(0, (sizeof(mountainMidImages) / sizeof(mountainMidImages[0])) - 1);

		SpriteCreate* currentImage = SpriteCreate::createSprite(mountainMidImages[MountainRandomvalue], EndlessRunner::setPositionX(currentFirstLayerRock), LayerYcoord.groundLevel + origin.y, 0, 0, mountainTypeObject.midLandPart, "", mountainLayerTypes.FirstLayer);
		if (FirstLayerCounterMidObjectValue > FirstLayerCounterMid) {
			if (SecondLayerSpacing == FirstLayerCounterMid) {
				int xCordBlankSpace = 50;
				SpriteCreate* newSprite = EndlessRunner::addUpperLayerStartSpriteRock(currentFirstLayerRock, mountainLayerTypes.SecondLayer, LayerYcoord.firstLayer, zOrderPathLayer.secondLayer, 0);
				currentSecondLayerRock = newSprite;
				currentSecondLayerRock->runAction(MoveTo::create(EndlessRunner::movingTime(currentSecondLayerRock), Vec2(leftBarrier->getPosition().x + origin.x, LayerYcoord.firstLayer)));
				SecondLayerModes = 2;
				SecondLayerSpacing = -1;
			}
			currentImage->NextRockName = mountainTypeObject.midLandPart;
		}
		else {
			currentImage->NextRockName = mountainTypeObject.endLandPart;
			FirstLayerCounterMid = 0;
		}

		this->addChild(currentImage, zOrderPathLayer.firstLayer);
		allPathBlocks.push_back(currentImage);
		currentFirstLayerRock = currentImage;
		position = EndlessRunner::movingUpto(LayerYcoord.groundLevel);
		currentFirstLayerRock->runAction(MoveTo::create(EndlessRunner::movingTime(currentFirstLayerRock), Vec2(position.first, position.second)));
		FirstLayerModes = 1;
		FirstLayerCounterMid++;
	}

	if (currentFirstLayerRock->NextRockName == mountainTypeObject.startLandPart && FirstLayerstartFlag) {
		if (FirstLayerflagForCounterMidObject) {
			FirstLayerCounterMidObjectValue = EndlessRunner::randmValueIncludeBoundery(10, 60);
			FirstLayerflagForCounterMidObject = false;
			if (10 <= FirstLayerCounterMidObjectValue && FirstLayerCounterMidObjectValue <= 25) {
				FirstLayerModes = 1;
			}
			else if (25 < FirstLayerCounterMidObjectValue && FirstLayerCounterMidObjectValue <= 60) {
				int randomMidFromFirstLayer = EndlessRunner::randmValueIncludeBoundery(1, (FirstLayerCounterMidObjectValue - 6));
				SecondLayerSpacing = EndlessRunner::randmValueIncludeBoundery(3, std::abs(FirstLayerCounterMidObjectValue - randomMidFromFirstLayer - 3));
				SecondLayerCounterMidObjectValue = randomMidFromFirstLayer;
			}
		}
		SpriteCreate* currentImage = SpriteCreate::createSprite("endlessrunner/path_left_lands.png", (currentFirstLayerRock->getPosition().x + currentFirstLayerRock->getContentSize().width), LayerYcoord.groundLevel + origin.y, 0, 0, mountainTypeObject.startLandPart, mountainTypeObject.midLandPart, mountainLayerTypes.FirstLayer);
		this->addChild(currentImage, zOrderPathLayer.firstLayer);
		allPathBlocks.push_back(currentImage);

		currentFirstLayerRock = currentImage;
		position = EndlessRunner::movingUpto(LayerYcoord.groundLevel);
		currentFirstLayerRock->runAction(MoveTo::create(EndlessRunner::movingTime(currentFirstLayerRock), Vec2(position.first, position.second)));
		FirstLayerModes = 1;
		FirstLayerflagForCounterMidObject = true;
		FirstLayerModes = 1;
	}
}

void EndlessRunner::AddRocksInSecondLayerPath() {

	if (currentSecondLayerRock->NextRockName == mountainTypeObject.endLandPart) {
		SpriteCreate* currentImage = SpriteCreate::createSprite("endlessrunner/path_right_lands.png", EndlessRunner::setPositionX(currentSecondLayerRock), LayerYcoord.firstLayer, 0, 0, mountainTypeObject.endLandPart, mountainTypeObject.gapLand, mountainLayerTypes.SecondLayer);
		this->addChild(currentImage, zOrderPathLayer.secondLayer);
		allPathBlocks.push_back(currentImage);
		currentSecondLayerRock = currentImage;
		currentSecondLayerRock->runAction(MoveTo::create(EndlessRunner::movingTime(currentSecondLayerRock), Vec2(leftBarrier->getPosition().x + origin.x, LayerYcoord.firstLayer)));
	}

	if (currentSecondLayerRock->NextRockName == mountainTypeObject.midLandPart) {
		int MountainRandomvalue = randmValueIncludeBoundery(0, (sizeof(mountainMidImages) / sizeof(mountainMidImages[0])) - 1);

		SpriteCreate* currentImage = SpriteCreate::createSprite(mountainMidImages[MountainRandomvalue], EndlessRunner::setPositionX(currentSecondLayerRock), LayerYcoord.firstLayer, 0, 0, mountainTypeObject.midLandPart, "", mountainLayerTypes.SecondLayer);
		this->addChild(currentImage, zOrderPathLayer.secondLayer);
		allPathBlocks.push_back(currentImage);

		if (SecondLayerCounterMidObjectValue > SecondLayerCounterMid) {

			currentImage->NextRockName = mountainTypeObject.midLandPart;
		}
		else {
			currentImage->NextRockName = mountainTypeObject.endLandPart;
			SecondLayerCounterMid = 0;
		}
		SecondLayerModes = 2;
		SecondLayerCounterMid++;
		currentSecondLayerRock = currentImage;
		currentSecondLayerRock->runAction(MoveTo::create(EndlessRunner::movingTime(currentSecondLayerRock), Vec2(leftBarrier->getPosition().x + origin.x, LayerYcoord.firstLayer)));
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
	SpriteCreate* currentImage = SpriteCreate::createSprite("endlessrunner/path_left_lands.png", EndlessRunner::setPositionX(SpriteObject), positionY, 0, 0, mountainTypeObject.startLandPart, mountainTypeObject.midLandPart, MountainType);
	this->addChild(currentImage, zOrder);
	allPathBlocks.push_back(currentImage);
	auto extra = EndlessRunner::CreateSprites("endlessrunner/bgTouchImage.png", EndlessRunner::setPositionX(SpriteObject), positionY,10,20,zOrderPathLayer.character,"blinkBlock");
	extra->runAction(MoveTo::create(EndlessRunner::movingTime(currentImage), Vec2(leftBarrier->getPosition().x + origin.x, positionY)));
	return currentImage;
}

float EndlessRunner::movingTime(SpriteCreate* SpriteObject) {
	if (leftBarrier->getPosition().x < 0) {return ((SpriteObject->getPosition().x + std::abs(leftBarrier->getPosition().x)) / LayerMode.PathMovingSpeed);}
	return ((SpriteObject->getPosition().x - std::abs(leftBarrier->getPosition().x)) / LayerMode.PathMovingSpeed);
}

float EndlessRunner::movingTimes(Sprite* SpriteObject, int Speed) {
	if (leftBarrierForBigObject->getPosition().x < 0) {return ((SpriteObject->getPosition().x + std::abs(leftBarrierForBigObject->getPosition().x)) / Speed);}
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
	if (min > max) { maxValue = min;  minValue = max;	}
	else if (min == max) { return min;}
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

	Rect box = monsterImage->getChildByName("monster_egg")->getBoundingBox();
	monsterImage->runAction(timeline);  timeline->gotoFrameAndPlay(0);

	int Index = EndlessRunner::randmValueIncludeBoundery(0, (sizeof(letters) / sizeof(letters[0])) - 1);
	char letterOnBoard = letters[Index];
	
	std::ostringstream sstreamc;	sstreamc << letterOnBoard;	std::string letterTemp = sstreamc.str();
	
	auto label = Label::createWithTTF(letterTemp, "fonts/Marker Felt.ttf", 80);
	label->setName(letterTemp);
	label->enableShadow(Color4B::BLACK, Size(8, -6),5);
	label->setTag(Character.uniqueId);
	monsterImage->setTag(Character.uniqueId);

	if (SecondLayerModes == LayerMode.SecondLayerRightIntersectMode) {
		monsterImage->setPosition(Vec2(rightBarrier->getPosition().x + origin.x, (visibleSize.height * 57 / 100) + origin.y));
	}
	else if (FirstLayerModes == LayerMode.FirstLayerRightIntersectMode) {
		monsterImage->setPosition(Vec2(rightBarrier->getPosition().x + origin.x, (visibleSize.height * 45.5 / 100) + origin.y));
	}
	else {
		monsterImage->setPosition(Vec2(rightBarrier->getPosition().x + origin.x, (visibleSize.height * 45.5 / 100) + origin.y));
	}
	auto parent = monsterImage->getBoundingBox();
	auto boxs = Rect(parent.origin.x + (box.origin.x), parent.origin.y + (box.origin.y), box.size.width, box.size.height);
	label->setPosition(Vec2(boxs.origin.x + (box.size.width / 2), boxs.origin.y + (box.size.height / 2)));

	this->addChild(monsterImage, zOrderPathLayer.firstLayer);
	this->addChild(label, zOrderPathLayer.firstLayer);
	
	monsterImage-> runAction(MoveTo::create((monsterImage->getPosition().x + std::abs(leftBarrier->getPosition().x)) / LayerMode.PathMovingSpeed, Vec2(leftBarrier->getPosition().x + origin.x, monsterImage->getPosition().y)));
	label-> runAction(MoveTo::create((label->getPosition().x + std::abs(leftBarrier->getPosition().x)) / LayerMode.PathMovingSpeed, Vec2(leftBarrier->getPosition().x + origin.x, label->getPosition().y)));

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