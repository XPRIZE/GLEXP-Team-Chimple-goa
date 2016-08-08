#ifndef __JAZZ_SCENE_H__
#define __JAZZ_SCENE_H__

#include "cocos2d.h"
#include "lang/TextGenerator.h"
#include "puzzle/WordScene.h"
#include "../GameScene.h"

class jazz : public WordScene
{
public:
	static cocos2d::Scene* createScene(); 
	static jazz *create();

protected:
	cocos2d::Node* loadNode() override;
	std::string getGridBackground() override;
	void createChoice() override;
};

#endif // __JAZZ_SCENE_H__
