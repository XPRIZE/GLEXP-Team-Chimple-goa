//
//  AsyncTask.hpp
//  Hello
//
//  Created by Shyamal.Upadhyaya on 15/10/16.
//
//

#ifndef AsyncTask_hpp
#define AsyncTask_hpp

#include <stdio.h>

class AsyncTask
{
public:
    virtual void onPreExecute(){}
    virtual void doInBackground() = 0;
    virtual void onPostExecute(){}
    bool execute();
    static void* _doInBackground(void*);
private:
    void* m_threadhandle;
};

#endif /* AsyncTask_hpp */
