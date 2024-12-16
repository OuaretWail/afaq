import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { File } from "lucide-react";
import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { Separator } from "@/components/ui/separator";
import { VideoPlayer } from "./_components/video-player";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { CourseProgressButton } from "./_components/course-progress-button";
import Preview from "@/components/preview";
import { Button } from "@/components/ui/button";

interface ChapterIdPageProps {
  params: {
    courseId: string;
    chapterId: string;
  };
}

const ChapterIdPage = async ({
  params,
}: {
  params: Promise<{ courseId: string; chapterId: string }>;
}) => {
  const { userId } = await auth();
  const chapterId = (await params).chapterId;
  const courseId = (await params).courseId;

  if (!userId) {
    return redirect("/");
  }

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    chapterId: chapterId,
    courseId,
  });

  if (!chapter || !course) {
    return redirect("/");
  }

  // Lock the chapter if it is not free and the purchase is not accepted
  const isPurchaseAccepted = purchase?.status === "ACCEPTED";
  const isLocked = !chapter.isFree && !isPurchaseAccepted;
  const completeOnEnd = !!isPurchaseAccepted && !userProgress?.isCompleted;

  // Redirect if chapter is locked and user does not have access
  if (isLocked) {
    return redirect("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 ">
      {/* Dynamic Banners */}
      {userProgress?.isCompleted && (
        <Banner
          variant="success"
          label="🎉 You already completed this chapter!"
        />
      )}
      {!isPurchaseAccepted && !chapter.isFree && (
        <Banner
          variant="warning"
          label="🔒 You need to purchase and have your status accepted to access this chapter."
        />
      )}

      {/* Page Content */}
      <div className="flex flex-col max-w-6xl mx-auto py-10 pb-20 px-4 sm:px-8">
        {/* Video Section */}
        {(!isLocked || chapter.isFree) && muxData && (
          <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg mb-6 hover:shadow-xl transition-all duration-300 animate-fade-in">
            <VideoPlayer
              chapterId={chapterId}
              title={chapter.title}
              courseId={courseId}
              nextChapterId={nextChapter?.id}
              playbackId={muxData.playbackId!}
              isLocked={isLocked}
              completeOnEnd={completeOnEnd}
            />
          </div>
        )}

        {/* Chapter Information */}
        <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg mb-6 animate-slide-up">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <h2 className="text-3xl font-extrabold tracking-tight flex items-center gap-2 text-gray-900 dark:text-gray-100">
              📘 {chapter.title}
            </h2>
            {purchase ? (
              purchase.status === "PROCESSING" ? (
                <Button disabled size="sm" className="w-full md:w-auto">
                  ... جاري انتظار عملية الدفع
                </Button>
              ) : isPurchaseAccepted ? (
                <CourseProgressButton
                  chapterId={chapterId}
                  courseId={courseId}
                  nextChapterId={nextChapter?.id}
                  isCompleted={!!userProgress?.isCompleted}
                />
              ) : (
                <Banner
                  variant="warning"
                  label="❌ Your purchase was rejected. Please contact support."
                />
              )
            ) : (
              <CourseEnrollButton courseId={courseId} price={course.price!} />
            )}
          </div>
          <Separator className="my-4" />
          <Preview content={chapter.description!} />
        </div>

        {/* Attachments Section */}
        {isPurchaseAccepted && !!attachments.length && (
          <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg animate-slide-up">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
              📂 Attachments
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {attachments.map((attachment) => (
                <a
                  href={attachment.url}
                  target="_blank"
                  key={attachment.id}
                  className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg shadow hover:bg-blue-100 dark:hover:bg-blue-800 transition-transform transform hover:-translate-y-1 duration-300"
                >
                  <File className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                  <p className="line-clamp-1 text-gray-800 dark:text-gray-200">
                    {attachment.name}
                  </p>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChapterIdPage;
