//
//  CatGameScene.h
//  safari
//
//  Created by KiranKumar CS on 08/08/16.
//

#ifndef __CATGAME_SCENE_H__
#define __CATGAME_SCENE_H__


#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "editor-support/cocostudio/CocoStudio.h"

class CatGame : public cocos2d::Layer
{
public:
	//Hippo * _hippo;
	CatGame();
	~CatGame();
	int _wordLength;
	float _sceneToScenDiff = 0.0f, _distanceY = 0.0f, _positionAfterGap = 0.0f;
	bool _layerChange = false;
	bool _sceneRunFirst = true;
	static CatGame* _hippoGame;
	static CatGame* create();
	static cocos2d::Scene* createScene();
	virtual bool init();
	std::vector<Node *> _gapNodes;
	std::vector<std::string> _buildingPath;
	Node* _catNode;
	cocostudio::timeline::ActionTimeline * _catAnimation, *_catTailAnimation;
	std::vector<float> _stringPositionX;
	std::vector<float> _stringPositionY;
	void stringGap();
	void tailAnimation();
protected:
	cocos2d::Sprite* _backgroundBarrier, *_movingBarrier, *_sceneMovingBarrier, *_checkBox;
	MenuContext* _menuContext;
	float _xPos, _yPos, _previousX = 0.0f;
	std::string _randomWord;
	cocos2d::Layer * _buildingLayer, *_catLayer, *_buildingLayer2, *_buildingLayer1, *_buildingLayer3, *_buildingLayer4, *_buildingLayer5, *_hippoLayer;
	void generateBuildingLayer();
	void catMovement();
	bool _checkUpDown = true;
	float _blockSetPosY = 0.0f;
	void update(float ft) override;
	void buildingAfterGap();
	//bool _isUpdated = false;
};
#endif 