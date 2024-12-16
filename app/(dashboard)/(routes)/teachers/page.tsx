import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const CoursesPage = async () => {

    const userId = auth();

    if (!userId) {
        return redirect("/");
    }

    // Remove the getToken property from the userId object.
    const { getToken, ...userIdWithoutToken } = userId;

    const teachers = await db.teacher.findMany({
        where: {
            // @ts-ignore
            userId: userIdWithoutToken.userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="p-6">
            <DataTable columns={columns} data={teachers} />
        </div>
    );
};

export default CoursesPage;