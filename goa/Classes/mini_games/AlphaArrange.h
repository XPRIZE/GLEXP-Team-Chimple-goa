#ifndef __ALPHAARRANGE_SCENE_H__
#define __ALPHAARRANGE_SCENE_H__

#include "cocos2d.h"
#include <vector>
#include "editor-support/cocostudio/CocoStudio.h"
#include "../menu/MenuContext.h"
#include "../puzzle/Alphabet.h"
#include "../puzzle/CharGenerator.h"
#include "SimpleAudioEngine.h"
#include "../lang/SafariAnalyticsManager.h"
#include "../menu/StartMenuScene.h"
#include "../lang/TextGenerator.h"
#include "ui/CocosGUI.h"
#include "../menu/HelpLayer.h"

class AlphaArrange : public cocos2d::Layer
{

public:
	static cocos2d::Scene* createScene();
	AlphaArrange();
	~AlphaArrange();
	virtual bool init();

	
	HelpLayer *_help;

	// implement the "static create()" method manually
	CREATE_FUNC(AlphaArrange);

	static const char* gameName() { return ALPHAARRANGE.c_str(); };

	
	void onEnterTransitionDidFinish() override;
	
protected:
	MenuContext* _menuContext;
};
#endif // __ALPHAARRANGE_SCENE_H__
