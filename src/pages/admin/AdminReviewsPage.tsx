import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { getAllReviews, updateReview, deleteReview } from '@/db/api';
import type { Review } from '@/types/types';
import { Star, MessageSquare, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const data = await getAllReviews();
      setReviews(data);
    } catch (error) {
      console.error('Error loading reviews:', error);
      toast({
        title: 'Error',
        description: 'Failed to load reviews',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprovalToggle = async (id: string, currentStatus: boolean) => {
    try {
      await updateReview(id, { is_approved: !currentStatus });
      setReviews(reviews.map((review) => (review.id === id ? { ...review, is_approved: !currentStatus } : review)));
      toast({
        title: 'Success',
        description: `Review ${!currentStatus ? 'approved' : 'unapproved'}`,
      });
    } catch (error) {
      console.error('Error updating review:', error);
      toast({
        title: 'Error',
        description: 'Failed to update review',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteReview(id);
      setReviews(reviews.filter((review) => review.id !== id));
      toast({
        title: 'Success',
        description: 'Review deleted',
      });
    } catch (error) {
      console.error('Error deleting review:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete review',
        variant: 'destructive',
      });
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
      />
    ));
  };

  const approvedCount = reviews.filter((r) => r.is_approved).length;
  const pendingCount = reviews.filter((r) => !r.is_approved).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Reviews</h1>
          <p className="text-muted-foreground mt-2">Manage customer reviews</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary">{approvedCount} Approved</Badge>
          <Badge variant="outline">{pendingCount} Pending</Badge>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-32 w-full bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No reviews yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {reviews.map((review) => (
            <Card key={review.id} className={!review.is_approved ? 'border-yellow-200 bg-yellow-50/50' : ''}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{review.customer_name}</CardTitle>
                    <div className="flex items-center space-x-1">{renderStars(review.rating)}</div>
                    {review.service_type && (
                      <p className="text-sm text-muted-foreground">{review.service_type}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Review</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this review? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(review.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{review.review_text}</p>
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={review.is_approved}
                      onCheckedChange={() => handleApprovalToggle(review.id, review.is_approved)}
                    />
                    <span className="text-sm font-medium">
                      {review.is_approved ? 'Approved' : 'Pending Approval'}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
