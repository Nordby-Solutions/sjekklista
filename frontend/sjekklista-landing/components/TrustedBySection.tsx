export default function TrustedBySection() {
  return (
    <section className="px-6 py-20 max-w-6xl mx-auto text-center">
      <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-6">
        Stolte brukere av Sjekklista
      </h2>
      <p className="text-slate-600 mb-10">
        Brukt av prosjektledere, vektere, håndverkere og HMS-ansvarlige over
        hele landet.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center justify-center">
        {/* Replace these with actual logos or names */}
        <div className="text-slate-500 text-sm">Byggmester AS</div>
        <div className="text-slate-500 text-sm">TryggVakt</div>
        <div className="text-slate-500 text-sm">HMS Norge</div>
        <div className="text-slate-500 text-sm">ProsjektPartner</div>
        <div className="text-slate-500 text-sm">ElektroVest</div>
      </div>
    </section>
  );
}
