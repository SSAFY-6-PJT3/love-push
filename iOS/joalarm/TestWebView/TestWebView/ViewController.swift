import UIKit
import WebKit
import CoreLocation


class ViewController: UIViewController {
    // MARK: - Property
    weak var webKitView: WKWebView?
    // weak : 약한 참조
    // 해당 인스턴스의 소유권을 가지지 않고, 주소값만을 가지고 있는 포인터 개념
    // 자신이 참조는 하지만 weak 메모리를 해제할 수 있는 권한은 다른 클래스에 있음.
    // MARK: - View Life Cycle
    override func loadView() {
        // rootView
        let view = UIView()
        self.view = view

        // WebKitView
        let webConfiguration = WKWebViewConfiguration()
        let webKitView: WKWebView = WKWebView(frame: .zero, configuration: webConfiguration)
        self.webKitView = webKitView
        webKitView.translatesAutoresizingMaskIntoConstraints = false
        self.view.addSubview(webKitView)

        // WebKitView 제약사항
        NSLayoutConstraint.activate([
            webKitView.widthAnchor.constraint(equalTo: self.view.widthAnchor),
            webKitView.heightAnchor.constraint(equalTo: self.view.heightAnchor),
            webKitView.centerXAnchor.constraint(equalTo: self.view.centerXAnchor),
            webKitView.centerYAnchor.constraint(equalTo: self.view.centerYAnchor)
        ])
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        loadUrl()
        // 스와이프를 통해서 뒤로가기 앞으로가기를 할수 있게 해주는 설정값 입니다.
        self.webKitView?.allowsBackForwardNavigationGestures = true
    }

    // MARK: - Func
    func loadUrl() {
        if let url = URL(string: "https://www.someone-might-like-you.com") {
//        if let url = URL(string: "http://localhost:3000/mainpage") {
            let urlRequest = URLRequest(url: url)
            webKitView?.load(urlRequest)
            // self.webKitView.load를 안하네.
        } else {
            // 에러처리문.. 예를들어서 alert를 띄워주거나..
            print("접속에 실패했습니다.")
        }
    }
}
