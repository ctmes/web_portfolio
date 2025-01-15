import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Github, Twitter, Linkedin, Mail, Code2 } from "lucide-react";
import { useToast } from "../ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { subscribeToNewsletter } from "@/lib/api";

interface FooterProps {
  socialLinks?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    email?: string;
    leetcode?: string;
  };
}

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof formSchema>;

const Footer = ({
  socialLinks = {
    github: "https://github.com",
    leetcode: "https://leetcode.com",
    linkedin: "https://linkedin.com",
    email: "mailto:example@example.com",
  },
}: FooterProps) => {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await subscribeToNewsletter(data.email);
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to my newsletter.",
        duration: 5000,
      });
      form.reset();
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to subscribe. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <footer className="w-full bg-[#2D2D2D] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Newsletter Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Stay Updated</h3>
            <p className="text-gray-300">
              Subscribe to my newsletter for the latest updates and articles.
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col sm:flex-row gap-2"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          className="bg-gray-800 border-gray-700 text-white w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs mt-1" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="bg-[#1A365D] hover:bg-[#2A466D] text-white whitespace-nowrap"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            </Form>
          </div>

          {/* Social Links Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Connect With Me</h3>
            <div className="flex gap-4">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1A365D] transition-colors"
              >
                <Github size={24} />
              </a>
              <a
                href={socialLinks.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1A365D] transition-colors"
              >
                <Code2 size={24} />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1A365D] transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a
                href={socialLinks.email}
                className="hover:text-[#1A365D] transition-colors"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>
            © {new Date().getFullYear()} Colin Melville. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
