package com.cupid.joalarm

import android.Manifest
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.location.LocationManager
import android.os.Build
import android.os.Bundle
import android.provider.Settings
import android.webkit.*
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat


class MainActivity : AppCompatActivity() {
    private val PERMISSION_ACCESS_ALL = 100


    @RequiresApi(Build.VERSION_CODES.Q)
    val permissions = arrayOf(
        Manifest.permission.ACCESS_COARSE_LOCATION,
        Manifest.permission.ACCESS_FINE_LOCATION,
        Manifest.permission.ACCESS_BACKGROUND_LOCATION
    )

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        checkGPS()
        checkPermission()

    }


    private fun checkPermission() {
        for (permission in permissions) {
            // 권한 여부 체크
            val check = checkCallingOrSelfPermission(permission)
            if (check == PackageManager.PERMISSION_DENIED) {
                // 권한 거부 상태라면, 사용자에게 권한 허용여부를 확인하는 창을 띄움
                // 허가가 안되어 있는 권한을 요청한다.
                ActivityCompat.requestPermissions(this, permissions, PERMISSION_ACCESS_ALL)
            }
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
                openWebPage("https://www.someone-might-like-you.com/test")
//                openWebPage("https://map.kakao.com/")
//                openWebPage("https://m.youtube.com/")
            }
        }
    }


    fun openWebPage(url: String) {
        val webView: WebView = findViewById(R.id.web_view)

        webView.webViewClient = WebViewClient() // 클릭시 새창 안뜨게

//        webView.loadUrl("https://www.google.com/")

        val mWebSettings = webView.settings //세부 세팅 등록

        mWebSettings.javaScriptEnabled = true // 웹페이지 자바스클비트 허용 여부
        webView.webChromeClient = object : WebChromeClient() {
            override fun onGeolocationPermissionsShowPrompt(
                origin: String?,
                callback: GeolocationPermissions.Callback?
            ) {
                super.onGeolocationPermissionsShowPrompt(origin, callback)
                callback?.invoke(origin, true, false)
            }
        }
        mWebSettings.setSupportMultipleWindows(false) // 새창 띄우기 허용 여부
        mWebSettings.javaScriptCanOpenWindowsAutomatically = true // 자바스크립트 새창 띄우기(멀티뷰) 허용 여부
        mWebSettings.loadWithOverviewMode = true // 메타태그 허용 여부
        mWebSettings.useWideViewPort = true // 화면 사이즈 맞추기 허용 여부
        mWebSettings.setSupportZoom(false) // 화면 줌 허용 여부
        mWebSettings.builtInZoomControls = false // 화면 확대 축소 허용 여부
        mWebSettings.layoutAlgorithm = WebSettings.LayoutAlgorithm.SINGLE_COLUMN // 컨텐츠 사이즈 맞추기
        mWebSettings.cacheMode = WebSettings.LOAD_NO_CACHE // 브라우저 캐시 허용 여부
        mWebSettings.domStorageEnabled = true // 로컬저장소 허용 여부

        webView.loadUrl(url)
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
