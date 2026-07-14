import prisma from "../prisma.service";


async function main() {
  console.log("Starting database seed...");
  // Seed data will be added later.
  console.log("Database seed completed.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    
  });