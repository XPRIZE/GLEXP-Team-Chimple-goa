package org.chimple.bali.activity;
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

import android.arch.lifecycle.ViewModelProviders;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.RecyclerView;

import org.chimple.bali.R;
import org.chimple.bali.ui.LessonAdapter;
import org.chimple.bali.viewmodel.LessonViewModel;

public class LessonListActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_lesson_list);

        LessonViewModel viewModel = ViewModelProviders.of(this).get(LessonViewModel.class);
        final LessonAdapter adapter = new LessonAdapter();
        viewModel.lessonsList.observe(this, adapter::setList);

        RecyclerView recyclerView = (RecyclerView) findViewById(R.id.lesson_list);
        recyclerView.setHasFixedSize(true);
        recyclerView.setLayoutManager(new GridLayoutManager(this, getResources().getInteger(R.integer.span_count)));
        recyclerView.setAdapter(adapter);
    }

}
