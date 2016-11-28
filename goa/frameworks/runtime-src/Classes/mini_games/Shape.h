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

	Node *_ShapeBg, *_fish;
	cocostudio::timeline::ActionTimeline *_fishTimeline;
	HelpLayer *_help;
	cocos2d::Size visibleSize;
	int _level, _helpFlag = 0, _moveFlag = 0, _firstFishFlag = 0;

	cocos2d::Sprite *_water, *_circle, *_circle_Trans, *_bottom_Crack;
	cocos2d::Sequence *_fishSequence;
	cocos2d::RepeatForever *_fishRepeat;

	std::map<int, std::map<int, std::string>> _differntSceneMapping;
	std::map<int, std::map<int, float>> _differntPosition;

	struct Position
	{
		int x, y;
	};
	std::vector<Position> _position;

	struct SpriteDetails
	{
		cocos2d::Sprite *_sprite;
		int _id, _flag, _xp, _yp;
	}TransSpriteDetails, RealSpriteDetails;
	std::vector<struct SpriteDetails> _transSpriteDetails;
	std::vector<struct SpriteDetails> _realSpriteDetails;

	static cocos2d::Scene* createScene();
	virtual bool init();
	void addEvents(struct SpriteDetails);
	void objectMovement();
	void update(float d);
	void onEnterTransitionDidFinish() override;
    static const char* gameName() { return SHAPE.c_str(); };
	CREATE_FUNC(Shape);

protected:
	MenuContext* _menuContext;
};
#endif // __Shape_SCENE_H__
