package org.chimple.bali.activity;

import android.animation.ObjectAnimator;
import android.app.AlertDialog;
import android.arch.lifecycle.LifecycleActivity;
import android.arch.lifecycle.ViewModelProviders;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Point;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.view.Display;
import android.view.View;
import android.widget.AdapterViewAnimator;
import android.widget.ProgressBar;

import org.chimple.bali.MainActivityUnused;
import org.chimple.bali.R;
import org.chimple.bali.db.entity.UserLog;
import org.chimple.bali.repo.LessonRepo;
import org.chimple.bali.repo.UserLessonRepo;
import org.chimple.bali.repo.UserLogRepo;
import org.chimple.bali.service.TollBroadcastReceiver;
import org.chimple.bali.ui.FlashCardAdapter;
import org.chimple.bali.viewmodel.CardStatusViewModel;
import org.chimple.bali.viewmodel.FlashCardViewModel;

import static org.chimple.bali.viewmodel.CardStatusViewModel.READY_TO_GO;
import static org.chimple.bali.viewmodel.CardStatusViewModel.SELECTED;

public class LessonActivity extends LifecycleActivity {
    private AdapterViewAnimator mFlashCardView;
    private ProgressBar mProgressBar;
    private int mCurrentCardIndex;
    private Long mLessonId;
    private int mScore;
    private FloatingActionButton mFab;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_lesson);
        mFlashCardView = (AdapterViewAnimator) findViewById(R.id.flash_card_view);
        mProgressBar = (ProgressBar) findViewById(R.id.progressBar);

        Display display = getWindowManager().getDefaultDisplay();
        Point point = new Point();
        display.getSize(point);
        mFlashCardView.setInAnimation(ObjectAnimator.ofFloat(mFlashCardView, "translationX", point.x, 0));
        mFlashCardView.setOutAnimation(ObjectAnimator.ofFloat(mFlashCardView, "translationX", 0, -point.x));
        Intent intent = getIntent();
        mLessonId = intent.getLongExtra(MainActivityUnused.EXTRA_MESSAGE, 0);
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
                mProgressBar.setMax(flashCardAdapter.getCount());
                mProgressBar.setProgress(0);

                mFab = (FloatingActionButton) findViewById(R.id.floatingActionButton);
                mFab.hide();
                mFab.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        if(++mCurrentCardIndex >= flashCardAdapter.getCount()) {
                            LessonRepo.markNextLesson(LessonActivity.this);
                            finish();
                        } else {
                            mFlashCardView.advance();
                            mProgressBar.incrementProgressBy(1);
                            CardStatusViewModel cardStatusViewModel = ViewModelProviders.of(LessonActivity.this).get(CardStatusViewModel.class);
                            cardStatusViewModel.viewed(CardStatusViewModel.NONE);
                        }
                    }
                });

            }
        });
        CardStatusViewModel cardStatusViewModel = ViewModelProviders.of(this).get(CardStatusViewModel.class);
        cardStatusViewModel.getViewed().observe(this, viewed -> {
            if(READY_TO_GO == viewed) {
                mFab.show();
            } else if(SELECTED == viewed) {
                mFab.show();
            } else {
                mFab.hide();
            }
        });
    }

    @Override
    public void onBackPressed() {
        new AlertDialog.Builder(this)
                .setTitle(R.string.EXIT_SESSION)
                .setMessage(R.string.SURE_EXIT)
                .setNegativeButton(android.R.string.no, null)
                .setPositiveButton(android.R.string.yes, new DialogInterface.OnClickListener() {

                    public void onClick(DialogInterface arg0, int arg1) {
                        LessonActivity.super.onBackPressed();
                    }
                }).create().show();
    }

    @Override
    protected void onPause() {
        super.onPause();

        Intent intent = new Intent(this, TollBroadcastReceiver.class);
        intent.putExtra("onPause", "org.chimple.bali");
        sendBroadcast(intent);

        UserLogRepo.logEntity(this, UserLog.LESSON_TYPE, mLessonId, UserLog.PAUSE_EVENT);
    }

    @Override
    protected void onResume() {
        super.onResume();

        Intent intent = new Intent(this, TollBroadcastReceiver.class);
        intent.putExtra("onResume", "org.chimple.bali");
        sendBroadcast(intent);

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
        UserLessonRepo.createOrUpdateUserLesson(this, mLessonId, mScore);
        UserLogRepo.logEntity(this, UserLog.LESSON_TYPE, mLessonId, UserLog.STOP_EVENT);
    }
}
