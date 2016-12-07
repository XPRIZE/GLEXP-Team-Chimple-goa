#ifndef __PATCHTHEWALL_SCENE_H__
#define __PATCHTHEWALL_SCENE_H__

#include "cocos2d.h"
#include <vector>
#include "../menu/MenuContext.h"
#include "../puzzle/Alphabet.h"
#include "SimpleAudioEngine.h"
#include "../StartMenuScene.h"
#include "../menu/HelpLayer.h"

class PatchTheWall : public cocos2d::Layer
{
public:
	PatchTheWall();
	~PatchTheWall();
	MenuContext *_menuContext;

	cocos2d::Node *_patchBg;
	cocos2d::ui::Slider * _slideBar;
	cocos2d::Size visibleSize;
	cocos2d::Vec2 origin;
	int _moveFlag = 0, _totalLetter = 0, _totalCount = 0, _helpFlag = 0, _level;
	HelpLayer *_help;

	std::vector<std::vector<wchar_t>> _matrix;

	struct SpriteDetails
	{
		Alphabet *_label;
		cocos2d::Sprite *_sprite;
		wchar_t _id;
		float xP, yP;
		int _sequence;
	}SpriteDetails;
	std::vector<struct SpriteDetails> _spriteDetails;
	std::vector<struct SpriteDetails> _patchDetails;

	struct Position
	{
		float x, y;
		int _flag, _sequence;
	}Position;
	std::vector<struct Position> _position;

	virtual bool init();
	static cocos2d::Scene* createScene();
	void addEvents(struct SpriteDetails);
	void blastCome(float);
	void letterCome(Node *blastNode, int);

/*	static float x, y;
	CocosDenshion::SimpleAudioEngine * backgroundMusic;
	void update(float dt);

	int flag;
	bool flag1 = true;
	int score = 0;
	Alphabet *no;
	void startGame();
	void callingBlast();

	cocos2d::Node* coolSprite;
	virtual void Blast(float dt);
	virtual void gridTouch(float dt);

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
*/
	void fort(float dt);
	void onEnterTransitionDidFinish() override;
    // implement the "static create()" method manually
    CREATE_FUNC(PatchTheWall);
    
    static const char* gameName() { return PATCH_THE_WALL.c_str();}
};

#endif // __PATCHTHEWALL_SCENE_H__
