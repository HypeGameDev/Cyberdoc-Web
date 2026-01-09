import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { getBlockedSlots, createBlockedSlot, deleteBlockedSlot } from '@/db/api';
import type { BlockedSlot } from '@/types/types';
import { Calendar, Trash2, Plus, Ban } from 'lucide-react';

// Time slots matching BookingPage
const TIME_SLOTS = [
  '09:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '12:00 PM - 01:00 PM',
  '02:00 PM - 03:00 PM',
  '03:00 PM - 04:00 PM',
  '04:00 PM - 05:00 PM',
  '05:00 PM - 06:00 PM',
  '06:00 PM - 07:00 PM',
  '07:00 PM - 08:00 PM',
  '08:00 PM - 09:00 PM',
];

export default function ManageSlots() {
  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const [newSlot, setNewSlot] = useState({
    date: '',
    time_slot: '',
    reason: '',
  });

  useEffect(() => {
    loadBlockedSlots();
  }, []);

  const loadBlockedSlots = async () => {
    try {
      setLoading(true);
      const data = await getBlockedSlots();
      setBlockedSlots(data);
    } catch (error) {
      console.error('Error loading blocked slots:', error);
      toast({
        title: 'Error',
        description: 'Failed to load blocked slots',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSlot = async () => {
    if (!newSlot.date || !newSlot.time_slot) {
      toast({
        title: 'Error',
        description: 'Please select both date and time slot',
        variant: 'destructive',
      });
      return;
    }

    try {
      await createBlockedSlot(newSlot.date, newSlot.time_slot, newSlot.reason);
      toast({
        title: 'Success',
        description: 'Time slot blocked successfully',
      });
      setDialogOpen(false);
      setNewSlot({ date: '', time_slot: '', reason: '' });
      loadBlockedSlots();
    } catch (error: any) {
      console.error('Error creating blocked slot:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to block time slot',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteSlot = async (id: string) => {
    if (!confirm('Are you sure you want to unblock this time slot?')) {
      return;
    }

    try {
      await deleteBlockedSlot(id);
      toast({
        title: 'Success',
        description: 'Time slot unblocked successfully',
      });
      loadBlockedSlots();
    } catch (error) {
      console.error('Error deleting blocked slot:', error);
      toast({
        title: 'Error',
        description: 'Failed to unblock time slot',
        variant: 'destructive',
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Appointment Slots</h1>
          <p className="text-muted-foreground mt-2">
            Block specific time slots to prevent customer bookings
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Block Time Slot
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Block Time Slot</DialogTitle>
              <DialogDescription>
                Select a date and time slot to block from customer bookings
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="block-date">Date</Label>
                <Input
                  id="block-date"
                  type="date"
                  value={newSlot.date}
                  onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="block-time">Time Slot</Label>
                <Select
                  value={newSlot.time_slot}
                  onValueChange={(value) => setNewSlot({ ...newSlot, time_slot: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_SLOTS.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="block-reason">Reason (Optional)</Label>
                <Textarea
                  id="block-reason"
                  placeholder="e.g., Holiday, Maintenance, etc."
                  value={newSlot.reason}
                  onChange={(e) => setNewSlot({ ...newSlot, reason: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateSlot}>Block Slot</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Ban className="h-5 w-5 mr-2" />
            Blocked Time Slots
          </CardTitle>
          <CardDescription>
            {blockedSlots.length} slot(s) currently blocked
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : blockedSlots.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No blocked time slots</p>
              <p className="text-sm mt-2">All appointment slots are currently available</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Time Slot</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blockedSlots.map((slot) => (
                  <TableRow key={slot.id}>
                    <TableCell className="font-medium">{formatDate(slot.date)}</TableCell>
                    <TableCell>{slot.time_slot}</TableCell>
                    <TableCell>{slot.reason || '-'}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(slot.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteSlot(slot.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
