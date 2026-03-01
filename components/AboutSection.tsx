export function AboutSection() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="text-3xl font-bold">About</h2>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Education timeline styled like the reference */}
        <section className="relative rounded-xl p-2">
          <h3 className="px-3 text-xl font-semibold">Education</h3>
          <div className="relative mt-6 pl-9">
            {/* vertical line */}
            <div className="absolute left-4 top-0 h-full w-[2px] rounded bg-gradient-to-b from-cyan/60 via-white/10 to-neon/60" aria-hidden />

            <div className="mb-6">
              <div className="relative">
                <div className="absolute -left-[22px] top-2 h-4 w-4 rounded-full bg-cyan shadow-[0_0_0_4px_rgba(34,211,238,0.15)]" aria-hidden />
                <div className="glass rounded-xl p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-lg font-semibold">ACS College of Engineering</div>
                    <div className="text-sm text-white/60">2022–2026</div>
                  </div>
                  <div className="mt-1 text-white/70">B.E. in Computer Science and Engineering</div>
                  <div className="mt-1 text-white/60">CGPA: 8.5/10</div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="relative">
                <div className="absolute -left-[22px] top-2 h-4 w-4 rounded-full bg-neon shadow-[0_0_0_4px_rgba(127,90,240,0.15)]" aria-hidden />
                <div className="glass rounded-xl p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-lg font-semibold">Preksha PU College</div>
                    <div className="text-sm text-white/60">2020–2022</div>
                  </div>
                  <div className="mt-1 text-white/70">PUC</div>
                  <div className="mt-1 text-white/60">Percentage: 78%</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="glass rounded-xl p-5" id="certifications" data-anchor="certifications">
          <h3 className="text-xl font-semibold">Certifications</h3>
          <ul className="mt-4 space-y-3">
            <li className="flex items-center justify-between">
              <span>SQL & Relational Database 101</span>
              <span className="text-white/60">(Year not specified)</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Python – NICT</span>
              <span className="text-white/60">2025</span>
            </li>
            <li className="flex items-center justify-between">
              <span>GenAI Powered Data Analytics Job Simulation – Tata</span>
              <span className="text-white/60">2025</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}


