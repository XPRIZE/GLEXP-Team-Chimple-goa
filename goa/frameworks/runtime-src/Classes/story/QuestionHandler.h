//
//  QuestionHandler.h
//  goa
//
//  Created by Srikanth Talapadi on 07/01/2017.
//
//

#ifndef QuestionHandler_h
#define QuestionHandler_h

#include "cocos2d.h"
#include "ui/CocosGUI.h"
#include "../menu/MenuContext.h"

#define AUTO_CLICK 0

class QuestionHandler: public cocos2d::Node {
public:
    static cocos2d::Scene *createScene(std::string storyId);
    static QuestionHandler *create(std::string storyId);
    void onEnterTransitionDidFinish() override;
    static void setButtonProperties(cocos2d::Node* button, std::string name, std::string text, const cocos2d::ui::Widget::ccWidgetTouchCallback& callback);
    void gotoNextQuestion(int score);
    static const std::string FONT_NAME;
    static const int FONT_SIZE;
    static const cocos2d::Color3B FONT_COLOR;
    static const cocos2d::Color3B FONT_HIGHLIGHT_COLOR;
    std::string getBaseDir();

CC_CONSTRUCTOR_ACCESS:
    QuestionHandler();
    virtual ~QuestionHandler();
    virtual bool init() override;
    bool initWithStoryId(std::string storyId);

protected:
    std::string _storyId;
    std::string _storyInformation;
    std::string _baseDir;
    MenuContext* _menuContext;
    std::vector<std::vector<std::string>> _questions;
    int _currentQuestion;
    Node* _currentQuestionNode;
};

#endif /* QuestionHandler_h */
