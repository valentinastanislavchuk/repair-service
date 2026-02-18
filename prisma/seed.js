"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.user.createMany({
        data: [
            { name: "dispatcher", role: "dispatcher", password: "123" },
            { name: "master1", role: "master", password: "123" },
            { name: "master2", role: "master", password: "123" }
        ]
    });
    await prisma.request.createMany({
        data: [
            {
                clientName: "Иван Иванов",
                phone: "111111",
                address: "Москва",
                problemText: "Не работает розетка",
                status: "new"
            },
            {
                clientName: "Петр Петров",
                phone: "222222",
                address: "СПб",
                problemText: "Течет кран",
                status: "assigned",
                assignedToId: 2
            }
        ]
    });
    console.log("Seed completed");
}
main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
