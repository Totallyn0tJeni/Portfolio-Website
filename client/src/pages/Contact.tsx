import { PageTransition } from "@/components/PageTransition";
import { useSendMessage, useTestimonials, useSubmitTestimonial } from "@/hooks/use-portfolio";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema, insertTestimonialSchema, type InsertMessage, type InsertTestimonial } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Loader2, Mail, Github, Instagram, Linkedin, FileText, Quote, Star } from "lucide-react";
import { motion } from "framer-motion";

function TestimonialsSection() {
  const { data: testimonials } = useTestimonials();
  const submitTestimonial = useSubmitTestimonial();
  
  const form = useForm<InsertTestimonial>({
    resolver: zodResolver(insertTestimonialSchema),
    defaultValues: { name: "", role: "", content: "" }
  });

  const onSubmit = (data: InsertTestimonial) => {
    submitTestimonial.mutate(data, {
      onSuccess: () => form.reset()
    });
  };

  return (
    <div className="mt-20 space-y-12 pb-20">
      <div className="text-center">
        <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
          Testimonials & <span className="text-gradient">Feedback</span>
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto">
          Hear from people I've worked with, or leave your own feedback below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials?.map((t, idx) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-6 rounded-2xl relative group"
          >
            <Quote className="absolute top-4 right-4 text-purple-500/20 w-8 h-8 group-hover:text-purple-500/40 transition-colors" />
            <div className="space-y-4">
              <p className="text-white/80 italic line-clamp-4">"{t.content}"</p>
              <div>
                <h4 className="text-white font-bold">{t.name}</h4>
                <p className="text-purple-300 text-xs">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-xl mx-auto glass-panel p-8 rounded-3xl border-purple-500/20">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Star className="text-yellow-400 w-5 h-5" fill="currentColor" />
          Leave a Testimonial
        </h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} className="bg-white/5 border-white/10 rounded-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Your Role/Org" {...field} className="bg-white/5 border-white/10 rounded-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Your feedback..." {...field} className="bg-white/5 border-white/10 rounded-xl min-h-[100px] resize-none" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={submitTestimonial.isPending} className="w-full rounded-xl bg-purple-600 hover:bg-purple-700 text-white">
              {submitTestimonial.isPending ? "Submitting..." : "Submit Testimonial"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default function Contact() {
  const sendMessage = useSendMessage();
  
  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = (data: InsertMessage) => {
    sendMessage.mutate(data, {
      onSuccess: () => {
        form.reset();
      }
    });
  };

  return (
    <PageTransition>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
        {/* Contact Info Side */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-white mb-6">
              Let's <span className="text-gradient">Connect</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">
              Have a project in mind, a question about my work, or just want to chat? 
              I'd love to hear from you.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Find me online</h3>
            <div className="grid grid-cols-2 gap-4">
              <a href="mailto:jeni.1245690@gmail.com" target="_blank" rel="noopener noreferrer" className="glass-button p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center hover:bg-purple-500/20 hover:border-purple-500/30 transition-all duration-300">
                <Mail size={24} className="text-purple-300" />
                <span className="text-sm font-medium">Email</span>
                <span className="text-[10px] text-white/40 truncate w-full px-2">jeni.1245690@gmail.com</span>
              </a>
              <a href="https://github.com/Totallyn0tJeni" target="_blank" rel="noopener noreferrer" className="glass-button p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center hover:bg-gray-500/20 hover:border-gray-500/30 transition-all duration-300">
                <Github size={24} className="text-white" />
                <span className="text-sm font-medium">GitHub</span>
                <span className="text-[10px] text-white/40 truncate w-full px-2">Totallyn0tJeni</span>
              </a>
              <a href="https://instagram.com/jenisha_ptl08" target="_blank" rel="noopener noreferrer" className="glass-button p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center hover:bg-pink-500/20 hover:border-pink-500/30 transition-all duration-300">
                <Instagram size={24} className="text-pink-300" />
                <span className="text-sm font-medium">Instagram</span>
                <span className="text-[10px] text-white/40 truncate w-full px-2">jenisha_ptl08</span>
              </a>
              <a href="https://www.linkedin.com/in/jenisha-patel18" target="_blank" rel="noopener noreferrer" className="glass-button p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center hover:bg-blue-700/20 hover:border-blue-700/30 transition-all duration-300">
                <Linkedin size={24} className="text-blue-200" />
                <span className="text-sm font-medium">LinkedIn</span>
                <span className="text-[10px] text-white/40 truncate w-full px-2">jenisha-patel18</span>
              </a>
              <a href="/attached_assets/Jenisha_Patel_-_Resume_2026_V1_1769299476670.pdf" target="_blank" rel="noopener noreferrer" className="glass-button p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center hover:bg-emerald-500/20 hover:border-emerald-500/30 transition-all duration-300 col-span-2">
                <FileText size={24} className="text-emerald-300" />
                <span className="text-sm">Download Resume</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form Side */}
        <div className="glass-panel p-8 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none -mr-16 -mt-16"></div>
          
          <h2 className="text-2xl font-bold text-white mb-6 relative z-10">Send a Message</h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/90">Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your name" 
                        {...field} 
                        className="bg-black/20 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50 focus:ring-purple-500/20 h-12 rounded-xl"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/90">Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="your@email.com" 
                        type="email"
                        {...field} 
                        className="bg-black/20 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50 focus:ring-purple-500/20 h-12 rounded-xl"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/90">Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell me about your project..." 
                        {...field} 
                        className="bg-black/20 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50 focus:ring-purple-500/20 min-h-[150px] rounded-xl resize-none"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                disabled={sendMessage.isPending}
                className="w-full h-12 rounded-xl bg-white text-black hover:bg-white/90 font-bold text-lg shadow-lg shadow-white/5"
              >
                {sendMessage.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    Send Message <Send className="ml-2 h-5 w-5" />
                  </>
                )
              }
              </Button>
            </form>
          </Form>
        </div>
      </div>
      
      <TestimonialsSection />
    </PageTransition>
  );
}
