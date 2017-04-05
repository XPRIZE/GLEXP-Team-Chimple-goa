#ifndef __PHONICSFREE_SCENE_H__
#define __PHONICSFREE_SCENE_H__

#include "cocos2d.h"
#include "Cannon_Ball_Listener.h"
#include <vector>
#include "editor-support/cocostudio/CocoStudio.h"
#include "../menu/MenuContext.h"
#include "../puzzle/Alphabet.h"
#include "../puzzle/CharGenerator.h"
#include "SimpleAudioEngine.h"
#include "../lang/SafariAnalyticsManager.h"
#include "../menu/StartMenuScene.h"
#include "../lang/TextGenerator.h"
#include "ui/CocosGUI.h"
#include "../menu/HelpLayer.h"

class Phonicsfree : public cocos2d::Layer
{
	
public:
	static cocos2d::Scene* createScene();
	Phonicsfree();
	~Phonicsfree();
	virtual bool init();

	Node *phonicsfreebg;
	HelpLayer *_help;

	// implement the "static create()" method manually
	CREATE_FUNC(Phonicsfree);
    
    static const char* gameName() { return PHONICSFREE.c_str(); };

	struct LabelDetails
	{
		cocos2d::LabelTTF *label;
		cocos2d::Sprite *container;
		std::string id;
		int sequence, item;
	}LabelDetails;


	void onEnterTransitionDidFinish() override;
	void addEvents(struct LabelDetails);
protected:
	MenuContext* _menuContext;
};
#endif // __Phonicsfree_SCENE_H__
