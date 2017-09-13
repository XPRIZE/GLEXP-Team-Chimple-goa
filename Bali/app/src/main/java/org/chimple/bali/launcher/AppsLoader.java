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

package org.chimple.bali.launcher;

import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.support.v4.content.AsyncTaskLoader;

import org.chimple.bali.db.entity.User;
import org.chimple.bali.repo.UserRepo;

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
//    PackageIntentReceiver mPackageObserver;

    public AppsLoader(Context context) {
        super(context);

        mPm = context.getPackageManager();
    }

    @Override
    public ArrayList<AppModel> loadInBackground() {
        // retrieve the list of installed applications
        List<ApplicationInfo> apps = mPm.getInstalledApplications(0);
        User user = UserRepo.getCurrentUser(getContext());
        boolean enableApps = (user.coins > 0);
        if (apps == null) {
            apps = new ArrayList<ApplicationInfo>();
        }

        final Context context = getContext();

        // create corresponding apps and load their labels
        ArrayList<AppModel> items = new ArrayList<AppModel>(apps.size());
        AppModel bali = null;
        AppModel goa = null;
        for (int i = 0; i < apps.size(); i++) {
            String pkg = apps.get(i).packageName;
            // only apps which are launchable
            if (context.getPackageManager().getLaunchIntentForPackage(pkg) != null) {
                if(pkg.equals("org.chimple.bali")) {
                    AppModel app = new AppModel(context, apps.get(i), true);
                    app.loadLabel(context);
                    bali = app;
                } else if(pkg.equals("org.chimple.goa")) {
                    AppModel app = new AppModel(context, apps.get(i), true);
                    app.loadLabel(context);
                    goa = app;
                } else {
                    AppModel app = new AppModel(context, apps.get(i), enableApps);
                    app.loadLabel(context);
                    items.add(app);
                }
            }
        }
        // sort the list
        Collections.sort(items, ALPHA_COMPARATOR);

        if(bali != null) {
            items.add(0, bali);
        }
        if(goa != null) {
            items.add(1, goa);
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

