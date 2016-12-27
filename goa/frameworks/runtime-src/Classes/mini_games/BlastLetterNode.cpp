
#include "BlastLetterNode.h"
#include "CarDraw.h"
#include "../WordSceneLipiTKNode.h"

USING_NS_CC;


BlastLetterNode::BlastLetterNode()
{
}

BlastLetterNode::~BlastLetterNode()
{

}

cocos2d::Sprite * BlastLetterNode::createDrawingBoard()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto drawingBoardSprite = Sprite::create();
	drawingBoardSprite->setTextureRect(Rect(0, 0, _canvasWidth, _canvasHeight));
	drawingBoardSprite->setColor(Color3B::WHITE);
	drawingBoardSprite->setOpacity(0);
	return drawingBoardSprite;
}

BlastLetterNode * BlastLetterNode::create(int width, int height, cocos2d::Point position)
{
	BlastLetterNode* wordSceneLipiTKNode = new (std::nothrow) BlastLetterNode();
	if (wordSceneLipiTKNode && wordSceneLipiTKNode->initialize(width, height, position))
	{
		wordSceneLipiTKNode->autorelease();
		wordSceneLipiTKNode->setPosition(position);
		return wordSceneLipiTKNode;
	}
	CC_SAFE_DELETE(wordSceneLipiTKNode);
	return nullptr;
}
void BlastLetterNode::postTouchEnded(cocos2d::Touch * touch, cocos2d::Event * event, cocos2d::Point touchPoint) {
//	if (_clearButton && !_blastHappend) {
//		_clearButton->setEnabled(false);
//	}
}
void BlastLetterNode::draw(cocos2d::DrawNode * paintingNode, cocos2d::Point fromPoint, cocos2d::Point currentPoint)
{
	if(_drawAllowance)
	paintingNode->drawSegment(fromPoint, currentPoint, 50, Color4F(0 / 255.0f, 0 / 255.0f, 0 / 255.0f, 1.0f));
}

void BlastLetterNode::broadCastRecognizedChars(std::vector<std::string> results)
{
	//CCLOG("car draw = %s", results.at(0).c_str());
	_result = results;
}

ui::Button * BlastLetterNode::createButton(const std::string normalImage, const std::string selectedImage, const std::string disableImage, Vec2 position)
{
	cocos2d::ui::Button* button = cocos2d::ui::Button::create(normalImage, selectedImage, disableImage, cocos2d::ui::Widget::TextureResType::LOCAL);
	button->setPosition(position);
	_clearButton = button;
	button->addTouchEventListener(CC_CALLBACK_2(BlastLetterNode::clearDrawing, this));
	return button;
}

void BlastLetterNode::clearDrawing(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
	if (eEventType == cocos2d::ui::Widget::TouchEventType::ENDED) {
		_paintingNode->clear();
		//_canvas->clear(0, 0, _canvasWidth, _canvasHeight);
		_strokes.clear();
		clearPrintedCharacters();
	}
}


std::vector<std::string> BlastLetterNode::getPosibileCharacter()
{
	return _result;
}

void BlastLetterNode::drawAllowance(bool permission)
{
	_drawAllowance = permission;
}

void BlastLetterNode::setblast(bool blastOrNot)
{
	_blastHappend = blastOrNot;
}

