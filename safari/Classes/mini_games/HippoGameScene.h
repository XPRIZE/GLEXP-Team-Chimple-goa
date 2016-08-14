//
//  HippoGameScene.h
//  safari
//
//  Created by KiranKumar CS on 08/08/16.
//

#ifndef __HIPPOGAME_SCENE_H__
#define __HIPPOGAME_SCENE_H__


#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "editor-support/cocostudio/CocoStudio.h"

class HippoGame : public cocos2d::Layer
{
public:
	//Hippo * _hippo;
	HippoGame();
	~HippoGame();
	float _sceneToScenDiff = 0.0f;
	bool _layerChange = false;
	static HippoGame* _hippoGame;
	static HippoGame* create();
	static cocos2d::Scene* createScene();
	virtual bool init();
	std::vector<Node *> _gapNodes;
	Node* _catNode;
	cocostudio::timeline::ActionTimeline * _catAnimation;
	std::vector<float> _stringPositionX;
	std::vector<float> _stringPositionY;
	void createBuilding(cocos2d::Layer * myLayer);
	void buildingMovingAction();
	void stringGap(cocos2d::Layer * myLayer);
	void afterStringGap(cocos2d::Layer * myLayer);
	void sceneMovingAction();
protected:
	cocos2d::Sprite* _backgroundBarrier, *_movingBarrier, *_sceneMovingBarrier;
	MenuContext* _menuContext;
	void update(float ft) override;
	float _xPos, _yPos;
	std::string _randomWord;
	cocos2d::Layer * _buildingLayer, *_catLayer, *_buildingLayer2,* _buildingLayer1, *_buildingLayer3, *_buildingLayer4, *_buildingLayer5;
	void generateBuildingLayer();
};
#endif 