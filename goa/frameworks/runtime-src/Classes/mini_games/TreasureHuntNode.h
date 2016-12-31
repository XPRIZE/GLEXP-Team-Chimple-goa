
#ifndef __TREASUREHUNT_NODE_H__
#define __TREASUREHUNT_NODE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../LipiTKNode.h"
class TreasureHunt;
class TreasureHuntNode : public LipiTKNode
{
public:
	TreasureHuntNode();
	~TreasureHuntNode();
	cocos2d::Sprite* createDrawingBoard();
	static TreasureHuntNode *create(int width, int height, cocos2d::Point position);
	static int done;
	virtual void clearDrawing(cocos2d::Ref * pSender, cocos2d::ui::Widget::TouchEventType eEventType);
	virtual void postTouchBegan(cocos2d::Touch * touch, cocos2d::Event * event, cocos2d::Point touchPoint);
	void postTouchEnded(cocos2d::Touch * touch, cocos2d::Event * event, cocos2d::Point touchPoint) override;
	void draw(cocos2d::DrawNode* paintingNode, cocos2d::Point fromPoint, cocos2d::Point currentPoint);
	virtual void broadCastRecognizedChars(std::vector<std::string> results) override;
	std::vector<std::string> getPosibileCharacter();
	virtual void removeClearButton() override;
	void setParent(TreasureHunt* parent);
protected:
	MenuContext * menu;
	std::vector<std::string> _result;
	TreasureHunt* _Treasurehunt;
	

};

#endif  // __TREASUREHUNT_NODE_H__