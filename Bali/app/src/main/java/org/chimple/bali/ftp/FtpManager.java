package org.chimple.bali.ftp;

import android.bluetooth.BluetoothAdapter;
import android.content.Context;
import android.os.Build;
import android.os.Environment;
import android.util.Log;

import com.opencsv.CSVWriter;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;
import org.chimple.bali.db.entity.UserLog;
import org.chimple.bali.repo.UserLogRepo;
import org.chimple.bali.service.ThreadManager;

import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import static android.os.Environment.DIRECTORY_DOWNLOADS;

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
            Log.d(TAG, "Connected to ftp host: " + host);
            if (FTPReply.isPositiveCompletion(ftpClient.getReplyCode())) {
                boolean status = ftpClient.login(username, password);
                ftpClient.setFileType(FTP.ASCII_FILE_TYPE);
                ftpClient.enterLocalPassiveMode();
                Log.d(TAG, "Logged in to ftp host as user: " + username);
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

    public List<String> findMauiLogs() {
        List<String> filePaths = new ArrayList<String>();
        String maui_extension = ".maui.csv";
        File mauiFileFolder = Environment.getExternalStoragePublicDirectory(DIRECTORY_DOWNLOADS);
        boolean isMauiLogsAvailable = mauiFileFolder.exists();

        if (isMauiLogsAvailable) {
            File[] listOfFiles = mauiFileFolder.listFiles(new MauiFilter(maui_extension));
            if (listOfFiles != null) {
                for (int i = 0; i < listOfFiles.length; i++) {
                    if (listOfFiles[i].isFile()) {
                        filePaths.add(listOfFiles[i].getAbsolutePath());
                    }
                }
            }
        }
        return filePaths;
    }

    public void uploadMauiLogs(final FtpManagerListener listener) {
        String destDirectory = Build.SERIAL;
        List<String> mauiFiles = findMauiLogs();
        if (mauiFiles != null) {
            Iterator<String> iMauiLogs = mauiFiles.iterator();
            while (iMauiLogs.hasNext()) {
                String mauiFileName = (String) iMauiLogs.next();
                ftpUpload(mauiFileName, mauiFileName, destDirectory, listener);
            }
        }
    }

    public String getBluetoothMacAddress() {
        String bluetoothMacAddress = null;
        try
        {
            BluetoothAdapter bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
            if (bluetoothAdapter != null) {
                if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
                    try {
                        Field mServiceField = bluetoothAdapter.getClass().getDeclaredField("mService");
                        mServiceField.setAccessible(true);

                        Object btManagerService = mServiceField.get(bluetoothAdapter);

                        if (btManagerService != null) {
                            bluetoothMacAddress = (String) btManagerService.getClass().getMethod("getAddress").invoke(btManagerService);
                            Log.d(TAG, "inside getBluetoothMacAddress 222: " + bluetoothMacAddress);
                        }
                    } catch (NoSuchFieldException e) {

                    } catch (NoSuchMethodException e) {

                    } catch (IllegalAccessException e) {

                    } catch (InvocationTargetException e) {

                    }
                } else {
                    bluetoothMacAddress = bluetoothAdapter.getAddress();
                    Log.d(TAG, "inside getBluetoothMacAddress 222: " + bluetoothMacAddress);
                }
                return bluetoothMacAddress;
            } else {
                return bluetoothMacAddress;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return bluetoothMacAddress;
        }
    }

    public boolean uploadBluetoothAddress(final FtpManagerListener listener) {
        boolean fileUploadStatus = false;
        try {
            ftpClient.changeToParentDirectory();
            String destDirectory = "bluetooth";
            String myBluetoothAddress = getBluetoothMacAddress();
            if(myBluetoothAddress != null) {
                String myBluetoothAddressFile = myBluetoothAddress.replace(':','-');
                String extension = ".txt";
                String filename = "bluetooth.address" + "." + myBluetoothAddressFile + extension;
                String fullyFilePath = this.context.getFilesDir() + File.separator + filename;
                FileWriter writer = new FileWriter(fullyFilePath);
                writer.write(myBluetoothAddress);
                writer.flush();
                writer.close();
                fileUploadStatus = ftpUpload(null, filename, destDirectory, listener);
            }
        } catch(Exception e) {
            e.printStackTrace();
        }

        return fileUploadStatus;
    }

    public static class MauiFilter implements FilenameFilter {

        private String ext;

        public MauiFilter(String ext) {
            this.ext = ext.toLowerCase();
        }

        @Override
        public boolean accept(File dir, String name) {
            return name.toLowerCase().endsWith(ext);
        }

    }


    public void uploadToFtp(final String ftpHost, String user, String password, int port, final FtpManagerListener listener) {
        try {
            createFtpConnection(ftpHost, user, password, port, listener);
            String destDirectory = Build.SERIAL;

            uploadMauiLogs(listener);


            String extension = ".csv";
            String filename = "userlog" + "." + new Date().getTime() + extension;
            String fullyFilePath = this.context.getFilesDir() + File.separator + filename;
            List<String[]> csvResults = new ArrayList<String[]>();

            CSVWriter writer = new CSVWriter(new FileWriter(fullyFilePath), ',', '"', "\n");
            UserLog[] userLogItems = UserLogRepo.getUserLogs(this.context);
            for (UserLog userLog  : userLogItems) {
                String userInfo = userLog.toString();
                String[] result = userInfo.split(",");
                csvResults.add(result);
            }
            writer.writeAll(csvResults, true);
            writer.flush();
            writer.close();

            boolean fileUploadStatus = ftpUpload(null, filename, destDirectory, listener);

            uploadBluetoothAddress(listener);

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

//    public void saveFilesToServer(String remoteDest, File localSrc) throws IOException {
//        FTPClient ftp = new FTPClient();
//        ftp.connect("ftp.foobar.com");
//        if (!FTPReply.isPositiveCompletion(ftp.getReplyCode())) {
//            ftp.disconnect();
//            log.fatal("FTP not disconnected");
//        }
//
//        ftp.login("foo", "qwerty");
//        log.info("Connected to server .");
//        log.info(ftp.getReplyString());
//
//        ftp.changeWorkingDirectory(remoteDest);
//        ftp.setFileType(FTPClient.BINARY_FILE_TYPE);
//
//        try {
//            upload(localSrc, ftp);
//        }
//        finally {
//            ftp.disconnect();
//            log.info("FTP disconnected");
//        }
//    }

    public void upload(File src, FTPClient ftp) throws IOException {
        if (src.isDirectory()) {
            for (File file : src.listFiles()) {
                if (file.getName().contains("bluetooth.address") || file.getName().endsWith(".report") || file.getName().endsWith(".csv")) {
                    upload(file, ftp);
                }
            }
            ftp.changeToParentDirectory();
        } else {
            InputStream srcStream = null;
            try {
                srcStream = src.toURI().toURL().openStream();
                ftp.storeFile(src.getName(), srcStream);
                Log.d(TAG, "Stored ftp log to: " + src.getName());
            } finally {
                IOUtils.closeQuietly(srcStream);
            }
        }
    }

    public void downloadBluetoothAddresses(final String ftpHost, String user, String password, int port, final FtpManagerListener listener) {
        try {
            createFtpConnection(ftpHost, user, password, port, listener);
            String remoteDir = "remote/bluetooth";
            if (ftpClient != null && ftpClient.changeWorkingDirectory(remoteDir)) {
                FTPFile[] files = ftpClient.listFiles();
                for (FTPFile file : files) {
                    String fileName = file.getName();
                    if (fileName != null && fileName.contains("bluetooth.address")) {
                        File downlodDir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS);// or DIRECTORY_PICTURES
                        File dir = new File (downlodDir.getAbsolutePath() + "/bluetoothAdr");
                        dir.mkdirs();
                        boolean canWrite = dir.canWrite();
                        if(canWrite) {
                            File destFile = new File(dir, fileName);
                            ftpDownload(fileName, destFile.getAbsolutePath());
                        }
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            Log.d(TAG, "download failed: " + e);
        } finally {
            ftpDisconnect();
        }
    }

    private void ftpDownload(String remoteFilePath, String localFilePath) {
        try (FileOutputStream fos = new FileOutputStream(localFilePath)) {
            ftpClient.retrieveFile(remoteFilePath, fos);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private boolean ftpUpload(String srcFilePath, String desFileName, String desDirectory, final FtpManagerListener listener) {
        boolean status = false;
        try {

            //FileInputStream srcFileStream = this.context.openFileInput(srcFilePath);
            boolean isDirectoryExists = false;
            boolean isRemoteDirectoryExists = false;
            String remoteDir = "remote";
            FTPFile[] files = ftpClient.listFiles();
            for (FTPFile file : files) {
                String details = file.getName();
                if (file.isDirectory() && desDirectory.equals(details)) {
                    isDirectoryExists = true;
                }
                if (file.isDirectory() && remoteDir.equals(details)) {
                    isRemoteDirectoryExists = true;
                }
            }
            File srcDir = null;
            if(srcFilePath != null) {
                srcDir = Environment.getExternalStoragePublicDirectory(DIRECTORY_DOWNLOADS);
            } else  {
                srcDir = new File(context.getFilesDir() + File.separator);
            }

            if(!isRemoteDirectoryExists) {
                ftpClient.makeDirectory(remoteDir);
            }

            if(ftpClient.changeWorkingDirectory(remoteDir))
            {
                if(!isDirectoryExists)
                {
                    ftpClient.makeDirectory(desDirectory);
                    Log.d(TAG, "Make directory: " + desDirectory);
                }

                if (ftpClient.changeWorkingDirectory(desDirectory)) {
                    Log.d(TAG, "Changed to directory: " + desDirectory);
                    try {
                        upload(srcDir, ftpClient);
                        status = true;
                    } catch (Exception e) {
                        status = false;
                    } finally {
                        if(status) {
                            //delete all files
                            FileUtils.cleanDirectory(srcDir);
                        }
                    }
                }
            }
            return status;
        } catch (Exception e) {
            e.printStackTrace();
            Log.d(TAG, "upload failed: " + e);
            listener.onFtpUploadFailed("Ftp Upload Failed" + e.getMessage());
        }
        return status;
    }

}
