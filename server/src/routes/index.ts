import { Router } from "express";
import authRoutes from "./auth.routes";
import courseRoutes from "./course.routes";
import enrollmentRoutes from "./enrollment.routes";
import assignmentRoutes from "./assignmentSubmission.routes";
import assignmentSubmissionRoutes from "./assignmentSubmission.routes";
import attendanceRoutes from "./attendance.routes";
import noticeRoutes from "./notice.routes";
import quizRoutes from "./quiz.routes";
import questionRoutes from "./question.routes";
import quizSubmissionRoutes from "./quizSubmission.routes";

const appRoutes = Router();

appRoutes.use("/auth", authRoutes);
appRoutes.use("/courses", courseRoutes);
appRoutes.use("/enrollments", enrollmentRoutes);

appRoutes.use("/assignments", assignmentRoutes);
appRoutes.use("/assignment-submissions", assignmentSubmissionRoutes);

appRoutes.use("/attendance", attendanceRoutes);
appRoutes.use("/notices", noticeRoutes);

appRoutes.use("/quizzes", quizRoutes);
appRoutes.use("/questions", questionRoutes);
appRoutes.use("/quiz-submissions", quizSubmissionRoutes);

export default appRoutes;
