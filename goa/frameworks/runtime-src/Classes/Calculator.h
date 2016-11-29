//
//  Calculator.h
//  
//
//  Created by Jyoti Prakash on 17/11/16.
//
//

#ifndef Calculator_h
#define Calculator_h

#include "cocos2d.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "SimpleAudioEngine.h"
#include "lang/LangUtil.h"
#include "StartMenuScene.h"
#include "lang/TextGenerator.h"
#include "ui/CocosGUI.h"


class Calculator : public cocos2d::Node {

private:

	
	Node * _node;
	int _done ;
	
public:

	Calculator();
	~Calculator();
	unsigned long int _answer;
	std::string _answerText;
	cocos2d::ui::Text * _label;

	Node* createCalculator(cocos2d::Vec2 position, cocos2d::Vec2 anchor,float scaleX, float scaleY);
	bool checkAnswer(int value);
	bool onTouchBegan(cocos2d::Touch* touch, cocos2d::Event* event);
	void resetCalculator();

};

#endif /* Calculator_h */
