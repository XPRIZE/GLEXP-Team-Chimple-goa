//
//  Memory.h
//
//  Created by Jyoti Prakash on 19/09/16.
//
//

#ifndef Memory_h
#define Memory_h

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "../StartMenuScene.h"

class Memory : public cocos2d::Layer {
public:
	static cocos2d::Scene* createScene();
	static Memory *create();
	

CC_CONSTRUCTOR_ACCESS:
	virtual bool init();
	Memory();
	virtual ~Memory();
	bool onTouchBegan(cocos2d::Touch* touch, cocos2d::Event* event);
	void onTouchEnded(cocos2d::Touch* touch, cocos2d::Event* event);
	void onTouchMoved(cocos2d::Touch* touch, cocos2d::Event* event);
	void startGame();
	void hideAll();
	void pauseAllActiveListeners();
	void resumeAllActiveListeners();
	bool checkMatch();
	void chickenFly();
	void removecurrentlabelsandlisteners();
	static const char* classname() { return WEMBLEY.c_str(); }
protected:
	std::vector<int> _currentClickedPair;
	std::vector<int> _activeNestIds;
	std::map<std::string, std::string> _data;
	std::vector<std::string> _currentSelectedNestNames;
	std::vector<cocostudio::timeline::ActionTimeline *> _chickenTimeline;
	
	
	std::vector<std::string> _data_key;
	std::vector<std::string> _data_value;
	Node *_background;
	Node * _chicken;
	Node * _mainground;
	Node * _memoryfarm;
	int _currentNest;


	std::vector<Node *> _nests;
	cocos2d::Sprite * nest;
	
	bool _touchActive;
	void setupTouch();
	int _touches;
	int _nestIndex;

	struct xy {
		float x;
		float y;
	};

	std::vector<std::vector<xy>> xycoordinates;
	struct object {
		
		cocos2d::Sprite *character;
		int characterZIndex;

		cocos2d::Sprite *openWindow;
		int openWindowZIndex;

		cocos2d::Sprite *closedWindow;
		int closedWindowZIndex;

		cocos2d::Sprite *brokenWindow;
		int brokenWindowZIndex;

		cocos2d::Sprite *alphabetSprite;
		int alphabetSpriteZIndex;

		char alphabet;

		float x, y;

		int objectFlag;


	};
	std::vector<std::vector<object>> objects;
	struct object testSprite;
	

	MenuContext *_menuContext;

	int _level;
	
	

	

};

#endif /* Memory_h */
