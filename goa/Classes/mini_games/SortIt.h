//
//  SortIt.h
//  
//
//  Created by Jyoti Parkash on 14/02/17.
//
//

#ifndef SortiIt_h
#define SortiIt_h

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "../menu/StartMenuScene.h"
#include "../menu/HelpLayer.h"

class SortIt : public cocos2d::Layer {
public:
	static cocos2d::Scene* createScene();
	static SortIt *create();
	
	cocostudio::timeline::ActionTimeline *timeline;
CC_CONSTRUCTOR_ACCESS:
	virtual bool init();
	SortIt();
	virtual ~SortIt();
	bool onTouchBegan(cocos2d::Touch* touch, cocos2d::Event* event);
	void onTouchEnded(cocos2d::Touch* touch, cocos2d::Event* event);
	void onTouchMoved(cocos2d::Touch* touch, cocos2d::Event* event);
	
	void onEnterTransitionDidFinish() override;
	
	HelpLayer * _help;
	static const char* classname() { return SORT_IT.c_str(); }
	
protected:
	
	Node *_background;

	
	
	struct Object {
		std::string imagePath;
		float anchorX;
		float anchorY;
		float posX;
		float posY;
		int id;
		float scaleX;
		float scaleY;
	};

	std::vector<struct Object> solidObjects;
	std::vector<struct Object> transObjects;
	
	std::vector<cocos2d::Sprite *> solidSprites;
	std::vector<cocos2d::Sprite *> transSprites;

	int objectsCount;
	int levelObjectsCounter;
	int overlapped;
	bool enableTouch;
	std::string bgPath;
	std::string plistPath;
	int wrong, right;
	std::string successAudioPath;
	std::string failureAudioPath;

	int helpFlag;
	void setupTouch(cocos2d::Sprite *);

	MenuContext *_menuContext;

};

#endif /* SortIt_h */
