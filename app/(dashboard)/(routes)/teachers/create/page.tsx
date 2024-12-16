"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(1, { message: "Teacher name is required" }),
});

const CreatePage = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/teacher", values);

      // Debugging API Response
      console.log("API Response:", response.data);

      if (response.data?.id) {
        toast.success(`Teacher "${values.name}" created successfully`);
        router.push(`/teachers/${response.data.id}`);
      } else {
        throw new Error("Failed to retrieve teacher ID");
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast.error("An error occurred while creating the teacher");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl">Create a New Teacher</h1>
      <p className="text-sm text-slate-600">Enter the teacher's name below.</p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-8">
        <Input
          {...form.register("name")}
          placeholder="e.g. 'John Doe'"
          disabled={form.formState.isSubmitting}
        />
        <div className="flex gap-x-2">
          <Link href="/">
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePage;
