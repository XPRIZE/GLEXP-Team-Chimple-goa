#ifndef __STACK_SCENE_H__
#define __STACK_SCENE_H__

#include "cocos2d.h"
#include "Cannon_Ball_Listener.h"
#include <vector>
#include "editor-support/cocostudio/CocoStudio.h"
#include "../menu/MenuContext.h"
#include "../puzzle/Alphabet.h"
#include "../puzzle/CharGenerator.h"
#include "SimpleAudioEngine.h"
#include "../lang/SafariAnalyticsManager.h"
#include "../StartMenuScene.h"
#include "../lang/TextGenerator.h"
#include "ui/CocosGUI.h"
#include "../menu/HelpLayer.h"

class Stack : public cocos2d::Layer
{
	
public:
	static cocos2d::Scene* createScene();
	Stack();
	~Stack();
	virtual bool init();
	
	cocos2d::ui::LoadingBar *_containerbar1, *_containerbar2, *_containerbar3, *_containerbar4, *_containerbar5;
	cocos2d::ui::LoadingBar *_fillpipebar1, *_fillpipebar2, *_fillpipebar3, *_fillpipebar4, *_fillpipebar5, *_suckpipebar;
	cocos2d::ui::LoadingBar *_trayfillbar;

	cocos2d::Sprite *_tray;

	cocostudio::timeline::ActionTimeline *treadmill;
	cocostudio::ActionNode *node;

	Node *stackbg, *charNode, *wrongNode, *correctNode;

	std::map<std::string, std::map<std::string, std::string>> _textToSHow;

	std::vector<cocos2d::Color3B> _color;

	std::vector<std::string> _startName;
	std::vector<std::string> _allWords;
	std::vector<cocos2d::ui::LoadingBar*> containerBar;
	std::vector<cocos2d::ui::LoadingBar*> fillpipebar;

	std::string _word;
	cocos2d::LabelTTF *_wordLabel;
	cocos2d::Size visibleSize;
	std::string sceneName;
	HelpLayer *_help;
	int _helpFlag, _currentLevel, _maxLetterInWord;
	// implement the "static create()" method manually
	CREATE_FUNC(Stack);
    
    static const char* gameName() { return STACK.c_str(); };
	void generateWord();

	struct LabelDetails
	{
		cocos2d::LabelTTF *label;
		cocos2d::Sprite *container;
		std::string id;
		int sequence, item;
	}LabelDetails;


	struct Pos
	{
		int x, y;
	}p1, p2, p3, p4, p5;

	std::vector<Node*> Position;

	bool flag;
	void onEnterTransitionDidFinish() override;
	void addEvents(struct LabelDetails);
	void afterAnimation(struct LabelDetails);
	void wordShow(cocos2d::LabelTTF*);
	void wordLabelAnim(struct LabelDetails);
protected:
	MenuContext* _menuContext;
};
#endif // __STACK_SCENE_H__
