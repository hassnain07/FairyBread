import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { LandingPage } from '../features/marketing/pages/LandingPage';
import { LoginPage } from '../features/auth/pages/LoginPage';
import { SignupPage } from '../features/auth/pages/SignupPage';
import { ParentLayout } from '../features/parent/pages/ParentLayout';
import { AdminLayout } from '../features/admin/pages/AdminLayout';
import { TeacherLayout } from '../features/teacher/pages/TeacherLayout';

// Parent pages
import { DashboardPage } from '../features/parent/pages/DashboardPage';
import { ChildrenPage } from '../features/parent/pages/ChildrenPage';
import { ChildProfilePage } from '../features/parent/pages/ChildProfilePage';
import { BookAssessmentPage } from '../features/parent/pages/BookAssessmentPage';
import { BookClassPage } from '../features/parent/pages/BookClassPage';
import { BookingsPage } from '../features/parent/pages/BookingsPage';
import { ReportsPage } from '../features/parent/pages/ReportsPage';
import { MessagesPage } from '../features/parent/pages/MessagesPage';
import { PaymentsPage } from '../features/parent/pages/PaymentsPage';
import { EnrolmentPage } from '../features/parent/pages/EnrolmentPage';

// Admin pages
import { AdminHomePage } from '../features/admin/pages/AdminHomePage';
import { AdminBookingsPage } from '../features/admin/pages/AdminBookingsPage';
import { AdminPaymentsPage } from '../features/admin/pages/AdminPaymentsPage';
import { AdminTutorsPage } from '../features/admin/pages/AdminTutorsPage';
import { AdminParentsPage } from '../features/admin/pages/AdminParentsPage';
import { AdminProgramsPage } from '../features/admin/pages/AdminProgramsPage';
import { AdminWaitingListsPage } from '../features/admin/pages/AdminWaitingListsPage';
import { AdminSettingsPage } from '../features/admin/pages/AdminSettingsPage';
import { AdminFamilyBookingPage } from '../features/admin/pages/AdminFamilyBookingPage';
import { AdminMyTeachingPage } from '../features/admin/pages/AdminMyTeachingPage';

import { AdminMessagesPage } from '../features/admin/pages/AdminMessagesPage';

// Teacher pages
import { TeacherDashboardPage } from '../features/teacher/pages/TeacherDashboardPage';
import { TeacherClassesPage } from '../features/teacher/pages/TeacherClassesPage';
import { TeacherStudentsPage } from '../features/teacher/pages/TeacherStudentsPage';
import { TeacherAttendancePage } from '../features/teacher/pages/TeacherAttendancePage';
import { TeacherAssessmentsPage } from '../features/teacher/pages/TeacherAssessmentsPage';
import { TeacherMessagesPage } from '../features/teacher/pages/TeacherMessagesPage';
import { TeacherReportsPage } from '../features/teacher/pages/TeacherReportsPage';

const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },
  {
    path: '/parent',
    element: <ParentLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'children', element: <ChildrenPage /> },
      { path: 'children/:childId', element: <ChildProfilePage /> },
      { path: 'book-assessment', element: <BookAssessmentPage /> },
      { path: 'book-class', element: <BookClassPage /> },
      { path: 'bookings', element: <BookingsPage /> },
      { path: 'reports/:childId', element: <ReportsPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'messages', element: <MessagesPage /> },
      { path: 'payments', element: <PaymentsPage /> },
      { path: 'enrol', element: <EnrolmentPage /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminHomePage /> },
      { path: 'bookings', element: <AdminBookingsPage /> },
      { path: 'payments', element: <AdminPaymentsPage /> },
      { path: 'tutors', element: <AdminTutorsPage /> },
      { path: 'parents', element: <AdminParentsPage /> },
      { path: 'programs', element: <AdminProgramsPage /> },
      { path: 'waiting-lists', element: <AdminWaitingListsPage /> },
      { path: 'settings', element: <AdminSettingsPage /> },
      { path: 'messages', element: <AdminMessagesPage /> },
      { path: 'family-booking', element: <AdminFamilyBookingPage /> },
      { path: 'my-teaching', element: <AdminMyTeachingPage /> },
    ],
  },
  {
    path: '/teacher',
    element: <TeacherLayout />,
    children: [
      { index: true, element: <TeacherDashboardPage /> },
      { path: 'classes', element: <TeacherClassesPage /> },
      { path: 'students', element: <TeacherStudentsPage /> },
      { path: 'attendance', element: <TeacherAttendancePage /> },
      { path: 'assessments', element: <TeacherAssessmentsPage /> },
      { path: 'reports', element: <TeacherReportsPage /> },
      { path: 'messages', element: <TeacherMessagesPage /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
