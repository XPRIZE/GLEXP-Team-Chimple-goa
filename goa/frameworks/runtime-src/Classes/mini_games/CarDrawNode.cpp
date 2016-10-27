//
//  carDrawNode.cpp 
//  goa
//
//  Created by Kirankumar CS on 05/10/16
//
//

#include "carDrawNode.h"
#include "../WordSceneLipiTKNode.h"

USING_NS_CC;


carDrawNode::carDrawNode()
{
}

carDrawNode::~carDrawNode()
{

}


cocos2d::Scene * carDrawNode::createScene()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto scene = cocos2d::Scene::create();
	auto layer = (carDrawNode *)cocos2d::Layer::create();
	auto drawNode = carDrawNode::create(visibleSize.width / 2, visibleSize.height / 2, Vec2(100, 100));
	drawNode->setPosition(Vec2(visibleSize.width / 2, visibleSize.height / 2));
	layer->addChild(drawNode);
	scene->addChild(layer);
	//carLayer = layer;
	layer->menu = MenuContext::create(layer, "cardraw");
	scene->addChild(layer->menu);
	return scene;
}

cocos2d::Sprite * carDrawNode::createDrawingBoard()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto drawingBoardSprite = Sprite::create();
	drawingBoardSprite->setTextureRect(Rect(0, 0, visibleSize.width / 2, visibleSize.height / 2));
	drawingBoardSprite->setColor(Color3B::WHITE);
	drawingBoardSprite->setOpacity(50);
	return drawingBoardSprite;
}

carDrawNode * carDrawNode::create(int width, int height, cocos2d::Point position)
{
	carDrawNode* wordSceneLipiTKNode = new (std::nothrow) carDrawNode();
	if (wordSceneLipiTKNode && wordSceneLipiTKNode->initialize(width, height, position) )
	{
		wordSceneLipiTKNode->autorelease();
		wordSceneLipiTKNode->setPosition(position);
		return wordSceneLipiTKNode;
	}
	CC_SAFE_DELETE(wordSceneLipiTKNode);
	return nullptr;
}

//void carDrawNode::draw(cocos2d::DrawNode * paintingNode, cocos2d::Point fromPoint, cocos2d::Point currentPoint)
//{
//}

void carDrawNode::postTouchBegan(cocos2d::Touch * touch, cocos2d::Event * event, cocos2d::Point touchPoint)
{
}

void carDrawNode::postTouchMoved(cocos2d::Touch * touch, cocos2d::Event * event, cocos2d::Point touchPoint)
{
}

void carDrawNode::postTouchEnded(cocos2d::Touch * touch, cocos2d::Event * event, cocos2d::Point touchPoint)
{
}

bool carDrawNode::init()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	//	carDrawLiPi = new (std::nothrow) 
	auto bg = CSLoader::createNode("cardraw/cardraw.csb");
	this->addChild(bg);

	return true;
}