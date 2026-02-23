import { PrismaClient, AppRole } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const roles = ['admin', 'ngo', 'user'];

  for (const name of roles) {
    await prisma.role.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log('Seeded roles:', roles);

  // Seed development API keys
  // WARNING: These are dev/test-only keys. In production, insert keys securely.
  const devApiKeys = [
    {
      key: 'dev-admin-key-000',
      role: AppRole.admin,
      description: 'Local development admin key',
    },
    {
      key: 'dev-operator-key-001',
      role: AppRole.operator,
      description: 'Local development operator key',
    },
    {
      key: 'dev-client-key-002',
      role: AppRole.client,
      description: 'Local development client key',
    },
    {
      key: 'dev-ngo-key-003',
      role: AppRole.ngo,
      description: 'Local development NGO key',
    },
  ];

  for (const data of devApiKeys) {
    await prisma.apiKey.upsert({
      where: { key: data.key },
      update: { role: data.role, description: data.description },
      create: data,
    });
  }

  console.log('Seeded API keys for development');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
