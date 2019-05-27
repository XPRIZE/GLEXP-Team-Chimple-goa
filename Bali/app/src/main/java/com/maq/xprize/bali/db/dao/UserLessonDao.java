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

package com.maq.xprize.bali.db.dao;

import android.arch.persistence.room.Dao;
import android.arch.persistence.room.Insert;
import android.arch.persistence.room.OnConflictStrategy;
import android.arch.persistence.room.Query;
import android.arch.persistence.room.Update;

import com.maq.xprize.bali.db.entity.UserLesson;

@Dao
public interface UserLessonDao {
    @Query("SELECT * FROM UserLesson WHERE userId=:userId AND lessonId=:lessonId")
    public UserLesson getUserLessonByUserIdAndLessonId(Long userId, Long lessonId);

    @Query("SELECT * FROM UserLesson WHERE userId=:userId ORDER BY lessonId DESC LIMIT 1")
    public UserLesson getUserLessonByUserIdWithMax(Long userId);

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    public Long insertUserLesson(UserLesson userLesson);

    @Update
    public void updateUserLesson(UserLesson userLesson);
}
