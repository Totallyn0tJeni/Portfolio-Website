import { PageTransition } from "@/components/PageTransition";
import { useSendMessage, useTestimonials, useSubmitTestimonial } from "@/hooks/use-portfolio";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Loader2, Mail, Github, Instagram, Linkedin, FileText, Quote, Star, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

function TestimonialsSection() {
  const { data: testimonials } = useTestimonials();
  
  return (
    <div className="mt-20 space-y-12 pb-20">
      <div className="text-center">
        <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
          Testimonials & <span className="text-gradient">Feedback</span>
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto">
          Hear from people I've worked with.
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
    </div>
  );
}

export default function Contact() {
  const sendMessage = useSendMessage();
  const submitTestimonial = useSubmitTestimonial();
  const [isTestimonial, setIsTestimonial] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(insertMessageSchema.extend({
      role: isTestimonial ? insertMessageSchema.shape.name : insertMessageSchema.shape.name.optional(),
    })),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      role: ""
    }
  });

  const onSubmit = async (data: any) => {
    try {
      if (isTestimonial) {
        await submitTestimonial.mutateAsync({
          name: data.name,
          role: data.role || "Professional",
          content: data.message
        });
      } else {
        await sendMessage.mutateAsync({
          name: data.name,
          email: data.email,
          message: data.message
        });
      }
      form.reset();
      setIsTestimonial(false);
    } catch (error) {
      // Error handled by mutation hooks
    }
  };

  return (
    <PageTransition>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start min-h-[70vh]">
        {/* Contact Info Side */}
        <div className="space-y-8 lg:sticky lg:top-24">
          <div>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-white mb-6">
              Let's <span className="text-gradient">Connect</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">
              Have a project in mind, want to leave feedback, or just want to chat? 
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

        {/* Combined Form Side */}
        <div className="glass-panel p-8 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none -mr-16 -mt-16"></div>
          
          <div className="flex items-center justify-between mb-6 relative z-10">
            <h2 className="text-2xl font-bold text-white">
              {isTestimonial ? "Leave a Testimonial" : "Send a Message"}
            </h2>
            <div className="flex items-center gap-2 bg-white/5 p-1 px-3 rounded-full border border-white/10">
              <Checkbox 
                id="is-testimonial" 
                checked={isTestimonial}
                onCheckedChange={(checked) => setIsTestimonial(!!checked)}
                className="border-white/20 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
              />
              <label 
                htmlFor="is-testimonial" 
                className="text-xs font-medium text-white/70 cursor-pointer select-none"
              >
                As Testimonial?
              </label>
            </div>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                
                {isTestimonial ? (
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/90">Role/Organization</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g. CEO at TechCorp" 
                            {...field} 
                            className="bg-black/20 border-white/10 text-white placeholder:text-white/30 focus:border-purple-500/50 focus:ring-purple-500/20 h-12 rounded-xl"
                          />
                        </FormControl>
                        <FormMessage className="text-red-300" />
                      </FormItem>
                    )}
                  />
                ) : (
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
                )}
              </div>
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/90">
                      {isTestimonial ? "Testimonial Content" : "Message"}
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={isTestimonial ? "Share your experience working with me..." : "Tell me about your project..."} 
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
                disabled={sendMessage.isPending || submitTestimonial.isPending}
                className="w-full h-12 rounded-xl bg-white text-black hover:bg-white/90 font-bold text-lg shadow-lg shadow-white/5 transition-all duration-300 active:scale-[0.98]"
              >
                {sendMessage.isPending || submitTestimonial.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    {isTestimonial ? "Submit Testimonial" : "Send Message"} 
                    {isTestimonial ? <Star className="ml-2 h-5 w-5 fill-current" /> : <Send className="ml-2 h-5 w-5" />}
                  </>
                )
              }
              </Button>
            </form>
          </Form>

          {isTestimonial && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-4 text-xs text-purple-300/60 flex items-center justify-center gap-1"
            >
              <CheckCircle2 size={12} /> Your testimonial will be visible after submission
            </motion.p>
          )}
        </div>
      </div>
      
      <TestimonialsSection />
    </PageTransition>
  );
}
