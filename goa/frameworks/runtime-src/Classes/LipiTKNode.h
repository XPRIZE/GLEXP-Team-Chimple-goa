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
    static LipiTKNode* create(int width, int height, cocos2d::Point position, int opacity);
    
    virtual bool initialize(int width, int height, cocos2d::Point position, int opacity);
    
    virtual bool onTouchBegan(cocos2d::Touch * touch, cocos2d::Event* event);
    virtual void onTouchMoved(cocos2d::Touch * touch, cocos2d::Event * event);
    virtual void touchEnded(cocos2d::Touch* touch, cocos2d::Event* event);
    virtual cocos2d::Sprite* createDrawingAreaWithColor(cocos2d::Vec2 anchorPoint, cocos2d::Vec2 position, float opacity,const cocos2d::Color3B::Color3B& color);
    
    virtual cocos2d::Sprite* createDrawingAreaUsingFileName(cocos2d::Vec2 anchorPoint, cocos2d::Vec2 position, float opacity, std::string fileName);
    
    virtual cocos2d::ui::Button* createButton(const std::string normalImage,
                                      const std::string selectedImage ,
                                      const std::string disableImage, cocos2d::Vec2 position);

    virtual void clearDrawing(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType);
    
    virtual void clearPrintedCharacters();
    
    void broadCastRecognizedChars(std::vector<std::string> results);
    
private:
    int _canvasHeight;
    int _canvasWidth;
    bool _isTouchEndedOrMovedOut;
    // canvas and brush tip
    cocos2d::RenderTexture* _canvas;
    cocos2d::Sprite* _drawingBoard;
    cocos2d::Sprite* _brush;
    cocos2d::DrawNode *_paintingNode;
    std::vector<Stroke*> _strokes;
    Stroke* _currentStroke;
    LipiTKProcessTask* lipiProcessTask;
    LipiTKInterface* _lipiTKInterface;
    
    cocos2d::ui::Button* _clearButton;
    
    bool checkTouchOnDrawingBoard(cocos2d::Touch * touch, cocos2d::Event * event);
    
    
    void processLipiTK();
};

#endif /* LipiTKNode_h */
