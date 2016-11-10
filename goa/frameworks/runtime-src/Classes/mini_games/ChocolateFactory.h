#ifndef __CHOCO_SCENE_H__
#define __CHOCO_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "../StartMenuScene.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../lang/LangUtil.h"
#include "../lang/TextGenerator.h"

using namespace cocos2d;
using namespace std;

class ChocolateFactory : public cocos2d::Layer
{
protected:
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	MenuContext *_menuContext;

public:
	~ChocolateFactory();
	CREATE_FUNC(ChocolateFactory);
	static cocos2d::Scene* createScene();
	void onEnterTransitionDidFinish();
	void update(float) override;


	void setAllSpriteProperties(Sprite* object, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY);
	LabelTTF* setAllLabelProperties(std::string letter, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY, int labelSizeInPixel);
	std::pair<Sprite*, cocostudio::timeline::ActionTimeline*> setAnimationAndProperties(std::string csbString, float posX, float posY, int zOrder);

	static const char* gameName() { return CHOCOLATEFACTORY.c_str(); }
};

#endif // __CHOCO_SCENE_H__
