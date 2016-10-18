//
//  Stroke.hpp
//  Hello
//
//  Created by Shyamal.Upadhyaya on 15/10/16.
//
//

#ifndef Stroke_hpp
#define Stroke_hpp

#include "cocos2d.h"

class Stroke {
private:
    std::vector<cocos2d::Point> _points;
    float _visibleHeight;
public:
    Stroke();
    ~Stroke();
    void addPoints(float x, float y);
    int getNumberOfPoints();
    cocos2d::Point getPointAt(int index);
};

#endif /* Stroke_hpp */
