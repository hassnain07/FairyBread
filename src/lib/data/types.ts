import type { Family, Child } from '../../types/family';
import type { Term } from '../../types/term';
import type { ClassBooking, Assessment, IndividualClassPurchase, StudentReport } from '../../types/booking';
import type { Payment, PaymentType } from '../../types/payment';
import type { Teacher, ClassInstance } from '../../types/teacher';

export interface DataClient {
  // Families
  getFamily(familyId: string): Promise<Family>;
  getAllFamilies(): Promise<Family[]>;
  // Children
  getChildren(familyId: string): Promise<Child[]>;
  addChild(familyId: string, child: Omit<Child, 'id' | 'family_id'>): Promise<Child>;
  // Terms
  getTerms(familyId: string): Promise<Term[]>;
  getActiveTerm(familyId: string): Promise<Term | null>;
  // Bookings
  getBookings(familyId: string): Promise<ClassBooking[]>;
  createBooking(booking: Omit<ClassBooking, 'id'>): Promise<ClassBooking>;
  cancelBooking(bookingId: string): Promise<void>;
  // Assessments
  getAssessments(familyId: string): Promise<Assessment[]>;
  createAssessment(assessment: Omit<Assessment, 'id'>): Promise<Assessment>;
  // Individual class purchases — only available if family has >= 1 Term record (any status)
  getIndividualPurchases(familyId: string): Promise<IndividualClassPurchase[]>;
  createIndividualPurchase(purchase: Omit<IndividualClassPurchase, 'id'>): Promise<IndividualClassPurchase>;
  // Payments
  getPayments(familyId: string): Promise<Payment[]>;
  submitPayment(payment: Omit<Payment, 'id' | 'created_at'>): Promise<Payment>;
  uploadPaymentProof(paymentId: string, file: File): Promise<void>;
  // Admin — all pending payments across all families
  getPendingPayments(): Promise<Payment[]>;
  verifyPayment(paymentId: string, action: 'approve' | 'reject'): Promise<void>;
  // Teachers
  getTeachers(): Promise<Teacher[]>;
  // Classes
  getClassInstances(): Promise<ClassInstance[]>;
  // Reports
  getReports(teacherId: string): Promise<StudentReport[]>;
  createReport(report: Omit<StudentReport, 'id' | 'created_at'>): Promise<StudentReport>;
  // Teacher assessments
  getTeacherAssessments(teacherId: string): Promise<Assessment[]>;
  createTeacherAssessment(assessment: Omit<Assessment, 'id'>): Promise<Assessment>;
  // Unused PaymentType re-export for consumers
  _paymentType?: PaymentType;
}
