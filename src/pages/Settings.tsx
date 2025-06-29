
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import { User, Moon, Sun, Bell, Shield, Palette, Globe } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Settings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    avatar_url: ""
  });
  const [preferences, setPreferences] = useState({
    theme: "dark",
    notifications: true,
    emailAlerts: true,
    language: "en",
    currency: "INR",
    timezone: "Asia/Kolkata"
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return;
    }

    if (data) {
      setProfile({
        full_name: data.full_name || "",
        email: data.email || user.email || "",
        avatar_url: data.avatar_url || ""
      });
    }
  };

  const handleProfileUpdate = async () => {
    if (!user) return;

    setLoading(true);
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        full_name: profile.full_name,
        email: profile.email,
        avatar_url: profile.avatar_url,
        updated_at: new Date().toISOString()
      });

    if (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Profile updated successfully"
      });
    }
    setLoading(false);
  };

  const handleThemeChange = (theme: string) => {
    setPreferences(prev => ({ ...prev, theme }));
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    toast({
      title: "Theme Updated",
      description: `Switched to ${theme} mode`
    });
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />
      
      <div className="pt-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold gradient-text mb-2">Settings</h1>
            <p className="text-gray-300">Manage your account and preferences</p>
          </div>

          <div className="space-y-8">
            {/* Profile Settings */}
            <Card className="glass-card glow-border animate-slide-up">
              <CardHeader>
                <CardTitle className="text-trading-gold flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Profile Information
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Update your personal information and profile details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-trading-gold">Full Name</Label>
                    <Input
                      id="fullName"
                      value={profile.full_name}
                      onChange={(e) => setProfile(prev => ({ ...prev, full_name: e.target.value }))}
                      className="bg-trading-card border-trading-gold/30 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-trading-gold">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      className="bg-trading-card border-trading-gold/30 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="avatar" className="text-trading-gold">Avatar URL</Label>
                  <Input
                    id="avatar"
                    value={profile.avatar_url}
                    onChange={(e) => setProfile(prev => ({ ...prev, avatar_url: e.target.value }))}
                    className="bg-trading-card border-trading-gold/30 text-white"
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>
                <Button 
                  onClick={handleProfileUpdate}
                  disabled={loading}
                  className="bg-gradient-gold text-trading-dark hover:opacity-90"
                >
                  {loading ? "Updating..." : "Update Profile"}
                </Button>
              </CardContent>
            </Card>

            {/* Appearance Settings */}
            <Card className="glass-card glow-border animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="text-trading-gold flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  Appearance
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Customize the look and feel of your interface
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-trading-gold">Theme</Label>
                    <p className="text-sm text-gray-400">Choose your preferred theme</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={preferences.theme === 'light' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleThemeChange('light')}
                      className="border-trading-gold text-trading-gold"
                    >
                      <Sun className="w-4 h-4 mr-2" />
                      Light
                    </Button>
                    <Button
                      variant={preferences.theme === 'dark' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleThemeChange('dark')}
                      className="border-trading-gold text-trading-gold"
                    >
                      <Moon className="w-4 h-4 mr-2" />
                      Dark
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="glass-card glow-border animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="text-trading-gold flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Notifications
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Manage your notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-trading-gold">Push Notifications</Label>
                    <p className="text-sm text-gray-400">Receive notifications in your browser</p>
                  </div>
                  <Switch
                    checked={preferences.notifications}
                    onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, notifications: checked }))}
                  />
                </div>
                <Separator className="bg-trading-gold/20" />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-trading-gold">Email Alerts</Label>
                    <p className="text-sm text-gray-400">Get trading alerts via email</p>
                  </div>
                  <Switch
                    checked={preferences.emailAlerts}
                    onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, emailAlerts: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Regional Settings */}
            <Card className="glass-card glow-border animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <CardTitle className="text-trading-gold flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  Regional Settings
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Set your language, currency, and timezone preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-trading-gold">Language</Label>
                    <Select value={preferences.language} onValueChange={(value) => setPreferences(prev => ({ ...prev, language: value }))}>
                      <SelectTrigger className="bg-trading-card border-trading-gold/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-trading-card border-trading-gold/30">
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">Hindi</SelectItem>
                        <SelectItem value="ta">Tamil</SelectItem>
                        <SelectItem value="te">Telugu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-trading-gold">Currency</Label>
                    <Select value={preferences.currency} onValueChange={(value) => setPreferences(prev => ({ ...prev, currency: value }))}>
                      <SelectTrigger className="bg-trading-card border-trading-gold/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-trading-card border-trading-gold/30">
                        <SelectItem value="INR">INR (₹)</SelectItem>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-trading-gold">Timezone</Label>
                    <Select value={preferences.timezone} onValueChange={(value) => setPreferences(prev => ({ ...prev, timezone: value }))}>
                      <SelectTrigger className="bg-trading-card border-trading-gold/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-trading-card border-trading-gold/30">
                        <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                        <SelectItem value="Asia/Mumbai">Asia/Mumbai (IST)</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="glass-card glow-border animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <CardHeader>
                <CardTitle className="text-trading-gold flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Security
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Manage your account security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Button variant="outline" className="border-trading-gold text-trading-gold hover:bg-trading-gold hover:text-trading-dark">
                    Change Password
                  </Button>
                  <Button variant="outline" className="border-trading-gold text-trading-gold hover:bg-trading-gold hover:text-trading-dark">
                    Enable Two-Factor Authentication
                  </Button>
                  <Button variant="outline" className="border-trading-red text-trading-red hover:bg-trading-red hover:text-white">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
