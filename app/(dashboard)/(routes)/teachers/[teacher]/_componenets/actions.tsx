"use client";

import axios from "axios";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface ActionsProps {
    disabled: boolean;
    teacherId: string;
}

export const Actions = ({
    disabled,
    teacherId,
    
}: ActionsProps) => {

    const router = useRouter();
    const [ isLoading, setIsLoading ] = useState(false);

    const onDelete = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/teacher/${teacherId}`);
            toast.success("teacher deleted");
            router.back();
            router.refresh();

        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex items-center gap-x-2">
            <ConfirmModal onConfirm={onDelete}>
            	<Button size="sm" disabled={isLoading}>
                    <Trash className="h-4 w-4" />
                </Button>
            </ConfirmModal>
        </div>
    )
}