export default function Hero() {
  return (
    <section
      className="relative lg:h-[600px] flex items-center justify-center"
      style={{
        backgroundImage: "url('/hero-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay on top of photo */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} />

      {/* Content */}
      <div className="relative text-center px-6 max-w-2xl">

        {/* Main heading */}
        <h1 className="text-5xl font-bold leading-tight mb-6"
            style={{ color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
          Your Big Heading <br />
          Goes <span style={{ color: 'var(--color-secondary)' }}>Right Here</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg mb-8"
           style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-body)' }}>
          A short description about what you do or what this site is about.
          Keep it simple and clear.
        </p>


      </div>
    </section>
  )
}