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
	Node* catNode;
	std::vector<float> _stringPositionX;
	std::vector<float> _stringPositionY;
protected:
	cocos2d::Sprite* _backgroundBarrier, *_movingBarrier;
	MenuContext* _menuContext;
	void createBuilding();
	void buildingMovingAction();
	void stringGap();
	void afterStringGap();
	float _xPos, _yPos;
	std::string _randomWord;
	cocos2d::Layer * _buildingLayer, *_buildingLayer2,* _buildingLayer1, *_buildingLayer3, *_buildingLayer4, *_buildingLayer5;

};