//
//  HippoScene.h inherite WordScene class
//  safari
//
//  Created by KiranKumar CS on 08/08/16.
//


#ifndef __HIPPO_SCENE_H__
#define __HIPPO_SCENE_H__

#include "cocos2d.h"
#include "../lang/TextGenerator.h"
#include "../puzzle/WordScene.h"
#include "../GameScene.h"


class Hippo : public WordScene
{
public:
	//Hippo * _hippo;
	bool _gameContinue;
	std::string _state;
	static cocos2d::Scene* createScene();
	static Hippo *create();
	std::vector<Node*> _gapNodes1;
	float _movingPositionX;
	float _movingPositionY;
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
};

#endif 
