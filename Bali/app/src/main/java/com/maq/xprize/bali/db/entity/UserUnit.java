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

package com.maq.xprize.bali.db.entity;

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
            @ForeignKey(entity = Unit.class,
                parentColumns = "id",
                childColumns = "unitId"
            )
        },
        indices = {
                @Index("userId"),
                @Index("unitId")
        }
)
public class UserUnit {
    @PrimaryKey(autoGenerate = true)
    public Long id;

    public Long userId;

    public Long unitId;

    public Date seenAt;

    public int seenCount;

    public int score;

    @Ignore
    public UserUnit(Long userId, Long unitId, Date seenAt, int seenCount, int score) {
        this.userId = userId;
        this.unitId = unitId;
        this.seenAt = seenAt;
        this.seenCount = seenCount;
        this.score = score;
    }

    public UserUnit() {

    }
}
