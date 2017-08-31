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

package org.chimple.bali.db.entity;

import android.arch.persistence.room.ColumnInfo;
import android.arch.persistence.room.Entity;
import android.arch.persistence.room.ForeignKey;
import android.arch.persistence.room.Ignore;
import android.arch.persistence.room.Index;
import android.arch.persistence.room.PrimaryKey;

@Entity(foreignKeys = {
                @ForeignKey(entity = Lesson.class,
                        parentColumns = "id",
                        childColumns = "currentLessonId"
                )
        }
)
public class User {
    @PrimaryKey(autoGenerate = true)
    public Long id;

    public String name;

    public String photo;

    public Long currentLessonId;

    public int coins;

    @Ignore
    public User(String name, String photo, Long currentLessonId, int coins) {
        this.name = name;
        this.photo = photo;
        this.currentLessonId = currentLessonId;
        this.coins = coins;
    }

    @Ignore
    public User(String[] columns) {
        if(columns.length < 6) {
            throw new IllegalArgumentException("User: Column length lesser than expected");
        }
        if(!columns[0].equals("User")) {
            throw new IllegalArgumentException("User: table name is not User");
        }
        try {
            id = Long.parseLong(columns[1]);
            name = columns[2];
            photo = columns[3];
            currentLessonId = Long.parseLong(columns[4]);
            coins = Integer.parseInt(columns[5]);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("User: Failed parsing string to number");
        }
    }

    public User() {

    }
}
