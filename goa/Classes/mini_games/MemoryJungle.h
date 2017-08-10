//
//  MemoryJungle.h
//
//  Created by Jyoti Prakash on 29/09/16.
//
//

#ifndef MemoryJungle_h
#define MemoryJungle_h

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "../menu/StartMenuScene.h"
#include "../menu/HelpLayer.h"

class MemoryJungle : public cocos2d::Layer {
private:
	Lesson _lesson;
public:
	static cocos2d::Scene* createScene();
	static MemoryJungle *create();


CC_CONSTRUCTOR_ACCESS:
	virtual bool init();
	MemoryJungle();
	virtual ~MemoryJungle();
	bool onTouchBegan(cocos2d::Touch* touch, cocos2d::Event* event);
	void onTouchEnded(cocos2d::Touch* touch, cocos2d::Event* event);
	void onTouchMoved(cocos2d::Touch* touch, cocos2d::Event* event);
	void startGame();
	void pauseAllActiveListeners();
	void resumeAllActiveListeners();
	bool checkMatch();
	void chickenFly();
	void removecurrentlabelsandlisteners();
	void generateRandomNumbers();
	void generateGrid(std::vector<int> grid);
	void onEnterTransitionDidFinish() override;
	static const char* classname() { return MEMORY.c_str(); }
protected:
	std::vector<int> _currentClickedPair;
	std::vector<int> _activeNestIds;
	std::map<std::string, std::string> _data;
	std::vector<std::string> _currentSelectedNestNames;
	std::vector<cocostudio::timeline::ActionTimeline *> _chickenTimeline;
	std::vector<cocostudio::timeline::ActionTimeline *> _leaveTimeline;
	std::vector<int> _randomIndex;
	void addGrid(float sizex, float sizey, float posx, float posy);
	std::vector<std::string> _data_key;
	std::vector<std::string> _data_value;
	Node *_background;
	Node * _chicken;
	Node * _mainground;
	Node * _memoryfarm;
	int _currentNest;
	std::string _hint;
    int _counter;
	int _helpflag;

    
    std::vector<int> _gridTwoByTwoIds;
	std::vector<int> _gridTwoByThreeIds;
	std::vector<int> _gridThreeByFourIds;
	std::vector<int> _gridThreeBySixIds;
	std::vector<int> _gridFourByFiveIds;
	std::vector<int> _gridFourBySixIds;
	std::vector<int> _finalGridIds;

    int _gridTwoByTwoIds_Size = 4;
	int _gridTwoByThreeIds_Size = 6;
	int _gridThreeByFourIds_Size = 12;
	int _gridThreeBySixIds_Size = 18;
	int _gridFourByFiveIds_Size = 20;
	int _gridFourBySixIds_Size = 24;
	

    HelpLayer * help1;
	HelpLayer * help2;
	cocos2d::Vec2 box1pos;
	cocos2d::Vec2 box2pos;
    
	int _pairCount;
	int _wrong;
	int _right;
    
    
	void setupTouch();

	MenuContext *_menuContext;

	int _level;





};

#endif /* MemoryJungle_h */
