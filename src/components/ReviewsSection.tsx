import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { reviews } from "@/data/reviews";

const ReviewsSection = () => {
  if (reviews.length === 0) {
    return (
      <section id="reviews" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="glass-card rounded-2xl p-8 max-w-lg mx-auto">
            <p className="text-muted-foreground">Call us to learn why our customers trust Xcel Locksmith</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="reviews" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            What Our <span className="text-accent">Customers</span> Say
          </h2>
          <p className="text-muted-foreground">Real reviews from real Cleveland area customers</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-xl p-6"
            >
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star key={si} className={`w-4 h-4 ${si < review.starRating ? "text-yellow-400 fill-yellow-400" : "text-border"}`} />
                ))}
              </div>
              <p className="text-foreground text-sm leading-relaxed mb-4">"{review.reviewText}"</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">{review.customerName}</span>
                <span>{new Date(review.reviewDate).toLocaleDateString()}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
