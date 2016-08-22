//
//  CatScene.h inherite WordScene class
//  safari
//
//  Created by KiranKumar CS on 08/08/16.
//


#ifndef __CAT_SCENE_H__
#define __CAT_SCENE_H__

#include "cocos2d.h"
#include "../lang/TextGenerator.h"
#include "../puzzle/WordScene.h"
#include "../GameScene.h"


class Cat : public WordScene
{
public:
	int _upCount, _downCount;
	bool _gameContinue;
	static int _upCounting;
	std::string _state;
	static Cat *create();
	std::vector<Node*> _gapNodes1;
	float _movingPositionX, _blockSetPosY = 0.0f;
	float _movingPositionY, _posAfterGap, _posAfterGapX;
	Node * _catNode1;
	cocostudio::timeline::ActionTimeline * _catAnimation1;
	std::vector<float> _stringPositionX1;
	std::vector<float> _stringPositionY1;
protected:
	
	cocos2d::Node* loadNode() override;
	std::string getGridBackground() override;
	void createChoice() override;
	void createAnswer() override;
	void gameOver(bool correct) override;
	std::string getGraphemeUnselectedBackground() override;
	std::string getGraphemeSelectedBackground() override;
	void gameExit();
};

#endif 
