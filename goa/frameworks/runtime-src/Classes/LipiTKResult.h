//
//  LipiTKResult.h
//  Hello
//
//  Created by Shyamal.Upadhyaya on 15/10/16.
//
//

#ifndef LipiTKResult_h
#define LipiTKResult_h

class LipiTKResult {
public:
    LipiTKResult(int shapeId, float confidence);
    ~LipiTKResult();
    
    int getShapeId();
    float getConfidence();

private:
    int _shapeId;
    float _confidence;
    
};
#endif /* LipiTKResult_h */
