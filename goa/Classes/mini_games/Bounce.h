#ifndef __BOUNCESCENE_H__
#define __BOUNCESCENE_H__

#include "cocos2d.h"
#include <array>
#include "../menu/MenuContext.h"
#include "../menu/StartMenuScene.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../lang/LangUtil.h"
#include "../lang/TextGenerator.h"
#include "../util/Calculator.h"
#include "../util/CommonLabelTTF.h"

using namespace std;
using namespace cocos2d;
USING_NS_CC;

class BounceDrop;
class BounceBall;
class BounceHolder;
class BounceChoice;
class AdditionDisplay;

class Bounce : public cocos2d::Layer
{
public:
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	
	HelpLayer* _help;
	MenuContext *_menuContext;
	int  _startNum = 0, _endNum = 0, _sum = 0, _begin = 0, _level = 1, _tries = 0, _lessons = 0;
	std::array<int, 3> _choices;
	//int _choices[3] = {};
	std::vector<BounceHolder*> _holders;
	std::vector<Sprite*> _backHolders;
	std::vector<int> _correctChoices;
	std::vector<BounceChoice*> _bounceChoices;
	//BounceChoice *_bounceChoices;
	BounceDrop* _bounceDrop; 
	BounceBall* _bounceBall;
	int _currentLevel = 0;
	cocos2d::ui::ScrollView *_scroll;
	
	

	//const int NUMBER_WIDTH = 256, CHOICE_WIDTH = 150 , CHOICE_PADDING = 200 , HOLDER_Y = 600 , TEXT_Y = 55 , CUP_HEIGHT = 354 , MAX_LESSONS = 3, CONE_HEIGHT = 172;
	
	

public:
	//~Bounce();
	CREATE_FUNC(Bounce);
	
	static cocos2d::Scene* createScene();
	const static int NUMBER_WIDTH = 256, CHOICE_WIDTH = 150, CHOICE_PADDING = 200, HOLDER_Y = 600, TEXT_Y = 55, CUP_HEIGHT = 354, MAX_LESSONS = 3, CONE_HEIGHT = 172;
    
	void onEnterTransitionDidFinish();
	void update(float dt);
	void doLevel();
	void setupLayer(int startNum, int endNum, int sum, int begin, int choices[3], std::vector<int> correctChoices);
	int randomInt(int min, int max);
	void cleanLayer();
	void setupChoices();
	
	static const char* gameName() { return BOUNCE.c_str(); }
};

class BounceHolder :public cocos2d::Sprite
{

public:
	BounceChoice* _choice;
	int _num = 0 ;
	cocos2d::Sprite *_backHolder = NULL;
	BounceHolder(int num);
};

class BounceDrop : public cocos2d::Node
{
public:
	int _posNum = 0;
	BounceDrop(int posNum, int startNum);

};

class BounceBall : public cocos2d::Sprite {
public:
	bool _animating = false;
	Bounce *_layer = NULL;
	MenuContext *_menuContext;
	cocos2d::EventListenerTouchOneByOne *_listener;
	BounceBall(Bounce* layer);
	void animateBounce(bool flag);
	cocos2d::CCFollow *_follow;
};

class AdditionDisplay:public cocos2d::LayerColor
{
public:
	AdditionDisplay(std::vector<int> component,int sum);
	std::string convertInString(int number);
};

class BounceChoice :public cocos2d::Node{
public:
	int _number = 0;
};

#endif // __BOUNCE_SCENE_H__
