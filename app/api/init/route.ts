import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
 import {db} from "@/lib/db";
export async function GET(){
const {userId}=auth();
    try{
if(!userId){
    return new NextResponse("UnAuthorized",{status:401})
} 
//create category table
await db.$queryRaw`
CREATE TABLE IF NOT EXISTS Category (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) UNIQUE NOT NULL,
  PRIMARY KEY (id)
);`

const result=await db.$queryRaw`
CREATE TABLE IF NOT EXISTS Course (
  id INT NOT NULL AUTO_INCREMENT,
  userId VARCHAR(36),
  title TEXT NOT NULL,
  description TEXT,
  imageUrl TEXT,
  price FLOAT,
  isPublished BOOLEAN DEFAULT false,
  categoryId INT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (categoryId) REFERENCES Category(id)
);`

await db.$queryRaw`
CREATE TABLE IF NOT EXISTS Attachment (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  url TEXT,
  courseId INT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (courseId) REFERENCES Course(id) ON DELETE CASCADE
);`

await db.$queryRaw`
CREATE TABLE IF NOT EXISTS Chapter (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  videoUrl TEXT,
  position INT,
  isPublished BOOLEAN DEFAULT false,
  isFree BOOLEAN DEFAULT false,
  courseId INT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (courseId) REFERENCES Course(id) ON DELETE CASCADE
);`

await db.$queryRaw`
CREATE TABLE IF NOT EXISTS MuxData (
  id INT NOT NULL AUTO_INCREMENT,
  assetId VARCHAR(255),
  playbackId VARCHAR(255),
  chapterId INT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (chapterId) REFERENCES Chapter(id) ON DELETE CASCADE
);`

await db.$queryRaw`
CREATE TABLE IF NOT EXISTS UserProgress (
  id INT NOT NULL AUTO_INCREMENT,
  userId VARCHAR(36),
  chapterId INT NOT NULL,
  isCompleted BOOLEAN DEFAULT false,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (chapterId) REFERENCES Chapter(id) ON DELETE CASCADE,
  UNIQUE (userId, chapterId)
);`

await db.$queryRaw`
CREATE TABLE IF NOT EXISTS Purchase (
  id INT NOT NULL AUTO_INCREMENT,
  userId VARCHAR(36),
  courseId INT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (courseId) REFERENCES Course(id) ON DELETE CASCADE,
  UNIQUE (userId, courseId)
);`

await db.$queryRaw`
CREATE TABLE IF NOT EXISTS StripeCustomer (
  id INT NOT NULL AUTO_INCREMENT,
  userId VARCHAR(36) UNIQUE,
  stripeCustomerId VARCHAR(255) UNIQUE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
`


return  NextResponse.json(result);
  } catch(error:any){
console.log("api/init error",error);;
    return new NextResponse("Error while INITIALIZING DB",{status:501});
  } 
}