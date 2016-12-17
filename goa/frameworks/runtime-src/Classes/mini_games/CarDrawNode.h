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
	virtual void clearDrawing(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType);
	cocos2d::ui::Button* _button;
	virtual cocos2d::ui::Button* createButton(const std::string normalImage,
		const std::string selectedImage,
		const std::string disableImage, cocos2d::Vec2 position) override;
protected:
	MenuContext * menu;
	CarDraw* _carDraw;

};

#endif 