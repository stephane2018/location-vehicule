import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  city: string;
  rating: number;
  text: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Kouamé Yves",
    role: "Directeur commercial",
    city: "Abidjan",
    rating: 5,
    text: "Service exceptionnel. Le véhicule était neuf, propre et le processus de réservation très fluide. Je recommande sans hésitation pour les déplacements professionnels.",
  },
  {
    name: "Adjoua Mariam",
    role: "Entrepreneure",
    city: "Yamoussoukro",
    rating: 5,
    text: "J'utilise AutoLoc CI régulièrement pour mes trajets Abidjan-Yamoussoukro. Fiabilité des véhicules et transparence des prix, c'est exactement ce qu'il faut.",
  },
  {
    name: "Bamba Cheick",
    role: "Consultant",
    city: "Abidjan",
    rating: 5,
    text: "La gamme Luxe est parfaite pour recevoir des clients internationaux. Mercedes en excellent état, disponible immédiatement. Un vrai service premium.",
  },
  {
    name: "Traoré Aminata",
    role: "Médecin",
    city: "Bouaké",
    rating: 4,
    text: "Très pratique de pouvoir payer par Orange Money. L'équipe de l'agence de Bouaké est professionnelle et réactive. Je suis cliente depuis 2 ans.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-3.5 ${
            i < rating
              ? "text-amber-400 fill-amber-400"
              : "text-muted-foreground/20"
          }`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex flex-col rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
      {/* Quote icon */}
      <Quote className="size-8 text-primary/15 mb-4" />

      {/* Text */}
      <p className="text-sm leading-relaxed text-muted-foreground flex-1">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {/* Author */}
      <div className="mt-5 flex items-center gap-3 pt-4 border-t border-border/50">
        {/* Avatar placeholder */}
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/8 text-sm font-bold text-primary">
          {testimonial.name.split(" ").map((n) => n[0]).join("")}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground truncate">
            {testimonial.name}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {testimonial.role} — {testimonial.city}
          </p>
        </div>
        <StarRating rating={testimonial.rating} />
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section
      className="bg-muted/30 py-20 sm:py-24 lg:py-28"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-14 max-w-2xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Témoignages
          </p>
          <h2
            id="testimonials-heading"
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Ils nous font confiance
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Plus de 5 000 clients satisfaits en Côte d&apos;Ivoire.
            Découvrez leurs expériences.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
            />
          ))}
        </div>

        {/* Average score */}
        <div className="mt-12 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <StarRating rating={5} />
            <span className="text-sm font-bold text-foreground">4.9/5</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Note moyenne basée sur 2 400+ avis clients
          </p>
        </div>
      </div>
    </section>
  );
}
