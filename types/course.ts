// types/course.ts
export interface Course {
    id: number;
    userId: string;
    title: string;
    description: string | null;
    imageUrl: string | null;
    price: number | null;
    isPublished: boolean;
    categoryId: number | null;
    createdAt: string;
    updatedAt: string;
  }
  