-- Enable Row Level Security on tables we'll create later for user data
-- For now, just ensure auth is ready

-- Create timetable table for student schedules
CREATE TABLE public.timetable (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  day_of_week TEXT NOT NULL CHECK (day_of_week IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')),
  subject TEXT NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  room TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.timetable ENABLE ROW LEVEL SECURITY;

-- RLS Policies for timetable
CREATE POLICY "Users can view their own timetable"
  ON public.timetable
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own timetable entries"
  ON public.timetable
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own timetable entries"
  ON public.timetable
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own timetable entries"
  ON public.timetable
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Add trigger for timetable
CREATE TRIGGER update_timetable_updated_at
  BEFORE UPDATE ON public.timetable
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();