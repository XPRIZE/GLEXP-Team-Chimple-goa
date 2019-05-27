/*
 * MIT License. Copyright 2016 Arnab Chakraborty. http://arnab.ch
 *
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

package com.maq.xprize.bali.launcher;

import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.support.v4.content.AsyncTaskLoader;
import android.util.Log;

import com.maq.xprize.bali.db.entity.User;
import com.maq.xprize.bali.repo.UserRepo;

import java.text.Collator;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Comparator;

/**
 * @credit http://developer.android.com/reference/android/content/AsyncTaskLoader.html
 */
public class AppsLoader extends AsyncTaskLoader<ArrayList<AppModel>> {
    ArrayList<AppModel> mInstalledApps;

    final PackageManager mPm;

    public static final String[] mPackages = {
            "com.google.android.GoogleCamera",
            "com.simplemobiletools.musicplayer",
            "com.google.android.apps.photos",
            "com.google.android.calculator",
            "com.google.android.deskclock",
            "org.godotengine.alphajump",
            "org.godotengine.alphaworld",
            "com.alaskalinuxuser.criticalvelocity",
            "com.simplemobiletools.draw",
            "com.quchen.flappycow",
            "com.snatik.matches",
            "com.gunshippenguin.openflood",
            "com.goodguygames.bubblegame.full",
            "com.google.android.apps.wallpaper"
    };
//    PackageIntentReceiver mPackageObserver;

    public AppsLoader(Context context) {
        super(context);

        mPm = context.getPackageManager();
    }

    @Override
    public ArrayList<AppModel> loadInBackground() {
        // retrieve the list of installed applications
        User user = UserRepo.getCurrentUser(getContext());
        boolean enableApps = (user.coins > 0);
        final Context context = getContext();

        // create corresponding apps and load their labels
        ArrayList<AppModel> items = new ArrayList<AppModel>(mPackages.length);
        for (int i = 0; i < mPackages.length; i++) {
            try {
                ApplicationInfo applicationInfo = mPm.getApplicationInfo(mPackages[i], 0);
                AppModel app = new AppModel(context, applicationInfo, enableApps);
                app.loadLabel(context);
                items.add(app);
            } catch (PackageManager.NameNotFoundException e) {
                e.printStackTrace();
            }
        }
        return items;
    }

    @Override
    public void deliverResult(ArrayList<AppModel> apps) {
        if (isReset()) {
            // An async query came in while the loader is stopped.  We
            // don't need the result.
            if (apps != null) {
                onReleaseResources(apps);
            }
        }

        ArrayList<AppModel> oldApps = apps;
        mInstalledApps = apps;

        if (isStarted()) {
            // If the Loader is currently started, we can immediately
            // deliver its results.
            super.deliverResult(apps);
        }

        // At this point we can release the resources associated with
        // 'oldApps' if needed; now that the new result is delivered we
        // know that it is no longer in use.
        if (oldApps != null) {
            onReleaseResources(oldApps);
        }
    }

    @Override
    protected void onStartLoading() {
        if (mInstalledApps != null) {
            // If we currently have a result available, deliver it
            // immediately.
            deliverResult(mInstalledApps);
        }

        // watch for changes in app install and uninstall operation
//        if (mPackageObserver == null) {
//            mPackageObserver = new PackageIntentReceiver(this);
//        }

        if (takeContentChanged() || mInstalledApps == null ) {
            // If the data has changed since the last time it was loaded
            // or is not currently available, start a load.
            forceLoad();
        }
    }

    @Override
    protected void onStopLoading() {
        // Attempt to cancel the current load task if possible.
        cancelLoad();
    }

    @Override
    public void onCanceled(ArrayList<AppModel> apps) {
        super.onCanceled(apps);

        // At this point we can release the resources associated with 'apps'
        // if needed.
        onReleaseResources(apps);
    }

    @Override
    protected void onReset() {
        // Ensure the loader is stopped
        onStopLoading();

        // At this point we can release the resources associated with 'apps'
        // if needed.
        if (mInstalledApps != null) {
            onReleaseResources(mInstalledApps);
            mInstalledApps = null;
        }

        // Stop monitoring for changes.
//        if (mPackageObserver != null) {
//            getContext().unregisterReceiver(mPackageObserver);
//            mPackageObserver = null;
//        }
    }

    /**
     * Helper method to do the cleanup work if needed, for example if we're
     * using Cursor, then we should be closing it here
     *
     * @param apps
     */
    protected void onReleaseResources(ArrayList<AppModel> apps) {
        // do nothing
    }


    /**
     * Perform alphabetical comparison of application entry objects.
     */
    public static final Comparator<AppModel> ALPHA_COMPARATOR = new Comparator<AppModel>() {
        private final Collator sCollator = Collator.getInstance();
        @Override
        public int compare(AppModel object1, AppModel object2) {
            return sCollator.compare(object1.getLabel(), object2.getLabel());
        }
    };
}

