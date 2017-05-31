//
//  BlastLetter.h 
//  goa
//
//  Created by Karim Mirazul  on 05/10/16
//
//

#ifndef __BLASTLETTER_SCENE_H__
#define __BLASTLETTER_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "../menu/StartMenuScene.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "ui/CocosGUI.h"
#include "../lang/LangUtil.h"
#include "../lang/TextGenerator.h"
#include "../ext/WordSceneLipiTKNode.h"
#include "BlastLetterNode.h"

using namespace cocos2d;
using namespace std;

class BlastLetter : public cocos2d::Layer
{

protected:
	MenuContext *_menuContext;
	std::vector<std::string> _result;
	std::map<std::string, std::string> _data;
	std::string _data_key , _data_value, _sentence ="";
	int _counterLetter = 0 , _maxWrong = 3;
	Node* _popGrid = NULL;
	bool _checkingAlphabets = false , _bang = true ,_touch = true , _flagTurnHelp = true , _alphaAnimationFlag = true;
	cocostudio::timeline::ActionTimeline *_timelineBlast;

public:
	~BlastLetter();
	static cocos2d::Scene* createScene();
	virtual bool init();
	static BlastLetter* create();
	void checkAlphabets();
	void checkWordLength();
	bool checkRecognizeLetter(string letter);
	string getConvertInUpperCase(string data);
	void addEventsOnGrid(cocos2d::Sprite * callerObject);
	void onEnterTransitionDidFinish();
	std::vector<std::pair<int, int>> getAllGridCoord(int row , int column);
	void update(float) override;
	void removeAllWritingScene();
	Sequence* shakingCharacter();
	cocos2d::ui::Button* _clearButton;

	static const char* gameName() { return BLASTLETTER.c_str(); }
};

#endif // __BLASTLETTER_SCENE_H__
