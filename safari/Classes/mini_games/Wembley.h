#ifndef Wembley_SCENE_H__
#define Wembley_SCENE_H__

#include "cocos2d.h"
#include "../lang/TextGenerator.h"
#include "../puzzle/WordScene.h"
#include "../GameScene.h"
#include "StartMenuScene.h"

class Wembley : public WordScene
{
public:
	static cocos2d::Scene* createScene();
	static Wembley *create();
    static const char* gameName() { return WEMBLEY.c_str();}
    
protected:
	cocos2d::Node* loadNode() override;
	std::string getGridBackground() override;
	void createChoice() override;
	void createAnswer() override;
	std::string getGraphemeUnselectedBackground() override;
	std::string getGraphemeSelectedBackground() override;
	int getGridHeight()  override;
};

#endif // Wembley_SCENE_H__
