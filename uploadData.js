const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const uploadData = async () => {
  const teamData = [
    { id: 1, name: "Manchester United", managerId: 1 },
    { id: 2, name: "Liverpool", managerId: 2 },
    { id: 3, name: "Manchester City", managerId: 3 },
    { id: 4, name: "Chelsea", managerId: 4 },
    { id: 5, name: "Arsenal", managerId: 5 },
    { id: 6, name: "Tottenham Hotspur", managerId: 6 },
    { id: 7, name: "Leicester City", managerId: 7 },
    { id: 8, name: "Everton", managerId: 8 },
    { id: 9, name: "West Ham United", managerId: 9 },
    { id: 10, name: "Leeds United", managerId: 10 },
  ];

  const managerData = [
    { id: 1, name: "Ole Gunnar Solskjær" },
    { id: 2, name: "Jurgen Klopp" },
    { id: 3, name: "Pep Guardiola" },
    { id: 4, name: "Thomas Tuchel" },
    { id: 5, name: "Mikel Arteta" },
    { id: 6, name: "Nuno Espirito Santo" },
    { id: 7, name: "Brendan Rodgers" },
    { id: 8, name: "Rafael Benitez" },
    { id: 9, name: "David Moyes" },
    { id: 10, name: "Marcelo Bielsa" },
  ];

  const teams = await prisma.team.createMany({
    data: teamData,
    // skipDuplicates: true,
  });

  const managers = await prisma.manager.createMany({
    data: managerData,
    // skipDuplicates: true,
  });

  console.log(`Uploaded ${teams.count} teams.`);
  console.log(`Uploaded ${managers.count} managers.`);
};

// Call the uploadData function to upload the data
uploadData()
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    // Disconnect Prisma Client after the upload
    prisma.$disconnect();
  });
