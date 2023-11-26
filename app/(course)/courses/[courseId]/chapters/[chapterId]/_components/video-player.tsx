"use client";

import { cn } from "@/lib/utils";
import MuxPlayer from "@mux/mux-player-react";
import { Loader2, Lock } from "lucide-react";
import { useState } from "react";

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
                onEnded={()=>{ }}
                autoPlay
                playbackId={playBackId}
                />
            )}
        </div>
    )
}