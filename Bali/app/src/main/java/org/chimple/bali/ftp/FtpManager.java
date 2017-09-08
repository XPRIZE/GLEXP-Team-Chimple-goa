package org.chimple.bali.ftp;

import android.content.Context;
import android.telephony.TelephonyManager;
import android.util.Log;

import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;
import org.chimple.bali.service.ThreadManager;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.util.UUID;

/**
 * Created by shyamalupadhyaya on 08/09/17.
 */

public class FtpManager {
    private ThreadManager threadManager;
    private FTPClient ftpClient;
    private static final String TAG = FtpManager.class.getName();
    Context context;

    public FtpManager(Context context) {
        super();
        this.context = context;
    }

    public void setThreadManager(ThreadManager threadManager) {
        this.threadManager = threadManager;
    }

    private void createFtpConnection(String host, String username, String password, int port, final FtpManagerListener listener) throws Exception {
        try {
            ftpClient = new FTPClient();
            ftpClient.connect(host, port);
            if (FTPReply.isPositiveCompletion(ftpClient.getReplyCode())) {
                boolean status = ftpClient.login(username, password);
                ftpClient.setFileType(FTP.ASCII_FILE_TYPE);
                ftpClient.enterLocalPassiveMode();
            }

        } catch (SocketException ex) {
            ex.printStackTrace();
            listener.onFtpUploadFailed("Ftp Connection Failed!!!");
            throw ex;

        } catch (UnknownHostException ex) {
            ex.printStackTrace();
            listener.onFtpUploadFailed("Ftp Connection Failed!!!");
            throw ex;

        } catch (IOException ex) {
            ex.printStackTrace();
            listener.onFtpUploadFailed("Ftp Connection Failed!!!");
            throw ex;

        } catch (Exception ex) {
            ex.printStackTrace();
            listener.onFtpUploadFailed("Ftp Connection Failed!!!");
            throw ex;
        }
    }

    public void uploadToFtp(final String ftpAddress, final FtpManagerListener listener) {

        String server = "192.168.1.6";
        int port = 21;
        String user = "shyamalupadhyaya";
        String pass = "doggy";
        try {
            //Testing
            String filename = "filename.txt";
            String string = "Hello world!";
            FileOutputStream outputStream;

            outputStream = this.context.openFileOutput(filename, Context.MODE_PRIVATE);
            outputStream.write(string.getBytes());
            outputStream.close();

            createFtpConnection(server, user, pass, port, listener);
            String destDirectory = UUID.randomUUID().toString();
            boolean fileUploadStatus = ftpUpload(filename, destDirectory + ".csv", destDirectory, listener);

            if (fileUploadStatus) {
                listener.onFtpUploadSuccess();
            }
        } catch (Exception ex) {
            listener.onFtpUploadFailed("Ftp Error" + ex.getMessage());
        } finally {
            ftpDisconnect();
        }
    }

    private boolean ftpDisconnect() {
        try {
            ftpClient.logout();
            ftpClient.disconnect();
            return true;
        } catch (Exception e) {
            Log.d(TAG, "Error occurred while disconnecting from ftp server.");
        }
        return false;
    }


    private boolean ftpUpload(String srcFilePath, String desFileName, String desDirectory, final FtpManagerListener listener) {
        boolean status = false;
        try {
            FileInputStream srcFileStream = this.context.openFileInput(srcFilePath);
//            InputStreamReader inputStreamReader = new InputStreamReader(srcFileStream);
//            BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
//            StringBuilder sb = new StringBuilder();
//            String line;
//            while ((line = bufferedReader.readLine()) != null) {
//                sb.append(line);
//            }
//
//            System.out.println("got data " + sb);

            boolean isDirectoryExists = false;

            FTPFile[] files = ftpClient.listFiles();
            for (FTPFile file : files) {
                String details = file.getName();
                if (file.isDirectory() && desDirectory.equals(details)) {
                    isDirectoryExists = true;
                    break;
                }
            }

            if(!isDirectoryExists)
            {
                ftpClient.makeDirectory(desDirectory);
            }

            if (ftpClient.changeWorkingDirectory(desDirectory)) {
                status = ftpClient.storeFile(desFileName, srcFileStream);
            }
            srcFileStream.close();
            return status;
        } catch (Exception e) {
            e.printStackTrace();
            Log.d(TAG, "upload failed: " + e);
            listener.onFtpUploadFailed("Ftp Upload Failed" + e.getMessage());
        }
        return status;
    }

}
