import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { getSettings, updateSetting } from '@/db/api';
import type { Setting } from '@/types/types';
import { Settings, Save, MessageCircle } from 'lucide-react';

export default function ManageSettings() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const [whatsappNumber, setWhatsappNumber] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const data = await getSettings();
      setSettings(data);
      
      // Find WhatsApp number setting
      const whatsappSetting = data.find(s => s.key === 'whatsapp_number');
      if (whatsappSetting) {
        setWhatsappNumber(whatsappSetting.value);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to load settings',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveWhatsApp = async () => {
    if (!whatsappNumber) {
      toast({
        title: 'Error',
        description: 'WhatsApp number cannot be empty',
        variant: 'destructive',
      });
      return;
    }

    // Validate phone number format (basic validation)
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(whatsappNumber.replace(/\s/g, ''))) {
      toast({
        title: 'Error',
        description: 'Please enter a valid phone number with country code (e.g., +919788407007)',
        variant: 'destructive',
      });
      return;
    }

    try {
      setSaving(true);
      await updateSetting('whatsapp_number', whatsappNumber);
      toast({
        title: 'Success',
        description: 'WhatsApp number updated successfully',
      });
      loadSettings();
    } catch (error) {
      console.error('Error updating WhatsApp number:', error);
      toast({
        title: 'Error',
        description: 'Failed to update WhatsApp number',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p>Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage application settings and configurations
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageCircle className="h-5 w-5 mr-2" />
            WhatsApp Configuration
          </CardTitle>
          <CardDescription>
            Configure the WhatsApp number for customer support chat
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="whatsapp-number">WhatsApp Number</Label>
            <div className="flex gap-2">
              <Input
                id="whatsapp-number"
                type="tel"
                placeholder="+919788407007"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSaveWhatsApp} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save'}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Include country code (e.g., +91 for India). This number will be used for the WhatsApp chat widget.
            </p>
          </div>

          {settings.find(s => s.key === 'whatsapp_number')?.updated_at && (
            <div className="text-sm text-muted-foreground">
              Last updated: {new Date(settings.find(s => s.key === 'whatsapp_number')!.updated_at).toLocaleString()}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            All Settings
          </CardTitle>
          <CardDescription>
            View all application settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {settings.map((setting) => (
              <div key={setting.id} className="border-b pb-4 last:border-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{setting.key}</p>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </div>
                  <p className="text-sm font-mono bg-muted px-2 py-1 rounded">
                    {setting.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
