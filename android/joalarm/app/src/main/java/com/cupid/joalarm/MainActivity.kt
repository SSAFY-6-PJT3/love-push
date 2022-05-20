package com.cupid.joalarm

import android.content.Context
import android.content.pm.PackageManager
import android.location.LocationManager
import android.os.Bundle
import android.webkit.*
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import com.cupid.joalarm.PermissionInterface.Companion.PERMISSION_ACCESS_ALL


class MainActivity : AppCompatActivity() {

    private val permissionManager  = PermissionInterface(this)
    private var url="https://www.someone-might-like-you.com/"

    override fun onCreate(savedInstanceState: Bundle?) {
        setTheme(R.style.Theme_Joalarm)
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        if(permissionManager.checkPermission()) openWebPage(url)
        else {
            ActivityCompat.requestPermissions(this,
                PermissionInterface.permissions, PERMISSION_ACCESS_ALL)
            if(permissionManager.checkPermission()) openWebPage(url+"location")
        }

//        openWebPage("https://www.someone-might-like-you.com/")
        checkGPS()
//        checkPermission()

    }

    override fun onResume() {
        super.onResume()
        checkGPS()
        if(permissionManager.checkPermission()) openWebPage(url)
        else openWebPage(url+"location")
//        checkPermission()
//        androidBridge.requestLocationPermission()
    }
    fun openWebPage(url: String) {
        val webView: WebView = findViewById(R.id.web_view)

        webView.webViewClient = WebViewClient() // 클릭시 새창 안뜨게

//        webView.loadUrl("https://www.google.com/")

        val mWebSettings = webView.settings //세부 세팅 등록

        webView.webChromeClient = object : WebChromeClient() {
            override fun onGeolocationPermissionsShowPrompt(
                origin: String?,
                callback: GeolocationPermissions.Callback?
            ) {
                super.onGeolocationPermissionsShowPrompt(origin, callback)
                callback?.invoke(origin, true, false)
            }
        }
        webView.settings.apply {
            javaScriptEnabled = true // 웹페이지 자바스클비트 허용 여부
            setSupportMultipleWindows(false) // 새창 띄우기 허용 여부
            javaScriptCanOpenWindowsAutomatically = true // 자바스크립트 새창 띄우기(멀티뷰) 허용 여부
            loadWithOverviewMode = true // 메타태그 허용 여부
            useWideViewPort = true // 화면 사이즈 맞추기 허용 여부
            setSupportZoom(false) // 화면 줌 허용 여부
            builtInZoomControls = false // 화면 확대 축소 허용 여부
            layoutAlgorithm = WebSettings.LayoutAlgorithm.SINGLE_COLUMN // 컨텐츠 사이즈 맞추기
            cacheMode = WebSettings.LOAD_NO_CACHE // 브라우저 캐시 허용 여부
            domStorageEnabled = true // 로컬저장소 허용 여부
        }

        webView.loadUrl(url)
        webView.addJavascriptInterface(PermissionInterface(this), "Android")
    }

    private fun checkGPS() {
        // GPS 켰는지 확인
        val locationManager: LocationManager =
            getSystemService(Context.LOCATION_SERVICE) as LocationManager
        if (!locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER)) {
            permissionManager.requestGPSDialog()
        }
    }
    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(
            requestCode,
            permissions,
            grantResults
        )
        if (requestCode == PERMISSION_ACCESS_ALL) {
            if (grantResults.isNotEmpty()) {
                for (grant in grantResults) {
                    if (grant != PackageManager.PERMISSION_GRANTED) {
//                        System.exit(0)
                    }
                }
//                openWebPage("https://www.someone-might-like-you.com/test")
//                openWebPage("https://map.kakao.com/")
//                openWebPage("https://m.youtube.com/")
            }
        }
    }

}
