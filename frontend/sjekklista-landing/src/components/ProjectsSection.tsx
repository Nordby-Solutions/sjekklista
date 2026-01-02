export default function ProjectsSection() {
  return (
    <section id="projects" className="px-6 py-24 md:py-32 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
            Prosjekter i utvikling
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Vi arbeider på moderne løsninger designet for å møte dine spesifikke behov. 
            Her kan du se hva som kommer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
          {/* Sjekklista HR */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-slate-200">
            <div className="md:grid md:grid-cols-2">
              {/* Content */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="inline-block mb-4">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                    Nå i utvikling
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900">
                  Sjekklista HR
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  En komplett HR-løsning for små og mellomstore bedrifter. 
                  Håndter ansettelser, kontraktadministrasjon, fraværsregistrering 
                  og medarbeiderdokumentasjon på ett sted — enkelt og sikkert.
                </p>
                
                <div className="mb-8">
                  <h4 className="font-semibold text-slate-900 mb-3">Planlagte funksjoner:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="inline-block w-5 h-5 rounded-full bg-green-500 mr-3 flex-shrink-0 mt-0.5"></span>
                      <span className="text-slate-600">Medarbeiderdatabase og profilhåndtering</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-5 h-5 rounded-full bg-green-500 mr-3 flex-shrink-0 mt-0.5"></span>
                      <span className="text-slate-600">Fraværs- og tidsregistrering</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-5 h-5 rounded-full bg-green-500 mr-3 flex-shrink-0 mt-0.5"></span>
                      <span className="text-slate-600">Digitale kontraktmaler</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-5 h-5 rounded-full bg-green-500 mr-3 flex-shrink-0 mt-0.5"></span>
                      <span className="text-slate-600">Automatisk revisjonslogg og dokumentasjon</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-5 h-5 rounded-full bg-green-500 mr-3 flex-shrink-0 mt-0.5"></span>
                      <span className="text-slate-600">GDPR-klar og sikker datalagring</span>
                    </li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <a
                    href="mailto:post@norso.no?subject=Interesse%20i%20Sjekklista%20HR&body=Hei,%0D%0A%0D%0AJeg%20er%20interessert%20i%20Sjekklista%20HR%20og%20ønsker%20å%20melde%20interesse."
                    className="bg-brand-purple text-white px-6 py-3 rounded hover:bg-blue-700 transition font-medium"
                  >
                    Meld interesse
                  </a>
                </div>
              </div>

              {/* Visual */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 md:p-12 flex items-center justify-center min-h-[300px] md:min-h-auto">
                <div className="text-center">
                  <div className="inline-block bg-blue-100 rounded-full p-6 mb-4">
                    <svg
                      className="w-16 h-16 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 4H9m6 16H9m0-11h6m1 5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-slate-600 font-medium">
                    HR management, forenklet
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="mt-12 p-8 bg-white rounded-lg border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Flere prosjekter kommer snart
          </h3>
          <p className="text-slate-600 mb-4">
            Vi er i aktiv utvikling og planlegger flere løsninger for å dekke dine 
            bedriftsbehov. Vil du bli informert når nye prosjekter lanseres?
          </p>
          <a
            href="mailto:post@norso.no?subject=Meld%20interesse%20for%20nye%20Sjekklista%20prosjekter&body=Hei,%0D%0A%0D%0AJeg%20ønsker%20å%20bli%20informert%20om%20nye%20Sjekklista%20prosjekter%20når%20de%20lanseres."
            className="text-brand-purple font-medium hover:underline"
          >
            Meld interesse →
          </a>
        </div>
      </div>
    </section>
  )
}
