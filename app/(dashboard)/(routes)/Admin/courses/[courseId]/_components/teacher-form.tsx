"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Combobox } from "@/components/ui/combobox";

interface FieldFormProps {
    initialData: Course;
    courseId: string;
    options: {
        label: string;
        value: string;
    }[];
}

const formSchema = z.object({
    teacherId: z.string().min(1),
});

export const TeacherForm = ({
    initialData,
    courseId,
    options
}: FieldFormProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            teacherId: initialData?.teacherId || ""
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values);
            toast.success("Teacher updated");
            toggleEdit();
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        }
    }

    // Check if the course already has a selected option.
    const selectedOption = options.find(option => option.value === initialData.teacherId);

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4 dark:bg-gray-800">
            <div className="font-medium flex items-center justify-between">
                Course Teacher
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit Teacher
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p className={cn(
                    "text-sm mt-2",
                    !initialData.teacherId && "text-slate-500 italic"
                )}>
                    {selectedOption?.label || "No field"}
                </p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
<FormField
  control={form.control}
  name="teacherId"
  render={({ field }) => (
    <FormItem>
      <FormControl>
        <Combobox
          options={options}
          disabled={isSubmitting}
          {...field} // Use field instead of teacher
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


                        <div className="flex items-center gap-x-2">
                            <Button
                                disabled={!isValid || isSubmitting}
                                type="submit"
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    )
}