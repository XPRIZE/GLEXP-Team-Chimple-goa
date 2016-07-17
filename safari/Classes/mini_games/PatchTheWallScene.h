#ifndef __PATCHTHEWALL_SCENE_H__
#define __PATCHTHEWALL_SCENE_H__

#include "cocos2d.h"
#include <vector>

class PatchTheWall : public cocos2d::Layer
{
public:
	static float x, y;
	bool flag;
	bool flag1 = true;
	static cocos2d::Node *no;
    static cocos2d::Scene* createScene();
	cocos2d::Node* coolSprite;
	virtual void Blast(float dt);
    virtual bool init();
	float randx, randy;
    // a selector callback
    void menuCloseCallback(cocos2d::Ref* pSender);
	void fort(float dt);
	cocos2d::Vector < cocos2d::Node *> blastAlphaReff;
	cocos2d::Node * blastImage;
	cocos2d::Vector < cocos2d::Sprite *> crackReff;
	std::vector<float> gameX;
	std::vector<float> gameY;
	std::vector<bool> breakFlag;
	virtual bool onTouchBegan(cocos2d::Touch *touch, cocos2d::Event * event);
	virtual void onTouchMoved(cocos2d::Touch *touch, cocos2d::Event * event);
	virtual void onTouchEnded(cocos2d::Touch *touch, cocos2d::Event * event);
	virtual void onTouchCancelled(cocos2d::Touch *touch, cocos2d::Event * event);
    // implement the "static create()" method manually
    CREATE_FUNC(PatchTheWall);
};

#endif // __PATCHTHEWALL_SCENE_H__
