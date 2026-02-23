import { Separator } from "@/components/ui/separator";

const SECTIONS = [
  {
    title: "Éditeur du site",
    content: [
      "Raison sociale : AutoLoc CI SARL",
      "Siège social : Rue des Jardins, Plateau, Abidjan, Côte d'Ivoire",
      "Téléphone : +225 27 00 00 00",
      "Email : contact@autoloc-ci.com",
      "Capital social : 10 000 000 FCFA",
      "RCCM : CI-ABJ-2018-B-12345",
      "Directeur de la publication : Kouadio Aimé, Directeur Général",
    ],
  },
  {
    title: "Hébergement",
    content: [
      "Le site autoloc-ci.com est hébergé par :",
      "Vercel Inc.",
      "440 N Barranca Ave #4133, Covina, CA 91723, USA",
      "Site web : https://vercel.com",
    ],
  },
  {
    title: "Propriété intellectuelle",
    content: [
      "L'ensemble du contenu du site autoloc-ci.com (textes, images, logos, icônes, graphismes, vidéos) est la propriété exclusive d'AutoLoc CI ou de ses partenaires et est protégé par les lois ivoiriennes et internationales relatives à la propriété intellectuelle.",
      "Toute reproduction, représentation, modification ou exploitation non autorisée de tout ou partie du contenu est interdite et constitue une contrefaçon sanctionnée par le Code Pénal ivoirien.",
    ],
  },
  {
    title: "Données personnelles",
    content: [
      "AutoLoc CI collecte et traite des données personnelles dans le cadre de ses activités de location de véhicules, conformément à la loi ivoirienne n°2013-450 relative à la protection des données à caractère personnel.",
      "Les données collectées (nom, prénom, téléphone, email, numéro de permis) sont nécessaires à la gestion des réservations et ne sont pas transmises à des tiers sans le consentement du Client.",
      "Pour plus d'informations, consultez notre Politique de confidentialité.",
    ],
  },
  {
    title: "Cookies",
    content: [
      "Le site utilise des cookies techniques nécessaires à son bon fonctionnement. Des cookies d'analyse peuvent également être utilisés pour améliorer l'expérience utilisateur.",
      "L'utilisateur peut configurer son navigateur pour refuser les cookies. Cependant, certaines fonctionnalités du site pourraient ne plus être disponibles.",
    ],
  },
  {
    title: "Limitation de responsabilité",
    content: [
      "AutoLoc CI s'efforce d'assurer l'exactitude des informations diffusées sur le site. Toutefois, la société ne peut garantir l'exactitude, la complétude ou l'actualité des informations mises à disposition.",
      "AutoLoc CI ne saurait être tenue responsable des dommages directs ou indirects résultant de l'utilisation du site ou de l'impossibilité d'y accéder.",
    ],
  },
  {
    title: "Liens hypertextes",
    content: [
      "Le site peut contenir des liens vers d'autres sites internet. AutoLoc CI n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.",
    ],
  },
  {
    title: "Droit applicable",
    content: [
      "Les présentes mentions légales sont régies par le droit ivoirien. Tout litige relatif à l'utilisation du site sera soumis à la compétence exclusive des tribunaux d'Abidjan.",
    ],
  },
];

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="h-1 w-full bg-primary" aria-hidden="true" />

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Mentions Légales
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Dernière mise à jour : 1er janvier 2026
          </p>
        </div>

        <div className="space-y-8">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                {section.title}
              </h2>
              <div className="space-y-2">
                {section.content.map((line, i) => (
                  <p
                    key={i}
                    className="text-sm text-muted-foreground leading-relaxed"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <Separator className="my-10" />

        <p className="text-xs text-muted-foreground text-center">
          AutoLoc CI SARL — RCCM : CI-ABJ-2018-B-12345
          <br />
          Rue des Jardins, Plateau, Abidjan, Côte d&apos;Ivoire
        </p>
      </main>
    </div>
  );
}
