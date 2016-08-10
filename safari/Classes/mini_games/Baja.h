#ifndef __BAJA_SCENE_H__
#define __BAJA_SCENE_H__

#include "cocos2d.h"
#include "../StartMenuScene.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "cocostudio/CocoStudio.h"
#include "ui/CocosGUI.h"

using namespace cocos2d;

class Baja : public cocos2d::Layer
{

protected:
	Sprite* _topBarrier, *_bottomBarrier, *_currentPathBlock;
	std::vector<Sprite*> _allPathBlocks;
	std::vector<Node*> _allCar;
	Size _visibleSize;
	Vec2 _origin;
	bool _initBool = true,_positionFlag=true;
	std::string _positionCar = "mid";
	Node *_leftCar, *_midCar, *_rightCar , *_userCar;
	cocos2d::ui::LoadingBar* _fuelBar;
public:
	static cocos2d::Scene* createScene();
	virtual bool init();
	Sprite* setSpriteProperties(std::string frameName,float positionX,float positionY,float scaleX, float scaleY, float anchorX, float anchorY,float rotation,int zorder);
	Node* carGenerate(int positionX,int positionY,std::string animationName,int initFrame, int zOrder);

	float movingTime(Sprite* ImageObject,int speed);
	float carMovingTime(Node* ImageObject, int speed);

	int randmValueIncludeBoundery(int min, int max);
	void addInitPath();
	void userCarControl(Node* userCar);

	void carLeftGenerate(float dt);
	void carMidGenerate(float dt);
	void carRightGenerate(float dt);
	void fuelMeterMethod(float dt);
	// implement the "static create()" method manually
	CREATE_FUNC(Baja);
	void update(float) override;
	static const char* gameName() { return BAJA.c_str(); }
};

#endif // __BAJA_SCENE_H__
