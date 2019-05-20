package org.cocos2dx.cpp;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.maq.xprize.goa.hindi.R;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.provider.MediaStore;
import android.net.Uri;

public class CameraActivity extends Activity {

	private int REQUEST_CAMERA = 0;
	private Handler mHandler;
	private String mCurrentPhotoPath;


	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_camera);
		mHandler = new Handler(getMainLooper());

		cameraIntent();
	}

	private void cameraIntent() {
		Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
		takePictureIntent.putExtra("android.intent.extras.CAMERA_FACING", android.hardware.Camera.CameraInfo.CAMERA_FACING_FRONT);
		File destination = null;
		try {
			destination = createImageFile();
			takePictureIntent.putExtra(MediaStore.EXTRA_OUTPUT, Uri.fromFile(destination));

			if (takePictureIntent.resolveActivity(getPackageManager()) != null) {
				startActivityForResult(takePictureIntent, REQUEST_CAMERA);
			}
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
	private File createImageFile() throws IOException {
	    // Create an image file name
	    String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
	    String imageFileName = timeStamp + "_";
	    File storageDir = getExternalFilesDir(Environment.DIRECTORY_PICTURES);	    
//	    File storageDir = Environment.getExternalStorageDirectory();
	    File image = File.createTempFile(
	        imageFileName,  /* prefix */
	        ".jpg",         /* suffix */
	        storageDir      /* directory */
	    );

	    // Save a file: path for use with ACTION_VIEW intents
	    mCurrentPhotoPath = image.getAbsolutePath();
	    System.out.println("mCurrentPhotoPath created:" + mCurrentPhotoPath);
	    return image;
	}	

	@Override
	public void onActivityResult(int requestCode, int resultCode, Intent data) {
		super.onActivityResult(requestCode, resultCode, data);
		System.out.println("resultCode:" + resultCode);
		if (resultCode == Activity.RESULT_OK) {
			if (requestCode == REQUEST_CAMERA) {
				Bitmap bitmap = decodeSampledBitmapFromFile(mCurrentPhotoPath, 512, 512);

				onCaptureImageResult(bitmap);
			}
		} else {
			onCaptureImageResultCancelled();
		}
	}

public static Bitmap decodeSampledBitmapFromFile(String path, int reqWidth, int reqHeight) { 
		// First decode with inJustDecodeBounds=true to check dimensions
		final BitmapFactory.Options options = new BitmapFactory.Options();
		options.inJustDecodeBounds = true;
		BitmapFactory.decodeFile(path, options);

		// Calculate inSampleSize, Raw height and width of image
		final int height = options.outHeight;
		final int width = options.outWidth;
		options.inPreferredConfig = Bitmap.Config.ARGB_8888;
		int inSampleSize = 1;

		if (height > reqHeight) {
			inSampleSize = Math.round((float) height / (float) reqHeight);
			System.out.println("inSampleSize222222222:" + inSampleSize);
		}
		int expectedWidth = width / inSampleSize;

		if (expectedWidth > reqWidth) {
			// if(Math.round((float)width / (float)reqWidth) > inSampleSize) //
			// If bigger SampSize..
			inSampleSize = Math.round((float) width / (float) reqWidth);
			System.out.println("inSampleSize333333333:" + inSampleSize);
		}

		options.inSampleSize = inSampleSize;
		System.out.println("inSampleSize44444444444:" + inSampleSize);
		// Decode bitmap with inSampleSize set
		options.inJustDecodeBounds = false;

		Bitmap scaledBitMap = BitmapFactory.decodeFile(path, options);

		scaledBitMap = Utility.MakeSquare(scaledBitMap, true, 256);
		FileOutputStream out = null;
		try {
		    out = new FileOutputStream(path);
		    scaledBitMap.compress(Bitmap.CompressFormat.JPEG, 100, out); // bmp is your Bitmap instance
		} catch (Exception e) {
		    e.printStackTrace();
		} finally {
		    try {
		        if (out != null) {
		            out.close();
		        }
		    } catch (IOException e) {
		        e.printStackTrace();
		    }
		}		
		
		return scaledBitMap;
	}
		
	
	private void onCaptureImageResultCancelled() {
		mHandler.post(new Runnable() {
			@Override
			public void run() {
				Intent returnIntent = new Intent();
				setResult(Activity.RESULT_CANCELED, returnIntent);
				finish();
			}
		});
	}


	private void onCaptureImageResult(Bitmap bitmap) {
		mHandler.post(new Runnable() {
			@Override
			public void run() {
				Intent returnIntent = new Intent();
				System.out.println("putting destinaton:" + mCurrentPhotoPath);
				returnIntent.putExtra(Utility.PHOTO_DESTINATION_URL, mCurrentPhotoPath);
				setResult(Activity.RESULT_OK, returnIntent);
				finish();
			}
		});
	}
}
