import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ohzimevkczcgmhpcozmj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oemltZXZrY3pjZ21ocGNvem1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1NDgwMTIsImV4cCI6MjA5NzEyNDAxMn0.Pw1o21Mi6wHj6dDNR7_LR4h_JKUYLEHcuupaRJ-f_cs';
// La anon key es pública por diseño — el panel admin usa contraseña client-side ("Lia15")
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
