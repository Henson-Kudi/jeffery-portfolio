import { Camera, Users, Mountain, Calendar } from 'lucide-react'

const Services = () => {
  const services = [
    { icon: Camera, title: 'Wedding Photography', description: 'Capture your special day with stunning, timeless photos.' },
    { icon: Users, title: 'Portrait Sessions', description: 'Professional portraits for individuals, families, and businesses.' },
    { icon: Mountain, title: 'Landscape Photography', description: 'Breathtaking landscape photos for your home or office.' },
    { icon: Calendar, title: 'Event Coverage', description: 'Comprehensive photo coverage for all types of events.' },
  ]

  return (
    <section id="services" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-teal-500">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <service.icon className="w-12 h-12 text-teal-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services

