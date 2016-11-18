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


class Calculator : public cocos2d::Node {

private:

	int _answer;
	Node * _node;
	int _done ;
	
	

public:

	Calculator();
	~Calculator();
	void createCalculator(cocos2d::Vec2 position, cocos2d::Vec2 anchor,float scaleX, float scaleY);
	bool checkAnswer(int value);
	bool onTouchBegan(cocos2d::Touch* touch, cocos2d::Event* event);
	

};

#endif /* Calculator_h */
