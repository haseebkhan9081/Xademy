interface Chapter {
    id: number;
    title: string;
    description: string | null; // Use null if the column can be nullable
    videoUrl: string | null; // Use null if the column can be nullable
    position: number;
    isPublished: 1|0;
    isFree: boolean;
    courseId: number;
    createdAt: string; // Assuming the timestamp is represented as a string
    updatedAt: string; // Assuming the timestamp is represented as a string
  }
  
  export default Chapter;
  