#ifndef __Shape_SCENE_H__
#define __Shape_SCENE_H__

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


class Shape : public cocos2d::Layer
{
	
public:
	Shape();
	~Shape();

	Node *_ShapeBg;
	HelpLayer *_help;
	cocos2d::Size visibleSize;
	int _level, _helpFlag = 0;

	struct Position
	{
		int x, y;
	};
	std::vector<Position> _position;

	static cocos2d::Scene* createScene();
	virtual bool init();
	void addEvents();
	void onEnterTransitionDidFinish() override;
    static const char* gameName() { return SHAPE.c_str(); };
	CREATE_FUNC(Shape);

protected:
	MenuContext* _menuContext;
};
#endif // __Shape_SCENE_H__
