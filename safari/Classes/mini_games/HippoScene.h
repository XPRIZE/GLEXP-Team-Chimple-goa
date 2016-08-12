#ifndef __HIPPO_SCENE_H__
#define __HIPPO_SCENE_H__

#include "cocos2d.h"
#include "../lang/TextGenerator.h"
#include "../puzzle/WordScene.h"
#include "../GameScene.h"

class Hippo : public WordScene
{
public:
	static cocos2d::Scene* createScene();
	static Hippo *create();
	std::vector<Node*> _gapNodes1;
	float _movingPositionX;
	float _movingPositionY;
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
