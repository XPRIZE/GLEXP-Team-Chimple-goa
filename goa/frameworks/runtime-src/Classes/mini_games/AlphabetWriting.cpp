//
//  AlphabetWriting.cpp
//  goa
//
//  Created by Kiran kumar CS on 29/12/16.
//
//

#include "AlphabetWriting.h"

USING_NS_CC;

AlphabetWriting * AlphabetWriting::createAlphabetWithAnimation(std::string alphabet, bool type)
{
	AlphabetWriting *alphamon = new (std::nothrow) AlphabetWriting();
	if (alphamon && alphamon->initWithAlphabet(alphabet,type)) {
		alphamon->autorelease();
		return alphamon;
	}
	CC_SAFE_DELETE(alphamon);
	return nullptr;
	\
}

void AlphabetWriting::playAnimation(bool loop)
{
	_animationReff->play("A", loop);
}

AlphabetWriting::~AlphabetWriting()
{

}
bool AlphabetWriting::initWithAlphabet(std::string alphabet, bool type)
{
	std::string path;
	if (type)
	{
		path = "uppercase/";
	}
	else
	{
		path = "lowercase/";
	}
	auto alphabetNode = CSLoader::createNode(path + alphabet + ".csb");
	addChild(alphabetNode);

	_animationReff = CSLoader::createTimeline(path + alphabet + ".csb");
	alphabetNode->runAction(_animationReff);
	_animationReff->play("A", false);

	return true;
}

float AlphabetWriting::getTotalAnimationDuration()
{
	return ((_animationReff->getDuration()+0.0f)/60.0f);
}

AlphabetWriting::AlphabetWriting()
{

}
