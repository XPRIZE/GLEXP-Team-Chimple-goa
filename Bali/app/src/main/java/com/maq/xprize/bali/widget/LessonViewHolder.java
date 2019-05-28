package com.maq.xprize.bali.widget;
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

import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.View;
import android.widget.TextView;

import com.maq.xprize.bali.R;
import com.maq.xprize.bali.activity.LessonActivity;
import com.maq.xprize.bali.activity.LessonListActivity;
import com.maq.xprize.bali.application.BaliApplication;
import com.maq.xprize.bali.db.entity.Lesson;
import com.maq.xprize.bali.launcher.LauncherScreen;

public class LessonViewHolder extends RecyclerView.ViewHolder {
    private static final String TAG = "LessonViewHolder";
    private TextView lessonTextView;

    public LessonViewHolder(View itemView) {
        super(itemView);
        lessonTextView = (TextView) itemView.findViewById(R.id.lesson);
        itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(v.getContext(), LessonActivity.class);
                intent.putExtra(LessonActivity.EXTRA_MESSAGE, (Long)v.getTag());
                if (intent != null) {
                    v.getContext().startActivity(intent);
                }

                Log.d(TAG, "Element " + v.getTag() + " clicked.");
            }
        });

    }

    public void bindTo(Lesson lesson) {
        itemView.setTag(lesson.id);
        lessonTextView.setText(lesson.title);
    }

    public void clear() {
        itemView.invalidate();
        lessonTextView.invalidate();
    }
}
