// Page banner.
// "wide" = designed wide banner with empty space on the left: dark text on the photo; on phones the photo shows below the text.
// "full" = edge-to-edge photo with white text. Default = text left, framed photo right.
export default function PageHero({ title, text, img, children, full = false, wide = false, pos = "center" }: { title: React.ReactNode; text?: string; img: string; children?: React.ReactNode; full?: boolean; wide?: boolean; pos?: string }) {
  if (wide) return (
    <section className="photoHero light designed wideHero" style={{ backgroundImage: `url(${img})` }}>
      <div className="wrap">
        <h1 className="rise">{title}</h1>
        {text && <p className="rise d1">{text}</p>}
        {children}
        <img src={img.replace(".webp", "-m.webp")} alt="" className="mobBanner" />
      </div>
    </section>
  );
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
