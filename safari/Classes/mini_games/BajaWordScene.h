#ifndef BAJA_WORDSCENE_H__
#define BAJA_WORDSCENE_H__

#include "cocos2d.h"
#include "../lang/TextGenerator.h"
#include "../puzzle/WordScene.h"
#include "../GameScene.h"

class BajaWordScene : public WordScene
{
public:
	static cocos2d::Scene* createScene();
	static BajaWordScene *create();

protected:
	cocos2d::Node* loadNode() override;
	std::string getGridBackground() override;
	void createChoice() override;
	void createAnswer() override;
	std::string getGraphemeUnselectedBackground() override;
	std::string getGraphemeSelectedBackground() override;
	int getGridHeight()  override;
};

#endif // BAJA_WORDSCENE_H__
