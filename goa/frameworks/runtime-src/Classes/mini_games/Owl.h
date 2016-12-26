#ifndef __OWL_SCENE_H__
#define __OWL_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "../StartMenuScene.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../lang/LangUtil.h"
#include "../lang/TextGenerator.h"
#include "SimpleAudioEngine.h"

using namespace cocos2d;
using namespace std;

class Owl : public cocos2d::Layer
{
protected:
	MenuContext *_menuContext;
	int _ticks, _ticksTotal, _ticks2, _ticksTotal2;
	bool _flagDemo = true,_flagTurnHelp = true, _flagDemoSecond = true, _removeCharacterAnimation = true;
	Node *_sprite = NULL, *_opponent = NULL;

	std::map<std::string, std::string> _data;
	std::vector<std::string> _data_key;
	std::vector<std::string> _data_value;

	string _owlCurrentTheme = "" , _sentence = "" , _sentenceShow ="";
	string _displayWord[5] = { "A","AB","ABC","ABCD","ABCDE"};
	int _blockLevel1 = 0, _heightBlock1 =0, _heightBlock2=0, counter = 0, counter2 = 0, _textCounter = 0, _textCounter2 = 0,_textBoard=0, _textBoard2 =0, _blockLevel2 = 0;
	double _xStart=0, _yStart=0, _xStop=0;
	double _xStartSecond = 0, _yStartSecond = 0, _xStopSecond = 0;
	bool _flagToControlMuiltipleTouch = true;
	LabelTTF *_textLabel,*_textOwlBoard;
	std::map<std::string, std::map<std::string, std::string>> _sceneMap;
	std::map<std::string, std::map<std::string, float>> _owlPropertyMap;

public:
	~Owl();
	CREATE_FUNC(Owl);
	void InitAnimation();
	void UpdateAnimation(float dt);
	void UpdateAnimationSecond(float dt);
	static cocos2d::Scene* createScene();
	void update(float) override;
	void autoPlayerController(float);
	std::tuple<int, int, int> levelAllInfo(int currentLevel ,int totalCategory, int eachCategoryGroup, int totalSceneTheme, int SceneChangeAfterLevel);
	void  setSpriteProperties(Sprite *ImageObject, float positionX, float positionY, float scaleX, float scaleY, float anchorX, float anchorY, float rotation, int zorder);
	string getConvertInUpperCase(string data);
	void crateLetterGridOnBuilding(int blockLevel1, string displayWord);

	void crateLetterGridOnBuildingSecond(int blockLevel, string displayWord);
	void onEnterTransitionDidFinish();
	void createGrid();

	void setBuildingBlock(int blockLevel);

	void setBuildingBlockSecond(int blockLevel);

	void addEventsOnGrid(cocos2d::Sprite * callerObject);

	static const char* gameName() { return OWL.c_str(); }
};

#endif // __OWL_SCENE_H__
