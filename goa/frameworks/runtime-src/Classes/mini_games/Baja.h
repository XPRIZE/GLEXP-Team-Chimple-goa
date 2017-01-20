#ifndef __BAJA_SCENE_H__
#define __BAJA_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "../menu/StartMenuScene.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "ui/CocosGUI.h"

using namespace cocos2d;

class Baja : public cocos2d::Layer
{

protected:
	MenuContext *_menuContext;
	Sprite* _topBarrier, *_bottomBarrier, *_currentPathBlock;
	std::vector<Sprite*> _allPathBlocks;
	std::vector<Node*> _allCar;
	bool _initBool = true,_positionFlag=true;
	std::string _positionCar = "mid";
	Node *_userCar;
	cocos2d::ui::LoadingBar* _fuelBar;
	CocosDenshion::SimpleAudioEngine* audioBg;
	int _levelPoint = 0, _maxPoint = 0;

public:
	~Baja();
	static cocos2d::Scene* createScene(int levelPoints , int maxPoints);
	virtual bool init(int layerPoints , int maxPoints);
	static Baja* create(int layerPoints, int maxPoints);
	Sprite* setSpriteProperties(std::string frameName,float positionX,float positionY,float scaleX, float scaleY, float anchorX, float anchorY,float rotation,int zorder);
	Node* carGenerate(int positionX,int positionY,std::string animationName,int initFrame, int zOrder);

	float movingTime(Sprite* ImageObject,int speed);
	float carMovingTime(Node* ImageObject, int speed);

	int randmValueIncludeBoundery(int min, int max);
	void addInitPath(Size visibleSize, Vec2 origin);
	void userCarControl(Node* userCar);

	void carMidLeftGenerate(float dt);
	void carRightGenerate(float dt);
	void fuelMeterMethod(float dt);
	// implement the "static create()" method manually
	/*CREATE_FUNC(Baja);*/
	
	void update(float) override;
	
    static const char* gameName() { return BAJA.c_str();}
};

#endif // __BAJA_SCENE_H__
