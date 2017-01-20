package org.cocos2dx.javascript;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.zip.ZipFile;

import android.content.Context;
import android.content.res.AssetManager;
import android.util.Log;

public class AssetInstaller {
	private Context context;
	private static final String TAG = "AssetInstaller";
	private String zipName;
	

	public AssetInstaller(Context context, String zipName) {
		this.context = context;
		this.zipName = zipName;
	}

	private void copyAssets() {
		AssetManager assetManager = context.getAssets();
		String[] files = null;
		try {
			files = assetManager.list("res/android-lipitk");
			System.out.println("finding files in res/android-lipitk");
			for (String filename : files) {			
				System.out.println("file name in res/android-lipitk:" + filename);
			}
		} catch (IOException e) {
			Log.e(TAG, "Failed to get asset file list.", e);
		}

		for (String filename : files) {
			InputStream in = null;
			FileOutputStream out = null;
            System.out.println("processing file:" + filename);

            System.out.println("file ueeeeeee:" + context.getFilesDir()
						+ "/" + filename);

			try {
				in = assetManager.open("res/android-lipitk/" + filename);
                System.out.println("file ueeeeeee:" + context.getFilesDir()
						.getPath() + "/" + filename);
				out = new FileOutputStream(context.getFilesDir()
						.getPath() + "/" + filename);
				copyFile(in, out);
				in.close();
				in = null;
				out.flush();
				out.close();
				out = null;
			} catch (IOException e) {
				Log.e(TAG, "Failed to copy asset file: " + filename, e);
			}
		}
	}

	private void copyFile(InputStream in, OutputStream out) throws IOException {
		byte[] buffer = new byte[1024];
		int read;
		while ((read = in.read(buffer)) != -1) {
			out.write(buffer, 0, read);
		}
	}

	private void explodeAsset() throws IOException {
		String zipPath = context.getFilesDir().getPath() + "/"
				+ zipName + ".zip";
		System.out.println("zipPath:" + zipPath);				
		String extractPath = context.getFilesDir().getPath() + "/";
		System.out.println("extractPath:" + extractPath);
		File file = new File(zipPath);
		System.out.println("file full path:" + file.getAbsolutePath());
		ZipFile zipFile = new ZipFile(file);
		try {
			Zip _zip = new Zip(zipFile);
			_zip.unzip(extractPath);
			_zip.close();
			file.delete();
		} catch (IOException ie) {
			Log.e(TAG, "failed extraction", ie);
		}
	}

	

	private boolean dirCheck() {
		File dir = new File(context.getFilesDir().getPath() + "/"
				+ zipName);
		System.out.println("checking if directory exists:" + dir);
		System.out.println("result of directory exists:" + dir.exists());
		return dir.exists();
	}

	public void execute() throws IOException {
		if (!dirCheck()) {
			System.out.println("Calling Copy Assets");
			copyAssets();
			explodeAsset();
			Log.d(TAG, "installed packages.");
		} else {
			Log.d(TAG, "already installed");
		}
	}
}