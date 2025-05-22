import { Users, MessageSquare, UserPlus, ClipboardList } from "lucide-react"

export default function ServicesSection() {
  const services = [
    {
      title: "Guidance Interview",
      description: "One-on-one sessions to discuss academic performance, goals, or concerns in your pharmacy journey.",
      icon: <Users className="h-8 w-8 sm:h-10 sm:w-10 text-[#3E7D5E]" />,
    },
    {
      title: "Counseling Session",
      description: "Confidential support for emotional challenges, academic stress, and personal development.",
      icon: <MessageSquare className="h-8 w-8 sm:h-10 sm:w-10 text-[#3E7D5E]" />,
    },
    {
      title: "Refer a Student",
      description: "Help a fellow student receive support by submitting a referral for counseling assistance.",
      icon: <UserPlus className="h-8 w-8 sm:h-10 sm:w-10 text-[#3E7D5E]" />,
    },
    {
      title: "Psychological Testing",
      description:
        "Standardized assessments to identify learning preferences, career aptitude, and psychological strengths.",
      icon: <ClipboardList className="h-8 w-8 sm:h-10 sm:w-10 text-[#3E7D5E]" />,
    },
  ]

  return (
    <section id="services" className="py-12 sm:py-16 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-[#3E7D5E]">
              Our Services
            </h2>
            <p className="mx-auto max-w-[700px] text-sm sm:text-base md:text-lg text-gray-500 leading-relaxed">
              Comprehensive counseling services designed specifically for pharmacy students.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-3 sm:space-y-4 rounded-lg border border-gray-200 bg-white p-4 sm:p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="p-2 rounded-full bg-[#3E7D5E]/10">{service.icon}</div>
              <h3 className="text-lg sm:text-xl font-bold text-[#3E7D5E] text-center">{service.title}</h3>
              <p className="text-sm sm:text-base text-center text-gray-500 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
