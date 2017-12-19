package org.chimple.bali.ui;
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

import android.arch.paging.PagedListAdapter;
import android.support.annotation.NonNull;
import android.support.v7.recyclerview.extensions.DiffCallback;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import org.chimple.bali.R;
import org.chimple.bali.db.entity.Lesson;
import org.chimple.bali.widget.LessonViewHolder;

public class LessonAdapter extends PagedListAdapter<Lesson, LessonViewHolder> {
    public LessonAdapter() {
        super(DIFF_CALLBACK);
    }

    @Override
    public LessonViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_lesson, parent, false);
        return new LessonViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(LessonViewHolder holder, int position) {
        Lesson lesson = getItem(position);
        if (lesson != null) {
            holder.bindTo(lesson);
        } else {
            // Null defines a placeholder item - PagedListAdapter will automatically invalidate
            // this row when the actual object is loaded from the database
            holder.clear();
        }
    }
    public static final DiffCallback<Lesson> DIFF_CALLBACK = new DiffCallback<Lesson>() {
        @Override
        public boolean areItemsTheSame(@NonNull Lesson oldLesson, @NonNull Lesson newLesson) {
            // Lesson properties may have changed if reloaded from the DB, but ID is fixed
            return oldLesson.id == newLesson.id;
        }
        @Override
        public boolean areContentsTheSame(@NonNull Lesson oldLesson, @NonNull Lesson newLesson) {
            // NOTE: if you use equals, your object must properly override Object#equals()
            // Incorrectly returning false here will result in too many animations.
            return oldLesson.equals(newLesson);
        }
    };
}
