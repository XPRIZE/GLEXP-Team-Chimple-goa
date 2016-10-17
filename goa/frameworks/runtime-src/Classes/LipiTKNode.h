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
    
    virtual void displayRecognizedChars(std::vector<std::string> results);
    
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
    cocos2d::Menu* _menu;
    std::vector<cocos2d::MenuItemFont *> _chars;
    LipiTKProcessTask* lipiProcessTask;
    LipiTKInterface* _lipiTKInterface;
    
    cocos2d::ui::Button* _clearButton;
    
    bool checkTouchOnDrawingBoard(cocos2d::Touch * touch, cocos2d::Event * event);
    
    void charSelected(cocos2d::Ref* sender);
    
    cocos2d::MenuItemFont* createItem(cocos2d::Point position, Node* parent, std::string buttonText, const cocos2d::Color3B& color, float fontSize);
    
    cocos2d::ui::Button* createButton(const std::string normalImage,
                                                  const std::string selectedImage ,
                                      const std::string disableImage);
    
    
    void clearDrawing(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType);
    
    void clearAllCharacters();
    
    void processLipiTK();
};

#endif /* LipiTKNode_h */
