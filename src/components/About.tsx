import Image from 'next/image'

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-teal-500">About Me</h2>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
            <Image
              src="/images/me.png"
              alt="John Doe"
              width={400}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <p className="text-lg mb-4">
              Hi, I'm John Doe, a professional photographer with over 10 years of experience. I specialize in capturing the beauty of life's moments, from weddings to landscapes and everything in between.
            </p>
            <p className="text-lg mb-4">
              My passion for photography started when I was young, and I've honed my skills over the years to deliver stunning, high-quality images that tell unique stories.
            </p>
            <p className="text-lg">
              When I'm not behind the camera, you can find me exploring new locations, experimenting with different techniques, or teaching photography to aspiring artists.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

