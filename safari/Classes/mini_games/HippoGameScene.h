#ifndef __HIPPOGAME_SCENE_H__
#define __HIPPOGAME_SCENE_H__
#endif // __ALPHAMONFEED_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"

class HippoGame : public cocos2d::Layer
{
public:
	HippoGame();
	~HippoGame();
	static HippoGame* create();
	static cocos2d::Scene* createScene();
	virtual bool init();
	std::vector<Node *> _gapNodes;
	std::vector<float> _stringPositionX;
	std::vector<float> _stringPositionY;
protected:
	MenuContext* _menuContext;
	void createBuilding();
	void buildingMovingAction();
	void stringGap();
	float _xPos, _yPos;
	cocos2d::Layer * _buildingLayer, *_buildingLayer2,* _buildingLayer1, *_buildingLayer3, *_buildingLayer4, *_buildingLayer5;

};