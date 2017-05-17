#ifndef __MATHLEARNING_SCENE_H__
#define __MATHLEARNING_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "../menu/StartMenuScene.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../lang/LangUtil.h"

#define COCOS2D_DEBUG 1;
using namespace std;
using namespace cocos2d;
USING_NS_CC;

class MathLearning : public cocos2d::Layer
{
protected:
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	MenuContext *_menuContext;
	HelpLayer* _help;
	bool _helpFlag = true;
	int _answer;  
	string _operation;
	std::vector<Sprite*> _leftBallBin, _leftBallBinShadow;
	std::vector<Sprite*> _rightBallBin, _rightBallBinShadow;
	bool _leftTouchFlag = false;
	bool _rightTouchFlag = false, _sutractionCorrect = false;
	int _inputFirst, _inputSecond, _answerUpdate = 0;
	std::map<int, std::string> _animCsbPath;
	
	MathLearning();
	~MathLearning();
	

public:
	CREATE_FUNC(MathLearning);
	static cocos2d::Scene* createScene();

	void onEnterTransitionDidFinish();
	void update(float dt);
	
	void setAllSpriteProperties(Sprite* object, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY);
	LabelTTF* setAllLabelProperties(std::string letter, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY, int labelSizeInPixel);
	string getGridNameInString(int ballNumber, string direction);
	Sprite * getGridWithIndex(int ballNumber, string direction);
	void addTouchEvents(Sprite* touchSprite);
	void touchEffectForAddition(Sprite *obj);
	void touchEffectForSubtraction(Sprite *obj);
	string convertIntToString(int num);
	void playWinAnim();
	void fadingOut();
	void quiz();
	void quizPopUp(Sprite*);
	static const char* gameName() { return MATHLEARNING.c_str(); }
};
#endif // __MATHLEARNING_SCENE_H__

