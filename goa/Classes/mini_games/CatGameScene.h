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
	int _wordLength, _maxPoints = 0;
	int _score = 0;
	std::string _gameState;
	float _sceneToScenDiff = 0.0f, _distanceY = 0.0f, _positionAfterGap = 0.0f;
	bool _layerChange = false;
	bool _sceneRunFirst = true;
	int _upCount = 0, _downCount = 0;
	static CatGame* _hippoGame;
	static CatGame* create();
	static cocos2d::Scene* createScene(Lesson* lesson);
	virtual bool init();
	std::vector<Node *> _gapNodes;
	std::vector<std::string> _buildingPath;
	Node* _catNode;
	cocostudio::timeline::ActionTimeline * _catAnimation, *_catTailAnimation;
	std::vector<float> _stringPositionX;
	std::vector<float> _stringPositionY;
	void stringGap(std::string str);
	void tailAnimation();
protected:
	cocos2d::Sprite* _backgroundBarrier, *_movingBarrier, *_sceneMovingBarrier, *_checkBox;
	MenuContext* _menuContext;
	float _xPos, _yPos, _previousX = 0.0f, _previousY = 900.0f;
	std::string _randomWord;
	cocos2d::Layer * _buildingLayer, *_catLayer, *_buildingLayer2, *_buildingLayer1, *_hippoLayer;
	void generateBuildingLayer(std::string str);
	void callAPI(std::string str);
	bool _checkUpDown = true;
	float _blockSetPosY = 0.0f;
	void update(float ft) override;
	void buildingAfterGap(std::string str);
	static const char* gameName() { return CAT.c_str(); }
	void onEnterTransitionDidFinish();
	void gameEnd(float ft);
};
#endif 
