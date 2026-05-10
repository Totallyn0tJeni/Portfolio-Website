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
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <Quote className="text-primary w-6 h-6" />
        <h2 className="text-2xl font-bold text-white">Testimonials</h2>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {testimonials?.slice(0, 3).map((t, idx) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-5 rounded-2xl relative group border border-white/5 hover:border-white/10 transition-colors"
          >
            <div className="space-y-3">
              <p className="text-white/80 text-sm italic leading-relaxed">"{t.content}"</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white text-sm font-bold">{t.name}</h4>
                  <p className="text-primary/60 text-[10px] uppercase tracking-wider">{t.role}</p>
                </div>
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
      <div className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Contact Info & Testimonials */}
          <div className="space-y-12">
            <div className="space-y-8">
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
                  <a href="mailto:jeni.1245690@gmail.com" target="_blank" rel="noopener noreferrer" className="glass-button p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center hover:bg-primary/20 hover:border-primary/30 transition-all duration-300">
                    <Mail size={24} className="text-primary" />
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
                  <a href="https://discordapp.com/users/834882747161870427" target="_blank" rel="noopener noreferrer" className="glass-button p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center hover:bg-indigo-500/20 hover:border-indigo-500/30 transition-all duration-300">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="text-indigo-300">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.419-2.157 2.419z"/>
                    </svg>
                    <span className="text-sm font-medium">Discord</span>
                    <span className="text-[10px] text-white/40 truncate w-full px-2">Totallyn0tJeni</span>
                  </a>
                  <a href="https://www.linkedin.com/in/jenisha-patel18" target="_blank" rel="noopener noreferrer" className="glass-button p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center hover:bg-blue-700/20 hover:border-blue-700/30 transition-all duration-300">
                    <Linkedin size={24} className="text-blue-200" />
                    <span className="text-sm font-medium">LinkedIn</span>
                    <span className="text-[10px] text-white/40 truncate w-full px-2">jenisha-patel18</span>
                  </a>
                  <a href="https://www.canva.com/design/DAGnihBJLbU/e45T2GcELw6rjd8yT_Ol5Q/view" target="_blank" rel="noopener noreferrer" className="glass-button p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center hover:bg-teal-500/20 hover:border-teal-500/30 transition-all duration-300">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="text-teal-300">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.445 15.03c-.522.9-1.277 1.61-2.187 2.085-.91.476-1.94.716-3.09.716-1.09 0-2.088-.225-2.994-.676a5.863 5.863 0 0 1-2.13-1.88 5.178 5.178 0 0 1-.87-2.213 6.25 6.25 0 0 1 .034-2.03 5.9 5.9 0 0 1 .87-2.19 5.708 5.708 0 0 1 2.086-1.822c.872-.47 1.88-.705 3.024-.705.76 0 1.47.118 2.13.354.66.236 1.22.566 1.68.99.46.423.8.935 1.02 1.537a4.7 4.7 0 0 1 .225 2.054h-7.41a3.1 3.1 0 0 0 .112.944c.112.37.292.695.54.976.247.28.56.505.937.674.377.17.817.254 1.32.254.617 0 1.135-.136 1.554-.407.42-.27.716-.636.887-1.097l2.264.436z"/>
                    </svg>
                    <span className="text-sm font-medium">Canva</span>
                    <span className="text-[10px] text-white/40 truncate w-full px-2">Portfolio</span>
                  </a>
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="glass-button p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center hover:bg-emerald-500/20 hover:border-emerald-500/30 transition-all duration-300 col-span-2">
                    <FileText size={24} className="text-emerald-300" />
                    <span className="text-sm">Download Resume</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Testimonials integrated here */}
            <div className="pt-8 border-t border-white/5">
              <TestimonialsSection />
            </div>
          </div>

          {/* Right Column: Form Side */}
          <div className="glass-panel p-8 rounded-3xl relative overflow-hidden h-fit lg:sticky lg:top-24">
            <div className="absolute top-0 right-0 p-32 bg-primary/10 blur-[100px] rounded-full pointer-events-none -mr-16 -mt-16"></div>
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              <h2 className="text-2xl font-bold text-white">
                {isTestimonial ? "Leave a Testimonial" : "Send a Message"}
              </h2>
              <div className="flex items-center gap-2 bg-white/5 p-1 px-3 rounded-full border border-white/10">
                <Checkbox 
                  id="is-testimonial" 
                  checked={isTestimonial}
                  onCheckedChange={(checked) => setIsTestimonial(!!checked)}
                  className="border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
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
                            className="bg-black/20 border-white/10 text-white placeholder:text-white/30 focus:border-primary/50 focus:ring-primary/20 h-12 rounded-xl"
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
                              className="bg-black/20 border-white/10 text-white placeholder:text-white/30 focus:border-primary/50 focus:ring-primary/20 h-12 rounded-xl"
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
                              className="bg-black/20 border-white/10 text-white placeholder:text-white/30 focus:border-primary/50 focus:ring-primary/20 h-12 rounded-xl"
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
                          className="bg-black/20 border-white/10 text-white placeholder:text-white/30 focus:border-primary/50 focus:ring-primary/20 min-h-[150px] rounded-xl resize-none"
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
                className="text-center mt-4 text-xs text-primary/60 flex items-center justify-center gap-1"
              >
                <CheckCircle2 size={12} /> Your testimonial will be visible after submission
              </motion.p>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
