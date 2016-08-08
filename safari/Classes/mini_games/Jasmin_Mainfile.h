#ifndef __Jasmin_Mainfile_SCENE_H__
#define __Jasmin_Mainfile_SCENE_H__

#include "cocos2d.h"
#include "lang/TextGenerator.h"
#include "puzzle/WordScene.h"
#include "../GameScene.h"

class Jasmin_Mainfile : public WordScene
{
public:
	static cocos2d::Scene* createScene(); 
	static Jasmin_Mainfile *create();

protected:
	cocos2d::Node* loadNode() override;
	std::string getGridBackground() override;
	void createChoice() override;
};

#endif // __Jasmin_Mainfile_SCENE_H__
