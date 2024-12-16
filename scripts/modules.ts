
async function main2() {
    try {
        await database.field.createMany({
            data: [
                { name: "جميع الشعب" },
                { name: " شعبة تقني رياضي" },
                { name: " شعبة علوم تجريبية" },
                { name: "شعبة رياضيات" },
                { name: "رياضيات/علوم تجريبية" },
                { name: "رياضيات/تقني رياضى" },
            ],
        });
        console.log("Seeding finished.");

    } catch (error) {
        console.log("Error seeding the database categories", error);
    } finally {
        await database.$disconnect();
    }
}

main2();