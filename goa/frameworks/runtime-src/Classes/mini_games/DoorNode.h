

#ifndef __DOORNODE_NODE_H__
#define __DOORNODE_NODE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../LipiTKNode.h"

class Door;
class DoorNode : public LipiTKNode
{
public:
	DoorNode();
	~DoorNode();
	cocos2d::Sprite* createDrawingBoard();
	static DoorNode *create(int width, int height, cocos2d::Point position);
	cocos2d::Layer * carLayer;
	void draw(cocos2d::DrawNode* paintingNode, cocos2d::Point fromPoint, cocos2d::Point currentPoint);
	virtual void broadCastRecognizedChars(std::vector<std::string> results) override;
	//virtual void broadCastRecognizedChars(std::vector<std::string> results);
	void setParent(Door* parent);
protected:
	MenuContext * menu;
	Door* _Door;

};

#endif 