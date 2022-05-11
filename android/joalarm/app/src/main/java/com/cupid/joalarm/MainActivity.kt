package com.cupid.joalarm

import android.Manifest
import android.content.Context
import android.content.Intent
import android.location.LocationManager
import android.os.Build
import android.os.Bundle
import android.provider.Settings
import android.webkit.*
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity


class MainActivity : AppCompatActivity() {
    private val androidBridge  = PermissionInterface(this)

    @RequiresApi(Build.VERSION_CODES.Q)
    val permissions = arrayOf(
        Manifest.permission.ACCESS_COARSE_LOCATION,
        Manifest.permission.ACCESS_FINE_LOCATION,
        Manifest.permission.ACCESS_BACKGROUND_LOCATION
    )

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        openWebPage("https://www.someone-might-like-you.com/location")
//        openWebPage("https://www.someone-might-like-you.com/")
        checkGPS()
//        checkPermission()

    }

    override fun onResume() {
        super.onResume()
        checkGPS()
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
            val gpsOptionsIntent = Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS)
            startActivity(gpsOptionsIntent)
        }
    }

}
