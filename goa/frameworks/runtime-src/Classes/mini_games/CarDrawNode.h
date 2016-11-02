//
//  carDrawNode.h
//  goa
//
//  Created by Kirankumar CS on 26/10/16
//
//


#ifndef __CARDRAWNODE_NODE_H__
#define __CARDRAWNODE_NODE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../LipiTKNode.h"

class CarDraw;
class carDrawNode : public LipiTKNode
{
public:
	carDrawNode();
	~carDrawNode();
	cocos2d::Sprite* createDrawingBoard();
	static carDrawNode *create(int width, int height, cocos2d::Point position);
	cocos2d::Layer * carLayer;
	void draw(cocos2d::DrawNode* paintingNode, cocos2d::Point fromPoint, cocos2d::Point currentPoint);

	virtual void postTouchBegan(cocos2d::Touch * touch, cocos2d::Event * event, cocos2d::Point touchPoint);
	virtual void postTouchMoved(cocos2d::Touch * touch, cocos2d::Event * event, cocos2d::Point touchPoint);
	virtual void postTouchEnded(cocos2d::Touch * touch, cocos2d::Event * event, cocos2d::Point touchPoint);
	virtual void broadCastRecognizedChars(std::vector<std::string> results) override;
	//virtual void broadCastRecognizedChars(std::vector<std::string> results);
	void setParent(CarDraw* parent);
protected:
	MenuContext * menu;
	CarDraw* _carDraw;

};

#endif 