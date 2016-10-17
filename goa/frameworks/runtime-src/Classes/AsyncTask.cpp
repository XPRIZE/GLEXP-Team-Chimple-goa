//
//  AsyncTask.cpp
//  Hello
//
//  Created by Shyamal.Upadhyaya on 15/10/16.
//
//

#include "AsyncTask.hpp"
#include "pthread.h"
#include "stdlib.h"

void* AsyncTask::_doInBackground(void* pTask)
{
    ((AsyncTask*)pTask)->doInBackground();
    pthread_join(*(pthread_t*)(((AsyncTask*)pTask)->m_threadhandle), NULL);
    ((AsyncTask*)pTask)->onPostExecute();
}

bool AsyncTask::execute()
{
    m_threadhandle = malloc(sizeof(pthread_t));
    onPreExecute();
    pthread_create((pthread_t*) m_threadhandle, NULL, _doInBackground, (void*)this);
    return true;
}



