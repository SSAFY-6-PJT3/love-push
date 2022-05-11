package com.cupid.joalarm

import android.content.Context
import android.util.AttributeSet
import android.view.View
import android.webkit.WebView

class BackgroundWebView : WebView{

    constructor(context: Context?) : super(context)
    constructor(context: Context?, attrs: AttributeSet?) : super(context, attrs)
    constructor(context: Context?, attrs: AttributeSet?, defStyleAttr: Int) : super(
        context,
        attrs,
        defStyleAttr
    )

    override fun onWindowVisibilityChanged(visibility: Int) {
        // 기존의 WebView : 화면의 visibility 상태 감지
        // ex) 동영상 재생 -> 화면이 꺼지면 영상과 소리도 재생 중단

        // 백그라운드 태스크로 이동하거나 화면이 꺼져도 실행할 수 있도록 함.
        if(visibility != View.GONE) super.onWindowVisibilityChanged(View.VISIBLE)
    }
}