#ifndef __Shape_SCENE_H__
#define __Shape_SCENE_H__

#include "cocos2d.h"
#include <vector>
#include "editor-support/cocostudio/CocoStudio.h"
#include "../menu/MenuContext.h"
#include "../lang/SafariAnalyticsManager.h"
#include "../menu/StartMenuScene.h"
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
	int _level, _helpFlag = 0, _moveFlag = 0, _firstFishFlag = 0, _spriteMoved, _totalCount = 0, _totalPatch = 0,  _posmainIndex, _maxTransAtTime = 0, _waterSoundFlag = 0;
	float _waterSpeed;
	std::vector<float> _position;

	CocosDenshion::SimpleAudioEngine* _waterSound;

	cocos2d::Sprite *_water, *_duplicateSprite;
	cocos2d::Sequence *_fishSequence;
	cocos2d::RepeatForever *_fishRepeat;
	cocos2d::Label *_shapeName;

	std::map<int, std::map<int, std::string>> _differntSceneMapping;
	std::map<int, std::map<int, std::string>> _shapeNameInLanguage;
	std::map<int, std::map<int, float>> _differntPosition;

	struct SpriteDetails
	{
		cocos2d::Sprite *_sprite;
		int _id, _flag, _xp, _yp;
		std::string _name, _spriteName;
	}TransSpriteDetails, RealSpriteDetails, _spriteDetails;
	std::vector<struct SpriteDetails> _transSpriteDetails;
	std::vector<struct SpriteDetails> _realSpriteDetails;


	static cocos2d::Scene* createScene();
	virtual bool init();
	void addEvents(struct SpriteDetails);
	void createTrans();
	void update(float d);
	void onEnterTransitionDidFinish() override;
    static const char* gameName() { return SHAPE.c_str(); };
	CREATE_FUNC(Shape);

protected:
	MenuContext* _menuContext;
};
#endif // __Shape_SCENE_H__
