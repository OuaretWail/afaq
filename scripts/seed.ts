const { PrismaClient } = require('@prisma/client');

const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "العلوم الفيزيائية" },
                { name: "الرياضيات" },
                { name: "علوم الطبيعة و الحياة" },
                { name: "اللغة العربية" },
                { name: "اللغة الإنجليزية" },
                { name: "اللغة الفرنسية" },
            ],
        });
        console.log("Seeding finished.");

    } catch (error) {
        console.log("Error seeding the database categories", error);
    } finally {
        await database.$disconnect();
    }
}

main();