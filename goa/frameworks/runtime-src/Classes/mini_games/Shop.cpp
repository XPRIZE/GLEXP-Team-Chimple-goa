#include "Shop.h"
#include "../menu/HelpLayer.h"


Scene* Shop::createScene()
{
	auto scene = Scene::create();
	auto layer = Shop::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, Shop::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

void Shop::onEnterTransitionDidFinish()
{
	//std::pair<int, int> levelKeyNumber = levelAllInfo(gameCurrentLevel, 5, 3, 5, 3);
	
	int gameCurrentLevel = _menuContext->getCurrentLevel();

	// BackGround
	auto chocolatefactoryBackground = CSLoader::createNode("chocolatefactory/chocolatefactory.csb");
	this->addChild(chocolatefactoryBackground, 0);
	chocolatefactoryBackground->setName("bg");

	if (visibleSize.width > 2560) {
		auto myGameWidth = (visibleSize.width - 2560) / 2;
		chocolatefactoryBackground->setPositionX(myGameWidth);
	}
	
	this->scheduleUpdate();
}

Shop::~Shop()
{
}

void Shop::update(float dt)
{

}
