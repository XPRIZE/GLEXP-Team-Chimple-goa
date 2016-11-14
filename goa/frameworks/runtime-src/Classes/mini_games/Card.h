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
	int _level, _pairSum, _pairCard, _totalSum=0, _useCard = 0;
	int _handFlag;

	CREATE_FUNC(Card);
    
	cocos2d::Size visibleSize;
	struct SpriteDetails
	{
		cocos2d::Node *_sprite;
		int _flag;
		int _id;
		int _index;
	}SpriteDetails;
	std::vector<struct SpriteDetails> _spriteDetails;

	struct Position
	{
		int x, y;
	}_p1, _p2, _p3, _p4, _p5, _p6;
	std::vector<struct Position> _position;

	int _differentLevel[20][6] = {
		{ 3, 2, 4, 1, 2, 3 },
		{ 4, 3, 2, 3, 2, 1 },
		{ 2, 1, 3, 1, 2, 1 },
		{ 2, 3, 1, 1, 1, 2 },
		{ 1, 2, 1, 3, 2, 1 },

		{ 5, 3, 4, 7, 6, 5 },
		{ 8, 6, 4, 9, 2, 1 },
		{ 8, 3, 1, 4, 1, 3 },
		{ 4, 3, 2, 5, 4, 2 },
		{ 1, 2, 2, 6, 2, 7 },

		{ 5, 9, 8, 7, 10, 6 },
		{ 10, 6, 5, 9, 7, 8 },
		{ 8, 9, 5, 4, 1, 3 },
		{ 7, 8, 2, 5, 6, 2 },
		{ 9, 8, 6, 1, 3, 3 },

		{ 10, 10, 10, 10, 10, 10 },
		{ 10, 5, 5, 9, 6, 4 },
		{ 8, 9, 5, 4, 7, 7 },
		{ 7, 8, 4, 8, 6, 7 },
		{ 6, 8, 4, 10, 9, 3 }
	};

	void addEvents(struct SpriteDetails);
    static const char* gameName() { return CARD.c_str(); };
	void update(float);
	void gameEnd();
	HelpLayer *_help;
	int _helpFlag;
protected:
	MenuContext* _menuContext;
};
#endif // __Card_SCENE_H__
