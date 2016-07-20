#ifndef __ALPHAMONFEED_SCENE_H__
#define __ALPHAMONFEED_SCENE_H__

#include "cocos2d.h"
#include "cocostudio/CocoStudio.h"
#include "ui/CocosGUI.h"

class AlphamonFeed : public cocos2d::Layer
{
public:
	cocos2d::Rect monster;
	cocos2d::Node * smile;
	cocos2d::Node * sad;
	cocos2d::Node * angry;
	cocos2d::Node * laughing;
    static cocos2d::Scene* createScene(std::string str);
	cocostudio::timeline::ActionTimeline* alpha_animation;
    virtual bool init();
	cocos2d::DrawNode * myBox;
	cocos2d::Node * sprite;
	cocos2d::Node * background;
	cocos2d::Node * sprite1;
	cocos2d::ui::Slider * slideBar;
	cocos2d::Vector <cocostudio::timeline::ActionTimeline *> mouthAnimation;
	cocos2d::Vector <cocostudio::timeline::ActionTimeline *> legAnimation;
	cocos2d::Vector < cocos2d::Node *> legReff;
	bool flage = true;
	bool flage_reverse = false;
	cocos2d::Vector < cocos2d::Node *> fruitReff;
	bool isTouching;
	float touchPosition;
	virtual bool onTouchBegan(cocos2d::Touch *touch, cocos2d::Event * event);
	virtual void onTouchMoved(cocos2d::Touch *touch, cocos2d::Event * event);
	virtual void onTouchEnded(cocos2d::Touch *touch, cocos2d::Event * event);
	virtual void onTouchCancelled(cocos2d::Touch *touch, cocos2d::Event * event);

	virtual void update(float dt);

	void showFruits(float dt);

    
    // implement the "static create()" method manually
    CREATE_FUNC(AlphamonFeed);
};

#endif // __ALPHAMONFEED_SCENE_H__
