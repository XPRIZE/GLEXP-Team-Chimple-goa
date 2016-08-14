#ifndef __JAZZ_SCENE_H__
#define __JAZZ_SCENE_H__

#include "cocos2d.h"
#include "../lang/TextGenerator.h"
#include "../puzzle/WordScene.h"
#include "../GameScene.h"
#include "StartMenuScene.h"

class jazz : public WordScene
{
public:
	static cocos2d::Scene* createScene(); 
	static jazz *create();
    static const char* gameName() { return JAZZ.c_str();}

protected:
	cocos2d::Node* loadNode() override;
	std::string getGridBackground() override;
	void createChoice() override;
	void gameOver(bool correct);
	std::vector<Node*> _gorilla;
	Node* _animate;
	cocostudio::timeline::ActionTimeline * _blinkAnimation;
	void blinking(std::string animationName, bool loop);
};

#endif // __JAZZ_SCENE_H__
