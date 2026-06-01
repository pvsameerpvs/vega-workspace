"use client";

import { useState } from "react";
import { useToast } from "@vega/ui";
import { MessageSquare, Star, Plus, Trash2 } from "lucide-react";

export function TestimonialsManager() {
  const { toast } = useToast();
  const [reviews, setReviews] = useState([
    { id: 1, name: "Ahmed Al-Rashid", rating: 5, text: "Vega supplied 200 bunk beds for our labor camp. Quality was excellent and delivery was on time.", active: true },
    { id: 2, name: "Sara Khan", rating: 5, text: "Professional team and great product range. We ordered queue barriers for our retail stores.", active: true },
    { id: 3, name: "Mohammed Faizal", rating: 4, text: "Good service and competitive pricing. The office furniture package was exactly what we needed.", active: true },
  ]);

  const updateReview = (id: number, key: string, value: any) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, [key]: value } : r)));
  };

  const addReview = () => {
    setReviews((prev) => [...prev, { id: Date.now(), name: "", rating: 5, text: "", active: true }]);
  };

  const removeReview = (id: number) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const handleSave = () => {
    toast({ title: "Saved", description: "Testimonials updated." });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-vega-blue" />
          <p className="text-sm font-bold text-slate-900">Testimonials & Reviews</p>
        </div>
        <div className="flex gap-2">
          <button onClick={addReview} className="flex items-center gap-1 rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
            <Plus className="h-3 w-3" /> Add Review
          </button>
          <button onClick={handleSave} className="rounded-md bg-vega-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-vega-blue-dark">
            Save
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {reviews.map((review) => (
          <div key={review.id} className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <input type="checkbox" checked={review.active} onChange={(e) => updateReview(review.id, "active", e.target.checked)} className="h-4 w-4" />
              <span className="text-xs font-semibold text-slate-500">Active</span>
              <div className="ml-auto flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => updateReview(review.id, "rating", star)}
                      className={`text-sm ${star <= review.rating ? "text-vega-yellow" : "text-slate-200"}`}
                    >
                      <Star className="h-3 w-3" fill={star <= review.rating ? "currentColor" : "none"} />
                    </button>
                  ))}
                </div>
                <button onClick={() => removeReview(review.id)} className="rounded-md p-1 text-slate-400 hover:bg-red-50 hover:text-red-500">
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <label className="text-xs text-slate-500">Customer Name</label>
                <input value={review.name} onChange={(e) => updateReview(review.id, "name", e.target.value)} className="w-full rounded-md border border-slate-200 px-2 py-1.5 text-sm focus:border-vega-blue focus:outline-none" />
              </div>
              <div>
                <label className="text-xs text-slate-500">Review Text</label>
                <textarea rows={3} value={review.text} onChange={(e) => updateReview(review.id, "text", e.target.value)} className="w-full rounded-md border border-slate-200 px-2 py-1.5 text-sm focus:border-vega-blue focus:outline-none" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
