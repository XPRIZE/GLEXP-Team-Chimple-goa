package org.cocos2dx.cpp;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Toast;

import com.google.android.vending.expansion.downloader.Helpers;
import com.maq.xprize.chimple.hindi.R;

import java.io.File;
import java.io.IOException;
import java.util.zip.ZipFile;

import chimple.DownloadExpansionFile;
import utils.Zip;

import static chimple.DownloadExpansionFile.xAPK;

public class SplashScreenActivity extends Activity {

    Intent intent = null;
    String expansionFilePath;
    File expansionFile;
    ZipFile expansionZipFile;
    Zip _zip;
    String unzipFilePath;
    File packageNameDir;
    SharedPreferences sharedPref;
    int defaultFileVersion = 0;
    int mainFileVersion;
    int patchFileVersion;
    boolean ExtractionRequired = false;

    public static String getUnzippedExpansionFilePath() {
        return "/storage/emulated/0/Android/data/com.maq.xprize.chimple.hindi/files/";
    }

    @Override
    public void onRequestPermissionsResult(int requestCode,
                                           String[] permissions, int[] grantResults) {
        switch (requestCode) {
            case 1: {
                // If request is cancelled, the result arrays are empty.
                if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    new DownloadFile().execute(null, null, null);
                } else {
                    Toast.makeText(this, "Permission required!", Toast.LENGTH_LONG).show();
                    finish();
                }
            }
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        if (Build.VERSION.SDK_INT < 19) { // lower api
            View v = this.getWindow().getDecorView();
            v.setSystemUiVisibility(View.GONE);
        } else {
            //for new api versions.
            View decorView = this.getWindow().getDecorView();
            int uiOptions = View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY;
            decorView.setSystemUiVisibility(uiOptions);
        }
        setContentView(R.layout.activity_splash_screen);

        if (ContextCompat.checkSelfPermission(this, Manifest.permission.WRITE_EXTERNAL_STORAGE)
                != PackageManager.PERMISSION_GRANTED) {
            // Permission is not granted
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE}, 1);
        } else {
            sharedPref = getSharedPreferences("ExpansionFile", MODE_PRIVATE);
            // Retrieve the stored values of main and patch file version
            mainFileVersion = sharedPref.getInt(getString(R.string.mainFileVersion), defaultFileVersion);
            patchFileVersion = sharedPref.getInt(getString(R.string.patchFileVersion), defaultFileVersion);
            for (DownloadExpansionFile.XAPKFile xf : xAPK) {
                // If main or patch file is updated set isExtractionRequired to true
                if (xf.mIsMain && xf.mFileVersion != mainFileVersion || !xf.mIsMain && xf.mFileVersion != patchFileVersion) {
                    ExtractionRequired = true;
                    break;
                }
                // If main or patch file is updated, the extraction process needs to be
                // performed again
                if (ExtractionRequired) {
                    System.out.println("Splash onCreate: isExtractionRequired = " + true);
                    new DownloadFile().execute(null, null, null);
                }
            }
        }
    }

    /* function to call the main application after extraction */
    public void toCallApplication() {
        intent = new Intent(this, AppActivity.class);
        startActivity(intent);
        finish();
    }

    public void unzipFile() {
        SharedPreferences.Editor editor = sharedPref.edit();
        try {
            for (DownloadExpansionFile.XAPKFile xf : xAPK) {
                expansionFilePath = getExpansionFilePath(xf.mIsMain, xf.mFileVersion);
                expansionFile = new File(expansionFilePath);
                expansionZipFile = new ZipFile(expansionFile);
                _zip = new Zip(expansionZipFile, this);
                unzipFilePath = getUnzippedExpansionFilePath();
                packageNameDir = new File(unzipFilePath);
                if (xf.mIsMain) {
                    if (packageNameDir.exists()) {
                        DownloadExpansionFile.deleteDir(packageNameDir);
                    }
                    packageNameDir.mkdir();
                }
                _zip.unzip(unzipFilePath);
                _zip.close();
                if (xf.mIsMain) {
                    editor.putInt(getString(R.string.mainFileVersion), xf.mFileVersion);
                    editor.commit();
                } else {
                    editor.putInt(getString(R.string.patchFileVersion), xf.mFileVersion);
                    editor.commit();
                }
            }
            toCallApplication();
        } catch (IOException e) {
            System.out.println("Could not extract assets");
            System.out.println("Stack trace:" + e);
        }
    }

    public String getExpansionFilePath(boolean isMain, int fileVersion) {
        return Environment.getExternalStorageDirectory().toString() + "/Android/obb/" + Helpers.getPackageName(this) + File.separator +
                Helpers.getExpansionAPKFileName(this, isMain, fileVersion);
    }

    private class DownloadFile extends AsyncTask<String, Integer, String> {
        @Override
        protected String doInBackground(String... sUrl) {
            unzipFile();
            return null;
        }
    }
}