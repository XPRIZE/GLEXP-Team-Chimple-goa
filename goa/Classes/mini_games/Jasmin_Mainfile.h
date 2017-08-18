#ifndef __Jasmin_Mainfile_SCENE_H__
#define __Jasmin_Mainfile_SCENE_H__

#include "cocos2d.h"
#include "../lang/TextGenerator.h"
#include "../puzzle/WordScene.h"
#include "../menu/GameScene.h"
#include "Spirograph.h"
#include "SimpleAudioEngine.h"

class Jasmin_Mainfile : public WordScene
{
public:
	static cocos2d::Scene* createScene(Lesson* lesson);
	static Jasmin_Mainfile *create();
	void startFlowerAnimation(Node *, int, int);
	void removeAnimation(Node *);
	void showScore();
	void playAnimation();
	~Jasmin_Mainfile();
    static const char* gameName() { return JASMINE.c_str();}
	
protected:
	CocosDenshion::SimpleAudioEngine* audioBg;
	cocos2d::Node* loadNode() override;
	std::string getGridBackground() override;
	void createChoice() override;
	void createAnswer() override;
	void gameOver(bool correct) override;
	std::vector<Node*> _treeArray;
	std::vector<cocostudio::timeline::ActionTimeline*> _animationTimeline;
	std::vector<cocos2d::Sprite*> _fileSequence;
	Node* _tree;
	std::vector<float> _positionX;
	std::vector<float> _positionY;
};

#endif // __Jasmin_Mainfile_SCENE_H__
