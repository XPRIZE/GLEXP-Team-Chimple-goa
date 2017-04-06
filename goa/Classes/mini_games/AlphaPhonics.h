#ifndef __ALPHAPHONICS_SCENE_H__
#define __ALPHAPHONICS_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "../menu/StartMenuScene.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "ui/CocosGUI.h"
#include "../lang/LangUtil.h"
#include "../lang/TextGenerator.h"
#include "../effects/FShake.h"
#include "SimpleAudioEngine.h"

using namespace cocos2d;
using namespace std;

class AlphaPhonics : public cocos2d::Layer
{

protected:
	MenuContext *_menuContext;
	int liftOpenChoice = 0,currentOptionPosition = 0;
	bool touchOption = true;
	vector<int> _optionValue;
	vector<string> optionNames;

public:
	~AlphaPhonics();
	static cocos2d::Scene* createScene();
	virtual bool init();
	static AlphaPhonics* create();

	void LiftAnimationPlay(string elevatorName,string animationName);

	void LiftAnimationHandler(int elevatorNo);

	bool DataCorrectOrNot(Sprite * option);

	void OptionChangeAnimation(vector<int> optionNumber);

	void RecreateOptions(std::vector<string> optionName);

	Sprite* createSprite(string spriteName,int currentOptionPosition,Size size, Vec2 position);

	void onEnterTransitionDidFinish();
	void update(float) override;

	void OptionListner(Sprite *option);

	string StringandIntConcat(string data, int number);

	static const char* gameName() { return ALPHAPHONICS.c_str(); }
};

#endif // __ALPHAPHONICS_SCENE_H__
