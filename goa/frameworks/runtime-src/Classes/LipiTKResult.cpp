//
//  LipitkResult.cpp
//  Hello
//
//  Created by Shyamal.Upadhyaya on 15/10/16.
//
//

#include "LipiTKResult.h"

LipiTKResult::LipiTKResult(int shapeId, float confidence){
    _shapeId = shapeId;
    _confidence = confidence;
}


int LipiTKResult::getShapeId() {
    return _shapeId;
}

float LipiTKResult::getConfidence() {
    return _confidence;
}

LipiTKResult::~LipiTKResult() {
    
}
