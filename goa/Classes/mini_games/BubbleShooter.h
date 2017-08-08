//
//  BubbleShooter.h
//  goa
//
//  Created by Karim Mirazul  on 05/11/16
//
//

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
#include "../util/CommonLabelTTF.h"
#include "../lang/Lesson.h"

using namespace std;
using namespace cocos2d;
USING_NS_CC;

class TileData;
class Player;

class BubbleShooter : public cocos2d::Layer
{
private:
	Lesson _lesson;

protected:
	MenuContext *_menuContext;
	int _negativePoints = 0;
	bool _AlphabetsScene = true;
	bool _flagSwitchTwoColor = true;
	std::string _imageSprite[8];
	std::vector< std::vector<Sprite*> > _bubbleName;
	std::vector< std::vector<CommonLabelTTF*> > _LetterName;
	Player* player;
	bool _helpActive = false;
	//INITVARIABLES ------

	struct gamestates  { 
		int init = 0;
		int ready = 1;
		int shootbubble = 2;
		int removecluster = 3;
		int gameComplete = 4;
		int gameover = 5;
	}gamestates;

	int gamestate = gamestates.init;
	bool _mainPlayerBubbleDestroy = false;
	int rowoffset = 0;

	// Animation variablespre
	int animationstate = 0;
	float animationtime = 0;

	bool finalFlag = false;
	bool killBubble = false;
	float angle = 0.0f;
	// Level
	struct level{
		float x = 0.0f; // X position
		float y = Director::getInstance()->getVisibleSize().height * 0.103;          // Y position
		int width = 0;       // Width, gets calculated
		int height = 0;      // Height, gets calculated
		int columns = 13;    // Number of tile columns
		int rows = 9;  // Number of tile rows
		int tilewidth = 0;  // Visual width of a tile
		int tileheight = 0; // Visual height of a tile
		int rowheight = 0;  // Height of a row
		float radius = 0;     // Bubble collision radius
		std::vector< std::vector<TileData*> > tiles;// The two-dimensional tile array
	}level;

	int counterhits = 0;

	// Array Of Letter
	std::vector<std::string> letterSprite;
	//std::vector<std::string> _imageSprite;
	int _bubblecolors = 0;
	std::vector<TileData *> _cluster;
	std::vector<std::vector<TileData *>> _floatingclusters;

public:
	BubbleShooter();
	~BubbleShooter();
	static cocos2d::Scene* createScene();
	virtual bool init();
	void onEnterTransitionDidFinish();
	static BubbleShooter* create();
	void update(float) override;
	std::vector<std::vector<Sprite*>> create2dVectorSprite(int column, int row);
	std::vector<std::vector<CommonLabelTTF*>> create2dVectorLetter(int column, int row);
	std::vector<std::vector<TileData*>> create2dVectorTiles(int column, int row);
	std::vector<std::pair<int, int>> neighborsoffsets(int oddEven);
	bool circleIntersection(float x1, float y1, float r1, float x2, float y2, float r2);
	void setGameState(int newgamestate);
	int getRandomInt(int min, int max);
	void createLevel(int color, int repeat);
	int getRandomArbitrary(int min, int max);
	void playerDie(float tilex, float tiley, int type);
	std::vector<std::vector<TileData *>> findFloatingClusters();
	void nextBubble();
	void DataCard(std::string gamestatus);
	void stateRemoveCluster();
	int getExistingColor();
	std::vector<int> findColors();
	std::vector<int> rndNumber(int color);
	void renderTiles();
	void bgListner();
	void renderPlayer();
	void checkBubbleStatus();
	bool checkGameOver();
	void drawNextLetter(float x, float y, int index);
	void drawBubble(float x, float y, int index);
	void drawNextBubble(float x, float y, int index);
	void gunMove(float x, float y);
	void onMouseMove(float posx, float posy);
	std::vector<TileData *> getNeighbors(TileData* tile);
	std::string getConvertInLowerCase(string data);
	float radToDeg(float angle);
	float degToRad(float angle);
	void shootBubble();
	void stateShootBubble(float dt);
	void snapBubble();
	void resetRemoved();
	void resetProcessed();
	std::vector<TileData *> findCluster(float tx, float ty, bool matchtype, bool reset, bool skipremoved);
	std::pair<float, float> getGridPosition(float x, float y);
	Sprite* drawBubbleGroups(float x, float y, int index, int col, int row);
	CommonLabelTTF* drawLetterGroups(float x, float y, int index, int col, int row);
	std::pair<float, float> getTileCoordinate(int column, int row);
	void setSpriteProperties(Sprite* ImageObject, float positionX, float positionY, float scaleX, float scaleY, float anchorX, float anchorY, float rotation, int zorder);
	static const char* gameName() { return BUBBLE.c_str(); }
};



class Player {

public:
	float x = 0.0f;
	float y = 0.0f;
	float angle = 0;
	int tiletype = 0;

	struct bubble {
		float x = 0.0f;
		float y = 0.0f;
		float angle = 0.0f;
		int speed = 2500;
		int tiletype = -1;
		bool visible = false;
	}bubble;
	
	struct nextbubble {
		float x = 0.0f;
		float y = 0.0f;
		int tiletype = -1;
	}nextbubble;

};

class TileData {
public:
	float x = 0.0f;
	float y = 0.0f;
	int type = 0;
	bool removed = false;
	int shift = 0;
	int velocity = 0;
	int alpha = 1;
	bool processed = false;
	TileData(float x, float y, int type,int shift);
};

#endif // __BubbleShooter_SCENE_H__
