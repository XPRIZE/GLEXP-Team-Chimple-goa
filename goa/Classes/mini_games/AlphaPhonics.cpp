#include "AlphaPhonics.h"
#include "../menu/HelpLayer.h"
#include "../util/CommonLabelTTF.h"

USING_NS_CC;

Scene* AlphaPhonics::createScene()
{
	auto scene = Scene::create();
	auto layer = AlphaPhonics::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, AlphaPhonics::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

AlphaPhonics *AlphaPhonics::create() {
	AlphaPhonics *blast = new (std::nothrow) AlphaPhonics();
	if (blast && blast->init()) {
		blast->autorelease();
		return blast;
	}
	CC_SAFE_DELETE(blast);
	return nullptr;

}

bool AlphaPhonics::init()
{
	if (!Layer::init()) { return false; }

	return true;
}

void AlphaPhonics::onEnterTransitionDidFinish() {

	this->scheduleUpdate();
}

void AlphaPhonics::update(float delta) {

}

AlphaPhonics::~AlphaPhonics(void)
{
	this->removeAllChildrenWithCleanup(true);
}
