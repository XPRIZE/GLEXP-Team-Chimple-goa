#ifndef __DROP_SCENE_H__
#define __DROP_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "../StartMenuScene.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../lang/LangUtil.h"

using namespace cocos2d;


class Drop : public cocos2d::Layer
{

protected:
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	MenuContext *_menuContext;
	std::string _dropCurrentTheme = "";
	int letterHolderId = 0;
	Sprite* _removalPole;

	std::map<std::string, std::string> _scenePath;
	std::map<std::string, float> _sceneBasedNumericalVal;

	std::vector<LabelTTF*> _FallingLetter;
	std::vector<Sprite*> _letterHolderSpriteBin;
	std::vector<LabelTTF*> _basketBin;
	std::vector<Rect> _basketRect;
	std::vector<std::string> _wordOptionBin;
	std::vector<cocostudio::timeline::ActionTimeline *> _basketAnimBin;
	std::vector<Sprite *>_dropHeroTrailerImageBin;
   

public:
	~Drop();
	static cocos2d::Scene* createScene();
	virtual bool init();
	CREATE_FUNC(Drop);

	void update(float dt);
	void leftFloat(Sprite* spriteAlphabet, int time, float positionX, float positionY);
	void addEvents(Sprite* touchSprite);
	void letterAndHolderMaker(float dt);
	void removeLetterHolder();
	void removeHolderAnimation(Sprite* obj);
	//void removeHolderAnimationForHero(std::tuple<Sprite*,Sprite*,int> tp);
	void basketLetterCollisionChecker();
	void removeHeroTrailer();
	void removeFallingLetter();

	void setAllSpriteProperties(Sprite* object, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY);
	LabelTTF* setAllLabelProperties(std::string letter, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY, int labelSizeInPixel);
	std::pair<Sprite*, cocostudio::timeline::ActionTimeline*> setAnimationAndProperties(std::string csbString, float posX, float posY, int zOrder);
	static const char* gameName() { return DROP.c_str(); }
};

#endif // __DROP_SCENE_H__