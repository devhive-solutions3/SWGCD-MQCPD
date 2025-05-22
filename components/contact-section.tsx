import { Mail, Phone, Clock, MapPin } from "lucide-react"

export default function ContactSection() {
  return (
    <section id="contact" className="py-12 sm:py-16 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-[#3E7D5E]">
              Contact Us
            </h2>
            <p className="mx-auto max-w-[700px] text-sm sm:text-base md:text-lg text-gray-500 leading-relaxed">
              Get in touch with our pharmacy guidance counseling office
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-5xl mt-8 sm:mt-12 grid gap-6 sm:gap-8 md:grid-cols-2">
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-[#3E7D5E] mt-1" />
              <div>
                <h3 className="text-sm sm:text-base font-medium">Email</h3>
                <p className="text-sm sm:text-base text-gray-500">guidance.pharmacy@dlshsi.edu.ph</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 sm:space-x-4">
              <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-[#3E7D5E] mt-1" />
              <div>
                <h3 className="text-sm sm:text-base font-medium">Phone</h3>
                <p className="text-sm sm:text-base text-gray-500">(046) 555-4321</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 sm:space-x-4">
              <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-[#3E7D5E] mt-1" />
              <div>
                <h3 className="text-sm sm:text-base font-medium">Office Hours</h3>
                <p className="text-sm sm:text-base text-gray-500">Monday - Friday: 8:00 AM - 5:00 PM</p>
                <p className="text-sm sm:text-base text-gray-500">Saturday - Sunday: Closed</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 sm:space-x-4">
              <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-[#3E7D5E] mt-1" />
              <div>
                <h3 className="text-sm sm:text-base font-medium">Location</h3>
                <p className="text-sm sm:text-base text-gray-500">College of Pharmacy Building, Room 203</p>
                <p className="text-sm sm:text-base text-gray-500">DLSMHSI Campus</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px]">
            <img 
              src="/dlsmhsi-aerial.png" 
              alt="DLSMHSI Campus" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
