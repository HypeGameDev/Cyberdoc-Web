import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { getApprovedReviews, createReview } from '@/db/api';
import type { Review } from '@/types/types';
import { Star, StarHalf, MessageSquare } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    customer_name: '',
    rating: 5,
    review_text: '',
    service_type: '',
  });

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const data = await getApprovedReviews();
      setReviews(data);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 4.9;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customer_name || !formData.review_text) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    try {
      await createReview({
        customer_name: formData.customer_name,
        rating: formData.rating,
        review_text: formData.review_text,
        service_type: formData.service_type || undefined,
      });

      toast({
        title: 'Success',
        description: 'Thank you for your review! It will be published after approval.',
      });

      setFormData({
        customer_name: '',
        rating: 5,
        review_text: '',
        service_type: '',
      });
      setDialogOpen(false);
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit review. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number) => {
    const stars: React.ReactElement[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-5 w-5 fill-primary text-primary" />);
    }
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="h-5 w-5 fill-primary text-primary" />);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-5 w-5 text-muted-foreground" />);
    }
    return stars;
  };

  const RatingSelector = ({ value, onChange }: { value: number; onChange: (rating: number) => void }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="focus:outline-none"
          >
            <Star
              className={`h-8 w-8 transition-colors ${
                star <= value ? 'fill-primary text-primary' : 'text-muted-foreground'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-12 xl:py-16">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <Badge variant="secondary">Customer Reviews</Badge>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                1000+ Reviews on JustDial
              </Badge>
            </div>
            <h1 className="text-3xl xl:text-5xl font-bold">What Our Customers Say</h1>
            <div className="flex items-center justify-center space-x-2 text-2xl">
              <div className="flex">{renderStars(4.9)}</div>
              <span className="font-bold">4.9/5</span>
            </div>
            <p className="text-base xl:text-xl text-muted-foreground">
              Based on 1000+ reviews from satisfied customers across Coimbatore
            </p>
            <div className="pt-2">
              <a
                href="https://www.justdial.com/Coimbatore/Cyberdoctor-Computer-And-Laptop-Service-Center-Near-Sathy-Main-Road-Saravanampatti/0422PX422-X422-170529204541-R6W2_BZDET/reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                View all reviews on JustDial →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-12 xl:py-20">
        <div className="container px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Customer Testimonials</h2>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Leave a Review
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Leave a Review</DialogTitle>
                  <DialogDescription>Share your experience with Cyberdoctor</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="customer_name">Your Name *</Label>
                    <Input
                      id="customer_name"
                      value={formData.customer_name}
                      onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service_type">Service Type (Optional)</Label>
                    <Input
                      id="service_type"
                      value={formData.service_type}
                      onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
                      placeholder="e.g., Laptop Repair"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Rating *</Label>
                    <RatingSelector
                      value={formData.rating}
                      onChange={(rating) => setFormData({ ...formData, rating })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="review_text">Your Review *</Label>
                    <Textarea
                      id="review_text"
                      value={formData.review_text}
                      onChange={(e) => setFormData({ ...formData, review_text: e.target.value })}
                      placeholder="Share your experience..."
                      rows={4}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit Review'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-5 w-24 bg-muted" />
                    <Skeleton className="h-4 w-32 bg-muted" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full bg-muted" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No reviews yet. Be the first to leave a review!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{review.customer_name}</CardTitle>
                      <div className="flex">{renderStars(review.rating)}</div>
                    </div>
                    {review.service_type && (
                      <CardDescription>{review.service_type}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{review.review_text}</p>
                    <p className="text-xs text-muted-foreground mt-4">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
