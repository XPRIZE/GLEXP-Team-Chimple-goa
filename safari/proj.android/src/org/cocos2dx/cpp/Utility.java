package org.cocos2dx.cpp;

import java.io.ByteArrayOutputStream;

import android.graphics.Bitmap;
import android.graphics.Bitmap.CompressFormat;
import android.graphics.BitmapFactory;
import android.graphics.Matrix;

public class Utility {
	public static final String PHOTO_DESTINATION_URL = "saved_photo_url";

	public static byte[] getBytes(Bitmap bitmap) {
		ByteArrayOutputStream stream = new ByteArrayOutputStream();
		bitmap.compress(CompressFormat.JPEG, 0, stream);
		return stream.toByteArray();
	}

	public static Bitmap getImage(byte[] image) {
		return BitmapFactory.decodeByteArray(image, 0, image.length);
	}

	public static Bitmap rotateBitmap(Bitmap bitmap, boolean frontCamera) {

		Matrix rotateRight = new Matrix();
		rotateRight.preRotate(90);

		if (android.os.Build.VERSION.SDK_INT > 13 && frontCamera) {
			float[] mirrorY = { -1, 0, 0, 0, 1, 0, 0, 0, 1 };
			rotateRight = new Matrix();
			Matrix matrixMirrorY = new Matrix();
			matrixMirrorY.setValues(mirrorY);

			rotateRight.postConcat(matrixMirrorY);

			rotateRight.preRotate(270);
		}

		final Bitmap rImg = Bitmap.createBitmap(bitmap, 0, 0, bitmap.getWidth(), bitmap.getHeight(), rotateRight, true);
		return rImg;
	}

	public static Bitmap MakeSquare(Bitmap bitPic, boolean frontCamera, int finalWidth) {
		int width;
		int height;
		Matrix matrix = new Matrix();
		// Convert ByteArray to Bitmap
		width = bitPic.getWidth();
		height = bitPic.getHeight();

		// Perform matrix rotations/mirrors depending on camera that took the
		// photo
		if (frontCamera) {
			float[] mirrorY = { -1, 0, 0, 0, 1, 0, 0, 0, 1 };
			Matrix matrixMirrorY = new Matrix();
			matrixMirrorY.setValues(mirrorY);

			matrix.postConcat(matrixMirrorY);
		}

		matrix.postRotate(90);

		// Create new Bitmap out of the old one
		Bitmap bitPicFinal = Bitmap.createBitmap(bitPic, 0, 0, width, height, matrix, true);
		bitPic.recycle();
		int desWidth;
		int desHeight;
		desWidth = bitPicFinal.getWidth();
		desHeight = desWidth;

		Matrix matrix1 = new Matrix();
		matrix1.setRotate(-90);		
		
		Bitmap croppedBitmap = Bitmap.createBitmap(bitPicFinal, 0,
				bitPicFinal.getHeight() / 2 - bitPicFinal.getWidth() / 2, desWidth, desHeight, matrix1, true);
		croppedBitmap = Bitmap.createScaledBitmap(croppedBitmap, finalWidth, finalWidth, true);
		return croppedBitmap;
	}
}
