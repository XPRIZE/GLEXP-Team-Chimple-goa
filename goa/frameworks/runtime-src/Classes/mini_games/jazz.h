#ifndef __JAZZ_SCENE_H__
#define __JAZZ_SCENE_H__

#include "cocos2d.h"
#include "../lang/TextGenerator.h"
#include "../puzzle/WordScene.h"
#include "../menu/GameScene.h"
#include "../menu/StartMenuScene.h"
#include "SimpleAudioEngine.h" 
class jazz : public WordScene
{
public:
	static cocos2d::Scene* createScene(); 
	static jazz *create();
    static const char* gameName() { return JAZZ.c_str();}
	void showScore(float dt);
	CocosDenshion::SimpleAudioEngine* _audioCorrect;
	jazz();
	~jazz();

protected:
	cocos2d::Node* loadNode() override;
	std::string getGridBackground() override;
	void createChoice() override;
	int getGridHeight() override;
	void gameOver(bool correct);
	std::vector<Node*> _gorilla;
	std::vector<cocostudio::timeline::ActionTimeline *> _jumpingRef;
	std::vector<cocostudio::timeline::ActionTimeline *> _blinkingRef;
	Node* _animate;
	cocostudio::timeline::ActionTimeline * _animation;
	cocostudio::timeline::ActionTimeline * _blinkAnimation;
	void blinking(std::string animationName, bool loop);
};

#endif // __JAZZ_SCENE_H__
