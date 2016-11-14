#ifndef __Card_SCENE_H__
#define __Card_SCENE_H__

#include "cocos2d.h"
#include <vector>
#include "editor-support/cocostudio/CocoStudio.h"
#include "../menu/MenuContext.h"
#include "../lang/SafariAnalyticsManager.h"
#include "../StartMenuScene.h"
#include "ui/CocosGUI.h"
#include <string>
#include <sstream>
#include "../menu/HelpLayer.h"


class Card : public cocos2d::Layer
{
	
public:
	static cocos2d::Scene* createScene();
	Card();
	~Card();
	virtual bool init();
	void onEnterTransitionDidFinish() override;
	Node *_CardBg;
	int _level;

	cocostudio::timeline::ActionTimeline *_heroChar, *_enemyChar;
	int _handFlag;
	CREATE_FUNC(Card);
    
	cocos2d::Size visibleSize;

	void addEvents();
    static const char* gameName() { return Card.c_str(); };
	void update(float);
	void gameEnd();
	HelpLayer *_help;
	int _helpFlag;
	void addEvents(struct LabelDetails);
protected:
	MenuContext* _menuContext;
};
#endif // __Card_SCENE_H__
