'use client'
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import the Next.js router hook
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}

export const CourseEnrollButton = ({ price, courseId }: CourseEnrollButtonProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize the router

  const handleEnroll = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`/api/courses/${courseId}/enroll`);

      if (res.status === 200) {
        toast.success("Enrollment in progress!");
        router.push(`/payment?courseId=${courseId}`); // Redirect to the payment page
      } else {
        toast.error(`Enrollment failed: ${res.data.message || "Unknown error"}`);
      }
    } catch (error: any) {
      console.error("Error enrolling:", error);
      if (error.response) {
        console.log("Response data:", error.response.data);
        toast.error(`Enrollment failed: ${error.response.data.message || "Unknown error"}`);
      } else {
        toast.error("A network error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleEnroll}
      disabled={loading}
      size="sm"
      className="w-full md:w-auto"
    >
      {loading ? "Processing..." : `سعر الإشتراك ${formatPrice(price)}`}
    </Button>
  );
};
