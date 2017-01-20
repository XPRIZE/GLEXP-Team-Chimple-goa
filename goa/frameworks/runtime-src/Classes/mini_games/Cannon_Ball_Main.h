#ifndef __MAINGAME_SCENE_H__
#define __MAINGAME_SCENE_H__

#include "cocos2d.h"
#include "Cannon_Ball_Listener.h"
#include <vector>
#include "editor-support/cocostudio/CocoStudio.h"
#include "../menu/MenuContext.h"
#include "../puzzle/Alphabet.h"
#include "../puzzle/CharGenerator.h"
#include "SimpleAudioEngine.h"
#include "../lang/SafariAnalyticsManager.h"
#include "../menu/StartMenuScene.h"
#include "../menu/HelpLayer.h"

class MainGame : public cocos2d::Layer
{
public:
	struct Position
	{
		float x, y;
	}p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p100, p101, p102, p103;

	static float height, width, originX, originY;
	static int _totalHit;
	int _score = 0;

	MainGame();
	~MainGame();

	cocos2d::Sprite* backGround_front;
	void onEnterTransitionDidFinish() override;
	static EventListenerClass* cannon1, *cannon2, *cannon3, *cannon4;
	std::vector<Position> position;
	std::vector<Position> letterPosition;
	std::vector<Position> lettertmpPosition;

	static std::vector<LabelClass*> cannonLetter;
	static std::vector<Alphabet*> cannonLetter_actualImage;

	static std::vector<LabelClass*> bulletArray;
	static std::vector<Alphabet*> bulletArray_actualImage;
	static std::vector<cocos2d::Node*> bulletArray_Animation;

	static std::vector<EventListenerClass*> cannonArray;
	static std::vector<EventListenerClass*> cannon_ballArray;

	static std::vector<Alphabet*> meteorArray_actualImage;
	static std::vector<EventListenerClass*> letterArray;
	static std::vector<LabelClass*> meteorArray;

	static MainGame *self;
	static HelpLayer *_help;
	static Node *meteor_meteor_strike_node;
	static cocostudio::timeline::ActionTimeline *meteor_meteor_strike_timeline;

	static CocosDenshion::SimpleAudioEngine* audioBg;

	std::vector<std::vector<wchar_t>> MainChars;

	static cocos2d::Scene* createScene();
	void AfterPlayVideo();

	void cannonBallHitAnimation(Node*);
	void meteorBlast(Node*);

	void PlayVideo();
	void loadCannon(EventListenerClass*);
	void startFire(EventListenerClass*, Node*);
	void startGame();
	void cannonLetterCome();
	void letterCome(float d);
	void removeLetter(EventListenerClass *);
	void removeFire(EventListenerClass *, Alphabet *, Node *);
	virtual bool init();
	void update(float dt);

	void displayHelp();

	static int _helpFlag;

	// implement the "static create()" method manually
	CREATE_FUNC(MainGame);
    
    static const char* gameName() { return CANNON_BALL.c_str(); };

protected:
	MenuContext* _menuContext;
};
#endif // __MAINGAME_SCENE_H__
