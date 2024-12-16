import { db } from "@/lib/db";
import { Attachment, Chapter } from "@prisma/client";

interface getChapterProps {
    userId: string;
    courseId: string;
    chapterId: string;
}

export const getChapter = async ({ 
    userId, 
    courseId, 
    chapterId 
}: getChapterProps) => {
    try {

        // Fetch the user's purchase for the course
        const purchase = await db.purchase.findUnique({
            where: {
                userId_courseId: { 
                    userId,
                    courseId,
                },
            }
        });

        // Fetch course details
        const course = await db.course.findUnique({
            where: {
                isPublished: true,
                id: courseId,
            },
            select: {
                price: true,
            }
        });

        // Fetch chapter details
        const chapter = await db.chapter.findUnique({
            where: {
                id: chapterId,
                isPublished: true,
            },
        });

        if (!chapter || !course) {
            throw new Error("Chapter or course not found");
        }

        // Check if purchase status is 'ACCEPTED'
        const isPurchaseAccepted = purchase?.status === 'ACCEPTED';

        let muxData = null;
        let attachments: Attachment[] = [];
        let nextChapter: Chapter | null = null;

        // Only allow access to chapter if purchase is accepted or if chapter is free
        if (chapter.isFree || isPurchaseAccepted) {
            // Fetch mux data and next chapter if purchase is valid
            muxData = await db.muxData.findUnique({
                where: {
                    chapterId: chapterId,
                },
            });

            nextChapter = await db.chapter.findFirst({
                where: {
                    courseId: courseId,
                    isPublished: true,
                    position: {
                        gt: chapter?.position,
                    },
                },
                orderBy: {
                    position: "asc",
                },
            });

            // Fetch attachments only if purchase is accepted
            if (isPurchaseAccepted) {
                attachments = await db.attachment.findMany({
                    where: {
                        courseId: courseId,
                        chapterId: chapterId
                    },
                });
            }
        }

        // Fetch user progress
        const userProgress = await db.userProgress.findUnique({
            where: {
                userId_chapterId: {
                    userId,
                    chapterId,
                },
            },
        });

        return {
            chapter,
            course,
            muxData,
            attachments,
            nextChapter,
            userProgress,
            purchase,
        };

    } catch (error) {
        console.log(error);
        return {
            chapter: null,
            course: null,
            muxData: null,
            attachments: null,
            nextChapter: null,
            userProgress: null,
            purchase: null,
        }
    }
}
