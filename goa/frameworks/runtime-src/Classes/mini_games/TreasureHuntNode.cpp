
#include "TreasureHuntNode.h"
#include "../WordSceneLipiTKNode.h"

USING_NS_CC;

int TreasureHuntNode::done = 0;

TreasureHuntNode::TreasureHuntNode()
{
}

TreasureHuntNode::~TreasureHuntNode()
{

}

cocos2d::Sprite * TreasureHuntNode::createDrawingBoard()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto drawingBoardSprite = Sprite::create();
	drawingBoardSprite->setTextureRect(Rect(0, 0, _canvasWidth, _canvasHeight));
	drawingBoardSprite->setColor(Color3B::BLUE);
	drawingBoardSprite->setOpacity(50);
	return drawingBoardSprite;
}

TreasureHuntNode * TreasureHuntNode::create(int width, int height, cocos2d::Point position)
{
	TreasureHuntNode* wordSceneLipiTKNode = new (std::nothrow) TreasureHuntNode();
	if (wordSceneLipiTKNode && wordSceneLipiTKNode->initialize(width, height, position))
	{
		wordSceneLipiTKNode->autorelease();
		wordSceneLipiTKNode->setPosition(position);
		return wordSceneLipiTKNode;
	}
	CC_SAFE_DELETE(wordSceneLipiTKNode);
	return nullptr;
}

void TreasureHuntNode::draw(cocos2d::DrawNode * paintingNode, cocos2d::Point fromPoint, cocos2d::Point currentPoint)
{
	paintingNode->drawSegment(fromPoint, currentPoint, 20, Color4F(0 / 255.0f, 0 / 255.0f, 0 / 255.0f, 1.0f));
	//paintingNode->drawSegment(fromPoint, currentPoint, 5, Color4F(255 / 255.0f, 255 / 255.0f, 255 / 255.0f, 1.0f));
}

void TreasureHuntNode::broadCastRecognizedChars(std::vector<std::string> results)
{
	CCLOG("car draw = %s", results.at(0).c_str());
	_result = results;
}

std::vector<std::string> TreasureHuntNode::getPosibileCharacter()
{
	return _result;
}

void TreasureHuntNode::clearDrawing(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
	if (eEventType == cocos2d::ui::Widget::TouchEventType::ENDED) {
		_paintingNode->clear();
		//_canvas->clear(0, 0, _canvasWidth, _canvasHeight);
		_strokes.clear();
		clearPrintedCharacters();
	}
}

void TreasureHuntNode::postTouchEnded(cocos2d::Touch * touch, cocos2d::Event * event, cocos2d::Point touchPoint) {

	CCLOG("trace done!!!");
	TreasureHuntNode::done = 1;

}