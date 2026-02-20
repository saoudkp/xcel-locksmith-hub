import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { KeyRound, Lock, Unlock, Quote, Send, X, ShieldCheck } from "lucide-react";
import { reviews as initialReviews, Review } from "@/data/reviews";

/* ───── Custom Key Rating ───── */
const KeyRating = ({ rating, size = 16, interactive = false, onChange }: {
  rating: number;
  size?: number;
  interactive?: boolean;
  onChange?: (r: number) => void;
}) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <button
        key={i}
        type={interactive ? "button" : undefined}
        disabled={!interactive}
        onClick={() => onChange?.(i + 1)}
        className={`transition-all duration-200 ${interactive ? "cursor-pointer hover:scale-125" : "cursor-default"}`}
      >
        <KeyRound
          size={size}
          className={`transition-colors duration-300 ${
            i < rating
              ? "text-accent fill-accent drop-shadow-[0_0_4px_hsl(var(--accent)/0.5)]"
              : "text-muted-foreground/30"
          } ${interactive && i < rating ? "rotate-12" : ""}`}
        />
      </button>
    ))}
  </div>
);

/* ───── Review Card ───── */
const ReviewCard = ({ review, index }: { review: Review; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="glass-card rounded-xl p-6 relative group hover:border-accent/30 transition-colors duration-300"
  >
    {/* Decorative lock watermark */}
    <Lock className="absolute top-4 right-4 w-12 h-12 text-accent/5 group-hover:text-accent/10 transition-colors" />

    <div className="flex items-center gap-2 mb-3">
      <KeyRating rating={review.starRating} />
      <span className="text-xs text-muted-foreground ml-auto">
        {new Date(review.reviewDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
      </span>
    </div>

    <div className="relative pl-4 mb-4">
      <Quote className="absolute -left-0 -top-1 w-4 h-4 text-accent/40" />
      <p className="text-foreground text-sm leading-relaxed">{review.reviewText}</p>
    </div>

    <div className="flex items-center gap-2 pt-3 border-t border-border/50">
      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
        <span className="text-accent font-display font-bold text-sm">
          {review.customerName.charAt(0)}
        </span>
      </div>
      <span className="font-semibold text-foreground text-sm">{review.customerName}</span>
      <ShieldCheck className="w-3.5 h-3.5 text-green-500 ml-auto" />
      <span className="text-xs text-green-500">Verified</span>
    </div>
  </motion.div>
);

/* ───── Add Review Form ───── */
const AddReviewForm = ({ onClose, onSubmit }: {
  onClose: () => void;
  onSubmit: (review: Review) => void;
}) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  const isValid = name.trim().length > 0 && rating > 0 && text.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    onSubmit({
      id: `rev-${Date.now()}`,
      customerName: name.trim().slice(0, 100),
      starRating: rating,
      reviewDate: new Date().toISOString().split("T")[0],
      reviewText: text.trim().slice(0, 500),
    });
    setUnlocked(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, rotateY: -10 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0.9, opacity: 0, rotateY: 10 }}
        transition={{ type: "spring", damping: 20 }}
        className="glass-card-strong rounded-2xl p-6 md:p-8 max-w-md w-full relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background lock decoration */}
        <div className="absolute -bottom-8 -right-8 opacity-[0.03]">
          <Lock className="w-48 h-48" />
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <AnimatePresence mode="wait">
          {!unlocked ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10"
            >
              {/* Header with lock icon */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">Leave a Review</h3>
                  <p className="text-xs text-muted-foreground">Unlock your experience with us</p>
                </div>
              </div>

              {/* Name */}
              <div className="mb-4">
                <label className="text-sm font-medium text-foreground mb-1.5 block">Your Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={100}
                    placeholder="e.g. John D."
                    className="w-full rounded-lg border border-border bg-background/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                  />
                </div>
              </div>

              {/* Key Rating */}
              <div className="mb-4">
                <label className="text-sm font-medium text-foreground mb-2 block">Your Rating</label>
                <div className="glass-card rounded-lg p-3 flex items-center justify-between">
                  <KeyRating rating={rating} size={24} interactive onChange={setRating} />
                  <span className="text-xs text-muted-foreground">
                    {rating === 0 ? "Tap a key" : `${rating}/5 keys`}
                  </span>
                </div>
              </div>

              {/* Review text */}
              <div className="mb-6">
                <label className="text-sm font-medium text-foreground mb-1.5 block">Your Experience</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  maxLength={500}
                  rows={3}
                  placeholder="Tell us about your locksmith experience..."
                  className="w-full rounded-lg border border-border bg-background/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none"
                />
                <span className="text-xs text-muted-foreground float-right mt-1">{text.length}/500</span>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={!isValid}
                whileHover={isValid ? { scale: 1.02 } : {}}
                whileTap={isValid ? { scale: 0.98 } : {}}
                className={`w-full rounded-xl py-3 font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                  isValid
                    ? "bg-accent text-accent-foreground shadow-lg shadow-accent/25 hover:shadow-accent/40"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                <Send className="w-4 h-4" />
                Unlock & Submit Review
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 relative z-10"
            >
              <motion.div
                initial={{ rotate: -20, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", damping: 10, delay: 0.2 }}
                className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4"
              >
                <Unlock className="w-10 h-10 text-green-500" />
              </motion.div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">Review Unlocked!</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Thank you for sharing your experience with Xcel Locksmith.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-accent text-accent-foreground font-semibold text-sm hover:shadow-lg hover:shadow-accent/25 transition-all"
              >
                Done
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

/* ───── Main Section ───── */
const ReviewsSection = () => {
  const [allReviews, setAllReviews] = useState<Review[]>(initialReviews);
  const [showForm, setShowForm] = useState(false);

  const handleAddReview = (review: Review) => {
    setAllReviews((prev) => [review, ...prev]);
  };

  const avgRating = allReviews.length
    ? (allReviews.reduce((sum, r) => sum + r.starRating, 0) / allReviews.length).toFixed(1)
    : "0";

  return (
    <section id="reviews" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            What Our <span className="text-accent">Customers</span> Say
          </h2>
          <p className="text-muted-foreground mb-6">Real reviews from real Cleveland area customers</p>

          {/* Stats bar */}
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="glass-card rounded-xl px-5 py-3 flex items-center gap-3">
              <span className="font-display text-2xl font-bold text-accent">{avgRating}</span>
              <div className="text-left">
                <KeyRating rating={Math.round(Number(avgRating))} size={14} />
                <span className="text-xs text-muted-foreground">{allReviews.length} reviews</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(true)}
              className="glass-card rounded-xl px-5 py-3 flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent hover:border-accent/30 transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <KeyRound className="w-4 h-4 text-accent" />
              </div>
              Leave a Review
            </motion.button>
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {allReviews.map((review, i) => (
            <ReviewCard key={review.id} review={review} index={i} />
          ))}
        </div>
      </div>

      {/* Add Review Form Popup */}
      <AnimatePresence>
        {showForm && (
          <AddReviewForm
            onClose={() => setShowForm(false)}
            onSubmit={handleAddReview}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ReviewsSection;
