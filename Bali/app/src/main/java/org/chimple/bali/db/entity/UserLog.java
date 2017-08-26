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
import android.arch.persistence.room.Ignore;
import android.arch.persistence.room.PrimaryKey;

import java.util.Date;

@Entity
public class UserLog {
    @Ignore
    public static final int LESSON_TYPE = 1;

    @Ignore
    public static final int LESSON_UNIT_TYPE = 2;

    @Ignore
    public static final int UNIT_TYPE = 3;

    @Ignore
    public static final int START_EVENT = 1;

    @Ignore
    public static final int STOP_EVENT = 2;

    @Ignore
    public static final int PAUSE_EVENT = 3;

    @Ignore
    public static final int RESUME_EVENT = 4;

    @PrimaryKey(autoGenerate = true)
    public Long id;

    public Date loggedAt;

    public int entityType;

    public Long entityId;

    public int event;

    @Ignore
    public UserLog(Date loggedAt, int entityType, Long entityId, int event) {
        this.loggedAt = loggedAt;
        this.entityType = entityType;
        this.entityId = entityId;
        this.event = event;
    }

    public UserLog() {

    }
}
