import UIKit
import WebKit
import CoreLocation


class ViewController: UIViewController, CLLocationManagerDelegate{
    // MARK: - Property
    // extension으로 CLLocationManagerDelegate 구현하기
    weak var webKitView: WKWebView?
    
    var locationManager:CLLocationManager! // 변수 선언할때 !를 붙히넴
    
    var lat: Double?
    var long: Double?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        locationManager = CLLocationManager()
        loadUrl()
        locationManager.delegate = self

        // 아래 함수 요청시 위치권한 팝업 출력
        self.locationManager.requestWhenInUseAuthorization()
        
//        getLocationUsagePermission()

        
        // 스와이프를 통해서 뒤로가기 앞으로가기를 할수 있게 해주는 설정값
        self.webKitView?.allowsBackForwardNavigationGestures = true
        locationManager.desiredAccuracy =
kCLLocationAccuracyBest
        locationManager.startUpdatingLocation()
        
    let space = locationManager.location?.coordinate
    lat = space?.latitude
    long = space?.longitude }


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




extension ViewController {
    func getLocationUsagePermission() {
        self.locationManager.requestWhenInUseAuthorization()
    }
    
    // 위치 정보 권한 없을 시, 설정 창으로 보내주는 코드
    func setLocationAuth() {
        let authAlertController: UIAlertController
        authAlertController = UIAlertController(title: "위치 정보 권한 요청", message: "저희 서비스를 이용하시기 위해서는 위치 정보가 필요합니다. 위치 접근 허용을 해주세요.", preferredStyle: .alert)
        // 앱 설명에 필수권한으로 적어두기.
        let getAuthAction: UIAlertAction
        getAuthAction = UIAlertAction(title: "네 알겠습니다.", style: UIAlertAction.Style.default, handler: { _ in
            if let appSettings = URL(string: UIApplication.openSettingsURLString){
                UIApplication.shared.open(appSettings, options: [:], completionHandler: nil)
            }
        })
        authAlertController.addAction(getAuthAction)
        self.present(authAlertController, animated: true, completion: nil)
    }

    func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus) {
            switch status {
            case.authorizedAlways, .authorizedWhenInUse:
                print("GPS 권한 설정 완료")
            case.restricted, .notDetermined:
//                self.locationManager.requestWhenInUseAuthorization()
                print("GPS 권한 설정 되지 않음")
            case.denied:
                self.locationManager.requestWhenInUseAuthorization()
                print("GPS 권한 거부 됨")
                setLocationAuth()
            default:
                print("GPS Default")
            }
        }
    
// 앱이 백그라운드 상태에서 위치가 변경되어도 추적
//    let locationBackground = CLLocationManager()
//    locationBackground.allowsBackgroundLocationUpdates = true
}


