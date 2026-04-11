import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const metadata = {
  title: "Settings | Admin Dashboard",
};

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
         <h1 className="font-heading text-3xl font-bold">Global Settings</h1>
         <p className="text-muted-foreground mt-1">Configure company details, SEO metadata, and generic platform data.</p>
      </div>

      <div className="bg-card rounded-xl border shadow-sm p-8">
         <h2 className="font-heading font-medium text-xl mb-6 border-b pb-4">Company Profile</h2>
         <form className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
               <div className="space-y-2">
                 <label className="text-sm font-semibold">Company Name</label>
                 <Input defaultValue="CivilDraft Pro" />
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-semibold">Phone Number</label>
                 <Input defaultValue="+1 (555) 123-4567" />
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-semibold">Contact Email</label>
                 <Input defaultValue="info@civildraftpro.com" />
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-semibold">WhatsApp CTA Number (Sticky UI)</label>
                 <Input defaultValue="+919876543210" />
               </div>
               <div className="space-y-2 sm:col-span-2">
                 <label className="text-sm font-semibold">Office Address</label>
                 <Textarea defaultValue="123 Builder Avenue, Engineering Block" rows={3} />
               </div>
            </div>
            
            <div className="pt-6 border-t flex justify-end">
               <Button type="button">Save Profile Configuration</Button>
            </div>
         </form>
      </div>
    </div>
  );
}
