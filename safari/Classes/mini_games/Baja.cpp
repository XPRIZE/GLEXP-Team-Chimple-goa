#include "Baja.h"

USING_NS_CC;

Scene* Baja::createScene()
{
	auto scene = Scene::create();
	auto layer = Baja::create();
	scene->addChild(layer);
	return scene;
}

bool Baja::init()
{
	if (!Layer::init()){ return false; }

	CCSpriteFrameCache* framecache1 = CCSpriteFrameCache::sharedSpriteFrameCache();
	framecache1->addSpriteFramesWithFile("baja/baja.plist");
	CCSpriteFrameCache* framecache2 = CCSpriteFrameCache::sharedSpriteFrameCache();
	framecache2->addSpriteFramesWithFile("endlessrunner/endlessrunner_01.plist");

	auto timeline = CSLoader::createTimeline("baja/baja.csb");
	auto myPath = CSLoader::createNode("baja/baja.csb");

	_visibleSize = Director::getInstance()->getVisibleSize();
	_origin = Director::getInstance()->getVisibleOrigin();
	this->addChild(LayerGradient::create(Color4B(0,100,0, 255), Color4B(255, 255, 255, 255)),0);

	_topBarrier = setSpriteProperties("endlessrunner/barrier.png", _origin.x, _origin.y + _visibleSize.height + 200,1,2,0,0,90,0);
	_bottomBarrier = setSpriteProperties("endlessrunner/barrier.png", _origin.x, _origin.y - _visibleSize.height * 0.3, 1, 2, 0, 0, 90, 0);
	
	int startPosition = _origin.y;
	for (int i = 0; i <= 14; i++) {
		std::ostringstream pathIndex;	pathIndex << "baja/bajapath" << randmValueIncludeBoundery(1, 6) << ".png"; std::string blockName = pathIndex.str();
		auto newPathBlock = setSpriteProperties(blockName, _origin.x + _visibleSize.width / 2, startPosition, 1, 1, 0.5, 0, 0, 0);
		newPathBlock->setName("InitpathBlock");
		if (i == 14) { newPathBlock->setName("LastInitPath");}
		startPosition = startPosition + newPathBlock->getContentSize().height - 100; _currentPathBlock = newPathBlock;
		_currentPathBlock->runAction(MoveTo::create(movingTime(_currentPathBlock, 400), Vec2(_currentPathBlock->getPositionX(), _bottomBarrier->getPositionY())));
		_allPathBlocks.push_back(_currentPathBlock);
	}


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

	for (size_t i = 0; i < _allPathBlocks.size() ;  i++) {
		if (_bottomBarrier->getBoundingBox().intersectsRect(_allPathBlocks[i]->getBoundingBox())) {
			this->removeChild(_allPathBlocks[i]);
			_allPathBlocks.erase(_allPathBlocks.begin() + i);
		}
	}

	if (!_topBarrier->getBoundingBox().intersectsRect(_currentPathBlock->getBoundingBox()) && !_initBool) {
		
		std::ostringstream pathIndex;	pathIndex <<"baja/bajapath"<<randmValueIncludeBoundery(1,6)<<".png"; std::string blockName = pathIndex.str();
		auto newPathBlock = setSpriteProperties(blockName, _origin.x + _visibleSize.width / 2, _topBarrier->getPositionY()-100, 1, 1, 0.5, 0, 0, 0);
		_currentPathBlock = newPathBlock;
		_currentPathBlock->runAction(MoveTo::create(movingTime(_currentPathBlock, 400), Vec2(_currentPathBlock->getPositionX(), _bottomBarrier->getPositionY())));
		_allPathBlocks.push_back(_currentPathBlock);
	}
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
