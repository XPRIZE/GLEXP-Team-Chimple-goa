package org.chimple.bali;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.os.Handler;
import android.os.IBinder;
import android.os.Message;
import android.os.Messenger;
import android.os.RemoteException;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import org.chimple.bali.activity.FullscreenActivity;
import org.chimple.bali.activity.LessonActivity;
import org.chimple.bali.db.AppDatabase;
import org.chimple.bali.model.MultipleChoiceQuiz;
import org.chimple.bali.service.LessonService;

import java.util.List;

public class MainActivity extends AppCompatActivity {
    public static final String EXTRA_MESSAGE = "org.chimple.bali.MESSAGE";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        PackageManager pm = this.getPackageManager();
        List<ApplicationInfo> apps = pm.getInstalledApplications(0);
        for (ApplicationInfo a: apps) {
            Intent intent = pm.getLaunchIntentForPackage(a.packageName);
            if(intent != null) {
                Log.v(a.packageName, intent.toString());
            }
        }

        //TODO: for now force the creation here
        AppDatabase.getInstance(this);
    }

    public void startActivity(View v) {
        if(v.getId() == R.id.readButton) {
            Intent intent = new Intent(this, LessonActivity.class);
            intent.putExtra(EXTRA_MESSAGE, new Long(1));
            startActivity(intent);
        } else if(v.getId() == R.id.musicButton){
            Intent intent = getPackageManager().getLaunchIntentForPackage("com.android.music");
            if (intent != null) {
                startActivity(intent);
            }
        } else if(v.getId() == R.id.cameraButton){
            Intent intent = getPackageManager().getLaunchIntentForPackage("com.android.camera");
            if (intent != null) {
                startActivity(intent);
            }
        } else if(v.getId() == R.id.galleryButton){
            Intent intent = getPackageManager().getLaunchIntentForPackage("com.android.gallery3d");
            if (intent != null) {
                startActivity(intent);
            }
        } else {
            Intent intent = new Intent(this, FullscreenActivity.class);
            intent.putExtra(EXTRA_MESSAGE, new Long(1));
            startActivity(intent);
        }
    }

}
