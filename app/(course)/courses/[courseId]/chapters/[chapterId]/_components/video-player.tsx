"use client";

import { useConfettiStore } from "@/hooks/use-confetti-store";
import { cn } from "@/lib/utils";
import MuxPlayer from "@mux/mux-player-react";
import axios from "axios";
import { Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface VideoPlayerProps{
    chapterId:number;
    title:string;
    courseId:number
    nextChapterId?:number
    playBackId:string;
    isLocked:boolean
    completeOnEnd:boolean
   
}
export const VideoPlayer=({
    chapterId,
    nextChapterId,
    title,
    courseId,
    playBackId,
    isLocked,
    completeOnEnd
}:VideoPlayerProps)=>{
const [isReady,setIsReady]=useState(false);
const router=useRouter();
const confetti=useConfettiStore();
const onEnd=async()=>{
try{
if(completeOnEnd){
await axios.put(`/api/courses/${courseId}/chapter/${chapterId}/progress`,{
    isCompleted:true,
})
if(!nextChapterId){
    confetti.onOpen()
}
toast.success("progress updated");
router.refresh();
if(nextChapterId){
    router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
}
}
}catch{
    toast.error("something went wrong");
}

}

    return (
        <div
        className="relative aspect-video
        ">
            {!isReady && !isLocked && (
                <div className="absolute inset-0 flex items-center bg-slate-800
                justify-center ">
<Loader2 className="h-8 w-8 animate-spin text-secondary"/>
                </div>
            )}
            {isLocked&&(
                <div className="absolute inset-0 flex items-center justify-center
                bg-slate-800 flex-col gap-y-2 text-secondary ">
<Lock/>
                </div>
            )}
            {!isLocked && (
                <MuxPlayer
                title={title}
                className={cn(
                    !isReady && "hidden"
                )}
                onCanPlay={()=>setIsReady(true)}
                onEnded={onEnd}
                autoPlay
                playbackId={playBackId}
                />
            )}
        </div>
    )
}