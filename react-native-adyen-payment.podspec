require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-adyen-payment"
  s.version      = package["version"]
  s.summary      = package["description"]

  s.homepage     = "https://github.com/fidoafif/react-native-adyen-payment.git"
  s.license      = "MIT"
  s.authors      = { "fidoafif" => "fidoafif@gmail.com" }
  s.platform     = :ios, "10.0"
  s.source       = { :git => "https://github.com/fidoafif/react-native-adyen-payment.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,swift}"
  s.requires_arc = true

  s.dependency "React"
  s.dependency "Adyen","3.6.0"
end

