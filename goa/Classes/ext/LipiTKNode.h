//
//  LipiTKNode.h
//  Hello
//
//  Created by Shyamal.Upadhyaya on 14/10/16.
//
//


#ifndef LipiTKNode_h
#define LipiTKNode_h

#include "cocos2d.h"
#include "Stroke.hpp"
#include "LipiTKInterface.h"
#include "LipiTKProcessTask.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "ui/CocosGUI.h"

class LipiTKNode : public cocos2d::Node {
 
public:
    LipiTKNode();
    
    virtual ~LipiTKNode();
    
    //later add options
    static LipiTKNode* create(int width, int height, cocos2d::Point position);
    virtual bool initialize(int width, int height, cocos2d::Point position);
    
    virtual cocos2d::Sprite* createDrawingAreaWithColor(cocos2d::Vec2 anchorPoint, cocos2d::Vec2 position, float opacity,const cocos2d::Color3B color);
    
    virtual cocos2d::Sprite* createDrawingAreaUsingFileName(cocos2d::Vec2 anchorPoint, cocos2d::Vec2 position, float opacity, std::string fileName);
    
    virtual cocos2d::ui::Button* createButton(const std::string normalImage,
                                      const std::string selectedImage ,
                                      const std::string disableImage, cocos2d::Vec2 position);

    virtual void clearDrawing(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType);
    
    virtual void clearPrintedCharacters();
    
    virtual void broadCastRecognizedChars(std::vector<std::string> results);
    
    virtual cocos2d::Sprite* createDrawingBoard();
    
    virtual void draw(cocos2d::DrawNode* paintingNode, cocos2d::Point fromPoint, cocos2d::Point toPoint);
    
    virtual void postTouchBegan(cocos2d::Touch * touch, cocos2d::Event * event, cocos2d::Point touchPoint);
    virtual void postTouchMoved(cocos2d::Touch * touch, cocos2d::Event * event, cocos2d::Point touchPoint);
    virtual void postTouchEnded(cocos2d::Touch * touch, cocos2d::Event * event, cocos2d::Point touchPoint);

	virtual std::vector<Stroke*> getStrokes();


	// canvas, drawBoard and painting node
	cocos2d::RenderTexture* _canvas;
	cocos2d::Sprite* _drawingBoard;
	cocos2d::DrawNode* _paintingNode;

	std::vector<Stroke*> _strokes;
	Stroke* _currentStroke;

	void writingEnable(bool enable);
protected:
    int _canvasHeight;
    int _canvasWidth;
    cocos2d::ui::Button* _clearButton;
    
private:
    bool _isTouchEndedOrMovedOut;

    
    LipiTKProcessTask* lipiProcessTask;
    LipiTKInterface* _lipiTKInterface;
    
    cocos2d::Point _startTouchPoint;
    cocos2d::Point _lastTouchPoint;
    
    bool checkTouchOnDrawingBoard(cocos2d::Touch * touch, cocos2d::Event * event);
    
    bool onTouchBegan(cocos2d::Touch * touch, cocos2d::Event* event);
    void onTouchMoved(cocos2d::Touch * touch, cocos2d::Event * event);
    void touchEnded(cocos2d::Touch* touch, cocos2d::Event* event);

	cocos2d::EventListenerTouchOneByOne * _listenerTouches;
    void processLipiTK();
	virtual void removeClearButton();
	virtual void setClearButtonTexture(const std::string normalImage,
		const std::string selectedImage,
		const std::string disableImage );
};

#endif /* LipiTKNode_h */
