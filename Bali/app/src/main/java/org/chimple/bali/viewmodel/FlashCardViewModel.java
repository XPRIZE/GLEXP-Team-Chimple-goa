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

package org.chimple.bali.viewmodel;

import android.app.Application;
import android.arch.core.util.Function;
import android.arch.lifecycle.AndroidViewModel;
import android.arch.lifecycle.LiveData;
import android.arch.lifecycle.MutableLiveData;
import android.arch.lifecycle.Transformations;
import android.arch.lifecycle.ViewModel;
import android.arch.lifecycle.ViewModelProvider;
import android.support.annotation.NonNull;

import org.chimple.bali.db.DatabaseCreator;
import org.chimple.bali.db.pojo.FlashCard;

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
        final DatabaseCreator databaseCreator = DatabaseCreator.getInstance(this.getApplication());

        mFlashCards = Transformations.switchMap(databaseCreator.isDatabaseCreated(), new Function<Boolean, LiveData<List<FlashCard>>>() {
            @Override
            public LiveData<List<FlashCard>> apply(Boolean isDbCreated) {
                if (!isDbCreated) {
                    //noinspection unchecked
                    return ABSENT;
                } else {
                    //noinspection ConstantConditions
                    return databaseCreator.getDatabase().lessonUnitDao().getFlashCards();
                }
            }
        });

        databaseCreator.createDb(this.getApplication());
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
