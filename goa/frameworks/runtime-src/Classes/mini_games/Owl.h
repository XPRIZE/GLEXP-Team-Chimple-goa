#ifndef __OWL_SCENE_H__
#define __OWL_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "../StartMenuScene.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../lang/LangUtil.h"

using namespace cocos2d;
using namespace std;

class Owl : public cocos2d::Layer
{
protected:
	MenuContext *_menuContext;
	int _ticks, _ticksTotal;
	Node *_sprite = NULL;
	string _owlCurrentTheme = "";
	string _displayWord[5] = { "A","AB","ABC","ABCD","ABCDE" };
	int _blockLevel1 = 0, _heightBlock1 =0, counter = 0 , _textCounter = 0,_textBoard=0;
	double _xStart=0, _yStart=0, _xStop=0;
	bool _flagToControlMuiltipleTouch = true;
	LabelTTF *_textLabel,*_textOwlBoard;
	std::map<std::string, std::map<std::string, std::string>> _sceneMap;
	std::map<std::string, std::map<std::string, float>> _owlPropertyMap;

public:
	~Owl();
	void InitAnimation();
	void UpdateAnimation(float dt);
	//void draws();
	//void onEnterTransitionDidFinish();
	//void onExitTransitionDidStart();
	static cocos2d::Scene* createScene();
	virtual bool init();

	CREATE_FUNC(Owl);
	void update(float) override;

	void  setSpriteProperties(Sprite *ImageObject, float positionX, float positionY, float scaleX, float scaleY, float anchorX, float anchorY, float rotation, int zorder);

	void crateLetterGridOnBuilding(int blockLevel1, string displayWord);

	void createGrid();

	void setBuildingBlock(int blockLevel);

	void addEventsOnGrid(cocos2d::Sprite * callerObject);

	static const char* gameName() { return OWL.c_str(); }
};

#endif // __OWL_SCENE_H__
