//
//  AlphabetWriting.h
//  goa
//
//  Created by Kiran kumar CS on 29/12/16.
//
//

#ifndef AlphabetWriting_h
#define AlphabetWriting_h

#include "cocos2d.h"
#include "editor-support/cocostudio/CocoStudio.h"


class AlphabetWriting : public cocos2d::Node
{
public:
	static AlphabetWriting *createAlphabetWithAnimation(std::string alphabet, bool type);
	void playAnimation(bool loop);
	cocostudio::timeline::ActionTimeline * _animationReff;
CC_CONSTRUCTOR_ACCESS:
	AlphabetWriting();
	virtual ~AlphabetWriting();
	bool initWithAlphabet(std::string alphabet, bool type);

protected:
	
};

#endif /* AlphabetWriting_h */

