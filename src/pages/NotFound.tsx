import { useLang } from '../context/LangContext';
import { useTitle } from '../lib/hooks';
import { Container, LinkButton } from '../components/ui';
import { ApertureMark } from '../components/Aperture';

export default function NotFound() {
  const { t } = useLang();
  useTitle(`${t.notFound.title} — ${t.brand.name}`);

  return (
    <Container className="py-24 sm:py-32">
      <div className="mx-auto max-w-lg text-center">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-trame bg-caisse text-amber">
          <ApertureMark className="h-9 w-9" spin />
        </span>
        <p className="hud mt-8 text-sable-faint">404</p>
        <h1 className="font-display mt-3 text-display font-bold text-white">{t.notFound.title}</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-sable-dim">{t.notFound.text}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <LinkButton to="/" size="lg">
            {t.notFound.home}
          </LinkButton>
          <LinkButton to="/catalogue" variant="outline" size="lg">
            {t.nav.catalogue}
          </LinkButton>
        </div>
      </div>
    </Container>
  );
}
