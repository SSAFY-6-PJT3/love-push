package com.cupid.joalarm

import android.content.Context
import android.os.Handler
import android.webkit.JavascriptInterface
import android.widget.Toast


class AndroidBridge(private val mContext: Context) {
    @JavascriptInterface
    fun alertMsg(arg: String?) { // 웹뷰내의 페이지에서 호출하는 함수
//        var handler: Handler
//        handler.post {
            Toast.makeText(mContext, arg, Toast.LENGTH_SHORT).show()
//    }
    }

    @JavascriptInterface
    fun showToast(toast: String) {
        Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show()
    }
}