package org.cocos2dx.cpp;

import android.app.Activity;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import com.google.android.vending.expansion.downloader.Helpers;
import com.maq.xprize.goa.hindi.R;

import java.io.File;
import java.io.IOException;
import java.util.zip.ZipFile;
import chimple.DownloadExpansionFile;
import utils.Zip;

public class SplashScreenActivity extends Activity {

    Intent intent = null;

    public static String getUnzippedExpansionFilePath() {
//        return getContext().getExternalFilesDir(null) + File.separator;
        return "/storage/emulated/0/Android/data/com.maq.xprize.goa.hindi/files/";
    }

    /*@Override
    public void onRequestPermissionsResult(int requestCode,
                                           String[] permissions, int[] grantResults) {
        switch (requestCode) {
            case 99: {
                // If request is cancelled, the result arrays are empty.
                if (grantResults.length > 0
                        && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    System.out.println("Permission granted");
                    new DownloadFile().execute(null, null, null);
                } else {
                    System.out.println("Permission not granted");
                    // permission denied, boo! Disable the
                    // functionality that depends on this permission.
                    onDestroy();
                }
            }

            // other 'case' lines to check for other
            // permissions this app might request.
        }
    }*/

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
       /* if (ContextCompat.checkSelfPermission(this, Manifest.permission.WRITE_EXTERNAL_STORAGE)
                != PackageManager.PERMISSION_GRANTED &&
                ContextCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO)
                        != PackageManager.PERMISSION_GRANTED) {*/
        // Permission is not granted
        /*}*/
        this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        if (Build.VERSION.SDK_INT > 11 && Build.VERSION.SDK_INT < 19) { // lower api
            View v = this.getWindow().getDecorView();
            v.setSystemUiVisibility(View.GONE);
        } else if (Build.VERSION.SDK_INT >= 19) {
            //for new api versions.
            View decorView = this.getWindow().getDecorView();
            int uiOptions = View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY;
            decorView.setSystemUiVisibility(uiOptions);
        }
        setContentView(R.layout.activity_splash_screen);
        new DownloadFile().execute(null, null, null);
    }

    /* function to call the main application after extraction */
    public void toCallApplication() {
        intent = new Intent(this, AppActivity.class);
        startActivity(intent);
        finish();
    }

    public void unzipFile() {
        try {
            String filePath = getExpansionFilePath();
//            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE}, 1);
            File file = new File(filePath);
            ZipFile zipFile = new ZipFile(file);
            Zip _zip = new Zip(zipFile, this);
            String unzipFilePath = getUnzippedExpansionFilePath();
            File packageNameDir = new File(unzipFilePath);
            if (packageNameDir.exists()) {
                DownloadExpansionFile.deleteDir(packageNameDir);
            }
            packageNameDir.mkdir();
            _zip.unzip(unzipFilePath);
            _zip.close();
            toCallApplication();
        } catch (IOException ie) {
            System.out.println("Unzip exception\t" + ie);
            unzipFile();
        }
        return;
    }

    public String getExpansionFilePath() {
        return Environment.getExternalStorageDirectory().toString() + "/Android/obb/" + Helpers.getPackageName(this) + File.separator +
                Helpers.getExpansionAPKFileName(this, DownloadExpansionFile.xAPK.mIsMain, DownloadExpansionFile.xAPK.mFileVersion);
    }

    private class DownloadFile extends AsyncTask<String, Integer, String> {
        @Override
        protected String doInBackground(String... sUrl) {
            unzipFile();
            return null;
        }
    }
}
