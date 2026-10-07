import { footer } from "@/lib/content";
import Logo from "@/components/ui/Logo";

/** Rodapé discreto: hairlines, texto pequeno — não compete com o fecho. */
export default function Footer() {
  return (
    <footer data-header="dark" className="bg-ink pb-10 text-bone">
      <div className="wrap">
        <div className="hairline" />
        <div className="grid grid-cols-2 gap-y-12 pt-14 md:grid-cols-12 md:gap-x-8">
          <div className="col-span-2 md:col-span-4">
            <Logo />
            <p className="t-caption mt-6 max-w-[28ch] text-bone/45">Da origem ao mundo.</p>
          </div>
          {footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="md:col-span-2">
              <p className="t-label text-bone/40">{col.title}</p>
              <ul className="mt-5 space-y-3 text-sm">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="link-sweep text-bone/75 transition-colors duration-500 hover:text-bone">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="t-caption mt-20 flex flex-col justify-between gap-3 text-bone/35 md:flex-row">
          <span>© {new Date().getFullYear()} ORIGO</span>
          <span>{footer.legal}</span>
        </div>
      </div>
    </footer>
  );
}
