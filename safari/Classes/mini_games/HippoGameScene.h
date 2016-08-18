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
	int _wordLength;
	float _sceneToScenDiff = 0.0f, _distanceY= 0.0f, _positionAfterGap = 0.0f;
	bool _layerChange = false;
	bool _sceneRunFirst = true;
	static HippoGame* _hippoGame;
	static HippoGame* create();
	static cocos2d::Scene* createScene();
	virtual bool init();
	std::vector<Node *> _gapNodes;
	Node* _catNode;
	cocostudio::timeline::ActionTimeline * _catAnimation;
	std::vector<float> _stringPositionX;
	std::vector<float> _stringPositionY;
	void createBuilding(cocos2d::Layer * myLayer, std::string str);
	void buildingMovingAction(std::string str);
	void stringGap(cocos2d::Layer * myLayer, std::string str);
	void stringGap();
	void afterStringGap(cocos2d::Layer * myLayer, std::string str);
	void sceneMovingAction();
protected:
	cocos2d::Sprite* _backgroundBarrier, *_movingBarrier, *_sceneMovingBarrier, *_checkBox;
	MenuContext* _menuContext;
	void update(float ft) override;
	float _xPos, _yPos;
	std::string _randomWord;
	cocos2d::Layer * _buildingLayer, *_catLayer, *_buildingLayer2,* _buildingLayer1, *_buildingLayer3, *_buildingLayer4, *_buildingLayer5, *_hippoLayer;
	void generateBuildingLayer();
	void catMovement();
	bool _checkUpDown = true;
	float _blockSetPosY = 0.0f;
	//bool _isUpdated = false;
};
#endif 