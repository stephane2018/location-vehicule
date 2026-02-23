import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Création des agences
  const agences = await Promise.all([
    prisma.agency.create({
      data: {
        name: "AutoLoc CI - Cocody",
        city: "Abidjan",
        address: "Rue des Jardins, Cocody, Abidjan",
        phone: "+225 07 07 07 07 01",
        email: "cocody@autoloc.ci",
        openingTime: "07:30",
        closingTime: "19:00",
      },
    }),
    prisma.agency.create({
      data: {
        name: "AutoLoc CI - Plateau",
        city: "Abidjan",
        address: "Boulevard de la République, Plateau, Abidjan",
        phone: "+225 07 07 07 07 02",
        email: "plateau@autoloc.ci",
        openingTime: "08:00",
        closingTime: "18:00",
      },
    }),
    prisma.agency.create({
      data: {
        name: "AutoLoc CI - Yamoussoukro",
        city: "Yamoussoukro",
        address: "Avenue Houphouët-Boigny, Yamoussoukro",
        phone: "+225 07 07 07 07 03",
        email: "yamoussoukro@autoloc.ci",
        openingTime: "08:00",
        closingTime: "18:00",
      },
    }),
    prisma.agency.create({
      data: {
        name: "AutoLoc CI - Bouaké",
        city: "Bouaké",
        address: "Quartier Commerce, Bouaké",
        phone: "+225 07 07 07 07 04",
        email: "bouake@autoloc.ci",
        openingTime: "08:00",
        closingTime: "18:00",
      },
    }),
    prisma.agency.create({
      data: {
        name: "AutoLoc CI - San Pedro",
        city: "San Pedro",
        address: "Zone Portuaire, San Pedro",
        phone: "+225 07 07 07 07 05",
        email: "sanpedro@autoloc.ci",
        openingTime: "08:00",
        closingTime: "17:30",
      },
    }),
  ]);

  console.log(`${agences.length} agences créées`);

  // Création des véhicules
  const vehicules = await Promise.all([
    // Citadines
    prisma.vehicle.create({
      data: {
        brand: "Toyota",
        model: "Yaris",
        year: 2023,
        category: "CITADINE",
        fuel: "ESSENCE",
        transmission: "MANUELLE",
        seats: 5,
        pricePerDay: 15000,
        images: [],
        description: "Citadine compacte idéale pour la ville",
        licensePlate: "CI-1234-AB",
        mileage: 12000,
        features: ["Climatisation", "Bluetooth", "USB"],
        agencyId: agences[0].id,
      },
    }),
    prisma.vehicle.create({
      data: {
        brand: "Peugeot",
        model: "208",
        year: 2023,
        category: "CITADINE",
        fuel: "ESSENCE",
        transmission: "AUTOMATIQUE",
        seats: 5,
        pricePerDay: 18000,
        images: [],
        description: "Citadine moderne et économique",
        licensePlate: "CI-2345-CD",
        mileage: 8000,
        features: ["Climatisation", "Bluetooth", "Caméra de recul"],
        agencyId: agences[1].id,
      },
    }),
    // Berlines
    prisma.vehicle.create({
      data: {
        brand: "Toyota",
        model: "Corolla",
        year: 2024,
        category: "BERLINE",
        fuel: "ESSENCE",
        transmission: "AUTOMATIQUE",
        seats: 5,
        pricePerDay: 25000,
        images: [],
        description: "Berline confortable pour les longs trajets",
        licensePlate: "CI-3456-EF",
        mileage: 5000,
        features: ["Climatisation", "Bluetooth", "GPS", "Régulateur de vitesse"],
        agencyId: agences[0].id,
      },
    }),
    prisma.vehicle.create({
      data: {
        brand: "Hyundai",
        model: "Elantra",
        year: 2023,
        category: "BERLINE",
        fuel: "ESSENCE",
        transmission: "AUTOMATIQUE",
        seats: 5,
        pricePerDay: 22000,
        images: [],
        description: "Berline élégante et fiable",
        licensePlate: "CI-4567-GH",
        mileage: 15000,
        features: ["Climatisation", "Bluetooth", "Apple CarPlay"],
        agencyId: agences[2].id,
      },
    }),
    // SUV
    prisma.vehicle.create({
      data: {
        brand: "Toyota",
        model: "RAV4",
        year: 2024,
        category: "SUV",
        fuel: "ESSENCE",
        transmission: "AUTOMATIQUE",
        seats: 5,
        pricePerDay: 40000,
        images: [],
        description: "SUV polyvalent pour route et piste",
        licensePlate: "CI-5678-IJ",
        mileage: 3000,
        features: ["Climatisation", "GPS", "4x4", "Bluetooth", "Caméra 360°"],
        agencyId: agences[0].id,
      },
    }),
    prisma.vehicle.create({
      data: {
        brand: "Hyundai",
        model: "Tucson",
        year: 2023,
        category: "SUV",
        fuel: "DIESEL",
        transmission: "AUTOMATIQUE",
        seats: 5,
        pricePerDay: 35000,
        images: [],
        description: "SUV confortable et spacieux",
        licensePlate: "CI-6789-KL",
        mileage: 20000,
        features: ["Climatisation", "GPS", "Bluetooth", "Sièges chauffants"],
        agencyId: agences[3].id,
      },
    }),
    // Utilitaire
    prisma.vehicle.create({
      data: {
        brand: "Toyota",
        model: "Hilux",
        year: 2023,
        category: "UTILITAIRE",
        fuel: "DIESEL",
        transmission: "MANUELLE",
        seats: 5,
        pricePerDay: 45000,
        images: [],
        description: "Pick-up robuste pour tous les terrains",
        licensePlate: "CI-7890-MN",
        mileage: 25000,
        features: ["Climatisation", "4x4", "Bluetooth"],
        agencyId: agences[4].id,
      },
    }),
    // Luxe Berline
    prisma.vehicle.create({
      data: {
        brand: "Mercedes-Benz",
        model: "Classe E",
        year: 2024,
        category: "LUXE_BERLINE",
        fuel: "ESSENCE",
        transmission: "AUTOMATIQUE",
        seats: 5,
        pricePerDay: 85000,
        images: [],
        description: "Berline de luxe pour vos déplacements VIP",
        licensePlate: "CI-8901-OP",
        mileage: 2000,
        isLuxury: true,
        features: ["Climatisation bi-zone", "GPS", "Cuir", "Toit ouvrant", "Sièges massants"],
        agencyId: agences[0].id,
      },
    }),
    prisma.vehicle.create({
      data: {
        brand: "BMW",
        model: "Série 5",
        year: 2024,
        category: "LUXE_BERLINE",
        fuel: "ESSENCE",
        transmission: "AUTOMATIQUE",
        seats: 5,
        pricePerDay: 90000,
        images: [],
        description: "Le plaisir de conduire version luxe",
        licensePlate: "CI-9012-QR",
        mileage: 1500,
        isLuxury: true,
        features: ["Climatisation bi-zone", "GPS", "Cuir", "Head-up display", "Harman Kardon"],
        agencyId: agences[1].id,
      },
    }),
    // Luxe SUV
    prisma.vehicle.create({
      data: {
        brand: "Range Rover",
        model: "Sport",
        year: 2024,
        category: "LUXE_SUV",
        fuel: "DIESEL",
        transmission: "AUTOMATIQUE",
        seats: 5,
        pricePerDay: 150000,
        images: [],
        description: "Le summum du luxe tout-terrain",
        licensePlate: "CI-0123-ST",
        mileage: 1000,
        isLuxury: true,
        features: ["Climatisation 4 zones", "GPS", "Cuir", "4x4", "Caméra 360°", "Suspension pneumatique"],
        agencyId: agences[0].id,
      },
    }),
    prisma.vehicle.create({
      data: {
        brand: "Mercedes-Benz",
        model: "GLE",
        year: 2024,
        category: "LUXE_SUV",
        fuel: "DIESEL",
        transmission: "AUTOMATIQUE",
        seats: 7,
        pricePerDay: 130000,
        images: [],
        description: "SUV de luxe 7 places",
        licensePlate: "CI-1234-UV",
        mileage: 3000,
        isLuxury: true,
        features: ["Climatisation 3 zones", "GPS", "Cuir", "4x4", "7 places", "Burmester"],
        agencyId: agences[1].id,
      },
    }),
    // Luxe Sportive
    prisma.vehicle.create({
      data: {
        brand: "Porsche",
        model: "911 Carrera",
        year: 2024,
        category: "LUXE_SPORTIVE",
        fuel: "ESSENCE",
        transmission: "AUTOMATIQUE",
        seats: 4,
        pricePerDay: 200000,
        images: [],
        description: "Sportive emblématique pour les passionnés",
        licensePlate: "CI-2345-WX",
        mileage: 500,
        isLuxury: true,
        features: ["Climatisation", "GPS", "Cuir", "Mode Sport+", "Échappement sport"],
        agencyId: agences[0].id,
      },
    }),
  ]);

  console.log(`${vehicules.length} véhicules créés`);

  // Création d'un admin
  const admin = await prisma.user.create({
    data: {
      email: "admin@autoloc.ci",
      phone: "+225 07 00 00 00 00",
      password: "$2b$10$placeholder_hash_to_be_changed",
      firstName: "Admin",
      lastName: "AutoLoc",
      role: "ADMIN",
      emailVerified: true,
      phoneVerified: true,
    },
  });

  console.log(`Admin créé: ${admin.email}`);

  console.log("Seeding terminé !");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
