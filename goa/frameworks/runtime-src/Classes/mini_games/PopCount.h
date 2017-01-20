#ifndef __POPCOUNT_SCENE_H__
#define __POPCOUNT_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "../menu/StartMenuScene.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "ui/CocosGUI.h"
#include "../lang/LangUtil.h"
#include "../lang/TextGenerator.h"
#include "../effects/FShake.h"
#include "SimpleAudioEngine.h"

using namespace cocos2d;
using namespace std;

class PopCount : public cocos2d::Layer
{

protected:
	MenuContext *_menuContext;
	vector<std::pair<float, float>> _coordinate;
	std::map<std::string, std::map<std::string, std::string>> _sceneMap;
	std::map<std::string, std::map<std::string, float>> _popcountPropertyMap;
	string _popcountCurrentTheme = "" , _popCharacter = "";
	int _popUpAnswer = 0, _popElementCount = 5 , _maxPopStarLimits = 10 , _totalHit = 0 , _wrongHit = 0;
	float _popStayDelay = 4.0f , _delayNumber = 0.0f;
	vector<int> _getElementObject;
	cocostudio::timeline::ActionTimeline *_timelineCenterStarFish;
	bool _popMidButtonClickPermision = true , _popStartListner = false , _tempToHoldCenterButton = false;
	bool _setHelpLayerMode = true;

public:
	~PopCount();
	static cocos2d::Scene* createScene();
	virtual bool init();
	static PopCount* create();
	void addEventsOnGrid(cocos2d::Sprite * callerObject);
	void setIslandScene();
	void popUpCall(int popNumberOfCharacter, bool replay);
	void onEnterTransitionDidFinish();
	void update(float) override;

	void setSpriteProperties(Sprite * ImageObject, float positionX, float positionY, float scaleX, float scaleY, float anchorX, float anchorY, float rotation, int zorder);

	void popUpCharacter(Node * character, string popupType);

	vector<int> getRandomValueRange(int min, int max, int getValue);

	void setGridNumberPanel();

	static const char* gameName() { return POPCOUNT.c_str(); }
};

#endif // __POPCOUNT_SCENE_H__
