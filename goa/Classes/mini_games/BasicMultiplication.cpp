#include "BasicMultiplication.h"
#include "../menu/HelpLayer.h"
#include "../util/CommonLabelTTF.h"

USING_NS_CC;

Scene* BasicMultiplication::createScene()
{
	auto scene = Scene::create();
	auto layer = BasicMultiplication::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, BasicMultiplication::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

BasicMultiplication *BasicMultiplication::create() {
	BasicMultiplication *blast = new (std::nothrow) BasicMultiplication();
	if (blast && blast->init()) {
		blast->autorelease();
		return blast;
	}
	CC_SAFE_DELETE(blast);
	return nullptr;

}

bool BasicMultiplication::init()
{
	if (!Layer::init()) { return false; }

	return true;
}

void BasicMultiplication::onEnterTransitionDidFinish() {

	
	this->scheduleUpdate();
}

void BasicMultiplication::update(float delta) {

}

BasicMultiplication::~BasicMultiplication(void)
{
	this->removeAllChildrenWithCleanup(true);
}
