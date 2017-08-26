package org.chimple.bali.activity;

import android.arch.lifecycle.LifecycleActivity;
import android.arch.lifecycle.ViewModelProviders;
import android.content.Intent;
import android.databinding.DataBindingUtil;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.view.View;
import android.widget.AdapterViewAnimator;
import android.widget.ProgressBar;

import org.chimple.bali.MainActivity;
import org.chimple.bali.R;
import org.chimple.bali.db.entity.UserLog;
import org.chimple.bali.db.pojo.FlashCard;
import org.chimple.bali.repo.UserLogRepo;
import org.chimple.bali.ui.FlashCardAdapter;
import org.chimple.bali.viewmodel.FlashCardViewModel;

public class LessonActivity extends LifecycleActivity {
    private AdapterViewAnimator mFlashCardView;
    private ProgressBar mProgressBar;
    private int mCurrentCardIndex;
    private Long mLessonId;

    @Override
    public void onBackPressed() {
        super.onBackPressed();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_lesson);
        mFlashCardView = (AdapterViewAnimator) findViewById(R.id.flash_card_view);
        mProgressBar = (ProgressBar) findViewById(R.id.progressBar);

        Intent intent = getIntent();
        mLessonId = intent.getLongExtra(MainActivity.EXTRA_MESSAGE, 0);
        FlashCardViewModel.Factory factory =
                new FlashCardViewModel.Factory(
                        getApplication(), mLessonId
                );
        final FlashCardViewModel model = ViewModelProviders.of(this, factory)
                .get(FlashCardViewModel.class);
        model.getFlashCards().observe(this, flashCards -> {
            if(flashCards != null) {
                final FlashCardAdapter flashCardAdapter = new FlashCardAdapter(this, flashCards);
                mFlashCardView.setAdapter(flashCardAdapter);
                UserLogRepo.logEntity(UserLog.LESSON_UNIT_TYPE, flashCards.get(0).lessonUnit.id, UserLog.STOP_EVENT);

                mProgressBar.setMax(flashCardAdapter.getCount());
                mProgressBar.setProgress(0);

                final FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.floatingActionButton);
                fab.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        UserLogRepo.logEntity(UserLog.LESSON_UNIT_TYPE, flashCards.get(mCurrentCardIndex).lessonUnit.id, UserLog.STOP_EVENT);
                        if(++mCurrentCardIndex >= flashCardAdapter.getCount()) {
                            finish();
                        } else {
                            mFlashCardView.advance();
                            UserLogRepo.logEntity(UserLog.LESSON_UNIT_TYPE, flashCards.get(mCurrentCardIndex).lessonUnit.id, UserLog.START_EVENT);
                            mProgressBar.incrementProgressBy(1);
                        }
                    }
                });

            }
        });
    }

    @Override
    protected void onPause() {
        super.onPause();
        UserLogRepo.logEntity(this, UserLog.LESSON_TYPE, mLessonId, UserLog.PAUSE_EVENT);
    }

    @Override
    protected void onResume() {
        super.onResume();
        UserLogRepo.logEntity(this, UserLog.LESSON_TYPE, mLessonId, UserLog.RESUME_EVENT);
    }

    @Override
    protected void onStart() {
        super.onStart();
        UserLogRepo.logEntity(this, UserLog.LESSON_TYPE, mLessonId, UserLog.START_EVENT);
    }

    @Override
    protected void onStop() {
        super.onStop();
        UserLogRepo.logEntity(this, UserLog.LESSON_TYPE, mLessonId, UserLog.STOP_EVENT);
    }
}
