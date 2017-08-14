#ifndef BAJA_WORDSCENE_H__
#define BAJA_WORDSCENE_H__

#include "cocos2d.h"
#include "../lang/TextGenerator.h"
#include "../lang/Lesson.h"
#include "../puzzle/WordScene.h"
#include "../menu/GameScene.h"
#include "../mini_games/Baja.h"

class BajaWordScene : public WordScene
{
public:
	cocos2d::ui::LoadingBar* _fuelBar;
	static cocos2d::Scene* createScene(Lesson* lesson);
	static BajaWordScene *create();

protected:
	cocos2d::Node* loadNode() override;
	std::string getGridBackground() override;
	void createChoice() override;
	void createAnswer() override;
	std::string getGraphemeUnselectedBackground() override;
	std::string getGraphemeSelectedBackground() override;
	void gameOver(bool correct) override;
	int getGridHeight()  override;
};

#endif // BAJA_WORDSCENE_H__
