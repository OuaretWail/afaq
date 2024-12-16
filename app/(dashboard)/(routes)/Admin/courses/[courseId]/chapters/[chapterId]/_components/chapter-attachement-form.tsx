"use client";

import * as z from "zod";
import axios from "axios";
import { PlusCircle, File, Loader2, X } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

interface AttachmentFormProps {
  chapterId: string;
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
  originalFilename: z.string().min(1),
});

export const ChapterAttachmentForm = ({
  chapterId,
  courseId,
}: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const router = useRouter();

  // Toggle edit mode
  const toggleEdit = () => setIsEditing((current) => !current);

  // Fetch attachments from the database
  const fetchAttachments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/courses/${courseId}/chapters/${chapterId}/attachments`
      );
      setAttachments(response.data);
    } catch {
      toast.error("Failed to load attachments");
    } finally {
      setLoading(false);
    }
  };

  // Fetch attachments on component mount
  useEffect(() => {
    fetchAttachments();
  }, []);

  // Handle adding a new attachment
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(
        `/api/courses/${courseId}/chapters/${chapterId}/attachments`,
        values
      );
      toast.success("Attachment added");
      toggleEdit();
      fetchAttachments(); // Refresh the attachments list
    } catch {
      toast.error("Something went wrong");
    }
  };

  // Handle deleting an attachment
  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(
        `/api/courses/${courseId}/chapters/${chapterId}/attachments/${id}`
      );
      toast.success("Attachment deleted");
      fetchAttachments(); // Refresh the attachments list
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4 dark:bg-gray-800 dark:text-slate-300">
      <div className="font-medium flex items-center justify-between">
        Chapter Attachments
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" /> Add a file
            </>
          )}
        </Button>
      </div>
      {loading ? (
        <p className="text-sm mt-2 text-slate-500 italic">
          Loading attachments...
        </p>
      ) : attachments.length === 0 ? (
        <p className="text-sm mt-2 text-slate-500 italic">
          No attachments yet
        </p>
      ) : (
        <div className="space-y-2">
          {attachments.map((attachment) => (
            <div
              key={attachment.id}
              className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
            >
              <File className="h-4 w-4 mr-2 flex-shrink-0" />
              <a
                href={attachment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs line-clamp-1 hover:underline"
              >
                {attachment.name}
              </a>
              {deletingId === attachment.id && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              {deletingId !== attachment.id && (
                <button
                  title="Delete attachment"
                  onClick={() => onDelete(attachment.id)}
                  className="ml-auto hover:opacity-75 transition"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url, originalFilename) => {
              if (url && originalFilename) {
                onSubmit({ url, originalFilename });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add anything your students might need to complete the course.
          </div>
        </div>
      )}
    </div>
  );
};