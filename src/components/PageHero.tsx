// Page banner. "full" = edge-to-edge photo (for wide photos); default = text left, whole photo framed on the right (keeps faces in view).
export default function PageHero({ title, text, img, children, full = false, pos = "center" }: { title: React.ReactNode; text?: string; img: string; children?: React.ReactNode; full?: boolean; pos?: string }) {
  if (full) return (
    <section className="photoHero" style={{ backgroundImage: `linear-gradient(90deg, rgba(18,40,40,.72), rgba(18,40,40,.12) 70%), url(${img})` }}>
      <div className="wrap">
        <h1 className="rise">{title}</h1>
        {text && <p className="rise d1">{text}</p>}
        {children}
      </div>
    </section>
  );
  return (
    <section className="hero splitHero">
      <div className="wrap">
        <div>
          <h1 className="rise">{title}</h1>
          {text && <p className="rise d1">{text}</p>}
          {children}
        </div>
        <img src={img} alt="" className="heroArt heroImg rise d2" style={{ objectPosition: pos }} />
      </div>
    </section>
  );
}
