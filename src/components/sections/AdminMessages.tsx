import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { format } from "date-fns";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { getContactMessages } from "@/lib/api";
import type { ContactSubmission } from "@/lib/api";
import { supabase } from "@/lib/supabase";

const AdminMessages = () => {
  const [messages, setMessages] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await getContactMessages();
      setMessages(data);
      setLoading(false);
    };

    fetchMessages();

    // Set up real-time subscription
    const subscription = supabase
      .channel("contact_submissions_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "contact_submissions",
        },
        (payload) => {
          setMessages((current) => [
            payload.new as ContactSubmission,
            ...current,
          ]);
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar className="bg-[#2D2D2D]" />
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="flex justify-center items-center min-h-[400px]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="rounded-full h-8 w-8 border-b-2 border-gray-900"
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar className="bg-[#2D2D2D]" />
      <div className="max-w-6xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8">Contact Messages</h1>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell className="whitespace-nowrap">
                      {format(
                        new Date(message.created_at),
                        "MMM d, yyyy HH:mm",
                      )}
                    </TableCell>
                    <TableCell>{message.name}</TableCell>
                    <TableCell>
                      <a
                        href={`mailto:${message.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {message.email}
                      </a>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <div className="line-clamp-2">{message.message}</div>
                    </TableCell>
                  </TableRow>
                ))}
                {messages.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8">
                      No messages yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminMessages;
