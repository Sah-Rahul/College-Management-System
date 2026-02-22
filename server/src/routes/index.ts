import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import userRoutes from "../modules/users/user.routes";
import admissionRoutes from "../modules/admissions/admission.routes";
import assignmentRoutes from "../modules/assignments/assignment.routes";
import cartRoutes from "../modules/cart/cart.routes";
import couponRoutes from "../modules/coupons/coupon.routes";
import courseRoutes from "../modules/progress/courseProgress.routes";
import discussionRoutes from "../modules/discussions/discussion.routes";
import enrollmentRoutes from "../modules/enrollments/enrollment.routes";
import InstituteRequestRoutes from "../modules/institute-requests/instituteRequest.routes";
import InstructorRequestRoutes from "../modules/instructor-requests/instructorRequest.routes";
import notificationRoutes from "../modules/notifications/notification.routes";
import orderRoutes from "../modules/orders/order.routes";
import paymentRoutes from "../modules/payments/payment.routes";
import courseProgressRoutes from "../modules/progress/courseProgress.routes";
import reviewRoutes from "../modules/reviews/review.routes";
import sessionRoutes from "../modules/sessions/session.routes";
import wishlistRoutes from "../modules/wishlist/wishlist.routes";
import certificateRoutes from "../modules/certificates/certificate.routes";
import categoryRoutes from "../modules/categories/category.routes";

const appRoutes = Router()

appRoutes.use("/auth", authRoutes)
appRoutes.use("/user", userRoutes)
appRoutes.use("/category", categoryRoutes)
appRoutes.use("/admission", admissionRoutes)
appRoutes.use("/assignment", assignmentRoutes)
appRoutes.use("/cart", cartRoutes)
appRoutes.use("/coupon", couponRoutes)
appRoutes.use("/course", courseRoutes)
appRoutes.use("/disscussion", discussionRoutes)
appRoutes.use("/enrollment", enrollmentRoutes)
appRoutes.use("/insitute", InstituteRequestRoutes)
appRoutes.use("/instructor", InstructorRequestRoutes)
appRoutes.use("/notification", notificationRoutes)
appRoutes.use("/order", orderRoutes)
appRoutes.use("/payment", paymentRoutes)
appRoutes.use("/course-progress", courseProgressRoutes)
appRoutes.use("/review", reviewRoutes)
appRoutes.use("/session", sessionRoutes)
appRoutes.use("/wishlist", wishlistRoutes)
appRoutes.use("/certificate", certificateRoutes)




export default appRoutes