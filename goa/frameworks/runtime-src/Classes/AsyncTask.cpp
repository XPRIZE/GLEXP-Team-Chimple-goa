//
//  AsyncTask.cpp
//  Hello
//
//  Created by Shyamal.Upadhyaya on 15/10/16.
//
//

#include "AsyncTask.hpp"
#if (CC_TARGET_PLATFORM == CC_PLATFORM_WINRT || CC_TARGET_PLATFORM == CC_PLATFORM_WIN32)
#else
#include "pthread.h"
#endif
#include "stdlib.h"

void* AsyncTask::_doInBackground(void* pTask)
{
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_WINRT || CC_TARGET_PLATFORM == CC_PLATFORM_WIN32)
    #else
    ((AsyncTask*)pTask)->doInBackground();
    pthread_join(*(pthread_t*)(((AsyncTask*)pTask)->m_threadhandle), NULL);
    ((AsyncTask*)pTask)->onPostExecute();
    #endif  
	return nullptr;
}

bool AsyncTask::execute()
{
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_WINRT || CC_TARGET_PLATFORM == CC_PLATFORM_WIN32)
        onPreExecute();
        doInBackground();
        onPostExecute();
    #else
        m_threadhandle = malloc(sizeof(pthread_t));
        onPreExecute();
        pthread_create((pthread_t*) m_threadhandle, NULL, _doInBackground, (void*)this);
        return true;
    #endif
		return false;
}



