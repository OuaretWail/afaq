import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";
import { TeacherNameForm } from "./_componenets/teacher-name-form";
import { TeacherImageForm } from "./_componenets/teacher-image-form";
import { TeacherDescriptionForm } from "./_componenets/teacher-description-form";
import { TeacherCategoryform } from "./_componenets/teacher-category-form";
import { Actions } from "./_componenets/actions";


const TeacherPage = async({
  params,
}: {
  params: Promise<{ teacher: string}>
}) => {
  const { userId } = await auth();


  if (!userId) {
    return redirect("/");
  }

  // Await the params to ensure they are properly resolved
  const teacherId = (await params).teacher;

  if (!teacherId) {
    return redirect("/");
  }  

  const teacher = await db.teacher.findUnique({
    where: {
      id: teacherId,
      userId,
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!teacher) {
    return redirect("/");
  }  
  const requiredFields = [
    teacher.name,
    teacher.description,
    teacher.imageUrl,
    teacher.categoryId,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields} / ${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>

      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          <Actions
            disabled={!isComplete}
            teacherId={teacherId}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your teacher name</h2>
            </div>
            <TeacherNameForm initialData={teacher} teacherId={teacher.id} />
            <TeacherImageForm initialData={teacher} teacherId={teacher.id} />
            <TeacherDescriptionForm initialData={teacher} teacherId={teacher.id} />
            <TeacherCategoryform
              initialData={teacher}
              teacherId={teacher.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />

          </div>

        </div>
      </div>
    </>
  );
};

export default TeacherPage;
