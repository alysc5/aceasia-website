// Photo banner used across pages (owner-approved dog & cat photos only).
export default function PageHero({ title, text, img, children }: { title: React.ReactNode; text?: string; img: string; children?: React.ReactNode }) {
  return (
    <section className="photoHero" style={{ backgroundImage: `linear-gradient(90deg, rgba(18,40,40,.72), rgba(18,40,40,.12) 70%), url(${img})` }}>
      <div className="wrap">
        <h1 className="rise">{title}</h1>
        {text && <p className="rise d1">{text}</p>}
        {children}
      </div>
    </section>
  );
}
