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
	~Wembley();
protected:
	void addEventsBall(cocos2d::Sprite* callerObject);
	cocos2d::Node* loadNode() override;
	std::string getGridBackground() override;
	void createChoice() override;
	void createAnswer() override;
	std::string getGraphemeUnselectedBackground() override;
	std::string getGraphemeSelectedBackground() override;
	int getGridHeight()  override;
	void gameOver(bool correct) override;
	Node* _goalKeeper;
	std::vector<Node*> _character;
	std::vector<cocostudio::timeline::ActionTimeline*> _timeline;
	cocostudio::timeline::ActionTimeline* _goalkeepertimeline;
	std::vector<cocos2d::Point> _clickBallInitialPoints;
	std::vector<cocos2d::Sprite* > _clickBalls;
	int _finish;
	HelpLayer * _help;
	
};

#endif // Wembley_SCENE_H__
