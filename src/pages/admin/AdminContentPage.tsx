import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { getAllSiteContent, updateSiteContent, getServices, updateService } from '@/db/api';
import type { SiteContent, Service } from '@/types/types';
import { Save, Settings } from 'lucide-react';

export default function AdminContentPage() {
  const [siteContent, setSiteContent] = useState<SiteContent[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [contentData, servicesData] = await Promise.all([
        getAllSiteContent(),
        getServices(),
      ]);
      setSiteContent(contentData);
      setServices(servicesData);
    } catch (error) {
      console.error('Error loading content:', error);
      toast({
        title: 'Error',
        description: 'Failed to load content',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSiteContentUpdate = async (section: string, content: Record<string, any>) => {
    setSaving(true);
    try {
      await updateSiteContent(section, content);
      toast({
        title: 'Success',
        description: 'Content updated successfully',
      });
      loadData();
    } catch (error) {
      console.error('Error updating content:', error);
      toast({
        title: 'Error',
        description: 'Failed to update content',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleServiceUpdate = async (id: string, updates: Partial<Service>) => {
    setSaving(true);
    try {
      await updateService(id, updates);
      toast({
        title: 'Success',
        description: 'Service updated successfully',
      });
      loadData();
    } catch (error) {
      console.error('Error updating service:', error);
      toast({
        title: 'Error',
        description: 'Failed to update service',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const getContentBySection = (section: string) => {
    return siteContent.find((c) => c.section === section);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-64 bg-muted" />
        <Skeleton className="h-96 w-full bg-muted" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Content Management</h1>
        <p className="text-muted-foreground mt-2">Edit website content and service information</p>
      </div>

      {/* Hero Section */}
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
          <CardDescription>Edit the main hero section content</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleSiteContentUpdate('hero', {
                title: formData.get('hero_title'),
                subtitle: formData.get('hero_subtitle'),
                cta_text: formData.get('hero_cta'),
              });
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="hero_title">Title</Label>
              <Input
                id="hero_title"
                name="hero_title"
                defaultValue={getContentBySection('hero')?.content.title || ''}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero_subtitle">Subtitle</Label>
              <Input
                id="hero_subtitle"
                name="hero_subtitle"
                defaultValue={getContentBySection('hero')?.content.subtitle || ''}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero_cta">CTA Button Text</Label>
              <Input
                id="hero_cta"
                name="hero_cta"
                defaultValue={getContentBySection('hero')?.content.cta_text || ''}
              />
            </div>
            <Button type="submit" disabled={saving}>
              <Save className="mr-2 h-4 w-4" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Edit contact details</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleSiteContentUpdate('contact', {
                phone: formData.get('contact_phone'),
                email: formData.get('contact_email'),
                address: formData.get('contact_address'),
                hours: formData.get('contact_hours'),
              });
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact_phone">Phone</Label>
                <Input
                  id="contact_phone"
                  name="contact_phone"
                  defaultValue={getContentBySection('contact')?.content.phone || ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_email">Email</Label>
                <Input
                  id="contact_email"
                  name="contact_email"
                  type="email"
                  defaultValue={getContentBySection('contact')?.content.email || ''}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact_address">Address</Label>
              <Input
                id="contact_address"
                name="contact_address"
                defaultValue={getContentBySection('contact')?.content.address || ''}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact_hours">Business Hours</Label>
              <Textarea
                id="contact_hours"
                name="contact_hours"
                rows={2}
                defaultValue={getContentBySection('contact')?.content.hours || ''}
              />
            </div>
            <Button type="submit" disabled={saving}>
              <Save className="mr-2 h-4 w-4" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Services */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Services
          </CardTitle>
          <CardDescription>Edit service information and pricing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {services.map((service) => (
            <form
              key={service.id}
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleServiceUpdate(service.id, {
                  name: formData.get(`name_${service.id}`) as string,
                  description: formData.get(`desc_${service.id}`) as string,
                  price_starting_from: Number(formData.get(`price_${service.id}`)),
                });
              }}
              className="p-4 border rounded-lg space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor={`name_${service.id}`}>Service Name</Label>
                <Input
                  id={`name_${service.id}`}
                  name={`name_${service.id}`}
                  defaultValue={service.name}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`desc_${service.id}`}>Description</Label>
                <Textarea
                  id={`desc_${service.id}`}
                  name={`desc_${service.id}`}
                  rows={2}
                  defaultValue={service.description || ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`price_${service.id}`}>Starting Price (₹)</Label>
                <Input
                  id={`price_${service.id}`}
                  name={`price_${service.id}`}
                  type="number"
                  step="0.01"
                  defaultValue={service.price_starting_from || ''}
                />
              </div>
              <Button type="submit" disabled={saving}>
                <Save className="mr-2 h-4 w-4" />
                {saving ? 'Saving...' : 'Save Service'}
              </Button>
            </form>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
