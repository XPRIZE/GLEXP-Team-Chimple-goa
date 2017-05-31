//
//  Baja.cpp 
//  goa
//
//  Created by Karim Mirazul  on 08/08/16
//
//

#include "Baja.h"

USING_NS_CC;

Scene* Baja::createScene(int levelPoints , int maxPoints)
{
	auto scene = Scene::create();
	auto layer = Baja::create(levelPoints, maxPoints);
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, Baja::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

Baja *Baja::create(int levelpoints , int maxPoints) {
	Baja *baja = new (std::nothrow) Baja();
	if (baja && baja->init(levelpoints , maxPoints)) {
		baja->autorelease();
		return baja;
	}
	CC_SAFE_DELETE(baja);
	return nullptr;

}

bool Baja::init(int levelPoints , int maxPoints)
{
	if (!Layer::init()){ return false;}
	CCSpriteFrameCache* framecache1 = CCSpriteFrameCache::sharedSpriteFrameCache();
	framecache1->addSpriteFramesWithFile("baja/baja.plist");
	CCSpriteFrameCache* framecache2 = CCSpriteFrameCache::sharedSpriteFrameCache();
	framecache2->addSpriteFramesWithFile("endlessrunner/endlessrunner_01.plist");
	_levelPoint = levelPoints;
	_maxPoint = maxPoints;
	auto visibleSize = Director::getInstance()->getVisibleSize();
	auto origin = Director::getInstance()->getVisibleOrigin();
	addInitPath(visibleSize, origin);
	
	auto loader = CSLoader::createNode("baja/bajafuelmeter.csb");
	addChild(loader,1);
	_fuelBar = (cocos2d::ui::LoadingBar*)(loader->getChildren()).at(1);	_fuelBar->setPercent(100);
	loader->setPosition(Vec2(_currentPathBlock->getPositionX() - (_currentPathBlock->getContentSize().width*0.42), origin.y + visibleSize.height * 0.60));
	loader->setScale(0.8);
	this->schedule(schedule_selector(Baja::carMidLeftGenerate),3.0f);
	this->schedule(schedule_selector(Baja::carRightGenerate),5.0f);
	this->schedule(schedule_selector(Baja::fuelMeterMethod), 0.2f);

	this->scheduleUpdate();
	return true;
}

void Baja::update(float delta) {

	if (_initBool) {
		for (std::size_t i = 0; i < _allPathBlocks.size(); i++) {
			if (_topBarrier->getBoundingBox().intersectsRect(_allPathBlocks[i]->getBoundingBox())) {
				if (_allPathBlocks[i]->getName() == "LastInitPath") {
					_currentPathBlock = _allPathBlocks[i];
					_initBool = false;
				}
			}
		}
	}

	for (std::size_t i = 0; i < _allCar.size(); i++) {
		if (_allCar[i]->getBoundingBox().intersectsRect(_userCar->getBoundingBox()))
		{
			this->removeChild(_allCar[i]);
			_allCar.erase(_allCar.begin() + i);
			auto blink = Blink::create(1.2, 10);
			auto visible = CallFunc::create([=]() {
				_userCar->setVisible(true);
			});
			auto blinking = Sequence::create(blink, visible, NULL);
			_userCar->runAction(blinking);
			_fuelBar->setPercent(_fuelBar->getPercent() - 7);

			auto collideSound = CocosDenshion::SimpleAudioEngine::getInstance();
			collideSound->playEffect("baja/sound/collision.wav", false);
			//car_move
		}
	}

	for(std::size_t i = 0; i < _allCar.size(); i++){
		if (_allCar[i]->getBoundingBox().intersectsRect(_bottomBarrier->getBoundingBox()))
		{
			this->removeChild(_allCar[i]);
			_allCar.erase(_allCar.begin() + i);
		}
	}

	for (size_t i = 0; i < _allPathBlocks.size() ;  i++) {
		if (_bottomBarrier->getBoundingBox().intersectsRect(_allPathBlocks[i]->getBoundingBox())) {
			this->removeChild(_allPathBlocks[i]);
			_allPathBlocks.erase(_allPathBlocks.begin() + i);
		}
	}

	if (!_topBarrier->getBoundingBox().intersectsRect(_currentPathBlock->getBoundingBox()) && !_initBool) {
		auto _visibleSize = Director::getInstance()->getVisibleSize();
		auto _origin = Director::getInstance()->getVisibleOrigin();
		std::ostringstream pathIndex;	pathIndex <<"baja/bajapath"<<randmValueIncludeBoundery(1,6)<<".png"; std::string blockName = pathIndex.str();
		auto newPathBlock = setSpriteProperties(blockName, _origin.x + _visibleSize.width / 2, _topBarrier->getPositionY()-100, 1, 1, 0.5, 0, 0, 0);
		_currentPathBlock = newPathBlock;
		_currentPathBlock->runAction(MoveTo::create(movingTime(_currentPathBlock, 800), Vec2(_currentPathBlock->getPositionX(), _bottomBarrier->getPositionY())));
		_allPathBlocks.push_back(_currentPathBlock);
	}
}

void Baja::userCarControl(Node* userCar1) {
	
	auto visibleSize = Director::getInstance()->getVisibleSize();
	auto origin = Director::getInstance()->getVisibleOrigin();

	Node* node1 = CSLoader::createNode("baja/bajabutton.csb");
	this->addChild(node1, 1);
	auto leftButton = static_cast<cocos2d::ui::Button *>(node1->getChildByName("Button"));
	leftButton->setScale(2);
	leftButton->setPosition(Vec2(_currentPathBlock->getPositionX() - (_currentPathBlock->getContentSize().width*0.43),origin.y + (leftButton->getContentSize().height)+50));  leftButton->setFlippedX(true);
	if (leftButton != NULL) {
		leftButton->addClickEventListener([=](Ref *) {
			auto moveSound = CocosDenshion::SimpleAudioEngine::getInstance();
		
			if (_positionFlag) {
				if (_positionCar == "left") {
					_positionCar = "left";
				}
				else if (_positionCar == "mid") {
					moveSound->playEffect("baja/sound/car_move.wav", false);
					userCar1->runAction(MoveTo::create(0.3, Vec2(_currentPathBlock->getPositionX() - (_currentPathBlock->getContentSize().width*0.24), 300)));	_positionCar = "left"; _positionFlag = false;
					userCar1->runAction(Sequence::create(DelayTime::create(0.3), CallFunc::create([=]() {_positionFlag = true; }), NULL));
				}
				else if (_positionCar == "right") {
					moveSound->playEffect("baja/sound/car_move.wav", false);
					userCar1->runAction(MoveTo::create(0.3, Vec2(_currentPathBlock->getPositionX(), 300)));	_positionCar = "mid"; _positionFlag = false;
					userCar1->runAction(Sequence::create(DelayTime::create(0.3), CallFunc::create([=]() {_positionFlag = true; }), NULL));
				}
			}
		});
	}

	Node* node2 = CSLoader::createNode("baja/bajabutton.csb");
	this->addChild(node2, 1);
	auto rightButton = static_cast<cocos2d::ui::Button *>(node2->getChildByName("Button"));
	rightButton->setScale(2);
	rightButton->setPosition(Vec2(_currentPathBlock->getPositionX() + (_currentPathBlock->getContentSize().width*0.43), origin.y + (rightButton->getContentSize().height) + 50));
	if (rightButton != NULL) {
		rightButton->addClickEventListener([=](Ref *) {
			auto moveSound = CocosDenshion::SimpleAudioEngine::getInstance();
			if (_positionFlag) {
				if (_positionCar == "left") {
					moveSound->playEffect("baja/sound/car_move.wav", false);
					userCar1->runAction(MoveTo::create(0.3, Vec2(_currentPathBlock->getPositionX(), 300)));	_positionCar = "mid"; _positionFlag = false;
					userCar1->runAction(Sequence::create(DelayTime::create(0.3), CallFunc::create([=]() {_positionFlag = true; }), NULL));
				}
				else if (_positionCar == "mid") {
					moveSound->playEffect("baja/sound/car_move.wav", false);
					userCar1->runAction(MoveTo::create(0.3, Vec2(_currentPathBlock->getPositionX() + (_currentPathBlock->getContentSize().width*0.24), 300)));	_positionCar = "right";	_positionFlag = false;
					userCar1->runAction(Sequence::create(DelayTime::create(0.3), CallFunc::create([=]() {_positionFlag = true; }), NULL));
				}
				else if (_positionCar == "right") {
					_positionCar = "right";
				}
			}
		});
	}
}

void Baja::carMidLeftGenerate(float dt)
{
	int decisionPath = randmValueIncludeBoundery(0,1);
	
	if(decisionPath == 0){
		std::string carArray[2] = { "greencaranimation","bluecaranimation" };
		auto userCarLeft = carGenerate(_currentPathBlock->getPositionX() - (_currentPathBlock->getContentSize().width*0.24) , _topBarrier->getPositionY(), carArray[randmValueIncludeBoundery(0, 1)], 30, 1);
		userCarLeft->runAction(MoveTo::create(carMovingTime(userCarLeft, 650), Vec2(userCarLeft->getPositionX(), _bottomBarrier->getPositionY())));
		_allCar.push_back(userCarLeft);
	}
	else {
		std::string carArray[2] = { "bluecaranimation","greencaranimation" };
		auto userCarMid = carGenerate(_currentPathBlock->getPositionX(), _topBarrier->getPositionY(), carArray[randmValueIncludeBoundery(0, 1)], 30, 1);
		userCarMid->runAction(MoveTo::create(carMovingTime(userCarMid, 650), Vec2(userCarMid->getPositionX(), _bottomBarrier->getPositionY())));
		_allCar.push_back(userCarMid);
	}
}

void Baja::carRightGenerate(float dt)
{
	std::string carArray[2] = {"bluecaranimation","greencaranimation"};
	auto userCarRight = carGenerate(_currentPathBlock->getPositionX() + (_currentPathBlock->getContentSize().width*0.24),_topBarrier->getPositionY(), carArray[randmValueIncludeBoundery(0, 1)], 30, 1);
	userCarRight->runAction(MoveTo::create(carMovingTime(userCarRight,650), Vec2(userCarRight->getPositionX(), _bottomBarrier->getPositionY())));
	_allCar.push_back(userCarRight);
}

void Baja::fuelMeterMethod(float dt)
{
	if (_fuelBar->getPercent() <= 0) {
		_menuContext->setMaxPoints(_maxPoint);
		_menuContext->addPoints(_levelPoint);
		_menuContext->showScore();
	}
	_fuelBar->setPercent(_fuelBar->getPercent() - 0.4);
}

void Baja::addInitPath(Size _visibleSize, Vec2 _origin) {
	this->addChild(LayerGradient::create(Color4B(255, 228, 87, 255), Color4B(255, 228, 87, 255)), 0);

	_topBarrier = setSpriteProperties("endlessrunner/barrier.png", _origin.x, _origin.y + _visibleSize.height + 200, 1, 2, 0, 0, 90, 0);
	_bottomBarrier = setSpriteProperties("endlessrunner/barrier.png", _origin.x, _origin.y - _visibleSize.height * 0.3, 1, 2, 0, 0, 90, 0);

	int startPosition = _origin.y;
	for (int i = 0; i <= 14; i++) {
		std::ostringstream pathIndex;	pathIndex << "baja/bajapath" << randmValueIncludeBoundery(1, 6) << ".png"; std::string blockName = pathIndex.str();
		auto newPathBlock = setSpriteProperties(blockName, _origin.x + _visibleSize.width / 2, startPosition, 1, 1, 0.5, 0, 0, 0);
		newPathBlock->setName("InitpathBlock");
		if (i == 14) { newPathBlock->setName("LastInitPath"); }
		startPosition = startPosition + newPathBlock->getContentSize().height - 100; _currentPathBlock = newPathBlock;
		_currentPathBlock->runAction(MoveTo::create(movingTime(_currentPathBlock, 800), Vec2(_currentPathBlock->getPositionX(), _bottomBarrier->getPositionY())));
		_allPathBlocks.push_back(_currentPathBlock);
	}

	_userCar = carGenerate(_origin.x + _visibleSize.width * 0.50, 300, "redcaranimation", 30, 2);
	userCarControl(_userCar);
}

Sprite* Baja::setSpriteProperties(std::string frameName,float positionX, float positionY, float scaleX, float scaleY, float anchorX, float anchorY, float rotation,int zorder) {
	Sprite* ImageObject = Sprite::createWithSpriteFrameName(frameName);
	ImageObject->setPosition(Vec2(positionX,positionY));
	ImageObject->setScaleX(scaleX);
	ImageObject->setScaleY(scaleY);
	ImageObject->setAnchorPoint(Vec2(anchorX,anchorY));
	ImageObject->setRotation(rotation);
	addChild(ImageObject, zorder);
	return ImageObject;
}

Node* Baja::carGenerate(int positionX, int positionY, std::string animationName, int initFrame,int zOrder)
{
	auto timelineUserCar = CSLoader::createTimeline("baja/baja.csb");
	Node *userCar = (Node *)CSLoader::createNode("baja/baja.csb");
	userCar->setPosition(Vec2(positionX, positionY));
	addChild(userCar, zOrder);
	userCar->runAction(timelineUserCar);
	timelineUserCar->gotoFrameAndPause(initFrame);
	timelineUserCar->play(animationName, true);
	userCar->setScale(0.7);	 userCar->setContentSize(Size(userCar->getChildByName("Sprite_1")->getContentSize().width*0.7, userCar->getChildByName("Sprite_1")->getContentSize().height*0.7));
	return userCar;
}

int Baja::randmValueIncludeBoundery(int min, int max) {
	int maxValue = max, minValue = min;
	if (min > max) { maxValue = min;  minValue = max; }
	else if (min == max) { return min; }
	return (rand() % (maxValue - minValue + 1) + minValue);
}

float Baja::movingTime(Sprite * ImageObject, int speed)
{
	if (_bottomBarrier->getPositionY() > 0) {
		return((ImageObject->getPosition().y - std::abs(_bottomBarrier->getPosition().y)) / speed);
	}
	return((ImageObject->getPosition().y + std::abs(_bottomBarrier->getPosition().y)) / speed);
}

float Baja::carMovingTime(Node* ImageObject, int speed) {
	if (_bottomBarrier->getPositionY() > 0) {
		return((ImageObject->getPosition().y - std::abs(_bottomBarrier->getPosition().y)) / speed);
	}
	return((ImageObject->getPosition().y + std::abs(_bottomBarrier->getPosition().y)) / speed);
}

Baja::~Baja(void)
{
	this->removeAllChildrenWithCleanup(true);
}