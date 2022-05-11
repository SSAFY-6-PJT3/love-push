package com.cupid.joalarm

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.webkit.WebView
import android.webkit.WebViewClient

class WebBridgeActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_web_bridge)

        initWebView()
    }

    private fun initWebView() {
        val bridgeWV: WebView = findViewById(R.id.webView_bridge)
        bridgeWV.webViewClient = WebViewClient() // 클릭시 새창 안뜨게
        bridgeWV.settings.apply {
            setSupportMultipleWindows(false) // 새창 띄우기 허용 여부
            javaScriptEnabled = true
        }

        bridgeWV.addJavascriptInterface(PermissionInterface(this), "Android")
//        bridgeWV.loadUrl("http://172.24.80.1:5500/WebBridgeConnect.html")
        bridgeWV.loadUrl("https://www.someone-might-like-you.com/location")
    }
}

