import SPConfetti

@objc(RNConfetti)
class RNConfetti: NSObject {
  @objc(start:)
  func start(options:NSDictionary) -> Void {
    let particles: [SPConfettiParticle] = [.arc, .star, .heart, .triangle]
    var animation: SPConfettiAnimation
    let duration = options["duration"] as! TimeInterval
    
    switch options["animation"] as? String {
    case "centerWidthToDown":
      animation = .centerWidthToDown
    case "centerWidthToUp":
      animation = .centerWidthToUp
    case "fullWidthToDown":
      animation = .fullWidthToDown
    default:
      animation = .fullWidthToUp
    }
    DispatchQueue.main.async {
      SPConfetti.startAnimating(animation, particles: particles, duration: duration)
    }
  }
  
  @objc(stop)
    func stop() -> Void {
      DispatchQueue.main.async {
        SPConfetti.stopAnimating()
      }
  }
}
