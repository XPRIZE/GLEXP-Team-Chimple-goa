//
//  BalloonHero.h
//
//  Created by Jyoti Prakash on 03/10/16.
//
//

#ifndef Balloon_Hero_h
#define Balloon_Hero_h

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "../menu/StartMenuScene.h"
#include "../menu/HelpLayer.h"

class BalloonHero : public cocos2d::Layer {
public:
	static cocos2d::Scene* createScene();
	static BalloonHero *create();


CC_CONSTRUCTOR_ACCESS:
	virtual bool init();
	BalloonHero();
	virtual ~BalloonHero();
	bool onTouchBegan(cocos2d::Touch* touch, cocos2d::Event* event);
	void onTouchEnded(cocos2d::Touch* touch, cocos2d::Event* event);
	void onTouchMoved(cocos2d::Touch* touch, cocos2d::Event* event);
	void startGame();
	void generateObjectsAndMove();
	void setupTouch();
	void update(float);
	void generateRandomNumbers();
	void removeMeteor1Animation();
	void removeMeteor2Animation();
	void removeMeteor3Animation();
	void fuelMeterPlus();
	void fuelMeterMinus();
	void removeMeteor4Animation();
	void onEnterTransitionDidFinish() override;
	HelpLayer * _help;
	static const char* classname() { return BALLONHERO.c_str(); }
protected:
	Node * _balloonHero;
	Node * _foreGround;
	int _sceneNumber;

	bool animationOneFlag = true;
	bool animationTwoFlag =  true;
	bool animationThreeFlag = true;
	bool animationFourFlag = true;

	int _labelFontSize = 150;
	bool _flag1 = true, _flag2 = true, _flag3 = true, _flag4 = true;
	bool _flagCorrect1 = true, _flagCorrect2 = true, _flagCorrect3 = true, _flagCorrect4 = true;
	std::vector<std::string> _objects;
	cocos2d::ui::LoadingBar* _fuelBar;
	std::vector<int> _randomIndex;
	Sprite * _fireFly;
	Node * _meteor1;
	Node * _meteor2;
	Node * _meteor3;
	Node * _meteor4;
	cocos2d::Sprite * _cloud1;
	cocos2d::Sprite * _cloud2;
	cocos2d::Sprite * _cloud3;
	cocos2d::Sprite * _cloud4;
	cocostudio::timeline::ActionTimeline * _fireTimeline;
	cocostudio::timeline::ActionTimeline * _bgTimeline;
	std::vector<std::string> _set1;
	std::vector<std::string> _set2;
	void addGrid();
	std::string _hint;
	MenuContext *_menuContext;
	int _totalHit = 0, _wrongHit = 0;

};

#endif /* Balloon_Hero_h */
