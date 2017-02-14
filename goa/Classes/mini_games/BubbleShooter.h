#ifndef __BUBBLE_SHOOTER_SCENE_H__
#define __BUBBLE_SHOOTER_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "../menu/StartMenuScene.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "ui/CocosGUI.h"
#include "../lang/LangUtil.h"
#include "../lang/TextGenerator.h"
#include "../effects/FShake.h"
#include "SimpleAudioEngine.h"

class BubbleShooter : public cocos2d::Layer
{

protected:
	MenuContext *_menuContext;
	int _negativePoints = 0;
	bool _flagSwitchTwoColor = true;
	std::string _imageSprite[8];
	std::vector< std::vector<Sprite*> > _bubbleName;
	std::vector< std::vector<Sprite*> > _LetterName;

	//INITVARIABLES ------

	bool _mainPlayerBubbleDestroy = false;
	//var bubbleSizeReference = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("bubble_shooter/red_ball.png"));
	
	// Game states
	struct gamestates  { 
		int init = 0;
		int ready = 1;
		int shootbubble = 2;
		int removecluster = 3;
		int gameComplete = 4;
		int gameover = 5;
	}gamestates;

	int gamestate = gamestates.init;

	int rowoffset = 0;

	// Animation variablespre
	int animationstate = 0;
	float animationtime = 0;

	bool finalFlag = false;
	bool killBubble = false;

	// Level
	struct level{
		int x = 0; // X position
		int y = Director::getInstance()->getVisibleSize().height * 0.103;          // Y position
		int width = 0;       // Width, gets calculated
		int height = 0;      // Height, gets calculated
		int columns = 13;    // Number of tile columns
		int rows = 9;  // Number of tile rows
		int tilewidth = 0;  // Visual width of a tile
		int tileheight = 0; // Visual height of a tile
		int rowheight = 0;  // Height of a row
		int radius = 0;     // Bubble collision radius
		std::vector< std::vector<TileData*> > tiles;// The two-dimensional tile array
	}level;

	int counterhits = 0;

	// Array Of Letter
	std::vector<int> letterSprite;
	std::vector<std::string> _imageSprite;
	int _bubblecolors = 0;
	std::vector<TileData *> _cluster;
	std::vector<TileData *> _floatingclusters;

public:
	~BubbleShooter();
	static cocos2d::Scene* createScene();
	virtual bool init();
	void onEnterTransitionDidFinish();
	static BubbleShooter* create();
	void update(float) override;
	std::vector<std::vector<Sprite*>> create2dVector(int row, int column);
	std::initializer_list <int> neighborsoffsets(int oddEven);

	static const char* gameName() { return BUBBLE.c_str(); }
};



class player {

public:
	int x = 0;
	int y = 0;
	float angle = 0;
	int tiletype = 0;

	struct bubble {
		int x = 0;
		int y = 0;
		float angle = 0.0f;
		int speed = 2500;
		int tiletype = 0;
		bool visible = false;
	}bubble;
	
	struct nextbubble {
		int x = 0;
		int y = 0;
		int tiletype = 0;
	}nextbubble;

};

class TileData {
public:
	int x = 0;
	int y = 0;
	int type = 0;
	bool removed = false;
	int shift = 0;
	int velocity = 0;
	int alpha = 1;
	bool processed = false;
	TileData(int x, int y, int type,int shift);
};

#endif // __BubbleShooter_SCENE_H__
