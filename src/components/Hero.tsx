const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center">
      <video
        src="/images/home-vid.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10 text-center bg-black bg-opacity-5">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white shadow-text">
          Capturing Life's Moments
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 shadow-text">
          Professional photography for every occasion
        </p>
        <a
          href="#contact"
          className="bg-teal-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-teal-600 transition duration-300"
        >
          Book a Session
        </a>
      </div>
    </section>
  )
}

export default Hero

