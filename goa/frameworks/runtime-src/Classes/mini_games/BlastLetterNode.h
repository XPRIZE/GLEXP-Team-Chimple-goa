
#ifndef __BLASTLETTERNODE_NODE_H__
#define __BLASTLETTERNODE_NODE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../LipiTKNode.h"

class BlastLetterNode : public LipiTKNode
{
public:
	BlastLetterNode();
	~BlastLetterNode();
	cocos2d::Sprite* createDrawingBoard();
	static BlastLetterNode *create(int width, int height, cocos2d::Point position);

	void draw(cocos2d::DrawNode* paintingNode, cocos2d::Point fromPoint, cocos2d::Point currentPoint);
	virtual void broadCastRecognizedChars(std::vector<std::string> results) override;
	std::vector<std::string> getPosibileCharacter();

protected:
	MenuContext * menu;
	std::vector<std::string> _result;
	
};

#endif  // __BLASTLETTERNODE_NODE_H__