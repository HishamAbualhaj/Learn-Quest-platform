export type User = {
  student_id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: "Male" | "Female";
  birthdate: string; // ISO date
  image_url: string;
  joined_at: string; // ISO date
  course_joined: string | null;
  role: "user" | "admin" | "teacher";
  status_user: number; // 1 = active, 0 = inactive, etc.
};
export type EnrolledCourse = Course & {
  progress: string;
};
export type Course = {
  course_id: number;
  title: string;
  description: string;
  price: number;
  discount: number;
  category: string;
  tabs: string;
  image_url: string;
  stars: number;
  lessons: number;
  created_date: string;
};

export type BlogType = {
  blog_id: string;
  title: string;
  subtitle: string;
  image_url: string;
  content: string;
};

export type CommentType = {
  comment_id: number;
  student_id: number;
  blog_id: number;
  comment_text: string;
  created_date: string;
  first_name: string;
  image_url: string;
};

export type CourseMaterial = {
  lesson_count: number;
  material_id: string;
  title: string;
  subtitle: string;
  isCompleted: number;
  created_date: string;
  url?: string;
};

export type ReviewType = {
  review_id: string;
  student_id: number;
  first_name: string;
  course_id: number;
  stars: number;
  image_url: string;
  review_text: string;
  review_date: string;
};

export type MessageType = {
  msg_id: string;
  sender_id: string;
  receiver_id: string;
  msg_text: string;
  created_date: string;
};

export type CourseDataResponse = {
  msg: [Course, CourseMaterial[]] | string;
  enrolled: boolean;
};

export type AnalyticsType = {
  users: number;
  active_users: number;
  inactive_users: number;
  courses: number;
  reviews:number;
  blogs:number;
  time:string;
};
