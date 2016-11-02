#include "BlastLetter.h"

USING_NS_CC;

Scene* BlastLetter::createScene()
{
	auto scene = Scene::create();
	auto layer = BlastLetter::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, BlastLetter::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

BlastLetter *BlastLetter::create() {
	BlastLetter *blast = new (std::nothrow) BlastLetter();
	if (blast && blast->init()) {
		blast->autorelease();
		return blast;
	}
	CC_SAFE_DELETE(blast);
	return nullptr;

}

bool BlastLetter::init()
{
	if (!Layer::init()) { return false; }

	return true;
}

void BlastLetter::onEnterTransitionDidFinish() {

	auto bgLayerGradient = LayerGradient::create(Color4B(25, 5, 55, 55), Color4B(255, 255, 255, 255));
	this->addChild(bgLayerGradient, 0);

	this->scheduleUpdate();

}

void BlastLetter::update(float delta) {

}
BlastLetter::~BlastLetter(void)
{
	this->removeAllChildrenWithCleanup(true);
}