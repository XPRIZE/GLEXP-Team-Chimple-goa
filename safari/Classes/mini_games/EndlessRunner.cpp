#include "EndlessRunner.h"
#include <vector>
#include "SpriteCreate.h"
#define COCOS2D_DEBUG 1

using namespace std;
USING_NS_CC;
DrawNode* aa;
Scene* EndlessRunner::createScene()
{
	// 'scene' is an autorelease object
	Scene* scene = Scene::create();

	// 'layer' is an autorelease object
	auto layer = EndlessRunner::create();

	// add layer as a child to scene
	scene->addChild(layer);
	// return the scene
	return scene;
}

// on "init" you need to initialize your instance
bool EndlessRunner::init()
{
	// 1. super init first
	if (!Layer::init())
	{
		return false;
	}
	SpriteFrameCache::getInstance()->addSpriteFramesWithFile("restanimation.plist");
	SpriteFrameCache::getInstance()->addSpriteFramesWithFile("endlessrunner.plist");

	visibleSize = Director::getInstance()->getVisibleSize();
	origin = Director::getInstance()->getVisibleOrigin();

	LayerYcoord.firstLayer = (int)(visibleSize.height * 13 / 100) + origin.y;
	LayerYcoord.secondLayer = (int)(visibleSize.height * 26 / 100) + origin.y;
	LayerYcoord.thirdLayer = (int)(visibleSize.height * 39 / 100) + origin.y;
	LayerYcoord.fourLayer = (int)(visibleSize.height * 52 / 100) + origin.y;

	SceneLayerYCoordinate.layer1 = (int)((visibleSize.height * 18 / 100) + origin.y);
	SceneLayerYCoordinate.layer2 = (int)((visibleSize.height * 15 / 100) + origin.y);
	SceneLayerYCoordinate.layer3 = (int)((visibleSize.height * 13 / 100) + origin.y);
	SceneLayerYCoordinate.layer4 = (int)((visibleSize.height * 5 / 100) + origin.y);
	SceneLayerYCoordinate.layer5 = (int)((visibleSize.height * 7 / 100) + origin.y);
	SceneLayerYCoordinate.layer6 = (int)((visibleSize.height * 4 / 100) + origin.y);
	SceneLayerYCoordinate.layer7 = (int)((visibleSize.height * 0 / 100) + origin.y);

	LayerGradient* GRadent = LayerGradient::create(Color4B(255,255,255, 255), Color4B(255, 255, 255, 255));
	this->addChild(GRadent, 0);

	EndlessRunner::addEvents(EndlessRunner::CreateSprites("bgTouchImage.png", origin.x, origin.y, visibleSize.width, visibleSize.height, 0, "IMG"));
	leftBarrier = EndlessRunner::CreateSprites("barrier.png", (visibleSize.width * -15 / 100) + origin.x, (visibleSize.height * 0) + origin.y, 1,1, 0, "IMG");

	leftBarrierForBigObject = EndlessRunner::CreateSprites("barrier.png", (visibleSize.width * -70 / 100) + origin.x, (visibleSize.height * 0) + origin.y, 1, 1, 0, "IMG");
	rightBarrier = EndlessRunner::CreateSprites("barrier.png", (visibleSize.width * 115 / 100) + origin.x, (visibleSize.height * 0) + origin.y, 1, 1, 0, "IMG");
	upBarrier = EndlessRunner::CreateSprites("bgTouchImage.png", origin.x, origin.y + (visibleSize.height * 110 / 100), visibleSize.width, 1, 0, "IMG");
	upBarrier->setAnchorPoint(Vec2(0, 1));

	Character.action = CSLoader::createTimeline("mainanimation.csb");
	Character.character = (Sprite *)CSLoader::createNode("mainanimation.csb");
	Character.character->setPosition(Vec2((visibleSize.width * 30 / 100), LayerYcoord.firstLayer + 100));
	Character.character->setContentSize(cocos2d::Size(Character.character->getChildren().at(0)->getBoundingBox().size.width, Character.character->getChildren().at(0)->getBoundingBox().size.height));
	this->addChild(Character.character, zOrderPathLayer.character);
	Character.character->runAction(Character.action);
	Character.action->play("run", true);
	Character.character->setScale(0.65);
/*
	Character.action = CSLoader::createTimeline("animation.csb");
	Character.character = (Sprite *)CSLoader::createNode("animation.csb");
	Character.character->setPosition(Vec2((visibleSize.width * 30 / 100) + origin.x, LayerYcoord.firstLayer + origin.y));
  //Character.character->setContentSize(cocos2d::Size(Character.character->getChildren().at(0)->getBoundingBox().size.width, Character.character->getChildren().at(0)->getBoundingBox().size.height));
	this->addChild(Character.character, 20);
	Character.character->runAction(Character.action);
	Character.character->setScale(0.35);
	Character.action->play("animation0", true);
*/
	EndlessRunner :: beforeInitBackgroundScene();
	EndlessRunner::sceneBackgroundFlow();

	SpriteCreate* mountain;
	int MountainRandomvalue = 0;
	int startPosition = 0;

	for (int i = 0; i <= 7; i++) {
	if (i != 7) {	
		MountainRandomvalue = EndlessRunner::randmValueIncludeBoundery(0, (sizeof(mountainMidImages) / sizeof(mountainMidImages[0])) - 1);
		mountain = SpriteCreate::createSprite(mountainMidImages[MountainRandomvalue], rightBarrier -> getPosition().x + origin.x, LayerYcoord.groundLevel + origin.y, 0, LayerYcoord.anchorPointFirstLayer, mountainTypeObject.midLandPart, mountainTypeObject.midLandPart, mountainLayerTypes.FirstLayer, false);
		this -> addChild(mountain, zOrderPathLayer.firstLayer);
	}
	else {
		mountain = SpriteCreate::createSprite("path_right_lands.png", rightBarrier->getPosition().x + origin.x, LayerYcoord.groundLevel + origin.y, 0, LayerYcoord.anchorPointFirstLayer, mountainTypeObject.endLandPart, mountainTypeObject.gapLand, mountainLayerTypes.FirstLayer, false);
		this -> addChild(mountain, zOrderPathLayer.firstLayer);
	}
		mountain -> setPosition(startPosition + origin.x, 0 + origin.y);
		startPosition = startPosition + mountain->getContentSize().width;
		allPathBlocks.push_back(mountain);
		position = EndlessRunner::movingUpto(0.0);
		mountain -> runAction(MoveTo::create(EndlessRunner::movingTime(mountain), Vec2(position.first, position.second)));
	}
	
	jumpMode = false;
	SpriteCreate* object1 = SpriteCreate::createSprite("gapw.png", (rightBarrier->getPosition().x + origin.x), ((visibleSize.height * 0) + origin.y), 0, 0, mountainTypeObject.gapLand, mountainTypeObject.startLandPart, mountainLayerTypes.gap, true);
	this->addChild(object1, zOrderPathLayer.gapLand);
	allPathBlocks.push_back(object1);
	object1->setScaleY(6.0);
	position = EndlessRunner::movingUpto(0.0);
	object1->runAction(MoveTo::create(EndlessRunner::movingTime(object1), Vec2(position.first, position.second)));
	currentFirstLayerRock = object1;
	FirstLayerModes = 1;
	Character.onAir = true;
	this->schedule(schedule_selector(EndlessRunner::sceneTree1Flow), 2.5f);
	this->schedule(schedule_selector(EndlessRunner::sceneTree2Flow), 1.4f);
	this->schedule(schedule_selector(EndlessRunner::CreateMonsterWithLetter), 4.0f);
	
	this->scheduleUpdate();

	return true;
}

void EndlessRunner::update(float delta) {

	if (Character.onAir) {
		EndlessRunner::FallDownCharacter();
	}

	if (Character.stillCheckFalg) {
		EndlessRunner::stillCharacterOnPath();
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

void EndlessRunner::stillCharacterOnPath(){

	for (std::size_t i = 0; i < allPathBlocks.size(); i++) {
		/*auto man = Character.character;
		
		auto box = Character.character->getChildren().at(5)->getBoundingBox();
		Rect parent = Character.character->getBoundingBox();
		Rect boxs = Rect(parent.origin.x, parent.origin.y, box.size.width * 0.35,box.size.height * 0.35);
*/
		if (Character.character->getBoundingBox().intersectsRect(allPathBlocks[i]->getBoundingBox())) {
			if (allPathBlocks[i]->LayerTypeName == mountainLayerTypes.FirstLayer && !LayerMode.gapMode) {
				CCLOG("FIRST LAYER ");
				Character.character->setPositionY(LayerYcoord.firstLayer);
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

					auto main_Sequence = Sequence::create(A, DelayTime::create(0.2), B,NULL);
					Character.character->runAction(main_Sequence);

				}
			}
			else if (allPathBlocks[i]->LayerTypeName == mountainLayerTypes.SecondLayer && !LayerMode.gapMode) {
				CCLOG("SECOND LAYER ");
			Character.character->setPositionY(LayerYcoord.secondLayer);

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

					auto main_Sequence = Sequence::create(A, DelayTime::create(0.2), B, NULL);
					Character.character->runAction(main_Sequence);
				}
			}
			else if (allPathBlocks[i]->LayerTypeName == mountainLayerTypes.gap) {
				CCLOG("GAP ");
				Character.Clicked = true;
				LayerMode.gapMode = true;
			}
		}
		else {
			Character.character->setPositionY(Character.character->getPositionY() - 0.85);
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

	if (SecondLayerModes == LayerMode.SecondLayerRightIntersectMode) {
		if (!rightBarrier->getBoundingBox().intersectsRect(currentSecondLayerRock->getBoundingBox())) {
			SecondLayerModes = 4;

			EndlessRunner::AddRocksInSecondLayerPath();
		}
	}

	for (std::size_t i = 0; i < allLabels.size(); i++) {
		if (Character.character->getBoundingBox().intersectsRect(allLabels[i]->getBoundingBox()))//.intersectsRect(Character.character->getChildren().at(0)->getBoundingBox()))
		{
			if (allLabels[i]->getName() == tempChar) {
				for (std::size_t j = 0; j < allBoard.size(); j++) {
					if (allLabels[i]->getTag() == allBoard[j]->getTag()) {
						this->removeChild(allLabels[i]);
						allLabels.erase(allLabels.begin() + i);

						this->removeChild(allBoard[j]);
						allBoard.erase(allBoard.begin() + j);
						
						for (std::size_t k = 0; k <allMonster.size(); k++) {
							if (allMonster[k]->getTag() == allLabels[i]->getTag()) {
								allMonster[k-1]->runAction(MoveBy::create(5, Vec2((visibleSize.width * 90 / 100) + origin.x, (visibleSize.height * 70 / 100) + origin.y)));
							}
						}
					}
				}
			}
		}
	}
}

void EndlessRunner::sceneBackgroundFlow() {
	currentlayer1Sprite = EndlessRunner::CreateSprites("layer_1_mountain.png", rightBarrier->getPosition().x + origin.x - LayerMode.tolerence, SceneLayerYCoordinate.layer1, 1, 1, zOrderPathLayer.layer1, "scene");
	currentlayer1Sprite ->runAction(MoveTo::create(EndlessRunner::movingTimes(currentlayer1Sprite,LayerMode.Layer1Speed), Vec2(leftBarrierForBigObject->getPosition().x + origin.x,SceneLayerYCoordinate.layer1)));

	currentlayer2Sprite = EndlessRunner::CreateSprites("layer_2_mountain.png",0, SceneLayerYCoordinate.layer2, 1, 1, zOrderPathLayer.layer2, "scene");
	currentlayer2Sprite->setPositionX(rightBarrier->getPosition().x + origin.x - LayerMode.tolerence - currentlayer2Sprite->getContentSize().width/3);
	currentlayer2Sprite->runAction(MoveTo::create(EndlessRunner::movingTimes(currentlayer2Sprite, LayerMode.Layer2Speed), Vec2(leftBarrierForBigObject->getPosition().x + origin.x, SceneLayerYCoordinate.layer2)));

	currentlayer3Sprite = EndlessRunner::CreateSprites("layer_3_bush.png", 0, SceneLayerYCoordinate.layer3, 1, 1, zOrderPathLayer.layer3, "scene");
	currentlayer3Sprite->setPositionX(rightBarrier->getPosition().x + origin.x - LayerMode.tolerence - currentlayer3Sprite->getContentSize().width / 3);
	currentlayer3Sprite->runAction(MoveTo::create(EndlessRunner::movingTimes(currentlayer3Sprite, LayerMode.Layer3Speed), Vec2(leftBarrierForBigObject->getPosition().x + origin.x, SceneLayerYCoordinate.layer3)));

	currentlayer5Sprite = EndlessRunner::CreateSprites("layer_5_bush.png", 0, SceneLayerYCoordinate.layer5, 1, 1, zOrderPathLayer.layer5, "scene");
	currentlayer5Sprite->setPositionX(rightBarrier->getPosition().x + origin.x - LayerMode.tolerence - currentlayer5Sprite->getContentSize().width / 3);
	currentlayer5Sprite->runAction(MoveTo::create(EndlessRunner::movingTimes(currentlayer5Sprite, LayerMode.Layer5Speed), Vec2(leftBarrierForBigObject->getPosition().x + origin.x, SceneLayerYCoordinate.layer5)));

	currentlayer7Sprite = EndlessRunner::CreateSprites("layer_7_bush.png", 0, SceneLayerYCoordinate.layer7, 1, 1, zOrderPathLayer.layer7, "scene");
	currentlayer7Sprite->setPositionX(rightBarrier->getPosition().x + origin.x - LayerMode.tolerence - currentlayer5Sprite->getContentSize().width / 3);
	currentlayer7Sprite->runAction(MoveTo::create(EndlessRunner::movingTimes(currentlayer7Sprite, LayerMode.Layer7Speed), Vec2(leftBarrierForBigObject->getPosition().x + origin.x, SceneLayerYCoordinate.layer7)));
}

void EndlessRunner::mountainLayer1() {
	if (!rightBarrier->getBoundingBox().intersectsRect(currentlayer1Sprite->getBoundingBox())) {
	
		Sprite* layer1 = Sprite::createWithSpriteFrameName("layer_1_mountain.png");
		layer1->setPosition(Vec2(rightBarrier->getPosition().x + origin.x - LayerMode.tolerence , SceneLayerYCoordinate.layer1));
		layer1->setAnchorPoint(Vec2(0, 0));
		
		int xSpeedIndexRange = EndlessRunner::randmValueIncludeBoundery(0, 6);
		layer1->setScaleX(xSizeArray[xSpeedIndexRange]);
		
		this->addChild(layer1, zOrderPathLayer.layer1);
		currentlayer1Sprite = layer1;
		allSceneObject.push_back(layer1);
		currentlayer1Sprite->runAction(MoveTo::create(EndlessRunner::movingTimes(currentlayer1Sprite, LayerMode.Layer1Speed), Vec2(leftBarrierForBigObject->getPosition().x + origin.x, SceneLayerYCoordinate.layer1)));
	}

	if (!rightBarrier->getBoundingBox().intersectsRect(currentlayer2Sprite->getBoundingBox())) {

		Sprite* layer2 = Sprite::createWithSpriteFrameName("layer_2_mountain.png");
		layer2->setPosition(Vec2(rightBarrier->getPosition().x + origin.x - LayerMode.tolerence , SceneLayerYCoordinate.layer2));
		layer2->setAnchorPoint(Vec2(0, 0));

		int xSpeedIndexRange = EndlessRunner::randmValueIncludeBoundery(0, 6);
		layer2->setScaleX(xSizeArray[xSpeedIndexRange]);

		this->addChild(layer2, zOrderPathLayer.layer2);
		currentlayer2Sprite = layer2;
		allSceneObject.push_back(layer2);
		currentlayer2Sprite->runAction(MoveTo::create(EndlessRunner::movingTimes(currentlayer2Sprite, LayerMode.Layer2Speed), Vec2(leftBarrierForBigObject->getPosition().x + origin.x, SceneLayerYCoordinate.layer2)));
	}

	if (!rightBarrier->getBoundingBox().intersectsRect(currentlayer3Sprite->getBoundingBox())) {

		Sprite* layer3 = Sprite::createWithSpriteFrameName("layer_3_bush.png");
		layer3->setPosition(Vec2(rightBarrier->getPosition().x + origin.x - LayerMode.tolerence, SceneLayerYCoordinate.layer3));
		layer3->setAnchorPoint(Vec2(0, 0));
		this->addChild(layer3, zOrderPathLayer.layer3);
		currentlayer3Sprite = layer3;
		allSceneObject.push_back(layer3);
		currentlayer3Sprite->runAction(MoveTo::create(EndlessRunner::movingTimes(currentlayer3Sprite, LayerMode.Layer3Speed), Vec2(leftBarrierForBigObject->getPosition().x + origin.x, SceneLayerYCoordinate.layer3)));
	}

	if (!rightBarrier->getBoundingBox().intersectsRect(currentlayer5Sprite->getBoundingBox())) {

		Sprite* layer5 = Sprite::createWithSpriteFrameName("layer_5_bush.png");
		layer5->setPosition(Vec2(rightBarrier->getPosition().x + origin.x - LayerMode.tolerence, SceneLayerYCoordinate.layer5));
		layer5->setAnchorPoint(Vec2(0, 0));
		this->addChild(layer5, zOrderPathLayer.layer5);
		currentlayer5Sprite = layer5;
		allSceneObject.push_back(layer5);
		currentlayer5Sprite->runAction(MoveTo::create(EndlessRunner::movingTimes(currentlayer5Sprite, LayerMode.Layer5Speed), Vec2(leftBarrierForBigObject->getPosition().x + origin.x, SceneLayerYCoordinate.layer5)));
	}

	if (!rightBarrier->getBoundingBox().intersectsRect(currentlayer7Sprite->getBoundingBox())) {

		Sprite* layer7 = Sprite::createWithSpriteFrameName("layer_7_bush.png");
		layer7->setPosition(Vec2(rightBarrier->getPosition().x + origin.x - LayerMode.tolerence, SceneLayerYCoordinate.layer7));
		layer7->setAnchorPoint(Vec2(0, 0));
		this->addChild(layer7, zOrderPathLayer.layer7);
		currentlayer7Sprite = layer7;
		allSceneObject.push_back(layer7);
		currentlayer7Sprite->runAction(MoveTo::create(EndlessRunner::movingTimes(currentlayer7Sprite, LayerMode.Layer7Speed), Vec2(leftBarrierForBigObject->getPosition().x + origin.x, SceneLayerYCoordinate.layer7)));
	}
}

void EndlessRunner::sceneTree1Flow(float dt) {

	int MountainRandomvalue = EndlessRunner::randmValueIncludeBoundery(0, (sizeof(treeLayer4) / sizeof(treeLayer4[0])) - 1);
	Sprite* layer4 = Sprite::createWithSpriteFrameName(treeLayer4[MountainRandomvalue]);
	layer4->setPosition(Vec2(rightBarrier->getPosition().x + origin.x , SceneLayerYCoordinate.layer4));
	layer4->setAnchorPoint(Vec2(0, 0));
	this->addChild(layer4, zOrderPathLayer.layer4);
	allSceneObject.push_back(layer4);
	layer4->runAction(MoveTo::create(EndlessRunner::movingTimes(layer4, LayerMode.Layer4Speed), Vec2(leftBarrierForBigObject->getPosition().x + origin.x, SceneLayerYCoordinate.layer4)));
}

void EndlessRunner::sceneTree2Flow(float dt) {
	int MountainRandomvalue = EndlessRunner::randmValueIncludeBoundery(0, (sizeof(treeLayer6) / sizeof(treeLayer6[0])) - 1);
	Sprite* layer6 = Sprite::createWithSpriteFrameName(treeLayer6[MountainRandomvalue]);
	layer6->setPosition(Vec2(rightBarrier->getPosition().x + origin.x, SceneLayerYCoordinate.layer6));
	layer6->setAnchorPoint(Vec2(0, 0));
	this->addChild(layer6, zOrderPathLayer.layer6);
	allSceneObject.push_back(layer6);
	layer6->runAction(MoveTo::create(EndlessRunner::movingTimes(layer6, LayerMode.Layer6Speed), Vec2(leftBarrierForBigObject->getPosition().x + origin.x, SceneLayerYCoordinate.layer6)));

}

void EndlessRunner::beforeInitBackgroundScene() {
	
	int newtolerence = 0;
	
		Sprite* layer0 = Sprite::createWithSpriteFrameName("ground.png");
		layer0->setPosition(Vec2(origin.x,origin.y));
		layer0->setScaleX(2560.0);
		layer0->setScaleY(0.8);
		layer0->setAnchorPoint(Vec2(0, 0));
		this->addChild(layer0, zOrderPathLayer.layer0);

	for (int i = 0; i < 3; i++) {
		Sprite* layer1 = Sprite::createWithSpriteFrameName("layer_1_mountain.png");
		newtolerence = newtolerence + (LayerMode.tolerence);
		layer1->setPosition(Vec2(origin.x + (layer1->getContentSize().width * i) - newtolerence - layer1->getContentSize().width/2, SceneLayerYCoordinate.layer1));
		//layer1->setScaleY(2.7);
		layer1->setAnchorPoint(Vec2(0, 0));
		this->addChild(layer1, zOrderPathLayer.layer1);
		layer1->runAction(MoveTo::create(EndlessRunner::movingTimes(layer1, LayerMode.Layer1Speed), Vec2(leftBarrierForBigObject->getPosition().x + origin.x, SceneLayerYCoordinate.layer1)));
		allSceneObject.push_back(layer1);
	}
	newtolerence = 0;
	for (int i = 0; i < 2; i++) {
		Sprite* layer2 = Sprite::createWithSpriteFrameName("layer_2_mountain.png");
		newtolerence = newtolerence + (LayerMode.tolerence);
		layer2->setPosition(Vec2(origin.x + (layer2->getContentSize().width * i) - newtolerence, SceneLayerYCoordinate.layer2));
		//layer2->setScaleX(0.7);
		layer2->setAnchorPoint(Vec2(0, 0));
		layer2->runAction(MoveTo::create(EndlessRunner::movingTimes(layer2, LayerMode.Layer2Speed), Vec2(leftBarrierForBigObject->getPosition().x + origin.x, SceneLayerYCoordinate.layer2)));
		this->addChild(layer2, zOrderPathLayer.layer2);
		allSceneObject.push_back(layer2);
	
	}
	
	newtolerence = 0;
	for (int i = 0; i < 2; i++) {
		Sprite* layer3 = Sprite::createWithSpriteFrameName("layer_3_bush.png");
		newtolerence = newtolerence + (LayerMode.tolerence*2);
		layer3->setPosition(Vec2(origin.x + (layer3->getContentSize().width * i)-newtolerence , SceneLayerYCoordinate.layer3));
		//layer3->setScaleX(0.7);
		layer3->runAction(MoveTo::create(EndlessRunner::movingTimes(layer3, LayerMode.Layer3Speed), Vec2(leftBarrierForBigObject->getPosition().x + origin.x, SceneLayerYCoordinate.layer3)));
		layer3->setAnchorPoint(Vec2(0, 0));
		this->addChild(layer3, zOrderPathLayer.layer3);
		allSceneObject.push_back(layer3);
		
	}
	newtolerence = 0;
	for (int i = 0; i < 4; i++) {
		Sprite* layer4 = Sprite::createWithSpriteFrameName(treeLayer4[2]);
		newtolerence = newtolerence + (LayerMode.tolerence);
		layer4->setPosition(Vec2(origin.x + (layer4->getContentSize().width * i) - newtolerence, SceneLayerYCoordinate.layer4));
		layer4->runAction(MoveTo::create(EndlessRunner::movingTimes(layer4, LayerMode.Layer4Speed), Vec2(leftBarrierForBigObject->getPosition().x + origin.x, SceneLayerYCoordinate.layer4)));
		//layer4->setScaleX(0.7);
		layer4->setAnchorPoint(Vec2(0, 0));
		this->addChild(layer4, zOrderPathLayer.layer4);
		allSceneObject.push_back(layer4);
		
	}
	newtolerence = 0;
	for (int i = 0; i < 2; i++) {
		Sprite* layer5 = Sprite::createWithSpriteFrameName("layer_5_bush.png");
		newtolerence = newtolerence + (LayerMode.tolerence * 2);
		layer5->setPosition(Vec2(origin.x + (layer5->getContentSize().width * i)-newtolerence, SceneLayerYCoordinate.layer5));
		layer5->runAction(MoveTo::create(EndlessRunner::movingTimes(layer5, LayerMode.Layer5Speed), Vec2(leftBarrierForBigObject->getPosition().x + origin.x, SceneLayerYCoordinate.layer5)));
		//layer5->setScaleX(0.7);
		layer5->setAnchorPoint(Vec2(0, 0));
		this->addChild(layer5, zOrderPathLayer.layer5);
		allSceneObject.push_back(layer5);
		
	}
	newtolerence = 0;
	for (int i = 0; i < 4; i++) {
		
		Sprite* layer6 = Sprite::createWithSpriteFrameName(treeLayer6[0]);
		/*newtolerence = newtolerence + (LayerMode.tolerence * 2);*/
		
		layer6->setPosition(Vec2(origin.x + (layer6->getContentSize().width * i), SceneLayerYCoordinate.layer6));
		layer6->runAction(MoveTo::create(EndlessRunner::movingTimes(layer6, LayerMode.Layer6Speed), Vec2(leftBarrierForBigObject->getPosition().x + origin.x, SceneLayerYCoordinate.layer6)));
		//layer6->setScaleX(0.7);
		layer6->setAnchorPoint(Vec2(0, 0));
		this->addChild(layer6, zOrderPathLayer.layer6);
		allSceneObject.push_back(layer6);
		
	}
	newtolerence = 0;
	for (int i = 0; i < 2; i++) {
		Sprite* layer7 = Sprite::createWithSpriteFrameName("layer_7_bush.png");
		newtolerence = newtolerence + (LayerMode.tolerence * 2);
		layer7->setPosition(Vec2(origin.x + (layer7->getContentSize().width * i) - newtolerence, SceneLayerYCoordinate.layer7));
		layer7->runAction(MoveTo::create(EndlessRunner::movingTimes(layer7, LayerMode.Layer7Speed), Vec2(leftBarrierForBigObject->getPosition().x + origin.x, SceneLayerYCoordinate.layer7)));
		//layer7->setScaleX(0.7);
		layer7->setAnchorPoint(Vec2(0, 0));
		this->addChild(layer7, zOrderPathLayer.layer7);
		allSceneObject.push_back(layer7);
	}
}

void EndlessRunner::AddRocksInFirstLayerPath() {

	if (currentFirstLayerRock->NextRockName == mountainTypeObject.gapLand) {

		SpriteCreate* currentImage = SpriteCreate::createSprite("gapw.png", EndlessRunner::setPositionX(currentFirstLayerRock), LayerYcoord.groundLevel + origin.y, 0, LayerYcoord.anchorPointFirstLayer, mountainTypeObject.gapLand, mountainTypeObject.startLandPart, mountainLayerTypes.gap, true);
		this->addChild(currentImage, zOrderPathLayer.firstLayer);
		allPathBlocks.push_back(currentImage);
		currentFirstLayerRock = currentImage;
		currentImage->setScaleY(6.0);
		position = EndlessRunner::movingUpto(LayerYcoord.groundLevel);
		currentFirstLayerRock->runAction(MoveTo::create(EndlessRunner::movingTime(currentFirstLayerRock), Vec2(leftBarrier->getPosition().x + origin.x, position.second)));
		FirstLayerModes = 1;
		FirstLayerstartFlag = false;
	}

	if (currentFirstLayerRock->NextRockName == mountainTypeObject.endLandPart) {

		SpriteCreate* currentImage = SpriteCreate::createSprite("path_right_lands.png", EndlessRunner::setPositionX(currentFirstLayerRock), LayerYcoord.groundLevel + origin.y, 0, LayerYcoord.anchorPointFirstLayer, mountainTypeObject.endLandPart, mountainTypeObject.gapLand, mountainLayerTypes.FirstLayer, false);
		this->addChild(currentImage, zOrderPathLayer.firstLayer);
		allPathBlocks.push_back(currentImage);
		
		currentFirstLayerRock = currentImage;
		position = EndlessRunner::movingUpto(LayerYcoord.groundLevel);
		currentFirstLayerRock->runAction(MoveTo::create(EndlessRunner::movingTime(currentFirstLayerRock), Vec2(position.first, position.second)));
		FirstLayerModes = 1;
	}

	if (currentFirstLayerRock->NextRockName == mountainTypeObject.midLandPart) {

		int MountainRandomvalue = EndlessRunner::randmValueIncludeBoundery(0, (sizeof(mountainMidImages) / sizeof(mountainMidImages[0])) - 1);

		SpriteCreate* currentImage = SpriteCreate::createSprite(mountainMidImages[MountainRandomvalue], EndlessRunner::setPositionX(currentFirstLayerRock), LayerYcoord.groundLevel + origin.y, 0, LayerYcoord.anchorPointFirstLayer, mountainTypeObject.midLandPart, "", mountainLayerTypes.FirstLayer, false);

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
			else if (25 < FirstLayerCounterMidObjectValue && FirstLayerCounterMidObjectValue <= 45) {
				int randomMidFromFirstLayer = EndlessRunner::randmValueIncludeBoundery(1, (FirstLayerCounterMidObjectValue - 2));
				SecondLayerSpacing = EndlessRunner::randmValueIncludeBoundery(0, FirstLayerCounterMidObjectValue - randomMidFromFirstLayer);

				if (SecondLayerSpacing == 0) {
					SpriteCreate* newSprite = EndlessRunner::addUpperLayerStartSpriteRock(currentFirstLayerRock, mountainLayerTypes.SecondLayer, LayerYcoord.firstLayer, zOrderPathLayer.secondLayer, 0);
					currentSecondLayerRock = newSprite;
					currentSecondLayerRock->runAction(MoveTo::create(EndlessRunner::movingTime(currentSecondLayerRock), Vec2(leftBarrier->getPosition().x + origin.x, LayerYcoord.firstLayer)));
					SecondLayerModes = 2;
					SecondLayerSpacing = -1;

				//	SpriteCreate* frontSprite = EndlessRunner::addUpperLayerStartSpriteRock(currentFirstLayerRock, mountainLayerTypes.SecondLayer, LayerYcoord.firstLayer, zOrderPathLayer.secondLayer, 0);
				
				
				}
				SecondLayerCounterMidObjectValue = randomMidFromFirstLayer;

			}
			else if (45 < FirstLayerCounterMidObjectValue && FirstLayerCounterMidObjectValue <= 60) {

				int randomMidFromFirstLayer = EndlessRunner::randmValueIncludeBoundery(1, FirstLayerCounterMidObjectValue - 1);
				SecondLayerSpacing = EndlessRunner::randmValueIncludeBoundery(0, FirstLayerCounterMidObjectValue - randomMidFromFirstLayer);
				int randomMidFromSecondLayer = 0;

				if (randomMidFromFirstLayer != 1) {
					randomMidFromSecondLayer = EndlessRunner::randmValueIncludeBoundery(1, randomMidFromFirstLayer - 2);
				}
				else {
					randomMidFromSecondLayer = 1;
				}

				if (SecondLayerSpacing == 0) {
					SpriteCreate* newSprite = EndlessRunner::addUpperLayerStartSpriteRock(currentFirstLayerRock, mountainLayerTypes.SecondLayer, LayerYcoord.firstLayer, zOrderPathLayer.secondLayer, 0);
					currentSecondLayerRock = newSprite;
					currentSecondLayerRock->runAction(MoveTo::create(EndlessRunner::movingTime(currentSecondLayerRock), Vec2(leftBarrier->getPosition().x + origin.x, LayerYcoord.firstLayer)));
					SecondLayerModes = 2;
					SecondLayerSpacing = -1;
				}
				SecondLayerCounterMidObjectValue = randomMidFromFirstLayer;
			}
		}

		SpriteCreate* currentImage = SpriteCreate::createSprite("path_left_lands.png", EndlessRunner::setPositionX(currentFirstLayerRock), LayerYcoord.groundLevel + origin.y, 0, LayerYcoord.anchorPointFirstLayer, mountainTypeObject.startLandPart, mountainTypeObject.midLandPart, mountainLayerTypes.FirstLayer, false);
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

		SpriteCreate* currentImage = SpriteCreate::createSprite("path_right_lands.png", EndlessRunner::setPositionX(currentSecondLayerRock), LayerYcoord.firstLayer, 0, 0, mountainTypeObject.endLandPart, mountainTypeObject.gapLand, mountainLayerTypes.SecondLayer, false);
		this->addChild(currentImage, zOrderPathLayer.secondLayer);
		allPathBlocks.push_back(currentImage);
		currentSecondLayerRock = currentImage;
		currentSecondLayerRock->runAction(MoveTo::create(EndlessRunner::movingTime(currentSecondLayerRock), Vec2(leftBarrier->getPosition().x + origin.x, LayerYcoord.firstLayer)));
		//SecondLayerModes = 1;
	}

	if (currentSecondLayerRock->NextRockName == mountainTypeObject.midLandPart) {

		int MountainRandomvalue = randmValueIncludeBoundery(0, (sizeof(mountainMidImages) / sizeof(mountainMidImages[0])) - 1);

		SpriteCreate* currentImage = SpriteCreate::createSprite(mountainMidImages[MountainRandomvalue], EndlessRunner::setPositionX(currentSecondLayerRock), LayerYcoord.firstLayer, 0, LayerYcoord.anchorPointFirstLayer, mountainTypeObject.midLandPart, "", mountainLayerTypes.SecondLayer, false);
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

Sprite* EndlessRunner::CreateSprites(std::string name, int PositionX, int positionY,float scaleX,float scaleY, int zOrder,std::string vectorType) {
	Sprite* sprite = Sprite::createWithSpriteFrameName(name);
	sprite->setPosition(Vec2(PositionX,positionY));
	sprite->setAnchorPoint(Vec2(0,0));
	sprite->setScaleX(scaleX);
	sprite->setScaleY(scaleY);
	this->addChild(sprite, zOrder);

	if (vectorType == "path") {
		allSceneObject.push_back(sprite);
	}
	else if(vectorType == "scene"){
		
	}
	return sprite;
}

SpriteCreate* EndlessRunner::addUpperLayerStartSpriteRock(SpriteCreate* SpriteObject, std::string MountainType, int positionY, int zOrder, int xCordinateforBlankSpace) {

	SpriteCreate* currentImage = SpriteCreate::createSprite("path_left_lands.png", EndlessRunner::setPositionX(SpriteObject), positionY, 0, LayerYcoord.anchorPointFirstLayer, mountainTypeObject.startLandPart, mountainTypeObject.midLandPart, MountainType, false);
	this->addChild(currentImage, zOrder);
	allPathBlocks.push_back(currentImage);

	SpriteCreate* extra = SpriteCreate::createSprite("bgTouchImage.png", EndlessRunner::setPositionX(SpriteObject), positionY, 0, 0, "HurdleInFirstRock","", MountainType, false);
	extra->setScaleX(10.0);
	extra->setScaleY(50.0);
	this->addChild(extra, zOrderPathLayer.character);
	allPathBlocks.push_back(extra);
	extra->runAction(MoveTo::create(EndlessRunner::movingTime(currentImage), Vec2(leftBarrier->getPosition().x + origin.x, positionY)));

	return currentImage;
}

float EndlessRunner::movingTime(SpriteCreate* SpriteObject) {

	if (leftBarrier->getPosition().x < 0) {
		return ((SpriteObject->getPosition().x + std::abs(leftBarrier->getPosition().x)) / LayerMode.PathMovingSpeed);
	}

	return ((SpriteObject->getPosition().x - std::abs(leftBarrier->getPosition().x)) / LayerMode.PathMovingSpeed);
}

float EndlessRunner::movingTimes(Sprite* SpriteObject,int Speed) {

	if (leftBarrierForBigObject->getPosition().x < 0) {
		return ((SpriteObject->getPosition().x + std::abs(leftBarrierForBigObject->getPosition().x)) / Speed);
	}

	return ((SpriteObject->getPosition().x - std::abs(leftBarrierForBigObject->getPosition().x)) / Speed);
}

std::pair<float, float> EndlessRunner::movingUpto(float positionY) {

	return std::make_pair((leftBarrier->getPosition().x + origin.x), (visibleSize.height * positionY) + origin.y);
}

float EndlessRunner::setPositionX(SpriteCreate* SpriteObject) {

	return (SpriteObject->getPosition().x + SpriteObject->getContentSize().width - LayerMode.tolerence);
}

int EndlessRunner::randmValueIncludeBoundery(int min, int max) {
	int maxValue = max , minValue = min;
	if (min > max) {
		maxValue = min;  minValue = max;
	}
	else if (min == max) {
		return min;
	}
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
		if (allMonster[i]->getBoundingBox().intersectsRect(upBarrier->getBoundingBox()))
		{
			this->removeChild(allMonster[i]);
			allMonster.erase(allMonster.begin() + i);
		}
	}
}

void EndlessRunner::CreateMonsterWithLetter(float dt) {

	SpriteCreate* monsterImage = SpriteCreate::createSprite("monster1.png",rightBarrier->getPosition().x + origin.x, (visibleSize.height * 26 / 100) + origin.y, 0, 0, "yellowMonster", "", "", false);
	monsterImage->setScale(1.4);
	
	auto extra = SpriteCreate::createSprite("board.png", rightBarrier->getPosition().x + origin.x, (visibleSize.height * 26 / 100) + origin.y, 0, 0, "yellowMonster", "", "", false);
	//extra->setScale(0.35);
	
	int Index = EndlessRunner::randmValueIncludeBoundery(0, (sizeof(letters) / sizeof(letters[0])) - 1);
	std::string letterOnBoard = letters[Index];

	auto label = Label::createWithTTF(letterOnBoard,"fonts/Marker Felt.ttf", 128);
	label->setTextColor(Color4B(255, 255, 255, 255));
	label->setAnchorPoint(Vec2(0, 0));
	label->setName(letterOnBoard);

	label->setTag(Character.uniqueId);
	extra->setTag(Character.uniqueId);
	monsterImage->setTag(Character.uniqueId);

	if (SecondLayerModes == LayerMode.SecondLayerRightIntersectMode) {
		
		monsterImage->setPosition(Vec2(rightBarrier->getPosition().x + origin.x, (visibleSize.height * 75 / 100) + origin.y));
		monsterImage->currentRockName = mountainLayerTypes.SecondLayer;

		extra->setPosition(Vec2(rightBarrier->getPosition().x + origin.x + 10, (visibleSize.height * 64.6 / 100) + origin.y));
		label->setPosition(Vec2(rightBarrier->getPosition().x + origin.x + 80, (visibleSize.height * 66 / 100) + origin.y));

	}else if (FirstLayerModes == LayerMode.FirstLayerRightIntersectMode) {
		monsterImage->setPosition(Vec2(rightBarrier->getPosition().x + origin.x, (visibleSize.height * 60 / 100) + origin.y));
		monsterImage->currentRockName = mountainLayerTypes.FirstLayer;

		extra->setPosition(Vec2(rightBarrier->getPosition().x + origin.x + 10, (visibleSize.height * 49.6 / 100) + origin.y));
		label->setPosition(Vec2(rightBarrier->getPosition().x + origin.x + 80, (visibleSize.height * 51 / 100) + origin.y));
	}else {
		monsterImage->setPosition(Vec2(rightBarrier->getPosition().x + origin.x, (visibleSize.height * 60 / 100) + origin.y));
		monsterImage->currentRockName = mountainLayerTypes.FirstLayer;

		extra->setPosition(Vec2(rightBarrier->getPosition().x + origin.x + 10, (visibleSize.height * 49.6 / 100) + origin.y));
		label->setPosition(Vec2(rightBarrier->getPosition().x + origin.x + 80, (visibleSize.height * 51 / 100) + origin.y));
	}

	this->addChild(label, zOrderPathLayer.character);
	this->addChild(extra, zOrderPathLayer.secondLayer);
	this->addChild(monsterImage, zOrderPathLayer.secondLayer);
	
	//label->setPosition(Vec2(1000, 1000));
	monsterImage->runAction(MoveTo::create(EndlessRunner::movingTime(monsterImage), Vec2(leftBarrier->getPosition().x + origin.x, monsterImage->getPosition().y)));
	extra->runAction(MoveTo::create(EndlessRunner::movingTime(extra), Vec2(leftBarrier->getPosition().x + origin.x, extra->getPosition().y)));
	label->runAction(MoveTo::create((label->getPosition().x + std::abs(leftBarrier->getPosition().x)) / LayerMode.PathMovingSpeed, Vec2(leftBarrier->getPosition().x + origin.x, label->getPosition().y)));

	Character.uniqueId = Character.uniqueId + 1;

	allBoard.push_back(extra);
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
				auto B = CallFunc::create([=]() {
					Character.action->play("jump_up", false);
				});
				auto C = MoveTo::create(Character.upTime, Vec2(Character.character->getPositionX(),Character.character->getPositionY() + LayerMode.heightJump));
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
				auto main_Sequence = Sequence::create(DelayTime::create(0.2),B,C, DelayTime::create(0.3),D,E,F, NULL);
				Character.character->runAction(main_Sequence);
			}
		}
		return false;
	};
	listener->onTouchEnded = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{	
	};
	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener, sprite);
}
