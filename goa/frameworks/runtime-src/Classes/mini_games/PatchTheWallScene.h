#ifndef __PATCHTHEWALL_SCENE_H__
#define __PATCHTHEWALL_SCENE_H__

#include "cocos2d.h"
#include <vector>
#include "../menu/MenuContext.h"
#include "../puzzle/Alphabet.h"
#include "SimpleAudioEngine.h"
#include "../menu/StartMenuScene.h"
#include "../menu/HelpLayer.h"

class PatchTheWall : public cocos2d::Layer
{
public:
	PatchTheWall();
	~PatchTheWall();
	MenuContext *_menuContext;

	cocos2d::Node *_patchBg;
	cocos2d::ui::Slider * _slideBar;
	cocos2d::Size visibleSize;
	cocos2d::Vec2 origin;
	int _moveFlag = 0, _totalLetter = 0, _totalCount = 0, _helpFlag = 0, _level;
	HelpLayer *_help;

	std::vector<std::vector<wchar_t>> _matrix;

	struct SpriteDetails
	{
		Alphabet *_label;
		cocos2d::Sprite *_sprite;
		wchar_t _id;
		float xP, yP;
		int _sequence;
	}SpriteDetails;
	std::vector<struct SpriteDetails> _spriteDetails;
	std::vector<struct SpriteDetails> _patchDetails;

	struct Position
	{
		float x, y;
		int _flag, _sequence;
	}Position;
	std::vector<struct Position> _position;

	virtual bool init();
	static cocos2d::Scene* createScene();
	void addEvents(struct SpriteDetails);
	void blastCome(float);
	void letterCome(Node *blastNode, int);
	void onEnterTransitionDidFinish() override;
    CREATE_FUNC(PatchTheWall);
    
    static const char* gameName() { return PATCH_THE_WALL.c_str();}
};

#endif // __PATCHTHEWALL_SCENE_H__
