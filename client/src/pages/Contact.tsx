import { PageTransition } from "@/components/PageTransition";
import { useSendMessage } from "@/hooks/use-portfolio";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Loader2, Mail, Github, Instagram, Linkedin, FileText } from "lucide-react";

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
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </PageTransition>
  );
}
