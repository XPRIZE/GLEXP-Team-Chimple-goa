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

import android.arch.persistence.room.Entity;
import android.arch.persistence.room.ForeignKey;
import android.arch.persistence.room.Ignore;
import android.arch.persistence.room.Index;
import android.arch.persistence.room.PrimaryKey;

import java.util.Date;

@Entity(foreignKeys = {
            @ForeignKey(entity = User.class,
                parentColumns = "id",
                childColumns = "userId"
            ),
            @ForeignKey(entity = Lesson.class,
                parentColumns = "id",
                childColumns = "lessonId"
            )
        },
        indices = {
                @Index("userId"),
                @Index("lessonId")
        }
)
public class UserLesson {
    @PrimaryKey(autoGenerate = true)
    public Long id;

    public Long userId;

    public Long lessonId;

    public Date lastSeenAt;

    public int seenCount;

    public int score;

    @Ignore
    public UserLesson(Long userId, Long lessonId, Date lastSeenAt, int seenCount, int score) {
        this.userId = userId;
        this.lessonId = lessonId;
        this.lastSeenAt = lastSeenAt;
        this.seenCount = seenCount;
        this.score = score;
    }

    public UserLesson() {
    }

}
