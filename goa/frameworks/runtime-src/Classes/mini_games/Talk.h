#ifndef __TALK_SCENE_H__
#define __TALK_SCENE_H__

#include "cocos2d.h"
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


class Talk : public cocos2d::Layer
{
	
public:
	static cocos2d::Scene* createScene();
	Talk();
	~Talk();
	virtual bool init();
	
	Node *Talkbg, *charNode, *wrongNode, *correctNode;

	CREATE_FUNC(Talk);
    
	std::string sceneName;
	cocos2d::Size visibleSize;

    static const char* gameName() { return TALK.c_str(); };
	void generateWord();

	struct LabelDetails
	{
		cocos2d::LabelTTF *label;
		cocos2d::Sprite *container;
		std::string id;
		int sequence, item;
	}LabelDetails;

	bool flag;

	void addEvents(struct LabelDetails);
	void afterAnimation(struct LabelDetails);
	void wordShow(cocos2d::LabelTTF*);
	void wordLabelAnim(struct LabelDetails);
protected:
	MenuContext* _menuContext;
};
#endif // __Talk_SCENE_H__
