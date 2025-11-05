// src/data/reviews.ts
import { loadFromLS, saveToLS } from "./storage";
import type { Review } from "@/types";

const LS_REVIEWS = "mb_reviews";

export function listReviews(bookId: string): Review[] {
  const all = loadFromLS<Review[]>(LS_REVIEWS, []);
  return all.filter(r => r.bookId === bookId).sort((a,b) => b.createdAt.localeCompare(a.createdAt));
}

export function addReview(r: Review) {
  const all = loadFromLS<Review[]>(LS_REVIEWS, []);
  all.push(r);
  saveToLS(LS_REVIEWS, all);
}

export function deleteReview(id: string) {
  let all = loadFromLS<Review[]>(LS_REVIEWS, []);
  all = all.filter(r => r.id !== id);
  saveToLS(LS_REVIEWS, all);
}
