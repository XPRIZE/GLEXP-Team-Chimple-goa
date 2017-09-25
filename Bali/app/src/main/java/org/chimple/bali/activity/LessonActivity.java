package org.chimple.bali.activity;

import android.animation.ObjectAnimator;
import android.app.AlertDialog;
import android.arch.lifecycle.LifecycleActivity;
import android.arch.lifecycle.ViewModelProviders;
import android.content.ContentValues;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Point;
import android.graphics.drawable.Animatable;
import android.graphics.drawable.Drawable;
import android.media.AudioManager;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.view.Display;
import android.view.LayoutInflater;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.AdapterViewAnimator;
import android.widget.ImageView;
import android.widget.ProgressBar;

import org.chimple.bali.R;
import org.chimple.bali.db.entity.UserLog;
import org.chimple.bali.launcher.LauncherScreen;
import org.chimple.bali.repo.LessonRepo;
import org.chimple.bali.repo.UserLogRepo;
import org.chimple.bali.service.TollBroadcastReceiver;
import org.chimple.bali.ui.FlashCardAdapter;
import org.chimple.bali.viewmodel.CardStatusViewModel;
import org.chimple.bali.viewmodel.FlashCardViewModel;

import static org.chimple.bali.provider.LessonContentProvider.COINS;
import static org.chimple.bali.provider.LessonContentProvider.GAME_EVENT;
import static org.chimple.bali.provider.LessonContentProvider.GAME_LEVEL;
import static org.chimple.bali.provider.LessonContentProvider.GAME_NAME;
import static org.chimple.bali.provider.LessonContentProvider.URI_COIN;
import static org.chimple.bali.viewmodel.CardStatusViewModel.INCORRECT_CHOICE;
import static org.chimple.bali.viewmodel.CardStatusViewModel.READY_TO_GO;
import static org.chimple.bali.viewmodel.CardStatusViewModel.CORRECT_CHOICE;

public class LessonActivity extends LifecycleActivity {
    public static final String EXTRA_MESSAGE = "org.chimple.bali.MESSAGE";
    private AdapterViewAnimator mFlashCardView;
    private ProgressBar mProgressBar;
    private int mCurrentCardIndex;
    private Long mLessonId;
    private int mScore;
    private int mQuestions;
    private FloatingActionButton mFab;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setVolumeControlStream(AudioManager.STREAM_MUSIC);
        setContentView(R.layout.activity_lesson);
        mFlashCardView = (AdapterViewAnimator) findViewById(R.id.flash_card_view);
        mProgressBar = (ProgressBar) findViewById(R.id.progressBar);

        Display display = getWindowManager().getDefaultDisplay();
        Point point = new Point();
        display.getSize(point);
        mFlashCardView.setInAnimation(ObjectAnimator.ofFloat(mFlashCardView, "translationX", point.x, 0));
        mFlashCardView.setOutAnimation(ObjectAnimator.ofFloat(mFlashCardView, "translationX", 0, -point.x));
        Intent intent = getIntent();
        mLessonId = intent.getLongExtra(EXTRA_MESSAGE, 0);
        FlashCardViewModel.Factory factory =
                new FlashCardViewModel.Factory(
                        getApplication(), mLessonId
                );
        final FlashCardViewModel model = ViewModelProviders.of(this, factory)
                .get(FlashCardViewModel.class);
        mFlashCardView.setVisibility(View.INVISIBLE);
        model.getFlashCards().observe(this, flashCards -> {
            if(flashCards != null && mFlashCardView.getVisibility() != View.VISIBLE) {
                mFlashCardView.setVisibility(View.VISIBLE);
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
                            mFab.setClickable(false);
                            int percent = 0;
                            if(mQuestions > 0) {
                                percent = (int) Math.round(mScore * 100.0 / mQuestions);
                            }
                            LessonRepo.rewardCoins(LessonActivity.this, mLessonId, percent).observe(LessonActivity.this, coins -> {
                                if(coins != null) {
                                    LayoutInflater inflater = LessonActivity.this.getLayoutInflater();
                                    AlertDialog alertDialog = new AlertDialog.Builder(LessonActivity.this)
                                            .setView(inflater.inflate(R.layout.dialog_coin_add, null))
                                            .setPositiveButton(android.R.string.yes, new DialogInterface.OnClickListener() {
                                                public void onClick(DialogInterface arg0, int arg1) {
                                                    Intent intent = new Intent(LessonActivity.this, LauncherScreen.class);
                                                    startActivity(intent);
                                                }
                                            })
                                            .setOnDismissListener(new DialogInterface.OnDismissListener() {
                                                @Override
                                                public void onDismiss(DialogInterface dialogInterface) {
                                                    Intent intent = new Intent(LessonActivity.this, LauncherScreen.class);
                                                    startActivity(intent);
                                                }
                                            })
                                            .create();
                                    alertDialog.setOnShowListener(new DialogInterface.OnShowListener() {
                                        @Override
                                        public void onShow(DialogInterface dialogInterface) {
                                            ImageView imageView = (ImageView) alertDialog.findViewById(R.id.piggy);
                                            final Drawable drawable = imageView.getDrawable();
                                            if (drawable instanceof Animatable) {
                                                ((Animatable) drawable).start();
                                            }
                                        }
                                    });
                                    alertDialog.show();
                                }
                            });
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
            } else if(INCORRECT_CHOICE == viewed) {
                mFab.show();
                mQuestions++;
            } else if(CORRECT_CHOICE == viewed) {
                mFab.show();
                mQuestions++;
                mScore++;
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

        UserLogRepo.logEntity(this, UserLog.LESSON_TYPE, mLessonId, UserLog.PAUSE_EVENT, null);
    }

    @Override
    protected void onResume() {
        super.onResume();

        Intent intent = new Intent(this, TollBroadcastReceiver.class);
        intent.putExtra("onResume", "org.chimple.bali");
        sendBroadcast(intent);

        UserLogRepo.logEntity(this, UserLog.LESSON_TYPE, mLessonId, UserLog.RESUME_EVENT, null);
    }

    @Override
    protected void onStart() {
        super.onStart();
        UserLogRepo.logEntity(this, UserLog.LESSON_TYPE, mLessonId, UserLog.START_EVENT, null);
    }

    @Override
    protected void onStop() {
        super.onStop();
        UserLogRepo.logEntity(this, UserLog.LESSON_TYPE, mLessonId, UserLog.STOP_EVENT, null);
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) {
            getWindow().getDecorView().setSystemUiVisibility(
                    View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                            | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                            | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                            | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                            | View.SYSTEM_UI_FLAG_FULLSCREEN
                            | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
        }
    }
}
