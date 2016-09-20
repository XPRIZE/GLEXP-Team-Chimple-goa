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
	//void onTouchMoved(cocos2d::Touch* touch, cocos2d::Event* event);
	void startGame();
	static const char* classname() { return WEMBLEY.c_str(); }
protected:
	
	bool _touchActive;
	void setupTouch();
	//void finishedAll();
	int _touches;

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
	
	
	CC_SYNTHESIZE(int, _count, Count);

	MenuContext *_menuContext;

};

#endif /* Memory_h */
