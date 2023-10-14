// types/course.ts
// id int AI PK 
// name varchar(255) 
// url text 
// courseId int 
// createdAt datetime 
// updatedAt datetime
export interface Attachment {
    id: number;
    name:string;
    url: string;
    courseId: number;
    createdAt: string;
    updatedAt: string;
  }
  