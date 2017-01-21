//
//  LipiTKProcessTask.h
//  Hello
//
//  Created by Shyamal.Upadhyaya on 15/10/16.
//
//



#ifndef LipiTKProcessTask_h
#define LipiTKProcessTask_h

#include "AsyncTask.hpp"
#include "LipiTKInterface.h"
#include "Stroke.hpp"

class LipiTKNode;

class LipiTKProcessTask : public AsyncTask
{
public:
    LipiTKProcessTask(LipiTKInterface* lipiTKInterface, std::vector<Stroke*> strokes, LipiTKNode* node);
    ~LipiTKProcessTask();
    void onPreExecute();
    void doInBackground();
    void onPostExecute();
    bool isFinished();
    std::string decodeSymbol(int shapeId);
    std::vector<std::string> getRecognizedCharacters();
    
private:
    bool _bIsFinished;
    LipiTKInterface* _lipiTKInterface;
    std::vector<Stroke*> _strokes;
    std::vector<LipiTKResult*> _results;
    std::vector<std::string> _recognizedCharacters;
    LipiTKNode* _node;
};

#endif /* LipiTKProcessTask_h */
