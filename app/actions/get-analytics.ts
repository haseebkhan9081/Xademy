import { db } from "@/lib/db";
import Purchase from "@/types/Purchase";
import { Course } from "@/types/course";

type Chapter = {
  id: number;
  title: string;
  isPublished: number;
  // Add other properties as needed
};

type Category = {
  id: number;
  name: string;
  // Add other properties as needed
};

type ResultRow =Course &{
  // Add other properties from the Course table
  Category: Category;
  Chapters: Chapter[];
};

type PurchaseWithCourse = Purchase & {
  course: Course;
};

export const getAnalytics = async (userId: string) => {
  try {
    const purchases = await db.$queryRaw<ResultRow[]>`
      SELECT
        Course.*,
        JSON_OBJECT(
          'categoryId', Category.id,
          'categoryName', Category.name
        ) AS Category,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'chapterId', Chapter.id,
            'chapterTitle', Chapter.title,
            'isPublished', Chapter.isPublished
          )
        ) AS Chapters
      FROM
        Purchase
      JOIN Course ON Purchase.courseId = Course.id
      JOIN Category ON Course.categoryId = Category.id
      LEFT JOIN Chapter ON Course.id = Chapter.courseId
      WHERE
        Purchase.userId =${userId}
        AND Chapter.isPublished = ${1}
      GROUP BY
        Course.id
    `;

    const groupedEarnings: { [courseTitle: string]: number } = {};
  
    purchases.forEach((purchase) => {
      const courseTitle = purchase.title; // Assuming title is a property of Course
      if (!groupedEarnings[courseTitle]) {
        groupedEarnings[courseTitle] = 0;
      }
      // Assuming the course has a 'price' property
      groupedEarnings[courseTitle] += purchase.price || 0;
    });

    const data = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
      name: courseTitle,
      total: total,
    }));

    const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
    const totalSales = purchases.length;

    return {
      data,
      totalRevenue,
      totalSales,
    };
  } catch (error) {
    console.error("[GET_ANALYTICS]", error);
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
    };
  }
};
