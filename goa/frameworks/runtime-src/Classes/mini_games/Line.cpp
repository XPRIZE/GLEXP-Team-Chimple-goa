
#include "Line.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../lang/LangUtil.h"
#include "../lang/TextGenerator.h"
#include "../effects/FShake.h"
#include "../menu/MenuContext.h"
#include <algorithm>


USING_NS_CC;

Line::Line()
{
	
	
}

Line::~Line()
{

}

Line * Line::create()
{
	Line* LineGame = new (std::nothrow) Line();
	if (LineGame && LineGame->init()) {
		LineGame->autorelease();
		return LineGame;
	}
	CC_SAFE_DELETE(LineGame);
	return nullptr;
}

cocos2d::Scene * Line::createScene()
{
	auto scene = cocos2d::Scene::create();
	auto layer = Line::create();
	scene->addChild(layer);

	layer->menu = MenuContext::create(layer, Line::gameName());
	scene->addChild(layer->menu);
	return scene;
}

bool Line::init()
{

	if (!Layer::init())
	{
		return false;
	}
	Size visibleSize = Director::getInstance()->getVisibleSize();
	float toplabelX = visibleSize.width / 2 - 30;
	std::map<std::string, std::map<std::string, std::string>> differntSceneMapping = {
		{
			{ "candy",  
			{
				{ "bg","line/line.csb"},
				{ "tag","line/tag.csb"},
				{ "five","line/five.csb"},
				{ "ten","line/girl.csb"},
				{ "fifteen","line/fifteen.csb"},
				{ "point1","ref_7" },
				{ "point2","ref_7_0" },
				{ "point3","ref_7_0_0" },
				{ "point4","ref_7_0_0_0" },
				{ "point5","ref_7_1" },
				{ "happy","happy" },
				{ "cry","cry" },
				{ "animation_select", "one" },

			} },
			{ "iceLand",  
			{
				{ "bg", "layerisland/layerisland.csb" },
				{ "ladder", "ladder_6" },
				{ "cakePath", "layerisland/cake1.png" },
				{ "character", "layerisland/girl.csb" },
				{ "point1", "ref_7" },
				{ "point2", "ref_7_0" },
				{ "point3", "ref_7_0_0" },
				{ "point4", "ref_7_0_0_0" },
				{ "point5", "ref_7_1" },
				{ "happy","happy"},
				{ "cry","cry" },
				{ "animation_select", "two" }

			} },
			{ "farm", 
			{
				{ "bg", "layerfarm/layerfarm.csb" },
				{ "ladder", "ladder_6" },
				{ "cakePath", "layerfarm/cake1.png" },
				{ "character", "layerfarm/girl.csb" },
				{ "point1", "ref_7" },
				{ "point2", "ref_7_0" },
				{ "point3", "ref_7_0_0" },
				{ "point4", "ref_7_0_0_0" },
				{ "point5", "ref_7_1" },
				{ "happy","happy" },
				{ "cry","cry" },
				{ "animation_select", "three" }
			} },

		}
	};

	std::vector<std::string> theme = { "candy","iceLand","farm" };
	_scenePath = differntSceneMapping.at(theme.at(0));

	

	background = CSLoader::createNode(_scenePath.at("bg"));
	extraX = 0;
	if (visibleSize.width > 2560) {
		extraX = (visibleSize.width - 2560) / 2;
		background->setPositionX((visibleSize.width - 2560) / 2);
	}
	this->addChild(background, 0);
	
	NumberLine = CSLoader::createNode(_scenePath.at("five"));
	NumberLine->setPosition(Vec2(0, 0));
	this->addChild(NumberLine);

	//scaleNumber(0, 5);
}
void Line::onEnterTransitionDidFinish()
{
	Node::onEnterTransitionDidFinish();
	
	this->scheduleUpdate();
	
	
}
void Line::gameHelp()
{
	

}

void Line::scaleNumber(int start, int end)
{
	
	//for(int i=start ; i<end ; i++)
	//{
		std::stringstream ss;
		ss << start;
		std::string str = ss.str();
		auto number_label = Label::createWithSystemFont(str, "Arial", 90);
		number_label->setPosition(this->getChildByName(str)->getPosition());
		this->addChild(number_label);
	//}
}
void Line::update(float dt)
{
	
}

bool Line::onTouchBegan(cocos2d::Touch * touch, cocos2d::Event * event)
{
	Size visibleSize = Director::getInstance()->getVisibleSize();

	auto target = event->getCurrentTarget();
	auto  location = target->convertToNodeSpace(touch->getLocation());
	Rect rect = Rect(0, 0, target->getContentSize().width, target->getContentSize().height);

	return false;
}
	
	

