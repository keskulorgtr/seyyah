'use server';

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function submitRequest(formData: FormData) {
  try {
    const fullName = formData.get('fullName') as string;
    const email = (formData.get('email') as string) || '';
    const phone = (formData.get('phone') as string) || '';
    const reservationDate = formData.get('reservationDate') as string;
    const destination = formData.get('destination') as string;
    const pax = parseInt(formData.get('pax') as string, 10);

    if (!fullName || !destination || isNaN(pax)) {
      return { success: false, error: 'Please fill in all required fields.' };
    }

    // Basic email validation if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    const stmt = db.prepare(
      'INSERT INTO requests (fullName, email, phone, reservationDate, destination, pax) VALUES (?, ?, ?, ?, ?, ?)'
    );
    stmt.run(fullName, email, phone, reservationDate, destination, pax);

    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('DB Error:', error);
    return { success: false, error: 'An error occurred. Please try again.' };
  }
}
