#ifndef __Jasmin_Mainfile_SCENE_H__
#define __Jasmin_Mainfile_SCENE_H__

#include "cocos2d.h"
#include "../lang/TextGenerator.h"
#include "../puzzle/WordScene.h"
#include "../GameScene.h"

class Jasmin_Mainfile : public WordScene
{
public:
	static cocos2d::Scene* createScene(); 
	static Jasmin_Mainfile *create();
	void startFlowerAnimation(Node *, int);
	void removeAnimation(Node *);
	
protected:
	cocos2d::Node* loadNode() override;
	std::string getGridBackground() override;
	void createChoice() override;
	void createAnswer() override;
	void gameOver(bool correct);
	std::vector<Node*> _treeArray;
	std::vector<cocostudio::timeline::ActionTimeline*> _animationTimeline;
	std::vector<cocos2d::Sprite*> _fileSequence;
	Node* _tree;
	std::vector<float> _positionX;
	std::vector<float> _positionY;
};

#endif // __Jasmin_Mainfile_SCENE_H__
