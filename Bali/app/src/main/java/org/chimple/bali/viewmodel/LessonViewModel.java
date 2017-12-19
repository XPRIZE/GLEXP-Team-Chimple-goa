package org.chimple.bali.viewmodel;
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

import android.arch.lifecycle.LiveData;
import android.arch.lifecycle.ViewModel;
import android.arch.paging.PagedList;
import android.arch.paging.LivePagedListBuilder;

import org.chimple.bali.application.BaliApplication;
import org.chimple.bali.application.BaliContext;
import org.chimple.bali.db.AppDatabase;
import org.chimple.bali.db.dao.LessonDao;
import org.chimple.bali.db.entity.Lesson;

public class LessonViewModel extends ViewModel {
    public final LiveData<PagedList<Lesson>> lessonsList;
    public LessonViewModel() {
        LessonDao lessonDao = AppDatabase.getInstance(BaliApplication.getContext()).lessonDao();
        lessonsList = new LivePagedListBuilder<>(
                lessonDao.lessonsBySeq(), /* page size */ 20).build();
    }

}
