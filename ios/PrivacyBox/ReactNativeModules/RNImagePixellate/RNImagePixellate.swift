import Foundation

@objc(RNImagePixellate)
class RNImagePixellate: NSObject {
  lazy var context: CIContext = {
        return CIContext(options: nil)
    }()

  @objc(request:withResolver:withRejecter:)
  func request(options:NSDictionary, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    // 1.
    let path = options["path"] as! String
    let type = options["type"] as? String ?? "Face"
    
    let originalImage = UIImage(contentsOfFile: path)!
    let filter = CIFilter(name: "CIPixellate")!
    let inputImage = CIImage(image: originalImage)!
    filter.setValue(50, forKey: kCIInputScaleKey)
    filter.setValue(inputImage, forKey: kCIInputImageKey)
    let fullPixellatedImage = filter.outputImage

    // 2.

    var detector: CIDetector
    switch type {
    case "QRCode":
      detector = CIDetector(ofType: CIDetectorTypeQRCode,
                                context: context,
                                options: nil)!
    case "Text":
      detector = CIDetector(ofType: CIDetectorTypeText,
                                context: context,
                                options: nil)!
    default:
      detector = CIDetector(ofType: CIDetectorTypeFace,
                                context: context,
                                options: nil)!
    }
    
    let faceFeatures = detector.features(in: inputImage)

    // 3.

    var maskImage: CIImage!

    for faceFeature in faceFeatures {
        // 4.
        let centerX = faceFeature.bounds.origin.x + faceFeature.bounds.size.width / 2
        let centerY = faceFeature.bounds.origin.y + faceFeature.bounds.size.height / 2
        let radius = min(faceFeature.bounds.size.width, faceFeature.bounds.size.height)

        let radialGradient = CIFilter(name: "CIRadialGradient",
                                      parameters: [
                                        "inputRadius0" : radius,
                                        "inputRadius1" : radius + 1,
                                        "inputColor0" : CIColor(red: 0, green: 1, blue: 0, alpha: 1),
                                        "inputColor1" : CIColor(red: 0, green: 0, blue: 0, alpha: 0),
                                        kCIInputCenterKey : CIVector(x: centerX, y: centerY)

            ])

        // 5.

      let radialGradientOutputImage = radialGradient?.outputImage?.cropped(to: inputImage.extent)
        if maskImage == nil {
            maskImage = radialGradientOutputImage
        } else {
            maskImage = CIFilter(name: "CISourceOverCompositing",
                                 parameters: [
                                  kCIInputImageKey : radialGradientOutputImage!,
                                  kCIInputBackgroundImageKey : maskImage!
                ])?.outputImage

        }

    }

    // 6.

    let blendFilter = CIFilter(name: "CIBlendWithMask")!
    blendFilter.setValue(fullPixellatedImage, forKey: kCIInputImageKey)
    blendFilter.setValue(inputImage, forKey: kCIInputBackgroundImageKey)
    blendFilter.setValue(maskImage, forKey: kCIInputMaskImageKey)

    // 7.

    let blendOutputImage = blendFilter.outputImage
    guard let blendCGImage = context.createCGImage(blendOutputImage!, from: blendOutputImage!.extent) else {
      reject("ERROR", nil, nil)
      return
    }
    
    let image = UIImage(cgImage: blendCGImage)
    let destPath = FileManager.default.temporaryDirectory.appendingPathComponent("\(UUID().uuidString).jpg")
    do {
      try image.jpegData(compressionQuality: 1)?.write(to: destPath)
      resolve(["destPath":destPath.absoluteString])
    } catch {
      reject("ERROR", nil, nil)  }
  }
}
