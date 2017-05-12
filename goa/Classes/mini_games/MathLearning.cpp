#include "MathLearning.h"
#include "../menu/HelpLayer.h"
#include <math.h> 
#include "../util/CommonLabelTTF.h"

#define COCOS2D_DEBUG 1;
using namespace std;
using namespace cocos2d;
USING_NS_CC;


Scene* MathLearning::createScene()
{
	auto scene = Scene::create();
	auto layer = MathLearning::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, MathLearning::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

void MathLearning::onEnterTransitionDidFinish()
{

	
	this->scheduleUpdate();
}

MathLearning::MathLearning()
{
}

MathLearning::~MathLearning()
{
}

void MathLearning::update(float dt)
{
}
