import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Github, Linkedin, Mail, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { submitContactForm } from "@/lib/api";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const socialLinks = {
    github: "https://github.com/ctmes",
    leetcode: "https://leetcode.com/u/colintmelville/",
    linkedin: "https://www.linkedin.com/in/colin-melville-570383245",
    email: "mailto:colintmelville@gmail.com",
  };

  const onSubmit = async (data: FormValues) => {
    try {
      await submitContactForm({
        name: data.name,
        email: data.email,
        message: data.message
      });
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
        duration: 5000,
      });
      form.reset();
    } catch (error) {
      console.error("Contact form error:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  // Rest of the component remains the same...

  return (
    <div className="min-h-screen bg-white">
      {/* Component JSX remains unchanged */}
    </div>
  );
};

export default Contact;
