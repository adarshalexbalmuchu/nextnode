// utils/isAdmin.ts
import { User } from '@supabase/supabase-js';

export function isAdmin(user: User & { role?: string } | null | undefined): boolean {
  return !!user && user.role === 'admin';
}
