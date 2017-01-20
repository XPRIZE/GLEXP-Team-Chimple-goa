//
//  WordScene.h
//  safari
//
//  Created by Srikanth Talapadi on 05/08/16.
//
//

#ifndef WordScene_h
#define WordScene_h

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "../menu/HelpLayer.h"
#include "GraphemeGrid.h"
#include "Grapheme.h"
#include "../hero/RPGConfig.h"

class WordSceneLipiTKNode;
class WordScene : public cocos2d::Node {
public:
    static cocos2d::Scene* createScene();
    static WordScene *create();
    static WordScene *createWithWord(std::string wordStr);
    virtual void onTouchEnded(cocos2d::Touch* touch, cocos2d::Event* event);
    virtual void showHandWritingDialog(cocos2d::Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType);
    virtual void onHandWrittenAlphabetTouchEnded(cocos2d::Touch* touch, cocos2d::Event* event);
    virtual void checkAnswer();
    void onExitTransitionDidStart() override;
    void onEnterTransitionDidFinish() override;
    void enableHandWriting();
    bool isHandWritingEnabled();
    static void textReceived(std::string text);
	MenuContext* _menuContext;
	int _score = 0;
CC_CONSTRUCTOR_ACCESS:
    WordScene();
    virtual ~WordScene();
    virtual bool init() override;
    bool initWithWord(std::string word);
    
    
protected:
    virtual cocos2d::Node* loadNode();
    virtual void createGrid();
    virtual void createHandWritingButton();
    virtual void createAnswer();
    virtual void createChoice();
    virtual void gameOver(bool correct);
    virtual void addChoice(Node* choice);
    
    virtual int getGridHeight();
    virtual int getGridNumRows();
    virtual int getGridNumCols();
    virtual std::string getGridBackground();
    virtual std::string getGraphemeUnselectedBackground();
    virtual std::string getGraphemeSelectedBackground();
	virtual GraphemeGrid* createGraphemeGrid(GLfloat width, GLfloat height, int numRows, int numCols, std::string spriteName, std::vector<std::vector<std::string>> graphemes, std::string graphemeUnselectedBackground, std::string graphemeSelectedBackground);

    void clearLipiTKResult();
    virtual void processGrapheme(Grapheme* grapheme);
    void charactersRecognized(cocos2d::EventCustom* event);
    void characterSelected(cocos2d::Ref *sender);

    GraphemeGrid* _grid;
    Node* _background;
    Node* _answer;
    Node* _choice;
    HelpLayer* _helpLayer;
    std::string _helpGraphemeText;
    std::string _word;
    int _numGraphemes;
    std::vector<std::string> _answerGraphemes;
    std::vector<std::vector<std::string>> _matrix;
    std::vector<std::pair<Node*, Grapheme*>> _answerVector;
    bool _showHandWriting;
    cocos2d::ui::Button* _handWritingDialogButton;
    WordSceneLipiTKNode* _lipiTKNode;
    cocos2d::Menu* _lipiTKResultMenu;
    int _numTries;
};

#endif /* WordScene_h */
