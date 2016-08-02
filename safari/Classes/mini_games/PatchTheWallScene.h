#ifndef __PATCHTHEWALL_SCENE_H__
#define __PATCHTHEWALL_SCENE_H__

#include "cocos2d.h"
#include <vector>
#include "../menu/MenuContext.h"
#include "../puzzle/Alphabet.h"
#include "SimpleAudioEngine.h"
class PatchTheWall : public cocos2d::Layer
{
public:
	PatchTheWall();
	~PatchTheWall();
	static float x, y;
	CocosDenshion::SimpleAudioEngine * backgroundMusic;
	void update(float dt);
	MenuContext *_menuContext;
	int flag;
	bool flag1 = true;
	int score = 0;
	Alphabet *no;
	cocos2d::ui::Slider * slideBar;
    static cocos2d::Scene* createScene();
	cocos2d::Node* coolSprite;
	virtual void Blast(float dt);
	virtual void gridTouch(float dt);
    virtual bool init();
	std::vector<std::vector<wchar_t>> matrix;
	float randx, randy;
    // a selector callback
    void menuCloseCallback(cocos2d::Ref* pSender);
	void fort(float dt);
	cocos2d::Vector < Alphabet *> blastAlphaReff;
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
    
    static const char* gameName() { return "Patch The Wall";}
};

#endif // __PATCHTHEWALL_SCENE_H__
