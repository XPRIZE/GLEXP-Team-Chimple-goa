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

	visibleSize = Director::getInstance()->getVisibleSize();
	origin = Director::getInstance()->getVisibleOrigin();
	this->addChild(LayerGradient::create(Color4B(0,100,0, 255), Color4B(255, 255, 255, 255)),0);

	auto label = Label::createWithTTF("BAJA GAME", "fonts/Marker Felt.ttf",200);

	label->setPosition(Vec2(origin.x + visibleSize.width / 2,origin.y + visibleSize.height - label->getContentSize().height));
	label->setColor(Color3B(255, 255, 255));
	addChild(label, 1);

	topBarrier = setSpriteProperties("endlessrunner/barrier.png", origin.x, origin.y + visibleSize.height + 200,1,2,0,0,90,0);
	currentPathBlock = setSpriteProperties("bajapath1.png", origin.x + visibleSize.width / 2, topBarrier->getPositionY(), 1, 1, 0.5, 0, 0, 0);
	bottomBarrier = setSpriteProperties("endlessrunner/barrier.png", origin.x, origin.y - currentPathBlock->getContentSize().height*1.2, 1, 2, 0, 0, 90, 0);
	currentPathBlock->runAction(MoveTo::create(movingTime(currentPathBlock,400),Vec2(currentPathBlock->getPositionX(),bottomBarrier->getPositionY())));
	allPathBlocks.push_back(currentPathBlock);

	this->scheduleUpdate();
	return true;
}

void Baja::update(float delta) {

	for (size_t i = 0; i < allPathBlocks.size() ;  i++) {
		if (bottomBarrier->getBoundingBox().intersectsRect(allPathBlocks[i]->getBoundingBox())) {
			this->removeChild(allPathBlocks[i]);
			allPathBlocks.erase(allPathBlocks.begin() + i);
		}
	}

	if (!topBarrier->getBoundingBox().intersectsRect(currentPathBlock->getBoundingBox())) {
		
		std::ostringstream pathIndex;	pathIndex <<"bajapath"<<randmValueIncludeBoundery(1,6)<<".png"; std::string blockName = pathIndex.str();
		auto newPathBlock = setSpriteProperties(blockName, origin.x + visibleSize.width / 2, topBarrier->getPositionY()-100, 1, 1, 0.5, 0, 0, 0);
		currentPathBlock = newPathBlock;
		currentPathBlock->runAction(MoveTo::create(movingTime(currentPathBlock, 400), Vec2(currentPathBlock->getPositionX(), bottomBarrier->getPositionY())));
		allPathBlocks.push_back(currentPathBlock);
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
	if (bottomBarrier->getPositionY() > 0) {
		return((ImageObject->getPosition().y - std::abs(bottomBarrier->getPosition().y)) / speed);
	}
	return((ImageObject->getPosition().y + std::abs(bottomBarrier->getPosition().y)) / speed);
}
