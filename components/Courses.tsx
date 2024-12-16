import { CourseCard } from "./course-card";
import { getHomeCourses } from "@/actions/get-home-courses";

const Courses = async () => {
    const courses = await getHomeCourses({
        userId: "2324324334",
    });

    if (!courses) {
        // Loading indicator with improved design
        return (
            <div className="flex justify-center items-center h-[300px]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-500 border-opacity-80"></div>
            </div>
        );
    }

    return (
        <section className="py-16 w-[90%] sm:w-[80%] mx-auto relative  ">
            <div className="text-center mb-12">
                <h1 className="text-[40px] sm:text-[60px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D6A959] via-[#C58B45] to-[#54371B]">
                    أحدث دوراتنا
                </h1>
                <p className="text-[24px] text-gray-600 font-semibold mt-4 max-w-3xl mx-auto">
                    استكشف جميع دوراتنا واختر الدورات المناسبة لك للتسجيل وابدأ التعلم معنا! نحن نضمن أنك لن تندم أبدا
                </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-4"
            style={{direction: "rtl"}}
            >
                {courses.map((item) => (
                    <CourseCard
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        imageUrl={item.imageUrl!}
                        chaptersLength={item.chapters.length}
                        price={item.price!}
                        progress={item.progress}
                        category={item.category?.name!}
                        teacher={item.teacher?.name || ""}
                        field={item.field?.name || "N/A"}
                    />
                ))}
            </div>
        </section>
    );
};

export default Courses;
