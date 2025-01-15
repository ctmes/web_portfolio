import { supabase } from "./supabase";
import type { Database } from "@/types/supabase";

export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type ContactSubmission =
  Database["public"]["Tables"]["contact_submissions"]["Row"];

export async function getProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  return data;
}

export async function getProjectById(id: string) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching project:", error);
    return null;
  }

  return data;
}

export async function subscribeToNewsletter(email: string) {
  // Check if already subscribed
  const { data: existing } = await supabase
    .from("newsletter_subscribers")
    .select("id")
    .eq("email", email)
    .single();

  if (existing) {
    throw new Error(
      "Looks like you're already subscribed! You'll continue receiving our updates.",
    );
  }

  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert([{ email }]);

  if (error) {
    console.error("Error subscribing to newsletter:", error);
    throw new Error("Failed to subscribe. Please try again.");
  }

  return true;
}

export async function submitContactForm({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  const { error } = await supabase
    .from("contact_submissions")
    .insert([{ name, email, message }]);

  if (error) {
    console.error("Error submitting contact form:", error);
    throw new Error("Failed to send message. Please try again.");
  }

  return true;
}
