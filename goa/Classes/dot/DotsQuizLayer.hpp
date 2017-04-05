//
//  DotsQuizLayer.hpp
//  goa
//
//  Created by Srikanth Talapadi on 03/04/17.
//
//

#ifndef DotsQuizLayer_hpp
#define DotsQuizLayer_hpp

class DotsQuizLayer : public cocos2d::Node {
public:
    static DotsQuizLayer* create();
CC_CONSTRUCTOR_ACCESS:
    DotsQuizLayer();
    virtual ~DotsQuizLayer();
    bool init() override;
};

#endif /* DotsQuizLayer_hpp */
