#include "Drop.h"
#include "SimpleAudioEngine.h"
#include "math.h"
#include "editor-support/cocostudio/CocoStudio.h"

USING_NS_CC;

Scene* Drop::createScene()
{
	// 'layer' is an autorelease object
	auto layer = Drop::create();
	auto scene = Scene::create();

	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, "drop");
	scene->addChild(layer->_menuContext);
	return scene;
}
// on 'init' you need to initialize your instance
bool Drop::init()
{
	if (!Layer::init())
	{
		return false;
	}

	//BackGround
	auto dropBackground = CSLoader::createNode("");
	this->addChild(dropBackground, 0);

	std::map<std::string, std::map<std::string, std::string>> dropSceneMap = {
		{


        }


	};
	return true;

}