import type { DataClient } from '../types';

// TODO: implement real Supabase calls here — same function signatures as mock/client.ts
// Switch via VITE_DATA_SOURCE=supabase env var
export const supabaseDataClient: DataClient = {
  async getFamily() { throw new Error('Supabase not implemented yet'); },
  async getChildren() { throw new Error('Supabase not implemented yet'); },
  async addChild() { throw new Error('Supabase not implemented yet'); },
  async getTerms() { throw new Error('Supabase not implemented yet'); },
  async getActiveTerm() { throw new Error('Supabase not implemented yet'); },
  async getBookings() { throw new Error('Supabase not implemented yet'); },
  async createBooking() { throw new Error('Supabase not implemented yet'); },
  async cancelBooking() { throw new Error('Supabase not implemented yet'); },
  async getAssessments() { throw new Error('Supabase not implemented yet'); },
  async createAssessment() { throw new Error('Supabase not implemented yet'); },
  async getIndividualPurchases() { throw new Error('Supabase not implemented yet'); },
  async createIndividualPurchase() { throw new Error('Supabase not implemented yet'); },
  async getPayments() { throw new Error('Supabase not implemented yet'); },
  async uploadPaymentProof() { throw new Error('Supabase not implemented yet'); },
  async getTeachers() { throw new Error('Supabase not implemented yet'); },
  async getClassInstances() { throw new Error('Supabase not implemented yet'); },
};
