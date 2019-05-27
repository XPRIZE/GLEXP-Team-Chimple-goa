/*
 * Copyright 2017, Team Chimple
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.maq.xprize.bali.viewmodel;

import android.app.Application;
import android.arch.lifecycle.AndroidViewModel;
import android.arch.lifecycle.LiveData;
import android.arch.lifecycle.MutableLiveData;
import android.arch.lifecycle.ViewModel;
import android.arch.lifecycle.ViewModelProvider;
import android.support.annotation.NonNull;

import com.maq.xprize.bali.db.pojo.FlashCard;
import com.maq.xprize.bali.repo.FlashCardRepo;

import java.util.List;

public class FlashCardViewModel extends AndroidViewModel {
    private static final MutableLiveData ABSENT = new MutableLiveData();
    {
        //noinspection unchecked
        ABSENT.setValue(null);
    }

    private final LiveData<List<FlashCard>> mFlashCards;

    private final Long mLessonId;

    public FlashCardViewModel(Application application, Long lessonId) {
        super(application);
        mLessonId = lessonId;
        mFlashCards = FlashCardRepo.getFlashCards(application, lessonId);
    }

    public LiveData<List<FlashCard>> getFlashCards() {
        return mFlashCards;
    }

    public static class Factory extends ViewModelProvider.NewInstanceFactory {
        @NonNull
        private final Application mApplication;

        private final Long mLessonId;

        public Factory(@NonNull Application application, Long lessonId) {
            mApplication = application;
            mLessonId = lessonId;
        }

        @Override
        public <T extends ViewModel> T create(Class<T> modelClass) {
            return (T) new FlashCardViewModel(mApplication, mLessonId) ;
        }
    }
}
