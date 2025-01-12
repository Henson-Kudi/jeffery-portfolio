import Image from 'next/image'

const Portfolio = () => {
  const images = [
    { src: '/images/wedding.jpg', alt: 'Wedding photo' },
    { src: '/images/fashion.jpg', alt: 'Fashion photo' },
    { src: '/images/family.jpg', alt: 'Family photo' },
    { src: '/images/events.jpg', alt: 'Event photo' },
    { src: '/images/realestate.jpg', alt: 'Real Estate photo' },
    { src: '/images/interrior.jpg', alt: 'Interrior photo' },
  ]

  return (
    <section id="portfolio" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-teal-500">Portfolio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <div key={index} className="relative overflow-hidden group rounded-lg">
              <Image
                src={image.src}
                alt={image.alt}
                width={400}
                height={300}
                className="w-full h-auto transition duration-300 transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <p className="text-white text-lg font-semibold">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio

