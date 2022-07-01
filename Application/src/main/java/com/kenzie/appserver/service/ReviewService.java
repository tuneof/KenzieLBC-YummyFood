package com.kenzie.appserver.service;

import com.kenzie.appserver.repositories.RestaurantRepository;
import com.kenzie.appserver.repositories.ReviewRepository;
import com.kenzie.appserver.repositories.model.ReviewRecord;
import com.kenzie.appserver.service.model.Restaurant;
import com.kenzie.appserver.service.model.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public List<Review> findByRestaurantId(String restaurantId) {
        if ((Objects.equals(restaurantId, "")) || restaurantId == null) {
            throw new ReviewRecordNotFoundException();
        }

        List<Review> listOfReviews = new ArrayList<>();
        reviewRepository
                .findByRestaurantId(restaurantId)
                .forEach(review -> listOfReviews.add(toReview(review)));

        return listOfReviews;
    }

    public List<Review> findAll() {
        List<Review> reviews = new ArrayList<>();
        reviewRepository
                .findAll()
                .forEach(review -> reviews
                        .add(toReview(review)));
        return reviews;
    }

    public Review addReview(Review review) {
        ReviewRecord reviewRecord = toReviewRecord(review);
        reviewRepository.save(reviewRecord);
        return review;
    }

    private ReviewRecord toReviewRecord(Review review) {
        ReviewRecord reviewRecord = new ReviewRecord();
        reviewRecord.setRestaurantId(review.getRestaurantId());
        reviewRecord.setUserId(review.getUserId());
        reviewRecord.setRating(review.getRating());
        reviewRecord.setReview(review.getReview());
        return reviewRecord;
    }

    private Review toReview(ReviewRecord reviewRecord) {
        Review review = new Review(
                reviewRecord.getRestaurantId(),
                reviewRecord.getUserId(),
                reviewRecord.getRating(),
                reviewRecord.getReview());
        return review;
    }

    public void deleteReview(Review review) {
        if (review == null) {
            throw new ReviewRecordNotFoundException();
        } else {
            ReviewRecord reviewRecord = toReviewRecord(review);
            reviewRepository.delete(reviewRecord);
        }
    }

    public Review updateReview(Review review) {
        if (review == null) {
            throw new ReviewRecordNotFoundException();
        }
            ReviewRecord reviewRecord = toReviewRecord(review);
            reviewRepository.save(reviewRecord);
            return review;
    }

}